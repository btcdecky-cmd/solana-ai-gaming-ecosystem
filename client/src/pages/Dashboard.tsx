import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Trophy, TrendingUp, Users, Zap, Gift } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const { data: profile } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: leaderboardRank } = trpc.leaderboard.getPlayerRank.useQuery(
    { userId: user?.id || 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  if (!isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: Zap,
      title: "PvP Arena",
      description: "Challenge players in 1v1 battles with USD1 wagers",
      path: "/pvp",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Trophy,
      title: "Tournaments",
      description: "Compete in AI tournaments with massive prize pools",
      path: "/tournaments",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Prediction Markets",
      description: "Predict outcomes and place USD1 bets",
      path: "/markets",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Wallet,
      title: "Staking",
      description: "Lock USD1 and earn 12.5% APY",
      path: "/staking",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Leaderboard",
      description: "Compete for top rankings and tier benefits",
      path: "/leaderboard",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Gift,
      title: "Referrals",
      description: "Earn $10 USD1 bonus per referral",
      path: "/referrals",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-yellow-400/10">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-400">Solana Arena</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-yellow-300/70">Balance</p>
              <p className="text-xl font-bold text-yellow-400">
                ${profile?.totalUSD1Earned || "0"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-400">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Welcome */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-yellow-400 mb-2">
            Welcome, {user?.name}
          </h2>
          <p className="text-yellow-300/70">
            Ready to compete, stake, and earn USD1 rewards?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300/70">
                RANK
              </span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              #{leaderboardRank?.rank || "N/A"}
            </p>
            <p className="text-sm text-yellow-300/70 mt-2">
              {profile?.tier || "Bronze"}
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-xs font-semibold text-yellow-300/70">
                WINS
              </span>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {profile?.totalWins || 0}
            </p>
            <p className="text-sm text-yellow-300/70 mt-2">
              {profile?.totalLosses || 0} losses
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-6 h-6 text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-300/70">
                EARNED
              </span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              ${parseFloat(profile?.totalUSD1Earned || "0").toFixed(0)}
            </p>
            <p className="text-sm text-yellow-300/70 mt-2">USD1</p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-semibold text-yellow-300/70">
                TIER
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-400">
              {profile?.tier || "Bronze"}
            </p>
            <p className="text-sm text-yellow-300/70 mt-2">Member</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.path}
                onClick={() => setLocation(feature.path)}
                className="glass-card p-8 text-left hover:border-yellow-400/40 transition-all hover:scale-105"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-yellow-300/70 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                  Enter →
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
