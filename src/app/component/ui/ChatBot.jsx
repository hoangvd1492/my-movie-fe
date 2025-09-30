'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, MessageCircle, Maximize2, Trash2 } from 'lucide-react';
import { ChatBotService } from '@/app/_lib/service/chatBotService';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: 'Chào mừng đến với MyMovie! Đây là Website xem phim dùng dữ liệu của TMDB. Tôi có thể giúp gì cho bạn hôm nay?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatWindowRef = useRef(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);



    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await ChatBotService.sendMessage(userMessage.content, messages.slice(-10))

            if (response.ok) {
                const json = await response.json();

                const botMessage = {
                    id: Date.now() + 1,
                    type: 'bot',
                    content: json.data.botResponse,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                const json = await response.json()
                const botMessage = {
                    id: Date.now() + 1,
                    type: 'bot',
                    content: "Xin lỗi, hệ thống đang gặp sự cố.\n Tôi không thể hỗ trợ bạn ngay lúc này!",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            }
        } catch (error) {
            console.log(error);
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "Xin lỗi, hệ thống đang gặp sự cố.\n Tôi không thể hỗ trợ bạn ngay lúc này!",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };




    const handleClose = () => {
        if (isClosing) return;

        setIsClosing(true);

        if (chatWindowRef.current) {
            chatWindowRef.current.style.transition = 'all 0.3s ease-in-out';
            chatWindowRef.current.style.transform = 'translateX(100%) scale(0.95)';
            chatWindowRef.current.style.opacity = '0';
        }

        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);

            if (chatWindowRef.current) {
                chatWindowRef.current.style.transform = '';
                chatWindowRef.current.style.opacity = '';
                chatWindowRef.current.style.transition = '';
            }
        }, 300);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-hover text-white p-3 cursor-pointer rounded-full  duration-300 hover:scale-110 group fade-in"
                >
                    <div className="relative">
                        <MessageCircle size={20} />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                </button>
            )}

            {isOpen && (
                <div
                    ref={chatWindowRef}
                    className="fixed z-50 bg-background  border border-primary rounded-xl bottom-6 right-6  w-[300px] h-[500px] fade-in flex flex-col"
                >
                    <div className="bg-primary p-2 rounded-t-xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">ChatBot</h3>
                                <p className="text-white text-sm">AI Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleClose}
                                disabled={isClosing}
                                className="cursor-pointer text-white transition-colors hover:bg-white/10 rounded p-1"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="grow text-sm overflow-y-auto overscroll-contain p-4 space-y-4 messages-container ">
                        {messages.map((message, index) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message-container `}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div
                                    className={`text-white max-w-[80%] rounded-xl px-3 py-2 ${message.type === 'user'
                                        ? 'bg-primary'
                                        : 'bg-chat-message-bg-color text-primary!'
                                        }`}
                                >
                                    <div className="flex items-start gap-1">
                                        {message.type === 'bot' && (
                                            <Bot size={16} className=" text-primary mt-1 flex-shrink-0" />
                                        )}
                                        <div className="grow">
                                            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                                            <p className="text-xs mt-2">
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                        {message.type === 'user' && (
                                            <User className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="bg-chat-message-bg-color  rounded-xl px-4 py-3">
                                    <div className="flex items-center space-x-2">
                                        <Bot className="text-primary " size={14} />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex gap-1">
                            <div className="grow relative">
                                <textarea
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Bạn muốn hỏi gì..."
                                    className="text-sm w-full bg-primary rounded-sm px-4 py-2 text-white placeholder-white resize-none focus:outline-none scrollbar-hide"
                                    rows="2"
                                />
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className="h-8 w-8 bg-primary  hover:bg-primary-hover   cursor-pointer  disabled:cursor-default disabled:hover:bg-primary text-white p-2 rounded-sm flex justify-center items-center"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot; 