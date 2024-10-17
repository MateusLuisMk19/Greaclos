import React, { useState } from "react";

// Componente Square que representa uma célula do tabuleiro
function Square({ value, onSquareClick, isWinner }) {
  const btnClassSm = " sm:w-24 sm:h-24 ";
  const btnClassMd = " md:w-32 md:h-32 ";
  const btnClassHover = " hover:border-gray-100/30 hover:border-2";
  const btnClassCondition = ` ${
    value === "X"
      ? "bg-blue-500"
      : value === "O"
      ? "bg-yellow-500"
      : "bg-white/10 "
  } `;

  return (
    <button
      // Estilos do botão
      className={
        "w-16 h-16 m-1 rounded-md font-bold text-6xl" +
        btnClassSm +
        btnClassMd +
        btnClassHover +
        btnClassCondition +
        (isWinner ? " scale-105 animate-pulse transition-transform duration-300" : "") // Adiciona animação de vitória
      }
      onClick={onSquareClick} // Chama a função quando o botão é clicado
      aria-label={`Square ${value ? value : "empty"}`} // Acessibilidade: descrição do botão
    >
      {value} {/* Exibe o valor atual da célula (X, O ou vazio) */}
    </button>
  );
}

// Componente principal do Tic-Tac-Toe
const TicTacToe = () => {
  // Estados para armazenar as células do tabuleiro e de quem é a vez
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

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

  // Função para reiniciar o tabuleiro
  const newGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Função para iniciar o jogo
  const startGame = () => {
    newGame();
    setIsStarted(true);
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    newGame();
    setIsStarted(true);
    setXScore(0);
    setOScore(0);
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
              <strong>Player O: {oScore}</strong>
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

      <div className="mt-4 space-x-4">
        <button
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-4"
          onClick={isStarted ? newGame : startGame}
        >
          {!isStarted ? "Start Game" : "New Game"}
        </button>
       {isStarted && <button
          className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={resetGame}
        >
          {"Reset Game"}
        </button>}
      </div>
    </div>
  );
};

// Tela inicial
function PreviewGame() {
  const gameName = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
  ];

  return (
    <>
      {gameName.map((letter, idx) => (
        <button
          className={
            "hover:scale-105 w-16 h-16 m-1 rounded-md font-bold text-6xl sm:w-24 sm:h-24 md:w-32 md:h-32 " +
            colors[idx]
          }
          key={idx}
        >
          {letter}
        </button>
      ))}
    </>
  );
}

// Função para calcular o vencedor
function calculateWinner(squares) {
  // Combinações possíveis para vencer
  const lines = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna da esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna da direita
    [0, 4, 8], // Diagonal da esquerda para direita
    [2, 4, 6], // Diagonal da direita para esquerda
  ];

  // Verifica cada combinação
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // Desestrutura a combinação
    // Se os três valores da combinação forem iguais e não forem nulos, retornamos o vencedor
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: lines[i] }; // Retorna o vencedor e a combinação vencedora
    }
  }
  return { winner: null, winningSquares: null }; // Se não houver vencedor, retorna null
}

// Exporta o componente TicTacToe
export default TicTacToe;
