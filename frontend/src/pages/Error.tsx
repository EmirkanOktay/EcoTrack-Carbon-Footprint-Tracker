import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-600 to-green-700 text-center px-6 py-24">
            <div className="max-w-xl">
                <p className="text-6xl font-bold text-white drop-shadow-md">404</p>
                <h1 className="mt-4 text-4xl sm:text-6xl font-semibold text-white">
                    Page Not Found
                </h1>
                <p className="mt-6 text-lg text-white/80">
                    Sorry, we couldn’t find the page you’re looking for. It might have
                    been removed or is temporarily unavailable.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="px-8 py-3 rounded-full bg-white text-green-700 font-semibold hover:bg-green-100 transition-all duration-300 shadow-md"
                    >
                        Go Back Home
                    </Link>
                    <Link
                        to="/contact"
                        className="px-8 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                    >
                        Contact Support →
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ErrorPage;
