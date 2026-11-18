import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
            "http://localhost:5000/api/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders(res.data);

        } catch (error) {
            console.log(error);
            toast.error("Failed to load orders");
        }
    };

    useEffect(() =>{
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `http://localhost:5000/api/orders/cancel/${orderId}`,
                {},
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

            toast.error(error.response?.data?.message || "Cancel failed");
        }
    };

    // return (
    //     <div className="max-w-6xl mx-auto p-6">
    //         <h1 className="text-3xl font-bold mb-6">My Orders</h1>

    //         {orders.length === 0 ? (
    //             <p>No Orders Found</p>
    //         ) : (
    //             <div className="space-y-4">
    //                 {orders.map((order) => (
    //                     <div key={order._id}
    //                     className="border rounded p-4 shadow">
    //                         <p>
    //                             <strong>Order ID:</strong>
    //                             {order._id}
    //                         </p>

    //                         <p>
    //                             <strong>Total:</strong>₹
    //                             {order.finalAmount}
    //                         </p>

    //                         <p>
    //                             <strong>Payment:</strong>
    //                             {order.paymentMethod}
    //                         </p>

    //                         <p>
    //                             <strong>Payment Status:</strong>
    //                             {order.paymentStatus}
    //                         </p>

    //                         <p>
    //                             <strong>Order status:</strong>
    //                             {order.orderStatus}
    //                         </p>

    //                         <p>
    //                             <strong>Date:</strong>{""}
    //                             {new Date(order.createdAt).toLocaleDateString()}
    //                         </p>

    //                         <Link to={`/orders/${order._id}`}
    //                         className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded">
    //                             View Details
    //                         </Link>

    //                         {order.orderStatus !== "Cancelled" && (
    //                             <button
    //                             onClick={() => handleCancelOrder(order._id)}
    //                             className="bg-red-600 text-white px-4 py-2 rounded mt-3 ml-3">
    //                                 Cancel Order
    //                             </button>
    //                         )}


    //                     </div>
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // );

    return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Orders
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Track and manage your orders
                    </p>
                </div>

                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                    {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
                    <div className="text-5xl mb-4">📦</div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        No Orders Found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        You haven't placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5"
                        >

                            {/* Top Section */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">

                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                                        Order ID
                                    </p>

                                    <p className="font-semibold text-gray-700 mt-1 break-all">
                                        #{order._id}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-5">

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Total Amount
                                    </p>
                                    <p className="text-xl font-bold text-gray-800 mt-1">
                                        ₹{order.finalAmount}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Payment
                                    </p>
                                    <p className="font-semibold text-gray-700 mt-1">
                                        {order.paymentMethod}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Payment Status
                                    </p>

                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                            order.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">
                                        Order Status
                                    </p>

                                    <span
                                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                                            order.orderStatus === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.orderStatus === "Cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : order.orderStatus === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-orange-100 text-orange-700"
                                        }`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t">

                                <Link
                                    to={`/orders/${order._id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                                >
                                    View Details
                                </Link>

                                {order.orderStatus !== "Cancelled" && (
                                    <button
                                        onClick={() =>
                                            handleCancelOrder(order._id)
                                        }
                                        className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-lg font-medium transition"
                                    >
                                        Cancel Order
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

};

export default MyOrders;