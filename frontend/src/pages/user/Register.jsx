import { useState } from "react";
import axios from "axios";
import {FaEye, FaEyeSlash, FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate();

    
    

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        
        try{
            localStorage.setItem("userType","user");
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);

            toast.success(`OTP: ${res.data.otp}`);

            console.log(res.data);
            toast.success("Registration Successful");

            localStorage.setItem("verifyEmail",formData.email);
        localStorage.setItem("otpType","register");
        navigate("/verify-otp");

        
        } catch (error) {
            console.log(error.response?.data);
            toast.error("Registration Failed");
            toast.error(error.response?.data?.message);
            
        }

        
        
    };

return (

  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10"><div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

  {/* Left Side */}

  <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16 min-h-[100px]">

    <h1 className="text-5xl font-bold mb-4">
      Get Started
    </h1>

    <p className="text-lg text-gray-200 mb-8">
      Already have an account?
    </p>

    <Link
      to="/login"
      className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-blue-700 transition"
    >
      Log In
    </Link>

  </div>

  {/* Right Side */}

  <form
    onSubmit={handleSubmit}
    className="flex flex-col justify-center p-16"
  >

    <h2 className="text-4xl font-bold text-center mb-10">
      Create Account
    </h2>

    <div className="flex items-center border rounded-lg p-4 mb-4">
      <FaUser />
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        onChange={handleChange}
        className="ml-3 outline-none w-full text-lg"
      />
    </div>

    <div className="flex items-center border rounded-lg p-4 mb-4">
      <MdEmail />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        onChange={handleChange}
        className="ml-3 outline-none w-full text-lg"
      />
    </div>

    <div className="flex items-center border rounded-lg p-4 mb-4">
      <FaLock />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        required
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
        placeholder="Confirm Password"
        required
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
      className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
    >
      Sign Up
    </button>

  </form>

</div>

  </div>
);

}

export default Register;