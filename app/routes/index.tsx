import { useNavigate } from "react-router";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/app");
    }
  }, [navigate]);

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
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-gray-800/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Olist Copilot
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8 mb-20">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              AI-Powered Analytics for
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Olist Data
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Unlock insights from your data with conversational AI. Ask questions in natural language and get instant, actionable answers.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/50"
              >
                Start Free
              </button>
              <button className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-semibold text-lg transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative mb-24">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
              <div className="relative p-8">
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="flex-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg p-4 border border-blue-500/30">
                        <p className="text-blue-400 text-sm">What are my top selling products?</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg p-4 border border-purple-500/30">
                        <p className="text-purple-400 text-sm">Your top 3 products are: Electronics (45%), Fashion (32%), Home & Garden (23%)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg p-4 border border-blue-500/30">
                        <p className="text-blue-400 text-sm">Show me sales trend for last 30 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to understand your data</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💬",
                title: "Natural Language Queries",
                description: "Ask questions in plain English and get instant insights from your data"
              },
              {
                icon: "📊",
                title: "Real-time Analytics",
                description: "Access up-to-date metrics and KPIs for your Olist business"
              },
              {
                icon: "🎯",
                title: "Actionable Insights",
                description: "Get recommendations and trends to optimize your business strategy"
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Get answers in milliseconds, not minutes or hours"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your data is encrypted and never shared with third parties"
              },
              {
                icon: "🚀",
                title: "Always Learning",
                description: "AI gets smarter with each query to better understand your needs"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:bg-gray-900/80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "1M+", label: "Queries Processed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Data?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using Olist Copilot to make data-driven decisions
              </p>
              <button
                onClick={() => navigate("/register")}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/50"
              >
                Get Started Free
              </button>
              <p className="text-gray-400 mt-4 text-sm">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
            <p>&copy; 2026 Olist Copilot. All rights reserved.</p>
          </div>
        </footer>
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
