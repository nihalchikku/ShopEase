import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const [loading, setLoading] = useState(true);


    // Get category details
    const getCategory = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/category/${id}`
            );

            setFormData({
                name: res.data.name || "",
                description: res.data.description || ""
            });

        } catch (error) {

            console.log(error);

            toast.error("Failed to load category");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        getCategory();

    }, [id]);


    // Update category
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("adminToken");

            if (!formData.name.trim()) {

                toast.error("Category name is required");

                return;

            }

            if (!formData.description.trim()) {

                toast.error("Description is required");

                return;

            }


            await axios.put(
                `http://localhost:5000/api/category/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            toast.success("Category Updated");

            navigate("/admin/categories");


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update category"
            );

        }

    };


    if (loading) {

        return (

            <div className="flex justify-center items-center min-h-[60vh]">

                <p className="text-gray-500">
                    Loading category...
                </p>

            </div>

        );

    }


    return (

        <div className="max-w-4xl mx-auto mt-10 px-4">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Edit Category
                </h1>

                <p className="text-gray-500 mt-2">
                    Update your product category details
                </p>

            </div>


            {/* Form Card */}

            <div className="bg-white rounded-2xl shadow-sm border p-8">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Category Name */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Category Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>


                    {/* Description */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Enter category description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                    </div>


                    {/* Buttons */}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Update Category
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/admin/categories")
                            }
                            className="px-6 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditCategory;