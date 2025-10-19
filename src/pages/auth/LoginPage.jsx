import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      if (res.data.length > 0) {
        onLogin(res.data[0]);
      } else {
        alert("Email atau password salah");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-80 text-center"
      >
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded border border-secondary focus:outline-none focus:ring-2"
          style={{ borderColor: colors.secondary }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded border border-secondary focus:outline-none focus:ring-2"
          style={{ borderColor: colors.secondary }}
        />

        <button
          type="submit"
          className="w-full py-3 rounded font-bold text-black hover:bg-green-400 transition"
          style={{ backgroundColor: colors.accent }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
