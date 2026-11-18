import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const email = localStorage.getItem("verifyEmail");

    console.log("EMAIL:",email);
    console.log("OTP:",otp);
    console.log("OTP TYPE:",localStorage.getItem("otpType"));

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const userType = localStorage.getItem("userType");

    //         let url;

    //         if(userType === "admin"){
    //             url = "http://localhost:5000/api/admin/verify-otp";
    //         } else {
    //             url = "http://localhost:5000/api/auth/verify-otp";
    //         }
    //         console.log("USER TYPE:",userType);
    //         console.log("URL:",url);
    //         const res = await axios.post(
    //             url,
    //             {
    //                 email,
    //                 otp,
    //                 type:
    //                 localStorage.getItem("otpType"),
                    
    //             }
    //         );

    //         console.log(res.data);
            
    //         toast.success(res.data.message);
    //         localStorage.getItem("verifyEmail",email);
    //         const otpType =
    //         localStorage.getItem("otpType");

    //         if(otpType === "register"){
    //             navigate("/login");
    //         }

    //         if(otpType === "forgot-password"){
    //             navigate("/reset-password");
    //         }
            
    //         // navigate("/reset-password");
    //     } catch (error) {
    //         toast.error(error.response?.data?.message);
    //     }
    // };


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const isAdmin = window.location.pathname.startsWith("/admin/");
        const otpType = localStorage.getItem("otpType");

        const url = isAdmin
            ? "http://localhost:5000/api/admin/verify-otp"
            : "http://localhost:5000/api/auth/verify-otp";

        const res = await axios.post(url, {
            email,
            otp,
            type: otpType,
        });

        toast.success(res.data.message);

        if (otpType === "register") {
            navigate("/login");
        } else if (otpType === "forgot-password") {
            navigate("/reset-password");
        } else if (otpType === "admin-forgot-password") {
            navigate("/admin/reset-password");
        }

    } catch (error) {
        toast.error(
            error.response?.data?.message || "OTP verification failed"
        );
    }
};
    const handleResend= async () => {
        try {
            const userType = localStorage.getItem("userType");

            const url = userType === "admin" ? "http://localhost:5000/api/admin/resend-otp" : "http://localhost:5000/api/auth/resend-otp";
            const res = await axios.post(
                url,
                {
                    email,
                    type: localStorage.getItem("otpType")
                }
            );

            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16 min-h-[550px]">

        <h1 className="text-5xl font-bold mb-4">
          Verify OTP
        </h1>

        <p className="text-lg text-gray-200 text-center mb-8">
          Enter the verification code sent to your email to continue.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center p-16">

        <h2 className="text-4xl font-bold text-center mb-4">
          OTP Verification
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter the 6-digit OTP
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            required
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg p-4 text-lg mb-6 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="w-full mt-4 text-blue-600 font-semibold hover:underline"
          >
            Resend Code
          </button>

        </form>

      </div>

    </div>

  </div>
);
}

export default VerifyOtp;