import React from 'react';

const UserInput = ({ inputValue, onInputChange, onSendMessage, isLoading }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage();
        }
    };

    return (
        <form className="user-input" onSubmit={handleFormSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={onInputChange}
                placeholder="Type your message..."
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()}>
                Send
            </button>
        </form>
    );
};

export default UserInput;