import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const userType = localStorage.getItem("userType");

    //         const url = userType === "admin" ? "http://localhost:5000/api/admin/forgot-password" : "http://localhost:5000/api/auth/forgot-password";

    //         const res = await axios.post(url,{email});

    //         toast.success(res.data.message);
    //         localStorage.setItem("verifyEmail",email);
    //         localStorage.setItem("otpType","forgot-password");
    //         navigate("/verify-otp");
    //     } catch (error) {
    //         toast.error(error.response?.data?.message);
    //     }
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const isAdmin = window.location.pathname.startsWith("/admin/");

        const url = isAdmin
            ? "http://localhost:5000/api/admin/forgot-password"
            : "http://localhost:5000/api/auth/forgot-password";

        const res = await axios.post(url, { email });

        toast.success(res.data.message);

        localStorage.setItem("verifyEmail", email);
        localStorage.setItem(
            "otpType",
            isAdmin ? "admin-forgot-password" : "forgot-password"
        );

        navigate(
            isAdmin ? "/admin/verify-otp" : "/verify-otp"
        );
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Something went wrong"
        );
    }
};


    return (
  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16 min-h-[550px]">

        <h1 className="text-5xl font-bold mb-4">
          Forgot Password?
        </h1>

        <p className="text-lg text-gray-200 text-center mb-8">
          No worries! Enter your email address and we'll send you an OTP to reset your password.
        </p>

        <Link
          to="/login"
          className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-blue-700 transition"
        >
          Back to Login
        </Link>

      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center p-16">

        <h2 className="text-4xl font-bold text-center mb-10">
          Send OTP
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="flex items-center border rounded-lg p-4 mb-6">
            <MdEmail />
            <input
              type="email"
              placeholder="Enter Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-3 outline-none w-full text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

        </form>

      </div>

    </div>

  </div>
);
}


export default ForgotPassword;