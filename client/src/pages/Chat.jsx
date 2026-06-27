import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages, postMessages } from "../api/messages.js";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./Chat.css";

const Chat = () => {
  const { convoId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(convoId);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [convoId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!inputMessage.trim() || loading) return;
    const text = inputMessage;
    setInputMessage("");
    setLoading(true);

    // Optimistically add user message
    setMessages((prev) => [
      ...prev,
      { message_id: Date.now(), sender: "user", content: text },
    ]);

    try {
      await postMessages(convoId, text);
      // Refresh to get both messages from DB
      await fetchMessages();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <span className="chat-header-title">⚛ SciTutor</span>
        <div style={{ width: 60 }} />
      </header>

      <div className="messages-area">
        {messages.length === 0 && !loading && (
          <div className="chat-empty">
            <p>Ask your first question to get started.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.message_id}
            className={`message-row ${msg.sender === "user" ? "user-row" : "ai-row"}`}
          >
            {msg.sender === "ai" && <div className="avatar ai-avatar">⚛</div>}
            <div
              className={`bubble ${msg.sender === "user" ? "user-bubble" : "ai-bubble"}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row ai-row">
            <div className="avatar ai-avatar">⚛</div>
            <div className="bubble ai-bubble typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <div className="input-bar">
          <textarea
            className="chat-input"
            placeholder="Ask a question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSubmit}
            disabled={loading || !inputMessage.trim()}
          >
            ↑
          </button>
        </div>
        <p className="input-hint">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default Chat;
