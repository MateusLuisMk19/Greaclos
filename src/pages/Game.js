import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import { AiFillHome } from "react-icons/ai";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineRateReview,
  MdOutlineStarBorderPurple500,
  MdOutlineStar,
} from "react-icons/md";

// Components
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

// hooks
import { useFirestore } from "../hooks/useFirestore";
import { Modal } from "../components/shared";

const Game = () => {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);
  const [gameNow, setGameNow] = useState({});
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { getDocId } = useFirestore();

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const game = await getDocId("games", id);
        setGameNow(game);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const pages = [
    {
      label: "Go Home",
      component: "/",
      icon: <AiFillHome size={30} />,
    },
  ];

  const handleFavorite = () => {
    setFavorite((prevFavorite) => !prevFavorite);
  };

  const goPlay = (gameId) => {
    navigate(`/play/${gameId}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar jogos.</div>;
  }

  return (
    <>
      <NavBar pages={pages} fake />
      <div className="w-full h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="h-screen relative">
            <TopBar page="game" float classes="mt-2" />

            <div className="h-2/3 relative z-10">
              {/* Se quiser usar a imagem em vez do vídeo, descomente abaixo */}
              {gameNow?.pubs && (
                <>
                  {gameNow?.pubs.length === 0 && (
                    <img
                      className="w-full absolute -top-1/2 pub-game"
                      src={gameNow.cover?.background}
                      alt="Game Cover"
                    />
                  )}
                </>
              )}

              {gameNow?.pubs && (
                <video
                  muted
                  autoPlay
                  loop
                  className="w-full pub-game"
                  src={gameNow.pubs[0]?.url}
                  type="video/mp4"
                >
                  Sorry, your browser doesn't support embedded videos, but don't
                  worry, you can{" "}
                  <a href="https://archive.org/details/BigBuckBunny_124">
                    download it
                  </a>{" "}
                  and watch it with your favorite video player!
                </video>
              )}

              <div className="absolute top-1/2 w-full z-20 flex items-end bg-black/10">
                <div className="basis-1/4 flex justify-center">
                  <div>
                    <button
                      disabled
                      style={{
                        backgroundImage: `url('${gameNow.cover?.profile}')`,
                      }}
                      className="min-w-48 h-60 bg-white rounded-lg bg-center bg-no-repeat bg-cover"
                    ></button>
                  </div>
                </div>

                <div className="basis-1/2 px-4 flex text-white justify-start">
                  <div>
                    <h3 className="text-3xl font-bold title-game">
                      {gameNow.name}
                    </h3>
                    <p className="text-md font-medium">{gameNow.description}</p>
                  </div>
                </div>

                <div className="basis-1/5 flex justify-center">
                  <div className="w-full px-6 mr-6 text-white">
                    <GameDetails info={gameNow?.info} rate={gameNow?.rate} />
                    <div className="flex w-full mt-1">
                      <button
                        onClick={() => goPlay(id)}
                        className="bg-paleteTwo-300 text-lg text-white font-bold w-44 mr-3 h-10 rounded-xl border-2 border-white hover:bg-paleteTwo-300/50"
                      >
                        Play
                      </button>

                      <button
                        onClick={handleFavorite}
                        className={`flex justify-center py-1 w-10 h-10 rounded-xl border-2 border-white hover:border-paleteOne-400 hover:text-paleteOne-400 ${
                          favorite
                            ? "text-paleteOne-500 bg-paleteOne-100/90"
                            : "text-paleteOne-200 bg-paleteOne-100/30"
                        }`}
                      >
                        {favorite ? (
                          <MdFavorite size={30} />
                        ) : (
                          <MdFavoriteBorder size={30} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 bg-yellow-200 w-full z-20">
              <div name="cover" className="m-1">
                Pub of game {gameNow.name}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};

const GameDetails = ({ info, rate }) => {
  const [openReviews, setOpenReviews] = useState(false);

  if (!info || !rate) return;

  const { max_players, min_players, difficult, cpu } = info;

  return (
    <>
      <div className="flex w-full">
        <div className="w-1/2 text-4xl font-bold flex items-center">
          {rate.note + ".0 "}
          <MdOutlineStar size={25} />
        </div>
        <div className="w-1/2  flex justify-end ">
          <button className="bg-paleteOne-100/30 text-white w-10 h-10 rounded-xl border-2 border-white hover:border-paleteOne-400 hover:text-paleteOne-400 flex py-2 justify-center">
            <MdOutlineRateReview size={25} />
          </button>
        </div>
      </div>

      <div className="flex w-full mb-5">
        <button
          className="w-1/2 text-md pl-5 font-bold "
          onClick={() => setOpenReviews(true)}
        >
          {rate.reviews.length} reviews
        </button>
      </div>

      <GameDetailItem label="Min Players" value={min_players} />
      <GameDetailItem label="Max Players" value={max_players} />
      <GameDetailItem label="Difficult" value={difficult} difficult />
      <GameDetailItem label="Computer" value={cpu ? "Yes" : "No"} />

      <div className="text-black">
        <Modal
          title={"Reviews"}
          isOpen={openReviews}
          close={() => setOpenReviews(!openReviews)}
        >
          {rate.reviews.map((review,idx) => (
            <div key={idx} className="w-full flex  space-2 rounded-lg">
              <button className="w-14 h-14 rounded-full bg-blue-300">o</button>
              <div className="w-full mx-2">
                <div className="flex justify-between">
                  <span className="font-bold mx-2">{review.username}</span>
                  <span className="mx-4 flex w-12 px-2 items-center rounded-full bg-black/30 font-bold">
                    {review.note + ".0"}
                    <MdOutlineStarBorderPurple500 size={10} />
                  </span>
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </Modal>
      </div>
    </>
  );
};

const GameDetailItem = ({ label, value, difficult = false }) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2 text-lg font-medium">{label}</div>
      <div className="w-1/2 flex justify-end py-1">
        {difficult
          ? // Renderize as estrelas com base no valor fornecido
            Array.from({ length: value }, (_, i) => (
              <MdOutlineStarBorderPurple500 key={i} size={20} />
            ))
          : value}
      </div>
    </div>
  );
};

export default Game;
