package com.xchat.sentinel

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.CoroutineScope

private val Bg = Color(0xFF07080F)
private val Glass = Color(0x14FFFFFF)
private val GlassLine = Color(0x24FFFFFF)
private val TextDim = Color(0xFF8B93B8)
private val TextMain = Color(0xFFE8EBFF)
private val Accent = Color(0xFF5EEAD4)

@Composable
fun SentinelVoiceScreen(
    reduceMotion: Boolean,
    modifier: Modifier = Modifier,
    vm: SentinelViewModel = viewModel(),
) {
    val ui by vm.ui.collectAsState()
    val ampState = vm.amplitude.collectAsState()      // read only inside the draw lambda below
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    val speaker = remember {
        SentinelSpeaker(context, scope, onAmplitude = vm::setAmplitude, onFinished = {})
    }
    DisposableEffect(Unit) { onDispose { speaker.shutdown() } }
    LaunchedEffect(Unit) { vm.hello(speaker::speak) }

    Column(
        modifier.fillMaxSize().background(Bg).padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        PhaseChip(ui.phase, ui.connected)

        SentinelOrb(
            phase = ui.phase,
            amplitude = { ampState.value },
            reduceMotion = reduceMotion,
            modifier = Modifier.fillMaxWidth().aspectRatio(1f),
        )

        TelemetryStrip(ui.telemetry, ui.tokHistory)

        StreamPanel(
            title = "Thinking", text = ui.thinking, live = ui.phase == SentinelPhase.Thinking,
            dim = true, maxHeight = 96.dp,
        )
        StreamPanel(
            title = "Output", text = ui.output, live = ui.phase == SentinelPhase.Speaking,
            dim = false, maxHeight = 140.dp,
        )

        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            OutlinedButton(
                onClick = { vm.runDemo(speaker::speak) },
                modifier = Modifier.weight(1f),
                border = BorderStroke(1.dp, GlassLine),
            ) { Text("Talk to Sentinel", color = TextMain) }
            OutlinedButton(
                onClick = { speaker.stop(); vm.setPhase(SentinelPhase.Idle) },
                modifier = Modifier.weight(1f),
                border = BorderStroke(1.dp, GlassLine),
            ) { Text("Stop", color = TextMain) }
        }
    }
}

@Composable
private fun PhaseChip(phase: SentinelPhase, connected: Boolean) {
    val dot by animateColorAsState(
        when (phase) {
            SentinelPhase.Idle -> Color(0xFF7C5CFF)
            SentinelPhase.Listening -> Color(0xFF22D3EE)
            SentinelPhase.Thinking -> Color(0xFFEC4899)
            SentinelPhase.Speaking -> Accent
        }, tween(500), label = "dot"
    )
    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(Modifier.size(8.dp).background(dot, RoundedCornerShape(50)))
        Text("Sentinel · ${phase.label}", color = TextMain, fontSize = 14.sp)
        Spacer(Modifier.weight(1f))
        Text(if (connected) "Connected" else "Offline", color = TextDim, fontSize = 12.sp)
    }
}

@Composable
private fun TelemetryStrip(t: Telemetry, history: List<Float>) {
    GlassCard {
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(14.dp)) {
                Meter("CPU", t.cpu, Modifier.weight(1f))
                Meter("RAM", t.ram, Modifier.weight(1f))
                Meter("GPU", t.gpu, Modifier.weight(1f))
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("%.0f tok/s".format(t.tokensPerSec), color = TextMain, fontSize = 16.sp)
                    Text("${t.latencyMs} ms first token", color = TextDim, fontSize = 11.sp)
                }
                Sparkline(history, Modifier.weight(1.4f).height(34.dp))
            }
        }
    }
}

@Composable
private fun Meter(label: String, value: Float, modifier: Modifier) {
    val v by animateFloatAsState(value, tween(400), label = label)
    Column(modifier, verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Row {
            Text(label, color = TextDim, fontSize = 11.sp, modifier = Modifier.weight(1f))
            Text("${(v * 100).toInt()}%", color = TextMain, fontSize = 11.sp)
        }
        Canvas(Modifier.fillMaxWidth().height(4.dp)) {
            drawRoundRect(Color(0x22FFFFFF), cornerRadius = androidx.compose.ui.geometry.CornerRadius(8f))
            drawRoundRect(
                Brush.horizontalGradient(listOf(Color(0xFF7C5CFF), Color(0xFF22D3EE))),
                size = size.copy(width = size.width * v),
                cornerRadius = androidx.compose.ui.geometry.CornerRadius(8f),
            )
        }
    }
}

@Composable
private fun Sparkline(points: List<Float>, modifier: Modifier) {
    Canvas(modifier) {
        if (points.size < 2) return@Canvas
        val max = (points.max() * 1.15f).coerceAtLeast(1f)
        val step = size.width / (points.size - 1)
        val path = Path()
        points.forEachIndexed { i, p ->
            val x = i * step; val y = size.height - (p / max) * size.height
            if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
        }
        drawPath(path, Accent, style = Stroke(width = 3f, cap = StrokeCap.Round))
        val last = Offset((points.size - 1) * step, size.height - (points.last() / max) * size.height)
        drawCircle(Accent, 5f, last)
    }
}

@Composable
private fun StreamPanel(title: String, text: String, live: Boolean, dim: Boolean, maxHeight: androidx.compose.ui.unit.Dp) {
    val scroll = rememberScrollState()
    LaunchedEffect(text) { scroll.animateScrollTo(scroll.maxValue) }
    GlassCard {
        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(title, color = TextDim, fontSize = 11.sp)
            Box(Modifier.heightIn(min = 36.dp, max = maxHeight).verticalScroll(scroll)) {
                Text(
                    text = if (text.isEmpty()) "Nothing yet." else text + if (live) " ▌" else "",
                    color = if (dim) TextDim else TextMain,
                    fontSize = if (dim) 12.sp else 15.sp,
                    fontFamily = if (dim) FontFamily.Monospace else FontFamily.Default,
                    fontStyle = if (dim) FontStyle.Italic else FontStyle.Normal,
                    lineHeight = if (dim) 17.sp else 22.sp,
                )
            }
        }
    }
}

@Composable
private fun GlassCard(content: @Composable () -> Unit) {
    Surface(
        color = Glass,
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, GlassLine),
        modifier = Modifier.fillMaxWidth(),
    ) { Box(Modifier.padding(14.dp)) { content() } }
}
