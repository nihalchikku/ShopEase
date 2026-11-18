import { use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Checkout = () => {

    const navigate = useNavigate();

    // const location = useLocation();

    // const totalPrice = location.state?.totalPrice || 0;

    const location = useLocation();

    const totalPrice = location.state?.totalPrice || 0;
    const checkoutDiscount = location.state?.discount || 0;
    const checkoutFinalTotal = location.state?.finalTotal ?? totalPrice;

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [discount, setDiscount] = useState(0);

    const [finalTotal, setFinalTotal] = useState(0);

    const [walletBalance, setWalletBalance] = useState(0);

    const [appliedCoupon, setAppliedCoupon] = useState("");

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAddresses(res.data.addresses || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWallet = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/user/wallet",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWalletBalance(res.data.wallet || 0);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load wallet");
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("Selected Address:",selectedAddress);
            console.log("Payment Method:", paymentMethod);
            console.log("Discount:", discount);
            console.log("Token:", token);

            if(paymentMethod === "COD" ||
                paymentMethod === "WALLET"
            ) {

            

            const res = await axios.post(
                "http://localhost:5000/api/orders",
                // {
                //     addressId:
                //     selectedAddress,
                //     paymentMethod,
                //     discount,
                // },
                {
                    addressId: selectedAddress,
                    paymentMethod,
                    couponCode: localStorage.getItem("appliedCoupon"),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            window.dispatchEvent(new Event("cartUpdated"));

            toast.success(res.data.message);

            localStorage.removeItem("appliedCoupon");

            localStorage.removeItem("discount");

            navigate("/order-success");

        } else {

            const token = localStorage.getItem("token");

            console.log("finalTotal:", finalTotal);

            const razorpayOrder = await axios.post(
                "http://localhost:5000/api/orders/create-razorpay-order",
                // {
                //     amount: finalTotal,
                // },
                {
                    couponCode: localStorage.getItem("appliedCoupon")
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const options = {
                key:
                import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount:
                razorpayOrder.data.amount,

                currency:
                razorpayOrder.data.currency,

                name: "ShopEase",

                description: "Order Payment",

                order_id:
                razorpayOrder.data.id,

                method: {
                    card: true,
                    upi: true,
                    netbanking: true,
                    wallet: true,
                },

                handler: async function
                (response) {
                    console.log("Payment Success:",response);

                    const res = await axios.post(
                        "http://localhost:5000/api/orders",
                    // {
                    //     addressId: selectedAddress,
                    //     paymentMethod: "RAZORPAY",
                    //     discount,
                    //     razorpayPaymentId:
                    //     response.razorpay_payment_id,
                    //     razorpayOrderId:
                    //     response.razorpay_order_id,
                    //     razorpaySignature:
                    //     response.razorpay_signature,
                    // },


                    {
                        addressId: selectedAddress,
                        paymentMethod: "RAZORPAY",
                        couponCode: localStorage.getItem("appliedCoupon"),
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                window.dispatchEvent(new Event("cartUpdated"));

                toast.success(res.data.message);

                localStorage.removeItem("appliedCoupon");

                localStorage.removeItem("discount");

                navigate("/order-success");


                },

                prefill: {
                    name: "",

                    email: "",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const razor = new
            window.Razorpay(options);
            razor.open();
        }

            // toast.success(res.data.message);

            // localStorage.removeItem("appliedCoupon");

            // localStorage.removeItem("discount");

            // navigate("/order-success");

        } catch(error) {
            console.log(error.response?.data?.message);
            console.log("full error:",error);
            console.log("response:",error.response);
            console.log("data:",error.response?.data);
            toast.error(error.response?.data?.message || "Order failed");
        }
    };

    // useEffect(() => {
    //     fetchAddresses();

    //     // const savedDiscount = localStorage.getItem("discount");

    //     const savedDiscount = Number(localStorage.getItem("discount")) || 0;

    //     // if(savedDiscount) {
    //     //     setDiscount(Number(savedDiscount));
    //     // }

    //     setDiscount(savedDiscount);
    //     setFinalTotal(totalPrice - savedDiscount);
    // }, []);

    useEffect(() => {
        fetchAddresses();
        fetchWallet();

        const savedDiscount = Number(localStorage.getItem("discount")) || 0;

        setDiscount(savedDiscount);

        setFinalTotal(
            Math.max(totalPrice - savedDiscount, 0)
        );

//         setDiscount(0);
// setFinalTotal(totalPrice);
    }, [totalPrice]);

    // return (
    //     <div className="max-w-6xl mx-auto p-8">
    //         <h1 className="text-3xl font-bold mb-8">Checkout</h1>

    //         <h2 className="text-2xl font-semibold mb-4">Selected Address</h2>

    //         {addresses.map((address) => (
    //             <div key={address._id}
    //             className="border p-4 rounded mb-3">
    //                 <input type="radio"
    //                 name="address"
    //                 value={address._id}
    //                 checked={selectedAddress === address._id}
    //                 onChange={() => setSelectedAddress(address._id)} />

    //                 <p>{address.fullName}</p>
    //                 <p>{address.phone}</p>
    //                 <p>{address.house},
    //                     {address.city}, {address.state} -
    //                     {address.pincode}
    //                 </p>
    //             </div>
    //         ))}


    //         <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>

    //         <div className="border p-4 rounded space-y-3">
    //             <label className="flex items-center gap-2">
    //                 <input type="radio"
    //                 value="COD"
    //                 checked={paymentMethod === "COD"}
    //                 onChange={(e) => setPaymentMethod(e.target.value)} />
    //                 Cash on Delivery (COD)
    //             </label>

    //             <label className="flex items-center gap-2">
    //                 <input type="radio"
    //                 value="RAZORPAY"
    //                 checked={paymentMethod === "RAZORPAY"}
    //                 onChange={(e) => setPaymentMethod(e.target.value)} />
    //                 Razorpay (Online Payment)
    //             </label>
    //         </div>

    //         <button onClick={handlePlaceOrder} className="bg-green-600 text-white px-6 py-3 rounded mt-6">
    //             Place Order
    //         </button>
    //     </div>
    // );

//     return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-7xl mx-auto">

//             <div className="mb-8">
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//                     Checkout
//                 </h1>
//                 <p className="text-gray-500 mt-2">
//                     Complete your order securely
//                 </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                 {/* LEFT SIDE */}
//                 <div className="lg:col-span-2 space-y-6">

//                     {/* ADDRESS */}
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

//                         <div className="flex items-center justify-between mb-5">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">
//                                     Delivery Address
//                                 </h2>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Select where you want your order delivered
//                                 </p>
//                             </div>

//                             <span className="text-2xl">📍</span>
//                         </div>

//                         <div className="space-y-4">
//                             {addresses.length === 0 ? (
//                                 <div className="text-center py-6 text-gray-500">
//                                     No saved addresses found
//                                 </div>
//                             ) : (
//                                 addresses.map((address) => (
//                                     <label
//                                         key={address._id}
//                                         className={`block cursor-pointer rounded-xl border-2 p-5 transition ${
//                                             selectedAddress === address._id
//                                                 ? "border-blue-600 bg-blue-50"
//                                                 : "border-gray-200 hover:border-blue-300"
//                                         }`}
//                                     >
//                                         <div className="flex gap-4">

//                                             <input
//                                                 type="radio"
//                                                 name="address"
//                                                 value={address._id}
//                                                 checked={
//                                                     selectedAddress ===
//                                                     address._id
//                                                 }
//                                                 onChange={() =>
//                                                     setSelectedAddress(
//                                                         address._id
//                                                     )
//                                                 }
//                                                 className="mt-1 w-4 h-4 accent-blue-600"
//                                             />

//                                             <div className="flex-1">

//                                                 <div className="flex items-center justify-between">
//                                                     <h3 className="font-semibold text-gray-800">
//                                                         {address.fullName}
//                                                     </h3>

//                                                     {selectedAddress ===
//                                                         address._id && (
//                                                         <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
//                                                             Selected
//                                                         </span>
//                                                     )}
//                                                 </div>

//                                                 <p className="text-gray-600 mt-2">
//                                                     {address.phone}
//                                                 </p>

//                                                 <p className="text-gray-500 mt-1 leading-6">
//                                                     {address.house},{" "}
//                                                     {address.city},{" "}
//                                                     {address.state} -{" "}
//                                                     {address.pincode}
//                                                 </p>

//                                             </div>
//                                         </div>
//                                     </label>
//                                 ))
//                             )}
//                         </div>
//                     </div>

//                     {/* PAYMENT */}
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

//                         <div className="flex items-center justify-between mb-5">
//                             <div>
//                                 <h2 className="text-xl font-bold text-gray-800">
//                                     Payment Method
//                                 </h2>

//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Choose your preferred payment option
//                                 </p>
//                             </div>

//                             <span className="text-2xl">💳</span>
//                         </div>

//                         <div className="space-y-4">

//                             {/* COD */}
//                             <label
//                                 className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${
//                                     paymentMethod === "COD"
//                                         ? "border-green-500 bg-green-50"
//                                         : "border-gray-200 hover:border-green-300"
//                                 }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="payment"
//                                     value="COD"
//                                     checked={paymentMethod === "COD"}
//                                     onChange={(e) =>
//                                         setPaymentMethod(e.target.value)
//                                     }
//                                     className="w-4 h-4 accent-green-600"
//                                 />

//                                 <div className="text-2xl">💵</div>

//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-gray-800">
//                                         Cash on Delivery
//                                     </h3>

//                                     <p className="text-sm text-gray-500">
//                                         Pay when your order arrives
//                                     </p>
//                                 </div>

//                                 {paymentMethod === "COD" && (
//                                     <span className="text-green-600 font-bold">
//                                         ✓
//                                     </span>
//                                 )}
//                             </label>

//                             {/* RAZORPAY */}
//                             <label
//                                 className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${
//                                     paymentMethod === "RAZORPAY"
//                                         ? "border-blue-500 bg-blue-50"
//                                         : "border-gray-200 hover:border-blue-300"
//                                 }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     name="payment"
//                                     value="RAZORPAY"
//                                     checked={paymentMethod === "RAZORPAY"}
//                                     onChange={(e) =>
//                                         setPaymentMethod(e.target.value)
//                                     }
//                                     className="w-4 h-4 accent-blue-600"
//                                 />

//                                 <div className="text-2xl">💳</div>

//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-gray-800">
//                                         Online Payment
//                                     </h3>

//                                     <p className="text-sm text-gray-500">
//                                         Pay securely using Razorpay
//                                     </p>
//                                 </div>

//                                 {paymentMethod === "RAZORPAY" && (
//                                     <span className="text-blue-600 font-bold">
//                                         ✓
//                                     </span>
//                                 )}
//                             </label>

//                         </div>
//                     </div>

//                 </div>

//                 {/* RIGHT SIDE */}
//                 <div>
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">

//                         <h2 className="text-xl font-bold text-gray-800 mb-6">
//                             Order Summary
//                         </h2>

//                         <div className="space-y-4">

//                             <div className="flex justify-between text-gray-600">
//                                 <span>Subtotal</span>
//                                 <span>
//                                     ₹{totalPrice.toFixed(2)}
//                                 </span>
//                             </div>

//                             <div className="flex justify-between text-green-600">
//                                 <span>Discount</span>
//                                 <span>
//                                     - ₹{discount.toFixed(2)}
//                                 </span>
//                             </div>

//                             <div className="border-t pt-4 flex justify-between items-center">
//                                 <span className="text-lg font-bold text-gray-800">
//                                     Total
//                                 </span>

//                                 <span className="text-2xl font-bold text-blue-600">
//                                     ₹{finalTotal.toFixed(2)}
//                                 </span>
//                             </div>

//                         </div>

//                         <div className="mt-6 bg-gray-50 rounded-xl p-4">
//                             <div className="flex items-center gap-3">
//                                 <span className="text-xl">🔒</span>

//                                 <div>
//                                     <p className="text-sm font-semibold text-gray-700">
//                                         Secure Checkout
//                                     </p>

//                                     <p className="text-xs text-gray-500">
//                                         Your payment information is protected
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button
//                             onClick={handlePlaceOrder}
//                             className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition shadow-sm"
//                         >
//                             {paymentMethod === "COD"
//                                 ? "Place Order"
//                                 : "Pay Now"}
//                         </button>

//                         <p className="text-center text-xs text-gray-400 mt-4">
//                             By placing this order, you agree to our terms and
//                             conditions.
//                         </p>

//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>
// );

return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Checkout
                </h1>
                <p className="text-gray-500 mt-2">
                    Complete your order securely
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">

                    {/* ADDRESS */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Delivery Address
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Select where you want your order delivered
                                </p>
                            </div>
                            <span className="text-2xl">📍</span>
                        </div>

                        <div className="space-y-4">
                            {addresses.length === 0 ? (
                                <div className="text-center py-6 text-gray-500">
                                    No saved addresses found
                                </div>
                            ) : (
                                addresses.map((address) => (
                                    <label
                                        key={address._id}
                                        className={`block cursor-pointer rounded-xl border-2 p-5 transition ${
                                            selectedAddress === address._id
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-200 hover:border-blue-300"
                                        }`}
                                    >
                                        <div className="flex gap-4">
                                            <input
                                                type="radio"
                                                name="address"
                                                value={address._id}
                                                checked={
                                                    selectedAddress === address._id
                                                }
                                                onChange={() =>
                                                    setSelectedAddress(
                                                        address._id
                                                    )
                                                }
                                                className="mt-1 w-4 h-4 accent-blue-600"
                                            />

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-800">
                                                        {address.fullName}
                                                    </h3>

                                                    {selectedAddress ===
                                                        address._id && (
                                                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-gray-600 mt-2">
                                                    {address.phone}
                                                </p>

                                                <p className="text-gray-500 mt-1 leading-6">
                                                    {address.house},{" "}
                                                    {address.city},{" "}
                                                    {address.state} -{" "}
                                                    {address.pincode}
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    {/* PAYMENT */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    Payment Method
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Choose your preferred payment option
                                </p>
                            </div>

                            <span className="text-2xl">💳</span>
                        </div>

                        <div className="space-y-4">

                            {/* COD */}
                            <label
                                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${
                                    paymentMethod === "COD"
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 hover:border-green-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="w-4 h-4 accent-green-600"
                                />

                                <div className="text-2xl">💵</div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                        Cash on Delivery
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Pay when your order arrives
                                    </p>
                                </div>

                                {paymentMethod === "COD" && (
                                    <span className="text-green-600 font-bold">
                                        ✓
                                    </span>
                                )}
                            </label>

                            {/* RAZORPAY */}
                            <label
                                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${
                                    paymentMethod === "RAZORPAY"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="RAZORPAY"
                                    checked={paymentMethod === "RAZORPAY"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="w-4 h-4 accent-blue-600"
                                />

                                <div className="text-2xl">💳</div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                        Online Payment
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Pay securely using Razorpay
                                    </p>
                                </div>

                                {paymentMethod === "RAZORPAY" && (
                                    <span className="text-blue-600 font-bold">
                                        ✓
                                    </span>
                                )}
                            </label>

                            {/* WALLET */}
                            <label
                                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition ${
                                    paymentMethod === "WALLET"
                                        ? "border-purple-500 bg-purple-50"
                                        : "border-gray-200 hover:border-purple-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="WALLET"
                                    checked={paymentMethod === "WALLET"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="w-4 h-4 accent-purple-600"
                                />

                                <div className="text-2xl">👛</div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800">
                                            Wallet
                                        </h3>

                                        <span className="text-sm font-semibold text-purple-600">
                                            Balance: ₹{walletBalance.toFixed(2)}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Pay using your ShopEase wallet balance
                                    </p>

                                    {walletBalance < finalTotal && (
                                        <p className="text-xs text-red-500 mt-2">
                                            Insufficient wallet balance
                                        </p>
                                    )}
                                </div>

                                {paymentMethod === "WALLET" && (
                                    <span className="text-purple-600 font-bold">
                                        ✓
                                    </span>
                                )}
                            </label>

                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">

                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>
                                    ₹{totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>
                                    - ₹{discount.toFixed(2)}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-800">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-blue-600">
                                    ₹{finalTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* WALLET BALANCE SUMMARY */}
                        {paymentMethod === "WALLET" && (
                            <div className="mt-5 bg-purple-50 border border-purple-100 rounded-xl p-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Wallet Balance
                                    </span>

                                    <span className="font-semibold text-purple-700">
                                        ₹{walletBalance.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm mt-2">
                                    <span className="text-gray-600">
                                        After Payment
                                    </span>

                                    <span
                                        className={`font-semibold ${
                                            walletBalance >= finalTotal
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        ₹
                                        {Math.max(
                                            0,
                                            walletBalance - finalTotal
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🔒</span>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Secure Checkout
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Your payment information is protected
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={
                                paymentMethod === "WALLET" &&
                                walletBalance < finalTotal
                            }
                            className={`w-full mt-6 text-white font-semibold py-4 rounded-xl transition shadow-sm ${
                                paymentMethod === "WALLET" &&
                                walletBalance < finalTotal
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {paymentMethod === "COD"
                                ? "Place Order"
                                : paymentMethod === "WALLET"
                                ? "Pay with Wallet"
                                : "Pay Now"}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            By placing this order, you agree to our terms and
                            conditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

};

export default Checkout;