package com.xchat.sentinel

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.util.Locale
import kotlin.math.abs
import kotlin.math.sin
import kotlin.random.Random

/**
 * Speaks with Android TTS and drives a synthetic amplitude while speaking.
 * If you move to a streaming TTS/RTC audio source, replace [onAmplitude] feeding with real RMS.
 */
class SentinelSpeaker(
    context: Context,
    private val scope: CoroutineScope,
    private val onAmplitude: (Float) -> Unit,
    private val onFinished: () -> Unit = {},
) {
    private var ready = false
    private var job: Job? = null
    private val tts: TextToSpeech = TextToSpeech(context) { status ->
        ready = status == TextToSpeech.SUCCESS
        if (ready) { tts.language = Locale.getDefault(); tts.setPitch(0.85f); tts.setSpeechRate(0.95f) }
    }

    init {
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(id: String?) { startPulse() }
            override fun onDone(id: String?) { stopPulse() }
            @Deprecated("Deprecated in Java") override fun onError(id: String?) { stopPulse() }
        })
    }

    fun speak(text: String) {
        if (ready) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "sentinel")
    }

    fun stop() { tts.stop(); stopPulse() }
    fun shutdown() { stop(); tts.shutdown() }

    private fun startPulse() {
        job?.cancel()
        job = scope.launch {
            var t = 0f
            while (isActive) {
                t += 0.05f
                onAmplitude((0.35f + 0.35f * abs(sin(t * 5f)) + Random.nextFloat() * 0.2f).coerceIn(0f, 1f))
                delay(16)
            }
        }
    }

    private fun stopPulse() {
        job?.cancel(); onAmplitude(0f); onFinished()
    }
}
