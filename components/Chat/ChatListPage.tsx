"use client"

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    MessageCircle,
    Send,
    Search,
    MoreHorizontal,
    Settings,
    LogOut,
    Menu,
    X,
    Check,
    CheckCheck,
    Clock,
    Trash2,
    PlusCircle
} from 'lucide-react';
import { ChatRooms, ChatUser, Message, UnreadCount, User } from '@/lib/types/type';
import { dummyChatRooms } from '@/lib/dummy';
import ChatArea from './ChatArea';
import SideBar from './SideBar';

const ChatListPage = () => {
    const router = useRouter();

    // -------------------- STATE --------------------
    const [message, setMessage] = useState<string>('');
    const [activeChat, setActiveChat] = useState<string | null>('0');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [messageToDelete, setMessageToDelete] = useState<string | null>(null);

    const [unreadMessages, setUnreadMessages] = useState<UnreadCount>({
        '1': 2,
        '2': 0,
        '3': 1,
        '4': 0,
        '5': 3
    });

    // -------------------- DATA USER --------------------
    const currentUser: User = {
        id: 'me',
        name: 'Kinaaa',
        username: 'kina_cutee',
        avatar: 'https://i.pinimg.com/736x/e0/50/09/e05009ef05fc3b525d5d30a1d1c74ec3.jpg',
        bio: 'Frontend Developer | React & Next.js Enthusiast',
    };

    const users: ChatUser[] = [
        {
            id: '1',
            name: 'Alice Johnson',
            username: 'alice_j',
            avatar: '',
            lastMessage: 'Project sudah selesai! 🎉',
            time: '10:30',
            online: true,
            unread: unreadMessages['1'] || 0
        },
        {
            id: '2',
            name: 'Bob Smith',
            username: 'bob_smith',
            avatar: '',
            lastMessage: 'Terima kasih untuk bantuannya!',
            time: '09:45',
            online: true,
            unread: unreadMessages['2'] || 0
        },
        {
            id: '3',
            name: 'Carol Davis',
            username: 'carol_d',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            lastMessage: 'Meeting jam 9 pagi ya',
            time: 'Kemarin',
            online: false,
            unread: unreadMessages['3'] || 0
        },
        {
            id: '4',
            name: 'David Wilson',
            username: 'david_w',
            avatar: '',
            lastMessage: 'File sudah dikirim',
            time: 'Kemarin',
            online: false,
            unread: unreadMessages['4'] || 0
        },
        {
            id: '5',
            name: 'Eva Martinez',
            username: 'eva_m',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
            lastMessage: 'Semangat coding! 💻',
            time: '2 hari lalu',
            online: true,
            unread: unreadMessages['5'] || 0
        },
    ];

    // chatRooms state (dummy)
    const [chatRooms, setChatRooms] = useState<ChatRooms>(dummyChatRooms as ChatRooms);

    // -------------------- COMPUTED --------------------
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeUser = users.find(user => user.id === activeChat);
    const currentMessages = activeChat ? chatRooms[activeChat] || [] : [];

    // -------------------- HANDLERS --------------------
    const handleSendMessage = (): void => {
        if (message.trim() && activeChat) {
            const newMessage: Message = {
                id: `${activeChat}-${Date.now()}`,
                senderId: 'me',
                senderName: currentUser.name,
                content: message,
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                isMe: true,
                status: 'sending'
            };

            setChatRooms(prev => ({
                ...prev,
                [activeChat]: [...(prev[activeChat] || []), newMessage]
            }));

            setMessage('');

            // simulate sending -> sent -> read
            setTimeout(() => {
                setChatRooms(prev => ({
                    ...prev,
                    [activeChat]: prev[activeChat].map(msg =>
                        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
                    )
                }));

                setTimeout(() => {
                    setChatRooms(prev => ({
                        ...prev,
                        [activeChat]: prev[activeChat].map(msg =>
                            msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
                        )
                    }));
                }, 2000);
            }, 1000);
        }
    };

    const handleLongPress = (messageId: string): void => {
        const message = currentMessages.find(msg => msg.id === messageId);
        if (message?.isMe && !message.deletedAt) {
            setIsSelectionMode(true);
            setSelectedMessages(new Set([messageId]));
        }
    };

    const handleMessageSelect = (messageId: string): void => {
        if (!isSelectionMode) return;

        setSelectedMessages(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(messageId)) newSelected.delete(messageId);
            else newSelected.add(messageId);
            return newSelected;
        });
    };

    const handleDeleteSelected = (): void => {
        if (selectedMessages.size === 1) {
            setMessageToDelete(Array.from(selectedMessages)[0]);
            setShowDeleteConfirm(true);
        } else if (selectedMessages.size > 1) {
            setShowDeleteConfirm(true);
        }
    };

    const confirmDeleteMessage = (): void => {
        if (!activeChat) return;

        const messagesToDelete = messageToDelete ? [messageToDelete] : Array.from(selectedMessages);

        setChatRooms(prev => ({
            ...prev,
            [activeChat]: prev[activeChat].map(msg =>
                messagesToDelete.includes(msg.id) ? {
                    ...msg,
                    content: 'Pesan telah dihapus',
                    deletedAt: new Date().toISOString()
                } : msg
            )
        }));

        setShowDeleteConfirm(false);
        setMessageToDelete(null);
        setSelectedMessages(new Set());
        setIsSelectionMode(false);
    };

    const cancelSelection = (): void => {
        setIsSelectionMode(false);
        setSelectedMessages(new Set());
        setShowDeleteConfirm(false);
        setMessageToDelete(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleProfileClick = (): void => {
        router.push('/profile');
    };

    const handleUserProfileClick = (username: string): void => {
        router.push(`/profile/${username}`);
    };

    const handleChatSelect = (userId: string): void => {
        setActiveChat(userId);
        setIsMobileMenuOpen(false);
        setIsSelectionMode(false);
        setSelectedMessages(new Set());

        // mark unread -> 0
        setUnreadMessages(prev => ({ ...prev, [userId]: 0 }));

        setChatRooms(prev => ({
            ...prev,
            [userId]: prev[userId]?.map(msg =>
                !msg.isMe ? { ...msg, status: 'read' } : msg
            ) || []
        }));
    };

    // -------------------- UTIL --------------------
    const getInitials = (name: string): string => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };



    const renderAvatar = (user: User | ChatUser, size: 'sm' | 'md' | 'lg' = 'md'): JSX.Element => {
        const sizeClasses = {
            sm: 'w-8 h-8 text-xs',
            md: 'w-12 h-12 text-sm',
            lg: 'w-16 h-16 text-base'
        };

        if (user?.avatar) {
            return (
                <img
                    src={user.avatar}
                    alt={user.name}
                    className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white/50`}
                />
            );
        }

        return (
            <div className={`${sizeClasses[size]} bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center border-2 border-white/50`}>
                <span className="font-semibold text-white">{getInitials(user?.name || '')}</span>
            </div>
        );
    };

    // -------------------- UI --------------------
    return (
        <div className="h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex relative">

            {/* 👉 Modal konfirmasi hapus START */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Hapus Pesan</h3>
                        <p className="text-gray-600 mb-6">
                            {selectedMessages.size > 1
                                ? `Apakah Anda yakin ingin menghapus ${selectedMessages.size} pesan ini?`
                                : 'Apakah Anda yakin ingin menghapus pesan ini?'}
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={cancelSelection}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDeleteMessage}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* 👉 Modal konfirmasi hapus End */}

            {/* 👉 Header mode selection START */}
            {isSelectionMode && (
                <div className="fixed top-0 left-0 right-0 bg-purple-500 text-white p-4 z-40 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={cancelSelection}><X className="w-6 h-6" /></button>
                        <span>{selectedMessages.size} pesan dipilih</span>
                    </div>
                    <button
                        onClick={handleDeleteSelected}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
                        disabled={selectedMessages.size === 0}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            )}
            {/* 👉 Header mode selection End */}

            {/* 👉 Overlay mobile menu START */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            {/* 👉 Overlay mobile menu End */}


            
            <SideBar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} handleProfileClick={handleProfileClick} renderAvatar={renderAvatar} currentUser={currentUser} setShowUserMenu={setShowUserMenu} showUserMenu={showUserMenu} users={users} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredUsers={filteredUsers} activeChat={activeChat || ''} handleChatSelect={handleChatSelect} />



            {/* 👉 Mobile menu button START */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-300/50 hover:bg-white transition-all duration-200 cursor-pointer"
                title="Buka daftar chat (mobile)"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>
            {/* 👉 Mobile menu button End */}

            <ChatArea activeUser={activeUser} handleUserProfileClick={handleUserProfileClick} renderAvatar={renderAvatar} currentMessages={currentMessages} handleLongPress={handleLongPress} handleMessageSelect={handleMessageSelect} handleSendMessage={handleSendMessage} handleKeyPress={handleKeyPress} isSelectionMode={isSelectionMode} selectedMessages={selectedMessages} message={message} setMessage={setMessage} />
        </div>
    );
};

export default ChatListPage;
