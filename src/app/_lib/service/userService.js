import { apiFetch } from "../helper/apiFetch";

const URL = process.env.NEXT_PUBLIC_SERVER_URL

export const UserService = {
    fetchProfile: async () => {
        const response = await apiFetch(`/user/me`, {
            method: 'POST',
        });

        return response
    }
}