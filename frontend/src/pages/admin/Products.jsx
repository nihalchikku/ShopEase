import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5;


    // =========================
    // GET PRODUCTS
    // =========================

    const getProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/product"
            );

            setProducts(res.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load products");

        }

    };


    // =========================
    // DELETE PRODUCT
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const token = localStorage.getItem("adminToken");


            await axios.delete(

                `http://localhost:5000/api/product/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            toast.success("Product Deleted");


            getProducts();


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }

    };


    // =========================
    // PAGINATION
    // =========================

    const indexOfLastProduct =
        currentPage * productsPerPage;

    const indexOfFirstProduct =
        indexOfLastProduct - productsPerPage;


    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );


    const totalPages =
        Math.ceil(products.length / productsPerPage);


    // =========================
    // LOAD PRODUCTS
    // =========================

    useEffect(() => {

        getProducts();

    }, []);


    // return (

    //     <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">


    //         {/* HEADER */}

    //         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">


    //             <div>

    //                 <h1 className="text-3xl font-bold text-gray-900">
    //                     Products
    //                 </h1>

    //                 <p className="text-gray-500 mt-1">
    //                     Manage all products in your store
    //                 </p>

    //             </div>


    //             <button
    //                 onClick={() => navigate("/admin/add-product")}
    //                 className="mt-4 md:mt-0 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold transition"
    //             >
    //                 + Add Product
    //             </button>


    //         </div>


    //         {/* PRODUCT COUNT */}

    //         <div className="bg-white border shadow-sm rounded-xl px-5 py-4 mb-6">

    //             <div className="flex items-center justify-between">

    //                 <div>

    //                     <p className="text-gray-500 text-sm">
    //                         Total Products
    //                     </p>

    //                     <p className="text-2xl font-bold mt-1">
    //                         {products.length}
    //                     </p>

    //                 </div>

    //                 <div className="text-3xl">
    //                     📦
    //                 </div>

    //             </div>

    //         </div>


    //         {/* TABLE */}

    //         <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">


    //             <div className="overflow-x-auto">

    //                 <table className="w-full text-sm text-left">


    //                     {/* HEADER */}

    //                     <thead className="bg-gray-900 text-white">

    //                         <tr>

    //                             <th className="px-5 py-4">
    //                                 Image
    //                             </th>

    //                             <th className="px-5 py-4">
    //                                 Product
    //                             </th>

    //                             <th className="px-5 py-4">
    //                                 Category
    //                             </th>

    //                             <th className="px-5 py-4">
    //                                 Price
    //                             </th>

    //                             <th className="px-5 py-4">
    //                                 Stock
    //                             </th>

    //                             <th className="px-5 py-4 text-center">
    //                                 Actions
    //                             </th>

    //                         </tr>

    //                     </thead>


    //                     {/* BODY */}

    //                     <tbody>


    //                         {currentProducts.length > 0 ? (

    //                             currentProducts.map((item) => (

    //                                 <tr
    //                                     key={item._id}
    //                                     className="border-b hover:bg-gray-50 transition"
    //                                 >


    //                                     {/* IMAGE */}

    //                                     <td className="px-5 py-4">

    //                                         <img
    //                                             src={`http://localhost:5000/uploads/${item.image}`}
    //                                             alt={item.name}
    //                                             className="w-16 h-16 object-cover rounded-xl border"
    //                                         />

    //                                     </td>


    //                                     {/* NAME */}

    //                                     <td className="px-5 py-4">

    //                                         <div>

    //                                             <p className="font-semibold text-gray-900">
    //                                                 {item.name}
    //                                             </p>

    //                                             <p className="text-gray-500 text-xs mt-1 max-w-xs truncate">
    //                                                 {item.description}
    //                                             </p>

    //                                         </div>

    //                                     </td>


    //                                     {/* CATEGORY */}

    //                                     <td className="px-5 py-4">

    //                                         <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">

    //                                             {item.category?.name || "No Category"}

    //                                         </span>

    //                                     </td>


    //                                     {/* PRICE */}

    //                                     <td className="px-5 py-4 font-semibold">

    //                                         ₹{item.price}

    //                                     </td>


    //                                     {/* STOCK */}

    //                                     <td className="px-5 py-4">

    //                                         <span
    //                                             className={`
    //                                                 px-3 py-1 rounded-full text-xs font-semibold
    //                                                 ${
    //                                                     item.stock > 10
    //                                                         ? "bg-green-100 text-green-700"
    //                                                         : item.stock > 0
    //                                                         ? "bg-yellow-100 text-yellow-700"
    //                                                         : "bg-red-100 text-red-700"
    //                                                 }
    //                                             `}
    //                                         >

    //                                             {item.stock}

    //                                         </span>

    //                                     </td>


    //                                     {/* ACTIONS */}

    //                                     <td className="px-5 py-4">

    //                                         <div className="flex justify-center gap-2 whitespace-nowrap">


    //                                             {/* VIEW */}

    //                                             <button
    //                                                 onClick={() =>
    //                                                     navigate(
    //                                                         `/admin/product/${item._id}`
    //                                                     )
    //                                                 }
    //                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-sm"
    //                                             >
    //                                                 View
    //                                             </button>


    //                                             {/* EDIT */}

    //                                             <button
    //                                                 onClick={() =>
    //                                                     navigate(
    //                                                         `/admin/edit-product/${item._id}`
    //                                                     )
    //                                                 }
    //                                                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition text-sm"
    //                                             >
    //                                                 Edit
    //                                             </button>


    //                                             {/* DELETE */}

    //                                             <button
    //                                                 onClick={() =>
    //                                                     handleDelete(item._id)
    //                                                 }
    //                                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-sm"
    //                                             >
    //                                                 Delete
    //                                             </button>


    //                                         </div>

    //                                     </td>


    //                                 </tr>

    //                             ))

    //                         ) : (

    //                             <tr>

    //                                 <td
    //                                     colSpan="6"
    //                                     className="text-center py-12 text-gray-500"
    //                                 >

    //                                     No products found.

    //                                 </td>

    //                             </tr>

    //                         )}


    //                     </tbody>


    //                 </table>

    //             </div>


    //         </div>


    //         {/* PAGINATION */}

    //         {totalPages > 1 && (

    //             <div className="flex justify-center items-center gap-2 mt-6">


    //                 {/* PREVIOUS */}

    //                 <button
    //                     onClick={() =>
    //                         setCurrentPage(currentPage - 1)
    //                     }
    //                     disabled={currentPage === 1}
    //                     className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
    //                 >
    //                     Previous
    //                 </button>


    //                 {/* PAGE NUMBERS */}

    //                 {[...Array(totalPages)].map(
    //                     (_, index) => (

    //                         <button
    //                             key={index}
    //                             onClick={() =>
    //                                 setCurrentPage(index + 1)
    //                             }
    //                             className={`
    //                                 px-4 py-2 rounded-lg transition
    //                                 ${
    //                                     currentPage === index + 1
    //                                         ? "bg-black text-white"
    //                                         : "bg-gray-200 hover:bg-gray-300"
    //                                 }
    //                             `}
    //                         >

    //                             {index + 1}

    //                         </button>

    //                     )
    //                 )}


    //                 {/* NEXT */}

    //                 <button
    //                     onClick={() =>
    //                         setCurrentPage(currentPage + 1)
    //                     }
    //                     disabled={
    //                         currentPage === totalPages
    //                     }
    //                     className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition"
    //                 >
    //                     Next
    //                 </button>


    //             </div>

    //         )}


    //     </div>

    // );


//     return (
//     <div className="w-full max-w-7xl mx-auto mt-6 md:mt-10 px-3 sm:px-4 lg:px-6 pb-10">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">

//             <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                     Products
//                 </h1>

//                 <p className="text-gray-500 mt-1 text-sm sm:text-base">
//                     Manage all products in your store
//                 </p>
//             </div>

//             <button
//                 onClick={() => navigate("/admin/add-product")}
//                 className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold transition"
//             >
//                 + Add Product
//             </button>

//         </div>


//         {/* PRODUCT COUNT */}
//         <div className="bg-white border shadow-sm rounded-xl px-4 sm:px-5 py-4 mb-6">

//             <div className="flex items-center justify-between">

//                 <div>
//                     <p className="text-gray-500 text-sm">
//                         Total Products
//                     </p>

//                     <p className="text-2xl font-bold mt-1">
//                         {products.length}
//                     </p>
//                 </div>

//                 <div className="text-2xl sm:text-3xl">
//                     📦
//                 </div>

//             </div>

//         </div>


//         {/* TABLE */}
//         <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

//             <div className="overflow-x-auto">

//                 <table className="w-full min-w-[850px] text-sm text-left">

//                     {/* HEADER */}
//                     <thead className="bg-gray-900 text-white">

//                         <tr>

//                             <th className="px-4 sm:px-5 py-4">
//                                 Image
//                             </th>

//                             <th className="px-4 sm:px-5 py-4">
//                                 Product
//                             </th>

//                             <th className="px-4 sm:px-5 py-4">
//                                 Category
//                             </th>

//                             <th className="px-4 sm:px-5 py-4">
//                                 Price
//                             </th>

//                             <th className="px-4 sm:px-5 py-4">
//                                 Stock
//                             </th>

//                             <th className="px-4 sm:px-5 py-4 text-center">
//                                 Actions
//                             </th>

//                         </tr>

//                     </thead>


//                     {/* BODY */}
//                     <tbody>

//                         {currentProducts.length > 0 ? (

//                             currentProducts.map((item) => (

//                                 <tr
//                                     key={item._id}
//                                     className="border-b hover:bg-gray-50 transition"
//                                 >

//                                     {/* IMAGE */}
//                                     <td className="px-4 sm:px-5 py-4">

//                                         <img
//                                             src={`http://localhost:5000/uploads/${item.image}`}
//                                             alt={item.name}
//                                             className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border"
//                                         />

//                                     </td>


//                                     {/* NAME */}
//                                     <td className="px-4 sm:px-5 py-4">

//                                         <div className="max-w-[220px]">

//                                             <p className="font-semibold text-gray-900 truncate">
//                                                 {item.name}
//                                             </p>

//                                             <p className="text-gray-500 text-xs mt-1 truncate">
//                                                 {item.description}
//                                             </p>

//                                         </div>

//                                     </td>


//                                     {/* CATEGORY */}
//                                     <td className="px-4 sm:px-5 py-4">

//                                         <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
//                                             {item.category?.name || "No Category"}
//                                         </span>

//                                     </td>


//                                     {/* PRICE */}
//                                     <td className="px-4 sm:px-5 py-4 font-semibold whitespace-nowrap">

//                                         ₹{item.price}

//                                     </td>


//                                     {/* STOCK */}
//                                     <td className="px-4 sm:px-5 py-4">

//                                         <span
//                                             className={`
//                                                 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
//                                                 ${
//                                                     item.stock > 10
//                                                         ? "bg-green-100 text-green-700"
//                                                         : item.stock > 0
//                                                         ? "bg-yellow-100 text-yellow-700"
//                                                         : "bg-red-100 text-red-700"
//                                                 }
//                                             `}
//                                         >
//                                             {item.stock}
//                                         </span>

//                                     </td>


//                                     {/* ACTIONS */}
//                                     <td className="px-4 sm:px-5 py-4">

//                                         <div className="flex justify-center items-center gap-2 whitespace-nowrap">

//                                             {/* VIEW */}
//                                             <button
//                                                 onClick={() =>
//                                                     navigate(
//                                                         `/admin/product/${item._id}`
//                                                     )
//                                                 }
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-sm"
//                                             >
//                                                 View
//                                             </button>


//                                             {/* EDIT */}
//                                             <button
//                                                 onClick={() =>
//                                                     navigate(
//                                                         `/admin/edit-product/${item._id}`
//                                                     )
//                                                 }
//                                                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition text-sm"
//                                             >
//                                                 Edit
//                                             </button>


//                                             {/* DELETE */}
//                                             <button
//                                                 onClick={() =>
//                                                     handleDelete(item._id)
//                                                 }
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-sm"
//                                             >
//                                                 Delete
//                                             </button>

//                                         </div>

//                                     </td>

//                                 </tr>

//                             ))

//                         ) : (

//                             <tr>

//                                 <td
//                                     colSpan="6"
//                                     className="text-center py-12 text-gray-500"
//                                 >
//                                     No products found.
//                                 </td>

//                             </tr>

//                         )}

//                     </tbody>

//                 </table>

//             </div>

//         </div>


//         {/* PAGINATION */}
//         {totalPages > 1 && (

//             <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

//                 {/* PREVIOUS */}
//                 <button
//                     onClick={() =>
//                         setCurrentPage(currentPage - 1)
//                     }
//                     disabled={currentPage === 1}
//                     className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition text-sm sm:text-base"
//                 >
//                     Previous
//                 </button>


//                 {/* PAGE NUMBERS */}
//                 <div className="flex flex-wrap justify-center gap-2">

//                     {[...Array(totalPages)].map(
//                         (_, index) => (

//                             <button
//                                 key={index}
//                                 onClick={() =>
//                                     setCurrentPage(index + 1)
//                                 }
//                                 className={`
//                                     px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base
//                                     ${
//                                         currentPage === index + 1
//                                             ? "bg-black text-white"
//                                             : "bg-gray-200 hover:bg-gray-300"
//                                     }
//                                 `}
//                             >
//                                 {index + 1}
//                             </button>

//                         )
//                     )}

//                 </div>


//                 {/* NEXT */}
//                 <button
//                     onClick={() =>
//                         setCurrentPage(currentPage + 1)
//                     }
//                     disabled={currentPage === totalPages}
//                     className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition text-sm sm:text-base"
//                 >
//                     Next
//                 </button>

//             </div>

//         )}

//     </div>
// );

return (
    <div className="w-full max-w-7xl mx-auto mt-6 md:mt-10 px-3 sm:px-4 lg:px-6 pb-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">

            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Products
                </h1>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Manage all products in your store
                </p>
            </div>

            <button
                onClick={() => navigate("/admin/add-product")}
                className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
                + Add Product
            </button>

        </div>


        {/* PRODUCT COUNT */}
        <div className="bg-white border shadow-sm rounded-xl px-4 sm:px-5 py-4 mb-6">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-gray-500 text-sm">
                        Total Products
                    </p>

                    <p className="text-2xl font-bold mt-1">
                        {products.length}
                    </p>
                </div>

                <div className="text-2xl sm:text-3xl">
                    📦
                </div>

            </div>

        </div>


        {/* ========================= */}
        {/* DESKTOP TABLE */}
        {/* ========================= */}

        <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full text-sm text-left">

                    <thead className="bg-gray-900 text-white">

                        <tr>

                            <th className="px-5 py-4">
                                Image
                            </th>

                            <th className="px-5 py-4">
                                Product
                            </th>

                            <th className="px-5 py-4">
                                Category
                            </th>

                            <th className="px-5 py-4">
                                Price
                            </th>

                            <th className="px-5 py-4">
                                Stock
                            </th>

                            <th className="px-5 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {currentProducts.length > 0 ? (

                            currentProducts.map((item) => (

                                <tr
                                    key={item._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    {/* IMAGE */}
                                    <td className="px-5 py-4">

                                        <img
                                            src={`http://localhost:5000/uploads/${item.image}`}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-xl border"
                                        />

                                    </td>


                                    {/* PRODUCT */}
                                    <td className="px-5 py-4">

                                        <div className="max-w-xs">

                                            <p className="font-semibold text-gray-900 truncate">
                                                {item.name}
                                            </p>

                                            <p className="text-gray-500 text-xs mt-1 truncate">
                                                {item.description}
                                            </p>

                                        </div>

                                    </td>


                                    {/* CATEGORY */}
                                    <td className="px-5 py-4">

                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            {item.category?.name || "No Category"}
                                        </span>

                                    </td>


                                    {/* PRICE */}
                                    <td className="px-5 py-4 font-semibold whitespace-nowrap">
                                        ₹{item.price}
                                    </td>


                                    {/* STOCK */}
                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                px-3 py-1 rounded-full text-xs font-semibold
                                                ${
                                                    item.stock > 10
                                                        ? "bg-green-100 text-green-700"
                                                        : item.stock > 0
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {item.stock}
                                        </span>

                                    </td>


                                    {/* ACTIONS */}
                                    <td className="px-5 py-4">

                                        <div className="flex justify-center items-center gap-2 whitespace-nowrap">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/product/${item._id}`
                                                    )
                                                }
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition"
                                            >
                                                View
                                            </button>


                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/edit-product/${item._id}`
                                                    )
                                                }
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm transition"
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-12 text-gray-500"
                                >
                                    No products found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>


        {/* ========================= */}
        {/* MOBILE CARDS */}
        {/* ========================= */}

        <div className="md:hidden space-y-4">

            {currentProducts.length > 0 ? (

                currentProducts.map((item) => (

                    <div
                        key={item._id}
                        className="bg-white border rounded-2xl shadow-sm p-4"
                    >

                        {/* TOP */}
                        <div className="flex gap-4">

                            <img
                                src={`http://localhost:5000/uploads/${item.image}`}
                                alt={item.name}
                                className="w-20 h-20 shrink-0 object-cover rounded-xl border"
                            />


                            <div className="min-w-0 flex-1">

                                <h2 className="font-semibold text-gray-900 text-base break-words">
                                    {item.name}
                                </h2>

                                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                    {item.description}
                                </p>

                                <span className="inline-block mt-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                                    {item.category?.name || "No Category"}
                                </span>

                            </div>

                        </div>


                        {/* INFO */}
                        <div className="grid grid-cols-2 gap-3 mt-4">

                            <div className="bg-gray-50 rounded-xl p-3">

                                <p className="text-xs text-gray-500">
                                    Price
                                </p>

                                <p className="font-bold text-gray-900 mt-1">
                                    ₹{item.price}
                                </p>

                            </div>


                            <div className="bg-gray-50 rounded-xl p-3">

                                <p className="text-xs text-gray-500">
                                    Stock
                                </p>

                                <span
                                    className={`
                                        inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold
                                        ${
                                            item.stock > 10
                                                ? "bg-green-100 text-green-700"
                                                : item.stock > 0
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }
                                    `}
                                >
                                    {item.stock}
                                </span>

                            </div>

                        </div>


                        {/* ACTIONS */}
                        <div className="grid grid-cols-3 gap-2 mt-4">

                            <button
                                onClick={() =>
                                    navigate(
                                        `/admin/product/${item._id}`
                                    )
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition"
                            >
                                View
                            </button>


                            <button
                                onClick={() =>
                                    navigate(
                                        `/admin/edit-product/${item._id}`
                                    )
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-lg text-sm font-medium transition"
                            >
                                Edit
                            </button>


                            <button
                                onClick={() =>
                                    handleDelete(item._id)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            ) : (

                <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
                    No products found.
                </div>

            )}

        </div>


        {/* ========================= */}
        {/* PAGINATION */}
        {/* ========================= */}

        {totalPages > 1 && (

            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

                {/* PREVIOUS */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition text-sm"
                >
                    Previous
                </button>


                {/* PAGE NUMBERS */}
                <div className="flex flex-wrap justify-center gap-2">

                    {[...Array(totalPages)].map(
                        (_, index) => (

                            <button
                                key={index}
                                onClick={() =>
                                    setCurrentPage(index + 1)
                                }
                                className={`
                                    px-3 sm:px-4 py-2 rounded-lg transition text-sm
                                    ${
                                        currentPage === index + 1
                                            ? "bg-black text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }
                                `}
                            >
                                {index + 1}
                            </button>

                        )
                    )}

                </div>


                {/* NEXT */}
                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition text-sm"
                >
                    Next
                </button>

            </div>

        )}

    </div>
);
}

export default Products;