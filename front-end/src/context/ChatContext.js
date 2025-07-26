import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, this would be part of a larger state structure
    const [conversationHistory, setConversationHistory] = useState({});
    const [currentConversationId, setCurrentConversationId] = useState(null);

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
        const newUserMessage = { id: Date.now(), text, sender: 'user' };
        
        // Optimistically update UI
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setIsLoading(true);

        // --- Mock AI Response ---
        // In a real app, you would make an API call to your backend here.
        // For example: `const response = await fetch('/api/chat', { ... });`
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const aiResponse = { id: Date.now() + 1, text: `Echo: ${text}`, sender: 'ai' };
        // --- End Mock AI Response ---
        
        const finalMessages = [...updatedMessages, aiResponse];
        setMessages(finalMessages);
        setIsLoading(false);
        
        // Save to history
        if (currentConversationId) {
            setConversationHistory(prev => ({ ...prev, [currentConversationId]: finalMessages }));
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