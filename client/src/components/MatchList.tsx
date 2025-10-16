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
    // Se já está em formato legível, retornar direto
    if (timestamp.includes('Today at')) {
      return timestamp.replace('Today at', 'Hoje às');
    } else if (timestamp.includes('Last Tuesday')) {
      return timestamp.replace('Last Tuesday at', 'Terça passada às');
    } else if (timestamp.includes('Last Monday')) {
      return timestamp.replace('Last Monday at', 'Segunda passada às');
    } else if (timestamp.includes('Last Friday')) {
      return timestamp.replace('Last Friday at', 'Sexta passada às');
    } else if (timestamp.includes('Last Wednesday')) {
      return timestamp.replace('Last Wednesday at', 'Quarta passada às');
    } else if (timestamp.includes('Last Thursday')) {
      return timestamp.replace('Last Thursday at', 'Quinta passada às');
    } else if (timestamp.includes('Last Saturday')) {
      return timestamp.replace('Last Saturday at', 'Sábado passado às');
    } else if (timestamp.includes('Last Sunday')) {
      return timestamp.replace('Last Sunday at', 'Domingo passado às');
    }
    
    // Para datas no formato MM/DD/YYYY, tentar converter
    const dateMatch = timestamp.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (dateMatch) {
      const [_, month, day, year] = dateMatch;
      return `${day}/${month}/${year}`;
    }
    
    // Fallback: retornar timestamp original
    return timestamp;
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

