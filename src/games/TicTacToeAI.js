import { calculateWinner } from "./shared";

export const calculateBestMove = (squares, player) => {
  const opponent = player === "X" ? "O" : "X";

  const getWinner = (squares) => {
    const { winner } = calculateWinner(squares);
    return winner;
  };

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
          if (beta <= alpha) break;
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
          if (beta <= alpha) break;
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
      const score = minimax(squares, 0, false, -Infinity, Infinity);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
};

export const makeAIMove = (squares, aiDifficulty, handleClick) => {
  if (aiDifficulty === "medium") {
    const move = calculateBestMove(squares, "O");
    if (move !== undefined) {
      handleClick(move);
    }
  }

  if (aiDifficulty === "easy") {
    const randomChance = Math.random();

    if (randomChance < 0.7) {
      const emptySquares = squares
        .map((value, index) => (value === null ? index : null))
        .filter((index) => index !== null);
      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      handleClick(randomIndex);
    } else {
      const move = calculateBestMove(squares, "O");
      handleClick(move);
    }
  }
}; 