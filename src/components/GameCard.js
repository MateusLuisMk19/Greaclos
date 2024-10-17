const GameCard = ({ game, handleClick, color, isSquare = false }) => {
  const myClasses = isSquare ? "min-w-52 min-h-52" : "min-w-36 min-h-48";

  return (
    <button
      title={game.name}
      style={{
        backgroundImage: `url('${game?.cover?.profile}')`,
      }}
      onClick={() => handleClick(game)}
      className={
        "relative bg-white rounded-lg m-1 hover:scale-[1.01] bg-center bg-no-repeat bg-cover " +
        myClasses
      }
    >
      <p
        className={`${
          isSquare
            ? " w-full justify-center text-2xl"
            : "absolute  w-[85%] bottom-2 start-2 justify-start text-xl"
        } font-bold title-game text-${color}  hover:scale-105 px-1  flex `}
      >
        {game.name}
      </p>
    </button>
  );
};

export default GameCard;
