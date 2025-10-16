import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target, TrendingUp, TrendingDown, Award, Users } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    wins: number;
    losses: number;
    winRate: number;
    eloChange: number;
    avgOpponentElo: number;
    biggestWin: number;
    biggestLoss: number;
    currentElo: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statCards = [
    {
      title: "Total de Partidas",
      value: stats.total,
      icon: Trophy,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Vitórias",
      value: stats.wins,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Derrotas",
      value: stats.losses,
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Taxa de Vitória",
      value: `${stats.winRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: stats.winRate >= 50 ? "text-green-600" : "text-orange-600",
      bgColor: stats.winRate >= 50 ? "bg-green-50" : "bg-orange-50",
    },
    {
      title: "Variação de ELO",
      value: stats.eloChange > 0 ? `+${stats.eloChange}` : stats.eloChange,
      icon: stats.eloChange >= 0 ? TrendingUp : TrendingDown,
      color: stats.eloChange >= 0 ? "text-green-600" : "text-red-600",
      bgColor: stats.eloChange >= 0 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "ELO Médio dos Oponentes",
      value: Math.round(stats.avgOpponentElo),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Maior Ganho",
      value: `+${stats.biggestWin}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Maior Perda",
      value: stats.biggestLoss,
      icon: TrendingDown,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="shadow-lg border-slate-200 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={stat.color} size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

