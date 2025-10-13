import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "../api/userSlicer"
import notifySlicer from "../api/notifySlicer"
export const store = configureStore({
    reducer: {
        user: userSlicer,
        notifications: notifySlicer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch