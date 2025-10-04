// Type definitions
export interface User {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
}

export interface ChatUser extends User {
    lastMessage: string;
    time: string;
    online: boolean;
    unread: number;
}

export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    isMe: boolean;
    status?: 'sending' | 'sent' | 'read';
    deletedAt?: string;
}

export interface UnreadCount {
    [userId: string]: number;
}

export interface ChatRooms {
    [chatId: string]: Message[];
}
