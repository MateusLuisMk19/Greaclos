const generateRandomId = (length) => {
  if (length <= 0) {
    return "";
  }

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let result = "";

  // Gera o primeiro caractere, que será sempre uma letra
  const lettersLength = letters.length;
  result += letters.charAt(Math.floor(Math.random() * lettersLength));

  // Gera os caracteres restantes
  const charactersLength = characters.length;
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


// TICTACTOE
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
export const calculateWinner = (squares) => {
  // Verifica se squares é undefined ou null
  if (!squares) {
    return { winner: null, winningSquares: null };
  }

  const lines = [
    [0, 1, 2], // horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]
    ) {
      return {
        winner: squares[a],
        winningSquares: lines[i]
      };
    }
  }

  return { winner: null, winningSquares: null };
};

// Componente Square que representa uma célula do tabuleiro
function Square({ value, onSquareClick, isWinner, disabled }) {
  const btnClasses = `
    w-16 h-16 m-1 rounded-md font-bold text-6xl
    sm:w-24 sm:h-24 md:w-32 md:h-32
    hover:border-gray-100/30 hover:border-2
    ${value === "X" ? "bg-blue-500" : value === "O" ? "bg-yellow-500" : "bg-white/10"}
    ${isWinner ? "scale-110 animate-spin transition-transform duration-300" : ""}
  `;

  return (
    <button
      className={btnClasses}
      onClick={!disabled ? onSquareClick : null}
      aria-label={`Square ${value || "empty"}`}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

const objToArr = (obj) => {
  //percorre o objeto e cria um array com os indices correspondentes as chaves do objeto e valor correspondente ao valor do objeto, se o objeto nao possuir o indice, ele cria com null
  const arr = [];
  for (let i = 0; i < 9; i++) {
      arr[i] = obj[i] || null;
  }
  return arr;
}


export { generateRandomId, PreviewGame, Square, objToArr };
