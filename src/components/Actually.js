import React from "react";
import ttt_img from "../tictactoe.png";
import { useNavigate } from "react-router-dom";

const Actually = (props) => {
  const myClasses = "space-4 overflow-x-auto flex ";
  const navigate = useNavigate();

  const myGames = [
    {
      id: "Ihd65dgnjdu",
      nome: "TicTacToe",
      img: "https://img.freepik.com/free-vector/hands-holding-pencils-play-tic-tac-toe-people-drawing-crosses-noughts-simple-game-children-flat-vector-illustration-strategy-concept-banner-website-design-landing-web-page_74855-24786.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Mario",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Tira",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Damas",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Xadrez",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Jato",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
    {
      id: "Ihd65dgnjdu",
      nome: "Carros",
      img: "https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg",
    },
  ];

  const handleClickGame = (data) => {
    const { id } = data;

    //console.log(id);
    navigate(`/game/${id}`);
  };

  const game = (game) => {
    const bg = "bg-[url('" + game.img + "')] bg-center bg-no-repeat bg-cover ";
    return (
      <button
        key={game.nome}
        title={game.nome}
        onClick={() => handleClickGame(game)}
        className={"relative min-w-36 h-48 bg-white rounded-lg m-1 " + bg}
      >
        <p className="absolute bottom-2 start-2 text-xl font-bold text-yellow-200">
          {game.nome}
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
