import React, { Suspense } from "react";
import TopBar from "../components/TopBar";
import { useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import NavBar from "../components/NavBar";

const Game = (myGame) => {
  const { id } = useParams();
  const bg =
    "bg-[url('" + "https://www.youtube.com/watch?v=qBFrTuY6kfk" + "')]  ";
  const pages = [
    {
      label: "Go Home",
      component: "/",
      icon: <AiFillHome size={30} />,
    },
  ];

  return (
    <>
      <NavBar pages={pages} fake={true} />
      <div className="w-full bg-red-200 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="h-screen relative">
            <TopBar page="game" float={true} classes="mt-2" />

            <div className="h-2/3 z-40">
              <div className={"bg-yellow-400 h-2/3 w-full text-white " + bg}>
                Pub of game {id}
              </div>
              <div className="h-44 w-full bg-gradient-to-b from-black via-black to-transparent ">
                d
              </div>

              <video
                autoplay
                className="min-w-full min-h-full"
                loop
                poster="nome-do-video.jpg"
                class="bg_video"
              >
                <source
                  src="https://www.youtube.com/watch?v=qBFrTuY6kfk"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* <div className="absolute bottom-0 w-full z-0 ">
  <div className="bg-paleteOne-300 h-72 text-white">Actualy</div>
</div> */}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Game;
