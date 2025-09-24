
import { refreshToken } from "../redux/slices/authSlice";
import { store } from "../redux/store";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL



export async function apiFetch(url, options = {}, retry = true) {
    const state = store.getState().auth;
    let token = state.accessToken;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    let response = await fetch(BASE_URL + url, {
        ...options,
        headers,
    });





    if (response.status === 401 && retry) {
        try {
            const result = await store.dispatch(refreshToken()).unwrap();
            return apiFetch(url, options, false);
        } catch (err) {
            throw err;
        }
    }

    if (!response.ok) {
        throw await response.json();
    }

    const data = await response.json();
    return data;
}
