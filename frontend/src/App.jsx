import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";
import Profile from "./pages/user/Profile.jsx";
import ProductPage from "./pages/user/ProductPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";
import AddAddress from "./pages/user/AddAddress.jsx";
import {Toaster} from "react-hot-toast";
import Home from "./pages/user/Home.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import Category from "./pages/admin/Category.jsx";
import Product from "./pages/admin/Product.jsx";
import ProductDetails from "./pages/user/ProductDetails.jsx";
import Cart from "./pages/user/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import ServerError from "./pages/ServerError.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import AdminProductDetails from "./pages/admin/AdminProductDetails.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";
// import AdminCoupons from "./pages/admin/adminCoupons.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import OrderSuccess from "./pages/user/OrderSuccess.jsx";
import MyOrders from "./pages/user/MyOrders.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import Wallet from "./pages/user/Wallet.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminSalesReport from "./pages/admin/AdminSalesReport.jsx";
import ChatBot from "./components/ChatBot.jsx";
import AddCategory from "./pages/admin/AddCategory";
import Categories from "./pages/admin/Categories";
import EditCategory from "./pages/admin/EditCategory";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Coupons from "./pages/admin/Coupons";
import AddCoupon from "./pages/admin/AddCoupon";
import EditCoupon from "./pages/admin/EditCoupon";
import Banners from "./pages/admin/Banners.jsx";


function App() {  
  return (
    <>
    <Toaster position="top-right" />
    
      <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/"
          element={<Home />} />
          <Route path="/product"
          element={<ProductPage />} />
          <Route path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/profile"
          element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } />
          <Route path="/add-address"
          element={
            <ProtectedRoute>
              <AddAddress />
            </ProtectedRoute>
          } />
          <Route path="/add-address/:id"
          element={
            <ProtectedRoute>
              <AddAddress />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } />
          <Route path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtp />
            </PublicRoute>
          } />
          

          <Route path="/product/:id"
          element={<ProductDetails />} />
          <Route path="/cart"
          element={<Cart />} />

          <Route path="/change-password"
          element={<ChangePassword />} />



          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/checkout"
          element={<Checkout />} />

          <Route path="/order-success"
          element={<OrderSuccess />} />

          <Route path="/my-orders"
          element={<MyOrders />} />

          <Route path="/orders/:id"
          element={<OrderDetails />} />

          <Route path="/wallet"
          element={<Wallet />} />

        </Route>

        <Route element={<AdminLayout />} >
        <Route path="/admin/login"
        element={<AdminLogin />} />

        <Route
            path="/admin/forgot-password"
            element={<ForgotPassword />}
        />

        <Route
            path="/admin/verify-otp"
            element={<VerifyOtp />}
        />

        <Route
            path="/admin/reset-password"
            element={<ResetPassword />}
        />
        <Route path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/category"
        element={<Category />} />
        <Route path="/admin/product"
        element={<Product />} />
        <Route path="/admin/product/:id"
        element={
          <ProtectedAdminRoute>
            <AdminProductDetails />
          </ProtectedAdminRoute>
        } />

        {/* <Route path="/admin/coupons"
        element={<AdminCoupons />} /> */}

        <Route path="/admin/orders"
        element={<AdminOrders />} />

        <Route path="/admin/sales-report"
        element={<AdminSalesReport />} />

        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        <Route
          path="/admin/add-category"
          element={<AddCategory />}
        />

        <Route
          path="/admin/edit-category/:id"
          element={<EditCategory />}
        />

        <Route
          path="/admin/products"
          element={<Products />}
        />

        <Route
          path="/admin/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/admin/edit-product/:id"
          element={<EditProduct />}
        />

        <Route path="/admin/coupons" element={<Coupons />} />

        <Route
            path="/admin/coupons/add"
            element={<AddCoupon />}
        />

        <Route
          path="/admin/banners"
          element={
            <ProtectedAdminRoute>
              <Banners />
            </ProtectedAdminRoute>
          }
        />
        
        <Route
            path="/admin/coupons/edit/:id"
            element={<EditCoupon />}
        />


        </Route>

        
      </Routes>

      <ChatBot />
      </BrowserRouter>
    </>
  );
}

export default App;