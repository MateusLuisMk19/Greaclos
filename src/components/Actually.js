import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const Actually = (props) => {
  const myClasses = "space-4 overflow-x-auto flex ";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const val
  const [myAllGames, setMyAllGames] = useState();

  const {
    getCollection,
    loading: loadingData,
    error: errorData,
  } = useFirestore();

  const myGames = [
    { name: "Mario", img: "#", link: "c" },
    { name: "TicTacToe", img: "#", link: "ac" },
    { name: "Damas", img: "#", link: "cs" },
    { name: "Xadrez", img: "#", link: "dc" },
    { name: "Jato", img: "#", link: "cf" },
    { name: "Carros", img: "#", link: "gc" },
    { name: "Tira o C", img: "#", link: "hc" },
    { name: "Mão", img: "#", link: "cv" },
  ];

  
  const handleClickGame = (data) => {
    const { id } = data;

    //console.log(id);
    navigate(`/game/${id}`);
  };

  const game = (game) => {
    const bg =
      "bg-[url('https://firebasestorage.googleapis.com/v0/b/greaclos-one.appspot.com/o/games%2FXGT8Y1ckAi8R4Xm0sItl%2Fcover%2Fprofile.jpg?alt=media&token=da2151cf-b560-4d1b-af35-dd2f9a602b30')] bg-center bg-no-repeat bg-cover ";
    return (
      <button
        key={game.name}
        title={game.name}
        onClick={() => handleClickGame(game)}
        className={"relative min-w-36 h-48 bg-white rounded-lg m-1 " + bg}
      >
        <p className="absolute bottom-2 start-2 text-xl font-bold text-yellow-200">
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
        <div id="actually-bar" className={myClasses}>
          {myGames.map((myGame) => game(myGame))}
        </div>
      </div>
    </div>
  );
};

export default Actually;
