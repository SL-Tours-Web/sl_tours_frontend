import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

// Public pages
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Gallery from "./pages/Gallery/Gallery";
import ClientTours from "./pages/Tours/ClientTours";
import TourCategories from "./pages/TourCategories/TourCategories";
import CategoryDetail from "./pages/Categories/CategoryDetail";
import PackageDetail from "./pages/PackageDetail/PackageDetail";
import About from "./pages/about/about";

// Admin
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminGallery from "./admin/pages/Gallery";
import AdminTours from "./admin/AdminPages/AdminTours";
import AdminPackages from "./admin/AdminPages/AdminPackages";
import AdminCategories from "./admin/AdminPages/AdminCategories";
import AdminInquiries from "./admin/AdminPages/AdminInquiries";
import Destinations from "./admin/pages/Destinations";
import PopularDestinations from "./pages/Destinations/PopularDestinations";

// Styles
import "./App.css";

const MOTION_TARGETS =
  'section:not(.hero):not(.page-hero):not(.stats-strip), article, [class*="card"], [class*="Card"], [class*="tile"], [class*="Tile"]';

const isMotionCard = (node) =>
  Array.from(node.classList).some((className) =>
    /(?:^|[-_])(card|tile)(?:$|[-_])|(?:Card|Tile)$/.test(className)
  );

function SiteMotion({ children }) {
  const location = useLocation();
  const routeRef = useRef(null);

  useEffect(() => {
    const route = routeRef.current;
    if (!route) return undefined;

    const reveal = (node) => {
      if (!(node instanceof Element)) return;

      if (node.matches(MOTION_TARGETS)) {
        node.classList.add("motion-reveal");
        if (isMotionCard(node)) node.classList.add("motion-card");
      }

      node.querySelectorAll(MOTION_TARGETS).forEach((target) => {
        target.classList.add("motion-reveal");
        if (isMotionCard(target)) target.classList.add("motion-card");
      });
    };

    if (!("IntersectionObserver" in window)) {
      route.querySelectorAll(MOTION_TARGETS).forEach((target) => {
        target.classList.add("motion-reveal", "is-visible");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    const observeTargets = (node) => {
      reveal(node);
      if (node instanceof Element) {
        if (node.matches(".motion-reveal")) observer.observe(node);
        node.querySelectorAll(".motion-reveal").forEach((target) => {
          observer.observe(target);
        });
      }
    };

    observeTargets(route);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(observeTargets);
      });
    });
    mutations.observe(route, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [location.key]);

  return (
    <div className="site-route" key={location.key} ref={routeRef}>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SiteMotion>
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
      </SiteMotion>
    </BrowserRouter>
  );
}

export default App;
