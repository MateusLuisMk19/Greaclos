import React from "react";
import TopBar from "../components/TopBar";
import { useFirestore } from "../hooks/useFirestore";
import { Button } from "../components/inputs";
import GameCard from "../components/GameCard";

const Category = () => {
  const myClasses = "space-4 overflow-x-auto flex ";
  const { setDocument, setDocWithId } = useFirestore();

  const myGames = [
    { nome: "Mario", img: "#", link: "c" },
    { nome: "TicTacToe", img: "#", link: "ac" },
    { nome: "Damas", img: "#", link: "cs" },
    { nome: "Xadrez", img: "#", link: "dc" },
    { nome: "Jato", img: "#", link: "cf" },
    { nome: "Carros", img: "#", link: "gc" },
    { nome: "Tira o C", img: "#", link: "hc" },
    { nome: "Mão", img: "#", link: "cv" },
  ];

  const game = (game) => {
    return (
      <a
        key={game.nome}
        href="#"
        className="relative min-w-36 h-48 bg-white rounded-lg m-2 bg-[url('https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg')] bg-contain bg-no-repeat"
      >
        <p className="absolute bottom-2 start-2 text-xl font-bold">
          {game.nome}
        </p>
      </a>
    );
  };

  return (
    <>
      {/* <div className="bg-paleteOne-300 w-56 p-1 my-2 rounded text-white ">
        Actualy Games
      </div>
      <div className="w-[57.25rem] max-h-52 bg-paleteTwo-100">
        <div className={myClasses}>{myGames.map((myGame) => game(myGame))}</div>
      </div> */}

      <Button
        color={"bg-white"}
        hvColor={"bg-red-500"}
        onClick={() =>
          setDocWithId({
            collect: "users",
            id: "eumesmo",
            data: { name: "Mario", link: "c" },
          })
        }
      >
        Add Game
      </Button>

      <Button
        color={"bg-white"}
        hvColor={"bg-red-500"}
        disable
        onClick={() => setDocument("games", { name: "Mario", link: "c" })}
      >
        Update Game
      </Button>

      <Button
        color={"bg-white"}
        disable
        hvColor={"bg-red-500"}
        onClick={() => setDocument("games", { name: "Mario", link: "c" })}
      >
        Delete Game
      </Button>

      <br />
    </>
  );
};

export default Category;
