import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import About from './components/About';
import Contact from './components/Contact';
import Places from "./components/Places";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Singup";
import TripPlanner from "./components/TripPlanner"; 
import Favorites from "./components/Favorites";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<Places />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/trip-planner" element={<TripPlanner />} /> 
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
