import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationHistory from './ConversationHistory';
import { useChat } from '../context/ChatContext';

const ChatWindow = () => {
    const [inputValue, setInputValue] = useState('');
    const { messages, isLoading, sendMessage, startNewConversation } = useChat();

    // Start a new conversation on initial load
    useEffect(() => {
        startNewConversation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="app-container">
            <ConversationHistory />
            <div className="chat-window">
                <MessageList messages={messages} isLoading={isLoading} />
                <UserInput
                    inputValue={inputValue}
                    onInputChange={(e) => setInputValue(e.target.value)}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default ChatWindow;