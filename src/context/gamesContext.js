import { createContext, useState, useContext, useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";

export const GamesContext = createContext({
  games: [],
  recentGames: [],
  allPubsGames: [],
  imagesBackground: [],
});

// Função para acessar o contexto
export function useGames() {
  return useContext(GamesContext);
}

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [allPubsGames, setAllPubsGames] = useState([]);
  const [imagesBackground, setImagesBackground] = useState([]);

  const { getCollection } = useFirestore();

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getCollection("games");
      const pubs = await getCollection("pubs");
      /*       const recentGames = games.filter((game) => game.isRecent); */
      const imagesBackground = games.map((game) => game.cover.background);

      setGames(games);
      /*       setRecentGames(recentGames); */
      setImagesBackground(imagesBackground);
      setAllPubsGames(pubs);
    };

    fetchGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games, recentGames, allPubsGames }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesProvider;
