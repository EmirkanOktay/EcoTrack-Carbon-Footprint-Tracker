import logo from "../Images/logo.png";
import { Facebook, Instagram, X, Linkedin } from "lucide-react";

function Footer() {
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
                        <li><a href="#about" className="hover:text-green-300 transition-colors">About Us</a></li>
                        <li><a href="#mission" className="hover:text-green-300 transition-colors">Our Mission</a></li>
                        <li><a href="#success" className="hover:text-green-300 transition-colors">Success Stories</a></li>
                        <li><a href="#collaborations" className="hover:text-green-300 transition-colors">Collaborations</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-green-400 mb-4 uppercase tracking-wide">Connect</h3>
                    <ul className="space-y-2">
                        <li><a href="/contact-us" className="hover:text-green-300 transition-colors">Contact Us</a></li>
                        <li><a href="https://www.instagram.com/" className="hover:text-green-300 transition-colors">Instagram</a></li>
                        <li><a href="https://www.facebook.com/" className="hover:text-green-300 transition-colors">Facebook</a></li>
                        <li><a href="https://www.youtube.com/" className="hover:text-green-300 transition-colors">Youtube</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-green-400 mb-4 uppercase tracking-wide">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="/terms" className="hover:text-green-300 transition-colors">Terms of Service</a></li>
                        <li><a href="/privacy" className="hover:text-green-300 transition-colors">Privacy Policy</a></li>
                        <li><a href="/cookies" className="hover:text-green-300 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10" />

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                <div className="flex gap-6 text-gray-400">
                    <a href="/terms" className="hover:text-green-300">Terms</a>
                    <a href="/privacy" className="hover:text-green-300">Privacy</a>
                    <a href="/cookies" className="hover:text-green-300">Cookies</a>
                </div>

                <div className="text-gray-500">© {new Date().getFullYear()} EcoTracker. All Rights Reserved.</div>

                <div className="flex gap-5 text-gray-400 text-xl">
                    <a href="#" aria-label="Facebook" className="hover:text-green-300"><Facebook /></a>
                    <a href="#" aria-label="Twitter/X" className="hover:text-green-300"><X /></a>
                    <a href="#" aria-label="Instagram" className="hover:text-green-300"><Instagram /></a>
                    <a href="#" aria-label="Music" className="hover:text-green-300"><Linkedin /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
