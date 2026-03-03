import { useState } from 'react'
import { sendMessage } from '../api/message.api'
import { createConversation } from '../api/conversation.api'
import type { Message } from '../types/message.types'

function AiMessagingPage({ conversationId }: { conversationId: string }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            text: input,
            conversationId: ""
        }

        if (!conversationId) { 
            console.debug("No conversation ID provided, creating new conversation")
            await createConversation({ userId: localStorage.getItem('userId') || '', topic: input })
                .then(data => {
                    console.debug("Conversation created with ID:", data)
                    userMessage.conversationId = data})
                .catch(error => {
                    console.error('Error creating conversation:', error)
                })
        }

        console.log("userMessage", userMessage)
        setMessages([...messages, userMessage])
        setInput('')

        // Simulate LLM response
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
                            {msg.text}
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
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default AiMessagingPage