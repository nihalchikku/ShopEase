import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });

    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(true);


    // Get categories
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


    // Get product
    const getProduct = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/product/${id}`
            );

            const product = res.data;

            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category?._id || product.category || "",
                stock: product.stock || "",
                image: product.image || ""
            });

            if (product.image) {
                setPreview(
                    `http://localhost:5000/uploads/${product.image}`
                );
            }

        } catch (error) {

            console.log(error);
            toast.error("Failed to load product");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getCategories();
        getProduct();

    }, [id]);


    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Handle image
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));

    };


    // Update product
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("adminToken");


            // Validation

            if (!formData.name.trim()) {
                toast.error("Product name is required");
                return;
            }

            if (!formData.description.trim()) {
                toast.error("Description is required");
                return;
            }

            if (!formData.price || Number(formData.price) <= 0) {
                toast.error("Enter a valid price");
                return;
            }

            if (!formData.category) {
                toast.error("Please select a category");
                return;
            }

            if (
                formData.stock === "" ||
                Number(formData.stock) < 0
            ) {
                toast.error("Enter a valid stock");
                return;
            }


            let imageName = formData.image;


            // Upload new image only if selected
            if (image) {

                const imageData = new FormData();

                imageData.append("image", image);


                const uploadRes = await axios.post(
                    "http://localhost:5000/api/upload",
                    imageData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );


                imageName = uploadRes.data.image;

            }


            const productData = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                stock: formData.stock,
                image: imageName
            };


            await axios.put(
                `http://localhost:5000/api/product/${id}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            toast.success("Product updated successfully");

            navigate("/admin/products");


        } catch (error) {

            console.log(error);
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to update product"
            );

        }

    };


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-gray-500">
                    Loading product...
                </p>

            </div>
        );

    }


    return (

        <div className="max-w-5xl mx-auto mt-10 pb-10">

            {/* Header */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Product
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update product information and inventory
                    </p>

                </div>


                <button
                    onClick={() => navigate("/admin/products")}
                    className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
                >
                    ← Back to Products
                </button>

            </div>


            {/* Form Card */}

            <div className="bg-white rounded-2xl shadow-lg border p-8">

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >


                    {/* Product Name */}

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Price */}

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="₹ Enter price"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Category */}

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((item) => (

                                <option
                                    key={item._id}
                                    value={item._id}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Stock */}

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Description */}

                    <div className="md:col-span-2">

                        <label className="block mb-2 font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black resize-none"
                        />

                    </div>


                    {/* Image */}

                    <div className="md:col-span-2">

                        <label className="block mb-2 font-medium text-gray-700">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg p-3"
                        />

                    </div>


                    {/* Image Preview */}

                    {preview && (

                        <div className="md:col-span-2">

                            <p className="font-medium text-gray-700 mb-3">
                                Image Preview
                            </p>

                            <div className="flex items-center gap-5">

                                <img
                                    src={preview}
                                    alt={formData.name}
                                    className="w-40 h-40 object-cover rounded-xl border shadow-sm"
                                />

                                {image && (
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            New image selected
                                        </p>

                                        <p className="text-sm text-gray-400 mt-1">
                                            This image will replace the current image.
                                        </p>
                                    </div>
                                )}

                            </div>

                        </div>

                    )}


                    {/* Buttons */}

                    <div className="md:col-span-2 flex gap-4 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-1/2 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="w-1/2 bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Update Product
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProduct;