import React from 'react';

const Sidebar = ({ activeView, setActiveView, onLogout, userName }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'history', label: 'Sales History', icon: '📜' },
        { id: 'entry', label: 'Add Sales', icon: '➕' },
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold tracking-tight">Franchise<span className="text-blue-500">Sys</span></h2>
            </div>

            <div className="p-6">
                <div className="mb-6 flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-200">Welcome,</p>
                        <p className="text-sm font-bold truncate w-32" title={userName}>{userName}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeView === item.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
                >
                    <span className="text-xl">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
