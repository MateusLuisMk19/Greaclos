import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const Recently = ({}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myAllGames, setMyAllGames] = useState([]);

  const { getCollectionWhere } = useFirestore();

  const game = {
    cover: {
      background:
        "https://firebasestorage.googleapis.com/v0/b/greaclos-one.appspot.com/o/games%2FCdXmdjbVGH2gx9Dbgphb%2Fcover%2FSuper_tic-tac-toe_rules_example.png?alt=media&token=aebdcc90-7bd3-4380-a78f-ecbac169ca16",
      profile: "",
    },
    description: "Novo Jogo",
    id: "CdXmdjbVGH2gx9Dbgphb",
    info: {
      cpu: false,
      difficult: 3,
      max_players: 1,
      min_players: 0,
    },
    name: "Novo Jogo",
    pubs: [],
    rate: {},
    note: 2,
    reviews: [],
  };

  useEffect(() => {
    /*  const fetchGames = async () => {
      setLoading(true);
      try {
        const games = await getCollectionWhere({
          collect: "games",
          whr: { attr: "category", comp: "==", value: "board" },
        });
        setMyAllGames(games);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGames(); */
  }, []);

  return (
    <>
      <div className="bg-paleteOne-500 font-bold p-1 px-3 my-2 text-white ">
        Recently Played
      </div>
      <div className="flex flex-col items-center space-y-1 overflow-y-auto h-52 custom-scrollbar">
        <GameCard
          game={game}
          handleClick={() => {}}
          color={"paleteOne-400"}
          isSquare
        />{" "}
        <GameCard
          game={game}
          handleClick={() => {}}
          color={"paleteOne-400"}
          isSquare
        />
      </div>
    </>
  );
};

export default Recently;
