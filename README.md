# 🏓 Eleven Table Tennis - Dashboard de Estatísticas

Dashboard interativo para análise de estatísticas do **Eleven Table Tennis VR**, com visualização de partidas, evolução de ELO, filtros personalizáveis e muito mais!

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)

## ✨ Funcionalidades

- 📊 **690 partidas reais** com dados completos
- 🎯 **Filtros inteligentes** por período (hoje, semana, mês) e quantidade
- 📈 **Gráficos interativos** de evolução de ELO
- 📄 **Paginação** de 25 partidas por página
- 🎨 **Estatísticas avançadas**:
  - Taxa de vitória e derrotas
  - Distribuição por tipo de resultado (2x0, 2x1, etc.)
  - Desempenho por faixa de ELO dos oponentes
  - Maior ganho e perda de ELO
- 🌐 **Design responsivo** e moderno
- ⚡ **Performance otimizada** com React 19

## 🚀 Como Usar

### Instalação

```bash
# Clone o repositório
git clone https://github.com/phsnts/eleven-stats-dashboard.git

# Entre na pasta
cd eleven-stats-dashboard

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

Acesse: http://localhost:3000

### Build para Produção

```bash
# Gere os arquivos otimizados
npm run build
# ou
pnpm build
```

## 🛠️ Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes UI
- **Recharts** - Gráficos interativos
- **Lucide Icons** - Ícones

## 📊 Estrutura de Dados

Os dados das partidas estão em `client/src/data/matches.json` com a seguinte estrutura:

```json
{
  "id": "#69265492",
  "timestamp": "Today at 2:39 PM",
  "player": "phsantos",
  "opponent": "lukiezed",
  "playerScore": 2,
  "opponentScore": 0,
  "rounds": ["11-4", "12-10"],
  "eloChange": 23,
  "eloBefore": 2045,
  "eloAfter": 2068,
  "opponentElo": 2217
}
```

## 🔄 Atualizando os Dados

Para atualizar com suas próprias partidas:

1. Acesse seu perfil no [Eleven Table Tennis](https://elevenvr.net)
2. Salve a página HTML completa
3. Use o script de parsing ou substitua o arquivo `matches.json`

## 📝 Licença

MIT License - Sinta-se livre para usar e modificar!

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ para a comunidade Eleven Table Tennis VR
