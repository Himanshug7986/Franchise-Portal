import React from 'react';
import SalesChart from '../SalesChart';

const Overview = ({ salesData, user }) => {
    const totalRevenue = salesData.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalCustomers = salesData.reduce((sum, item) => sum + item.numberOfCustomers, 0);
    const totalEntries = salesData.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = salesData
        .filter(item => {
            const d = new Date(item.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, item) => sum + item.totalRevenue, 0);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-500">Welcome back, {user?.name.split(' ')[0]}! Here is what is happening today.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon="💰"
                    color="bg-green-50 text-green-700"
                />
                <StatCard
                    title="Total Customers"
                    value={totalCustomers.toLocaleString()}
                    icon="👥"
                    color="bg-blue-50 text-blue-700"
                />
                <StatCard
                    title="This Month"
                    value={`₹${monthlyRevenue.toLocaleString()}`}
                    icon="📅"
                    color="bg-purple-50 text-purple-700"
                    subtext="Revenue"
                />
                <StatCard
                    title="Total Entries"
                    value={totalEntries}
                    icon="📝"
                    color="bg-orange-50 text-orange-700"
                />
            </div>

            <div className="mt-8">
                <SalesChart data={salesData} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
            <span className={`p-2 rounded-lg ${color} text-xl`}>{icon}</span>
        </div>
        <div>
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {subtext && <span className="ml-1 text-sm text-gray-400">{subtext}</span>}
        </div>
    </div>
);

export default Overview;
