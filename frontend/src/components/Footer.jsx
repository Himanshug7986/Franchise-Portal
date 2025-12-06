import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">F</span>
                        <span className="text-xl font-bold">FranchiseSys</span>
                    </div>
                    <p className="text-gray-400 max-w-sm">
                        Empowering businesses to scale through efficient franchise management and real-time analytics.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-200">Platform</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-200">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} FranchiseSys. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
