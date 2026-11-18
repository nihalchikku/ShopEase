import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Coupons() {

    const navigate = useNavigate();

    const [coupons, setCoupons] = useState([]);


    const fetchCoupons = async () => {

        try {

            const token = localStorage.getItem("adminToken");

            const res = await axios.get(
                "http://localhost:5000/api/coupons",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCoupons(res.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load coupons");
        }
    };


    const handleDelete = async (id) => {

        try {

            const token = localStorage.getItem("adminToken");

            await axios.delete(
                `http://localhost:5000/api/coupons/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Coupon deleted successfully");

            fetchCoupons();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete coupon"
            );
        }
    };


    useEffect(() => {
        fetchCoupons();
    }, []);


    return (
        <div className="max-w-7xl mx-auto mt-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Coupons
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage discount coupons
                    </p>

                </div>


                <button
                    onClick={() => navigate("/admin/coupons/add")}
                    className="bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-lg font-semibold"
                >
                    + Add Coupon
                </button>

            </div>


            {/* Coupon Table */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-900 text-white">

                            <tr>

                                <th className="px-5 py-4">
                                    Code
                                </th>

                                <th className="px-5 py-4">
                                    Discount
                                </th>

                                <th className="px-5 py-4">
                                    Min Amount
                                </th>

                                <th className="px-5 py-4">
                                    Expiry
                                </th>

                                <th className="px-5 py-4">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {coupons.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-12 text-gray-500"
                                    >
                                        No coupons found
                                    </td>

                                </tr>

                            ) : (

                                coupons.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="px-5 py-4">

                                            <span className="font-bold text-gray-800">
                                                {item.code}
                                            </span>

                                        </td>


                                        <td className="px-5 py-4">

                                            <span className="font-semibold">
                                                {item.discount}%
                                            </span>

                                        </td>


                                        <td className="px-5 py-4">
                                            ₹{item.minAmount}
                                        </td>


                                        <td className="px-5 py-4">

                                            {new Date(
                                                item.expiryDate
                                            ).toLocaleDateString()}

                                        </td>


                                        <td className="px-5 py-4">

                                            {item.isActive ? (

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    Active
                                                </span>

                                            ) : (

                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    Inactive
                                                </span>

                                            )}

                                        </td>


                                        <td className="px-5 py-4">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/coupons/edit/${item._id}`
                                                        )
                                                    }
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Coupons;