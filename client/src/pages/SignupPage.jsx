import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayouts from "../layouts/AuthLayouts";
import logo from "../assets/logo.svg";
import { API_URL } from "../utils/constant";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/signin"); // Arahkan ke halaman Sign In
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayouts>
      <form onSubmit={handleSignup} className="relative space-y-4">
        <div className="absolute top-0 left-0 w-10 h-10">
          <img src={logo} alt="logo" className="object-cover w-full h-full" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Confirm Password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-primary-500">
          Sign In
        </a>
      </p>
    </AuthLayouts>
  );
};

export default SignupPage;
