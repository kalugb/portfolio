import { useState, useEffect, useRef } from 'react'
import { Bot, Loader2, Send, User, X } from 'lucide-react'
import axios from 'axios'

const STORAGE_KEY = 'ai_chatbot_messages'

const savedMessages = sessionStorage.getItem(STORAGE_KEY)

const chatStore = {
  messages: savedMessages ? JSON.parse(savedMessages) : [],
  isLoading: false,
  listeners: new Set(),
}

function notify() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatStore.messages))
  chatStore.listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  chatStore.listeners.add(listener)
  return () => chatStore.listeners.delete(listener)
}

function clearChat() {
  sessionStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem('chatbotInitialMessage')
  chatStore.messages = []
  chatStore.isLoading = false
  notify()
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function sendMessage(text) {
  const trimmed = text.trim()
  if (!trimmed) return

  chatStore.messages = [...chatStore.messages, { sender: 'user', text: trimmed }]
  chatStore.isLoading = true
  notify()

  try {
    const res = await axios.post('/api/temp_chat_test', { message: trimmed })

    await delay(5000)

    chatStore.messages = [...chatStore.messages, { sender: 'bot', text: res.data.reply }]
  } catch (err) {
    console.error('Chat request failed:', err)
    chatStore.messages = [
      ...chatStore.messages,
      { sender: 'bot', text: 'Oops! Something went wrong. Please try again later.' },
    ]
  } finally {
    chatStore.isLoading = false
    notify()
  }
}

function AIChatbotTab() {
  const [, forceRender] = useState(0)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const unsubscribe = subscribe(() => forceRender((n) => n + 1))
    return unsubscribe
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatStore.messages, chatStore.isLoading])

  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setInput('')
    sendMessage(trimmed)
  }

  const formatMessageWithLineBreaks = (text) => {
    if (!text) return ''
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {chatStore.messages.length > 0 ? (
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {chatStore.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-third text-fourth' : 'bg-fourth text-first'}`}
              >
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-third text-fourth' : 'bg-second text-fourth'} whitespace-pre-wrap break-words`}
              >
                {formatMessageWithLineBreaks(msg.text)}
              </div>
            </div>
          ))}

          {chatStore.isLoading && (
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
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4 text-center text-sm text-fourth">
          <p>Welcome to the AI Chatbot! Type a message below to start the conversation.</p>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-third/30 p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="w-full rounded-lg border border-third/40 bg-first px-3 py-2 text-sm text-fourth outline-none transition-colors duration-200 focus:border-third h-10 max-h-32 resize-none overflow-y-auto"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearChat}
            aria-label="Clear chat"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-first transition-opacity duration-200 hover:bg-red-600 hover:cursor-pointer mr-auto"
          >
            <X size={18} />
            <span>Clear chat</span>
          </button>

          <button
            type="button"
            onClick={handleSend}
            aria-label="Send message"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-fourth text-first transition-opacity duration-200 hover:opacity-90 hover:cursor-pointer ml-auto"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatbotTab