import { getUser } from "../../../api/userSlicer";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../../stores/Store";
import { useDispatch } from "react-redux"
import type { User } from "../../../types/user";
import Avatar from '@mui/material/Avatar';

function MyProfileDahsboard() {

    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await dispatch(getUser(userId)).unwrap()
                if (response) {
                    setUser(response);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [])

    if (loading) {
        return (<Loading />)
    }

    const xpPercent = user ? Math.min((user.xpCounter % 100), 100) : 0;

    const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    console.log(user)
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-full max-w-md md:max-w-lg lg:max-w-xl text-center border border-green-200 mx-auto">

            <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 4, bgcolor: '#22c55e', fontSize: 32 }}>
                {avatarLetter}
            </Avatar>

            <h2 className="text-3xl font-bold mb-2 text-green-900 drop-shadow-sm">
                {user?.name} {user?.lastname}
            </h2>

            <p className="text-gray-700 mb-1 text-lg">
                Level: <span className="font-semibold text-green-800">{user?.level}</span>
            </p>

            <p className="text-gray-700 mb-1 text-lg">
                XP: <span className="font-semibold text-green-800">{user?.xpCounter}</span>
            </p>

            <div className="w-full bg-green-200 rounded-full h-4 mb-4">
                <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                ></div>
            </div>

            <p className="text-gray-700 mb-4">
                Joined: <span className="font-medium">{user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : ""}</span>
            </p>

            <div className="text-left space-y-2 mt-4 px-4">
                <p>
                    <span className="text-gray-500">Age:</span> <span className="font-medium">{user?.age}</span>
                </p>
                <p>
                    <span className="text-gray-500">Email:</span> <span className="font-medium break-all">{user?.email}</span>
                </p>
                <p>
                    <span className="text-gray-500">Car Type:</span> <span className="font-medium">{user?.cartype}</span>
                </p>
                <p>
                    <span className="text-gray-500">Last Seen:</span> <span className="font-medium">{user?.lastSeen ? new Date(user.lastSeen).toLocaleString() : ""}</span>
                </p>
            </div>
        </div>

    )
}

export default MyProfileDahsboard