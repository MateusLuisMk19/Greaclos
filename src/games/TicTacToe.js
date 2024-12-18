import React, { useState, useEffect, useCallback } from "react";
import { calculateWinner, PreviewGame, Square } from "./shared";
import { makeAIMove } from "./TicTacToeAI";
import { TicTacToeOnline } from './TicTacToeOnline';


// Componente principal do Tic-Tac-Toe
const TicTacToe = () => {
  // Estados para armazenar as células do tabuleiro e de quem é a vez
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlayingAgainstAI, setIsPlayingAgainstAI] = useState(false); // Novo estado para modo IA
  const [aiDifficulty, setAiDifficulty] = useState("easy"); // Novo estado para dificuldade da IA
  const [isOnlineGame, setIsOnlineGame] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [playerId] = useState(() => Math.random().toString(36).substring(2, 8));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [onlineGame, setOnlineGame] = useState(null);
  

  // Estados para pontuação dos jogadores
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // Calcula o vencedor
  const { winner, winningSquares } = calculateWinner(squares);
  const isDraw = squares?.every((square) => square !== null) && !winner;

  // Lida com o clique em uma célula
  const handleClick = async (i) => {
    if (!squares) return;

    if (isOnlineGame) {
      if ((xIsNext && playerSymbol !== 'X') || (!xIsNext && playerSymbol !== 'O')) {
        return;
      }
      try {
        await onlineGame.makeMove(i, playerSymbol);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    if (calculateWinner(nextSquares).winner) {
      if (isOnlineGame) {
        try {
          await onlineGame.updateScore(winner);
        } catch (error) {
          console.error('Erro ao atualizar o placar:', error);
        }
      } else {
        if (xIsNext) {
          setXScore(xScore + 1);
        } else {
          setOScore(oScore + 1);
        }
      }
    }
  };

  // Função para reiniciar o tabuleiro e escolher aleatoriamente quem começa
  const newGame = () => {
    setSquares(Array(9).fill(null));
    const randomStart = Math.random() < 0.5; // 50% de chance para "X" ou "O"
    setXIsNext(randomStart); // Define o jogador inicial aleatoriamente
    isOnlineGame && handleReset();
  };


  // Função para iniciar o jogo
  const startGame = () => {
    newGame();
    setIsStarted(true);
    if (isPlayingAgainstAI && !xIsNext) {
      aiMove(); // Chama a IA para fazer a primeira jogada
    }
  };

  const joinOnlineGame = useCallback(async () => {
    const gameIdInput = prompt('Digite o código da sala:');
    if (!gameIdInput) return;

    try {
      const game = new TicTacToeOnline(gameIdInput, { X: xScore, O: oScore });
      const symbol = await game.joinGame(playerId);
      
      setGameId(gameIdInput);
      setPlayerSymbol(symbol);
      setOnlineGame(game);
      setIsOnlineGame(true);
      setIsStarted(true);

      game.onGameUpdate((gameData) => {
        setSquares(gameData.squares);
        setXIsNext(gameData.currentPlayer === 'X');      
      });
    } catch (error) {
      alert(error.message);
    }
  }, [playerId]);

  // Função para reiniciar o jogo
  const resetGame = () => {
    newGame();
    setIsStarted(false);
    setIsPlayingAgainstAI(false);
    setXScore(0);
    setOScore(0);
  };

  // Função que faz a jogada da IA
  const aiMove = () => {
    makeAIMove(squares, aiDifficulty, handleClick);
  };

  // useEffect para a IA jogar após o jogador
  useEffect(() => {
    if (isPlayingAgainstAI && !xIsNext && isStarted) {
      const timer = setTimeout(() => {
        aiMove();
      }, 500); // Tempo de espera para simular o tempo da IA
      return () => clearTimeout(timer);
    }
  }, [xIsNext, isPlayingAgainstAI, isStarted, squares]);

  // Função para iniciar um jogo online
  const startOnlineGame = useCallback(async () => {
    const game = new TicTacToeOnline();
    const newGameId = await game.createGame();
    const symbol = await game.joinGame(playerId);
    
    setGameId(newGameId);
    setPlayerSymbol(symbol);
    setOnlineGame(game);
    setIsOnlineGame(true);
    setIsStarted(true);
    
    game.onGameUpdate((gameData) => {
      setSquares(gameData.squares);
      setXIsNext(gameData.currentPlayer === 'X');
    });
  }, [playerId]);

  // Limpar listeners quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (onlineGame) {
        onlineGame.cleanup();
      }
    };
  }, [onlineGame]);

  const handleReset = async () => {
    if (isOnlineGame) {
      try {
        await onlineGame.resetGame();
      } catch (error) {
        console.error('Erro ao resetar o jogo:', error);
      }
    } else {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }
  };


  return (
    <div className="flex flex-col items-center">
      {isStarted && (
        <>
          {/* Exibe o status do jogo (vencedor ou próximo jogador) */}
          <div
            className={`${
              winner ? "bg-green-500" : isDraw ? "bg-gray-300" : "bg-white/15"
            } text-center p-2 rounded w-full mb-2`}
          >
            <h2 className="font-bold text-xl">
              {winner
                ? `Winner: ${winner}`
                : isDraw
                ? "It's a Draw!"
                : `Next player: ${xIsNext ? "X" : "O"}`}
            </h2>
          </div>

          {/* Exibe a pontuação */}
          <div className="flex justify-around w-full mb-4">
            <div className="text-xl">
              <strong>Player X: {xScore}</strong>
            </div>
            <div className="text-xl">
              <strong>
                {isPlayingAgainstAI
                  ? "AI " + aiDifficulty.toLocaleUpperCase()
                  : "Player"}{" "}
                O: {oScore}
              </strong>
            </div>
          </div>

          {/* Tabuleiro 3x3 */}
          <div className="grid grid-cols-3 grid-rows-3">
            {squares.map((square, i) => (
              <Square
                key={i}
                value={square}
                onSquareClick={() => handleClick(i)}
                isWinner={winningSquares && winningSquares.includes(i)} // Verifica se a célula faz parte da combinação vencedora
                disabled={isPlayingAgainstAI && !xIsNext} // Desabilita se for a vez da IA
              />
            ))}
          </div>
        </>
      )}

      {!isStarted && (
        <div className="grid grid-cols-3 grid-rows-3">
          <PreviewGame />
        </div>
      )}

      <div className="mt-4 space-x-4 flex items-center">
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          onClick={isStarted ? newGame : startGame}
        >
          {!isStarted ? "Start Game" : "New Game"}
        </button>

        {/* Botão para jogar contra a IA */}
        {!isStarted && (
          <div className="flex divide-x divide-black">
            <button
              className="bg-darkblue-400 hover:bg-darkblue-300 text-white px-4 py-2 rounded-s-lg"
              onClick={() => {
                setIsPlayingAgainstAI(true);
                startGame();
              }}
            >
              {"Jogar contra IA"}
            </button>

            <select
              className="w-fit bg-darkblue-400 hover:bg-darkblue-300 active:bg-darkblue-100 text-white px-1 py-2 rounded-e-lg"
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value)}
            >
              <option value="medium">Dificil</option>
              <option value="easy">Facil</option>
            </select>
          </div>
        )}

        {/* Botão para jogo online */}
        {!isStarted && (
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={startOnlineGame}
            >
              Criar Jogo Online
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={joinOnlineGame}
            >
              Entrar em Jogo Online
            </button>
          </div>
        )}

        {isStarted && (
          <button
            className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded "
            onClick={resetGame}
          >
            {"Terminar Jogo"}
          </button>
        )}
      </div>

      {isOnlineGame && gameId && (
        <div className="mt-4 text-center">
          <p>Código da sala: {gameId}</p>
          <p>Você é: {playerSymbol}</p>
        </div>
      )}
    </div>
  );
};

// Exporta o componente TicTacToe
export default TicTacToe;
