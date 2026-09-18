import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import {
  INITIAL_MESSAGES,
  getBotResponse,
  PERSONAL_INFO,
} from "../../constants";

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setShowTooltip(false);
    }
  }, [messages, isOpen]);

  const processResponse = (userText) => {
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const { botText, followUpOptions } = getBotResponse(userText);

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        options: followUpOptions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleOptionClick = (option) => {
    processResponse(option.label);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processResponse(inputValue.trim());
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Teaser Tooltip Popover */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-2 bg-secondary/95 text-primary text-xs font-extrabold px-3.5 py-2 rounded-2xl border border-divider/10 shadow-xl pointer-events-auto flex items-center gap-2"
          >
            <span>💬 Ask {PERSONAL_INFO.name.split(" ")[0]} AI Anything!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-third hover:text-primary text-[10px] ml-1 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Live Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 30,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[90vw] sm:w-[380px] h-[500px] mb-4 rounded-3xl glass-card border border-divider/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto bg-secondary/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-highlight/15 via-primary to-emerald-500/15 border-b border-divider/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-highlight text-dark flex items-center justify-center font-bold shadow-md">
                    <SmartToyIcon sx={{ fontSize: 20 }} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-secondary animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-primary tracking-wide">
                    {PERSONAL_INFO.name.split(" ")[0]} AI Assistant
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                    Online • Interactive Assistant
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-secondary/60 text-third hover:text-primary transition-colors cursor-pointer"
                aria-label="Close Chat Window"
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="w-7 h-7 rounded-xl bg-highlight/20 text-highlight flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        <SmartToyIcon sx={{ fontSize: 14 }} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-highlight text-dark font-medium rounded-br-none shadow-md"
                          : "bg-primary/70 text-primary rounded-bl-none shadow-sm whitespace-pre-line"
                      }`}
                    >
                      <div>{msg.text}</div>
                      <div
                        className={`text-[9px] mt-1.5 text-right ${
                          msg.sender === "user" ? "text-dark/70" : "text-third"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-7 h-7 rounded-xl bg-secondary text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        <PersonIcon sx={{ fontSize: 14 }} />
                      </div>
                    )}
                  </div>

                  {/* Interactive Quick Option Chips */}
                  {msg.sender === "bot" &&
                    msg.options &&
                    msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pl-9 max-w-[90%]">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionClick(opt)}
                            className="px-3 py-1.5 rounded-xl bg-highlight/15 hover:bg-highlight hover:text-dark text-highlight text-[11px] font-bold transition-all duration-300 shadow-sm cursor-pointer active:scale-95 text-left"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-highlight/20 text-highlight flex items-center justify-center flex-shrink-0">
                    <SmartToyIcon sx={{ fontSize: 14 }} />
                  </div>
                  <div className="bg-primary/70 p-3 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-highlight animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-highlight animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-highlight animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-divider/10 bg-primary/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question or select an option..."
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs transition-all"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-highlight text-dark font-bold hover:bg-white transition-all cursor-pointer shadow-md flex items-center justify-center active:scale-95"
              >
                <SendIcon sx={{ fontSize: 16 }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-4 rounded-2xl bg-highlight text-dark font-extrabold shadow-[0_0_25px_rgba(103,154,231,0.4)] cursor-pointer pointer-events-auto flex items-center justify-center group"
        aria-label="Open Live Chat"
      >
        <span className="absolute inset-0 rounded-2xl bg-highlight opacity-30 animate-ping pointer-events-none" />

        {isOpen ? (
          <CloseIcon sx={{ fontSize: 24 }} className="z-10" />
        ) : (
          <ChatIcon sx={{ fontSize: 24 }} className="z-10" />
        )}

        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 z-20 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-secondary shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default LiveChatWidget;
