import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { usersAPI } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";

export default function LoginPage({ onLogin }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validasi input
      if (!email || !password) {
        alert("Email dan password harus diisi");
        setLoading(false);
        return;
      }

      // Memanggil API Login
      const users = await usersAPI.login(email, password);
      
      if (users.length > 0) {
        const user = users[0];
        onLogin(user);
        navigate("/dashboard");
      } else {
        alert("Email atau password salah");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Masuk ke Kuotaku
          </h2>
          <p className="text-gray-600">
            Selamat datang kembali! Silakan masuk ke akun Anda
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Masukkan password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full py-3 font-semibold transition-colors mb-4 text-white"
          style={{ backgroundColor: colors.primary }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Memproses...
            </div>
          ) : (
            "Masuk"
          )}
        </Button>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <Link 
              to="/register" 
              className="font-semibold hover:underline transition-colors"
              style={{ color: colors.primary }}
            >
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau</span>
          </div>
        </div>

        {/* Demo Account Info */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Akun Demo:</h4>
          <p className="text-sm text-purple-700">
            <strong>Email:</strong> mika@mail.com<br />
            <strong>Password:</strong> 123455678
          </p>
        </div>
      </form>
    </div>
  );
}