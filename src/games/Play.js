import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { SiGamedeveloper } from "react-icons/si";
import TicTacToe from "./TicTacToe";

const Play = () => {
  const { gameId } = useParams();
  const [dropBar, setDropBar] = useState("absolute end-full");
  const handleDropBar = () => {
    dropBar ? setDropBar("") : setDropBar("absolute end-full");
  };

  const pages = [
    {
      label: "Continue",
      component: `Hide`,
      icon: <AiFillHome size={30} />,
    },
    {
      label: "Configurations",
      component: `Modal`,
      icon: <AiFillHome size={30} />,
    },
    {
      label: "Leave Game",
      component: `/game/${gameId}`,
      icon: <AiFillHome size={30} />,
      last: true,
    },
  ];

  return (
    <div className="w-full flex ">
      <NavBar pages={pages} play={true} custom={dropBar} />

      <div className="flex space-x-8 m-4 text-white z-40 ">
        <div className="w-6 cursor-pointer">
          <SiGamedeveloper size={35} onClick={handleDropBar} />
        </div>
        <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
      </div>

      <div id="start-game" className="absolute bg-orange-500 -z-10">
        <div>
          <TicTacToe />
        </div>
      </div>
    </div>
  );
};

export default Play;
