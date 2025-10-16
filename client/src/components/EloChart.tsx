import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

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

interface EloChartProps {
  matches: Match[];
}

export default function EloChart({ matches }: EloChartProps) {
  const chartData = useMemo(() => {
    // Inverter ordem para mostrar do mais antigo ao mais recente
    const reversed = [...matches].reverse();
    
    return reversed.map((match, index) => ({
      index: index + 1,
      elo: match.eloAfter,
      opponent: match.opponent,
      result: match.playerScore > match.opponentScore ? "Vitória" : "Derrota",
      eloChange: match.eloChange,
    }));
  }, [matches]);

  const initialElo = matches.length > 0 ? matches[matches.length - 1].eloBefore : 2000;
  const currentElo = matches.length > 0 ? matches[0].eloAfter : 2000;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">Partida #{data.index}</p>
          <p className="text-sm text-slate-600">vs {data.opponent}</p>
          <p className={`text-sm font-medium ${data.result === "Vitória" ? "text-green-600" : "text-red-600"}`}>
            {data.result}
          </p>
          <p className="text-lg font-bold text-blue-600 mt-1">
            ELO: {data.elo}
          </p>
          <p className={`text-sm ${data.eloChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            {data.eloChange >= 0 ? "+" : ""}{data.eloChange}
          </p>
        </div>
      );
    }
    return null;
  };

  if (matches.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-500">
        Nenhuma partida encontrada para exibir
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="index" 
            stroke="#64748b"
            label={{ value: "Número da Partida", position: "insideBottom", offset: -5 }}
          />
          <YAxis 
            stroke="#64748b"
            domain={['dataMin - 50', 'dataMax + 50']}
            label={{ value: "ELO", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={initialElo} 
            stroke="#94a3b8" 
            strokeDasharray="5 5"
            label={{ value: `Inicial: ${initialElo}`, position: "right", fill: "#64748b" }}
          />
          <Line 
            type="monotone" 
            dataKey="elo" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-600">ELO Inicial: {initialElo}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-600">ELO Atual: {currentElo}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-slate-600">
            Variação: {currentElo - initialElo >= 0 ? "+" : ""}{currentElo - initialElo}
          </span>
        </div>
      </div>
    </div>
  );
}

