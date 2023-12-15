import './App.css';
// import DrippingSlimeEffect from './components/DrippingSlimeEffect.js';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";


import {BrowserRouter as Router} from "react-router-dom"

function App() {
  return (
    <Router >
      <Header />
      {/* <DrippingSlimeEffect /> */}
      <Footer />
    </Router>
  );
}

export default App;
