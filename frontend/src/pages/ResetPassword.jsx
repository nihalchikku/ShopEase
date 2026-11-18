import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function ResetPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if(formData.newPassword !== formData.confirmPassword){
    //         toast.error("Passwords do not match");
    //         return;
    //     }

    //     const email = localStorage.getItem("verifyEmail");
    //     console.log("Email:",email);

    //     try {
    //         const userType = localStorage.getItem("userType");

    //         const url = userType === "admin" ? "http://localhost:5000/api/admin/reset-password" : "http://localhost:5000/api/auth/reset-password";
    //         const res = await axios.post(
    //             url,
    //             {
    //                 email,
    //                 newPassword: formData.newPassword,
    //             }
    //         );

    //         toast.success(res.data.message);
    //         localStorage.setItem("resetEmail",email);
    //         if(userType === "admin"){
    //             navigate("/admin/login");
    //         } else {
    //             navigate("/login");
    //         }
            
    //         // navigate("/login");
    //     } catch (error) {
    //         // alert(error.response?.data?.message);
    //         console.log(error);
    //         toast.error(error.message);
    //     }
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    if (formData.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    const email = localStorage.getItem("verifyEmail");

    if (!email) {
        toast.error("Email not found. Please try again.");
        return;
    }

    try {
        const isAdmin = window.location.pathname.startsWith("/admin/");
        
        const url = isAdmin
            ? "http://localhost:5000/api/admin/reset-password"
            : "http://localhost:5000/api/auth/reset-password";

        const res = await axios.post(url, {
            email,
            newPassword: formData.newPassword,
        });

        toast.success(res.data.message || "Password reset successful");

        localStorage.removeItem("verifyEmail");
        localStorage.removeItem("otpType");

        navigate(isAdmin ? "/admin/login" : "/login");

    } catch (error) {
        toast.error(
            error.response?.data?.message || "Password reset failed"
        );
        console.log(error.response?.data || error.message);
    }
};

    return (
  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16 min-h-[550px]">

        <h1 className="text-5xl font-bold mb-4">
          Reset Password
        </h1>

        <p className="text-lg text-gray-200 text-center mb-8">
          Create a strong new password to keep your account secure.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center p-16">

        <h2 className="text-4xl font-bold text-center mb-8">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="flex items-center border rounded-lg p-4 mb-6">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              required
              placeholder="New Password"
              onChange={handleChange}
              className="ml-3 outline-none w-full text-lg"
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-center border rounded-lg p-4 mb-6">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              onChange={handleChange}
              className="ml-3 outline-none w-full text-lg"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default ResetPassword;