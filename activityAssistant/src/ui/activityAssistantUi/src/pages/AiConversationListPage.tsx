function AiConversationListPage() {
    const createNewConversation = () => {
        // Logic to create a new conversation
    }
    
    return<div>
            <h2>AI Conversation List</h2>
            <button className="btn-generic" onClick={createNewConversation}>
                New Conversation
            </button>
            <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginTop: '16px' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {/* Map through conversations here */}
                    <li style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                        Conversation 1
                    </li>
                </ul>
            </div>
        </div>
}

export default AiConversationListPage