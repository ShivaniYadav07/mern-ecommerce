import './App.css';
import React from 'react';
// import DrippingSlimeEffect from './components/DrippingSlimeEffect.js';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import store from "./Store.js"
import { loadUser } from './actions/userAction.js';
function App() {

      React.useEffect(() =>{
       store.dispatch(loadUser())
      }, [])

  return (
    <Router>
      <Header />
      <Routes>
        {/* <DrippingSlimeEffect /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/loginsignup" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
