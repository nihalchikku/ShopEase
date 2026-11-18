// // // // import { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import toast from "react-hot-toast";

// // // // function AddAddress() {

// // // //     const navigate = useNavigate();
// // // //     const { id } = useParams();


// // // //     const [formData, setFormData] = useState({
// // // //         fullName: "",
// // // //         phone: "",
// // // //         house: "",
// // // //         city: "",
// // // //         state: "",
// // // //         pincode: ""
// // // //     });

// // // //     const [user, setUser] = useState("");


// // // //     useEffect(() => {

// // // //         if(id){

// // // //             const getAddress = async()=>{

// // // //                 try{

// // // //                     const token = localStorage.getItem("token");

// // // //                     const res = await axios.get(
// // // //                         `http://localhost:5000/api/user/address/${id}`,
// // // //                         {
// // // //                             headers:{
// // // //                                 Authorization:`Bearer ${token}`
// // // //                             }
// // // //                         }
// // // //                     );

// // // //                     setFormData(res.data);

// // // //                 }
// // // //                 catch(error){
// // // //                     console.log(error);
// // // //                 }

// // // //             }

// // // //             getAddress();

// // // //         }

// // // //     },[id]);



// // // //     const handleSubmit = async(e)=>{

// // // //         e.preventDefault();

// // // //         try{

// // // //             const token = localStorage.getItem("token");

// // // //             if(
// // // //                 !formData.fullName ||
// // // //                 !formData.phone ||
// // // //                 !formData.house ||
// // // //                 !formData.city ||
// // // //                 !formData.state ||
// // // //                 !formData.pincode
// // // //             ) {
// // // //                 toast.error("Please fill all fields");
// // // //                 return;
// // // //             }


// // // //             if(id){

// // // //                 await axios.put(
// // // //                     `http://localhost:5000/api/user/update-address/${id}`,
// // // //                     formData,
// // // //                     {
// // // //                         headers:{
// // // //                             Authorization:`Bearer ${token}`
// // // //                         }
// // // //                     }
// // // //                 );


// // // //                 toast.success("Address updated");


// // // //             }else{


// // // //                 await axios.post(
// // // //                     "http://localhost:5000/api/user/add-address",
// // // //                     formData,
// // // //                     {
// // // //                         headers:{
// // // //                             Authorization:`Bearer ${token}`
// // // //                         }
// // // //                     }
// // // //                 );


// // // //                 toast.success("Address added");

// // // //             }


// // // //             navigate("/profile");


// // // //         }
// // // //         catch(error){

// // // //             console.log(error);
// // // //             toast.error("Failed");

// // // //         }

// // // //     };

// // // //     useEffect(() => {
// // // //         getProfile();
// // // //     },[]);

// // // //     const getProfile = async () => {
// // // //         try {
// // // //             const token = localStorage.getItem("token");
// // // //             console.log("TOKEN:",token);
// // // //             const res = await axios.get("http://localhost:5000/api/user/profile",{
// // // //                 headers: {
// // // //                     Authorization: `Bearer ${token}`
// // // //                 }
// // // //             });
// // // //             setUser(res.data);
// // // //         } catch (error) {
// // // //             console.log(error);
// // // //         }
// // // //     };



// // // // // return (

// // // // // <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10">


// // // // // <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">



// // // // // <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16">


// // // // // <h1 className="text-5xl font-bold mb-4">
// // // // // {id ? "Edit Address" : "Add Address"}
// // // // // </h1>


// // // // // <p className="text-lg text-gray-200 text-center">
// // // // // Save your delivery address for faster and easier checkout.
// // // // // </p>


// // // // // </div>



// // // // // <div className="flex flex-col justify-center p-16">


// // // // // <h2 className="text-4xl font-bold text-center mb-8">
// // // // // New Address
// // // // // </h2>



// // // // // <form onSubmit={handleSubmit} className="space-y-5">



// // // // // <input
// // // // // type="text"
// // // // // placeholder="Full Name"
// // // // // value={formData.fullName}
// // // // // onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
// // // // // className="w-full border rounded-lg p-4 text-lg"
// // // // // />



// // // // // <input
// // // // // type="text"
// // // // // placeholder="Phone Number"
// // // // // value={formData.phone}
// // // // // onChange={(e)=>setFormData({...formData,phone:e.target.value})}
// // // // // className="w-full border rounded-lg p-4 text-lg"
// // // // // />



// // // // // <input
// // // // // type="text"
// // // // // placeholder="City"
// // // // // value={formData.city}
// // // // // onChange={(e)=>setFormData({...formData,city:e.target.value})}
// // // // // className="w-full border rounded-lg p-4 text-lg"
// // // // // />



// // // // // <input
// // // // // type="text"
// // // // // placeholder="State"
// // // // // value={formData.state}
// // // // // onChange={(e)=>setFormData({...formData,state:e.target.value})}
// // // // // className="w-full border rounded-lg p-4 text-lg"
// // // // // />



// // // // // <input
// // // // // type="text"
// // // // // placeholder="Pincode"
// // // // // value={formData.pincode}
// // // // // onChange={(e)=>setFormData({...formData,pincode:e.target.value})}
// // // // // className="w-full border rounded-lg p-4 text-lg"
// // // // // />



// // // // // <button
// // // // // type="submit"
// // // // // className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold"
// // // // // >

// // // // // {id ? "Update Address" : "Save Address"}

// // // // // </button>



// // // // // </form>


// // // // // </div>


// // // // // </div>


// // // // // </div>

// // // // // );


// // // // return (
// // // //     <div className="min-h-screen bg-gray-100 py-10">
// // // //         <div className="max-w-7xl mx-auto flex gap-6">
// // // //             <div className="w-72 bg-white rounded-xl shadow-lg p-6 h-fit">

// // // //                 <div className="text-center mb-6">
// // // //                 <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-3xl font-bold">
// // // //                     {user?.name?.charAt(0)}
// // // //                 </div>

// // // //                 <h2 className="font-bold text-xl mt-3">
// // // //                     {user?.name}
// // // //                 </h2>

// // // //                 <p className="text-gray-500 text-sm">
// // // //                     {user?.email}
// // // //                 </p>
// // // //                 </div>

// // // //                 <div className="space-y-3">

// // // //                 <button onClick={() => navigate("/profile")}
// // // //                  className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
// // // //                     Account Info
// // // //                 </button>

// // // //                 <button onClick={() => navigate("/add-address")}
// // // //                  className="w-full bg-black text-white p-3 rounded-lg">
// // // //                     Add Address
// // // //                 </button>

// // // //                 <button className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
// // // //                     My Orders
// // // //                 </button> 

// // // //                 <button onClick={() => navigate("/change-password")}
// // // //                 className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
// // // //                     Change Password
// // // //                 </button>
// // // //                 <br />
// // // //                 <br />

// // // //                 {/* <button
// // // //                     onClick={handleLogout}
// // // //                     className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
// // // //                 >
// // // //                     Logout
// // // //                 </button> */}

// // // //                 </div>
// // // //             </div>


// // // //             <div className="w-144 bg-white rounded-xl shadow-lg p-6 pt-5 h-fit flex-1 border">
// // // //                 <h2 className="text-3xl font-bold mb-6 text-center ">{id ? "Edit Address" : "Add Address"}</h2>
                
// // // //                 <form onSubmit={handleSubmit} className="space-y-4">



// // // //                 <input
// // // //                 type="text"
// // // //                 placeholder="Full Name"
// // // //                 value={formData.fullName}
// // // //                 onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10"
// // // //                 />



// // // //                 <input
// // // //                 type="text"
// // // //                 placeholder="Phone Number"
// // // //                 value={formData.phone}
// // // //                 onChange={(e)=>setFormData({...formData,phone:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10"
// // // //                 />

// // // //                 <input type="text"
// // // //                 placeholder="House Name"
// // // //                 value={formData.house}
// // // //                 onChange={(e)=>setFormData({...formData,house:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10" />



// // // //                 <input
// // // //                 type="text"
// // // //                 placeholder="City"
// // // //                 value={formData.city}
// // // //                 onChange={(e)=>setFormData({...formData,city:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10"
// // // //                 />



// // // //                 <input
// // // //                 type="text"
// // // //                 placeholder="State"
// // // //                 value={formData.state}
// // // //                 onChange={(e)=>setFormData({...formData,state:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10"
// // // //                 />



// // // //                 <input
// // // //                 type="text"
// // // //                 placeholder="Pincode"
// // // //                 value={formData.pincode}
// // // //                 onChange={(e)=>setFormData({...formData,pincode:e.target.value})}
// // // //                 className="w-full border p-3 rounded-lg pr-10"
// // // //                 />



// // // //                 <button
// // // //                 type="submit"
// // // //                 className="w-full bg-black text-white p-3 rounded-lg"
// // // //                 >

// // // //                 {id ? "Update Address" : "Save Address"}

// // // //                 </button>
// // // //                 </form>


// // // //             </div>
// // // //         </div>
// // // //     </div>
// // // // )

// // // // }

// // // // export default AddAddress;

// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import toast from "react-hot-toast";

// // // function AddAddress() {
// // //     const navigate = useNavigate();
// // //     const { id } = useParams();

// // //     const [formData, setFormData] = useState({
// // //         fullName: "",
// // //         phone: "",
// // //         house: "",
// // //         city: "",
// // //         state: "",
// // //         pincode: "",
// // //     });

// // //     useEffect(() => {
// // //         if (id) {
// // //             const getAddress = async () => {
// // //                 try {
// // //                     const token = localStorage.getItem("token");

// // //                     const res = await axios.get(
// // //                         `http://localhost:5000/api/user/address/${id}`,
// // //                         {
// // //                             headers: {
// // //                                 Authorization: `Bearer ${token}`,
// // //                             },
// // //                         }
// // //                     );

// // //                     setFormData(res.data);
// // //                 } catch (error) {
// // //                     console.log(error);
// // //                     toast.error("Failed to load address");
// // //                 }
// // //             };

// // //             getAddress();
// // //         }
// // //     }, [id]);

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         try {
// // //             const token = localStorage.getItem("token");

// // //             if (
// // //                 !formData.fullName ||
// // //                 !formData.phone ||
// // //                 !formData.house ||
// // //                 !formData.city ||
// // //                 !formData.state ||
// // //                 !formData.pincode
// // //             ) {
// // //                 toast.error("Please fill all fields");
// // //                 return;
// // //             }

// // //             if (id) {
// // //                 await axios.put(
// // //                     `http://localhost:5000/api/user/update-address/${id}`,
// // //                     formData,
// // //                     {
// // //                         headers: {
// // //                             Authorization: `Bearer ${token}`,
// // //                         },
// // //                     }
// // //                 );

// // //                 toast.success("Address updated");
// // //             } else {
// // //                 await axios.post(
// // //                     "http://localhost:5000/api/user/add-address",
// // //                     formData,
// // //                     {
// // //                         headers: {
// // //                             Authorization: `Bearer ${token}`,
// // //                         },
// // //                     }
// // //                 );

// // //                 toast.success("Address added");
// // //             }

// // //             navigate("/profile");

// // //         } catch (error) {
// // //             console.log(error);

// // //             toast.error(
// // //                 error.response?.data?.message ||
// // //                 "Failed to save address"
// // //             );
// // //         }
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-gray-50 py-10 px-4">

// // //             <div className="max-w-3xl mx-auto">

// // //                 {/* Header */}
// // //                 <div className="mb-8">

// // //                     <button
// // //                         onClick={() => navigate("/profile")}
// // //                         className="text-sm text-gray-500 hover:text-blue-600 transition mb-4"
// // //                     >
// // //                         ← Back to Profile
// // //                     </button>

// // //                     <h1 className="text-3xl font-bold text-gray-800">
// // //                         {id ? "Edit Address" : "Add New Address"}
// // //                     </h1>

// // //                     <p className="text-gray-500 mt-2">
// // //                         {id
// // //                             ? "Update your delivery address details."
// // //                             : "Add a delivery address for faster checkout."}
// // //                     </p>

// // //                 </div>

// // //                 {/* Form Card */}
// // //                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

// // //                     <div className="flex items-center gap-4 mb-8">

// // //                         <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
// // //                             📍
// // //                         </div>

// // //                         <div>
// // //                             <h2 className="text-xl font-semibold text-gray-800">
// // //                                 Delivery Address
// // //                             </h2>

// // //                             <p className="text-sm text-gray-500">
// // //                                 Enter your complete address details
// // //                             </p>
// // //                         </div>

// // //                     </div>

// // //                     <form
// // //                         onSubmit={handleSubmit}
// // //                         className="space-y-5"
// // //                     >

// // //                         {/* Full Name */}
// // //                         <div>
// // //                             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                 Full Name
// // //                             </label>

// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="Enter full name"
// // //                                 value={formData.fullName}
// // //                                 onChange={(e) =>
// // //                                     setFormData({
// // //                                         ...formData,
// // //                                         fullName: e.target.value,
// // //                                     })
// // //                                 }
// // //                                 className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                             />
// // //                         </div>

// // //                         {/* Phone */}
// // //                         <div>
// // //                             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                 Phone Number
// // //                             </label>

// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="Enter phone number"
// // //                                 value={formData.phone}
// // //                                 onChange={(e) =>
// // //                                     setFormData({
// // //                                         ...formData,
// // //                                         phone: e.target.value,
// // //                                     })
// // //                                 }
// // //                                 className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                             />
// // //                         </div>

// // //                         {/* House */}
// // //                         <div>
// // //                             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                 House / Building
// // //                             </label>

// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="House name / building"
// // //                                 value={formData.house}
// // //                                 onChange={(e) =>
// // //                                     setFormData({
// // //                                         ...formData,
// // //                                         house: e.target.value,
// // //                                     })
// // //                                 }
// // //                                 className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                             />
// // //                         </div>

// // //                         {/* City + State */}
// // //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                     City
// // //                                 </label>

// // //                                 <input
// // //                                     type="text"
// // //                                     placeholder="City"
// // //                                     value={formData.city}
// // //                                     onChange={(e) =>
// // //                                         setFormData({
// // //                                             ...formData,
// // //                                             city: e.target.value,
// // //                                         })
// // //                                     }
// // //                                     className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                                 />
// // //                             </div>

// // //                             <div>
// // //                                 <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                     State
// // //                                 </label>

// // //                                 <input
// // //                                     type="text"
// // //                                     placeholder="State"
// // //                                     value={formData.state}
// // //                                     onChange={(e) =>
// // //                                         setFormData({
// // //                                             ...formData,
// // //                                             state: e.target.value,
// // //                                         })
// // //                                     }
// // //                                     className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                                 />
// // //                             </div>

// // //                         </div>

// // //                         {/* Pincode */}
// // //                         <div>
// // //                             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                                 Pincode
// // //                             </label>

// // //                             <input
// // //                                 type="text"
// // //                                 placeholder="6-digit pincode"
// // //                                 value={formData.pincode}
// // //                                 onChange={(e) =>
// // //                                     setFormData({
// // //                                         ...formData,
// // //                                         pincode: e.target.value,
// // //                                     })
// // //                                 }
// // //                                 className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
// // //                             />
// // //                         </div>

// // //                         {/* Buttons */}
// // //                         <div className="flex flex-col sm:flex-row gap-3 pt-4">

// // //                             <button
// // //                                 type="button"
// // //                                 onClick={() => navigate("/profile")}
// // //                                 className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
// // //                             >
// // //                                 Cancel
// // //                             </button>

// // //                             <button
// // //                                 type="submit"
// // //                                 className="w-full sm:flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
// // //                             >
// // //                                 {id
// // //                                     ? "Update Address"
// // //                                     : "Save Address"}
// // //                             </button>

// // //                         </div>

// // //                     </form>

// // //                 </div>

// // //             </div>

// // //         </div>
// // //     );
// // // }

// // // export default AddAddress;

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate, useParams } from "react-router-dom";
// // import toast from "react-hot-toast";

// // function AddAddress() {
// //     const navigate = useNavigate();
// //     const { id } = useParams();

// //     const [formData, setFormData] = useState({
// //         fullName: "",
// //         phone: "",
// //         house: "",
// //         city: "",
// //         state: "",
// //         pincode: "",
// //     });

// //     const [user, setUser] = useState(null);

// //     // Get existing address when editing
// //     useEffect(() => {
// //         if (id) {
// //             const getAddress = async () => {
// //                 try {
// //                     const token = localStorage.getItem("token");

// //                     const res = await axios.get(
// //                         `http://localhost:5000/api/user/address/${id}`,
// //                         {
// //                             headers: {
// //                                 Authorization: `Bearer ${token}`,
// //                             },
// //                         }
// //                     );

// //                     setFormData(res.data);
// //                 } catch (error) {
// //                     console.log(error);
// //                     toast.error("Failed to load address");
// //                 }
// //             };

// //             getAddress();
// //         }
// //     }, [id]);

// //     // Get profile
// //     useEffect(() => {
// //         getProfile();
// //     }, []);

// //     const getProfile = async () => {
// //         try {
// //             const token = localStorage.getItem("token");

// //             const res = await axios.get(
// //                 "http://localhost:5000/api/user/profile",
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 }
// //             );

// //             setUser(res.data);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     // Submit address
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const token = localStorage.getItem("token");

// //             if (
// //                 !formData.fullName ||
// //                 !formData.phone ||
// //                 !formData.house ||
// //                 !formData.city ||
// //                 !formData.state ||
// //                 !formData.pincode
// //             ) {
// //                 toast.error("Please fill all fields");
// //                 return;
// //             }

// //             if (id) {
// //                 await axios.put(
// //                     `http://localhost:5000/api/user/update-address/${id}`,
// //                     formData,
// //                     {
// //                         headers: {
// //                             Authorization: `Bearer ${token}`,
// //                         },
// //                     }
// //                 );

// //                 toast.success("Address updated");
// //             } else {
// //                 await axios.post(
// //                     "http://localhost:5000/api/user/add-address",
// //                     formData,
// //                     {
// //                         headers: {
// //                             Authorization: `Bearer ${token}`,
// //                         },
// //                     }
// //                 );

// //                 toast.success("Address added");
// //             }

// //             navigate("/profile");
// //         } catch (error) {
// //             console.log(error);

// //             toast.error(
// //                 error.response?.data?.message || "Failed to save address"
// //             );
// //         }
// //     };

// //     return (
// //         <div className="min-h-[calc(100vh-80px)] bg-gray-100 px-4 py-6">

// //             <div className="max-w-6xl mx-auto flex gap-5 items-start">

// //                 {/* ================= SIDEBAR ================= */}

// //                 <div className="w-64 bg-white rounded-2xl shadow-md p-5 flex-shrink-0">

// //                     {/* Profile */}
// //                     <div className="text-center mb-5">

// //                         <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-2xl font-bold text-gray-700">
// //                             {user?.name?.charAt(0)?.toUpperCase()}
// //                         </div>

// //                         <h2 className="font-bold text-lg mt-2">
// //                             {user?.name}
// //                         </h2>

// //                         <p className="text-gray-500 text-xs truncate">
// //                             {user?.email}
// //                         </p>

// //                     </div>

// //                     {/* Menu */}
// //                     <div className="space-y-2">

// //                         <button
// //                             onClick={() => navigate("/profile")}
// //                             className="w-full text-left px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition"
// //                         >
// //                             👤 Account Info
// //                         </button>

// //                         <button
// //                             className="w-full text-left px-4 py-2.5 rounded-lg text-sm bg-black text-white"
// //                         >
// //                             📍 Add Address
// //                         </button>

// //                         <button
// //                             className="w-full text-left px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition"
// //                         >
// //                             📦 My Orders
// //                         </button>

// //                         <button
// //                             onClick={() => navigate("/change-password")}
// //                             className="w-full text-left px-4 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition"
// //                         >
// //                             🔒 Change Password
// //                         </button>

// //                     </div>

// //                 </div>

// //                 {/* ================= FORM ================= */}

// //                 <div className="flex-1 bg-white rounded-2xl shadow-md p-6">

// //                     <div className="mb-5">

// //                         <h1 className="text-2xl font-bold text-gray-800">
// //                             {id ? "Edit Address" : "Add New Address"}
// //                         </h1>

// //                         <p className="text-sm text-gray-500 mt-1">
// //                             {id
// //                                 ? "Update your delivery address"
// //                                 : "Add a delivery address for your orders"}
// //                         </p>

// //                     </div>

// //                     <form
// //                         onSubmit={handleSubmit}
// //                         className="grid grid-cols-1 md:grid-cols-2 gap-4"
// //                     >

// //                         {/* Full Name */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Full Name
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter full name"
// //                                 value={formData.fullName}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         fullName: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* Phone */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Phone Number
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter phone number"
// //                                 value={formData.phone}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         phone: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* House */}
// //                         <div className="md:col-span-2">
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 House Name
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter house name"
// //                                 value={formData.house}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         house: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* City */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 City
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter city"
// //                                 value={formData.city}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         city: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* State */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 State
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter state"
// //                                 value={formData.state}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         state: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* Pincode */}
// //                         <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Pincode
// //                             </label>

// //                             <input
// //                                 type="text"
// //                                 placeholder="Enter pincode"
// //                                 value={formData.pincode}
// //                                 onChange={(e) =>
// //                                     setFormData({
// //                                         ...formData,
// //                                         pincode: e.target.value,
// //                                     })
// //                                 }
// //                                 className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                             />
// //                         </div>

// //                         {/* Buttons */}
// //                         <div className="md:col-span-2 flex gap-3 pt-2">

// //                             <button
// //                                 type="button"
// //                                 onClick={() => navigate("/profile")}
// //                                 className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
// //                             >
// //                                 Cancel
// //                             </button>

// //                             <button
// //                                 type="submit"
// //                                 className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
// //                             >
// //                                 {id
// //                                     ? "Update Address"
// //                                     : "Save Address"}
// //                             </button>

// //                         </div>

// //                     </form>

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default AddAddress;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// function AddAddress() {
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         house: "",
//         city: "",
//         state: "",
//         pincode: ""
//     });

//     // =========================
//     // Get Address for Edit
//     // =========================

//     useEffect(() => {
//         if (id) {
//             const getAddress = async () => {
//                 try {
//                     const token = localStorage.getItem("token");

//                     const res = await axios.get(
//                         `http://localhost:5000/api/user/address/${id}`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`
//                             }
//                         }
//                     );

//                     setFormData(res.data);

//                 } catch (error) {
//                     console.log(error);

//                     toast.error(
//                         error.response?.data?.message ||
//                         "Failed to load address"
//                     );
//                 }
//             };

//             getAddress();
//         }
//     }, [id]);


//     // =========================
//     // Handle Input
//     // =========================

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };


//     // =========================
//     // Submit
//     // =========================

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem("token");

//             // Validation
//             if (
//                 !formData.fullName ||
//                 !formData.phone ||
//                 !formData.house ||
//                 !formData.city ||
//                 !formData.state ||
//                 !formData.pincode
//             ) {
//                 toast.error("Please fill all fields");
//                 return;
//             }


//             // =========================
//             // Update Address
//             // =========================

//             if (id) {

//                 await axios.put(
//                     `http://localhost:5000/api/user/update-address/${id}`,
//                     formData,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 toast.success("Address updated successfully");

//             }

//             // =========================
//             // Add Address
//             // =========================

//             else {

//                 await axios.post(
//                     "http://localhost:5000/api/user/add-address",
//                     formData,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     }
//                 );

//                 toast.success("Address added successfully");
//             }


//             // Go back to profile
//             navigate("/profile");

//         } catch (error) {

//             console.log(error);

//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to save address"
//             );
//         }
//     };


//     return (
//         <div className="min-h-screen bg-gray-50 py-10 px-4">

//             <div className="max-w-2xl mx-auto">

//                 {/* =========================
//                     Header
//                 ========================= */}

//                 <div className="mb-6">

//                     <button
//                         onClick={() => navigate("/profile")}
//                         className="text-gray-600 hover:text-blue-600 flex items-center gap-2 mb-5 transition"
//                     >
//                         ← Back to Profile
//                     </button>

//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//                         {id ? "Edit Address" : "Add New Address"}
//                     </h1>

//                     <p className="text-gray-500 mt-2">
//                         {id
//                             ? "Update your delivery address details."
//                             : "Add a delivery address for faster checkout."
//                         }
//                     </p>

//                 </div>


//                 {/* =========================
//                     Form Card
//                 ========================= */}

//                 <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">

//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-5"
//                     >

//                         {/* Full Name */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Full Name
//                             </label>

//                             <input
//                                 type="text"
//                                 name="fullName"
//                                 placeholder="Enter full name"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* Phone */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Phone Number
//                             </label>

//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="Enter phone number"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* House */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 House Name
//                             </label>

//                             <input
//                                 type="text"
//                                 name="house"
//                                 placeholder="Enter house name"
//                                 value={formData.house}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* City */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 City
//                             </label>

//                             <input
//                                 type="text"
//                                 name="city"
//                                 placeholder="Enter city"
//                                 value={formData.city}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* State */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 State
//                             </label>

//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder="Enter state"
//                                 value={formData.state}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* Pincode */}

//                         <div>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Pincode
//                             </label>

//                             <input
//                                 type="text"
//                                 name="pincode"
//                                 placeholder="Enter pincode"
//                                 value={formData.pincode}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                             />

//                         </div>


//                         {/* Buttons */}

//                         <div className="flex gap-3 pt-3">

//                             <button
//                                 type="button"
//                                 onClick={() => navigate("/profile")}
//                                 className="w-1/3 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 type="submit"
//                                 className="w-2/3 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm"
//                             >
//                                 {id
//                                     ? "Update Address"
//                                     : "Save Address"
//                                 }
//                             </button>

//                         </div>

//                     </form>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default AddAddress;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function AddAddress() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        house: "",
        city: "",
        state: "",
        pincode: ""
    });

    useEffect(() => {
        if (id) {
            const getAddress = async () => {
                try {
                    const token = localStorage.getItem("token");

                    const res = await axios.get(
                        `http://localhost:5000/api/user/address/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    setFormData(res.data);

                } catch (error) {
                    console.log(error);

                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load address"
                    );
                }
            };

            getAddress();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (
                !formData.fullName ||
                !formData.phone ||
                !formData.house ||
                !formData.city ||
                !formData.state ||
                !formData.pincode
            ) {
                toast.error("Please fill all fields");
                return;
            }

            if (id) {
                await axios.put(
                    `http://localhost:5000/api/user/update-address/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Address updated successfully");

            } else {
                await axios.post(
                    "http://localhost:5000/api/user/add-address",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Address added successfully");
            }

            navigate("/profile");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to save address"
            );
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-6 flex items-center justify-center">

            <div className="w-full max-w-6xl">

                {/* Header */}

                <div className="mb-4">

                    <button
                        onClick={() => navigate("/profile")}
                        className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-2 transition"
                    >
                        ← Back to Profile
                    </button>

                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {id ? "Edit Address" : "Add New Address"}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        {id
                            ? "Update your delivery address."
                            : "Add an address for faster checkout."
                        }
                    </p>

                </div>


                {/* Form */}

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 md:p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        {/* Full Name */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Phone */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* House */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                House Name
                            </label>

                            <input
                                type="text"
                                name="house"
                                placeholder="Enter house name"
                                value={formData.house}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* City */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* State */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                placeholder="Enter state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Pincode */}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Enter pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        {/* Buttons */}

                        <div className="md:col-span-2 flex gap-3 pt-2">

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="w-1/3 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="w-2/3 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                {id
                                    ? "Update Address"
                                    : "Save Address"
                                }
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddAddress;