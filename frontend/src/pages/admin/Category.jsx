import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Category(){

        const [formData, setFormData] = useState({
            name: "",
            description: ""
        });

        const [categories, setCategories] = useState([]);

        const [editId, setEditId] = useState(null);

        const [currentPage, setCurrentPage] = useState(1);
        const categoriesPerPage = 5;


        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const token = localStorage.getItem("adminToken");

                if(!formData.name.trim()){
                    toast.error("Category name is required");
                    return;
                }

                if(!formData.description.trim()){
                    toast.error("Description is required");
                    return;
                }

                if(editId){
                    await axios.put(
                        `http://localhost:5000/api/category/${editId}`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    toast.success("Category Updated");

                    setEditId(null);
                } else {
                    await axios.post(
                    "http://localhost:5000/api/category/add",
                    formData,
                    {
                        headers: {
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                    toast.success("Category Added");
                }
                setFormData({
                        name: "",
                        description: ""
                });

                getCategories();
                
            } catch(error){
                console.log(error);
                console.log(error.response?.data);

                toast.error(
                    error.response?.data?.message || "Failed to add category"
                );
            }
        };

        const getCategories = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/category"
                );

                setCategories(res.data);
                console.log(res.data);
            } catch(error) {
                console.log(error);

                toast.error("Failed to load categories");
            }
        };

        const handleDelete = async (id) => {
            try {
                const token = localStorage.getItem("adminToken");

                await axios.delete(
                    `http://localhost:5000/api/category/${id}`,
                    {
                        headers: {
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                toast.success("Category Deleted");

                getCategories();
            } catch(error) {
                console.log(error);

                toast.error("Failed to delete category");
            }
        };

        const handleEidt = (item) => {
            setFormData({
                name: item.name,
                description: item.description
            });

            setEditId(item._id);
        };

        useEffect(() => {
            getCategories();
        }, []);

        const indexOfLastCategory = currentPage * categoriesPerPage;

        const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;

        const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory)

        const totalPages = Math.ceil(categories.length / categoriesPerPage);

        // return (
        //     <div className="max-w-4xl mx-auto mt-10">
        //         <h1 className="text-3xl font-bold mb-6">Category Management</h1>

        //         <div className="bg-white shadow-lg rounded-xl p-6">
        //             <form onSubmit={handleSubmit} className="space-y-4">
        //                 <input type="text" placeholder="Category Name" className="w-full border p-3 rounded-lg" value={formData.name} onChange={(e) => setFormData({
        //                     ...formData,name:e.target.value
        //                 })} />
        //                 <textarea placeholder="Description" className="w-full border p-3 rounded-lg" rows="4" value={formData.description} onChange={(e) => setFormData({
        //                     ...formData,description:e.target.value
        //                 })} />

        //                 <button type="submit" className="bg-blue-600 text-white px-6 py-6 rounded-lg hover:bg-blue-700">{editId ? "Update Category" : "Add Category"}</button>
        //             </form>

        //             <div className="mt-8">
        //                 <h2 className="text-2xl font-bold mb-4">Categories</h2>

        //                 <table className="w-full border-collapse border mt-4">
        //                     <thead>
        //                         <tr className="bg-gray-100">
        //                             <th className="border p-2">#</th>
        //                             <th className="border p-2">Category</th>
        //                             <th className="border p-2">Description</th>
        //                             <th className="border p-2">Actions</th>
        //                         </tr>
        //                     </thead>

        //                     <tbody>
        //                         {currentCategories.map((item, index) => (
        //                             <tr key={item._id}>
        //                                 <td className="border p-2">{indexOfFirstCategory + index + 1}</td>
        //                                 <td className="border p-2">{item.name}</td>
        //                                 <td className="border p-2">{item.description}</td>
        //                                 <td className="border p-2">
        //                                     <button onClick={() => handleEidt(item)}
        //                                         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
        //                                             Edit
        //                                     </button>

        //                                     <button onClick={() => handleDelete(item._id)}
        //                                         className="bg-red-500 text-white px-3 py-1 rounded">
        //                                             Delete
        //                                     </button>
        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </tbody>
        //                 </table>
        //                 <div className="flex justify-center items-center gap-4 mt-6">
        //                     <button onClick={() => setCurrentPage(currentPage - 1)}
        //                         disabled={currentPage === 1}
        //                         className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300">
        //                             Previous
        //                     </button>

        //                     <span className="font-semibold">Page {currentPage} of {totalPages}</span>

        //                     <button onClick={() => setCurrentPage(currentPage + 1)}
        //                         disabled={currentPage === totalPages}
        //                         className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300">
        //                             Next
        //                         </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );

        return (
            <div className="max-w-7xl mx-auto mt-10">
                <h1 className="text-3xl font-bold mb-6">Category Management</h1>

                <div className="bg-white shadow-lg rounded-xl p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {editId ? "Edit Category" : "Add New Category"}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Create and manage product categories
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Category Name
                            </label>

                            <input type="text" placeholder="Enter category name" value={formData.name} onChange={(e) => setFormData({
                            ...formData,name:e.target.value
                            })} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Description
                            </label>

                            <textarea placeholder="Enter description" value={formData.description} onChange={(e) => setFormData({
                            ...formData,description:e.target.value
                            })} className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition">
                            {editId ? "Update Category" : "Add Category"}
                        </button>
                    </form>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Categories</h2>

                        <div className="overflow-x-auto rounded-xl border shadow-sm mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-4 py-3">Count</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentCategories.map((item, index) => (
                                    <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{indexOfFirstCategory + index + 1}</td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.description}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleEidt(item)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition mr-2">
                                                    Edit
                                            </button>

                                            <button onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition">
                                                    Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300">
                                    Previous
                            </button>

                            <span className="font-semibold">Page {currentPage} of {totalPages}</span>

                            <button onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300">
                                    Next
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Category;