import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminSalesReport = () => {
    const [report, setReport] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchReport = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            let url = "http://localhost:5000/api/orders/admin/sales-report";

            if(startDate && endDate) {
                url += `?startDate=${startDate}&endDate=${endDate}`;
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReport(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load sales report");
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Sales Report
                        </h1>
                        <p className="text-gray-500 mt-1">
                            View your store sales and revenue
                        </p>
                    </div>

                    <button onClick={handlePrint}
                    className="bg-gray-800 hover:bg-black text-white px-5 py-3 rounded-lg font-semibold">
                        🖨️ Print Report
                    </button>
                </div>

                {/* DATE FILTER */}
                <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        Filter by Date
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Start Date
                            </label>

                            <input type="date"
                            value={startDate}
                            onChange={(e) => 
                                setStartDate(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                End Date
                            </label>

                            <input type="date"
                            value={endDate}
                            onChange={(e) => 
                                setEndDate(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3" />
                        </div>

                        <div className="flex items-end gap-3">
                            <button onClick={fetchReport}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold">
                                Apply Filter
                            </button>

                            <button onClick={() => {
                                setStartDate("");
                                setEndDate("");

                                setTimeout(() => {
                                    fetchReport();
                                }, 0);
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 rounded-lg font-semibold">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {!report ? (
                    <div className="bg-white rounded-2xl p-10 text-center">
                        <p className="text-gray500">
                            Loading report...
                        </p>
                    </div>
                ): (
                    <>
                        {/* SUMMARY CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                                <p className="text-gray-500">
                                    Total Revenue
                                </p>
                                <h2 className="text-3xl font-bold text-green-600 mt-2">
                                    ₹{report.totalRevenue}
                                </h2>
                            </div>

                            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                                <p className="text-gray-500">
                                    Total Orders
                                </p>
                                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                    {report.totalOrders}
                                </h2>
                            </div>

                            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                                <p className="text-gray-500">
                                    Products Sold
                                </p>
                                <h2 className="text-3xl font-bold text-purple-600 mt-2">
                                    {report.totalProductSold}
                                </h2>
                            </div>
                        </div>

                        {/* PRODUCT SALES */}
                        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Product Sales
                                </h2>
                            </div>

                            {report.productSales.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No sales found
                                </div>
                            ): (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left px-6 py-4">
                                                    Product
                                                </th>

                                                <th className="text-left px-6 py-4">
                                                    Revenue
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {report.productSales.map((item, index) => (
                                                <tr key={index}
                                                className="border-t">

                                                    <td className="px-6 py-4 font-medium text-gray-800">
                                                        {item.product}
                                                    </td>

                                                    <td className="px-6 py-4 text-gray-600">
                                                        {item.quantity}
                                                    </td>

                                                    <td className="px-6 py-4 font-semibold text-green-600">
                                                        ₹{item.revenue}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminSalesReport;