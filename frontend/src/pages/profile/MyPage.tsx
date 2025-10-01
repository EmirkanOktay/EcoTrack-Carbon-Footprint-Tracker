import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../stores/Store";
import Loading from "../../components/Loading";
import background from "../../Images/background2.png";
import { Target, HelpCircle, BarChart3 } from "lucide-react";

function MyPage() {
    const [loading] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user.userData);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="pt-15 text-center">
                <Loading />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="pt-15 text-center text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const sections = [
        {
            title: "My Goals",
            description: "Set and track eco-friendly goals to live a greener lifestyle with purpose.",
            path: `/profile/my-goals/${user._id}`,
            icon: <Target className="w-10 h-10 text-green-400" />
        },
        {
            title: "Daily Questions",
            description: "Answer eco-questions every day to boost awareness and create better habits.",
            path: `/profile/daily-questions`,
            icon: <HelpCircle className="w-10 h-10 text-emerald-400" />
        },
        {
            title: "My Results",
            description: "Analyze your progress, visualize results, and celebrate your impact 🌍",
            path: `/profile/my-results/${user._id}`,
            icon: <BarChart3 className="w-10 h-10 text-teal-400" />
        }
    ];

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center px-6 py-20 overflow-y-auto">

                <h1 className="text-4xl md:text-5xl font-bold text-green-400 drop-shadow-lg mb-2">
                    Welcome Back, {capitalize(user.name)}
                </h1>
                <p className="text-lg text-gray-200 mb-12">
                    Your eco-journey starts here 🚀
                </p>

                <div className="w-full max-w-3xl flex flex-col gap-8 overflow-x-hidden overflow-y-hidden">
                    {sections.map((section, index) => (
                        <article
                            key={index}
                            className="p-8 rounded-2xl shadow-xl bg-white/10 
    backdrop-blur-lg border border-white/20 text-white 
    flex items-center gap-6 hover:scale-[1.02] transition-transform overflow-hidden"
                        >
                            <div className="flex-shrink-0">
                                {section.icon}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                                <p className="text-gray-200">{section.description}</p>
                            </div>

                            <button
                                onClick={() => navigate(section.path)}
                                className="px-5 py-2 bg-green-500 hover:bg-green-600 
        rounded-lg font-medium transition cursor-pointer"
                            >
                                Go →
                            </button>
                        </article>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyPage;
