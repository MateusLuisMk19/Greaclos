import React, { useState, useCallback, memo } from "react";

const Square = memo(({ value, onSquareClick }) => {
  const baseClasses =
    "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 rounded-md m-1 font-bold text-6xl flex items-center justify-center";
  let additionalClasses = "bg-paleteOne-300/20";

  if (value === "X") additionalClasses = "bg-paleteOne-300";
  if (value === "O") additionalClasses = "bg-paleteTwo-100/70";

  return (
    <button
      onClick={onSquareClick}
      className={`${baseClasses} ${additionalClasses}`}
      aria-label={`Square ${value ? value : "empty"}`}
    >
      {value}
    </button>
  );
});

function Board({ xIsNext, squares, onPlay }) {
  const handleClick = useCallback(
    (i) => {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? "X" : "O";
      onPlay(nextSquares);
    },
    [squares, xIsNext, onPlay]
  );

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = (
      <div className="bg-paleteTwo-300/50 text-center border-2 border-yellow-200 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Winner: " + winner}
      </div>
    );
  } else if (!squares.includes(null)) {
    status = (
      <div className="bg-paleteOne-300/50 text-center border-2 border-gray-200 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Draw"}
      </div>
    );
  } else {
    status = (
      <div className="bg-paleteOne-300/20 text-center border-2 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Next player: " + (xIsNext ? "X" : "O")}
      </div>
    );
  }

  const boardRow = "flex";

  return (
    <div className="flex flex-col items-center">
      {status}

      <div>
        <div className={boardRow}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className={boardRow}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className={boardRow}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const TicTacToe = ({ style }) => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Move #" + move;
    }
    return (
      <li key={move}>
        <button
          disabled
          className="bg-paleteOne-300/20 text-center border-2 rounded-md m-1 font-medium text-sm"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className={`flex flex-col items-center ${style}`}>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <div className="flex flex-col items-center mt-4">
        <button
          onClick={resetGame}
          className="bg-paleteOne-300/20 text-center border-2 rounded-md m-1 font-bold text-xl px-4 py-2"
        >
          Reset Game
        </button>
        <ol className="absolute top-1/2 end-16">{moves}</ol>
      </div>
    </div>
  );
};

export default TicTacToe;
