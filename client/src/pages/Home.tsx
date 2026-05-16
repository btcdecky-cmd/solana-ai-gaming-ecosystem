import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Trophy, TrendingUp, Users, Wallet, Gift } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const features = [
    {
      icon: Zap,
      title: "PvP Arena",
      description: "Challenge players in 1v1 battles with USD1 wagers",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Trophy,
      title: "AI Tournaments",
      description: "Compete in bracket tournaments with massive prize pools",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Prediction Markets",
      description: "Predict outcomes and place USD1 bets on live events",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Wallet,
      title: "Staking",
      description: "Lock USD1 and earn 12.5% APY with flexible lockup",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Leaderboards",
      description: "Compete for top rankings and exclusive tier benefits",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Gift,
      title: "Referrals",
      description: "Earn $10 USD1 bonus for each friend you invite",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-yellow-400/10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold text-yellow-400">Solana Arena</h1>
          </div>
          <a
            href={getLoginUrl()}
            className="glass-btn text-sm"
          >
            Sign In
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-yellow-400">Premium Gaming</span>
            <br />
            <span className="text-yellow-300">Meets Fintech</span>
          </h2>
          <p className="text-lg text-yellow-300/70 mb-8 max-w-2xl mx-auto">
            Compete in high-stakes PvP battles, AI tournaments, and prediction
            markets. Earn USD1 stablecoin rewards on Solana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getLoginUrl()}
              className="glass-btn px-8 py-3 text-base font-bold hover:scale-105 transition-transform"
            >
              Enter the Arena
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("features");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 text-base font-bold text-yellow-400 border border-yellow-400/30 rounded-lg hover:border-yellow-400/60 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { label: "Active Players", value: "10K+" },
            { label: "Total USD1 Wagered", value: "$5M+" },
            { label: "Avg Win Rate", value: "48%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center"
            >
              <p className="text-3xl font-bold text-yellow-400 mb-2">
                {stat.value}
              </p>
              <p className="text-yellow-300/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-yellow-400 mb-4">
            Explore the Ecosystem
          </h3>
          <p className="text-yellow-300/70">
            Six premium GameFi features powered by USD1 stablecoin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 hover:border-yellow-400/40 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-yellow-400 mb-2">
                  {feature.title}
                </h4>
                <p className="text-yellow-300/70 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="container py-12 md:py-20">
        <div className="glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Built on Solana & USD1
          </h3>
          <p className="text-yellow-300/70 mb-8 max-w-2xl mx-auto">
            Powered by Solana's lightning-fast blockchain and WLFI's USD1
            stablecoin. All transactions are on-chain with institutional-grade
            transparency and security.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              "Solana RPC",
              "Jupiter API",
              "AgentPay SDK",
              "OpenAI LLM",
              "PostgreSQL",
              "Redis Cache",
              "Next.js",
              "Tailwind CSS",
            ].map((tech) => (
              <div
                key={tech}
                className="p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20 text-yellow-400 font-semibold"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-12 md:py-20 text-center">
        <h3 className="text-3xl font-bold text-yellow-400 mb-6">
          Ready to Compete?
        </h3>
        <p className="text-yellow-300/70 mb-8">
          Join thousands of players earning USD1 rewards on Solana
        </p>
        <a
          href={getLoginUrl()}
          className="glass-btn px-12 py-4 text-lg font-bold hover:scale-105 transition-transform inline-block"
        >
          Sign In Now
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-yellow-400/10 mt-12">
        <div className="container py-8 text-center text-yellow-300/70 text-sm">
          <p>
            © 2026 Solana AI Gaming Ecosystem. Powered by WLFI USD1 Stablecoin.
          </p>
        </div>
      </footer>
    </div>
  );
}
