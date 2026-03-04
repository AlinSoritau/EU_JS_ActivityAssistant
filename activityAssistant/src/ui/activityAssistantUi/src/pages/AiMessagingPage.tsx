import { useState, useEffect } from 'react'
import { getConversationMessages, sendMessage } from '../api/message.api'
import { createConversation } from '../api/conversation.api'
import type { Message } from '../types/message.types'

function AiMessagingPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')

    const conversationId = new URLSearchParams(window.location.search).get('conversationId')
    useEffect(() => {
        if (conversationId) {
            sessionStorage.setItem('currentConversationId', conversationId)
            const fetchMessages = async () => {
                try {
                    const data = await getConversationMessages(conversationId)
                    setMessages(data)
                } catch (error) {
                    console.error('Error fetching messages for conversation:', error)
                }
            }
            fetchMessages()
        }
    }, [conversationId])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        let currentConversationId = sessionStorage.getItem('currentConversationId') || ''
        const userMessage: Message = {
            message: input,
            conversationId: currentConversationId,
            isUserMessage: true
        }

        if (!currentConversationId) { 
            console.debug("No conversation ID provided, creating new conversation")
            const newConversationId = await createConversation({ userId: localStorage.getItem('userId') || '', topic: input })
            userMessage.conversationId = newConversationId
            sessionStorage.setItem('currentConversationId', newConversationId)
        }

        console.log("userMessage", userMessage)
        setMessages([...messages, userMessage])
        setInput('')

        setTimeout(async () => {
            const llmMessage = await sendMessage(userMessage)
            setMessages(prev => [...prev, llmMessage])
        }, 500)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h2>AI Messaging</h2>
            
            {/* Messages Container */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isUserMessage ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            maxWidth: '60%',
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: msg.isUserMessage ? '#007bff' : '#e9ecef',
                            color: msg.isUserMessage ? 'white' : 'black'
                        }}>
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div style={{ display: 'flex', gap: '8px', padding: '16px', borderTop: '1px solid #ddd' }}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    className='btn-send'
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
            <button className="btn-generic" onClick={() => window.location.href = '/ai-assistant'} >
                Back to Conversations
            </button>
        </div>
    )
}

export default AiMessagingPage