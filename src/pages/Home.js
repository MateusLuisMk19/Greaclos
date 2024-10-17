import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import GameGalery from "../components/GameGalery";
import { useGames } from "../context/gamesContext";
import Recently from "../components/Recently";

const Home = () => {
  const [pubsGames, setPubsGames] = useState([]);
  const { allPubsGames } = useGames();

  useEffect(() => {

    if (allPubsGames && allPubsGames.length > 0) {
      setPubsGames(allPubsGames[0]);

      if (allPubsGames.length > 1) {
        const intervalo = setInterval(() => {
          const indiceAleatorio = Math.floor(
            Math.random() * allPubsGames.length
          );
          setPubsGames(allPubsGames[indiceAleatorio]);
        }, 3000);

        return () => clearInterval(intervalo);
      }
    }
  }, [allPubsGames, pubsGames]);

  return (
    <div className="w-full">
      <TopBar page="home"  />
      <div className="my-1 h-[60vh] md:h-[28rem] w-full flex">
        <div className="bg-black w-full mx-2 md:mx-0 text-white relative">
          {pubsGames && (
            <div className="w-full h-full flex items-center justify-center">
             <video
               muted
               autoPlay
               loop
               playsInline
               className="absolute inset-0 w-full h-full object-cover md:object-fit"
               src={pubsGames?.url}
               type="video/mp4"
             >
               Desculpe, seu navegador não suporta vídeos incorporados.
             </video>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 h-fit">
        <GameGalery />
      </div>
      <div className="mt-2 h-fit md:hidden">
        <Recently />
      </div>
    </div>
  );
};

export default Home;
