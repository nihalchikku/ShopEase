import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All");

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(
                "http://localhost:5000/api/orders/admin/all",
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`,
                    },
                }
            );

            setOrders(res.data);
        } catch (error){
            console.log(error);
            toast.error("Failed to load orders");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.orderStatus === filter);


    const handleStatusChange = async (orderId, status) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.put(
                `http://localhost:5000/api/orders/admin/status/${orderId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(res.data.message);
            fetchOrders();
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to update order status"
            );
        }
    };
    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Order Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage and track customer orders
                    </p>
                </div>

                {/* FILTER */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">
                    <div className="flex flex-wrap gap-3">
                        {[
                            "All",
                            "Pending",
                            "Confirmed",
                            "Shipped",
                            "Delivered",
                            "Cancelled",
                        ].map((status) => (
                            <button key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                filter === status ? "bg-blue-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}>{status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ORDERS */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center border">
                            <p className="text-gray-500">
                                No orders found
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order._id}
                            className="bg-white rounded-2xl border shadow-sm p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-semibold text-gray-800 break-all">#{order._id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Customer</p>
                                        <p className="font-semibold">{order.user?.name || "unknown"}</p>
                                        <p className="text-sm text-gray-500">{order.user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-xl font-bold text-blue-600">₹{order.finalAmount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment</p>
                                        <p className="font-medium">{order.paymentMethod}</p>
                                        <p className="text-sm text-gray-500">{order.paymentStatus}</p>
                                    </div>
                                    <div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm
                                            font-semibold ${
                                                order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                                                order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" :
                                                order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700" :
                                                order.orderStatus === "Confirmed" ? "bg-purple-100 text-purple-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>{order.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t mt-5 pt-4 flex flex-col md:flex-row md:items-center
                                md:justify-between gap-3">
                                    <p className="text-sm text-gray-500">
                                        Ordered on{" "}
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <select value={order.orderStatus}
                                    onChange={(e) => handleStatusChange(
                                        order._id,
                                        e.target.value
                                    )} disabled={
                                        order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"
                                    }
                                    className="border rounded-lg px-4 py-2 bg-white">
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;