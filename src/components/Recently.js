import React from "react";

const Recently = (props) => {
  const myClasses = "";

  const myGame = { nome: "Mario", img: "#", link: "" };

  const game = (game) => {
    return (
      <a
        href="#"
        className="relative min-h-36 w-48 bg-white rounded-lg m-2 bg-[url('https://img2.rtve.es/i/?w=1600&i=1632450182030.jpg')] bg-contain bg-no-repeat"
      >
        <p className="absolute bottom-2 start-2 text-xl font-bold">
          {game.nome}
        </p>
      </a>
    );
  };

  return (
    <div className="ml-4">
      <div className="bg-paleteOne-300 w-56 p-1 my-2 rounded text-white ">
        Actualy Games
      </div>
      <div className="bg-paleteOne-300">Oi</div>
    </div>
  );
};

export default Recently;
