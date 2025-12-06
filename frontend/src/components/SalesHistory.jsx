import React, { useState } from 'react';

const SalesHistory = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8 text-center">
                <p className="text-gray-500">No sales history available yet.</p>
            </div>
        );
    }

    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Sales History</h3>
                <span className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold">Date</th>
                            <th scope="col" className="px-6 py-4 font-semibold">Customers</th>
                            <th scope="col" className="px-6 py-4 font-semibold">Revenue</th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item._id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {new Date(item.date).toLocaleDateString(undefined, {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {item.numberOfCustomers}
                                </td>
                                <td className="px-6 py-4 font-medium text-green-600">
                                    ₹{item.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-gray-400 text-xs italic">Logged</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                    >
                        Previous
                    </button>

                    <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SalesHistory;
