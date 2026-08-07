export interface GetProfileResponse {

    id: string;

    userName: string;

    displayName: string;

    email: string;

    bio: string | null;

    status: string | null;

    profilePictureUrl: string | null;
}

export interface UpdateProfileRequest {

    displayName: string;

    bio: string | null;

    status: string | null;
}

export interface UpdateProfileResponse {

    id: string;

    displayName: string;

    bio: string | null;

    status: string | null;
}