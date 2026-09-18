import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { INITIAL_MESSAGES, getBotResponse } from "../constants/chat";

// Local deterministic portfolio Q&A: no invented external AI service or network API.
const SUGGESTIONS = [
  "Tell me about your projects.",
  "What technologies do you use?",
  "How can I contact you?",
  "Show me your experience.",
];
export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const field = useRef(null);
  const log = useRef(null);
  const pending = useRef(null);
  const nextId = useRef(1);
  const autoScroll = useRef(true);
  const trigger = useRef(null);
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) field.current?.focus();
    else if (wasOpen.current) trigger.current?.focus();
    wasOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (!open || !autoScroll.current || !log.current) return;
    log.current.scrollTo({
      top: log.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [messages, open, loading]);
  useEffect(() => () => window.clearTimeout(pending.current), []);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const ask = (text) => {
    const value = text.trim();
    if (!value || loading) return;
    autoScroll.current = true;
    const id = nextId.current++;
    setMessages((items) => [
      ...items,
      { id: `user-${id}`, sender: "user", text: value },
    ]);
    setInput("");
    setLoading(true);
    // Short local typing state. Response continues to use the existing answer function.
    pending.current = window.setTimeout(() => {
      const answer = getBotResponse(value);
      setMessages((items) => [
        ...items,
        {
          id: `answer-${id}`,
          sender: "bot",
          text: answer.botText,
          options: answer.followUpOptions,
        },
      ]);
      setLoading(false);
    }, 260);
  };
  const clear = () => {
    window.clearTimeout(pending.current);
    setLoading(false);
    setMessages(INITIAL_MESSAGES);
    setInput("");
    autoScroll.current = true;
    field.current?.focus();
  };
  return (
    <aside className="assistant-wrap" aria-label="Portfolio assistant">
      {open && (
        <div
          className="assistant-panel"
          role="region"
          aria-label="Portfolio assistant conversation"
        >
          <div className="assistant-head">
            <div className="assistant-avatar">
              <Sparkles size={21} />
            </div>
            <div className="assistant-identity">
              <strong>Ask about Utsav</strong>
              <span>
                <i aria-hidden="true" /> AUTOMATED PORTFOLIO ASSISTANT
              </span>
            </div>
            <div className="assistant-head-actions">
              <button
                type="button"
                aria-label="Clear conversation"
                title="Clear conversation"
                onClick={clear}
              >
                <RotateCcw size={17} />
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div
            ref={log}
            className="assistant-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            onScroll={(event) => {
              const element = event.currentTarget;
              autoScroll.current =
                element.scrollHeight -
                  element.clientHeight -
                  element.scrollTop <
                85;
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`assistant-message ${msg.sender === "user" ? "assistant-user" : ""}`}
              >
                <span className="assistant-message-label">
                  {msg.sender === "user" ? "YOU" : "ASSISTANT"}
                </span>
                <p>{msg.text}</p>
                {msg.options && (
                  <div className="assistant-options">
                    {msg.options.map((option) => (
                      <button
                        type="button"
                        key={option.id}
                        disabled={loading}
                        onClick={() => ask(option.label)}
                      >
                        {option.label} <ArrowUp size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div
                className="assistant-message assistant-loading"
                role="status"
              >
                <span className="assistant-message-label">ASSISTANT</span>
                <div className="typing-dots">
                  <i />
                  <i />
                  <i />
                  <span className="sr-only">Preparing an answer</span>
                </div>
              </div>
            )}
          </div>
          <div
            className="assistant-suggestions"
            aria-label="Suggested questions"
          >
            {SUGGESTIONS.map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => ask(question)}
                disabled={loading}
              >
                {question}
              </button>
            ))}
          </div>
          <form
            className="assistant-compose"
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <label className="sr-only" htmlFor="assistant-input">
              Ask about the portfolio
            </label>
            <textarea
              id="assistant-input"
              ref={field}
              rows={1}
              maxLength={300}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  ask(input);
                }
              }}
              placeholder="Ask a question..."
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              {loading ? <Check size={18} /> : <ArrowUp size={18} />}
            </button>
          </form>
          <div className="assistant-disclaimer">
            Predefined replies based on portfolio content · No AI API
          </div>
        </div>
      )}
      <button
        ref={trigger}
        className="assistant-fab"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={
          open ? "Close portfolio assistant" : "Open portfolio assistant"
        }
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span>{open ? "CLOSE CHAT" : "ASK ME ANYTHING"}</span>
      </button>
    </aside>
  );
}
