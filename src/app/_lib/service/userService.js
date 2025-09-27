import { fetchRetry } from "../helper/fetchRetry";

const URL = process.env.NEXT_PUBLIC_SERVER_URL

export const UserService = {
    fetchProfile: async () => {
        const response = await fetchRetry(`/user/me`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw await response.json();
        }

        const data = await response.json();
        return data;
    }
}