import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  if (value == "X")
    return (
      <button
        onClick={onSquareClick}
        className="bg-paleteOne-300 w-16 border-2 rounded-md m-1 font-bold text-xl"
      >
        {value}
      </button>
    );

  if (value == "O")
    return (
      <button
        onClick={onSquareClick}
        className="bg-paleteTwo-100/70 w-16 border-2 rounded-md m-1 font-bold text-xl"
      >
        {value}
      </button>
    );

  return (
    <button
      onClick={onSquareClick}
      className="bg-paleteOne-300/20 w-16 border-2 rounded-md m-1 font-bold text-xl"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const board_row = "min-h-16 min-w-48 max-h-16 max-w-48 flex flex-row";

  return (
    <div className="">
      <div className="bg-paleteOne-300/20 text-center border-2 rounded-md m-1 font-bold text-xl">
        {status}
      </div>

      <div className="">
        <div className={board_row}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className={board_row}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className={board_row}>
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
//win
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

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Move #" + move;
    } else {
      description = "Game start";
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
    <div className={"flex " + style}>
      <div className="">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      
      <div className="absolute end-0">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default TicTacToe;
