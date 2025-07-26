import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    // ... (state definitions remain the same)
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState({});
    const [currentConversationId, setCurrentConversationId] = useState(null);

    // ... (startNewConversation and loadConversation remain the same)
    const startNewConversation = () => {
        const newId = `conv_${Date.now()}`;
        setCurrentConversationId(newId);
        setMessages([]);
    };

    const loadConversation = (id) => {
        setCurrentConversationId(id);
        setMessages(conversationHistory[id] || []);
    };


    const sendMessage = async (text) => {
        if (!currentConversationId) {
            console.error("No active conversation.");
            return;
        }

        const newUserMessage = { id: Date.now(), text, sender: 'user' };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    conversationId: currentConversationId,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiResponse = { id: Date.now() + 1, text: data.response, sender: 'ai' };

            const finalMessages = [...updatedMessages, aiResponse];
            setMessages(finalMessages);

            // Save to history
            setConversationHistory(prev => ({ ...prev, [currentConversationId]: finalMessages }));

        } catch (error) {
            console.error('Failed to send message:', error);
            const errorResponse = { id: Date.now() + 1, text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'ai' };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        messages,
        isLoading,
        sendMessage,
        conversationHistory,
        currentConversationId,
        loadConversation,
        startNewConversation
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};