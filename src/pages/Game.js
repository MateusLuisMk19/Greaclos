import React, { Suspense, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import { AiFillHome } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

// Components
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

const Game = (myGame) => {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const bg =
    "bg-[url('" +
    "https://img.freepik.com/free-vector/hands-holding-pencils-play-tic-tac-toe-people-drawing-crosses-noughts-simple-game-children-flat-vector-illustration-strategy-concept-banner-website-design-landing-web-page_74855-24786.jpg" +
    "')] bg-center bg-no-repeat bg-cover ";

  const pages = [
    {
      label: "Go Home",
      component: "/",
      icon: <AiFillHome size={30} />,
    },
  ];

  const handleFavorite = () => {
    favorite ? setFavorite(false) : setFavorite(true);
  };

  const goPlay = (gameId) => {
    navigate(`/play/${gameId}`);
  };
  return (
    <>
      <NavBar pages={pages} fake={true} />
      <div className="w-full bg-red-200 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="h-screen relative">
            <TopBar page="game" float={true} classes="mt-2" />

            <div className="h-2/3 relative z-10">
              <img
                className="w-full absolute -top-1/2 pub-game"
                src="https://img.freepik.com/free-vector/hands-holding-pencils-play-tic-tac-toe-people-drawing-crosses-noughts-simple-game-children-flat-vector-illustration-strategy-concept-banner-website-design-landing-web-page_74855-24786.jpg"
                alt=""
              />
              {/*             
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
             */}

              <div className="absolute top-1/2 w-full z-20 flex bg-white/5">
                <div className="basis-1/4  flex justify-center">
                  <div>
                    <button
                      className={"min-w-48 h-60 bg-white rounded-lg " + bg}
                    ></button>
                  </div>
                </div>

                <div className="basis-1/2 px-4  flex justify-center">
                  <div>
                    <h3 className="text-3xl font-bold text-yellow-200">
                      {"Game.nome"}
                    </h3>
                    <p className="text-md font-medium text-yellow-200">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature, discovered the undoubtable source.Richard
                      McClintock, a Latin professor at Hampden-Sydney College in
                      Virginia, looked up onen classical literature, discovered
                      the undoubtable source.
                    </p>
                  </div>
                </div>

                <div className="basis-1/5  flex justify-center">
                  <div className="w-full px-6 mr-6">
                    <div className="flex w-full">
                      <div className="w-1/2 text-4xl font-bold text-yellow-200">
                        0.0
                      </div>
                      <div className="w-1/2 text-yellow-200 flex justify-end ">
                        <button className="bg-paleteOne-100/30 w-10 h-10 rounded-xl border-2 border-white">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="flex w-full mb-5">
                      <a
                        href="#"
                        className="w-1/2 text-md pl-5 font-bold text-yellow-200"
                      >
                        0m reviews
                      </a>
                    </div>

                    <div className="flex w-full">
                      <div className="w-1/2 text-lg font-medium text-yellow-200">
                        Min Players
                      </div>
                      <div className="w-1/2 text-yellow-200 flex justify-end ">
                        1
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="w-1/2 text-lg font-medium text-yellow-200">
                        Max Players
                      </div>
                      <div className="w-1/2 text-yellow-200 flex justify-end ">
                        4
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="w-1/2 text-lg font-medium text-yellow-200">
                        Difficult
                      </div>
                      <div className="w-1/2 text-yellow-200 flex justify-end ">
                        1
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="w-1/2 text-lg font-medium text-yellow-200">
                        Computer
                      </div>
                      <div className="w-1/2 text-yellow-200 flex justify-end ">
                        No
                      </div>
                    </div>

                    <div className="flex w-full mt-1">
                      <button
                        onClick={() => goPlay(id)}
                        className="bg-paleteTwo-300 text-lg text-white font-bold w-44 mr-3 h-10 rounded-xl border-2 border-white hover:bg-paleteOne-300"
                      >
                        Play
                      </button>

                      <button
                        onClick={() => handleFavorite()}
                        className={
                          favorite
                            ?"text-paleteOne-500 bg-paleteOne-100/90 flex justify-center py-1 w-10 h-10 rounded-xl border-2 border-white hover:text-paleteOne-500 hover:bg-paleteOne-100/50 "
                            :"text-paleteOne-200 bg-paleteOne-100/30 flex justify-center py-1 w-10 h-10 rounded-xl border-2 border-white hover:text-paleteOne-500 hover:bg-paleteOne-100/50 "
                        }
                      >
                        {favorite && <MdFavorite size={30} />}
                        {!favorite && <MdFavoriteBorder size={30} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 bg-yellow-200 w-full z-20">
              <div name="cover" className="m-1 ">
                Pub of game {id}
              </div>
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
