import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

// Public pages
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import ClientTours from "./pages/Tours/ClientTours";
import TourCategories from "./pages/TourCategories/TourCategories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import About from "./pages/about/About";

// Admin
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminGallery from "./admin/pages/Gallery";
import AdminTours from "./admin/pages/AdminTours";
import AdminPackages from "./admin/AdminPages/AdminPackages";
import AdminCategories from "./admin/AdminPages/AdminCategories";
import AdminInquiries from "./admin/AdminPages/AdminInquiries";
import Destinations from "./admin/pages/Destinations";
import PopularDestinations from "./pages/Destinations/PopularDestinations";

// Styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/destinations"
          element={<><NavBar /><PopularDestinations /></>}
        />

        {/* ===== Public Website ===== */}
        <Route
          path="/"
          element={<><NavBar /><Home /></>}
        />

        <Route
          path="/ClientTours"
          element={<><NavBar /><ClientTours /></>}
        />

        <Route
          path="/categories"
          element={<><NavBar /><TourCategories /></>}
        />

        <Route
          path="/category/:categoryId"
          element={<><NavBar /><CategoryDetail /></>}
        />

        <Route
          path="/package/:packageId"
          element={<><NavBar /><PackageDetail /></>}
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
          path="/admin/AdminTours"
          element={
            <ProtectedRoute>
              <AdminTours />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/AdminCategories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/AdminPackages"
          element={
            <ProtectedRoute>
              <AdminPackages />
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

        <Route
          path="/admin/inquiries"
          element={
            <ProtectedRoute>
              <AdminInquiries />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
