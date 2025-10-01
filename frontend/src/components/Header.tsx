import { useState } from "react";
import logo from "../Images/logo.png";
import { Menu, X, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();

    return (
        <nav className="fixed w-full z-20 bg-black/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center gap-x-2">
                            <img src={logo} alt="Logo" className="h-14 w-auto" />
                            <span className="text-2xl font-bold text-white font-roboto">
                                EcoTrack
                            </span>
                        </a>
                    </div>
                    {!user ? (
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link to="/" className="text-white hover:text-green-300 duration-500">Home</Link>
                            <Link to="#about" className="text-white hover:text-green-300 duration-500">About</Link>
                            <Link to="#services" className="text-white hover:text-green-300 duration-500">Services</Link>
                            <Link to="/legal/terms-of-service" className="text-white hover:text-green-300 duration-500">Term & Service</Link>
                        </div>
                    ) : <></>}


                    <div className="hidden md:flex space-x-4">
                        {!user ? (
                            <>
                                <button onClick={() => navigate("/auth/login")} className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                                    Login
                                </button>

                                <button onClick={() => navigate("/auth/sign-up")} className="px-8 py-2 border border-green-600 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="px-4 py-2 text-white cursor-pointer transition hover:shake">
                                    <Bell />
                                </button>


                                <button onClick={() => navigate(`/profile/my-profile/${user._id}`)} className="px-4 py-2 border rounded-full text-white border-white/40 hover:bg-white/10 transition cursor-pointer">
                                    My Profile
                                </button>
                                <button onClick={handleLogout} className="px-4 py-2 border rounded-full text-white border-red-500 hover:bg-red-500/20 transition cursor-pointer">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-black/10 backdrop-blur-md px-6 py-4 space-y-4 text-center text-white">
                    <a href="/" className="block hover:text-green-300 duration-500">Home</a>
                    <a href="#about" className="block hover:text-green-300 duration-500">About</a>
                    <a href="#services" className="block hover:text-green-300 duration-500">Services</a>
                    <a href="#term-and-condition" className="block hover:text-green-300 duration-500">Term & Condition</a>

                    <div className="flex flex-col gap-3 pt-3">
                        {!user ? (
                            <>
                                <button onClick={() => navigate("/auth/login")} className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer">
                                    Login
                                </button>
                                <button onClick={() => navigate("/auth/sign-up")} className="px-8 py-2 border border-green-600 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate(`/profile/my-profile/${user._id}`)} className="px-8 py-2 border border-white/40 rounded-full text-white font-semibold hover:bg-white/10 transition">
                                    My Profile
                                </button>
                                <button onClick={handleLogout} className="px-8 py-2 border border-red-500 rounded-full text-white font-semibold hover:bg-red-500/20 transition">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;
