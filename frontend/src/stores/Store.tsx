import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "../api/userSlicer"
import notifySlicer from "../api/notifySlicer"
import goalSlicer from "../api/goalSlicer"

export const store = configureStore({
    reducer: {
        user: userSlicer,
        notifications: notifySlicer,
        goal: goalSlicer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch