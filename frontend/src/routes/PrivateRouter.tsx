import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../stores/Store";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.user.userData);
    return user ? children : <Navigate to="/auth/login" replace />;
};