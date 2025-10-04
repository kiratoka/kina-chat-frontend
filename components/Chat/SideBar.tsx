"use client"
import { ChatUser, User } from "@/lib/types/type";
import { LogOut, MoreHorizontal, PlusCircle, Search, Settings, X } from "lucide-react";
import { useState } from "react";

interface SideBarProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
    handleProfileClick: () => void;
    renderAvatar: (user: User) => React.ReactNode;
    currentUser: User;
    setShowUserMenu: (showUserMenu: boolean) => void;
    showUserMenu: boolean;
    users: ChatUser[];
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    filteredUsers: ChatUser[];
    activeChat: string;
    handleChatSelect: (userId: string) => void;

}
const SideBar = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleProfileClick, renderAvatar, currentUser, setShowUserMenu, showUserMenu, users, searchQuery, setSearchQuery, filteredUsers, activeChat, handleChatSelect }: SideBarProps) => {

const [isAddContact, setIsAddContact] = useState(false)

const handleAddContact = () => {
    setIsAddContact(!isAddContact)
}

    return (
        <div>
            {/* 👉 Sidebar START */}
            <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 w-80 sm:w-96 lg:w-80 xl:w-96 bg-gradient-to-br from-pink-100/95 via-purple-100/95 to-indigo-100/95 backdrop-blur-md border-r border-pink-300/40 flex flex-col transition-transform duration-300 ease-in-out h-full`}>

                {/* 👉 Tombol close sidebar (mobile) START */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>
                {/* 👉 Tombol close sidebar (mobile) End */}

                {/* 👉 Header sidebar START */}
                <div className="p-4 lg:p-6 border-b border-pink-300/50">
                    {/* 👉 Profil user START */}
                    <div
                        onClick={handleProfileClick}
                        className="flex items-center space-x-3 mb-4 p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-300/30 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                    >
                        {renderAvatar(currentUser)}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">{currentUser.name}</p>
                            <p className="text-sm text-gray-600 truncate">@{currentUser.username}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                    className="p-2 rounded-full hover:bg-pink-200/50 transition-colors duration-200 cursor-pointer"
                                >
                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                </button>
                                {showUserMenu && (
                                    <div className="absolute right-0 top-12 bg-white/95 backdrop-blur-sm border border-pink-300/50 rounded-2xl shadow-xl py-2 w-48 z-20">
                                        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-pink-100/50 transition-colors duration-200 cursor-pointer">
                                            <Settings className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm text-gray-700">Pengaturan</span>
                                        </button>
                                        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-pink-100/50 transition-colors duration-200 text-red-600 cursor-pointer">
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Keluar</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* 👉 Profil user End */}

                    {/* 👉 Title + button tambah chat START */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Kina Chat</h1>
                            <p className="text-sm text-gray-600">{users.filter(u => u.online).length} orang online</p>
                        </div>
                        <button className='cursor-pointer' title="Tambahkan kontak baru" onClick={handleAddContact}>
                            {isAddContact ? <X className='text-pink-700' /> : <PlusCircle className='text-pink-700' />}
                        </button>
                    </div>

                    {isAddContact && (
                    <div>
                        <h1 className="text-base font-semibold text-gray-800 mb-2">Tambahkan kontak baru</h1>
                        <input type="text" placeholder="Masukkan Username" className="w-full pl-10 pr-4 py-3 bg-white/60 border border-pink-300/50 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-200" />
                        <div className="">
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 cursor-pointer mt-3 mb-8 justify-center">Tambah Kontak</button>
                        </div>
                    </div>
                    )}
                    {/* 👉 Title + button tambah chat End */}

                    {/* 👉 Search bar START */}
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
                    {/* 👉 Search bar End */}
                </div>
                {/* 👉 Header sidebar End */}

                {/* 👉 List user START */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleChatSelect(user.id)}
                            className={`p-4 border-b border-pink-300/30 cursor-pointer transition-all duration-200 hover:bg-pink-200/40 ${activeChat === user.id ? 'bg-gradient-to-r from-pink-200/60 to-purple-200/60 border-r-4 border-purple-500' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative flex-shrink-0">
                                    {renderAvatar(user)}
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
                {/* 👉 List user End */}
            </div>
            {/* 👉 Sidebar End */}
        </div>
    )
}

export default SideBar