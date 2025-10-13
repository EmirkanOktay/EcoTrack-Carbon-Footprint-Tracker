import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { getUser } from '../../api/userSlicer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../stores/Store';
import Loading from '../../components/Loading';
import Background from "../../Images/background4.png";
import { useAuth } from '../../hooks/useAuth';
import MyProfileChangePassword from './components/MyProfileChangePassword';
import MyProfileAccountDetails from './components/myProfileAccountDetails';
import MyProfileDahsboard from './components/myProfileDahsboard';

function MyProfile() {
    const navItems = [
        { id: 1, navName: "Dashboard" },
        { id: 2, navName: "Account Details" },
        { id: 3, navName: "Change Password" },
        { id: 4, navName: "Logout" }
    ];

    const { handleLogout } = useAuth()

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState<string>();
    const [fullName, setFullName] = useState<string>();
    const [fullSurName, setFullSurname] = useState<string>()
    const [activeNav, setActiveNav] = useState<number>(1);
    const [activeComponent, setActiveComponent] = useState<string>("Dashboard");
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    const getUserName = async () => {
        setLoading(true);
        try {
            const respond = await dispatch(getUser(userId)).unwrap();
            if (respond) {
                const capitalizedUserName = respond.name.charAt(0).toUpperCase() + respond.name.slice(1);
                const capitalizedUserSurname = respond.lastname.charAt(0).toUpperCase() + respond.lastname.slice(1);
                setFullSurname(capitalizedUserSurname)
                setFullName(capitalizedUserName)

                const firstCapitalLetterName = respond.name.charAt(0).toUpperCase();
                setUserName(firstCapitalLetterName);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserName();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Background})` }}
        >
            <div className="absolute inset-0 bg-black/60 flex flex-col md:flex-row px-4 md:px-6 py-12 md:py-20 overflow-y-auto">

                <div className="w-full md:w-72 lg:w-80 bg-black/10 backdrop-blur-md shadow-2xl flex flex-col items-center p-6 rounded-lg mb-8 md:mb-0 transition-all duration-300">

                    <Avatar sx={{ width: 60, height: 60, bgcolor: "#22c55e" }}
                        className="w-24 h-24 mb-4 bg-blue-600 text-white text-3xl">
                        {userName}
                    </Avatar>
                    <h2 className="text-xl font-semibold mb-6 text-white drop-shadow-md">
                        {fullName ? fullName : "User"} {fullSurName ? fullSurName : "User"}

                    </h2>

                    <ul className="w-full space-y-3">
                        {navItems.map((navItem) => (
                            <li key={navItem.id}>
                                <button
                                    onClick={() => {
                                        setActiveNav(navItem.id);
                                        if (navItem.navName === "Logout") {
                                            handleLogout();
                                        }
                                        else {
                                            setActiveComponent(navItem.navName);
                                        }

                                    }}
                                    className={`w-full py-2 rounded-lg transition-all duration-300 font-medium cursor-pointer
                                        ${activeNav === navItem.id
                                            ? "bg-green-600 text-white shadow-lg"
                                            : "bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-md"
                                        }`}
                                >
                                    {navItem.navName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 md:ml-8 bg-black/1 backdrop-blur-md p-6 rounded-lg shadow-2xl transition-all duration-300">
                    {activeComponent === "Dashboard" && <MyProfileDahsboard />}
                    {activeComponent === "Account Details" && <MyProfileAccountDetails />}
                    {activeComponent === "Change Password" && <MyProfileChangePassword />}
                </div>
            </div>
        </div >
    );
}

export default MyProfile;
