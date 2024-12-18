import { ref, set, onValue, remove, get } from "firebase/database";
import { rt } from "../services/firebase";
import { objToArr } from "./shared";

export class TicTacToeOnline {
  constructor(gameId = null) {
    this.gameId = gameId || this.generateGameId();
    this.gameRef = ref(rt, `ticTacToe/games/${this.gameId}`);
    this.listeners = [];
  }

  generateGameId() {
    return Math.random().toString(36).substring(2, 8);
  }

  // Criar uma nova sala
  async createGame() {
    const initialGame = {
      squares: Array(9).fill(null),
      currentPlayer: "X",
      players: {
        X: null,
        O: null,
      },
      status: "waiting",
      score: {
        X: 0,
        O: 0,
        ties: 0
      },
    };

    await set(this.gameRef, initialGame);
    return this.gameId;
  }

  // Entrar em uma sala existente
  async joinGame(playerId) {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) {
      throw new Error("Sala não encontrada");
    }

    if (gameData.status === "full") {
      throw new Error("Sala cheia");
    }

    const updatedPlayers = { ...gameData.players };

    if (!updatedPlayers.X) {
      updatedPlayers.X = playerId;
    } else if (!updatedPlayers.O) {
      updatedPlayers.O = playerId;
    }

    const status = updatedPlayers.X && updatedPlayers.O ? "full" : "waiting";

    await set(this.gameRef, {
      ...gameData,
      players: updatedPlayers,
      status,
    });

    return updatedPlayers.X === playerId ? "X" : "O";
  }

  // Fazer uma jogada
  async makeMove(index, player) {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) {
      throw new Error("Jogo não encontrado");
    }

    if (gameData.currentPlayer !== player) {
      throw new Error("Não é sua vez");
    }

    // Garantir que squares seja um array
    const squares = gameData?.squares
      ? objToArr(gameData?.squares)
      : Array(9).fill(null);

    if (squares[index] !== null) {
      throw new Error("Posição já ocupada");
    }

    // Criar uma nova cópia do array
    const newSquares = [...squares];
    newSquares[index] = player;

    console.log(newSquares);

    await set(this.gameRef, {
      ...gameData,
      squares: newSquares,
      currentPlayer: player === "X" ? "O" : "X",
    });
  }

  // Observar mudanças no jogo
  onGameUpdate(callback) {
    const unsubscribe = onValue(this.gameRef, (snapshot) => {
      const gameData = snapshot.val();
      // Verifica se existem dados do jogo
      if (gameData) {
        const mySquare = gameData?.squares
          ? objToArr(gameData?.squares)
          : Array(9).fill(null);
        // Se o squares não for um array (por exemplo, se for um objeto ou null)
        // cria um novo array com 9 posições preenchidas com null
        // if (!Array.isArray(gameData.squares)) {
        gameData.squares = mySquare;
        // }
        // Chama o callback passando os dados atualizados do jogo
        callback(gameData);
      }
    });

    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // Sair do jogo
  async leaveGame(playerId) {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) return;

    const updatedPlayers = { ...gameData.players };

    if (updatedPlayers.X === playerId) {
      updatedPlayers.X = null;
    } else if (updatedPlayers.O === playerId) {
      updatedPlayers.O = null;
    }

    if (!updatedPlayers.X && !updatedPlayers.O) {
      await remove(this.gameRef);
    } else {
      await set(this.gameRef, {
        ...gameData,
        players: updatedPlayers,
        status: "waiting",
      });
    }
  }

  // Limpar listeners quando o componente for desmontado
  cleanup() {
    this.listeners.forEach((unsubscribe) => unsubscribe());
    this.listeners = [];
  }

  // Adicionar este método na classe TicTacToeOnline
  async resetGame() {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) {
      throw new Error("Jogo não encontrado");
    }

    await set(this.gameRef, {
      ...gameData,
      squares: Array(9).fill(null),
      currentPlayer: "X",
    });
  }

  // Adicionar método para atualizar placar
  async updateScore(winner) {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) {
      throw new Error('Jogo não encontrado');
    }

    const newScore = {
      ...gameData.score,
      [winner]: gameData.score[winner] + 1
    };

    await set(this.gameRef, {
      ...gameData,
      score: newScore
    });
  }

  // Método para resetar o placar
  async resetScore() {
    const snapshot = await get(this.gameRef);
    const gameData = snapshot.val();

    if (!gameData) {
      throw new Error('Jogo não encontrado');
    }

    await set(this.gameRef, {
      ...gameData,
      score: {
        X: 0,
        O: 0,
        ties: 0
      }
    });
  }
}
