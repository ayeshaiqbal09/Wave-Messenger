export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    userName: string;
    displayName: string;
    email: string;
    token: string;
    hasCompletedProfile: boolean;
}

export interface CurrentUser {
    userId: string;
    userName: string;
    email: string;
}

export interface RegisterRequest {
    displayName: string;
    userName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    displayName: string;
    userName: string;
    email: string;
}