import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-100">

            <AdminNavbar />
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
            
        </div>
    )
}

export default AdminLayout;