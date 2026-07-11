import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import AIChatbotTab from './AIChatbotTab'
import TalkToMeTab from './TalkToMeTab'

const tabs = [
  { id: 'chat', label: 'AI Chatbot' },
  { id: 'contact', label: 'Talk to Me' },
]

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-xl border border-third/30 bg-first shadow-2xl md:right-6 md:w-[380px]">
          <div className="flex border-b border-third/20 bg-second/60">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-first text-fourth'
                    : 'text-fourth/70 hover:text-fourth hover:bg-third/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' ? <AIChatbotTab /> : <TalkToMeTab />}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-fourth text-first shadow-lg transition-transform duration-300 hover:scale-105 md:right-6"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  )
}

export default ChatWidget
