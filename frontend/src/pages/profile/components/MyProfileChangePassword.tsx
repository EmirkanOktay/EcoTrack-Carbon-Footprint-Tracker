import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../stores/Store";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordById } from "../../../api/userSlicer";

function MyProfileChangePassword() {

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITEKEY;

    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.userData);
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            toast.error("Please fill in both fields");
            return;
        }

        const tokenCaptcha = recaptchaRef.current?.getValue();
        if (!tokenCaptcha) {
            toast.error("Please verify you're not a robot");
            return;
        }

        try {
            setLoading(true);
            const respond = await dispatch(
                resetPasswordById({ id: userId, currentPassword, newPassword })
            ).unwrap();

            if (respond) {
                toast.success("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
            }
            recaptchaRef.current?.reset();
        } catch (error: any) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-start py-10 px-5">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Change Your Password
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none pr-10 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none pr-10 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center pt-3">
                        <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Processing..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MyProfileChangePassword;
