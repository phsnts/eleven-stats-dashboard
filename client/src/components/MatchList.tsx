import { Trophy, TrendingUp, TrendingDown, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface MatchListProps {
  matches: Match[];
}

export default function MatchList({ matches }: MatchListProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return `Hoje às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    } else if (isYesterday) {
      return `Ontem às ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    } else {
      return date.toLocaleString("pt-BR", { 
        day: "2-digit", 
        month: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    }
  };

  if (matches.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <Trophy size={48} className="mx-auto mb-4 opacity-50" />
        <p>Nenhuma partida encontrada com os filtros selecionados</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => {
        const isWin = match.playerScore > match.opponentScore;
        const eloDiff = match.opponentElo - match.eloBefore;

        return (
          <div
            key={match.id}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              isWin
                ? "bg-green-50 border-green-200 hover:border-green-300"
                : "bg-red-50 border-red-200 hover:border-red-300"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Informações principais */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant={isWin ? "default" : "destructive"}
                    className="text-xs font-semibold"
                  >
                    {isWin ? "VITÓRIA" : "DERROTA"}
                  </Badge>
                  <span className="text-sm text-slate-600 flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(match.timestamp)}
                  </span>
                  <span className="text-xs text-slate-500">{match.id}</span>
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-slate-600" />
                    <span className="font-semibold text-slate-900">{match.player}</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-700">
                    {match.playerScore} - {match.opponentScore}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">{match.opponent}</span>
                    <Badge variant="outline" className="text-xs">
                      ELO {match.opponentElo}
                    </Badge>
                  </div>
                </div>

                {/* Rounds */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="font-medium">Sets:</span>
                  {match.rounds.map((round, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white rounded border border-slate-200"
                    >
                      {round}
                    </span>
                  ))}
                </div>
              </div>

              {/* Variação de ELO */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  {match.eloChange >= 0 ? (
                    <TrendingUp size={20} className="text-green-600" />
                  ) : (
                    <TrendingDown size={20} className="text-red-600" />
                  )}
                  <span
                    className={`text-2xl font-bold ${
                      match.eloChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {match.eloChange >= 0 ? "+" : ""}
                    {match.eloChange}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  {match.eloBefore} → {match.eloAfter}
                </div>
                {eloDiff !== 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    Oponente {eloDiff > 0 ? `+${eloDiff}` : eloDiff} ELO
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

