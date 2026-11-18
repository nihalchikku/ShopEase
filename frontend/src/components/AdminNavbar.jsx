// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function AdminNavbar() {

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("adminToken");

//         navigate("/admin/login");
//     };

//     return (
//         <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
//             <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//                 <h1 className="text-2xl font-bold">ShopEase Admin</h1>

//                 <div className="flex itmes-center gap-6">
//                     <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
//                     <Link to="/admin/categories" className="hover:text-yellow-400">Categories</Link>
//                     <Link to="/admin/products" className="hover:text-yellow-400">Products</Link>
//                     <Link to="/admin/coupons">Coupons</Link>
//                     <button onClick={handleLogout} className="hover:text-red-400 cursor-pointer">Logout</button>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default AdminNavbar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    const linkClass =
        "block hover:text-yellow-400 transition-colors duration-200";

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
                    ShopEase Admin
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/admin/dashboard" className={linkClass}>
                        Dashboard
                    </Link>

                    <Link to="/admin/categories" className={linkClass}>
                        Categories
                    </Link>

                    <Link to="/admin/products" className={linkClass}>
                        Products
                    </Link>

                    <Link to="/admin/coupons" className={linkClass}>
                        Coupons
                    </Link>

                    <Link to="/admin/banners" className={linkClass}>
                        Banners
                    </Link>

                    <Link to="/admin/orders" className={linkClass}>
                        Orders
                    </Link>

                    <Link to="/admin/sales-report" className={linkClass}>
                        Sales Report
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="hover:text-red-400 cursor-pointer transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white text-3xl focus:outline-none"
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-700 px-4 py-3 space-y-4 bg-gray-900">
                    <Link
                        to="/admin/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/categories"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Categories
                    </Link>

                    <Link
                        to="/admin/products"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Products
                    </Link>

                    <Link
                        to="/admin/coupons"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Coupons
                    </Link>

                    <Link
                        to="/admin/banners"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Banners
                    </Link>

                    <Link
                        to="/admin/orders"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Orders
                    </Link>

                    <Link
                        to="/admin/sales-report"
                        onClick={() => setMenuOpen(false)}
                        className={linkClass}
                    >
                        Sales Report
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="block hover:text-red-400 cursor-pointer transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default AdminNavbar;