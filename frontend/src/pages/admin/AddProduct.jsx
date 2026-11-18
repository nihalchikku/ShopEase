import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddProduct() {

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

    // =========================
    // GET CATEGORIES
    // =========================

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


    // =========================
    // HANDLE IMAGE
    // =========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setImage(file);

        if (file) {

            setPreview(URL.createObjectURL(file));

        } else {

            setPreview("");

        }

    };


    // =========================
    // HANDLE SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("adminToken");


            // =========================
            // VALIDATION
            // =========================

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


            if (!image) {

                toast.error("Please select a product image");
                return;

            }


            // =========================
            // UPLOAD IMAGE
            // =========================

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


            const imageName = uploadRes.data.image;


            // =========================
            // PRODUCT DATA
            // =========================

            const productData = {

                name: formData.name,

                description: formData.description,

                price: Number(formData.price),

                category: formData.category,

                stock: Number(formData.stock),

                image: imageName

            };


            // =========================
            // ADD PRODUCT
            // =========================

            await axios.post(

                "http://localhost:5000/api/product/add",

                productData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            toast.success("Product Added Successfully");


            // Clear form

            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                image: ""
            });

            setImage(null);
            setPreview("");


            // Go products page

            navigate("/admin/products");


        } catch (error) {

            console.log(error);

            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };


    // =========================
    // LOAD CATEGORIES
    // =========================

    useEffect(() => {

        getCategories();

    }, []);


    return (

        <div className="max-w-6xl mx-auto mt-10 px-4 pb-10">


            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Add Product
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Add a new product to your store
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="mt-4 md:mt-0 border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
                >
                    ← Back to Products
                </button>

            </div>


            {/* FORM CARD */}

            <div className="bg-white rounded-2xl shadow-lg border p-8">


                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >


                    {/* PRODUCT NAME */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Product Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* PRICE */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Price
                        </label>

                        <input
                            type="number"
                            placeholder="₹ Enter price"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* CATEGORY */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Category
                        </label>

                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
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


                    {/* STOCK */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Stock
                        </label>

                        <input
                            type="number"
                            placeholder="Enter stock quantity"
                            value={formData.stock}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    stock: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="md:col-span-2">

                        <label className="block mb-2 font-semibold text-gray-700">
                            Description
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Enter product description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black resize-none"
                        />

                    </div>


                    {/* IMAGE */}

                    <div className="md:col-span-2">

                        <label className="block mb-2 font-semibold text-gray-700">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>


                    {/* IMAGE PREVIEW */}

                    {preview && (

                        <div className="md:col-span-2">

                            <p className="font-semibold text-gray-700 mb-3">
                                Image Preview
                            </p>

                            <div className="flex justify-center">

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded-xl border shadow"
                                />

                            </div>

                        </div>

                    )}


                    {/* BUTTON */}

                    <div className="md:col-span-2 pt-3">

                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-900 text-white py-3.5 rounded-xl font-semibold transition"
                        >
                            Add Product
                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}

export default AddProduct;