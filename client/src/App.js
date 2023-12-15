import './App.css';
import DrippingSlimeEffect from './components/DrippingSlimeEffect.js';
import Header from "./components/Header.js"
import {BrowserRouter as Router} from "react-router-dom"

function App() {
  return (
    <Router >
      <Header />
      <DrippingSlimeEffect />
    </Router>
  );
}

export default App;
