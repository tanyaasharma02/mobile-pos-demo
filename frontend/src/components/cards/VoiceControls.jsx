export default function VoiceControls({ toggleListen, isListening }) {
  return (
    <button onClick={toggleListen} className="voice-btn">
      {isListening ? "🎙️ Stop" : "🎤 Speak"}
    </button>
  );
}
