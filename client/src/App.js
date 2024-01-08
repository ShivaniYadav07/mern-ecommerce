import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import DrippingSlimeEffect from './components/DrippingSlimeEffect';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignup from "./components/User/LoginSignup"
import UserOptions from "./components/layout/Header/UserOptions"
import store from "./Store"
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import Payment from "./components/Cart/Payment.js"
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import MyOrders from "./components/Order/MyOrders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/admin/Dashboard.js"
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
function App() {
const {isAuthenticated, user} = useSelector((state) => state.user);
const [stripeApiKey, setStripeApiKey] = useState("");

      async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
      }

      useEffect(() =>{
       store.dispatch(loadUser())
       getStripeApiKey();
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
        <Route exact path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>}/>
        
        {stripeApiKey && ( <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment /></ProtectedRoute></Elements>}/>)}
        <Route exact path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>
        <Route exact path='/orders' element={<ProtectedRoute><MyOrders /></ProtectedRoute>}/>
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path='/order/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>}/>
        <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>

       </Routes>
      <Footer />
    </Router>
  );
}

export default App;
