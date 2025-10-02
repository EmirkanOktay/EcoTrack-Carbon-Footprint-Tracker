import { useEffect, useRef, useState } from "react";
import background from "../../../Images/background2.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../../stores/Store";
import ReCAPTCHA from 'react-google-recaptcha';
import { sendResetPasswordLink } from "../../../api/userSlicer";

function ResetPasswordPage() {

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITEKEY;

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


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

        if (!email) {
            toast.error("Please fill everything");
            return;
        }
        const token = recaptchaRef.current?.getValue();
        if (!token) {
            toast.error("Please verify you're not a robot");
            return;
        }

        try {
            setLoading(true)
            const response = await dispatch(sendResetPasswordLink(email))
            if (response) {
                toast.success("Reset Mail Has Been Sent")
            }
        }
        catch (error: any) {
            toast.error(error)
        }
        finally {
            setLoading(false)
        }
    }
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
                    <div className="pt-5 flex justify-center">
                        <ReCAPTCHA
                            sitekey={siteKey}
                            ref={recaptchaRef}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Sending..." : " Send Reset Password Link"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-700 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/auth/sign-up"
                        className="text-green-600 font-medium hover:underline"
                    >
                    </Link>
                </p>
                <p className="text-sm text-center text-gray-700 mt-6">
                    Forget Your Passowrd?{" "}
                    <Link
                        to="/auth/reset-password"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Reset Your Password
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPasswordPage