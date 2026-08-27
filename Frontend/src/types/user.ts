export interface User {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    hasCompletedProfile: boolean;
}

export interface Contact {
    id: string;
    userName: string;
    displayName: string;
    bio: string | null;
    status: string | null;
    profilePictureUrl: string | null;
    isOnline: boolean;
    lastSeen: string;
}