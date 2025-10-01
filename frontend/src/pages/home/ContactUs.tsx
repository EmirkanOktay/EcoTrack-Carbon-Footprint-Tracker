import { useState, useRef } from "react";
import background from "../../Images/background3.jpg"
import ReCAPTCHA from 'react-google-recaptcha';
import type { MailProps } from "../../types/mail";
import { Resend } from 'resend';
import { toast } from "react-toastify";

function ContactUs() {

    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITEKEY;

    const resend = new Resend(import.meta.env.VITE_SEND_MAIL_KEY)

    const userMessage: MailProps = {
        name,
        lastName,
        email,
        message
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !lastName || !email || !message) {
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
            const sendMail = await resend.emails.send({
                from: userMessage.email,
                to: import.meta.env.VITE_RECEVIE_MAIL,
                subject: "You Have New Message From EcoTracker",
                text: `Name: ${userMessage.name} ${userMessage.lastName}\nEmail: ${userMessage.email}\nMessage: ${userMessage.message}`
            })
            if (sendMail) {
                toast.success("Message Has Been Sent Succesfully")
            }
        } catch (error: any) {
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
                    Contact Us
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
                            Your Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
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
                        {loading ? "Sending..." : "Send"}
                    </button>

                </form>
            </div>
        </div>)
}

export default ContactUs