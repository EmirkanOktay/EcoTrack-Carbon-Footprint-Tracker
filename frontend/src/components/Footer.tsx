import logo from "../../public/logo.png";
import { Facebook, Instagram, X, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-gradient-to-r from-green-950 via-black to-green-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">

                <div className="col-span-2">
                    <div className="flex items-center gap-x-3 mb-4">
                        <img className="h-12 w-auto" src={logo} alt="EcoTracker Logo" />
                        <span className="text-2xl font-bold text-white tracking-wide">EcoTracker</span>
                    </div>
                    <p className="leading-relaxed text-gray-400">
                        From energy-saving lifestyle choices to sustainable living tips,
                        EcoTracker helps you measure, understand, and reduce your carbon footprint
                        for a cleaner, greener tomorrow.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-green-400 mb-4 uppercase tracking-wide">Explore</h3>
                    <ul className="space-y-2">
                        <li><Link onClick={() => scrollToSection("about")} to="#about" className="hover:text-green-300 transition-colors">About Us</Link></li>
                        <li><Link onClick={() => scrollToSection("mission")} to="#mission" className="hover:text-green-300 transition-colors">Our Mission</Link></li>
                        <li><Link onClick={() => scrollToSection("success")} to="#success" className="hover:text-green-300 transition-colors">Success Stories</Link></li>
                        <li><Link onClick={() => scrollToSection("collaborations")} to="#collaborations" className="hover:text-green-300 transition-colors">Collaborations</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-green-400 mb-4 uppercase tracking-wide">Connect</h3>
                    <ul className="space-y-2">
                        <li><Link to="/contact" className="hover:text-green-300 transition-colors">Contact Us</Link></li>
                        <li><Link to="https://www.instagram.com/" className="hover:text-green-300 transition-colors">Instagram</Link></li>
                        <li><Link to="https://www.facebook.com/" className="hover:text-green-300 transition-colors">Facebook</Link></li>
                        <li><Link to="https://www.youtube.com/" className="hover:text-green-300 transition-colors">Youtube</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-green-400 mb-4 uppercase tracking-wide">Legal</h3>
                    <ul className="space-y-2">
                        <li><Link to="/legal/terms-of-service" className="hover:text-green-300 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/legal/privacy-policy" className="hover:text-green-300 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/legal/cookie-policy" className="hover:text-green-300 transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10" />

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                <div className="flex gap-6 text-gray-400">
                    <Link to="/legal/terms-of-service" className="hover:text-green-300">Terms</Link>
                    <Link to="/legal/privacy-policy" className="hover:text-green-300">Privacy</Link>
                    <Link to="/legal/cookie-policy" className="hover:text-green-300">Cookies</Link>
                </div>

                <div className="text-gray-500">© {new Date().getFullYear()} EcoTracker. All Rights Reserved.</div>

                <div className="flex gap-5 text-gray-400 text-xl">
                    <Link to="https://www.facebook.com/" aria-label="Facebook" className="hover:text-green-300"><Facebook /></Link>
                    <Link to="https://x.com/" aria-label="Twitter/X" className="hover:text-green-300"><X /></Link>
                    <Link to="https://www.instagram.com/" aria-label="Instagram" className="hover:text-green-300"><Instagram /></Link>
                    <Link to="https://www.linkedin.com/" aria-label="Linkedin" className="hover:text-green-300"><Linkedin /></Link>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
