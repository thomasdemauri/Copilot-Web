import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../utils/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const result = registerUser(name, email, password);
    
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error || "Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-gray-800/50 px-6 py-8 text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Olist Copilot
              </h1>
              <p className="text-gray-400">Create your account</p>
            </div>

            {/* Form */}
            <div className="p-8 space-y-5">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800/30 border-t border-gray-800/50 px-8 py-6 space-y-4">
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign In
                </Link>
              </p>

              <p className="text-center text-sm text-gray-400">
                <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors">
                  Back to Home
                </Link>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-gray-500 text-sm mt-8">
            © 2026 Olist Copilot. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
