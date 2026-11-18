import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState("");


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        getProfile();
    },[]);

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("TOKEN:",token);
            const res = await axios.get("http://localhost:5000/api/user/profile",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };


//     return (

//   <div className="min-h-screen bg-gray-100 py-10">

//     <div className="max-w-7xl mx-auto flex gap-6">

//       {/* Sidebar
//       <div className="w-72 bg-white rounded-xl shadow-lg p-6 h-fit">

//         <div className="text-center mb-6">
//           <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto flex items-center justify-center text-3xl font-bold">
//             {user?.name?.charAt(0)}
//           </div>

//           <h2 className="font-bold text-xl mt-3">
//             {user?.name}
//           </h2>

//           <p className="text-gray-500 text-sm">
//             {user?.email}
//           </p>
//         </div>

//         <div className="space-y-3">

//           <button className="w-full bg-black text-white p-3 rounded-lg">
//             Account Info
//           </button>

//           <button onClick={() => navigate("/add-address")}
//            className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//             Add Address
//           </button>

//           <button className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//             My Orders
//           </button> 

//           <button
//             onClick={() => navigate("/wallet")}
//             className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
//           >
//           💰 Wallet
//           </button>

//           <button onClick={() => navigate("/change-password")}
//           className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
//             Change Password
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>

//         </div>
//       </div> */}

//       {/* Profile Sidebar */}
// <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">

//   {/* Top Gradient Section */}
//   <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-6 pt-7 pb-10 text-white">

//     {/* Avatar */}
//     <div className="flex justify-center">
//       <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center shadow-lg">

//         <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">
//           {user?.name?.charAt(0)?.toUpperCase()}
//         </div>

//       </div>
//     </div>

//     {/* User Name */}
//     <div className="text-center mt-4">

//       <h2 className="text-2xl font-bold">
//         {user?.name}
//       </h2>

//       <p className="text-blue-100 text-sm mt-1 break-all">
//         {user?.email}
//       </p>

//     </div>

//     {/* Verified Badge */}
//     <div className="flex justify-center mt-4">

//       <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">

//         <span className="w-2 h-2 bg-green-300 rounded-full"></span>

//         Verified Account

//       </span>

//     </div>

//   </div>


//   {/* Account Overview */}
//   <div className="px-6 -mt-5">

//     <div className="bg-white rounded-xl border border-gray-100 shadow-md p-4">

//       <div className="flex items-center justify-between">

//         <div>
//           <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
//             Account Status
//           </p>

//           <p className="text-sm font-semibold text-gray-800 mt-1">
//             Active
//           </p>
//         </div>

//         <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
//           <span className="text-green-600 text-lg">
//             ✓
//           </span>
//         </div>

//       </div>

//     </div>

//   </div>


//   {/* Quick Information */}
//   <div className="px-6 py-6">

//     <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
//       Account Overview
//     </p>


//     {/* Profile */}
//     <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">

//       <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
//         👤
//       </div>

//       <div className="flex-1">

//         <p className="text-sm font-semibold text-gray-800">
//           My Profile
//         </p>

//         <p className="text-xs text-gray-500">
//           Personal information
//         </p>

//       </div>

//       <span className="text-gray-400">
//         →
//       </span>

//     </div>


//     {/* Address */}
//     <div className="flex items-center gap-3 p-3 rounded-xl mt-3 bg-gray-50">

//       <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
//         📍
//       </div>

//       <div className="flex-1">

//         <p className="text-sm font-semibold text-gray-800">
//           Saved Addresses
//         </p>

//         <p className="text-xs text-gray-500">
//           {user?.addresses?.length || 0} address
//           {(user?.addresses?.length || 0) !== 1 ? "es" : ""}
//         </p>

//       </div>

//       <span className="text-gray-400">
//         →
//       </span>

//     </div>


//     {/* Security */}
//     <div className="flex items-center gap-3 p-3 rounded-xl mt-3 bg-gray-50">

//       <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
//         🔒
//       </div>

//       <div className="flex-1">

//         <p className="text-sm font-semibold text-gray-800">
//           Account Security
//         </p>

//         <p className="text-xs text-gray-500">
//           Your account is protected
//         </p>

//       </div>

//       <span className="text-green-500 text-sm">
//         ●
//       </span>

//     </div>


//     {/* Help */}
//     <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">

//       <div className="flex gap-3">

//         <div className="text-xl">
//           💬
//         </div>

//         <div>

//           <p className="text-sm font-semibold text-blue-900">
//             Need Help?
//           </p>

//           <p className="text-xs text-blue-600 mt-1 leading-5">
//             We're here to help you with your ShopEase account.
//           </p>

//         </div>

//       </div>

//     </div>

//   </div>

// </div>

//       {/* Main Content */}
//       <div className="flex-1">

//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-6 border">

//           <h1 className="text-3xl font-bold mb-4">
//             Account Information
//           </h1>

//           <div className="space-y-2">
//             <p>
//               <span className="font-semibold">Name:</span>{" "}
//               {user?.name}
//             </p>

//             <p>
//               <span className="font-semibold">Email:</span>{" "}
//               {user?.email}
//             </p>
//           </div>

//         </div>

//         {/* Address Header */}
//         <div className="flex justify-between items-center mb-4">

//           <h2 className="text-2xl font-bold">
//             My Addresses
//           </h2>

//           <button
//             onClick={() => navigate("/add-address")}
//             className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
//           >
//             Add Address
//           </button>

//         </div>

//         {/* Address List */}
//         <div className="space-y-4">

//           {user?.addresses?.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md border p-5"
//             >
//               <h3 className="font-bold text-lg mb-2">
//                 {item.fullName}
//               </h3>

//               <p>{item.phone}</p>
//               <p>{item.house}</p>
//               <p>{item.city}</p>
//               <p>{item.state}</p>
//               <p>{item.pincode}</p>

//               <button onClick={() => navigate(`/add-address/${item._id}`)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//                 Edit Address
//               </button>
//             </div>
//           ))}

//         </div>

//       </div>

//     </div>

//   </div>

//     );




return (
  <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5 sm:py-8">
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Profile Sidebar */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mt-4 break-words max-w-full">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-500 text-sm break-all mt-1">
              {user?.email || ""}
            </p>

            <span className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              ✓ Verified Account
            </span>
          </div>

          <div className="mt-6 border-t pt-5">
            <h3 className="font-semibold text-gray-800 mb-3">
              Account Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">

              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="text-left p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
              >
                <p className="font-semibold text-blue-700">
                  My Profile
                </p>
                <p className="text-sm text-gray-500">
                  Personal information
                </p>
              </button>

              {/* Saved Addresses - Count Only */}
              <div className="text-left p-3 rounded-xl bg-purple-50">
                <p className="font-semibold text-purple-700">
                  Saved Addresses
                </p>
                <p className="text-sm text-gray-500">
                  {user?.addresses?.length || 0} address
                  {(user?.addresses?.length || 0) !== 1 ? "es" : ""} saved
                </p>
              </div>

              <button
                onClick={() => navigate("/change-password")}
                className="text-left p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
              >
                <p className="font-semibold text-orange-700">
                  Account Security
                </p>
                <p className="text-sm text-gray-500">
                  Change your password
                </p>
              </button>

            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold py-3 rounded-xl transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Account Information
            </h2>

            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
              Active Account
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 min-w-0">
              <p className="text-sm text-gray-500 mb-1">
                Full Name
              </p>
              <p className="font-semibold text-gray-800 break-words">
                {user?.name || "Not available"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 min-w-0">
              <p className="text-sm text-gray-500 mb-1">
                Email Address
              </p>
              <p className="font-semibold text-gray-800 break-all">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* My Addresses */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              My Addresses
            </h2>

            <button
              onClick={() => navigate("/add-address")}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              + Add Address
            </button>
          </div>

          {user?.addresses?.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {user.addresses.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 sm:p-5 hover:shadow-md transition min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg break-words">
                        {item.fullName}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2 break-words">
                        {item.house}
                      </p>

                      <p className="text-gray-600 text-sm break-words">
                        {item.city}, {item.state}
                      </p>

                      <p className="text-gray-600 text-sm">
                        PIN: {item.pincode}
                      </p>

                      <p className="text-gray-600 text-sm mt-2 break-words">
                        Phone: {item.phone}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/add-address/${item._id}`)
                      }
                      className="w-full sm:w-auto shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-10 bg-gray-50 rounded-xl">
              <p className="text-gray-500">
                No addresses saved yet.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Add an address for a faster checkout.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);



}

export default Profile;