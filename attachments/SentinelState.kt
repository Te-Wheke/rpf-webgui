package com.xchat.sentinel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlin.random.Random

enum class SentinelPhase(val label: String) {
    Idle("Idle"), Listening("Listening"), Thinking("Thinking"), Speaking("Speaking")
}

data class Telemetry(
    val cpu: Float = 0f,        // 0..1
    val ram: Float = 0f,        // 0..1
    val gpu: Float = 0f,        // 0..1
    val tokensPerSec: Float = 0f,
    val latencyMs: Int = 0,
)

data class SentinelUiState(
    val phase: SentinelPhase = SentinelPhase.Idle,
    val thinking: String = "",
    val output: String = "",
    val telemetry: Telemetry = Telemetry(),
    val tokHistory: List<Float> = emptyList(),
    val connected: Boolean = false,
)

class SentinelViewModel : ViewModel() {
    private val _ui = MutableStateFlow(SentinelUiState())
    val ui: StateFlow<SentinelUiState> = _ui.asStateFlow()

    // Separate flow: changes ~60x/s and must NOT recompose the screen. The orb reads it in draw.
    private val _amp = MutableStateFlow(0f)
    val amplitude: StateFlow<Float> = _amp.asStateFlow()

    private var demoJob: Job? = null

    // ---- Hooks for your real pipeline -------------------------------------------------
    fun setPhase(p: SentinelPhase) = _ui.update { it.copy(phase = p) }
    fun setAmplitude(a: Float) { _amp.value = a.coerceIn(0f, 1f) }
    fun appendThinking(s: String) = _ui.update { it.copy(thinking = (it.thinking + s).takeLast(4000)) }
    fun appendOutput(s: String) = _ui.update { it.copy(output = it.output + s) }
    fun clearStreams() = _ui.update { it.copy(thinking = "", output = "") }
    fun setTelemetry(t: Telemetry) = _ui.update {
        it.copy(telemetry = t, tokHistory = (it.tokHistory + t.tokensPerSec).takeLast(40))
    }

    // ---- Sentinel hello ---------------------------------------------------------------
    private var greeted = false
    fun hello(speak: (String) -> Unit) {
        if (greeted) return
        greeted = true
        val line = "Hello. I'm Sentinel."
        viewModelScope.launch {
            delay(600)
            setPhase(SentinelPhase.Speaking)
            speak(line)
            for (ch in line) { appendOutput(ch.toString()); delay(45) }
            delay(700)
            setPhase(SentinelPhase.Idle)
        }
    }

    // ---- Demo data (replace with real streams) ----------------------------------------
    fun runDemo(speak: (String) -> Unit) {
        demoJob?.cancel()
        demoJob = viewModelScope.launch {
            clearStreams()
            setPhase(SentinelPhase.Listening)
            repeat(40) { setAmplitude(0.2f + Random.nextFloat() * 0.5f); tick(); delay(50) }
            setPhase(SentinelPhase.Thinking)
            setAmplitude(0.1f)
            for (w in "Parsing request… checking local context… planning a short answer…".split(" ")) {
                appendThinking("$w "); tick(); delay(110)
            }
            setPhase(SentinelPhase.Speaking)
            val answer = "Here is a concise answer, streamed token by token."
            speak(answer)
            for (w in answer.split(" ")) { appendOutput("$w "); tick(); delay(140) }
            setAmplitude(0f)
            setPhase(SentinelPhase.Idle)
        }
    }

    private fun tick() {
        val t = _ui.value.telemetry
        fun walk(v: Float) = (v + (Random.nextFloat() - 0.5f) * 0.12f).coerceIn(0.05f, 0.98f)
        setTelemetry(
            Telemetry(
                cpu = walk(if (t.cpu == 0f) 0.3f else t.cpu),
                ram = walk(if (t.ram == 0f) 0.5f else t.ram),
                gpu = walk(if (t.gpu == 0f) 0.6f else t.gpu),
                tokensPerSec = (18f + Random.nextFloat() * 14f),
                latencyMs = 120 + Random.nextInt(80),
            )
        )
    }
}
