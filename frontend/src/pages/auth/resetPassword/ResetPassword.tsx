import { useEffect, useRef, useState } from "react";
import background from "../../../Images/background2.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../stores/Store";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPassword } from "../../../api/userSlicer";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "react-router-dom";

function ResetPassword() {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITEKEY;

    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { token } = useParams<{ token: string }>();


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password) {
            toast.error("Please fill everything");
            return;
        }

        const tokenCaptcha = recaptchaRef.current?.getValue();
        if (!tokenCaptcha) {
            toast.error("Please verify you're not a robot");
            return;
        }

        try {
            setLoading(true);
            const response = await dispatch(
                resetPassword({ token: token!, password })
            ).unwrap();

            if (response) {
                toast.success("Password has been reset successfully");
                navigate("/auth/login");
            }
        } catch (error: any) {
            toast.error(error || "Something went wrong");
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
                    Reset Your Password
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
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

                    <div className="pt-5 flex justify-center">
                        <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-700 mt-6">
                    Dont have an account?{" "}
                    <Link
                        to="/auth/sign-up"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <p className="text-sm text-center text-gray-700 mt-2">
                    Remembered your password?{" "}
                    <Link
                        to="/auth/login"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
