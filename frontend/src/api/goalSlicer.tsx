import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { goalState, goalProps, updateGoal, createGoalProp } from '../types/goal';


const initialState: goalState = {
    goalDatas: [],
    loading: false,
    error: null
}

export const createGoal = createAsyncThunk(
    "goal/createGoal",
    async (goalData: createGoalProp, { rejectWithValue }) => {
        try {

            const token = JSON.parse(localStorage.getItem("user") || "{}").token;
            if (!token) return rejectWithValue("No token found. Please login again.");

            const res = await axios.post("http://localhost:3000/api/goals/create-goal", goalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.goal as goalProps;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const getGoal = createAsyncThunk(
    "goal/getGoal",
    async (_, { rejectWithValue }) => {
        try {
            const user = localStorage.getItem("user");
            const token = user ? JSON.parse(user).token : null;

            if (!token) return rejectWithValue("No token found. Please login again.");

            const res = await axios.get("http://localhost:3000/api/goals/get-goal", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Something went wrong");
        }
    }
);


export const editGoal = createAsyncThunk(
    "goal/editGoal",
    async (data: { goalId: string; editData: updateGoal }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}").token;
            if (!token) return rejectWithValue("No token found. Please login again.");

            const res = await axios.put(
                "http://localhost:3000/api/goals/edit-goal",
                { ...data.editData, goalId: data.goalId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteGoal = createAsyncThunk(
    "goal/deleteGoal",
    async (goalId: string, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("user") || "{}").token;
            if (!token) return rejectWithValue("No token found. Please login again.");

            const res = await axios.delete("http://localhost:3000/api/goals/delete-goal", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { goalId }
            });

            return res.data;

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const goalSlicer = createSlice({
    name: "goal",
    initialState,
    reducers: {
        setGoal: (state, action: PayloadAction<goalProps[]>) => {
            state.goalDatas = action.payload;
            state.error = null;
            state.loading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createGoal.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createGoal.fulfilled, (state, action: PayloadAction<goalProps>) => {
                state.loading = false;
                if (!Array.isArray(state.goalDatas)) state.goalDatas = [];
                state.goalDatas.push(action.payload);
            })

            .addCase(createGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getGoal.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getGoal.fulfilled, (state, action: PayloadAction<goalProps[]>) => {
                state.loading = false;
                state.goalDatas = action.payload;
            })

            .addCase(getGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editGoal.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(editGoal.fulfilled, (state, action: PayloadAction<goalProps[]>) => {
                state.loading = false;
                state.goalDatas = action.payload;
            })

            .addCase(editGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<goalProps[]>) => {
                state.loading = false;
                state.goalDatas = action.payload;
            })

            .addCase(deleteGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
})

export const { setGoal, setLoading, setError } = goalSlicer.actions;
export default goalSlicer.reducer;
