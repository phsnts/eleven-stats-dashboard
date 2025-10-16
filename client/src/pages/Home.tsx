import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, Target, Calendar, Users } from "lucide-react";
import matchesData from "@/data/matches.json";
import EloChart from "@/components/EloChart";
import MatchList from "@/components/MatchList";
import StatsCards from "@/components/StatsCards";
import AdvancedStats from "@/components/AdvancedStats";

export default function Home() {
  const [gameLimit, setGameLimit] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Função para converter timestamp do formato "Today at X:XX PM" para Date
  const parseTimestamp = (timestamp: string): Date => {
    const now = new Date();
    
    if (timestamp.includes('Today at')) {
      return now; // Jogos de hoje
    } else if (timestamp.includes('Last Tuesday') || timestamp.includes('Last Monday') || timestamp.includes('Last Friday')) {
      // Jogos da semana passada
      const daysAgo = 7;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date;
    } else if (timestamp.match(/\d{2}\/\d{2}\/\d{4}/)) {
      // Formato MM/DD/YYYY
      const parts = timestamp.match(/(\d{2})\/(\d{2})\/(\d{4})/);
      if (parts) {
        return new Date(parseInt(parts[3]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
    }
    
    // Fallback: retornar data antiga
    return new Date(2020, 0, 1);
  };

  // Filtrar partidas baseado nos filtros selecionados
  const filteredMatches = useMemo(() => {
    let matches = [...matchesData];

    // Filtro por data
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          matches = matches.filter(m => m.timestamp.includes('Today at'));
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          matches = matches.filter(m => {
            const matchDate = parseTimestamp(m.timestamp);
            return matchDate >= filterDate;
          });
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          matches = matches.filter(m => {
            const matchDate = parseTimestamp(m.timestamp);
            return matchDate >= filterDate;
          });
          break;
      }
    }

    // Filtro por quantidade
    if (gameLimit !== "all") {
      const limit = parseInt(gameLimit);
      matches = matches.slice(0, limit);
    }

    return matches;
  }, [gameLimit, dateFilter]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const wins = filteredMatches.filter(m => m.playerScore > m.opponentScore).length;
    const losses = filteredMatches.filter(m => m.playerScore < m.opponentScore).length;
    const total = filteredMatches.length;
    const winRate = total > 0 ? (wins / total) * 100 : 0;

    const eloChange = filteredMatches.length > 0 
      ? filteredMatches[0].eloAfter - filteredMatches[filteredMatches.length - 1].eloBefore
      : 0;

    const avgOpponentElo = filteredMatches.length > 0
      ? filteredMatches.reduce((sum, m) => sum + m.opponentElo, 0) / filteredMatches.length
      : 0;

    const biggestWin = filteredMatches
      .filter(m => m.playerScore > m.opponentScore)
      .reduce((max, m) => m.eloChange > max ? m.eloChange : max, 0);

    const biggestLoss = filteredMatches
      .filter(m => m.playerScore < m.opponentScore)
      .reduce((min, m) => m.eloChange < min ? m.eloChange : min, 0);

    return {
      total,
      wins,
      losses,
      winRate,
      eloChange,
      avgOpponentElo,
      biggestWin,
      biggestLoss,
      currentElo: filteredMatches.length > 0 ? filteredMatches[0].eloAfter : 0
    };
  }, [filteredMatches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Trophy className="text-amber-500" size={32} />
                Eleven Table Tennis
              </h1>
              <p className="text-slate-600 mt-1">Dashboard de Estatísticas - phsantos</p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg">
              <Target size={24} />
              <div>
                <div className="text-xs opacity-90">ELO Atual</div>
                <div className="text-2xl font-bold">{stats.currentElo}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Filtros */}
        <Card className="mb-6 shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Filtros
            </CardTitle>
            <CardDescription>
              Selecione o período e quantidade de jogos para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Período
                </label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os jogos</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                    <SelectItem value="month">Último mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Quantidade de Jogos
                </label>
                <Select value={gameLimit} onValueChange={setGameLimit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="10">Últimos 10</SelectItem>
                    <SelectItem value="20">Últimos 20</SelectItem>
                    <SelectItem value="30">Últimos 30</SelectItem>
                    <SelectItem value="50">Últimos 50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setDateFilter("all");
                    setGameLimit("all");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Estatísticas */}
        <StatsCards stats={stats} />

        {/* Estatísticas Avançadas */}
        <AdvancedStats matches={filteredMatches} />

        {/* Gráfico de Evolução do ELO */}
        <Card className="mb-6 shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Evolução do ELO
            </CardTitle>
            <CardDescription>
              Acompanhe a progressão do seu ranking ao longo das partidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EloChart matches={filteredMatches} />
          </CardContent>
        </Card>

        {/* Lista de Partidas */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Histórico de Partidas
            </CardTitle>
            <CardDescription>
              {filteredMatches.length} partida{filteredMatches.length !== 1 ? 's' : ''} encontrada{filteredMatches.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MatchList matches={filteredMatches} />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-12">
        <div className="container py-6 text-center text-slate-600 text-sm">
          <p>Dashboard de Estatísticas do Eleven Table Tennis VR</p>
          <p className="mt-1">Desenvolvido para análise de desempenho e evolução</p>
        </div>
      </footer>
    </div>
  );
}

