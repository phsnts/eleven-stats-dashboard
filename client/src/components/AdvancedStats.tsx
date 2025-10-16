import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Award, Target } from "lucide-react";

interface Match {
  id: string;
  timestamp: string;
  player: string;
  opponent: string;
  playerScore: number;
  opponentScore: number;
  rounds: string[];
  eloChange: number;
  eloBefore: number;
  eloAfter: number;
  opponentElo: number;
}

interface AdvancedStatsProps {
  matches: Match[];
}

export default function AdvancedStats({ matches }: AdvancedStatsProps) {
  // Estatísticas por tipo de resultado
  const resultTypeStats = {
    win2x0: matches.filter(m => m.playerScore === 2 && m.opponentScore === 0).length,
    win2x1: matches.filter(m => m.playerScore === 2 && m.opponentScore === 1).length,
    loss0x2: matches.filter(m => m.playerScore === 0 && m.opponentScore === 2).length,
    loss1x2: matches.filter(m => m.playerScore === 1 && m.opponentScore === 2).length,
  };

  const resultTypeData = [
    { name: "Vitória 2x0", value: resultTypeStats.win2x0, color: "#10b981" },
    { name: "Vitória 2x1", value: resultTypeStats.win2x1, color: "#84cc16" },
    { name: "Derrota 1x2", value: resultTypeStats.loss1x2, color: "#f97316" },
    { name: "Derrota 0x2", value: resultTypeStats.loss0x2, color: "#ef4444" },
  ];

  // Desempenho por faixa de ELO do oponente
  const eloRanges = [
    { range: "< 1800", min: 0, max: 1800 },
    { range: "1800-1950", min: 1800, max: 1950 },
    { range: "1950-2100", min: 1950, max: 2100 },
    { range: "2100-2250", min: 2100, max: 2250 },
    { range: "> 2250", min: 2250, max: 9999 },
  ];

  const performanceByElo = eloRanges.map(({ range, min, max }) => {
    const matchesInRange = matches.filter(m => m.opponentElo >= min && m.opponentElo < max);
    const wins = matchesInRange.filter(m => m.playerScore > m.opponentScore).length;
    const losses = matchesInRange.filter(m => m.playerScore < m.opponentScore).length;
    
    return {
      range,
      wins,
      losses,
      total: matchesInRange.length,
      winRate: matchesInRange.length > 0 ? (wins / matchesInRange.length) * 100 : 0,
    };
  }).filter(d => d.total > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{data.range}</p>
          <p className="text-sm text-green-600">Vitórias: {data.wins}</p>
          <p className="text-sm text-red-600">Derrotas: {data.losses}</p>
          <p className="text-sm text-slate-600">Taxa: {data.winRate.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.payload.color }}>
            {data.value} partidas
          </p>
          <p className="text-sm text-slate-600">
            {((data.value / matches.length) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Distribuição por Tipo de Resultado */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={20} />
            Distribuição por Tipo de Resultado
          </CardTitle>
          <CardDescription>
            Como você vence e perde suas partidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resultTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {resultTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {resultTypeData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Desempenho por Faixa de ELO */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={20} />
            Desempenho por Faixa de ELO do Oponente
          </CardTitle>
          <CardDescription>
            Vitórias e derrotas contra diferentes níveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceByElo} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="wins" fill="#10b981" name="Vitórias" />
                <Bar dataKey="losses" fill="#ef4444" name="Derrotas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

