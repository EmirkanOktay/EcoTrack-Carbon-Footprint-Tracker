import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../stores/Store";
import { clearUser, setUser } from "../api/userSlicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = () => {
    const user = useSelector((state: RootState) => state.user.userData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && !user) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem("user");
        navigate("/auth/login");
    };

    return { user, handleLogout };
};
