import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

function UserLayout () {
    return (
        <>
        <Navbar />

        <Outlet />

        <Footer />
        </>
    );
}

export default UserLayout;