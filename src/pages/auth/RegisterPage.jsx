// pages/auth/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { usersAPI } from "../../services/api";
import Button from "../../components/Button";
import { SuccessPopup } from "../../components/popups/SuccesPopup";

const RegisterPage = ({ onRegister }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap harus diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (
      !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Cek email sudah terdaftar
      const response = await fetch(`http://localhost:3001/users?email=${formData.email}`);
      const existUser = await response.json();

      if (existUser.length > 0) {
        setErrors({ email: "Email sudah terdaftar" });
        setLoading(false);
        return;
      }

      // Register new user
      const newUser = await usersAPI.register({
        name: formData.name.trim(),
        email: formData.email,
        phone: formData.phone.replace(/\s/g, ""), // Remove spaces from phone
        password: formData.password,
        balance: 0,
        role: "customer",
      });

      onRegister(newUser);
      // Auto login after successful registration
      SuccessPopup({ isOpen: true, onClose: () => navigate("/login"), title: "Registrasi Berhasil", message: "Silakan login untuk melanjutkan" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format phone number as user types
    if (name === "phone") {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, "");

      // Format as Indonesian phone number
      let formatted = digits;
      if (digits.length > 4) {
        formatted = digits.replace(/(\d{4})(\d{4})/, "$1-$2");
      }
      if (digits.length > 8) {
        formatted = digits.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
      }

      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Daftar Akun Baru
          </h2>
          <div>
            <p className="text-gray-600">
              Bergabung dengan Kuotaku dan nikmati kemudahan berbelanja paket
              data
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline transition-colors"
              style={{ color: theme.colors.primary }}
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        {/* Registration Form */}
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Lengkap *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap Anda"
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="email@contoh.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nomor Telepon *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="0812-3456-7890"
                disabled={loading}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Minimal 6 karakter"
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Konfirmasi Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Ulangi password Anda"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full py-3 font-semibold transition-colors text-white"
              style={{ backgroundColor: theme.colors.primary }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mendaftarkan...
                </div>
              ) : (
                "Daftar Sekarang"
              )}
            </Button>
          </div>

          {/* Terms and Conditions */}
          <div className="flex justify-between gap-2">
            <input type="checkbox" className="cursor-pointer"/>
            <p className="text-xs text-gray-500">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link
                to="/terms"
                className="hover:underline"
                style={{ color: theme.colors.primary }}
              >
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                to="/privacy"
                className="hover:underline"
                style={{ color: theme.colors.primary }}
              >
                Kebijakan Privasi
              </Link>{" "}
              kami
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
