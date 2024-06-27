import React, { useState, useEffect } from "react";
import { ref, set, onValue, push } from "firebase/database";
import { rt } from "../services/firebase";
import { generateRandomId } from "./shared";

function Square({ value, onSquareClick }) {
  const baseClasses =
    "w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 m-1 border-2 rounded-md font-bold text-6xl";
  let additionalClasses = "bg-paleteOne-300/40";

  if (value === "X") additionalClasses = "bg-paleteOne-300";
  if (value === "O") additionalClasses = "bg-paleteTwo-100/90";

  return (
    <button
      onClick={onSquareClick}
      className={`${baseClasses} ${additionalClasses}`}
      aria-label={`Square ${value ? value : "empty"}`}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // Log para depuração
  console.log("squares in Board:", squares);

  // Verificação de tipo para garantir que squares seja um array
  if (!Array.isArray(squares)) {
    console.error("squares is not an array:", squares);
    squares = Array(9).fill(null);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
    // alert(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = (
      <div className="bg-paleteTwo-300 text-white text-center border-2 border-yellow-500 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Winner: " + winner}
      </div>
    );
  } else if (squares.every((square) => square !== null)) {
    status = (
      <div className="bg-paleteOne-300 text-white text-center border-2 border-gray-200 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Draw"}
      </div>
    );
  } else {
    status = (
      <div className="bg-paleteOne-300/40 text-center border-2 rounded-md m-1 font-bold text-xl w-full py-2">
        {"Next player: " + (xIsNext ? "X" : "O")}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {status}

      <div className="grid grid-cols-3 grid-rows-3">
        {Array.isArray(squares) &&
          squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onSquareClick={() => handleClick(i)}
            />
          ))}
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

const TicTacToe = () => {
  const [gameId, setGameId] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove] || Array(9).fill(null);
  const xIsNext = currentMove % 2 === 0;

  useEffect(() => {
    if (gameId) {
      const gameRef = ref(rt, `tictactoe/${gameId}`);
      onValue(gameRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setHistory(data.history || [Array(9).fill(null)]);
          setCurrentMove(data.currentMove || 0);
        }
      });
    }
  }, [gameId]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (gameId) {
      set(ref(rt, `tictactoe/${gameId}`), {
        history: nextHistory,
        currentMove: nextHistory.length - 1,
      });
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    const initialHistory = [Array(9).fill(null)];
    setHistory(initialHistory);
    setCurrentMove(0);

    if (gameId) {
      set(ref(rt, `tictactoe/${gameId}`), {
        history: initialHistory,
        currentMove: 0,
      });
    }
  }

  function startGame() {
    if (!gameId) {
      const newGameRef = generateRandomId(25); // Irá gerar um ID aleatório de 25 caracteres

      push(ref(rt, "tictactoe"));

      set(ref(rt, `tictactoe/${newGameRef}`), {
        history: [Array(9).fill(null)],
        currentMove: 0,
        xIsNext,
      });
      setGameId(newGameRef);
    } else {
      resetGame();
    }
  }

  function joinGame(id) {
    setGameId(id);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Move #" + move;
    }
    return (
      <li key={move}>
        <button
          className="bg-paleteOne-300/20 text-center border-2 rounded-md m-1 font-medium text-sm"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div
      className={`flex flex-col items-center absolute bottom-1/2 end-1/2 translate-x-1/2 translate-y-1/2 h-screen pt-28 `}
    >
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <div className="flex flex-col items-center mt-4">
        <button
          onClick={startGame}
          className="bg-white hover:bg-paleteOne-200 text-center border-2 rounded-md m-1 font-bold text-xl px-4 py-2"
        >
          {gameId ? "Restart Game" : "Start Game"}
        </button>
      </div>

      <div className="flex flex-col items-center mt-4">
        <input
          type="text"
          placeholder="Enter Game ID"
          className="border rounded-md p-2"
          onBlur={(e) => joinGame(e.target.value)}
        />
      </div>
      {/* <ol className="absolute top-2/3 end-0">{moves}</ol> */}
    </div>
  );
};

export default TicTacToe;
