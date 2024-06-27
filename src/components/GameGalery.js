import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const GameGalery = () => {
  const myClasses = "space-4 overflow-x-auto flex ";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myAllGames, setMyAllGames] = useState([]);

  const { getCollection } = useFirestore();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const games = await getCollection("games");
        setMyAllGames(games);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

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

  const game = (game) => {
    // console.log();

    return (
      <button
        key={game.name}
        title={game.name}
        style={{
          backgroundImage: `url('${game.cover.profile}')`,
        }}
        onClick={() => handleClickGame(game)}
        className={
          "relative min-w-36 h-48 bg-white rounded-lg m-1 hover:scale-[1.01] bg-center bg-no-repeat bg-cover"
        }
      >
        <p className="absolute bottom-2 start-2 text-xl font-bold title-game text-paleteOne-400 bg-paleteOne-100/40 hover:scale-105 w-[85%] px-1 justify-start flex ">
          {game.name}
        </p>
      </button>
    );
  };

  return (
    <div className="">
      <div className="bg-paleteOne-300 w-56 p-1 my-2 rounded text-white ">
        Actualy Games
      </div>
      <div className="w-[57.5rem] max-h-48 ">
        <div id="galery-bar" className={myClasses}>
          {myAllGames.map((myGame) => game(myGame))}
        </div>
      </div>
    </div>
  );
};

export default GameGalery;
