
import { refreshToken } from "../redux/slices/authSlice";
import { store } from "../redux/store";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL


/*
Hàm để fetch dữ liệu từ API với việc tự động refreshToken khi hết hạn.    
*/
export async function fetchRetry(url, options = {}, retry = true) {
    const state = store.getState().auth;
    let token = state.accessToken;

    if (!token) {
        throw { message: "No access token" };
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...options.headers,
    };

    let response = await fetch(BASE_URL + url, {
        ...options,
        headers,
    });





    if (response.status === 401 && retry) {
        try {
            const result = await store.dispatch(refreshToken()).unwrap();
            return fetchRetry(url, options, false);
        } catch (err) {
            throw err;
        }
    }

    return response;
}
