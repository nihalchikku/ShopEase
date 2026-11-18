import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddCoupon() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        code: "",
        discount: "",
        minAmount: "",
        expiryDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("adminToken");

            if (!formData.code.trim()) {
                toast.error("Coupon code is required");
                return;
            }

            if (!formData.discount || Number(formData.discount) <= 0) {
                toast.error("Enter a valid discount");
                return;
            }

            if (Number(formData.discount) > 100) {
                toast.error("Discount cannot exceed 100%");
                return;
            }

            if (!formData.minAmount || Number(formData.minAmount) < 0) {
                toast.error("Enter a valid minimum amount");
                return;
            }

            if (!formData.expiryDate) {
                toast.error("Expiry date is required");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/coupons",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Coupon added successfully");

            navigate("/admin/coupons");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Add New Coupon
                </h1>

                <p className="text-gray-500 mt-1">
                    Create a discount coupon for your customers
                </p>

            </div>


            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >

                    {/* Coupon Code */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Coupon Code
                        </label>

                        <input
                            type="text"
                            placeholder="WELCOME10"
                            value={formData.code}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    code: e.target.value.toUpperCase(),
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Discount */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Discount (%)
                        </label>

                        <input
                            type="number"
                            placeholder="10"
                            value={formData.discount}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    discount: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Minimum Amount */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Minimum Order Amount
                        </label>

                        <input
                            type="number"
                            placeholder="500"
                            value={formData.minAmount}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    minAmount: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Expiry */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Expiry Date
                        </label>

                        <input
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    expiryDate: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="md:col-span-2 flex gap-3 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/coupons")}
                            className="w-1/2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold"
                        >
                            Add Coupon
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCoupon;