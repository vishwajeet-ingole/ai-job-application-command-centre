import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I am your AI Career Coach 🚀 Ask me anything." },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // ---------------- SEND MESSAGE ----------------
  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      const aiMsg = {
        role: "ai",
        text: data.reply || "🤖 No response",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Backend not running" },
      ]);
    }
  };

  return (
    <div style={styles.box}>
      <h3>🤖 AI Career Chat</h3>

      {/* 💡 Suggestions */}
      <div style={styles.suggestions}>
        💡 Try: "Improve my resume", "Interview tips", "DSA roadmap", "Job strategy"
      </div>

      {/* CHAT WINDOW */}
      <div style={styles.chatWindow} ref={chatRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span style={m.role === "user" ? styles.user : styles.ai}>
              {m.role === "ai" ? "🤖 " : ""}{m.text}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT ROW */}
      <div style={styles.row}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about resume, jobs, interviews..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
        />

        <button onClick={send} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  box: {
    marginTop: 20,
    padding: 20,
    background: "#1e293b",
    borderRadius: 10,
    color: "white",
  },

  chatWindow: {
    height: 220,
    overflowY: "auto",
    background: "#0f172a",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  row: {
    display: "flex",
    gap: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "none",
    color: "black",
    background: "white",
  },

  button: {
    padding: "10px 15px",
    background: "#3b82f6",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
  },

  user: {
    background: "#3b82f6",
    padding: "8px 10px",
    borderRadius: 8,
    color: "white",
    display: "inline-block",
  },

  ai: {
    background: "#e2e8f0",
    padding: "8px 10px",
    borderRadius: 8,
    color: "black",
    display: "inline-block",
  },

  suggestions: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 10,
  },
};