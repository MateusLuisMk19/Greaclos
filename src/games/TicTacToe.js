import React, { useState, useEffect } from "react";
import { calculateWinner, PreviewGame, Square } from "./shared";

// Componente principal do Tic-Tac-Toe
const TicTacToe = () => {
  // Estados para armazenar as células do tabuleiro e de quem é a vez
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlayingAgainstAI, setIsPlayingAgainstAI] = useState(false); // Novo estado para modo IA
  const [aiDifficulty, setAiDifficulty] = useState("easy"); // Novo estado para dificuldade da IA

  // Estados para pontuação dos jogadores
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // Calcula o vencedor
  const { winner, winningSquares } = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;

  // Lida com o clique em uma célula
  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // Se houver um vencedor, incrementa a pontuação
    if (calculateWinner(nextSquares).winner) {
      if (xIsNext) setXScore(xScore + 1);
      else setOScore(oScore + 1);
    }
  };

  // Função para reiniciar o tabuleiro e escolher aleatoriamente quem começa
const newGame = () => {
  setSquares(Array(9).fill(null));
  const randomStart = Math.random() < 0.5; // 50% de chance para "X" ou "O"
  setXIsNext(randomStart); // Define o jogador inicial aleatoriamente
};


  // Função para iniciar o jogo
  const startGame = () => {
    newGame();
    setIsStarted(true);
    if (isPlayingAgainstAI && !xIsNext) {
      aiMove(); // Chama a IA para fazer a primeira jogada
    }
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    newGame();
    setIsStarted(false);
    setIsPlayingAgainstAI(false);
    setXScore(0);
    setOScore(0);
  };

  const calculateBestMove = (squares, player) => {
    const opponent = player === "X" ? "O" : "X";

    // Função para calcular o vencedor
    const getWinner = (squares) => {
      const { winner } = calculateWinner(squares);
      return winner;
    };

    // Função recursiva Minimax
    const minimax = (newSquares, depth, isMaximizing, alpha, beta) => {
      const winner = getWinner(newSquares);
      if (winner === player) return 10 - depth;
      if (winner === opponent) return depth - 10;
      if (newSquares.every((square) => square !== null)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newSquares.length; i++) {
          if (newSquares[i] === null) {
            newSquares[i] = player;
            const score = minimax(newSquares, depth + 1, false, alpha, beta);
            newSquares[i] = null;
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break; // Poda beta
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < newSquares.length; i++) {
          if (newSquares[i] === null) {
            newSquares[i] = opponent;
            const score = minimax(newSquares, depth + 1, true, alpha, beta);
            newSquares[i] = null;
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break; // Poda alfa
          }
        }
        return bestScore;
      }
    };

    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = player;
        const score = minimax(squares, 0, false);
        squares[i] = null; // Desfaz a jogada
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  // Função que faz a jogada da IA
  const aiMove = () => {
    if (aiDifficulty === "medium") {
      const move = calculateBestMove(squares, "O"); // "O" é o jogador da IA
      if (move !== undefined) {
        handleClick(move);
      }
    }

    if (aiDifficulty === "easy") {
      const randomChance = Math.random();

      if (randomChance < 0.7) {
        // 70% de chance de jogar aleatoriamente
        const emptySquares = squares
          .map((value, index) => (value === null ? index : null))
          .filter((index) => index !== null);
        const randomIndex =
          emptySquares[Math.floor(Math.random() * emptySquares.length)];
        handleClick(randomIndex);
      } else {
        // 30% de chance de fazer um movimento calculado
        const move = calculateBestMove(squares, "O");
        handleClick(move);
      }
    }
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
              {"Play Against AI"}
            </button>

            <select
              className="w-fit bg-darkblue-400 hover:bg-darkblue-300 active:bg-darkblue-100 text-white px-1 py-2 rounded-e-lg"
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value)}
            >
              <option value="medium">Medium</option>
              <option value="easy">Easy</option>
            </select>
          </div>
        )}

        {isStarted && (
          <button
            className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded "
            onClick={resetGame}
          >
            {"Reset Game"}
          </button>
        )}
      </div>
    </div>
  );
};

// Exporta o componente TicTacToe
export default TicTacToe;
