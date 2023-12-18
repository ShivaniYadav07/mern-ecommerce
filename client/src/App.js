import './App.css';
// import DrippingSlimeEffect from './components/DrippingSlimeEffect.js';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <DrippingSlimeEffect /> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
