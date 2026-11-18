import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

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

            await axios.post(
                "http://localhost:5000/api/category/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Category Added");

            setFormData({
                name: "",
                description: ""
            });

            navigate("/admin/categories");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add category"
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add Category
                </h1>

                <p className="text-gray-500 mt-2">
                    Create a new product category
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

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

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Add Category
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/categories")}
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

export default AddCategory;