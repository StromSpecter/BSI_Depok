import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayouts from "../layouts/AuthLayouts";
import logo from "../assets/logo.svg";
import { API_URL } from "../utils/constant";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);

        navigate("/dashboard"); // Arahkan ke /dashboard setelah login berhasil

        // Set waktu kadaluwarsa 5 menit untuk menghapus data dan redirect
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          navigate("/signin"); // Arahkan ke halaman login
        }, 300000); // 5 menit = 300000 ms
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthLayouts>
      <form onSubmit={handleSignin} className="relative space-y-4">
        <div className="absolute top-0 left-0 w-10 h-10">
          <img src={logo} alt="logo" className="object-cover w-full h-full"/>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don{"'"}t have an account?{" "}
        <a href="/signup" className="text-primary-500">
          Sign Up
        </a>
      </p>
    </AuthLayouts>
  );
};

export default SigninPage;
