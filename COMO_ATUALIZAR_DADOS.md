# 📊 Como Atualizar os Dados do Dashboard

Este documento explica como atualizar as partidas no dashboard do Eleven Table Tennis.

## 🎯 Método Simples (Recomendado)

### Opção 1: Me envie a URL do seu perfil

Basta me enviar a URL do seu perfil do Eleven Table Tennis (exemplo: `https://elevenvr.net/eleven/2322632`) e eu atualizo automaticamente todos os dados para você!

**Exemplo:**
```
"Atualiza meu dashboard com os dados de hoje"
ou
"Adiciona as últimas 20 partidas no dashboard"
```

---

## 🔧 Método Manual (Para usuários avançados)

Se você quiser atualizar manualmente, siga os passos abaixo:

### 1. Localize o arquivo de dados

O arquivo com todas as partidas está em:
```
client/src/data/matches.json
```

### 2. Formato dos dados

Cada partida deve seguir este formato:

```json
{
  "id": "#69265492",
  "timestamp": "2025-10-16T17:39:00",
  "player": "PHSANTOS",
  "opponent": "LUKIEZED",
  "playerScore": 2,
  "opponentScore": 0,
  "rounds": ["11-4", "12-10"],
  "eloChange": 23,
  "eloBefore": 2045,
  "eloAfter": 2068,
  "opponentElo": 2217
}
```

### 3. Campos obrigatórios

- **id**: ID único da partida (ex: "#69265492")
- **timestamp**: Data e hora no formato ISO (ex: "2025-10-16T17:39:00")
- **player**: Seu nome de usuário (sempre "PHSANTOS")
- **opponent**: Nome do oponente
- **playerScore**: Sua pontuação (0, 1 ou 2)
- **opponentScore**: Pontuação do oponente (0, 1 ou 2)
- **rounds**: Array com os placares de cada set (ex: ["11-4", "12-10"])
- **eloChange**: Variação do ELO (positivo para ganho, negativo para perda)
- **eloBefore**: Seu ELO antes da partida
- **eloAfter**: Seu ELO depois da partida
- **opponentElo**: ELO do oponente

### 4. Ordem das partidas

⚠️ **IMPORTANTE**: As partidas devem estar ordenadas da **mais recente para a mais antiga** (ordem decrescente por data).

### 5. Partidas 0x0 são automaticamente excluídas

O dashboard filtra automaticamente partidas canceladas ou não iniciadas (onde ambos os jogadores têm pontuação 0).

---

## 📝 Exemplo de Atualização Manual

1. Abra o arquivo `client/src/data/matches.json`
2. Adicione suas novas partidas no **início** do array (mais recentes primeiro)
3. Salve o arquivo
4. O dashboard será atualizado automaticamente!

**Exemplo:**

```json
[
  {
    "id": "#69999999",
    "timestamp": "2025-10-17T18:00:00",
    "player": "PHSANTOS",
    "opponent": "NOVO_OPONENTE",
    "playerScore": 2,
    "opponentScore": 1,
    "rounds": ["11-9", "9-11", "11-7"],
    "eloChange": 15,
    "eloBefore": 2068,
    "eloAfter": 2083,
    "opponentElo": 2100
  },
  {
    "id": "#69265492",
    "timestamp": "2025-10-16T17:39:00",
    ...
  }
]
```

---

## 🚀 Dicas

1. **Backup**: Sempre faça backup do arquivo `matches.json` antes de editar manualmente
2. **Validação**: Use um validador JSON online para verificar se o formato está correto
3. **Automático**: Prefira me pedir para atualizar - é mais rápido e seguro!

---

## ❓ Precisa de Ajuda?

Basta me enviar uma mensagem com:
- "Atualiza meu dashboard"
- "Adiciona as partidas de hoje"
- "Quero ver as últimas 50 partidas"

E eu cuido de tudo para você! 😊

