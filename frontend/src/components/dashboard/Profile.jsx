import React from 'react';

const Profile = ({ user }) => {
    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                            <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500 font-medium">{user.email}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${user.status === 'active' || user.franchiseRequestStatus === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {user.status || user.franchiseRequestStatus}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-wide text-gray-400 font-semibold">Franchise Details</h4>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Primary Location</p>
                                <p className="font-semibold text-gray-900 text-lg">{user.location || 'Not set'}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-500 mb-1">Ownership Type</p>
                                <p className="font-semibold text-gray-900 text-lg capitalize">{user.locationOwnership || 'Not set'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-wide text-gray-400 font-semibold">Account Info</h4>

                            <div className="flex items-center space-x-3 py-2">
                                <span className="text-gray-400">📅</span>
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium text-gray-900">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {user.phone && (
                                <div className="flex items-center space-x-3 py-2">
                                    <span className="text-gray-400">📱</span>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium text-gray-900">{user.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {user.hasOtherFranchises && user.otherFranchiseLocations && user.otherFranchiseLocations.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Other Franchise Locations</h4>
                            <div className="flex flex-wrap gap-2">
                                {user.otherFranchiseLocations.map((loc, idx) => (
                                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100">
                                        📍 {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
