import { Link } from "react-router-dom";

const OrderSuccess = () => {
    // return (
    //     <div className="min-h-screen flex items-center justify-center">
    //         <div className="text-center">
    //             <h1 className="text-4xl font-bold text-green-600">
    //                 Order Placed Successfully 🎉
    //             </h1>

    //             <p className="mt-4">
    //                 Thank you for shopping with ShopEase.
    //             </p>

    //             <Link to="/"
    //             className="bg-blue-600 text-white px-5 py-2 rounded mt-5 inline-block">
    //                 Continue Shopping
    //             </Link>
    //         </div>
    //     </div>
    // );

//     return (
//     <div className="min-h-[75vh] flex items-center justify-center px-4">
//         <div className="w-full max-w-2xl">
//             <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-12 text-center">

//                 {/* Success Icon */}
//                 <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
//                     <span className="text-4xl">✓</span>
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-3xl md:text-4xl font-bold text-green-600">
//                     Order Placed Successfully! 🎉
//                 </h1>

//                 <p className="text-gray-500 mt-3 text-lg">
//                     Thank you for shopping with <span className="font-semibold text-gray-800">ShopEase</span>.
//                 </p>

//                 {/* Success Message */}
//                 <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mt-8 text-left">
//                     <p className="font-semibold text-gray-800">
//                         Your order has been confirmed.
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                         You can track your order status from your orders page.
//                     </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">

//                     <a
//                         href="/orders"
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition"
//                     >
//                         View My Orders
//                     </a>

//                     <a
//                         href="/"
//                         className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-7 py-3 rounded-xl transition"
//                     >
//                         Continue Shopping
//                     </a>

//                 </div>

//             </div>
//         </div>
//     </div>
// );

return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white p-10 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center">

            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl text-green-600">✓</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
                Order Placed Successfully! 🎉
            </h1>

            <p className="text-gray-600 text-lg mb-8">
                Thank you for shopping with ShopEase.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left">
                <p className="font-semibold text-gray-800 mb-1">
                    Your order has been confirmed.
                </p>

                <p className="text-sm text-gray-500">
                    You can track your order status from your orders page.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                    to="/my-orders"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    View My Orders
                </Link>

                <Link
                    to="/"
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
                >
                    Continue Shopping
                </Link>
            </div>

        </div>
    </div>
);

};

export default OrderSuccess;