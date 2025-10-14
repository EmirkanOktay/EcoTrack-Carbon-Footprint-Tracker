import background from "../../Images/background1.png";
import CountUp from "react-countup";
import photo1 from "../../Images/photo1.webp";
import photo2 from "../../Images/photo2.jpg";
import { TreePine, Recycle, Leaf } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import companyLogo1 from "../../Images/companylogo1.jpg";
import companyLogo2 from "../../Images/companylogo2.jpg";
import companyLogo3 from "../../Images/companylogo3.jpg";
import companyLogo4 from "../../Images/companylogo4.jpg";
import companyLogo5 from "../../Images/companylogo5.jpg";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { useInView } from "react-intersection-observer";
import ScrollToTop from "../../components/ScrollToTop";

const HomePage = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const fadeIn: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const stats = [
        { number: 1500, label: "Members" },
        { number: 10000, label: "Trees Planted" },
        { number: 98765, label: "Carbon Saved (kg)" },
        { number: 100, label: "Projects Completed" },
    ];

    const successStats = [
        { number: 30, label: "Collaborations" },
        { number: 500, label: "Volunteer Hours" },
        { number: 15, label: "Ongoing Projects" },
        { number: 120, label: "Tons of Waste Recycled" },
    ];

    const collaborations = [
        {
            name: "Green Earth Org",
            description: "Nurture Nature.",
            image: companyLogo1,
        },
        {
            name: "World Wide Fund for Nature",
            description: "For a Living Planet",
            image: companyLogo3,
        },
        {
            name: "Clean Planet Group",
            description: "Clean Air. Clean Oceans. Clean Planet.",
            image: companyLogo2,
        },
        {
            name: "Renewable Energy Partners",
            description: "For everyone, for ever",
            image: companyLogo4,
        },
        {
            name: "The International Union for Conservation of Nature",
            description: "Respect Earth, respect life",
            image: companyLogo5,
        },
    ];

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            watchDrag: false,
        },
        [Autoplay({ delay: 3000 })]
    );

    return (
        <div
            className="relative w-full min-h-screen bg-cover bg-center text-white overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            <ScrollToTop />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />

            <div id="hero" className="relative z-10 flex flex-col items-center text-center min-h-screen px-6 pt-15 md:pt-16 lg:pt-24 mb-10">

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                        Welcome to <span className="text-green-400">EcoTrack</span>
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed">
                        Join the movement for a cleaner, greener planet. EcoTrack empowers
                        people and organizations to make data-driven, eco-conscious choices
                        that protect the Earth. Track your impact, inspire change, and be
                        part of the solution — one small action at a time.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-10 sm:gap-16 mt-10 mb-10"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-green-400 font-bold text-5xl flex items-baseline">
                                {stat.label !== "Carbon Saved (kg)" && "+"}
                                <CountUp
                                    end={stat.number}
                                    duration={2}
                                    separator=","
                                    style={{
                                        fontSize: 50,
                                        color: "#4ade80",
                                        fontWeight: "bold",
                                    }}
                                />
                            </div>
                            <div className="text-gray-300 font-semibold text-xl mt-2">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto gap-10 mt-10 grid grid-cols-1 lg:grid-cols-2 items-center"
                >
                    <div id="about" className="p-6">
                        <h2 className="text-3xl font-semibold text-green-400 mb-3 text-left">
                            Discover Our Green Journey
                        </h2>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-left">
                            Innovative Solutions for a Sustainable Future
                        </h1>

                        <p className="text-base md:text-lg opacity-90 text-left mb-6 text-gray-300">
                            At EcoTrack, we are more than just a platform — we are a community
                            of innovators, dreamers, and changemakers united by one purpose:
                            to create a sustainable tomorrow.
                        </p>

                        <ul className="space-y-4 mt-4">
                            {[
                                "Track your environmental footprint daily.",
                                "Save energy and reduce waste with small changes.",
                                "Learn, get inspired, and contribute to green projects.",
                            ].map((text, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full bg-green-500 text-white flex items-center justify-center">
                                        ✓
                                    </span>
                                    <span className="text-gray-200">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-6 relative text-center hidden lg:block"
                    >
                        <img
                            src={photo1}
                            alt=""
                            className="border-2 border-gray-500 relative z-10 max-w-sm md:max-w-md rounded-xl mx-auto shadow-lg"
                        />
                        <img
                            src={photo2}
                            alt=""
                            className="border-2 border-gray-500 absolute -bottom-6 -left-8 z-20 w-1/2 md:w-1/3 rounded-xl shadow-lg"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-20 px-6 max-w-6xl mx-auto text-center"
                >
                    <h2 id="mission" className="text-3xl font-semibold text-green-400 mb-3">
                        Our Mission
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-snug">
                        Uniting technology and community to create a greener, cleaner
                        future.
                    </h1>

                    <p className="text-base md:text-lg opacity-90 text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
                        EcoTrack is a movement built by people who believe small actions can
                        spark big change.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[TreePine, Recycle, Leaf].map((Icon, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-black/30 backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center group relative"
                            >
                                <Icon className="w-20 h-20 text-green-400 mb-4" />
                                <span className="text-white font-bold text-xl mb-2">
                                    {i === 0
                                        ? "Plant Trees"
                                        : i === 1
                                            ? "Recycle"
                                            : "Sustainable Living"}
                                </span>
                                <p className="text-gray-400 text-sm mt-2 text-center">
                                    {i === 0
                                        ? "Encourage reforestation and help restore ecosystems."
                                        : i === 1
                                            ? "Promote circular economy and reduce waste."
                                            : "Adopt eco-friendly habits for a cleaner planet."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-21 px-6 max-w-6xl mx-auto text-center"
                >
                    <h2 id="success" className="text-3xl font-semibold text-green-400 mb-3">
                        Success Stories
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-snug">
                        Real Impact, Real Change
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
                        {successStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-black/30 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <div ref={ref} className="text-green-400 font-bold text-5xl flex items-baseline">
                                    {stat.label !== "Carbon Saved (kg)" && "+"}
                                    {inView && (
                                        <CountUp
                                            end={stat.number}
                                            duration={2}
                                            separator=","
                                            style={{ fontSize: 50, color: "#4ade80", fontWeight: "bold" }}
                                        />
                                    )}
                                </div>

                                <div className="text-gray-300 font-semibold text-xl mt-2 text-center">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-11 px-6 max-w-6xl mx-auto text-center mb-5"
                >
                    <h2 id="collaborations" className="text-3xl font-semibold text-green-400 mb-3">
                        Collaborations
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-snug">
                        Partnering with organizations to drive sustainable change.
                    </h1>

                    <div className="overflow-hidden hidden lg:inline" ref={emblaRef}>
                        <div className="flex gap-6">
                            {collaborations.map((collab, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex-shrink-0 w-[90%] sm:w-[45%] lg:w-[30%] bg-black/30 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center"
                                >
                                    <img
                                        src={collab.image}
                                        alt={collab.name}
                                        className="lg:w-24 h-24 object-cover rounded-full mb-4"
                                    />
                                    <span className="text-white font-bold text-lg mb-2">
                                        {collab.name}
                                    </span>
                                    <p className="text-gray-400 text-sm text-center">
                                        {collab.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;
