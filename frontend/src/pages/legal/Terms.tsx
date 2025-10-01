
function Terms() {
    return (
        <div className="pt-16 min-h-screen bg-gradient-to-r from-green-950 via-black to-green-950 text-gray-300 p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>
                    Welcome to EcoTrack. By accessing or using our website, you agree to comply with and be bound by these terms.
                    If you do not agree to these terms, you must not use the website.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
                <p>
                    Users are expected to provide accurate information, maintain the confidentiality of their accounts, and use the platform responsibly.
                    Any misuse of the website, including attempting to hack or disrupt services, is strictly prohibited.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Privacy</h2>
                <p>
                    We respect your privacy. Personal data collected through the website will be handled according to our Privacy Policy.
                    By using the website, you consent to the collection and use of your data as described.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
                <p>
                    All content, logos, graphics, and software on EcoTrack are the property of EcoTrack or its licensors.
                    Users may not copy, reproduce, or redistribute any content without explicit permission.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
                <p>
                    EcoTrack is not responsible for any damages, losses, or inconveniences resulting from the use of the website.
                    Users use the service at their own risk.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
                <p>
                    We may update these terms at any time. Users will be notified of significant changes.
                    Continued use of the website after changes implies acceptance of the new terms.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
                <p>
                    If you have any questions about these terms, please contact us at <span className="text-green-400">support@ecotrack.com</span>.
                </p>
            </section>
        </div>
    );
}

export default Terms;
