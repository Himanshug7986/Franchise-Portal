import React, { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const SalesChart = ({ data }) => {
    const [viewMode, setViewMode] = useState('daily');

    const processData = (rawData, mode) => {
        if (!rawData || rawData.length === 0) return [];

        const groupedData = {};

        rawData.forEach(item => {
            const date = new Date(item.date);
            let key;

            if (mode === 'daily') {
                key = date.toLocaleDateString();
            } else if (mode === 'weekly') {
                const firstDay = new Date(date.getFullYear(), 0, 1);
                const pastDays = (date - firstDay / 86400000);
                const weekNum = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
                key = `Week ${weekNum}, ${date.getFullYear()}`;
            } else if (mode === 'monthly') {
                key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            } else if (mode === 'yearly') {
                key = date.getFullYear().toString();
            }

            if (!groupedData[key]) {
                groupedData[key] = {
                    name: key,
                    customers: 0,
                    revenue: 0,
                    dateObj: date
                };
            }

            groupedData[key].customers += item.numberOfCustomers;
            groupedData[key].revenue += item.totalRevenue;
        });

        return Object.values(groupedData).sort((a, b) => {
            return new Date(a.dateObj) - new Date(b.dateObj);
        });
    };

    const chartData = useMemo(() => processData(data, viewMode), [data, viewMode]);

    return (
        <div className="space-y-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xl font-bold text-gray-800">Sales Analytics</h3>
                <div className="flex bg-gray-100 p-1 rounded-lg mt-4 sm:mt-0">
                    {['daily', 'weekly', 'monthly', 'yearly'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 capitalize ${viewMode === mode
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Revenue Trend</h4>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis orientation="left" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="revenue" name="Revenue (₹)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Customer Trend</h4>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis orientation="left" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="customers" name="Customers" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;
