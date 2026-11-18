import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ProductDetails() {

    const { id } = useParams();


    const navigate = useNavigate();

    const [product, setProduct] = useState(null);


    // const [zoomImage, setZoomImage] = useState(false);

    const [isZooming, setIsZooming] = useState(false);
const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
});
const [mobileZoom, setMobileZoom] = useState(false);

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    const [isInCart, setIsInCart] = useState(false);

    const getProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/product/${id}`
            );

            setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getReviews = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/reviews/${id}`
            );

            setReviews(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const checkCart = async () => {
    try {
        const token = localStorage.getItem("token");

        // Logged out → local cart check
        if (!token) {
            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const exists = localCart.some(
                (item) => item.productId === product._id
            );

            setIsInCart(exists);
            return;
        }

        // Logged in → backend cart check
        const res = await axios.get(
            "http://localhost:5000/api/cart",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const exists = res.data?.items?.some(
            (item) => item.product?._id === product._id
        );

        setIsInCart(exists);
    } catch (error) {
        console.log(error);
    }
};

    useEffect(() => {
    getProduct();
    getReviews();
}, [id]);

useEffect(() => {
    if (product) {
        checkCart();
    }
}, [product]);

    

    

    // const handleAddToCart = () => {
    //     let cart =
    //     JSON.parse(localStorage.getItem("cart")) || [];

        

    //     const existingProduct = cart.find(
    //         (item) => item._id === product._id
    //     );

    //     if(existingProduct) {

    //         if(existingProduct.quantity >= product.stock) {
    //             toast.error(`Only ${product.stock} items available in stock`);
    //             return;
    //         }
            
    //         existingProduct.quantity += 1;
    //     } else {
    //         cart.push({
    //             ...product,
    //             quantity:1
    //         });
    //     } 

    //     localStorage.setItem("cart", JSON.stringify(cart));

    //     window.dispatchEvent(new Event("cartUpdated"));

    //     toast.success("Product added to cart");
    // }

    // if(!product) {
    //     return <h1>Loading...</h1>;
    // }



const handleAddToCart = async () => {
    try {
        const token = localStorage.getItem("token");

        // Logged out → localStorage cart
        if (!token) {
            const localCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = localCart.find(
                (item) => item.productId === product._id
            );

            if (existingProduct) {

                // Check stock before increasing quantity
                if (
                    existingProduct.quantity >=
                    product.stock
                ) {
                    toast.error(
                        `Only ${product.stock} items available`
                    );
                    return;
                }

                existingProduct.quantity += 1;

            } else {
                localCart.push({
                    productId: product._id,
                    quantity: 1,
                    product: product,
                });
            }

            localStorage.setItem(
                "cart",
                JSON.stringify(localCart)
            );

            setIsInCart(true);

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            toast.success("Product added to cart");
            return;
        }

        // Logged in → backend cart
        await axios.post(
            "http://localhost:5000/api/cart/add",
            {
                productId: product._id,
                quantity: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setIsInCart(true);

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        toast.success("Product added to cart");

    } catch (error) {
        console.log(error);

        toast.error(
            error.response?.data?.message ||
            "Failed to add product"
        );
    }
};

    const handleSubmitReview = async () => {
        if(rating === 0){
            toast.error("Please select a rating");
            return;
        }

        if(!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        try {
            setSubmittingReview(true);

            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/api/reviews",
                {
                    productId:
                    product._id,
                    rating,
                    comment:
                    comment.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Review submitted successfully");

            setRating(0);
            setComment("");

            // Product details 

            getReviews();
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to submit review"
            );
        } finally {
            setSubmittingReview(false);
        }
    }; 

    if(!product) {
        return <h1>Loading...</h1>; 
    }

    return (
       <div className="max-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow cursor-pointer"
            onClick={() => setZoomImage(true)} /> */}

            {/* <div className="relative w-full h-96 overflow-hidden rounded-lg shadow cursor-crosshair"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                setZoomPosition({
                    x: Math.max(0,
                        Math.min(100, x)),
                    y: Math.max(0,
                        Math.min(100, y)),
                });
            }}
            >
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZooming ? "scale-150" : "scale-100"
                }`}
                style={isZooming ? {
                    transformOrigin: `$
                    {zoomPosition.x}% $
                    {zoomPosition.y}%`,
                }
                : {}
            } 
            />

            {isZooming && (
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    🔍 Zoom
                </div>
            )}
            </div> */}

            
<div
    className="relative w-full h-96 overflow-hidden rounded-lg shadow cursor-crosshair bg-gray-100 touch-manipulation"
    onMouseEnter={() => setIsZooming(true)}
    onMouseLeave={() => setIsZooming(false)}
    onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    }}
    onTouchStart={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];

        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });

        setMobileZoom(true);
    }}
    onTouchMove={(e) => {
        if (!mobileZoom) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];

        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    }}
    onClick={() => {
        if (mobileZoom) {
            setMobileZoom(false);
        }
    }}
>
    <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        className={`w-full h-full object-contain transition-transform duration-150 ${
            isZooming || mobileZoom ? "scale-[2]" : "scale-100"
        }`}
        style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
    />

    {(isZooming || mobileZoom) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs sm:text-sm px-3 py-2 rounded-full whitespace-nowrap pointer-events-none">
            {mobileZoom
                ? "🔍 Touch image to move zoom"
                : "🔍 Move mouse to zoom"}
        </div>
    )}

    {!mobileZoom && !isZooming && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap pointer-events-none sm:hidden">
            🔍 Touch image to zoom
        </div>
    )}
</div>


            <div> 
                <h1 className="text-4xl font-bold">
                    {product.name}
                </h1>

                <p className="text-gray-600 mt-4">{product.description}</p>

                <p className="text-2xl font-bold mt-4 text-green-600">₹{product.price}</p>
                <p className="mt-2">
                    <strong>Category:</strong>
                    {product.category?.name}
                </p>
                <p className="mt-2">
                    <strong>Stock:</strong>
                    {product.stock}
                </p>
                {product.stock === 0 ? (
                    <p className="text-red-600 font-bold mt-2">
                        Out of Stock
                    </p>
                ) : (
                    <p className="text-green-600 font-bold mt-2">
                        In Stock
                    </p>
                )}

                {/* <button onClick={handleAddToCart} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Add to Cart
                </button> */}

                {/* <button onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`px-6 py-3 rounded-lg text-white ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</button> */}

                <button
    onClick={() => {
        if (isInCart) {
            navigate("/cart");
        } else {
            handleAddToCart();
        }
    }}
    disabled={product.stock === 0}
    className={`mt-6 px-8 py-3 rounded-lg text-white font-semibold transition ${
        product.stock === 0
            ? "bg-gray-400 cursor-not-allowed"
            : isInCart
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {product.stock === 0
        ? "Out of Stock"
        : isInCart
        ? "🛒 Go to Cart"
        : "🛒 Add to Cart"}
</button>
            </div>
        </div>

        {/* Write Review */}
<div className="mt-12 border rounded-lg p-6 shadow-sm">

    <h2 className="text-2xl font-bold mb-4">
        Write a Review
    </h2>

    {/* Rating */}
    <div className="mb-5">

        <p className="font-semibold mb-2">
            Your Rating
        </p>

        <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                        star <= rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                    }`}
                >
                    ★
                </button>
            ))}

        </div>

        {rating > 0 && (
            <p className="text-sm text-gray-500 mt-1">
                {rating} out of 5
            </p>
        )}

    </div>

    {/* Comment */}
    <div className="mb-5">

        <label className="block font-semibold mb-2">
            Your Comment
        </label>

        <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

    </div>

    {/* Submit */}
    <button
        onClick={handleSubmitReview}
        disabled={submittingReview}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
            submittingReview
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
        {submittingReview
            ? "Submitting..."
            : "Submit Review"}
    </button>

</div>

        
        <div className="mt-12 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">
                Customer Reviews
            </h2>

            {reviews.length === 0 ? (
                <p className="text-gray-500">
                    No reviews yet.
                </p>
            ): (
                <div className="space-y-5">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b pb-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">
                                    {review.user?.name || "User"}
                                </h3>

                                <span className="text-yellow-500">
                                    {"⭐".repeat(review.rating)}
                                </span>
                            </div>
                            <p className="text-gray-600 mt-2">
                                {review.comment}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
       </div>
    );
}

export default ProductDetails;