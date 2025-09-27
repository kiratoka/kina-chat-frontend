"use client"

import React, { useState } from 'react';
import { MessageCircle, Send, Search, MoreHorizontal, Settings, LogOut, Menu, X } from 'lucide-react';

interface User {
    id: string;
    name: string;
    username: string;
    lastMessage: string;
    time: string;
    online: boolean;
    unread: number;
    avatar?: string;
}

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    isMe: boolean;
}

interface ChatRoom {
    [userId: string]: Message[];
}

const ChatListPage = () => {
    const [message, setMessage] = useState('');
    const [activeChat, setActiveChat] = useState<string | null>('1');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Current user data
    const currentUser = {
        id: 'me',
        name: 'Ahmad Rizki',
        username: '@rizki_dev',
        avatar: '',
        bio: 'Frontend Developer | React & Next.js Enthusiast'
    };

    const users: User[] = [
        {
            id: '1',
            name: 'Alice Johnson',
            username: '@alice_j',
            lastMessage: 'Project sudah selesai! 🎉',
            time: '10:30',
            online: true,
            unread: 2
        },
        {
            id: '2',
            name: 'Bob Smith',
            username: '@bob_smith',
            lastMessage: 'Terima kasih untuk bantuannya!',
            time: '09:45',
            online: true,
            unread: 0
        },
        {
            id: '3',
            name: 'Carol Davis',
            username: '@carol_d',
            lastMessage: 'Meeting jam 9 pagi ya',
            time: 'Kemarin',
            online: false,
            unread: 1
        },
        {
            id: '4',
            name: 'David Wilson',
            username: '@david_w',
            lastMessage: 'File sudah dikirim',
            time: 'Kemarin',
            online: false,
            unread: 0
        },
        {
            id: '5',
            name: 'Eva Martinez',
            username: '@eva_m',
            lastMessage: 'Semangat coding! 💻',
            time: '2 hari lalu',
            online: true,
            unread: 3
        },
    ];

    // Chat rooms with different conversations for each user
    const chatRooms: ChatRoom = {
        '1': [
            { id: '1-1', senderId: '1', senderName: 'Alice Johnson', content: 'Halo Rizki! Gimana progress projectnya?', timestamp: '10:25', isMe: false },
            { id: '1-2', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Hai Alice! Hampir selesai nih, tinggal finishing touches', timestamp: '10:27', isMe: true },
            { id: '1-3', senderId: '1', senderName: 'Alice Johnson', content: 'Wah keren! UI/UX nya udah bagus banget 🎨', timestamp: '10:28', isMe: false },
            { id: '1-4', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Terima kasih! Masih ada yang mau dipoles lagi sih', timestamp: '10:29', isMe: true },
            { id: '1-5', senderId: '1', senderName: 'Alice Johnson', content: 'Project sudah selesai! 🎉 Client sangat puas', timestamp: '10:30', isMe: false },
        ],
        '2': [
            { id: '2-1', senderId: '2', senderName: 'Bob Smith', content: 'Rizki, bisa bantu review code saya?', timestamp: '09:40', isMe: false },
            { id: '2-2', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Sure! Kirim aja link GitHub-nya', timestamp: '09:41', isMe: true },
            { id: '2-3', senderId: '2', senderName: 'Bob Smith', content: 'https://github.com/bobsmith/react-project', timestamp: '09:42', isMe: false },
            { id: '2-4', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Oke, udah saya review. Overall bagus, ada beberapa saran minor aja', timestamp: '09:44', isMe: true },
            { id: '2-5', senderId: '2', senderName: 'Bob Smith', content: 'Terima kasih untuk bantuannya! Sangat membantu 🙏', timestamp: '09:45', isMe: false },
        ],
        '3': [
            { id: '3-1', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Carol, meeting besok jam berapa ya?', timestamp: '16:20', isMe: true },
            { id: '3-2', senderId: '3', senderName: 'Carol Davis', content: 'Jam 9 pagi. Jangan telat ya! 😄', timestamp: '16:25', isMe: false },
            { id: '3-3', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Siap! Ada yang perlu saya prepare?', timestamp: '16:26', isMe: true },
            { id: '3-4', senderId: '3', senderName: 'Carol Davis', content: 'Meeting jam 9 pagi ya. Bawa laptop dan notes', timestamp: '16:28', isMe: false },
        ],
        '4': [
            { id: '4-1', senderId: '4', senderName: 'David Wilson', content: 'File design yang kemarin sudah saya revisi', timestamp: '14:30', isMe: false },
            { id: '4-2', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Perfect! Terima kasih David', timestamp: '14:32', isMe: true },
            { id: '4-3', senderId: '4', senderName: 'David Wilson', content: 'File sudah dikirim ke email kamu juga', timestamp: '14:35', isMe: false },
            { id: '4-4', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Noted, will check soon!', timestamp: '14:36', isMe: true },
        ],
        '5': [
            { id: '5-1', senderId: '5', senderName: 'Eva Martinez', content: 'Rizki! Sudah coba framework baru belum?', timestamp: '11:15', isMe: false },
            { id: '5-2', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Belum nih, lagi fokus Next.js. Kamu recommend apa?', timestamp: '11:18', isMe: true },
            { id: '5-3', senderId: '5', senderName: 'Eva Martinez', content: 'Coba Svelte deh, sangat lightweight!', timestamp: '11:20', isMe: false },
            { id: '5-4', senderId: 'me', senderName: 'Ahmad Rizki', content: 'Interesting! Nanti saya explore', timestamp: '11:22', isMe: true },
            { id: '5-5', senderId: '5', senderName: 'Eva Martinez', content: 'Semangat coding! 💻 Keep learning!', timestamp: '11:25', isMe: false },
        ],
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeUser = users.find(user => user.id === activeChat);
    const currentMessages = activeChat ? chatRooms[activeChat] || [] : [];

    const handleSendMessage = () => {
        if (message.trim() && activeChat) {
            const newMessage: Message = {
                id: `${activeChat}-${Date.now()}`,
                senderId: 'me',
                senderName: currentUser.name,
                content: message,
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                isMe: true
            };
            
            // In a real app, you would send this to your backend
            console.log('Sending message:', newMessage);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const handleProfileClick = () => {
        // In a real Next.js app, use: router.push('/profile')
        console.log('Navigate to /profile');
        window.location.href = '/profile';
    };

    const handleChatSelect = (userId: string) => {
        setActiveChat(userId);
        setIsMobileMenuOpen(false); // Close mobile menu when selecting chat
    };

    return (
        <div className="h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex relative">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 fixed lg:relative z-50 w-80 sm:w-96 lg:w-80 xl:w-96 bg-gradient-to-br from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-r border-pink-300/40 flex flex-col transition-transform duration-300 ease-in-out h-full`}>
                
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header with Profile */}
                <div className="p-4 lg:p-6 border-b border-pink-300/50">
                    {/* Current User Profile */}
                    <div 
                        onClick={handleProfileClick}
                        className="flex items-center space-x-3 mb-4 p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-300/30 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <span className="text-sm font-bold text-white">
                                {getInitials(currentUser.name)}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">{currentUser.name}</p>
                            <p className="text-sm text-gray-600 truncate">{currentUser.username}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                    className="p-2 rounded-full hover:bg-pink-200/50 transition-colors duration-200"
                                >
                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                </button>
                                {showUserMenu && (
                                    <div className="absolute right-0 top-12 bg-white/95 backdrop-blur-sm border border-pink-300/50 rounded-2xl shadow-xl py-2 w-48 z-20">
                                        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-pink-100/50 transition-colors duration-200">
                                            <Settings className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm text-gray-700">Pengaturan</span>
                                        </button>
                                        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-pink-100/50 transition-colors duration-200 text-red-600">
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Keluar</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Kina Chat</h1>
                            <p className="text-sm text-gray-600">{users.filter(u => u.online).length} orang online</p>
                        </div>
                    </div>
                    
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-pink-300/50 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 backdrop-blur-sm"
                            placeholder="Cari kontak..."
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleChatSelect(user.id)}
                            className={`p-4 border-b border-pink-300/30 cursor-pointer transition-all duration-200 hover:bg-pink-200/40 ${
                                activeChat === user.id ? 'bg-gradient-to-r from-pink-200/60 to-purple-200/60 border-r-4 border-purple-500' : ''
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-semibold text-white">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                    {user.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{user.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                                        {user.unread > 0 && (
                                            <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center ml-2 flex-shrink-0">
                                                {user.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-300/50 hover:bg-white transition-all duration-200"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col lg:ml-0">
                {activeUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 lg:p-6 bg-gradient-to-r from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-b border-pink-300/40">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                                    <span className="text-sm lg:text-base font-semibold text-white">
                                        {getInitials(activeUser.name)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-gray-800 text-lg lg:text-xl truncate">{activeUser.name}</h2>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm text-gray-600 truncate">{activeUser.username}</p>
                                        <p className={`text-sm flex-shrink-0 ${activeUser.online ? 'text-green-600' : 'text-gray-400'}`}>
                                            {activeUser.online ? '● Online' : '● Offline'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                            {currentMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                                        msg.isMe 
                                            ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' 
                                            : 'bg-white/90 backdrop-blur-sm text-gray-800 border border-pink-300/50'
                                    }`}>
                                        <p className="text-sm lg:text-base leading-relaxed">{msg.content}</p>
                                        <p className={`text-xs mt-1 ${msg.isMe ? 'text-pink-100' : 'text-gray-500'}`}>
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 lg:p-6 bg-gradient-to-r from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-t border-pink-300/40">
                            <div className="flex space-x-3 lg:space-x-4">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 px-4 py-3 bg-white/60 border border-pink-300/50 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200 backdrop-blur-sm text-sm lg:text-base"
                                />
                                <button 
                                    onClick={handleSendMessage}
                                    className="px-4 lg:px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm lg:text-base">Kirim</span>
                                </button>
                            </div>
                        </div>
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
        </div>
    );
};

export default ChatListPage;