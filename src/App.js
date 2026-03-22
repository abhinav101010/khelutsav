import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { useAdminAuth } from "./context/AdminAuthContext";
import { makeGlobalStyle } from "./styles/globalStyle";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import EventsPage from "./components/pages/EventsPage";
import FAQsPage from "./components/pages/FAQsPage";
import ContactPage from "./components/pages/ContactPage";
import RegisterPage from "./components/pages/RegisterPage";

import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminRegistrations from "./components/admin/AdminRegistrations";
import AdminEvents from "./components/admin/AdminEvents";
import AdminSponsors from "./components/admin/AdminSponsors";

// Protect all /admin/* routes
function RequireAdminAuth({ children }) {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}

export default function App() {
  const { T, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideFooter = location.pathname === "/register" || isAdminRoute;

  return (
    <>
      {/* Only inject public styles on non-admin pages */}
      {!isAdminRoute && <style>{makeGlobalStyle(T, isDark)}</style>}
      {!isAdminRoute && <Navbar />}

      <main style={isAdminRoute ? {} : { minHeight: "80vh", background: T.bg, transition: "background 0.3s" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/events"   element={<EventsPage />} />
          <Route path="/faqs"     element={<FAQsPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected admin pages */}
          <Route path="/admin/dashboard" element={
            <RequireAdminAuth>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </RequireAdminAuth>
          } />
          <Route path="/admin/registrations" element={
            <RequireAdminAuth>
              <AdminLayout><AdminRegistrations /></AdminLayout>
            </RequireAdminAuth>
          } />
          <Route path="/admin/events" element={
            <RequireAdminAuth>
              <AdminLayout><AdminEvents /></AdminLayout>
            </RequireAdminAuth>
          } />
          <Route path="/admin/sponsors" element={
            <RequireAdminAuth>
              <AdminLayout><AdminSponsors /></AdminLayout>
            </RequireAdminAuth>
          } />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}