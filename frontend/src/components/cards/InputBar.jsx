export default function InputBar({ input, setInput, sendMessage }) {
  return (
    <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
      />
      <button onClick={() => sendMessage(input)}>Send</button>
    </div>
  );
}
