// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import axios from "axios";

// function AdminCoupons() {
//     const [coupons, setCoupons] = useState([]);

//     const [formData, setFormData] = useState({
//         code: "",
//         discount: "",
//         minAmount: "",
//         expiryDate: "",
//     });

//     const [editId, setEditId] = useState(null);

//     const fetchCoupons = async () => {
//         try {
//             const token = localStorage.getItem("adminToken");

//             const res = await axios.get(
//                 "http://localhost:5000/api/coupons",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setCoupons(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();

//     //     try {
//     //         const token = localStorage.getItem("adminToken");
            
//     //         await axios.post(
//     //             "http://localhost:5000/api/coupons",
//     //             formData,
//     //             {
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`,
//     //                 },
//     //             }
//     //         );
            
//     //         toast.success("Coupon added successfully");

//     //         setFormData({
//     //             code: "",
//     //             discount: "",
//     //             minAmount: "",
//     //             expiryDate: "",
//     //         });

//     //         fetchCoupons();

//     //     } catch (error) {
//     //         toast.error(
//     //             error.response?.data?.message || "Something went wrong"
//     //         );
//     //     }
//     // };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem("adminToken");

//             if(editId){
//                 await axios.put(
//                     `http://localhost:5000/api/coupons/${editId}`,
//                     formData,
//                     {
//                         headers: {
//                             Authorization:
//                             `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 toast.success("coupon updated successfully");
//             } else {
//                 await axios.post(
//                     "http://localhost:5000/api/coupons",
//                     formData,
//                     {
//                         headers: {
//                             Authorization:
//                             `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 toast.success("Coupon added successfully");
//             }

//             setFormData({
//                 code: "",
//                 discount: "",
//                 minAmount: "",
//                 expiryDate: "",
//             });

//             setEditId(null);
            
//             fetchCoupons();

//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Somethng went wrong"
//             );
//         }
//     };

//     const handleEdit = (item) => {
//         setEditId(item._id);

//         setFormData({
//             code: item.code,
//             discount: item.discount,
//             minAmount: item.minAmount,
//             expiryDate: item.expiryDate.split("T")[0],
//         });
//     };

//     const handleDelete = async (id) => {
//         try {
//             const token = localStorage.getItem("adminToken");

//             await axios.delete(
//                 `http://localhost:5000/api/coupons/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             toast.success("Coupon deleted successfully");

//             fetchCoupons();
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "failed to delted coupon"
//             );
//         }
//     };

//     useEffect(() => {
//         fetchCoupons();
//     }, []);

//     return (
//         <div className="max-w-6xl mx-auto mt-10">
//             <h1 className="text-3xl font-bold mb-6">Coupon Management</h1>

//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//                 <h2 className="text-2xl font-bold mb-6">
//                     Add Coupon
//                 </h2>

//                 <form onSubmit={handleSubmit}
//                 className="grid md:grid-cols-2 gap-5">
//                     <div>
//                         <label className="block mb-2 font-medium">
//                             Coupon Code
//                         </label>

//                         <input type="text"
//                         value={formData.code}
//                         onChange={(e) => setFormData({
//                             ...formData,
//                             code: e.target.value,
//                         })}
//                         placeholder="WELCOME10"
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     <div>
//                         <label className="block mb-2 font-medium">Discount (%)</label>

//                         <input type="number"
//                         value={formData.discount}
//                         onChange={(e) => setFormData({
//                             ...formData,
//                             discount: e.target.value,
//                         })}
//                         placeholder="10"
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>
//                     <div>
//                         <label className="block mb-2 font-medium">Minimum Amount</label>
//                         <input type="number"
//                         value={formData.minAmount}
//                         onChange={(e) => setFormData({
//                             ...formData,
//                             minAmount: e.target.value,
//                         })}
//                         placeholder="500"
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     <div>
//                         <label className="block mb-2 font-medium">Expiry Date</label>
//                         <input type="date"
//                         value={formData.expiryDate}
//                         onChange={(e) => setFormData({
//                             ...formData,
//                             expiryDate: e.target.value,
//                         })}
//                         className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
//                     </div>

//                     <button type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold md:col-span-2">
//                         {editId ? "Update Coupon" : "Add Coupon"}
//                     </button>
//                 </form>
//             </div>

//             <div className="bg-white rounded-xl shadow-lg p-6">

//                 <table className="w-full border-collapse">

//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 text-left">Code</th>
//                             <th className="p-3 text-left">Discount</th>
//                             <th className="p-3 text-left">Min Amount</th>
//                             <th className="p-3 text-left">Expiry</th>
//                             <th className="p-3 text-left">Status</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {coupons.map((item) => (
//                             <tr key={item._id}
//                             className="border-t hover:bg-gray-50">
//                                 <td className="p-3 font-semibold">
//                                     {item.code}
//                                 </td>

//                                 <td className="p-3">
//                                     {item.discount}%
//                                 </td>

//                                 <td className="p-3">
//                                     ₹{item.minAmount}
//                                 </td>

//                                 <td className="p-3">
//                                     {new Date(item.expiryDate).toLocaleDateString()}
//                                 </td>

//                                 <td className="p-3">
//                                     {item.isActive ? (
//                                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
//                                             Active
//                                         </span>
//                                     ) : (
//                                         <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">Inactive</span>
//                                     )}
//                                 </td>

//                                 <td className="p-3">
//                                     <button onClick={() => handleEdit(item)}
//                                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">Edit
//                                     </button>

//                                     <button onClick={() => handleDelete(item._id)}
//                                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default AdminCoupons;