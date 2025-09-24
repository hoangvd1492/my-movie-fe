import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../service/authService";

const accessToken = typeof window !== 'undefined'
    ? localStorage.getItem("accessToken")
    : null;

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await AuthService.login(email, password);

            if (!response.ok) {
                const error = await response.json()
                return thunkAPI.rejectWithValue(error.message);
            }

            const json = await response.json()
            return json.data

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Có lỗi xảy ra!");
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.signup(username, email, password);

            if (!response.ok) {
                const error = await response.json()
                return thunkAPI.rejectWithValue(error.message);
            }

            const json = await response.json()
            return json.data

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Có lỗi xảy ra!");
        }
    }
);

export const logout = createAsyncThunk("auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.logout();

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Có lỗi xảy ra!");
        }
    }
);

export const refreshToken = createAsyncThunk("auth/refresh",
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.refreshToken();

            if (!response.ok) {
                const error = await response.json()
                return thunkAPI.rejectWithValue(error.message);
            }

            const json = await response.json()
            console.log(json.data);
            return json.data

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Có lỗi xảy ra!");
        }
    }
)

const initialState = accessToken
    ? { isLoggedIn: true, accessToken, user: null, error: null }
    : { isLoggedIn: false, accessToken: null, user: null, error: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem('accessToken', action.payload.accessToken)
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.error = null;
                localStorage.setItem('accessToken', action.payload.accessToken)
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.error = null;
                localStorage.setItem('accessToken', action.payload.accessToken)

            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
                state.accessToken = null;
                localStorage.removeItem('accessToken')
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
                state.accessToken = null;
                localStorage.removeItem('accessToken')
            }).addCase(logout.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
                state.accessToken = null;
                localStorage.removeItem('accessToken')
            });
    },
});


export const { setUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;