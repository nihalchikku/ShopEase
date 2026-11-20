// import { Navigate } from "react-router-dom";


// function ProtectedAdminRoute({children}) {
//     const token = 
//     localStorage.getItem("adminToken");

//     if(!token){
//         return <Navigate to="/admin/login" />;
//     }


//     return children;
// }

// export default ProtectedAdminRoute;

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedAdminRoute({ children }) {
    const token = localStorage.getItem("adminToken");

    if(!token) {
        return <Navigate to="/admin/login" />;
    }

    try{
        const decoded = jwtDecode(token);

        if(decoded.exp * 1000 < Date.now()) {

            localStorage.removeItem("adminToken");
            
            return <Navigate to="/admin/login" />;
        }
    } catch (err) {
        localStorage.removeItem("adminToken");

        return <Navigate to="/admin/login" />;
    }

    return children;
}

export default ProtectedAdminRoute;