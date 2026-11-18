import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {MdEmail} from "react-icons/md";
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem("adminToken");

        if(token){
            navigate("/admin/dashboard",{replace: true});
        }
    },[navigate]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try{

    //     const response = await fetch("http://localhost:5000/api/admin/login",{
    //         method:"POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({  
    //             email,
    //             password,
    //         }),
    //     });
    //     const data = await response.json();

    //     localStorage.setItem("adminToken", data.token);

    //     navigate("/admin/dashboard");

    //     toast.success("Admin Login Success");

    //     console.log(data);
    //   } catch(error){ 
    //     toast.error("Admin Login Failed");
    //   }
    // };


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error(data.message || "Admin Login Failed");
            return;
        }

        if (!data.token) {
            toast.error("Login token was not received");
            return;
        }

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("userType", "admin");

        toast.success("Admin Login Success");
        navigate("/admin/dashboard");

    } catch (error) {
        console.error("Admin login error:", error);
        toast.error("Server connection failed");
    }
};


return (
  <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800 px-4 py-10">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="bg-gradient-to-br from-black to-cyan-700 text-white flex flex-col items-center justify-center p-16 min-h-[550px]">

        <h1 className="text-5xl font-bold mb-4">
          Admin Portal
        </h1>

        <p className="text-lg text-center text-cyan-100 mb-8">
          Secure Administrator Access
        </p>

        <div className="space-y-3 text-lg">
          <p>✓ Manage Products</p>
          <p>✓ Manage Orders</p>
          <p>✓ Manage Users</p>
        </div>

      </div>

      {/* Right Side */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center p-16"
      >

        <h2 className="text-4xl font-bold text-center text-cyan-900 mb-10">
          Admin Login
        </h2>

        <div className="flex items-center border rounded-lg p-4 mb-4">
          <MdEmail />
          <input
            type="email"
            placeholder="Admin Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-3 outline-none w-full text-lg"
          />
        </div>

        <div className="flex items-center border rounded-lg p-4 mb-6">
          <FaLock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-3 outline-none w-full text-lg"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white py-4 rounded-lg text-lg font-semibold hover:bg-cyan-900 transition"
        >
          Login
        </button>

        <Link
          to="/admin/forgot-password"
          onClick={() => localStorage.setItem("userType", "admin")}
          className="text-center mt-6 text-cyan-700 hover:underline"
        >
          Forgot Password?
        </Link>

      </form>

    </div>

  </div>
);
}

export default AdminLogin;