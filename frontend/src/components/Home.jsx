import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
            <Navbar />

            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-sm border border-blue-100 shadow-sm animate-fade-in-up">
                        🚀 Revolutionizing Franchise Management
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        Scale Your Business <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            With Confidence
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The all-in-one platform to manage franchise requests, track real-time status, and streamline operations from a single dashboard.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/request"
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1"
                        >
                            Request Franchise
                        </Link>
                        <Link
                            to="/status"
                            className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Check Application Status
                        </Link>
                    </div>
                </div>
            </header>

            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">Powerful tools designed to help you launch and manage your franchise network efficiently.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="⚡"
                            title="Instant Application"
                            description="Submit your franchise application in minutes with our streamlined, paperless process."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Real-time Tracking"
                            description="Track application progress and get instant updates on your approval status anywhere."
                        />
                        <FeatureCard
                            icon="🛡️"
                            title="Secure Dashboard"
                            description="Advanced Admin controls with bank-grade security to manage the entire ecosystem."
                        />
                    </div>
                </div>
            </section>

            <section id="benefits" className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <StatItem number="500+" label="Active Franchises" />
                        <StatItem number="₹100Cr+" label="Revenue Generated" />
                        <StatItem number="98%" label="Approval Rate" />
                        <StatItem number="24/7" label="Support Available" />
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-gray-400 mb-10">Join thousands of successful franchise owners today.</p>
                    <Link
                        to="/request"
                        className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 transform hover:scale-105"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const StatItem = ({ number, label }) => (
    <div className="p-6">
        <div className="text-4xl font-extrabold text-blue-600 mb-2">{number}</div>
        <div className="text-gray-600 font-medium">{label}</div>
    </div>
);

export default Home;
