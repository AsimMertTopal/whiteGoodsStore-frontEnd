// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../layouts/Navbar.js";
import Category from "./Category.js";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Order from "./Order.js";
import ProductList from "./ProductList.js";
import Favorites from "./Favorites.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerSignup from "./seller/SellerSignup.js";
import SellerLogin from "./seller/SellerLogin.js";
import SellerDashboard from "./seller/SellerDashboard.js";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginSeller" element={<SellerLogin />} />

          <Route path="/order" element={<Order />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signupSeller" element={<SellerSignup />} />
          <Route path="/sellerDashboard" element={<SellerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
