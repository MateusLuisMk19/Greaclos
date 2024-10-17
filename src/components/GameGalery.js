import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import { useGames } from "../context/gamesContext";

const GameGalery = () => {
  const myClasses = "space-4 overflow-x-auto flex ";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myAllGames, setMyAllGames] = useState([]);

  const { games, allPubsGames } = useGames();

  useEffect(() => {
    games && setMyAllGames(games);
  }, [games, allPubsGames]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar jogos.</div>;
  }

  const handleClickGame = (data) => {
    const { id } = data;
    navigate(`/game/${id}`);
  };

  return (
    <>
      <div className="bg-paleteOne-500 font-bold p-1 my-2 pl-4 text-white w-full">
        All Games
      </div>
      <div className="p-2">
        <div id="galery-bar" className={myClasses}>
          {myAllGames?.map((myGame, index) => (
            <GameCard
              key={myGame.id || index} // Use o índice apenas se não houver um ID único
              game={myGame}
              handleClick={handleClickGame}
              color={"paleteOne-400"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GameGalery;
