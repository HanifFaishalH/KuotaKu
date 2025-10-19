// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import LoginPage from "./pages/auth/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (loggedUser) => setUser(loggedUser);
  const handleLogout = () => setUser(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout toggleSidebar={toggleSidebar} user={user} onLogout={handleLogout}>
          <Routes>
            {/* Public Routes - bisa diakses tanpa login */}
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* Protected Routes - hanya bisa diakses setelah login */}
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} /> : <LoginPage onLogin={handleLogin} />
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}