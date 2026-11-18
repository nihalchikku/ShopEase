// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {FaEye, FaEyeSlash} from "react-icons/fa";


// function ChangePassword(){

//     const navigate = useNavigate();


//     const [formData, setFormData] = useState({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     });

//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
//     const [user, setUser] = useState("");


//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]:
//             e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if(formData.newPassword !== formData.confirmPassword){
//             toast.error("Password do not match");
//             return;
//         }
//         try{
//             const token = localStorage.getItem("token");

//             const res = await axios.put(
//                 "http://localhost:5000/api/auth/change-password",
//                 {
//                     currentPassword:
//                     formData.currentPassword,
//                     newPassword:
//                     formData.newPassword,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             toast.success(res.data.message);

//             setFormData({
//                 currentPassword: "",
//                 newPassword: "",
//                 confirmPassword: "",
//             });
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Something went wrong"
//             );
//         }
//     };

//     useEffect(() => {
//         getProfile();
//     },[]);

//     const getProfile = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             console.log("TOKEN:",token);
//             const res = await axios.get("http://localhost:5000/api/user/profile",{
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setUser(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return(

//         <div className="min-h-screen bg-gray-100 py-10">
//             <div className="max-w-7xl mx-auto flex gap-6">

//                 <div className="w-72 bg-white rounded-xl shadow-lg p-6 h-fit">

//                 <div className="text-center mb-6">
//                 <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-3xl font-bold">
//                     {user?.name?.charAt(0)}
//                 </div>

//                 <h2 className="font-bold text-xl mt-3">
//                     {user?.name}
//                 </h2>

//                 <p className="text-gray-500 text-sm">
//                     {user?.email}
//                 </p>
//                 </div>

//                 <div className="space-y-3">

//                 <button onClick={() => navigate("/profile")}
//                  className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//                     Account Info
//                 </button>

//                 <button onClick={() => navigate("/add-address")}
//                  className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//                     Add Address
//                 </button>

//                 <button className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//                     My Orders
//                 </button> 

//                 <button onClick={() => navigate("/change-password")}
//                 className="w-full bg-black text-white p-3 rounded-lg">
//                     Change Password
//                 </button>

//                 {/* <button
//                     onClick={handleLogout}
//                     className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
//                 >
//                     Logout
//                 </button> */}

//                 </div>
//             </div>
                
//                 <div className="w-144 bg-white rounded-xl shadow-lg p-6 pt-5 h-fit flex-1 border">
//                     <h2 className="text-3xl font-bold mb-6 text-center pt-5">Change Password</h2>
//                     <br />
//                     <br />
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="relative">
//                             <input type={showCurrentPassword ? "text" : "password"}
//                             name="currentPassword"
//                             placeholder="Current Password" value={formData.currentPassword}
//                             onChange={handleChange} className="w-full border p-3 rounded-lg pr-10" />
//                             <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 z-10">{showCurrentPassword ?
//                                     <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
                        
                        
//                         <div className="relative">
//                             <input type={showNewPassword ? "text" : "password"}
//                             name="newPassword"
//                             placeholder="New Password" value={formData.newPassword} onChange={handleChange}
//                             className="w-full border p-3 rounded-lg pr-10" />
//                             <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 z-10">{showNewPassword ?
//                                     <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
                        
                        

//                         <div className="relative">
//                             <input type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
//                             className="w-full border p-3 rounded-lg pr-10" />
//                             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 z-10">{showConfirmPassword ?
//                                     <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>

//                         <br />

//                         <button type="submit"
//                         className="w-full bg-black text-white p-3 rounded-lg">
//                             Change Password
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default ChangePassword;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    // =========================
    // Handle Input
    // =========================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // =========================
    // Change Password
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Check password match
        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            toast.error("Passwords do not match");
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            const res = await axios.put(
                "http://localhost:5000/api/auth/change-password",
                {
                    currentPassword:
                        formData.currentPassword,

                    newPassword:
                        formData.newPassword,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            toast.success(res.data.message);


            // Clear form

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


    return (

        <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-6 flex items-center justify-center">

            <div className="w-full max-w-5xl">


                {/* =========================
                    Header
                ========================= */}

                <div className="mb-4">

                    <button
                        onClick={() => navigate("/profile")}
                        className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-2 transition"
                    >
                        ← Back to Profile
                    </button>


                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Change Password
                    </h1>


                    <p className="text-sm text-gray-500 mt-1">
                        Update your password to keep your account secure.
                    </p>

                </div>



                {/* =========================
                    Password Card
                ========================= */}

                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 md:p-6">


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >


                        {/* Current Password */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Current Password
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }

                                    name="currentPassword"

                                    placeholder="Enter current password"

                                    value={
                                        formData.currentPassword
                                    }

                                    onChange={handleChange}

                                    className="w-full border border-gray-300 px-3 py-2.5 pr-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }

                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >

                                    {showCurrentPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>



                        {/* New Password */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                New Password
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }

                                    name="newPassword"

                                    placeholder="Enter new password"

                                    value={
                                        formData.newPassword
                                    }

                                    onChange={handleChange}

                                    className="w-full border border-gray-300 px-3 py-2.5 pr-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }

                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >

                                    {showNewPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>



                        {/* Confirm Password */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Confirm New Password
                            </label>


                            <div className="relative">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }

                                    name="confirmPassword"

                                    placeholder="Confirm new password"

                                    value={
                                        formData.confirmPassword
                                    }

                                    onChange={handleChange}

                                    className="w-full border border-gray-300 px-3 py-2.5 pr-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }

                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                >

                                    {showConfirmPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>



                        {/* Buttons */}

                        <div className="flex gap-3 pt-2">


                            <button
                                type="button"

                                onClick={() =>
                                    navigate("/profile")
                                }

                                className="w-1/3 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"

                                className="w-2/3 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Change Password
                            </button>

                        </div>

                    </form>

                </div>


                {/* Security Note */}

                <div className="mt-4 text-center">

                    <p className="text-xs text-gray-400">
                        🔒 Your password is securely protected.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChangePassword;