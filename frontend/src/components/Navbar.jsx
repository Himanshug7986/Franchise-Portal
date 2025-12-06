import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-2xl font-bold cursor-pointer flex items-center gap-2"
                    onClick={() => navigate('/')}
                >
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg">F</span>
                    <span className="text-gray-900">FranchiseSys</span>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                    <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
                    <a href="#benefits" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Benefits</a>
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        to="/login"
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        to="/request"
                        className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
