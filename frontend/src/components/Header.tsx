import { useEffect, useState, useRef } from "react";
import logo from "../Images/logo.png";
import { Menu, X, Bell } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { getAllNotifications, markAllNotificationsRead } from "../api/notifySlicer";
import type { AppDispatch } from "../stores/Store";
import Loading from "./Loading";
import type { notifyProps } from "../types/notify";

function Header() {

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<notifyProps[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();
    const userId = user?._id || JSON.parse(localStorage.getItem("user") || "{}").id;
    const dispatch = useDispatch<AppDispatch>();

    const getNotifications = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const result = await dispatch(getAllNotifications());
            if ("payload" in result && result.payload) {
                setNotifications(result.payload);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAllRead = async () => {
        if (notifications.some((n) => !n.read)) {
            try {
                await dispatch(markAllNotificationsRead()).unwrap();

                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            } catch (err) {
                console.error("Failed to mark notifications as read:", err);
            }
        }
    };

    const handleDrawerToggle = async () => {
        const newState = !drawerOpen;
        setDrawerOpen(newState);

        if (newState) {
            try {
                const updatedNotifications = await dispatch(markAllNotificationsRead()).unwrap();

                setNotifications(updatedNotifications);
            } catch (err) {
                console.error("Failed to mark notifications as read:", err);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setDrawerOpen(false);
            }
        };
        if (drawerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [drawerOpen]);

    useEffect(() => {
        getNotifications();
    }, []);

    useEffect(() => {
        markAllRead()
    }, [])

    if (loading) return <Loading />;

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <>
            <nav className="fixed w-full z-20 bg-black/10 backdrop-blur-md shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        <Link onClick={() => scrollToSection("hero")} to="/" className="flex items-center gap-x-2">
                            <img src={logo} alt="Logo" className="h-14 w-auto" />
                            <span className="text-2xl font-bold text-white font-roboto">EcoTrack</span>
                        </Link>

                        {!user ? (
                            <div className="hidden md:flex space-x-8 items-center text-white">
                                <Link onClick={() => scrollToSection("hero")} to="/" className="hover:text-green-300 duration-300">Home</Link>
                                <Link onClick={() => scrollToSection("about")} to="#about" className="hover:text-green-300 duration-300">About</Link>
                                <Link onClick={() => scrollToSection("mission")} to="#Our Mission" className="hover:text-green-300 duration-300">Our Mission</Link>
                                <Link to="/legal/terms-of-service" className="hover:text-green-300 duration-300">Term & Service</Link>
                            </div>
                        ) : null}

                        <div className="hidden md:flex space-x-4 items-center relative">
                            {!user ? (
                                <>
                                    <button
                                        onClick={() => navigate("/auth/login")}
                                        className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate("/auth/sign-up")}
                                        className="px-8 py-2 border border-green-600 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 cursor-pointer"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleDrawerToggle}
                                        className="relative px-4 py-2 text-white cursor-pointer transition hover:scale-105"
                                    >
                                        <Bell size={24} />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => navigate(`/profile/my-profile/${userId}`)}
                                        className="px-4 py-2 border rounded-full text-white border-white/40 hover:bg-white/10 transition cursor-pointer"
                                    >
                                        My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 border rounded-full text-white border-red-500 hover:bg-red-500/20 transition cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="md:hidden flex items-center space-x-2">
                            {user && (
                                <button
                                    onClick={handleDrawerToggle}
                                    className="relative px-2 py-1 text-white cursor-pointer"
                                >
                                    <Bell size={24} />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            )}
                            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                                {menuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-black/10 backdrop-blur-md px-6 py-4 space-y-4 text-center text-white">
                        <Link onClick={() => scrollToSection("hero")} to="/" className="hover:text-green-300 duration-300">Home</Link>
                        <Link onClick={() => scrollToSection("about")} to="#about" className="hover:text-green-300 duration-300">About</Link>
                        <Link onClick={() => scrollToSection("mission")} to="#Our Mission" className="hover:text-green-300 duration-300">Our Mission</Link>
                        <Link to="/legal/terms-of-service" className="hover:text-green-300 duration-300">Term & Service</Link>

                        {!user ? (
                            <>
                                <button
                                    onClick={() => navigate("/auth/login")}
                                    className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/auth/sign-up")}
                                    className="px-8 py-2 border border-green-600 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 cursor-pointer"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate(`/profile/my-profile/${user._id}`)}
                                    className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold hover:bg-white/10 transition"
                                >
                                    My Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-2 border border-red-500 rounded-full text-white font-semibold hover:bg-red-500/20 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </nav>

            <div className={`fixed inset-0 z-40 flex justify-end pointer-events-none transition-opacity duration-300 ${drawerOpen ? "pointer-events-auto" : ""}`}>
                <div
                    onClick={() => setDrawerOpen(false)}
                    className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
                />
                <div
                    ref={drawerRef}
                    className={`relative w-80 max-w-full h-full bg-white shadow-xl transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex justify-between items-center px-4 py-4 border-b">
                        <h2 className="font-semibold text-lg">Notifications</h2>
                        <button onClick={() => setDrawerOpen(false)} className="text-gray-600 hover:text-gray-900">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="overflow-y-auto max-h-full">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">No notifications</div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-100 ${!n.read ? "bg-orange-100 font-semibold" : ""}`}
                                    onClick={() => {
                                        setDrawerOpen(false);
                                        navigate(n.link || "/");
                                    }}
                                >
                                    <div>{n.title}</div>
                                    <div className="text-sm text-gray-600">{n.message}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">
                                        {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
