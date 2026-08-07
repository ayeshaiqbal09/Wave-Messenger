import api from "../api/axios";
import type {
    GetProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse
} from "../types/profile";

export async function getProfile():
Promise<GetProfileResponse> {

    const response = await api.get<GetProfileResponse>(
        "/users/me"
    );

    return response.data;
}
export async function updateProfile(
    request: UpdateProfileRequest
): Promise<UpdateProfileResponse> {

    const response =
        await api.put<UpdateProfileResponse>(
            "/users/profile",
            request
        );

    return response.data;
}