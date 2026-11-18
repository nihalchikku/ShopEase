import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Wallet = () => {
    const [wallet, setWallet] = useState(0);
    const [history, setHistory] = useState([]);

    const fetchWallet = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/user/wallet",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWallet(res.data.wallet);
            setHistory(res.data.walletHistory);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load wallet");
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    // return (
    //     <div className="max-w-5xl mx-auto p-6">
    //         <h1 className="text-3xl font-bold mb-6">
    //             My Wallet
    //         </h1>

    //         <div className="bg-green-100 p-6 rounded-lg mb-8">
    //             <h2 className="text-xl font-semibold">Wallet Balance</h2>
    //             <p className="text-3xl font-bold text-green-700 mt-2">
    //                 ₹{wallet}
    //             </p>
    //         </div>

    //         <h2 className="tex-2xl font-semibold mb-4">
    //             Wallet History
    //         </h2>

    //         {history.length === 0 ? (
    //             <p>No Transactions</p>
    //         ) : (
    //             history.map((item, index) => (
    //                 <div key={index}
    //                 className="border rounded p-4 mb-3">
    //                     <p>
    //                         <strong>Type:</strong>
    //                         {item.type}
    //                     </p>

    //                     <p>
    //                         <strong>Amount:</strong>
    //                         {item.amount}
    //                     </p>

    //                     <p>
    //                         <strong>Description:</strong>
    //                         {item.description}
    //                     </p>

    //                     <p>
    //                         <strong>Date:</strong>
    //                         {new Date(item.date).toLocaleDateString()}
    //                     </p>
    //                 </div>
    //             ))
    //         )}
    //     </div>
    // );

    return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        My Wallet
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your wallet balance and transactions
                    </p>
                </div>

                <div className="hidden sm:flex w-12 h-12 rounded-full bg-green-100 items-center justify-center text-2xl">
                    💳
                </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
                <div className="relative z-10">
                    <p className="text-green-100 text-sm font-medium">
                        Available Balance
                    </p>

                    <h2 className="text-4xl sm:text-5xl font-bold mt-2">
                        ₹{Number(wallet).toLocaleString("en-IN")}
                    </h2>

                    <p className="text-green-100 text-sm mt-3">
                        Your current wallet balance
                    </p>
                </div>

                <div className="absolute -right-10 -bottom-14 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute right-10 -top-16 w-32 h-32 rounded-full bg-white/10"></div>
            </div>

            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Wallet History
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Your recent wallet transactions
                    </p>
                </div>

                {history.length > 0 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        {history.length} Transactions
                    </span>
                )}
            </div>

            {history.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="text-5xl mb-4">💳</div>

                    <h3 className="text-xl font-semibold text-gray-800">
                        No Transactions Yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Your wallet transactions will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, index) => {
                        const isCredit =
                            item.type?.toLowerCase() === "credit";

                        return (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 ${
                                                isCredit
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {isCredit ? "↗" : "↘"}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-gray-900">
                                                    {isCredit
                                                        ? "Refund Received"
                                                        : "Wallet Debit"}
                                                </h3>

                                                <span
                                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                        isCredit
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {item.type}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-500 mt-2">
                                                {item.description}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-2">
                                                {new Date(
                                                    item.date
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`text-lg sm:text-xl font-bold whitespace-nowrap ${
                                            isCredit
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {isCredit ? "+" : "-"}₹
                                        {Number(
                                            item.amount
                                        ).toLocaleString("en-IN")}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    </div>
);
};

export default Wallet;