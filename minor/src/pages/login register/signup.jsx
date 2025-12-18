import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/Signup", {
        email,
        password,
      });

      alert(response.data.message);
      navigate("/Login");
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.message || "User already exists");
      } else {
        alert("Something went wrong");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      
      {/* Signup Card */}
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
          Create your account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="company@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Links */}
        <div className="text-sm text-gray-300 text-center mt-6 space-y-3">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/Login")}
              className="text-purple-400 hover:underline font-medium"
            >
              Login
            </button>
          </p>

          <button
            onClick={() => navigate("/Register")}
            className="w-full py-2 border border-purple-400 rounded-lg text-purple-300 hover:bg-purple-400/10 transition"
          >
            Register as an Institute
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
