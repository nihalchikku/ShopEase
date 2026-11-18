// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useEffect, useState } from "react";


// // function Navbar() {

// //     const navigate = useNavigate();
// //     const [profileOpen, setProfileOpen] = useState(false);

// //     const [cartCount, setCartCount] = useState(0);

// //     const [categories, setCategories] = useState([]);

// //     // useEffect(() => {
// //     //     const updateCartCount = async () => {
// //     //         try {
// //     //             const token = localStorage.getItem("token");

// //     //             if(!token) {
// //     //                 setCartCount(0);
// //     //                 return;
// //     //             }

// //     //             const res = await axios.get(
// //     //                 "http://localhost:5000/api/cart",
// //     //                 {
// //     //                     headers: {
// //     //                         Authorization:
// //     //                         `Bearer ${token}`,
// //     //                     },
// //     //                 }
// //     //             );


// //     //             const totalCount = res.data.items.reduce((total, item) => total + item.quantity, 0);

// //     //             setCartCount(totalCount);
// //     //         } catch (error) {
// //     //             setCartCount(0);
// //     //         }
// //     //     };

// //     //     updateCartCount();

// //     //     window.addEventListener("cartUpdated", updateCartCount);

// //     //     return () => {
// //     //         window.removeEventListener("cartUpdated", updateCartCount);
// //     //     };
// //     // }, []);

// //     useEffect(() => {
// //     const updateCartCount = async () => {
// //         try {
// //             const token = localStorage.getItem("token");

// //             // User logged out
// //             if (!token) {
// //                 const localCart =
// //                     JSON.parse(localStorage.getItem("cart")) || [];

// //                 const totalCount = localCart.reduce(
// //                     (total, item) => total + item.quantity,
// //                     0
// //                 );

// //                 setCartCount(totalCount);
// //                 return;
// //             }

// //             // User logged in
// //             const res = await axios.get(
// //                 "http://localhost:5000/api/cart",
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 }
// //             );

// //             const totalCount = res.data.items.reduce(
// //                 (total, item) => total + item.quantity,
// //                 0
// //             );

// //             setCartCount(totalCount);

// //         } catch (error) {
// //             setCartCount(0);
// //         }
// //     };

// //     updateCartCount();

// //     window.addEventListener("cartUpdated", updateCartCount);

// //     return () => {
// //         window.removeEventListener("cartUpdated", updateCartCount);
// //     };
// // }, []);
    

// //     const userToken = localStorage.getItem("token");
// //     return (
// //         <nav className="sticky top-0 z-50 bg-white shadow-sm">
// //             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// //                 <Link to="/" className="text-4xl font-bold text-blue-600">ShopEase</Link>

// //                 <div className="flex items-center gap-6 border-bottom-1px">
// //                     <Link to="/">Home</Link>

// //                     {/* {userToken && (
// //                         <Link to="/cart" >🛒 Cart ({cartCount})</Link>
// //                     )} */}

// //                     <Link to="/cart" >🛒 Cart ({cartCount})</Link>
                    
// //                     {!userToken && (
// //                         <Link to="/login">Login</Link>
// //                     )}
                    
// //                     {!userToken && (
// //                         <Link to="/register">Register</Link>
// //                     )}

// //                     {/* {userToken && (
// //                         <Link to="/profile">
// //                             Profile
// //                         </Link>
// //                     )}

// //                     {userToken && (
// //                         <button onClick={() => {
// //                             localStorage.removeItem("token");

// //                             window.location.href = "/login";
// //                         }}
// //                         className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
// //                     )} */}

// //                     {/* {userToken && (
// //     <div className="relative">
// //         <button
// //             onClick={() => setProfileOpen(!profileOpen)}
// //             className="flex items-center gap-2 font-medium hover:text-blue-600 transition"
// //         >
// //             👤 Profile
// //             <span className="text-sm">
// //                 {profileOpen ? "▲" : "▼"}
// //             </span>
// //         </button>

// //         {profileOpen && (
// //             <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">

// //                 <Link
// //                     to="/profile"
// //                     onClick={() => setProfileOpen(false)}
// //                     className="block px-4 py-2 hover:bg-gray-100"
// //                 >
// //                     👤 My Profile
// //                 </Link>

// //                 <Link
// //                     to="/my-orders"
// //                     onClick={() => setProfileOpen(false)}
// //                     className="block px-4 py-2 hover:bg-gray-100"
// //                 >
// //                     📦 My Orders
// //                 </Link>

// //                 <button
// //                     onClick={() => {
// //                         localStorage.removeItem("token");
// //                         setProfileOpen(false);
// //                         navigate("/login");
// //                     }}
// //                     className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
// //                 >
// //                     🚪 Logout
// //                 </button>

// //             </div>
// //         )}
// //     </div>
// // )} */}

// // {userToken && (
// //     <div className="relative">

// //         <button
// //             onClick={() => setProfileOpen(!profileOpen)}
// //             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
// //         >
// //             <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
// //                 👤
// //             </div>

// //             <div className="hidden md:block text-left">
// //                 <p className="text-sm font-semibold text-gray-800">
// //                     My Account
// //                 </p>
// //                 <p className="text-xs text-gray-500">
// //                     Account & Orders
// //                 </p>
// //             </div>

// //             <span className="text-gray-500 text-xs">
// //                 {profileOpen ? "▲" : "▼"}
// //             </span>
// //         </button>

// //         {profileOpen && (
// //             <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

// //                 {/* Header */}
// //                 <div className="px-5 py-4 bg-gray-50 border-b">
// //                     <p className="font-semibold text-gray-800">
// //                         My Account
// //                     </p>

// //                     <p className="text-xs text-gray-500 mt-1">
// //                         Manage your ShopEase account
// //                     </p>
// //                 </div>

// //                 {/* Menu */}
// //                 <div className="p-2">

// //                     <Link
// //                         to="/profile"
// //                         onClick={() => setProfileOpen(false)}
// //                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
// //                     >
// //                         <span className="text-lg">👤</span>

// //                         <div>
// //                             <p className="text-sm font-medium text-gray-800">
// //                                 My Profile
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                                 Account information
// //                             </p>
// //                         </div>
// //                     </Link>

// //                     <Link
// //                         to="/orders"
// //                         onClick={() => setProfileOpen(false)}
// //                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
// //                     >
// //                         <span className="text-lg">📦</span>

// //                         <div>
// //                             <p className="text-sm font-medium text-gray-800">
// //                                 My Orders
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                                 Track your orders
// //                             </p>
// //                         </div>
// //                     </Link>

// //                     <Link
// //                         to="/wallet"
// //                         onClick={() => setProfileOpen(false)}
// //                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
// //                     >
// //                         <span className="text-lg">💰</span>

// //                         <div>
// //                             <p className="text-sm font-medium text-gray-800">
// //                                 Wallet
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                                 Manage your wallet
// //                             </p>
// //                         </div>
// //                     </Link>

// //                     <Link
// //                         to="/change-password"
// //                         onClick={() => setProfileOpen(false)}
// //                         className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition"
// //                     >
// //                         <span className="text-lg">🔐</span>

// //                         <div>
// //                             <p className="text-sm font-medium text-gray-800">
// //                                 Change Password
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                                 Update your password
// //                             </p>
// //                         </div>
// //                     </Link>

// //                 </div>

// //                 {/* Logout */}
// //                 <div className="border-t p-2">

// //                     <button
// //                         onClick={() => {
// //                             localStorage.removeItem("token");
// //                             setProfileOpen(false);
// //                             navigate("/login");
// //                         }}
// //                         className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
// //                     >
// //                         <span className="text-lg">🚪</span>

// //                         <div className="text-left">
// //                             <p className="text-sm font-medium">
// //                                 Logout
// //                             </p>
// //                             <p className="text-xs text-red-400">
// //                                 Sign out of your account
// //                             </p>
// //                         </div>
// //                     </button>

// //                 </div>

// //             </div>
// //         )}
// //     </div>
// // )}
                    
// //                 </div>
// //             </div>
// //         </nav>
// //     )
// // }

// // export default Navbar;












// // // import { Link, useNavigate } from "react-router-dom";

// // // function Navbar() {
// // //     const navigate = useNavigate();

// // //     const token = localStorage.getItem("token");

// // //     const handleLogout = () => {
// // //         localStorage.removeItem("token");
// // //         navigate("/login");
// // //     };

// // //     return(
// // //         <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center mb-2">
// // //             <Link to="/" className="text-2xl font-bold text-black">ShopEase</Link>
// // //             <div className="flex gap-4 items-center">
// // //                 <Link to="/" className="hover:text-gray-400 transition">Home</Link>

// // //                 {token ? (
// // //                     <>
// // //                         <Link to="/profile">Profile</Link>

// // //                         <button onClick={handleLogout} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">Logout</button>

// // //                     </>
// // //                 ) : (
// // //                     <>
// // //                         <Link to="/login" className="hover:text-gray-400 transition">Login</Link>
// // //                         <Link to="/register" className="hover:text-gray-400 transition">Register</Link>
// // //                     </>
// // //                 ) }
// // //             </div>
// // //         </nav>
// // //     )

// // // }

// // // export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function Navbar() {

//     const navigate = useNavigate();

//     const [cartCount, setCartCount] = useState(0);
//     const [isProfileOpen, setIsProfileOpen] = useState(false);

//     const [categories, setCategories] = useState([]);

//     const userToken = localStorage.getItem("token");

//     const [user, setUser] = useState(null);


//     // =========================
//     // GET USER PROFILE
//     // =========================

//     useEffect(() => {

//         const getUser = async () => {

//             if (!userToken) {
//                 setUser(null);
//                 return;
//             }

//             try {

//                 const res = await axios.get(
//                     "http://localhost:5000/api/user/profile",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${userToken}`,
//                         },
//                     }
//                 );

//                 setUser(res.data);

//             } catch (error) {

//                 console.log(error);

//             }

//         };

//         getUser();

//     }, [userToken]);


//     // =========================
//     // CART COUNT
//     // =========================

//     useEffect(() => {

//         const updateCartCount = async () => {

//             try {

//                 const token = localStorage.getItem("token");

//                 // Logged out
//                 if (!token) {

//                     const localCart =
//                         JSON.parse(localStorage.getItem("cart")) || [];

//                     const totalCount = localCart.reduce(
//                         (total, item) =>
//                             total + item.quantity,
//                         0
//                     );

//                     setCartCount(totalCount);

//                     return;
//                 }


//                 // Logged in
//                 const res = await axios.get(
//                     "http://localhost:5000/api/cart",
//                     {
//                         headers: {
//                             Authorization:
//                                 `Bearer ${token}`,
//                         },
//                     }
//                 );


//                 const totalCount =
//                     res.data?.items?.reduce(
//                         (total, item) =>
//                             total + item.quantity,
//                         0
//                     ) || 0;


//                 setCartCount(totalCount);

//             } catch (error) {

//                 setCartCount(0);

//             }

//         };


//         updateCartCount();

//         window.addEventListener(
//             "cartUpdated",
//             updateCartCount
//         );


//         return () => {

//             window.removeEventListener(
//                 "cartUpdated",
//                 updateCartCount
//             );

//         };

//     }, []);


//     // =========================
//     // LOGOUT
//     // =========================

//     const handleLogout = () => {

//         localStorage.removeItem("token");

//         setIsProfileOpen(false);

//         navigate("/login");

//     };


//     return (

//         <nav className="sticky top-0 z-50 bg-white shadow-sm">

//             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


//                 {/* LOGO */}

//                 <Link
//                     to="/"
//                     className="text-4xl font-bold text-blue-600"
//                 >
//                     ShopEase
//                 </Link>


//                 {/* NAVIGATION */}

//                 <div className="flex items-center gap-7">

//                     {/* HOME */}

//                     <Link
//                         to="/"
//                         className="text-gray-700 hover:text-blue-600 transition"
//                     >
//                         Home
//                     </Link>


//                     {/* CART */}

//                     <Link
//                         to="/cart"
//                         className="text-gray-700 hover:text-blue-600 transition"
//                     >
//                         🛒 Cart ({cartCount})
//                     </Link>


//                     {!userToken ? (

//                         <>
//                             {/* LOGIN */}

//                             <Link
//                                 to="/login"
//                                 className="text-gray-700 hover:text-blue-600 transition"
//                             >
//                                 Login
//                             </Link>


//                             {/* REGISTER */}

//                             <Link
//                                 to="/register"
//                                 className="text-gray-700 hover:text-blue-600 transition"
//                             >
//                                 Register
//                             </Link>
//                         </>

//                     ) : (

//                         /* =========================
//                            MY ACCOUNT
//                            ========================= */

//                         <div className="relative">

//                             {/* PROFILE BUTTON */}

//                             <button
//                                 onClick={() =>
//                                     setIsProfileOpen(
//                                         !isProfileOpen
//                                     )
//                                 }
//                                 className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition"
//                             >

//                                 {/* Avatar */}

//                                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
//                                     {user?.name
//                                         ?.charAt(0)
//                                         ?.toUpperCase() || "U"}
//                                 </div>


//                                 {/* User Name */}

//                                 <div className="text-left hidden md:block">

//                                     <p className="text-sm font-semibold text-gray-800">
//                                         {user?.name || "My Account"}
//                                     </p>

//                                     <p className="text-xs text-gray-500">
//                                         Account & Orders
//                                     </p>

//                                 </div>


//                                 {/* Arrow */}

//                                 <span
//                                     className={`text-gray-400 transition ${
//                                         isProfileOpen
//                                             ? "rotate-180"
//                                             : ""
//                                     }`}
//                                 >
//                                     ▼
//                                 </span>

//                             </button>


//                             {/* =========================
//                                DROPDOWN
//                                ========================= */}

//                             {isProfileOpen && (

//                                 <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">


//                                     {/* DROPDOWN HEADER */}

//                                     <div className="px-5 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

//                                         <div className="flex items-center gap-3">

//                                             <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl">
//                                                 {user?.name
//                                                     ?.charAt(0)
//                                                     ?.toUpperCase() || "U"}
//                                             </div>

//                                             <div>

//                                                 <p className="font-bold text-lg">
//                                                     {user?.name}
//                                                 </p>

//                                                 <p className="text-blue-100 text-xs">
//                                                     {user?.email}
//                                                 </p>

//                                             </div>

//                                         </div>

//                                     </div>


//                                     {/* MENU */}

//                                     <div className="p-3">


//                                         {/* MY PROFILE */}

//                                         <button
//                                             onClick={() => {
//                                                 navigate("/profile");
//                                                 setIsProfileOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-blue-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                                                 👤
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800">
//                                                     My Profile
//                                                 </p>

//                                                 <p className="text-xs text-gray-500">
//                                                     Account information
//                                                 </p>

//                                             </div>

//                                         </button>


//                                         {/* MY ORDERS */}

//                                         <button
//                                             onClick={() => {
//                                                 navigate("/orders");
//                                                 setIsProfileOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-orange-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
//                                                 📦
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800">
//                                                     My Orders
//                                                 </p>

//                                                 <p className="text-xs text-gray-500">
//                                                     Track your orders
//                                                 </p>

//                                             </div>

//                                         </button>


//                                         {/* ADD ADDRESS */}

//                                         <button
//                                             onClick={() => {
//                                                 navigate("/add-address");
//                                                 setIsProfileOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-purple-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
//                                                 📍
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800">
//                                                     Addresses
//                                                 </p>

//                                                 <p className="text-xs text-gray-500">
//                                                     Manage delivery addresses
//                                                 </p>

//                                             </div>

//                                         </button>


//                                         {/* WALLET */}

//                                         <button
//                                             onClick={() => {
//                                                 navigate("/wallet");
//                                                 setIsProfileOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-green-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
//                                                 👛
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800">
//                                                     Wallet
//                                                 </p>

//                                                 <p className="text-xs text-gray-500">
//                                                     Manage your wallet
//                                                 </p>

//                                             </div>

//                                         </button>


//                                         {/* CHANGE PASSWORD */}

//                                         <button
//                                             onClick={() => {
//                                                 navigate("/change-password");
//                                                 setIsProfileOpen(false);
//                                             }}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-yellow-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
//                                                 🔒
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-gray-800">
//                                                     Change Password
//                                                 </p>

//                                                 <p className="text-xs text-gray-500">
//                                                     Update your password
//                                                 </p>

//                                             </div>

//                                         </button>

//                                     </div>


//                                     {/* LOGOUT */}

//                                     <div className="border-t border-gray-100 p-3">

//                                         <button
//                                             onClick={handleLogout}
//                                             className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 transition text-left"
//                                         >

//                                             <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
//                                                 🚪
//                                             </div>

//                                             <div>

//                                                 <p className="font-semibold text-red-600">
//                                                     Logout
//                                                 </p>

//                                                 <p className="text-xs text-red-400">
//                                                     Sign out of your account
//                                                 </p>

//                                             </div>

//                                         </button>

//                                     </div>

//                                 </div>

//                             )}

//                         </div>

//                     )}

//                 </div>

//             </div>

//         </nav>

//     );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Cart count
    useEffect(() => {
        const updateCartCount = async () => {
            try {
                const token = localStorage.getItem("token");

                // Logged out
                if (!token) {
                    const localCart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                    const totalCount = localCart.reduce(
                        (total, item) => total + item.quantity,
                        0
                    );

                    setCartCount(totalCount);
                    return;
                }

                // Logged in
                const res = await axios.get(
                    "http://localhost:5000/api/cart",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const totalCount = (res.data?.items || []).reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                setCartCount(totalCount);

            } catch (error) {
                setCartCount(0);
            }
        };

        updateCartCount();

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        return () => {
            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );
        };
    }, []);

    // Get user profile
    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setUser(null);
                    return;
                }

                const res = await axios.get(
                    "http://localhost:5000/api/user/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(res.data);

            } catch (error) {
                console.log(error);
                setUser(null);
            }
        };

        getUser();

        window.addEventListener("loginUpdated", getUser);

        return () => {
            window.removeEventListener(
                "loginUpdated",
                getUser
            );
        };
    }, []);

    const userToken = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");

        setUser(null);
        setProfileOpen(false);

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    ShopEase
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl text-gray-700"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-7">

                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/product"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Products
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        🛒 Cart
                        <span className="ml-1 text-blue-600 font-semibold">
                            ({cartCount})
                        </span>
                    </Link>

                    {/* Logged out */}
                    {!userToken && (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {/* Profile */}
                    {userToken && (
                        <div className="relative">

                            {/* Profile button */}
                            <button
                                onClick={() =>
                                    setProfileOpen(!profileOpen)
                                }
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >

                                {/* Avatar */}
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    {user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {user?.name || "User"}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Account
                                    </p>
                                </div>

                                <span
                                    className={`text-gray-500 transition-transform ${
                                        profileOpen
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                >
                                    ▼
                                </span>
                            </button>

                            {/* Dropdown */}
                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">

                                    {/* User header */}
                                    <div className="px-5 py-4 border-b bg-gray-50">

                                        <p className="font-semibold text-gray-800">
                                            {user?.name}
                                        </p>

                                        <p className="text-sm text-gray-500 truncate">
                                            {user?.email}
                                        </p>

                                    </div>

                                    {/* Account */}
                                    <div className="px-5 pt-4 pb-2">

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Account
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                                    >
                                        <span className="text-lg">
                                            👤
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                My Profile
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                View your account
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/add-address");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                                    >
                                        <span className="text-lg">
                                            📍
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Addresses
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Manage delivery addresses
                                            </p>
                                        </div>
                                    </button>

                                    {/* Shopping */}
                                    <div className="px-5 pt-3 pb-2">

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Shopping
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/my-orders");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                                    >
                                        <span className="text-lg">
                                            📦
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                My Orders
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Track your orders
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/wallet");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                                    >
                                        <span className="text-lg">
                                            👛
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Wallet
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Manage your wallet
                                            </p>
                                        </div>
                                    </button>

                                    {/* Security */}
                                    <div className="px-5 pt-3 pb-2">

                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Security
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/change-password");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                                    >
                                        <span className="text-lg">
                                            🔒
                                        </span>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                Change Password
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Update your password
                                            </p>
                                        </div>
                                    </button>

                                    {/* Logout */}
                                    <div className="border-t mt-2">

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-5 py-4 text-left text-red-600 hover:bg-red-50 transition"
                                        >
                                            <span className="text-lg">
                                                ↪
                                            </span>

                                            <span className="font-medium">
                                                Logout
                                            </span>
                                        </button>

                                    </div>

                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>


            

{menuOpen && (
  <div className="md:hidden absolute left-0 right-0 top-full z-50 px-4 pt-3 pb-4">
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <p className="text-lg font-bold text-gray-800">
          Welcome to ShopEase
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Find something you love ✨
        </p>
      </div>

      <div className="space-y-1 p-3">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <span>🏠</span> Home
        </Link>

        <Link
          to="/product"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <span>🛍️</span> Products
        </Link>

        <Link
          to="/cart"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-between rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <span className="flex items-center gap-3">
            <span>🛒</span> My Cart
          </span>
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
            {cartCount}
          </span>
        </Link>

        {!userToken && (
          <>
            <div className="my-2 border-t border-gray-100" />

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-center font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Create Account
            </Link>
          </>
        )}

        {userToken && (
          <>
            <div className="my-2 border-t border-gray-100" />

            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <span>👤</span> My Profile
            </Link>

            <Link
              to="/my-orders"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <span>📦</span> My Orders
            </Link>

            
            <Link
            to="/wallet"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
            <span>👛</span> My Wallet
            </Link>


            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
            >
              <span>↪️</span> Logout
            </button>
          </>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3 text-center text-xs text-gray-400">
        ShopEase · Happy Shopping
      </div>
    </div>
  </div>
)}


        </nav>
    );
}

export default Navbar;