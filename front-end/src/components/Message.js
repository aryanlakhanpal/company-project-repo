import React from 'react';

const Message = ({ message }) => {
    // Differentiates style based on the sender ('user' or 'ai')
    const messageClass = `message ${message.sender}`;

    return (
        <div className={messageClass}>
            <div className="message-bubble">
                {message.text}
            </div>
        </div>
    );
};

export default Message;