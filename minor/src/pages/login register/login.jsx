import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tohome = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Login", {
        email,
        password,
      });

      if (response.data.message === "user present") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else if (response.data.message === "company present") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("company", JSON.stringify(response.data.company));
        navigate("/");
      } else {
        alert("Please signup");
      }
    } catch (err) {
      alert("Invalid credentials or user not found");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Excellence
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Innovation Portal
          </p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Sign in to your account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="company@email.com"
            className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={tohome}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold text-white"
        >
          Login
        </button>

        {/* Signup */}
        <p className="text-sm text-gray-300 text-center mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/Signup")}
            className="text-blue-400 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
