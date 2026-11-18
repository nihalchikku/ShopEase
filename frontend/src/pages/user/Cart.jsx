import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {


    const navigate = useNavigate();



    const [cart, setCart] = useState([]);

    const [couponCode, setCouponCode] = useState("");

    const [discount, setDiscount] = useState(0);

    const [finalTotal, setFinalTotal] = useState(0);

    const [availableCoupons, setAvailableCoupons] = useState([]);

    const [zoomImage, setZoomImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);


    useEffect(() => {
        fetchCart();
        fetchAvailableCoupons();
    }, []);

    
    // const fetchCart = async () => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         const res = await axios.get(
    //             "http://localhost:5000/api/cart",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         setCart(res.data?.items || []);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const fetchCart = async () => {
    try {
        const token = localStorage.getItem("token");

        // Login ഇല്ലെങ്കിൽ localStorage cart എടുക്കുക
        if (!token) {
            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            setCart(localCart);
            return;
        }

        // Login ചെയ്താൽ backend cart എടുക്കുക
        const res = await axios.get(
            "http://localhost:5000/api/cart",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCart(res.data?.items || []);

    } catch (error) {
        console.log(error);
    }
};

    const fetchAvailableCoupons = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/coupons/available",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAvailableCoupons(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const applySelectedCoupon = async (code) => {
        setCouponCode(code);

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/coupons/apply",
                {
                    code,
                    totalAmount:
                    totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDiscount(res.data.discountAmount);

            setFinalTotal(res.data.finalAmount);

            localStorage.setItem("discount",
                res.data.discountAmount
            );

            localStorage.setItem("appliedCoupon",
                code
            );

            toast.success(res.data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to apply coupon"
            );
        }
    };

    
    // const increaseQuantity = async (item) => {
    //     try {
    //         if(item.quantity >= item.product.stock) {
    //             toast.error(`Only ${item.product.stock} items available`);
    //             return;
    //         }

    //         const token = localStorage.getItem("token");

    //         await axios.put(
    //             "http://localhost:5000/api/cart/update",
    //             {
    //                 productId:
    //                 item.product._id,
    //                 quantity: item.quantity + 1,
    //             },
    //             {headers: {
    //                 Authorization:  `Bearer ${token}`,
    //             },}
    //         );

    //         fetchCart();
    //         window.dispatchEvent(new Event("cartUpdated"));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const increaseQuantity = async (item) => {
    try {
        const token = localStorage.getItem("token");

        // Logged out → localStorage cart
        if (!token) {
            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = localCart.map((cartItem) => {
                if (cartItem.productId === item.productId) {
                    if (cartItem.quantity >= cartItem.product.stock) {
                        toast.error(
                            `Only ${cartItem.product.stock} items available`
                        );
                        return cartItem;
                    }

                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    };
                }

                return cartItem;
            });

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);

            window.dispatchEvent(new Event("cartUpdated"));
            return;
        }

        // Logged in → backend cart
        if (item.quantity >= item.product.stock) {
            toast.error(`Only ${item.product.stock} items available`);
            return;
        }

        await axios.put(
            "http://localhost:5000/api/cart/update",
            {
                productId: item.product._id,
                quantity: item.quantity + 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchCart();
        window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
        console.log(error);
    }
};
    
    // const decreaseQuantity = async (item) => {
    //     try {
    //         if(item.quantity === 1) {
    //             return;
    //         }

    //         const token = localStorage.getItem("token");

    //         await axios.put(
    //             "http://localhost:5000/api/cart/update",
    //             {
    //                 productId: item.product._id,
    //                 quantity: item.quantity - 1,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         fetchCart();
    //         window.dispatchEvent(new Event("cartUpdated"));
    //     } catch (error){
    //         console.log(error);
    //     }
    // };

    const decreaseQuantity = async (item) => {
    try {
        const token = localStorage.getItem("token");

        // Logged out → localStorage cart
        if (!token) {
            if (item.quantity === 1) return;

            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = localCart.map((cartItem) => {
                if (cartItem.productId === item.productId) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    };
                }

                return cartItem;
            });

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);

            window.dispatchEvent(new Event("cartUpdated"));
            return;
        }

        // Logged in → backend cart
        if (item.quantity === 1) return;

        await axios.put(
            "http://localhost:5000/api/cart/update",
            {
                productId: item.product._id,
                quantity: item.quantity - 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchCart();
        window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
        console.log(error);
    }
};

    // const removeItem = async (item) => {
    //     try {
    //         const token = localStorage.getItem("token");

    //         await axios.delete(
    //             "http://localhost:5000/api/cart/remove",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //                 data: {
    //                     productId: item.product._id,
    //                 },
    //             }
    //         );

    //         fetchCart();

    //         window.dispatchEvent(new Event("cartUpdated"));

    //         toast.success("Product removed from cart");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to remove product");
    //     }
    // };

//     const removeItem = async (item) => {
//     try {
//         const token = localStorage.getItem("token");

//         // Logged out → localStorage cart
//         if (!token) {
//             const localCart =
//                 JSON.parse(localStorage.getItem("cart")) || [];

//             const updatedCart = localCart.filter(
//                 (cartItem) => cartItem.productId !== item.productId
//             );

//             localStorage.setItem("cart", JSON.stringify(updatedCart));
//             setCart(updatedCart);

//             window.dispatchEvent(new Event("cartUpdated"));
//             toast.success("Product removed from cart");
//             return;
//         }

//         // Logged in → backend cart
//         await axios.delete(
//             `http://localhost:5000/api/cart/remove/${item.product._id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         fetchCart();
//         window.dispatchEvent(new Event("cartUpdated"));
//         toast.success("Product removed from cart");
//     } catch (error) {
//         console.log(error);
//         toast.error("Failed to remove product");
//     }
// };

const removeItem = async (item) => {
    try {
        const token = localStorage.getItem("token");

        // Logged out → localStorage cart
        if (!token) {
            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const updatedCart = localCart.filter(
                (cartItem) =>
                    cartItem.productId !== item.productId
            );

            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );

            setCart(updatedCart);

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            toast.success("Product removed from cart");
            return;
        }

        // Logged in → backend cart
        await axios.delete(
            "http://localhost:5000/api/cart/remove",
            {
                data: {
                    productId: item.product._id,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchCart();

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        toast.success("Product removed from cart");

    } catch (error) {
        console.log(error.response?.data || error);
        toast.error(
            error.response?.data?.message ||
            "Failed to remove product"
        );
    }
};
    const handleAppyCoupon = async () => {

        if(discount > 0) {
            toast.error("coupon already applied");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            
            const res = await axios.post(
                "http://localhost:5000/api/coupons/apply",
                {
                    code: couponCode,
                    totalAmount: totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDiscount(res.data.discountAmount);

            setFinalTotal(res.data.finalAmount);

            localStorage.setItem("discount", res.data.discountAmount);

            localStorage.setItem(
                "appliedCoupon", couponCode
            );

            toast.success(res.data.message);

        } catch(error) {
            toast.error(
                error.response?.data?.message || "Failed to apply coupon"
            );
        }
    };

    useEffect(() => {
        const savedCoupon = localStorage.getItem("appliedCoupon")

        if(savedCoupon) {
            setCouponCode(savedCoupon.code);

            setDiscount(savedCoupon.discount);

            setFinalTotal(savedCoupon.finalTotal);
        }
    }, []);

    const totalPrice = cart.reduce((total,item) => {
        return total + (item.product.price * item.quantity);
    }, 0);

    useEffect(() => {
        setFinalTotal(totalPrice);
    }, [totalPrice]);

    useEffect(() => {
        const savedCoupon = localStorage.getItem("appliedCoupon");

        if(savedCoupon) {
            setCouponCode(savedCoupon);
        }
    }, []);

    

    useEffect(() => {
        const savedCoupon = localStorage.getItem("appliedCoupon");

        if(savedCoupon) {
            setCouponCode(savedCoupon);
        }
    }, []);

    useEffect(() => {
        if(couponCode && totalPrice > 0) {
            handleAppyCoupon();
        }
    }, [totalPrice]);


    return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    My Cart
                </h1>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {cart.length} {cart.length === 1 ? "Item" : "Items"}
                </span>
            </div>

            {cart.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Your cart is empty
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Add some products to your cart and they will appear here.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Cart Products */}
                    <div className="lg:col-span-2 space-y-4">

                        {cart.map((item) => (
                            <div
                                key={item._id || item.productId}
                                className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col sm:flex-row gap-5"
                            >

                                {/* Product Image */}
                                                                
                                {/* Product Image */}
                                <div
                                className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl border bg-white flex items-center justify-center cursor-zoom-in"
                                onClick={() => {
                                    setZoomImage(`http://localhost:5000/uploads/${item.product.image}`);
                                    setIsZoomed(false);
                                }}
                                >
                                <img
                                    src={`http://localhost:5000/uploads/${item.product.image}`}
                                    alt={item.product.name}
                                    className="w-full h-full object-contain sm:object-cover transition-transform duration-300 sm:hover:scale-110"
                                />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">

                                    <div className="flex justify-between gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                {item.product.name}
                                            </h2>

                                            <p className="text-lg font-semibold text-gray-700 mt-1">
                                                ₹{item.product.price}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 mt-6">

                                        <button
                                            onClick={() => decreaseQuantity(item)}
                                            className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-bold text-xl"
                                        >
                                            −
                                        </button>

                                        <span className="min-w-[80px] text-center font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQuantity(item)}
                                            className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 font-bold text-xl"
                                        >
                                            +
                                        </button>

                                    </div>

                                    {/* Item Total */}
                                    <p className="text-sm text-gray-500 mt-4">
                                        Item Total:
                                        <span className="font-bold text-gray-800 ml-2">
                                            ₹{item.product.price * item.quantity}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">

                        <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Order Summary
                            </h2>

                            {/* Coupon */}
                            <div className="mb-6">

                                <h3 className="font-semibold text-gray-700 mb-3">
                                    Apply Coupon
                                </h3>

                                <div className="flex gap-2">

                                    <input
                                        type="text"
                                        placeholder="Coupon Code"
                                        value={couponCode}
                                        onChange={(e) =>
                                            setCouponCode(e.target.value)
                                        }
                                        className="flex-1 min-w-0 border rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        onClick={handleAppyCoupon}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-xl font-semibold"
                                    >
                                        Apply
                                    </button>

                                </div>

                                {discount > 0 && (
                                    <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
                                        <p className="text-green-700 font-semibold text-sm">
                                            "{couponCode.toUpperCase()}" Applied ✓
                                        </p>

                                        <button
                                            onClick={() => {
                                                setCouponCode("");
                                                setDiscount(0);
                                                setFinalTotal(totalPrice);
                                                localStorage.removeItem("appliedCoupon");
                                                toast.success("Coupon removed");
                                            }}
                                            className="text-red-500 text-sm font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                            </div>

                            {availableCoupons.length > 0 && (
                                <div className="mt-5">
                                    <h3 className="font-semibold text-gray-800 mb-3">
                                        Available Coupons 🎫
                                    </h3>

                                    <div className="space-y-3">
                                        {availableCoupons.map((coupon) => (
                                            <div key={coupon._id}
                                            className="border border-dashed border-green-400
                                            bg-green-50 rounded-xl p-4 flex items-center 
                                            justify-between gap-4">
                                                <div>
                                                    <p className="font-bold text-green-700">
                                                        {coupon.code}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Get {coupon.discount}% off
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Minimum purchase: ₹ {coupon.minAmount}
                                                    </p>
                                                    
                                                </div>

                                                <button onClick={() => {
                                                    applySelectedCoupon(coupon.code);
                                                }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                                    Apply
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Details */}
                            <div className="border-t pt-5 space-y-3">

                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>- ₹{discount}</span>
                                    </div>
                                )}

                                <div className="border-t pt-4 flex justify-between">
                                    <span className="text-xl font-bold text-gray-800">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-blue-600">
                                        ₹{discount > 0 ? finalTotal : totalPrice}
                                    </span>
                                </div>

                            </div>

                            {/* Checkout */}
                            <button
                                // onClick={() =>
                                //     navigate("/checkout", {
                                //         state: {
                                //             totalPrice:
                                //                 discount > 0
                                //                     ? finalTotal
                                //                     : totalPrice,
                                //         },
                                //     })
                                // }

                                onClick={() => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login to continue checkout");
        navigate("/login", {
            state: { from: "/cart" }
        });
        return;
    }

    // navigate("/checkout", {
    //     state: {
    //         totalPrice: discount > 0 ? finalTotal : totalPrice
    //     }
    // });
    navigate("/checkout", {
    state: {
        totalPrice,
        discount,
        finalTotal: discount > 0 ? finalTotal : totalPrice
    }
});
}}
                                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>

        
{zoomImage && (
  <div
    className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
    onClick={() => {
      setZoomImage(null);
      setIsZoomed(false);
    }}
  >
    <button
      type="button"
      onClick={() => {
        setZoomImage(null);
        setIsZoomed(false);
      }}
      className="absolute top-4 right-4 text-white text-3xl"
      aria-label="Close image"
    >
      &times;
    </button>

    <img
      src={zoomImage}
      alt="Product preview"
      onClick={(e) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
      }}
      className={`max-w-full max-h-[85vh] object-contain rounded-lg cursor-zoom-in transition-transform duration-300 ${
        isZoomed
          ? "scale-125 cursor-zoom-out"
          : "scale-100"
      }`}
    />
  </div>
)}

    </div>
);
}

export default Cart;