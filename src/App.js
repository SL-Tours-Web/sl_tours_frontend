import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar"; 
import EllaAdventure from "./pages/Tours/Ella/EllaAdventure";
import SigiriyaTour from "./pages/Tours/Sigiriya/SigiriyaTour";
import Contact from "./pages/Contact/Contact";
import "./App.css";
import './pages/Home/Home.css';  // Correct the path
import './pages/Contact/Contact.css';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ella-adventure" element={<EllaAdventure />} />
        <Route path="/sigiriya-tour" element={<SigiriyaTour />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
