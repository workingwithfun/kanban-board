import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ email, password });
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">

      <div className="bg-white w-[360px] p-8 rounded-xl shadow-lg border border-gray-200">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Create account
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Start tracking your job applications
        </p>

        {/* Email */}
        <input
          className="w-full border border-gray-300 rounded-md p-2.5 mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full border border-gray-300 rounded-md p-2.5 mb-5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}