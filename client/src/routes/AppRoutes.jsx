import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import MyOrders from "./../pages/order/MyOrders";
import OrderDetails from "../pages/order/OrderDetails";
import ProductDetails from "../pages/product/ProductDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminLayout from "../layouts/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/product/Products";
import Categories from "../pages/categories/Categories";
import CategoryProducts from "../pages/categories/CategoryProducts";

const AppRoutes = () => {
  // Build by Md. Sabur
  // github link: https://github.com/gitbugd20p/E-commerce-P-Project-one-Live
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute admin />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
