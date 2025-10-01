
function CookiePolicy() {
    return (
        <div className="pt-16 min-h-screen bg-gradient-to-r from-green-950 via-black to-green-950 text-gray-300 p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Cookie Policy</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device to help websites remember information about your visit. They enhance user experience and functionality.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. How We Use Cookies</h2>
                <p>
                    We use cookies to remember your preferences, analyze traffic, improve website performance, and provide personalized content.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Types of Cookies</h2>
                <p>
                    Cookies can be session-based (deleted when you close the browser) or persistent (stored for a set period). We may also use third-party cookies for analytics.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Managing Cookies</h2>
                <p>
                    You can control or delete cookies via your browser settings. Please note that disabling cookies may affect some features of the website.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">5. Contact</h2>
                <p>
                    For any questions regarding our cookie policy, please contact us at <span className="text-green-400">support@ecotrack.com</span>.
                </p>
            </section>
        </div>
    );
}

export default CookiePolicy;
