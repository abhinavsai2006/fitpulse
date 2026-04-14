import { Bot, Send, Sparkles, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AIAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your FitPulse AI Coach. How can I help you crush your goals today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "That's a great approach. Let's keep pushing your limits!";
      if (userMsg.text.toLowerCase().includes("workout")) reply = "I suggest trying the 'HIIT Core Burner' today. It fits perfectly into your schedule.";
      if (userMsg.text.toLowerCase().includes("tired")) reply = "It's important to rest. Try some light Yoga or focusing on hydration and sleep today.";
      
      setMessages((prev) => [...prev, { id: Date.now(), text: reply, isBot: true }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 w-80 h-96 flex flex-col fp-glass z-50 rounded-2xl shadow-2xl overflow-hidden border border-white/[0.1] animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FF6B47]/10 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 text-[#FF6B47] font-bold text-sm">
          <Sparkles size={16} />
          FitPulse AI Coach
        </div>
        <button onClick={onClose} className="text-[#888ea0] hover:text-[#f0f0f5] transition">
          <X size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar" ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] px-3 py-2 text-sm rounded-xl ${m.isBot ? 'bg-white/[0.06] text-[#e8e8f0] rounded-tl-sm' : 'bg-gradient-to-r from-[#FF6B47] to-[#FF8A5C] text-white rounded-tr-sm'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] px-3 py-2 text-sm rounded-xl rounded-tl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#888ea0] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#888ea0] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-[#888ea0] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.06] bg-[#0c0c14]/50">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach..."
            className="w-full bg-[#16162a] border border-white/[0.08] text-sm text-[#f0f0f5] rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-[#FF6B47]/50"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center bg-[#FF6B47] text-white rounded-full disabled:opacity-50 transition"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
