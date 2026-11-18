import {useState} from "react";
import axios from "axios";
import {MdEmail} from "react-icons/md";
import {FaLock} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function Login() {

    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        name:"",
        password:"",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/auth/login",formData);

            localStorage.setItem("token",res.data.token);

            
    
            // navigate("/profile");
            // navigate("/");

            toast.success("Login Successful");

            window.location.href = "/";
            
            

          } catch (error) {
              console.log(error.response?.data);
              toast.error("Login Failed");
          }
    };


    
    
    return (
  <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-4 py-10">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center p-16 min-h-[550px]">

        <h1 className="text-5xl font-bold mb-4">
          Welcome Back
        </h1>

        <p className="text-lg text-gray-200 mb-8">
          Don't have an account?
        </p>

        <Link
          to="/register"
          className="border-2 border-white px-10 py-3 rounded-full hover:bg-white hover:text-blue-700 transition"
        >
          Register
        </Link>

      </div>

      {/* Right Side */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center p-16"
      >

        <h2 className="text-4xl font-bold text-center mb-10">
          Login
        </h2>

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

        <div className="flex items-center border rounded-lg p-4 mb-6">
          <FaLock />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <Link
          to="/forgot-password"
          onClick={() => localStorage.setItem("userType", "user")}
          className="text-center mt-6 text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

      </form>

    </div>

  </div>
);
}

export default Login; 