import { useNavigate } from "react-router-dom";
import background from "../../../Images/background1.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../../api/userSlicer";
import type { registerProps } from "../../../types/user";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../stores/Store";
import { Eye, EyeOff } from 'lucide-react';

function SignUpPage() {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRePassword, setShowRePassword] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !lastName || !email || !password || !rePassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== rePassword) {
            toast.error("Passwords do not match");
            return;
        }

        const user: registerProps = {
            name,
            lastname: lastName,
            age,
            email,
            password,
            cartype: "I don't have a car",
            level: 1,
            xpCounter: 0,
            lastSeen: new Date(),
            joinDate: new Date(),
        };

        try {
            setLoading(true);
            const result = await dispatch(registerUser(user)).unwrap();
            if (result) {
                toast.success("Account has been created");
                navigate("/auth/login");
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
                    Sign Up
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                        </label>
                        <input
                            type="number"
                            value={age || ""}
                            onChange={(e) => setAge(Number(e.target.value))}
                            placeholder="Age"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showRePassword ? "text" : "password"}
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                placeholder="********"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRePassword(!showRePassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showRePassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-700 mt-6">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
