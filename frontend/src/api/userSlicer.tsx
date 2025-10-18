import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { loginProps, registerProps, User, UserDetails, userState } from '../types/user';


const initialState: userState = {
    userData: null,
    error: null,
    loading: false
}

export const registerUser = createAsyncThunk(
    "user/register",
    async (userData: registerProps, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/user/register", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/login",
    async (userData: loginProps, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId: string, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}").token;

            if (!token) {
                localStorage.removeItem("user");
                window.location.href = "/";
                return rejectWithValue("No token provided");
            }

            const response = await axios.get(
                `http://localhost:3000/api/user/get-user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        }
        catch (error: any) {
            if (error.response?.status == 401) {
                localStorage.removeItem("user");
                localStorage.removeItem("expiryTime");
                window.location.href = "/";
                return rejectWithValue("Token Expired");
            }
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const sendResetPasswordLink = createAsyncThunk(
    "user/resetPasswordLink",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/user/reset-password-mail",
                { email },
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

export const resetPasswordById = createAsyncThunk(
    "user/resetPasswordById",
    async (
        {
            id,
            currentPassword,
            newPassword,
        }: { id: string; currentPassword: string; newPassword: string },
        { rejectWithValue }
    ) => {
        try {
            const token = localStorage.getItem("user");
            const response = await axios.put(
                `http://localhost:3000/api/user/reset-password-by-id/${id}`,
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, updatedUser }: { id: string; updatedUser: UserDetails }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/user/update-user/${id}`, updatedUser, {});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
);




export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (
        { token, password }: { token: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/user/reset-password/${token}`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
            state.error = null;
            state.loading = false;
        },
        clearUser: (state) => {
            state.userData = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state: userState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state: userState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state: userState, action: PayloadAction<User>) => {
                state.loading = false;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
