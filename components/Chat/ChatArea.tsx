"use client"
import { ChatUser, Message, User } from "@/lib/types/type";
import { Check, CheckCheck, Clock, MessageCircle, Send } from "lucide-react";
import { JSX } from "react";
interface ChatAreaProps {
    activeUser: ChatUser | undefined;
    handleUserProfileClick: (username: string) => void;
    renderAvatar: (user: User) => React.ReactNode;
    currentMessages: Message[];
    handleLongPress: (messageId: string) => void;
    handleMessageSelect: (messageId: string) => void;
    handleSendMessage: () => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    isSelectionMode: boolean;
    selectedMessages: Set<string>;
    message: string;
    setMessage: (message: string) => void;
}

const ChatArea = ({ activeUser, handleUserProfileClick, renderAvatar, currentMessages, handleLongPress, handleMessageSelect, handleSendMessage, handleKeyPress, isSelectionMode, selectedMessages, message, setMessage }: ChatAreaProps) => {


    const renderMessageStatus = (message: Message): JSX.Element | null => {
        if (!message.isMe || message.deletedAt) return null;

        switch (message.status) {
            case 'sending':
                return <Clock className="w-3 h-3 text-gray-400 animate-spin" />;
            case 'sent':
                return <Check className="w-3 h-3 text-gray-300" />;
            case 'read':
                return <CheckCheck className="w-3 h-3 text-blue-400" />;
            default:
                return <Check className="w-3 h-3 text-gray-300" />;
        }
    };
    return (
        <>
            {/* 👉 Chat Area START */}
            <div className={`flex-1 flex flex-col lg:ml-0 ${isSelectionMode ? 'pt-16' : ''}`}>

                {activeUser ? (
                    <>
                        {/* 👉 Chat Header START */}
                        <div className="p-4 lg:p-6 bg-gradient-to-r from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-b border-pink-300/40">
                            <div className="flex items-center space-x-3">
                                <div
                                    onClick={() => handleUserProfileClick(activeUser.username)}
                                    className="cursor-pointer hover:scale-105 transition-transform duration-200 max-lg:ml-16"
                                >
                                    {renderAvatar(activeUser)}
                                </div>
                                <div className="min-w-0">
                                    <h2
                                        onClick={() => handleUserProfileClick(activeUser.username)}
                                        className="font-semibold text-gray-800 text-lg lg:text-xl truncate cursor-pointer hover:text-purple-600 transition-colors duration-200"
                                    >
                                        {activeUser.name}
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <p
                                            onClick={() => handleUserProfileClick(activeUser.username)}
                                            className="text-sm text-gray-600 truncate cursor-pointer hover:text-purple-600 transition-colors duration-200"
                                        >
                                            @{activeUser.username}
                                        </p>
                                        <p className={`text-sm flex-shrink-0 ${activeUser.online ? 'text-green-600' : 'text-gray-400'}`}>
                                            {activeUser.online ? '● Online' : '● Offline'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 👉 Chat Header End */}

                        {/* 👉 Messages START */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                            {currentMessages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    <div
                                        className={`max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm relative ${msg.isMe
                                            ? msg.deletedAt
                                                ? 'bg-gray-300 text-gray-600 italic'
                                                : selectedMessages.has(msg.id)
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                                            : msg.deletedAt
                                                ? 'bg-gray-200 text-gray-600 italic'
                                                : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-pink-300/50'
                                            } ${msg.isMe && !msg.deletedAt ? 'cursor-pointer' : ''}`}
                                        onTouchStart={() => {
                                            if (msg.isMe && !msg.deletedAt) {
                                                const timer = setTimeout(() => handleLongPress(msg.id), 500);
                                                const cleanup = () => clearTimeout(timer);
                                                document.addEventListener('touchend', cleanup, { once: true });
                                                document.addEventListener('touchmove', cleanup, { once: true });
                                            }
                                        }}
                                        onMouseDown={() => {
                                            if (msg.isMe && !msg.deletedAt) {
                                                const timer = setTimeout(() => handleLongPress(msg.id), 500);
                                                const cleanup = () => clearTimeout(timer);
                                                document.addEventListener('mouseup', cleanup, { once: true });
                                                document.addEventListener('mousemove', cleanup, { once: true });
                                            }
                                        }}
                                        onClick={() => {
                                            if (isSelectionMode && msg.isMe && !msg.deletedAt) {
                                                handleMessageSelect(msg.id);
                                            }
                                        }}
                                    >
                                        <p className="text-sm lg:text-base leading-relaxed">{msg.content}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className={`text-xs ${msg.isMe
                                                ? msg.deletedAt ? 'text-gray-500' : selectedMessages.has(msg.id) ? 'text-purple-100' : 'text-pink-100'
                                                : msg.deletedAt ? 'text-gray-500' : 'text-gray-500'
                                                }`}>
                                                {msg.timestamp}
                                                {msg.deletedAt && ' • Dihapus'}
                                            </p>
                                        </div>

                                        {/* selection indicator (checkbox-like) */}
                                        {isSelectionMode && msg.isMe && !msg.deletedAt && (
                                            <div className="absolute -top-2 -right-2">
                                                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${selectedMessages.has(msg.id) ? 'bg-purple-600' : 'bg-gray-300'}`}>
                                                    {selectedMessages.has(msg.id) && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* message status */}
                                    <div className={`mt-1 flex items-center justify-end ${msg.isMe ? '' : 'hidden'}`}>
                                        {renderMessageStatus(msg)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* 👉 Messages End */}

                        {/* 👉 Message Input START */}
                        <div className="p-4 lg:p-6 bg-gradient-to-r from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-t border-pink-300/40">
                            <div className="flex space-x-3 lg:space-x-4">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 px-4 py-3 bg-white/60 border border-pink-300/50 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 backdrop-blur-sm text-sm lg:text-base"
                                    disabled={isSelectionMode}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isSelectionMode}
                                    className="px-4 lg:px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 flex-shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm lg:text-base">Kirim</span>
                                </button>
                            </div>
                        </div>
                        {/* 👉 Message Input End */}
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-3">Pilih Percakapan</h3>
                            <p className="text-gray-600 text-base lg:text-lg">Pilih kontak untuk mulai mengobrol</p>
                        </div>
                    </div>
                )}
            </div>
            {/* 👉 Chat Area End */}
        </>
    )
}

export default ChatArea