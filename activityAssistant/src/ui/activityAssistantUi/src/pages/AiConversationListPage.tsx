import type { Conversation } from '../types/conversation.types'
import {  getConversationsByUserId } from '../api/conversation.api'
import { useEffect, useState } from 'react'

function AiConversationListPage() {
    const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const userId = localStorage.getItem('userId')
                if (userId) {
                    const data = await getConversationsByUserId(userId)
                    setConversations(data)
                }
            } catch (error) {
                console.error('Error fetching conversations:', error)
            }
        }

        fetchConversations()
    }, [])
    
    return<div>
            <h2>AI Conversation List</h2>
            <button className="btn-generic" onClick={() => window.location.href = '/ai-messaging'}>
                New Conversation
            </button>
            <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', marginTop: '16px', backgroundColor: '#f9f9f9' }}>
                <ul style={{ listStyle: 'none', padding: '8px', margin: 0 }}>
                    {conversations.map((conversation) => (
                        <li 
                            key={conversation.conversationId} 
                            style={{ 
                                padding: '6px', 
                                cursor: 'pointer', 
                                borderRadius: '6px',
                                marginBottom: '8px',
                                backgroundColor: '#7bdada',
                                color: 'black',
                                border: '1px solid #eee',
                                transition: 'all 0.2s ease',
                                fontSize: '14px'
                            }}
                            onClick={() => window.location.href = `/ai-messaging?conversationId=${conversation.conversationId}`}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5bafaf'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7bdada'}
                        >
                            {conversation.topic || 'Untitled Conversation'}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btn-generic" onClick={() => window.location.href = '/'} style={{ marginTop: '16px' }}>
                Back to Dashboard
            </button>
        </div>
}

export default AiConversationListPage