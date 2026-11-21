package com.xchat.sentinel

import android.graphics.RuntimeShader
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ShaderBrush

/**
 * AGSL shader: a lit, rotating, audio-reactive 3D sphere with tilted orbit rings and glow.
 * Runs entirely on the GPU. Android 13+ (API 33). The S25 (Android 15) is well above that.
 */
private const val ORB_AGSL = """
uniform float2 res;
uniform float time;
uniform float amp;      // 0..1 voice / mic amplitude (smoothed on CPU)
uniform float energy;   // 0..1 phase intensity
uniform float3 cA;
uniform float3 cB;

float ring(float2 p, float tilt, float rot, float radius, float width) {
    float c = cos(rot), s = sin(rot);
    float2 q = float2(c * p.x - s * p.y, s * p.x + c * p.y);
    q.y /= tilt;
    return exp(-abs(length(q) - radius) / width);
}

half4 main(float2 fc) {
    float2 p = (fc - 0.5 * res) / (0.5 * min(res.x, res.y));
    float r = length(p);
    float R = 0.50;
    float3 col = float3(0.0);

    // soft outer glow
    float glow = exp(-max(r - R, 0.0) * 4.5) * (0.22 + 0.45 * energy + 0.5 * amp);
    col += mix(cA, cB, smoothstep(-0.8, 0.8, p.y)) * glow * 0.55;

    // orbit rings (two tilted, counter-rotating)
    float r1 = ring(p, 0.30, time * 0.35, 0.80, 0.012);
    float r2 = ring(p, 0.42, -time * 0.25 + 1.2, 0.68, 0.010);
    col += cB * r1 * (0.25 + 0.6 * energy);
    col += cA * r2 * (0.2 + 0.5 * energy);

    // sphere
    float rr = R * (1.0 + 0.05 * amp);
    if (r < rr) {
        float z = sqrt(rr * rr - r * r);
        float3 n = normalize(float3(p, z));
        float c = cos(time * 0.45), s = sin(time * 0.45);
        float3 q = float3(c * n.x + s * n.z, n.y, -s * n.x + c * n.z);

        float w = sin(q.x * 5.0 + time * 1.3 + amp * 4.0)
                * sin(q.y * 6.0 - time * 1.1)
                * sin(q.z * 5.0 + time * 0.9);
        w += 0.5 * sin(q.x * 11.0 - time * 2.0)
               * sin(q.y * 9.0 + time * 1.6)
               * sin(q.z * 10.0);

        float bump = w * (0.05 + 0.20 * amp + 0.08 * energy);
        float3 nn = normalize(n + float3(q.x, q.y, 0.0) * bump);

        float light = max(dot(nn, normalize(float3(-0.5, 0.6, 0.7))), 0.0);
        float fres = pow(1.0 - nn.z, 2.4);
        float3 base = mix(cA, cB, clamp(0.5 + 0.45 * w + 0.35 * q.y, 0.0, 1.0));

        float3 body = base * (0.18 + 0.82 * light);
        body += cB * fres * (0.8 + amp);
        body += cA * pow(max(w, 0.0), 3.0) * (0.35 + energy);
        body += float3(1.0) * pow(light, 24.0) * 0.35;   // specular
        col = mix(col, body, 0.96);
    }

    float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
    return half4(half3(col), half(a));   // premultiplied
}
"""

private data class Palette(val a: Color, val b: Color, val energy: Float)

private fun SentinelPhase.palette() = when (this) {
    SentinelPhase.Idle -> Palette(Color(0xFF7C5CFF), Color(0xFF3B82F6), 0.15f)
    SentinelPhase.Listening -> Palette(Color(0xFF22D3EE), Color(0xFF3B82F6), 0.45f)
    SentinelPhase.Thinking -> Palette(Color(0xFF8B5CF6), Color(0xFFEC4899), 0.70f)
    SentinelPhase.Speaking -> Palette(Color(0xFF5EEAD4), Color(0xFF22D3EE), 0.90f)
}

private class Smoother { var amp = 0f; var t = 0f }

@Composable
fun SentinelOrb(
    phase: SentinelPhase,
    amplitude: () -> Float,          // read in the DRAW phase only, so no recomposition per frame
    reduceMotion: Boolean,
    modifier: Modifier = Modifier,
) {
    val pal = phase.palette()
    val colA = animateColorAsState(pal.a, spring(stiffness = 40f), label = "cA")
    val colB = animateColorAsState(pal.b, spring(stiffness = 40f), label = "cB")
    val energy = animateFloatAsState(if (reduceMotion) pal.energy * 0.5f else pal.energy, spring(stiffness = 60f), label = "e")

    val clock = remember { mutableFloatStateOf(0f) }
    val smoother = remember { Smoother() }
    val speed = if (reduceMotion) 0.25f else 1f

    LaunchedEffect(speed) {
        var last = 0L
        while (true) {
            withFrameNanos { now ->
                if (last != 0L) clock.floatValue += (now - last) / 1_000_000_000f * speed
                last = now
            }
        }
    }

    if (Build.VERSION.SDK_INT >= 33) {
        ShaderOrb(clock, smoother, amplitude, energy, colA, colB, modifier)
    } else {
        FallbackOrb(clock, amplitude, energy, colA, colB, modifier)
    }
}

@RequiresApi(33)
@Composable
private fun ShaderOrb(
    clock: State<Float>, sm: Smoother, amplitude: () -> Float,
    energy: State<Float>, cA: State<Color>, cB: State<Color>, modifier: Modifier,
) {
    val shader = remember { RuntimeShader(ORB_AGSL) }
    val brush = remember { ShaderBrush(shader) }
    Box(
        modifier.drawBehind {
            val t = clock.value
            val dt = (t - sm.t).coerceIn(0f, 0.05f); sm.t = t
            sm.amp += (amplitude() - sm.amp) * (1f - Math.pow(0.0001, dt.toDouble()).toFloat())
            shader.setFloatUniform("res", size.width, size.height)
            shader.setFloatUniform("time", t)
            shader.setFloatUniform("amp", sm.amp)
            shader.setFloatUniform("energy", energy.value)
            shader.setFloatUniform("cA", cA.value.red, cA.value.green, cA.value.blue)
            shader.setFloatUniform("cB", cB.value.red, cB.value.green, cB.value.blue)
            drawRect(brush)
        }
    )
}

@Composable
private fun FallbackOrb(
    clock: State<Float>, amplitude: () -> Float, energy: State<Float>,
    cA: State<Color>, cB: State<Color>, modifier: Modifier,
) {
    Canvas(modifier) {
        val t = clock.value
        val r = size.minDimension * (0.28f + 0.03f * amplitude() + 0.01f * kotlin.math.sin(t * 2f))
        val c = Offset(size.width / 2, size.height / 2)
        drawCircle(
            Brush.radialGradient(listOf(cB.value.copy(alpha = 0.5f * energy.value + 0.2f), Color.Transparent), c, r * 2.2f),
            r * 2.2f, c
        )
        drawCircle(Brush.radialGradient(listOf(cA.value, cB.value, Color.Transparent), c, r), r, c)
    }
}
