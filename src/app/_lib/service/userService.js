import { check } from "zod";
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
    },

    fetchFavorites: async (page = 1) => {
        try {
            const response = await fetchRetry(`/user/favorite/page?page=${page}`, {
                method: 'GET',
            });
            const json = await response.json()
            return { page: json.data.page, total: json.data.total_pages, data: json.data.results }

        } catch (error) {
            console.log(error);
            return { page: 0, total: 0, data: [] }
        }
    },

    addFovorite: async (mediaId, type) => {
        const response = await fetchRetry(`/user/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mediaId: mediaId, type: type })
        });
        if (!response.ok) {
            throw await response.json();
        }
        const json = await response.json();
        return json.data;
    },
    checkFavorite: async (mediaId, type) => {
        const response = await fetchRetry(`/user/favorite?mediaId=${mediaId}&type=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw await response.json();
        }
        const json = await response.json();
        return json.data;
    },
    removeFavorite: async (mediaId, type) => {
        const response = await fetchRetry(`/user/favorite`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mediaId: mediaId, type: type })
        });
        if (!response.ok) {
            throw await response.json();
        }
        const json = await response.json();
        return json.data;
    }
}