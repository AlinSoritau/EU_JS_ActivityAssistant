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
            <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginTop: '16px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {conversations.map((conversation) => (
                        <li 
                            key={conversation.conversationId} 
                            style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                            onClick={() => window.location.href = `/ai-messaging?conversationId=${conversation.conversationId}`}
                        >
                            {conversation.topic || 'Untitled Conversation'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
}

export default AiConversationListPage