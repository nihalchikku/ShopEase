import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const categoriesPerPage = 5;


    const getCategories = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/category"
            );

            setCategories(res.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load categories");

        }

    };


    useEffect(() => {
        getCategories();
    }, []);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("adminToken");

            await axios.delete(
                `http://localhost:5000/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Category Deleted");

            getCategories();

        } catch (error) {

            console.log(error);

            toast.error("Failed to delete category");

        }

    };


    const indexOfLastCategory =
        currentPage * categoriesPerPage;

    const indexOfFirstCategory =
        indexOfLastCategory - categoriesPerPage;

    const currentCategories =
        categories.slice(
            indexOfFirstCategory,
            indexOfLastCategory
        );

    const totalPages =
        Math.ceil(
            categories.length / categoriesPerPage
        );


    return (

        <div className="max-w-7xl mx-auto mt-10 px-4">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Categories
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your product categories
                    </p>

                </div>


                <button
                    onClick={() => navigate("/admin/add-category")}
                    className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                >
                    + Add Category
                </button>

            </div>


            {/* Category Card */}

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                <div className="p-6 border-b">

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                All Categories
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {categories.length} categories available
                            </p>

                        </div>

                    </div>

                </div>


                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-gray-900 text-white">

                            <tr>

                                <th className="px-6 py-4">
                                    #
                                </th>

                                <th className="px-6 py-4">
                                    Category
                                </th>

                                <th className="px-6 py-4">
                                    Description
                                </th>

                                <th className="px-6 py-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {currentCategories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-12 text-gray-500"
                                    >
                                        No categories found
                                    </td>

                                </tr>

                            ) : (

                                currentCategories.map(
                                    (item, index) => (

                                        <tr
                                            key={item._id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >

                                            <td className="px-6 py-4 text-gray-500">

                                                {indexOfFirstCategory +
                                                    index +
                                                    1}

                                            </td>


                                            <td className="px-6 py-4">

                                                <span className="font-semibold text-gray-800">

                                                    {item.name}

                                                </span>

                                            </td>


                                            <td className="px-6 py-4 text-gray-600">

                                                {item.description}

                                            </td>


                                            <td className="px-6 py-4">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/edit-category/${item._id}`
                                                            )
                                                        }
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item._id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Pagination */}

                {totalPages > 1 && (

                    <div className="flex justify-center items-center gap-4 p-6">

                        <button
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:bg-gray-300"
                        >
                            Previous
                        </button>


                        <span className="font-semibold">

                            Page {currentPage} of {totalPages}

                        </span>


                        <button
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                            disabled={
                                currentPage === totalPages
                            }
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:bg-gray-300"
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Categories;