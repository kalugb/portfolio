import { useState, useEffect } from 'react'
import { Bot, Loader2, Send, User } from 'lucide-react'
import axios from 'axios'

const STORAGE_KEY = 'ai_chatbot_messages'

function AIChatbotTab() {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved
      ? JSON.parse(saved)
      : [
          { sender: 'bot', text: 'Hello! I am your AI assistant. How can I help you today?' },
        ]
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await axios.post("/api/test_chat", { message: trimmed })

      setMessages((prev) => [...prev, {sender: 'bot', text: res.data.reply}])
    } catch (err) {
      console.error(err)

      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' }])
    } finally {
      setIsLoading(false)
    }
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
            className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-third text-fourth' : 'bg-fourth text-first'}`}
            >
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <p
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-third text-fourth' : 'bg-second text-fourth'}`}
            >
              {msg.text}
            </p>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fourth text-first">
              <Bot size={14} />
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-second px-3 py-2 text-sm text-fourth">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
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
