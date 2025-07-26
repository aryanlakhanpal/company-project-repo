import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages, isLoading }) => {
    const endOfMessagesRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <div className="loading-indicator">AI is typing...</div>}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

export default MessageList;