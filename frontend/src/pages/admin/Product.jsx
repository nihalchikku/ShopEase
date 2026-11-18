import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product() {

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

    const [products, setProducts] = useState([]);

    const [editId, setEditId] = useState(null);

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPage = Math.ceil(products.length / productsPerPage);

    const getCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/category"
            );

            setCategories(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/product"
            );

            setProducts(res.data);
        } catch (error){
            console.log(error);

            toast.error("Failed to load products");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("adminToken");

            if(!formData.name.trim()){
                toast.error("Product name is required");
                return;
            }

            if(!formData.description.trim()){
                toast.error("Description is required");
                return;
            }

            if(!formData.price || Number(formData.price) <= 0){
                toast.error("Enter a valid price");
                return;
            }

            if(!formData.category){
                toast.error("Please select a category");
                return;
            }

            if(!formData.stock === "" || Number(formData.stock) < 0){
                toast.error("Enter a valid stock");
                return;
            }

            if(!editId && !image){
                toast.error("Please seclect a product");
                return;
            }

            let imageName = formData.image;

            if(image){
                const imageData = new FormData();

                imageData.append("image", image);

                const uploadRes = await axios.post(
                    "http://localhost:5000/api/upload",
                    imageData,
                    {
                        headers: {
                            "Content-Type":
                            "multipart/form-data"
                        }
                    }
                );

                imageName = uploadRes.data.image;
            }
            
            const productData = {
                ...formData,
                image: imageName
            };

            if(editId) {
                await axios.put(
                    `http://localhost:5000/api/product/${editId}`,
                    productData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Product Updated");

                setEditId(null);
            } else {
                await axios.post(
                "http://localhost:5000/api/product/add",
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );

                toast.success("Product Added");
            }
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

            getProducts();
        } catch(error) {
            console.log(error);

            toast.error("Failed to add product");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            console.log(token);

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
        } catch(error) {
            console.log(error);

            toast.error("Failed to delete product");
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category._id,
            stock: product.stock,
            image: product.image
        });

        setPreview(`http://localhost:5000/uploads/${product.image}`);
        setImage(null);
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    // return (
    //     <div className="max-w-5xl mx-auto mt-10">
    //         <h1 className="text-3xl font-bold mb-8">Product Management</h1>

    //         <div className="bg-white shadow-lg rounded-xl p-6">
    //             <form onSubmit={handleSubmit} className="space-y-4">
    //                 <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({
    //                     ...formData,name:e.target.value
    //                 })} className="w-full border p-3 rounded-lg" />
    //                 <textarea placeholder="Description" rows="4" value={formData.description} onChangeCapture={(e) => setFormData({
    //                     ...formData,description:e.target.value
    //                 })} className="w-full border p-3 rounded-lg" />
    //                 <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({
    //                     ...formData,price:e.target.value
    //                 })} className="w-full border p-3 rounded-lg"/>
    //                 <select value={formData.category} onChange={(e) => setFormData({
    //                     ...formData,category:e.target.value
    //                 })}className="w-full border p-3 rounded-lg">
    //                     <option value="">Select Category</option>
    //                     {categories.map((item) => (
    //                         <option key={item._id} value={item._id}>{item.name}</option>
    //                     ))}
    //                 </select>

    //                 <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({
    //                     ...formData,stock:e.target.value
    //                 })} className="w-full border p-3 rounded-lg" />

                    
    //                 <input key={image ? image.name : "empty  "} type="file" accept="image/*" onChange={(e) => {
    //                     const file = e.target.files[0];
    //                     setImage(file);

    //                     if(file){
    //                         setPreview(URL.createObjectURL(file));
    //                     }
    //                 }}
    //                 className="w-full border p-3 rounded-lg" />

    //                 {preview && (
    //                     <img src={preview}
    //                     alt="Preview" className="w-32 h-32 object-cover rounded-lg border mt-3" />
    //                 )}


    //                 <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
    //                     {editId ? "Update Product" : "Add Product"}
    //                 </button>
    //             </form>

    //             <div className="mt-8">
    //                 <h2 className="text-2xl font-bold mb-4">Products</h2>

    //                 <table className="w-full border border-gray-300">
    //                     <thead className="bg-gray-200">
    //                         <tr>
    //                             <th className="border p-2">Image</th>
    //                             <th className="border p-2">Name</th>
    //                             <th className="border p-2">Category</th>
    //                             <th className="border p-2">Price</th>
    //                             <th className="border p-2">Stock</th>
    //                             <th className="border p-2">Actions</th>
    //                         </tr>
    //                     </thead>

    //                     <tbody>
    //                         {currentProducts.map((item) => (
    //                             <tr key={item._id}>
    //                                 <td className="border p-2">
    //                                     <img
    //                                         src={`http://localhost:5000/uploads/${item.image}`}
    //                                         alt={item.name}
    //                                         className="w-16 h-16 object-cover rounded"
    //                                     />
    //                                 </td>

    //                                 <td className="border p-2">{item.name}</td>

    //                                 <td className="border p-2">
    //                                     {item.category?.name}
    //                                 </td>

    //                                 <td className="border p-2">
    //                                     ₹{item.price}
    //                                 </td>

    //                                 <td className="border p-2">
    //                                     {item.stock}
    //                                 </td>

    //                                 <td className="border p-2">
    //                                     <div className="flex gap-2">
    //                                         <button
    //                                             onClick={() => navigate(`/admin/product/${item._id}`)}
    //                                             className="bg-blue-500 text-white px-3 py-1 rounded"
    //                                         >
    //                                             View
    //                                         </button>

    //                                         <button
    //                                             onClick={() => handleEdit(item)}
    //                                             className="bg-yellow-500 text-white px-3 py-1 rounded"
    //                                         >
    //                                             Edit
    //                                         </button>

    //                                         <button
    //                                             onClick={() => handleDelete(item._id)}
    //                                             className="bg-red-500 text-white px-3 py-1 rounded"
    //                                         >
    //                                             Delete
    //                                         </button>
    //                                     </div>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //                 <div className="flex justify-center items-center gap-2 mt-5">
    //                     <button onClick={() => setCurrentPage(currentPage - 1)}
    //                         disabled={currentPage === 1}
    //                         className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50">
    //                             Previous
    //                     </button>

    //                     {[...Array(totalPage)].map((_,index) => (
    //                         <button key={index} onClick={() => setCurrentPage(index + 1)}
    //                         className={`px-3 py-2 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white"
    //                             : "bg-gray-300"
    //                         }`}
    //                         >
    //                             {index + 1}
    //                         </button>
    //                     ))}
                        
    //                     <button onClick={() => setCurrentPage(currentPage + 1)}
    //                         disabled={currentPage === totalPage}
    //                         className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50">
    //                             Next
    //                         </button>
    //                 </div>
    //             </div>

    //         </div>
    //     </div>
    // );



    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-8">Product Management</h1>

            {/* <div className="bg-white rounded-2xl shadow-lg p-8 border">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {editId ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Fill all product details below
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label type="block mb-2 font-medium text-gray-700">
                            Product Name
                        </label>

                        <input type="text" placeholder="Enter product name" value={formData.name} onChange={(e) => setFormData({
                            ...formData, name: e.target.value,
                        })} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea rows={5} value={formData.description} onChangeCapture={(e) => setFormData({
                        ...formData,description:e.target.value
                    })} className="w-full border rounded-lg p-3" />
                    </div>
                    
                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input type="number" placeholder="₹ Enter price" value={formData.price} onChange={(e) => setFormData({
                         ...formData,price:e.target.value
                    })} className="w-full border rounded-lg p-3" />
                    </div>
                    
                    <div>
                        <label className="block mb-2 font-medium">
                            Category
                        </label>

                        <select value={formData.category} onChange={(e) => setFormData({
                        ...formData,category:e.target.value
                        })} className="w-full border rounded-lg p-3">
                        <option value="">Select Category</option>
                        {categories.map((item) => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Stock
                        </label>

                        <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({
                        ...formData,stock:e.target.value
                        })} className="w-full border rounded-lg p-3" />
                    </div>

                    
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Product Image
                        </label>

                        <input key={image ? image.name : "empty  "} type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);

                        if(file){
                            setPreview(URL.createObjectURL(file));
                        }
                        }}
                        className="w-full border rounded-lg p-3" />
                    </div>

                    {preview && (
                        <div className="md:col-span-2 flex justify-center">
                            <img src={preview} className="w-40 h-40 rounded-xl border object-cover shadow" />
                        </div>
                    )}


                    <div className="md:col-span-2">

                        <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition">
                            {editId ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Products</h2>

                    <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentProducts.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <img
                                            src={`http://localhost:5000/uploads/${item.image}`}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>

                                    <td className="px-4 py-3">{item.name}</td>

                                    <td className="px-4 py-3">
                                        {item.category?.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        ₹{item.price}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className={
                                            `px-3 py-1 rounded-full text-xs font-semibold ${
                                                item.stock > 10 ? "bg-green-100 text-green-700" :
                                                item.stock > 0 ? "bg-yellow-100 text-yellow-700" :
                                                "bg-red-100 text-red-700"
                                            }`
                                        }>
                                            {item.stock}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/product/${item._id}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-5">
                        <button onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50">
                                Previous
                        </button>

                        {[...Array(totalPage)].map((_,index) => (
                            <button key={index} onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-2 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white"
                                : "bg-gray-300"
                            }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPage}
                            className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50">
                                Next
                            </button>
                    </div>
                </div> */}

        </div>
    );
}

export default Product;