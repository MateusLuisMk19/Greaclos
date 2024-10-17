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
      return { winner: squares[a], winningSquares: lines[i] }; // Retorna vencedor e células vencedoras
    }
  }
  return { winner: null, winningSquares: null }; // Se não houver vencedor, retorna null
}

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

export { generateRandomId, PreviewGame, calculateWinner, Square };
