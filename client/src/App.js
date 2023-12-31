import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import DrippingSlimeEffect from './components/DrippingSlimeEffect.js';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup"
import UserOptions from "./components/layout/Header/UserOptions.js"
import store from "./Store.js"
import { loadUser } from './actions/userAction.js';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
function App() {
const {isAuthenticated, user} = useSelector((state) => state.user);

      React.useEffect(() =>{
       store.dispatch(loadUser())
      }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {/* <DrippingSlimeEffect /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route exact path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/>
        <Route exact path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>}/>
        <Route exact path='/password/forgot' element={<ForgotPassword />}/>
        <Route exact path='/password/reset/:token' element={<ResetPassword />}/>
        <Route exact path="/loginsignup" element={<LoginSignup />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
