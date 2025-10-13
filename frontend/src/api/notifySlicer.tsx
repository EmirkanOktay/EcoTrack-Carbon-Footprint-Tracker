import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { notifyProps, notifyState } from '../types/notify';

const initialState: notifyState = {
    notifyDatas: [],
    loading: false,
    error: null
}

export const getAllNotifications = createAsyncThunk(
    "notifications/getAllNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}").token;
            if (!token) return rejectWithValue("No token found. Please login again.");

            const res = await axios.get(
                "http://localhost:3000/api/notification/show-all-notifications",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.status === 200) return res.data.notifications;
            return rejectWithValue("Error");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const markAllNotificationsRead = createAsyncThunk(
    "notifications/markAllNotificationsRead",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}").token;
            if (!token) return rejectWithValue("No token found");

            const res = await axios.put(
                "http://localhost:3000/api/notification/markRead",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.status === 200) return res.data.notifications;
            return rejectWithValue("Error marking notifications");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const notifySlicer = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotify: (state, action: PayloadAction<notifyProps[]>) => {
            state.notifyDatas = action.payload;
            state.error = null;
            state.loading = false;
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
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNotifications.fulfilled, (state, action: PayloadAction<notifyProps[]>) => {
                state.loading = false;
                state.notifyDatas = action.payload || [];
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markAllNotificationsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllNotificationsRead.fulfilled, (state) => {
                state.loading = false;
                state.notifyDatas = state.notifyDatas.map(n => ({ ...n, read: true }));
            })
            .addCase(markAllNotificationsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { setNotify, setLoading, setError } = notifySlicer.actions;
export default notifySlicer.reducer;
