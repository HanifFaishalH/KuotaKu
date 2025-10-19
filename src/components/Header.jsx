import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import Button from "./Button";
import { User, LogOut, Settings, Home, LayoutDashboard } from "lucide-react";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";

const Header = ({ user, onLogout }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header 
      className="bg-white shadow-md border-b-2 sticky top-0 z-50"
      style={{ borderBottomColor: theme.colors.primary }}
    >
      <div className="flex items-center justify-between px-6 py-4 container mx-auto">
        {/* Logo di kiri */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center">
          <img src={logo} className="h-8 w-auto object-contain" alt="logo" />
        </Link>

        {/* Navigation Menu di kanan */}
        <div className="flex items-center gap-8">
          {/* Navigation Links - berbeda untuk user login vs non-login */}
          {user ? (
            // Navigation untuk user yang sudah login
            <>
              <Link
                to="/dashboard"
                className={`font-medium transition-colors duration-300 flex items-center gap-1 ${
                  location.pathname === "/dashboard"
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link
                to="/packages"
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === "/packages"
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Paket Data
              </Link>
              <Link
                to="/orders"
                className={`font-medium transition-colors duration-300 ${
                  location.pathname.startsWith("/orders")
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Riwayat
              </Link>
            </>
          ) : (
            // Navigation untuk user belum login
            <>
              <Link
                to="/"
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === "/"
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/packages"
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === "/packages"
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Paket Data
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === "/about"
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                About
              </Link>
            </>
          )}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              // User sudah login - tampilkan dropdown
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium text-sm hidden sm:block">
                  Halo, {user.name}
                </span>
                <Button 
                  onClick={toggleDropdown}
                  className="flex items-center gap-1 p-2 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                  title="Menu Pengguna"
                >
                  <User size={20} className="text-purple-600" />
                </Button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Info User */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <Button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <User size={16} />
                      Profil Saya
                    </Button>

                    <Button
                      onClick={() => handleNavigation("/dashboard")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Button>

                    <Button
                      onClick={() => handleNavigation("/orders")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <Settings size={16} />
                      Riwayat Order
                    </Button>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Logout */}
                    <Button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Keluar
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // User belum login - tampilkan tombol login
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium"
                >
                  Masuk
                </Button>
                
                <Button 
                  onClick={() => navigate("/register")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg  font-medium hover:border hover:border-purple-600 hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  Daftar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;