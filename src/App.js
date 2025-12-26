import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

// Public pages
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import About from "./pages/about/About";

// Admin
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Tours from "./admin/pages/Tours";
import Destinations from "./admin/pages/Destinations";
import AdminGallery from "./admin/pages/Gallery";

// Styles
import "./App.css";
import "./pages/Home/Home.css";
import "./pages/Contact/Contact.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== Public Website ===== */}
        <Route
          path="/"
          element={<><NavBar /><Home /></>}
        />

        <Route
          path="/contact"
          element={<><NavBar /><Contact /></>}
        />

        <Route
          path="/gallery"
          element={<><NavBar /><Gallery /></>}
        />

        <Route
          path="/about"
          element={<><NavBar /><About /></>}
        />

        {/* ===== Admin ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tours"
          element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <ProtectedRoute>
              <Destinations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
