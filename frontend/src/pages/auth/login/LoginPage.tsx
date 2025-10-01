import { useState } from "react";
import background from "../../../Images/background2.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { loginProps } from "../../../types/user";
import { loginUser, setUser } from "../../../api/userSlicer";
import type { AppDispatch, RootState } from "../../../stores/Store";
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.userData);

    if (user) {
        navigate("/profile");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        const userData: loginProps = { email, password };

        try {
            setLoading(true);
            const result = await dispatch(loginUser(userData)).unwrap();
            if (result) {
                localStorage.setItem("user", JSON.stringify(result))
                dispatch(setUser(result))
                toast.success("Login Successful");
                navigate("/profile");
            }
        } catch (error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full pt-16 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-white/85 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md mt-5 mb-5">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Login
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Logging..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-700 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/auth/sign-up"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Sign Up Now!
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
