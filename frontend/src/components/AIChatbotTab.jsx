import { useState } from 'react'
import { Bot, Send, User } from 'lucide-react'

function AIChatbotTab() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I\'m a placeholder chatbot. Ask me anything!' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }])
    setInput('')

    // TODO: Replace this block with actual API call to FastAPI backend, e.g.:
    // const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: trimmed }) });
    // const data = await res.json();
    // setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: 'This is a placeholder response.' },
    ])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                msg.sender === 'user' ? 'bg-third text-fourth' : 'bg-fourth text-first'
              }`}
            >
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <p
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                msg.sender === 'user'
                  ? 'bg-third text-fourth'
                  : 'bg-second text-fourth'
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-t border-third/30 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-third/40 bg-first px-3 py-2 text-sm text-fourth outline-none transition-colors duration-200 focus:border-third"
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send message"
          className="flex items-center justify-center rounded-lg bg-fourth px-3 py-2 text-first transition-opacity duration-200 hover:opacity-90"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}

export default AIChatbotTab
