import React from 'react';
import { useChat } from '../context/ChatContext';

const ConversationHistory = () => {
    const {
        conversationHistory,
        loadConversation,
        startNewConversation,
        currentConversationId
    } = useChat();

    // Get the first user message as the title
    const getTitle = (messages) => {
        const userMessage = messages.find(m => m.sender === 'user');
        return userMessage ? userMessage.text : 'New Chat';
    };

    return (
        <div className="history-panel">
            <button onClick={startNewConversation}>+ New Chat</button>
            <h3>History</h3>
            <ul>
                {Object.keys(conversationHistory).map((id) => (
                    <li
                        key={id}
                        onClick={() => loadConversation(id)}
                        style={{ backgroundColor: id === currentConversationId ? '#d1d1d6' : 'transparent' }}
                    >
                        {getTitle(conversationHistory[id])}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConversationHistory;