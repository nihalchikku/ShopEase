// // // import axios from "axios";
// // // import { useEffect } from "react";
// // // import { useState } from "react";
// // // import { Link } from "react-router-dom";
// // // function AdminDashboard() {

// // //     const [Categories, setCategories] = useState([]);

// // //     const [products, setProducts] = useState([]);

// // //     const getCategories = async () => {
// // //         const res = await axios.get("http://localhost:5000/api/category");
// // //         setCategories(res.data);
// // //     };

// // //     const getProducts = async () => {
// // //         const res = await axios.get("http://localhost:5000/api/product");
// // //         setProducts(res.data);
// // //     };


// // //     useEffect(() => {
// // //         getCategories();
// // //         getProducts();
// // //     }, []);

// // //     return (
        

// // //         <div className="max-w-7xl mx-auto p-6">
// // //             <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>

// // //             <p className="text-gray-500 mb-8">Welcome back, Admin 👋</p>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">
// // //                     <h2 className="text-lg font-semibold">Total Categories</h2>
// // //                     <p className="text-4xl font-bold mt-3">{Categories.length}</p>
// // //                 </div>

// // //                 <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">
// // //                     <h2 className="text-lg font-semibold">Total Products</h2>
// // //                     <p className="text-4xl font-bold mt-3">{products.length}</p>
// // //                 </div>
// // //             </div>
// // //         </div>

// // //     )
// // // }

// // // export default AdminDashboard;

// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// // function AdminDashboard() {

// //     const [categories, setCategories] = useState([]);
// //     const [products, setProducts] = useState([]);

// //     const getCategories = async () => {
// //         try {
// //             const res = await axios.get(
// //                 "http://localhost:5000/api/category"
// //             );

// //             setCategories(res.data);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     const getProducts = async () => {
// //         try {
// //             const res = await axios.get(
// //                 "http://localhost:5000/api/product"
// //             );

// //             setProducts(res.data);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     useEffect(() => {
// //         getCategories();
// //         getProducts();
// //     }, []);


// //     // Stock calculations
// //     const lowStockProducts = products.filter(
// //         (product) => product.stock > 0 && product.stock <= 5
// //     );

// //     const outOfStockProducts = products.filter(
// //         (product) => product.stock === 0
// //     );


// //     return (

// //         <div className="min-h-screen bg-gray-100">

// //             <div className="max-w-7xl mx-auto px-6 py-8">

// //                 {/* Header */}
// //                 <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

// //                     <div>
// //                         <h1 className="text-3xl font-bold text-gray-900">
// //                             Admin Dashboard
// //                         </h1>

// //                         <p className="text-gray-500 mt-1">
// //                             Welcome back, Admin 👋
// //                         </p>
// //                     </div>

// //                     <div className="mt-4 md:mt-0">

// //                         <Link
// //                             to="/admin/products/add"
// //                             className="inline-flex items-center bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
// //                         >
// //                             + Add Product
// //                         </Link>

// //                     </div>

// //                 </div>


// //                 {/* Overview Cards */}

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

// //                     {/* Categories */}

// //                     <div className="bg-white rounded-2xl p-6 shadow-sm border">

// //                         <div className="flex items-center justify-between">

// //                             <div>

// //                                 <p className="text-gray-500 text-sm">
// //                                     Total Categories
// //                                 </p>

// //                                 <h2 className="text-3xl font-bold mt-2">
// //                                     {categories.length}
// //                                 </h2>

// //                             </div>

// //                             <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
// //                                 📂
// //                             </div>

// //                         </div>

// //                         <Link
// //                             to="/admin/categories"
// //                             className="text-blue-600 text-sm mt-4 inline-block hover:underline"
// //                         >
// //                             Manage Categories →
// //                         </Link>

// //                     </div>


// //                     {/* Products */}

// //                     <div className="bg-white rounded-2xl p-6 shadow-sm border">

// //                         <div className="flex items-center justify-between">

// //                             <div>

// //                                 <p className="text-gray-500 text-sm">
// //                                     Total Products
// //                                 </p>

// //                                 <h2 className="text-3xl font-bold mt-2">
// //                                     {products.length}
// //                                 </h2>

// //                             </div>

// //                             <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
// //                                 📦
// //                             </div>

// //                         </div>

// //                         <Link
// //                             to="/admin/products"
// //                             className="text-green-600 text-sm mt-4 inline-block hover:underline"
// //                         >
// //                             Manage Products →
// //                         </Link>

// //                     </div>


// //                     {/* Low Stock */}

// //                     <div className="bg-white rounded-2xl p-6 shadow-sm border">

// //                         <div className="flex items-center justify-between">

// //                             <div>

// //                                 <p className="text-gray-500 text-sm">
// //                                     Low Stock
// //                                 </p>

// //                                 <h2 className="text-3xl font-bold mt-2">
// //                                     {lowStockProducts.length}
// //                                 </h2>

// //                             </div>

// //                             <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
// //                                 ⚠️
// //                             </div>

// //                         </div>

// //                         <p className="text-yellow-600 text-sm mt-4">
// //                             Products need attention
// //                         </p>

// //                     </div>


// //                     {/* Out of Stock */}

// //                     <div className="bg-white rounded-2xl p-6 shadow-sm border">

// //                         <div className="flex items-center justify-between">

// //                             <div>

// //                                 <p className="text-gray-500 text-sm">
// //                                     Out of Stock
// //                                 </p>

// //                                 <h2 className="text-3xl font-bold mt-2">
// //                                     {outOfStockProducts.length}
// //                                 </h2>

// //                             </div>

// //                             <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
// //                                 🚫
// //                             </div>

// //                         </div>

// //                         <p className="text-red-600 text-sm mt-4">
// //                             Currently unavailable
// //                         </p>

// //                     </div>

// //                 </div>


// //                 {/* Quick Actions */}

// //                 <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">

// //                     <div className="flex items-center justify-between mb-5">

// //                         <div>

// //                             <h2 className="text-xl font-bold">
// //                                 Quick Actions
// //                             </h2>

// //                             <p className="text-gray-500 text-sm mt-1">
// //                                 Manage your store quickly
// //                             </p>

// //                         </div>

// //                     </div>


// //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// //                         <Link
// //                             to="/admin/products"
// //                             className="border rounded-xl p-5 hover:shadow-md hover:border-blue-400 transition"
// //                         >

// //                             <div className="text-2xl mb-3">
// //                                 📦
// //                             </div>

// //                             <h3 className="font-semibold">
// //                                 Products
// //                             </h3>

// //                             <p className="text-sm text-gray-500 mt-1">
// //                                 Add and manage products
// //                             </p>

// //                         </Link>


// //                         <Link
// //                             to="/admin/categories"
// //                             className="border rounded-xl p-5 hover:shadow-md hover:border-purple-400 transition"
// //                         >

// //                             <div className="text-2xl mb-3">
// //                                 📂
// //                             </div>

// //                             <h3 className="font-semibold">
// //                                 Categories
// //                             </h3>

// //                             <p className="text-sm text-gray-500 mt-1">
// //                                 Manage product categories
// //                             </p>

// //                         </Link>


// //                         <Link
// //                             to="/admin/coupons"
// //                             className="border rounded-xl p-5 hover:shadow-md hover:border-green-400 transition"
// //                         >

// //                             <div className="text-2xl mb-3">
// //                                 🎟️
// //                             </div>

// //                             <h3 className="font-semibold">
// //                                 Coupons
// //                             </h3>

// //                             <p className="text-sm text-gray-500 mt-1">
// //                                 Manage discount coupons
// //                             </p>

// //                         </Link>


// //                         <Link
// //                             to="/admin/products/add"
// //                             className="border rounded-xl p-5 hover:shadow-md hover:border-orange-400 transition"
// //                         >

// //                             <div className="text-2xl mb-3">
// //                                 ➕
// //                             </div>

// //                             <h3 className="font-semibold">
// //                                 Add Product
// //                             </h3>

// //                             <p className="text-sm text-gray-500 mt-1">
// //                                 Add a new product
// //                             </p>

// //                         </Link>

// //                     </div>

// //                 </div>


// //                 {/* Products Section */}

// //                 <div className="bg-white rounded-2xl shadow-sm border p-6">

// //                     <div className="flex items-center justify-between mb-5">

// //                         <div>

// //                             <h2 className="text-xl font-bold">
// //                                 Products Overview
// //                             </h2>

// //                             <p className="text-gray-500 text-sm mt-1">
// //                                 Recently added products
// //                             </p>

// //                         </div>

// //                         <Link
// //                             to="/admin/products"
// //                             className="text-blue-600 text-sm hover:underline"
// //                         >
// //                             View All →
// //                         </Link>

// //                     </div>


// //                     {products.length === 0 ? (

// //                         <div className="text-center py-10 text-gray-500">
// //                             No products available
// //                         </div>

// //                     ) : (

// //                         <div className="overflow-x-auto">

// //                             <table className="w-full">

// //                                 <thead>

// //                                     <tr className="border-b text-left">

// //                                         <th className="pb-3 text-sm text-gray-500">
// //                                             Product
// //                                         </th>

// //                                         <th className="pb-3 text-sm text-gray-500">
// //                                             Price
// //                                         </th>

// //                                         <th className="pb-3 text-sm text-gray-500">
// //                                             Stock
// //                                         </th>

// //                                         <th className="pb-3 text-sm text-gray-500">
// //                                             Status
// //                                         </th>

// //                                     </tr>

// //                                 </thead>


// //                                 <tbody>

// //                                     {products.slice(0, 5).map((product) => (

// //                                         <tr
// //                                             key={product._id}
// //                                             className="border-b last:border-0"
// //                                         >

// //                                             <td className="py-4">

// //                                                 <div className="flex items-center gap-3">

// //                                                     <img
// //                                                         src={`http://localhost:5000/uploads/${product.image}`}
// //                                                         alt={product.name}
// //                                                         className="w-12 h-12 rounded-lg object-cover border"
// //                                                     />

// //                                                     <div>

// //                                                         <p className="font-semibold">
// //                                                             {product.name}
// //                                                         </p>

// //                                                         <p className="text-xs text-gray-500">
// //                                                             Product
// //                                                         </p>

// //                                                     </div>

// //                                                 </div>

// //                                             </td>


// //                                             <td className="py-4 font-medium">
// //                                                 ₹{product.price}
// //                                             </td>


// //                                             <td className="py-4">
// //                                                 {product.stock}
// //                                             </td>


// //                                             <td className="py-4">

// //                                                 {product.stock === 0 ? (

// //                                                     <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
// //                                                         Out of Stock
// //                                                     </span>

// //                                                 ) : product.stock <= 5 ? (

// //                                                     <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
// //                                                         Low Stock
// //                                                     </span>

// //                                                 ) : (

// //                                                     <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
// //                                                         In Stock
// //                                                     </span>

// //                                                 )}

// //                                             </td>

// //                                         </tr>

// //                                     ))}

// //                                 </tbody>

// //                             </table>

// //                         </div>

// //                     )}

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default AdminDashboard;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     FaBox,
//     FaTags,
//     FaPlus,
//     FaArrowRight,
//     FaExclamationTriangle,
//     FaChartLine,
//     FaStore,
//     FaLayerGroup
// } from "react-icons/fa";

// function AdminDashboard() {

//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const getCategories = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/category"
//             );

//             setCategories(res.data);
//         } catch (error) {
//             console.log("Category error:", error);
//         }
//     };

//     const getProducts = async () => {
//         try {
//             const res = await axios.get(
//                 "http://localhost:5000/api/product"
//             );

//             setProducts(res.data);
//         } catch (error) {
//             console.log("Product error:", error);
//         }
//     };

//     useEffect(() => {

//         const loadDashboard = async () => {

//             setLoading(true);

//             await Promise.all([
//                 getCategories(),
//                 getProducts()
//             ]);

//             setLoading(false);
//         };

//         loadDashboard();

//     }, []);


//     // Low stock products
//     const lowStockProducts = products.filter(
//         (product) =>
//             Number(product.stock) > 0 &&
//             Number(product.stock) <= 5
//     );


//     // Out of stock products
//     const outOfStockProducts = products.filter(
//         (product) =>
//             Number(product.stock) === 0
//     );


//     return (

//         <div className="min-h-screen bg-slate-100">

//             {/* Dashboard Header */}

//             <div className="bg-white border-b">

//                 <div className="max-w-7xl mx-auto px-6 py-8">

//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//                         <div>

//                             <div className="flex items-center gap-3">

//                                 <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
//                                     <FaStore className="text-xl" />
//                                 </div>

//                                 <div>

//                                     <h1 className="text-3xl font-bold text-gray-900">
//                                         Admin Dashboard
//                                     </h1>

//                                     <p className="text-gray-500 mt-1">
//                                         Manage your ShopEase store
//                                     </p>

//                                 </div>

//                             </div>

//                         </div>


//                         {/* Quick Actions */}

//                         <div className="flex gap-3">

//                             <Link
//                                 to="/admin/categories"
//                                 className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
//                             >
//                                 <FaTags />
//                                 Categories
//                             </Link>

//                             <Link
//                                 to="/admin/products"
//                                 className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow"
//                             >
//                                 <FaPlus />
//                                 Add Product
//                             </Link>

//                         </div>

//                     </div>

//                 </div>

//             </div>


//             {/* Main Content */}

//             <div className="max-w-7xl mx-auto px-6 py-8">


//                 {/* Welcome */}

//                 <div className="mb-7">

//                     <h2 className="text-2xl font-bold text-gray-900">
//                         Store Overview
//                     </h2>

//                     <p className="text-gray-500 mt-1">
//                         Here's what's happening with your store today.
//                     </p>

//                 </div>


//                 {/* Stats Cards */}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


//                     {/* Categories */}

//                     <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">

//                         <div className="flex items-center justify-between">

//                             <div>

//                                 <p className="text-gray-500 text-sm font-medium">
//                                     Total Categories
//                                 </p>

//                                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                                     {loading ? "..." : categories.length}
//                                 </p>

//                             </div>

//                             <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//                                 <FaTags className="text-xl" />
//                             </div>

//                         </div>

//                         <Link
//                             to="/admin/categories"
//                             className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-5 hover:gap-3 transition-all"
//                         >
//                             Manage Categories
//                             <FaArrowRight />
//                         </Link>

//                     </div>


//                     {/* Products */}

//                     <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">

//                         <div className="flex items-center justify-between">

//                             <div>

//                                 <p className="text-gray-500 text-sm font-medium">
//                                     Total Products
//                                 </p>

//                                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                                     {loading ? "..." : products.length}
//                                 </p>

//                             </div>

//                             <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
//                                 <FaBox className="text-xl" />
//                             </div>

//                         </div>

//                         <Link
//                             to="/admin/products"
//                             className="flex items-center gap-2 text-green-600 text-sm font-medium mt-5 hover:gap-3 transition-all"
//                         >
//                             Manage Products
//                             <FaArrowRight />
//                         </Link>

//                     </div>


//                     {/* Low Stock */}

//                     <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">

//                         <div className="flex items-center justify-between">

//                             <div>

//                                 <p className="text-gray-500 text-sm font-medium">
//                                     Low Stock
//                                 </p>

//                                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                                     {loading ? "..." : lowStockProducts.length}
//                                 </p>

//                             </div>

//                             <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
//                                 <FaExclamationTriangle className="text-xl" />
//                             </div>

//                         </div>

//                         <p className="text-gray-400 text-sm mt-5">
//                             Products need attention
//                         </p>

//                     </div>


//                     {/* Out of Stock */}

//                     <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">

//                         <div className="flex items-center justify-between">

//                             <div>

//                                 <p className="text-gray-500 text-sm font-medium">
//                                     Out of Stock
//                                 </p>

//                                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                                     {loading ? "..." : outOfStockProducts.length}
//                                 </p>

//                             </div>

//                             <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
//                                 <FaBox className="text-xl" />
//                             </div>

//                         </div>

//                         <p className="text-gray-400 text-sm mt-5">
//                             Products unavailable
//                         </p>

//                     </div>

//                 </div>


//                 {/* Main Dashboard Grid */}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


//                     {/* Inventory Overview */}

//                     <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">

//                         <div className="p-6 border-b flex items-center justify-between">

//                             <div>

//                                 <h3 className="text-xl font-bold text-gray-900">
//                                     Inventory Overview
//                                 </h3>

//                                 <p className="text-gray-500 text-sm mt-1">
//                                     Current product stock status
//                                 </p>

//                             </div>

//                             <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
//                                 <FaChartLine />
//                             </div>

//                         </div>


//                         <div className="p-6">

//                             {/* Total */}

//                             <div className="mb-6">

//                                 <div className="flex justify-between mb-2">

//                                     <span className="text-sm font-medium text-gray-600">
//                                         Total Products
//                                     </span>

//                                     <span className="font-bold">
//                                         {products.length}
//                                     </span>

//                                 </div>

//                                 <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

//                                     <div
//                                         className="h-full bg-blue-500 rounded-full"
//                                         style={{
//                                             width: products.length > 0
//                                                 ? "100%"
//                                                 : "0%"
//                                         }}
//                                     />

//                                 </div>

//                             </div>


//                             {/* Low Stock */}

//                             <div className="mb-6">

//                                 <div className="flex justify-between mb-2">

//                                     <span className="text-sm font-medium text-gray-600">
//                                         Low Stock
//                                     </span>

//                                     <span className="font-bold text-orange-600">
//                                         {lowStockProducts.length}
//                                     </span>

//                                 </div>

//                                 <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

//                                     <div
//                                         className="h-full bg-orange-500 rounded-full"
//                                         style={{
//                                             width:
//                                                 products.length > 0
//                                                     ? `${Math.min(
//                                                         (lowStockProducts.length /
//                                                             products.length) *
//                                                             100,
//                                                         100
//                                                     )}%`
//                                                     : "0%"
//                                         }}
//                                     />

//                                 </div>

//                             </div>


//                             {/* Out of stock */}

//                             <div>

//                                 <div className="flex justify-between mb-2">

//                                     <span className="text-sm font-medium text-gray-600">
//                                         Out of Stock
//                                     </span>

//                                     <span className="font-bold text-red-600">
//                                         {outOfStockProducts.length}
//                                     </span>

//                                 </div>

//                                 <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

//                                     <div
//                                         className="h-full bg-red-500 rounded-full"
//                                         style={{
//                                             width:
//                                                 products.length > 0
//                                                     ? `${Math.min(
//                                                         (outOfStockProducts.length /
//                                                             products.length) *
//                                                             100,
//                                                         100
//                                                     )}%`
//                                                     : "0%"
//                                         }}
//                                     />

//                                 </div>

//                             </div>

//                         </div>

//                     </div>


//                     {/* Quick Actions */}

//                     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

//                         <div className="p-6 border-b">

//                             <h3 className="text-xl font-bold text-gray-900">
//                                 Quick Actions
//                             </h3>

//                             <p className="text-gray-500 text-sm mt-1">
//                                 Frequently used actions
//                             </p>

//                         </div>


//                         <div className="p-5 space-y-3">


//                             <Link
//                                 to="/admin/products"
//                                 className="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition group"
//                             >

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
//                                         <FaPlus />
//                                     </div>

//                                     <div>

//                                         <p className="font-semibold text-gray-900">
//                                             Add Product
//                                         </p>

//                                         <p className="text-xs text-gray-500">
//                                             Create a new product
//                                         </p>

//                                     </div>

//                                 </div>

//                                 <FaArrowRight className="text-gray-400 group-hover:translate-x-1 transition" />

//                             </Link>


//                             <Link
//                                 to="/admin/categories"
//                                 className="flex items-center justify-between p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition group"
//                             >

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center">
//                                         <FaLayerGroup />
//                                     </div>

//                                     <div>

//                                         <p className="font-semibold text-gray-900">
//                                             Manage Categories
//                                         </p>

//                                         <p className="text-xs text-gray-500">
//                                             Organize your products
//                                         </p>

//                                     </div>

//                                 </div>

//                                 <FaArrowRight className="text-gray-400 group-hover:translate-x-1 transition" />

//                             </Link>


//                             <Link
//                                 to="/admin/coupons"
//                                 className="flex items-center justify-between p-4 rounded-xl bg-green-50 hover:bg-green-100 transition group"
//                             >

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center">
//                                         %
//                                     </div>

//                                     <div>

//                                         <p className="font-semibold text-gray-900">
//                                             Manage Coupons
//                                         </p>

//                                         <p className="text-xs text-gray-500">
//                                             Create and manage offers
//                                         </p>

//                                     </div>

//                                 </div>

//                                 <FaArrowRight className="text-gray-400 group-hover:translate-x-1 transition" />

//                             </Link>

//                         </div>

//                     </div>

//                 </div>


//                 {/* Low Stock Products */}

//                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6">

//                     <div className="p-6 border-b flex justify-between items-center">

//                         <div>

//                             <h3 className="text-xl font-bold text-gray-900">
//                                 Stock Alerts
//                             </h3>

//                             <p className="text-gray-500 text-sm mt-1">
//                                 Products that may need restocking
//                             </p>

//                         </div>

//                         <FaExclamationTriangle className="text-orange-500 text-xl" />

//                     </div>


//                     <div className="p-6">

//                         {lowStockProducts.length === 0 &&
//                         outOfStockProducts.length === 0 ? (

//                             <div className="text-center py-8">

//                                 <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
//                                     ✓
//                                 </div>

//                                 <p className="font-semibold text-gray-800">
//                                     Everything looks good!
//                                 </p>

//                                 <p className="text-gray-500 text-sm mt-1">
//                                     No stock alerts at the moment.
//                                 </p>

//                             </div>

//                         ) : (

//                             <div className="space-y-3">

//                                 {[...outOfStockProducts, ...lowStockProducts]
//                                     .slice(0, 5)
//                                     .map((product) => (

//                                         <div
//                                             key={product._id}
//                                             className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
//                                         >

//                                             <div className="flex items-center gap-4">

//                                                 <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center">
//                                                     <FaBox className="text-gray-400" />
//                                                 </div>

//                                                 <div>

//                                                     <p className="font-semibold text-gray-900">
//                                                         {product.name}
//                                                     </p>

//                                                     <p className="text-sm text-gray-500">
//                                                         Stock:{" "}
//                                                         <span
//                                                             className={
//                                                                 Number(product.stock) === 0
//                                                                     ? "text-red-600 font-semibold"
//                                                                     : "text-orange-600 font-semibold"
//                                                             }
//                                                         >
//                                                             {product.stock}
//                                                         </span>
//                                                     </p>

//                                                 </div>

//                                             </div>

//                                             <span
//                                                 className={
//                                                     Number(product.stock) === 0
//                                                         ? "px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold"
//                                                         : "px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold"
//                                                 }
//                                             >
//                                                 {Number(product.stock) === 0
//                                                     ? "Out of Stock"
//                                                     : "Low Stock"}
//                                             </span>

//                                         </div>

//                                     ))}

//                             </div>

//                         )}

//                     </div>

//                 </div>


//                 {/* Footer */}

//                 <div className="text-center text-gray-400 text-sm mt-8 pb-4">

//                     ShopEase Admin Panel • Store Management

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default AdminDashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    FaBox,
    FaTags,
    FaPlus,
    FaArrowRight,
    FaExclamationTriangle,
    FaTicketAlt,
    FaRupeeSign,
    FaShoppingCart,
    FaCalendarAlt,
    FaChartLine,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
} from "react-icons/fa";

function AdminDashboard() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);

    const [loading, setLoading] = useState(true);

    const [salesData, setSalesData] = useState({
    totalOrders: 0,
    totalSales: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    todaySales: 0,
    monthSales: 0
});
const chartData = salesData.salesChart || [];

    const getCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/category"
            );

            setCategories(res.data);
        } catch (error) {
            console.log("Category error:", error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/product"
            );

            setProducts(res.data);
        } catch (error) {
            console.log("Product error:", error);
        }
    };

    const getTotalUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(
                "http://localhost:5000/api/user/admin/total-users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTotalUsers(res.data.totalUsers);

        } catch (error) {
            console.log("Total Users Error:", error);
        }
    };

    const getSalesData = async () => {
    try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
            "http://localhost:5000/api/orders/admin/sales",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setSalesData(res.data);

    } catch (error) {
        console.log("Sales Error:", error);
    }
};

    useEffect(() => {

        const loadDashboard = async () => {
            setLoading(true);

            await Promise.all([
                getCategories(),
                getProducts(),
                getSalesData(),
                getTotalUsers()
            ]);

            setLoading(false);
        };

        loadDashboard();

    }, []);


    const lowStockProducts = products.filter(
        (product) =>
            Number(product.stock) > 0 &&
            Number(product.stock) <= 5
    );

    const outOfStockProducts = products.filter(
        (product) =>
            Number(product.stock) === 0
    );


    return (

        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <div className="bg-white border-b border-gray-200 shadow-sm">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-900">
                                Admin Dashboard
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage your ShopEase store
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            

            {/* Main */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Sales Overview */}

<div className="mt-8">

    <div className="flex items-center justify-between mb-5">
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Sales Overview
            </h2>

            <p className="text-gray-500 text-sm mt-1">
                Track your store's revenue and order performance
            </p>
        </div>
    </div>

    


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">

    <div>
        <p className="text-sm text-gray-500 font-medium">
            Total Sales
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            ₹{salesData.totalSales.toLocaleString()}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            All valid orders
        </p>
    </div>

    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        <FaRupeeSign className="text-xl" />
    </div>

</div>
        </div>


        {/* Today's Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">

    <div>
        <p className="text-sm text-gray-500 font-medium">
            Today's Sales
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            ₹{salesData.todaySales.toLocaleString()}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            Sales generated today
        </p>
    </div>

    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
        <FaChartLine className="text-xl" />
    </div>

</div>
        </div>


        {/* Monthly Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">

    <div>
        <p className="text-sm text-gray-500 font-medium">
            This Month
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            ₹{salesData.monthSales.toLocaleString()}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            Current month sales
        </p>
    </div>

    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
        <FaCalendarAlt className="text-xl" />
    </div>

</div>
        </div>


        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">

    <Link to="/admin/orders">
        <p className="text-sm text-gray-500 font-medium">
            Total Orders
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            {salesData.totalOrders}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            Orders received
        </p>
    </Link>

    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
        <FaShoppingCart className="text-xl" />
    </div>

</div>
        </div>

    </div>
</div>
<br />

{/* Sales Performance Chart */}

<div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">

    <div className="flex items-center justify-between mb-6">

        <div>
            <h2 className="text-xl font-bold text-gray-900">
                Sales Performance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Overview of your store sales
            </p>
        </div>

        <div className="flex items-center gap-3">

    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>

        <span className="text-sm font-medium text-gray-600">
            Last 7 Days
        </span>
    </div>

    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
        <span className="text-lg font-semibold">₹</span>
    </div>

</div>
    </div>


    <div className="w-full h-80">

        <ResponsiveContainer width="100%" height="100%">

            <LineChart
    data={chartData}
    margin={{
        top: 15,
        right: 20,
        left: 10,
        bottom: 5,
    }}
>
    <defs>
        <linearGradient
            id="salesGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
        >
            <stop
                offset="0%"
                stopColor="#2563eb"
                stopOpacity={0.25}
            />

            <stop
                offset="100%"
                stopColor="#2563eb"
                stopOpacity={0}
            />
        </linearGradient>
    </defs>

    <CartesianGrid
        strokeDasharray="4 4"
        vertical={false}
        stroke="#e5e7eb"
    />

    <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={{
            fontSize: 12,
            fill: "#6b7280",
        }}
        dy={10}
    />

    <YAxis
        axisLine={false}
        tickLine={false}
        tick={{
            fontSize: 12,
            fill: "#6b7280",
        }}
        tickFormatter={(value) =>
            value >= 1000
                ? `₹${(value / 1000).toFixed(0)}k`
                : `₹${value}`
        }
    />

    <Tooltip
        cursor={{
            stroke: "#93c5fd",
            strokeWidth: 1,
            strokeDasharray: "4 4",
        }}
        contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
        }}
        labelStyle={{
            color: "#111827",
            fontWeight: 600,
            marginBottom: "4px",
        }}
        formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Sales",
        ]}
    />

    <Line
        type="monotone"
        dataKey="sales"
        stroke="#2563eb"
        strokeWidth={3}
        dot={{
            r: 4,
            fill: "#ffffff",
            stroke: "#2563eb",
            strokeWidth: 2,
        }}
        activeDot={{
            r: 7,
            strokeWidth: 3,
            fill: "#ffffff",
            stroke: "#2563eb",
        }}
    />
</LineChart>
        </ResponsiveContainer>

    </div>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">

    <div>
        <p className="text-sm text-gray-500 font-medium">
            Delivered Orders
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
            {salesData.deliveredOrders}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            Successfully delivered
        </p>
    </div>

    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
        <FaBox className="text-xl" />
    </div>

</div>
    </div>


    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">

    <div>
        <p className="text-sm text-gray-500 font-medium">
            Pending Orders
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mt-2">
            {salesData.pendingOrders}
        </h3>

        <p className="text-xs text-gray-400 mt-2">
            Orders awaiting completion
        </p>
    </div>

    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
        <FaExclamationTriangle className="text-xl" />
    </div>

</div>
    </div>

</div>

<br />




                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">


                    {/* Total Users */}

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Users
                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                                    {loading ? "..." : totalUsers}
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                                <FaTags />
                            </div>

                        </div>

                    </div>


                    {/* Categories */}

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Categories
                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                                    {loading ? "..." : categories.length}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                <FaTags />
                            </div>

                        </div>

                    </div>

                    


                    {/* Products */}

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Products
                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                                    {loading ? "..." : products.length}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                <FaBox />
                            </div>

                        </div>

                    </div>


                    {/* Low Stock */}

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Low Stock
                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                                    {loading ? "..." : lowStockProducts.length}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                <FaExclamationTriangle />
                            </div>

                        </div>

                    </div>


                    {/* Out of Stock */}

                    <div className="bg-white border rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Out of Stock
                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-gray-900">
                                    {loading ? "..." : outOfStockProducts.length}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                                <FaBox />
                            </div>

                        </div>

                    </div>

                </div>


                {/* Quick Actions */}

                <div className="bg-white border rounded-2xl shadow-sm mb-8">

                    <div className="p-6 border-b">

                        <h2 className="text-xl font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Frequently used admin actions
                        </p>

                    </div>


                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


                        {/* Add Category */}

                        <Link
                            to="/admin/add-category"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <FaPlus />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Add Category
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Create a new category
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-blue-600 transition" />

                        </Link>


                        {/* Add Product */}

                        <Link
                            to="/admin/add-product"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                <FaPlus />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Add Product
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Add a new product
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-green-600 transition" />

                        </Link>


                        {/* Add Coupon */}

                        <Link
                            to="/admin/coupons/add"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-purple-500 hover:bg-purple-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                <FaPlus />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Add Coupon
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Add a new coupon
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-purple-600 transition" />

                        </Link>

                        {/* Manage Categories */}

                        <Link
                            to="/admin/categories"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-gray-400 hover:bg-gray-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                                <FaTags />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Manage Categories
                                </h3>

                                <p className="text-sm text-gray-500">
                                    View and edit categories
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-gray-700 transition" />

                        </Link>

                        


                        {/* Manage Products */}

                        <Link
                            to="/admin/products"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-gray-400 hover:bg-gray-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                                <FaBox />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Manage Products
                                </h3>

                                <p className="text-sm text-gray-500">
                                    View and edit products
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-gray-700 transition" />

                        </Link>


                        

                        {/* Manage Coupons */}

                        <Link
                            to="/admin/coupons"
                            className="group flex items-center gap-4 border rounded-xl p-4 hover:border-purple-500 hover:bg-purple-50 transition"
                        >

                            <div className="w-11 h-11 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                                <FaTicketAlt />
                            </div>

                            <div className="flex-1">

                                <h3 className="font-semibold text-gray-900">
                                    Manage Coupons
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Manage discount coupons
                                </p>

                            </div>

                            <FaArrowRight className="text-gray-400 group-hover:text-purple-600 transition" />

                        </Link>

                    </div>

                </div>


                {/* Stock Alerts */}

                <div className="bg-white border rounded-2xl shadow-sm">

                    <div className="p-6 border-b flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Stock Alerts
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Products that need your attention
                            </p>

                        </div>

                        <FaExclamationTriangle className="text-orange-500" />

                    </div>


                    <div className="p-6">

                        {lowStockProducts.length === 0 &&
                        outOfStockProducts.length === 0 ? (

                            <div className="text-center py-8">

                                <div className="text-4xl mb-3">
                                    ✅
                                </div>

                                <p className="font-semibold text-gray-800">
                                    All products are sufficiently stocked
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    No stock alerts right now.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {[...outOfStockProducts, ...lowStockProducts]
                                    .slice(0, 5)
                                    .map((product) => (

                                        <div
                                            key={product._id}
                                            className="flex items-center justify-between border rounded-xl p-4"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <FaBox className="text-gray-500" />
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-gray-900">
                                                        {product.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        Stock:{" "}
                                                        <span className="font-semibold">
                                                            {product.stock}
                                                        </span>
                                                    </p>

                                                </div>

                                            </div>


                                            {Number(product.stock) === 0 ? (

                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
                                                    Out of Stock
                                                </span>

                                            ) : (

                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                                                    Low Stock
                                                </span>

                                            )}

                                        </div>

                                    ))}

                            </div>

                        )}

                    </div>

                </div>


                {/* Footer */}

                <div className="text-center text-sm text-gray-400 py-8">
                    ShopEase Admin Panel
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;