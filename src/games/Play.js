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
  const BACKGROUND = "fixed top-0 bottom-0 w-full bg-black/60 z-10";

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
    <div className="w-full flex relative">
      <NavBar pages={pages} play custom={dropBar} />

      {!dropBar && <div className={BACKGROUND} onClick={handleDropBar}></div>}

      {dropBar && <div className="flex space-x-8 m-4 text-white z-10 ">
        <div className="w-6 cursor-pointer">
          <SiGamedeveloper size={35} onClick={handleDropBar} />
        </div>
        <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
      </div>}

      <div className="w-full h-screen absolute bg-orange-500 -z-10">
        <TicTacToe
          style={
            "absolute bottom-1/2 end-1/2  translate-x-1/2 translate-y-1/2 px-36 h-screen pt-32 bg-white  space-x-4"
          }
        />
      </div>
    </div>
  );
};

export default Play;
