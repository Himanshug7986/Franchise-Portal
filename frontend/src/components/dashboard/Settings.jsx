import React, { useState, useEffect } from 'react';

const Settings = ({ user, onUpdate, onPasswordUpdate, message, passwordMessage }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                location: user.location || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        onPasswordUpdate({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Account Settings</h3>
                        <p className="text-sm text-gray-500 mt-1">Manage your profile information</p>
                    </div>
                    <span className="text-2xl">⚙️</span>
                </div>

                <div className="p-8">
                    {message && message.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <span className="mr-2 text-xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">Franchise Location</label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500">Updating location might require additional verification for franchise compliance.</p>
                        </div>

                        <div className="pt-4 flex items-center justify-end">
                            <button
                                type="submit"
                                className="flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 mt-8">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Security</h3>
                        <p className="text-sm text-gray-500 mt-1">Update your password</p>
                    </div>
                    <span className="text-2xl">🔒</span>
                </div>

                <div className="p-8">
                    {passwordMessage && passwordMessage.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <span className="mr-2 text-xl">{passwordMessage.type === 'success' ? '✅' : '⚠️'}</span>
                            {passwordMessage.text}
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end">
                            <button
                                type="submit"
                                className="flex justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:shadow-md"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
