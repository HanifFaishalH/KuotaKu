// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import Layout from "./components/Layout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CheckoutPage from "./pages/transaction/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/transaction/OrderSuccessPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('kuotaku_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('kuotaku_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem('kuotaku_user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kuotaku_user');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }
    return user ? children : <Navigate to="/login" />;
  };

  // Public Route Component (redirect to dashboard if already logged in)
  const PublicRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }
    return user ? <Navigate to="/dashboard" /> : children;
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat aplikasi...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            {/* Route Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage user={user} />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Route Auth */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage onLogin={handleLogin} />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage onLogin={handleLogin} />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes - require login */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage user={user} onUpdateUser={setUser} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrderHistoryPage user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutPage user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-success" 
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback routes */}
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/paket" element={<Navigate to="/packages" />} />
            <Route path="/paket-data" element={<Navigate to="/packages" />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}