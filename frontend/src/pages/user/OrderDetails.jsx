import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:5000/api/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrder(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load order");
        }
    };

    const handleCancelItem = async (itemId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                `http://localhost:5000/api/orders/${id}/item/${itemId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(res.data.message);

            fetchOrder();

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to cancel item"
            );
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    if(!order) return <h2
    className="text-center mt-10">
        Loading...
    </h2>;

    // return (
    //     <div className="max-w-5xl mx-auto p-6">
    //         <h1 className="text-3xl font-bold mb-6">
    //             Order Details
    //         </h1>

    //         <div className="border rounded p-5 mb-6">
    //             <p><strong>Order ID:</strong>
    //             {order._id}</p>

    //             <p><strong>Payment:</strong>
    //             {order.paymentMethod}</p>

    //             <p><strong>Payment Status:</strong>
    //             {order.paymentStatus}</p>

    //             <p><strong>Total:</strong>₹
    //             {order.finalAmount}</p>
    //         </div>

    //         <h2 className="text-2xl font-semibold mb-4">Products</h2>

    //         {order.items.map((item) => (
    //             <div key={item._id}
    //             className="border rounded p-4 mb-3">

    //                 <img src={`http://localhost:5000/uploads/${item.product.image}`} alt={item.product.name}
    //                 className="w-24 h-24 object-cover rounded" />
    //                 <p><strong>Product:</strong>
    //                 {item.product.name}</p>

    //                 <p><strong>Quantity:</strong>
    //                 {item.quantity}</p>

    //                 <p><strong>Price:</strong>
    //                 {item.price}</p>
    //             </div>
    //         ))}
    //     </div>
    // );

    return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-sm text-gray-500 mb-1">ShopEase</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Order Details
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Review your order and payment information
                    </p>
                </div>

                <button
                    onClick={() => window.history.back()}
                    className="border border-gray-300 bg-white px-4 py-2 rounded-lg
                    text-gray-700 hover:bg-gray-100 transition"
                >
                    ← Back
                </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-semibold text-gray-800 break-all">
                            #{order._id}
                        </p>
                    </div>

                    <div className="text-left md:text-right">
                        <p className="text-sm text-gray-500">Order Total</p>
                        <p className="text-3xl font-bold text-blue-600">
                            ₹{order.finalAmount}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 mb-1">
                            Payment Method
                        </p>
                        <p className="font-semibold text-gray-800">
                            {order.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 mb-1">
                            Payment Status
                        </p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                            ${
                                order.paymentStatus === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {order.paymentStatus}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500 mb-1">
                            Order Status
                        </p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                            ${
                                order.orderStatus === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                        >
                            {order.orderStatus}
                        </span>
                    </div>

                </div>
            </div>

            {/* ORDER TRACKING */}
            <div className="bg-white border rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Order Tracking
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Track your order status
                        </p>
                    </div>

                    <span className="text-2xl">🚚</span>
                </div>

                {[
                    "Pending",
                    "Confirmed",
                    "Shipped",
                    "Delivered",
                ].map((status, index) => {
                    const statusOrder = [
                        "Pending",
                        "Confirmed",
                        "Shipped",
                        "Delivered",
                    ];

                    const currentIndex = statusOrder.indexOf(order.orderStatus);

                    const isCompleted = currentIndex >= index;

                    const isCurrent = order.orderStatus === status;

                    return (
                        <div key={status}
                        className="flex items-start">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                    isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                }`}>
                                    {isCompleted ? "🗸 " : index + 1}
                                </div>

                                {index < 3 && (
                                    <div className={`w-1 h-12 ${
                                        currentIndex > index ? "bg-green-500" : "bg-gray-200"
                                    }`}
                                    />
                                )}
                            </div>

                            <div className="ml-4 pb-6">
                                <p className={`font-semibold ${
                                    isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                                }`}>
                                    {status}
                                </p>

                                {isCurrent && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Current order status
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                {order.orderStatus === "Cancelled" && (
                    <div className="mt-2 p-4 rounded-xl bg-red-50 border border-red-200">
                        <p className="font-semibold text-red-600">
                            ❌ Order Cancelled
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            This order has been cancelled.
                        </p>
                    </div>
                )}
                
            </div>

            {/* DELIVER ADDRESS */}
            <div className="bg-white border rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Delivery Address
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your order will be delivered to this address
                        </p>
                    </div>

                    <span className="text-2xl">📍</span>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 text-lg">
                        {order.address?.fullName}
                    </h3>

                    <p className="text-gray-600 mt-2">
                        📞
                        {order.address?.phone}
                    </p>

                    <p className="text-gray-600 mt-2 leading-7">
                        {order.address?.house},{" "}
                        {order.address?.city},{" "}
                        {order.address?.state} -{" "}
                        {order.address?.pincode}
                    </p>
                </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Ordered Products
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {order.items.length} item
                            {order.items.length !== 1 ? "s" : ""} in this order
                        </p>
                    </div>
                </div>

                <div className="space-y-4">

                    {order.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4
                            border border-gray-200 rounded-xl p-4
                            hover:shadow-sm transition"
                        >

                            <img
                                src={`http://localhost:5000/uploads/${item.product.image}`}
                                alt={item.product.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover
                                rounded-xl border border-gray-200"
                            />

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {item.product.name}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="text-gray-600 mt-2">
                                    Price: ₹{item.price}
                                </p>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-sm text-gray-500">
                                    Item Total
                                </p>

                                <p className="text-xl font-bold text-gray-800">
                                    ₹{item.price * item.quantity}
                                </p>
                            </div>

                            {!item.cancelled && order.orderStatus !== "Delvered" && order.orderStatus !== "Cancelled" && (
                                <button onClick={() => handleCancelItem(item._id)}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                                    Cancel Item
                                </button>
                            )}

                            {item.cancelled && (
                                <span className="inline-block mt-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
                                    Item Cancelled
                                </span>
                            )}

                        </div>
                    ))}

                </div>

                {/* Bottom Total */}
                <div className="border-t border-gray-200 mt-6 pt-5">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-600">
                            Total Amount
                        </span>

                        <span className="text-2xl font-bold text-blue-600">
                            ₹{order.finalAmount}
                        </span>
                    </div>
                </div>

            </div>

        </div>
    </div>
);

};

export default OrderDetails;