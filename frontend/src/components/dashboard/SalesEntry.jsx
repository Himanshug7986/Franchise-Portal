import React, { useState } from 'react';

const SalesEntry = ({ onSubmit, message }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [count, setCount] = useState('');
    const [revenue, setRevenue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ date, count, revenue });
        setCount('');
        setRevenue('');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">New Sales Entry</h3>
                    <p className="text-sm text-gray-500 mt-1">Record your daily franchise sales performance</p>
                </div>

                <div className="p-8">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            <span className="mr-2 text-xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="salesDate" className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    id="salesDate"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="salesCount" className="block text-sm font-semibold text-gray-700 mb-2">Total Customers</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="salesCount"
                                        value={count}
                                        onChange={(e) => setCount(e.target.value)}
                                        min="0"
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border pl-10"
                                        placeholder="0"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">👥</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="totalRevenue" className="block text-sm font-semibold text-gray-700 mb-2">Total Revenue</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="totalRevenue"
                                        value={revenue}
                                        onChange={(e) => setRevenue(e.target.value)}
                                        min="0"
                                        step="0.01"
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5 px-3 border pl-10"
                                        placeholder="0.00"
                                        required
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-bold">₹</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <span className="mr-2">💾</span> Save Entry
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalesEntry;
