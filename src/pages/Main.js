import React, { useState, Suspense, lazy } from "react";
import NavBar from "../components/NavBar";

import { AiFillHome } from "react-icons/ai";
import { MdPeopleAlt, MdFavorite } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiCommunityFill } from "react-icons/ri";
import RightBar from "../components/RightBar";
import { useAuth } from "../context/authContext";
import GamesProvider from "../context/gamesContext";

const Home = lazy(() => import("./Home"));
const Category = lazy(() => import("./Category"));
const Community = lazy(() => import("./Community"));
const Friends = lazy(() => import("./Friends"));
const Favorite = lazy(() => import("./Favorite"));

const pages = [
  {
    label: "Home",
    component: Home,
    icon: <AiFillHome className="w-full h-full" />,
  },
  {
    label: "Category",
    component: Category,
    icon: <BiSolidCategoryAlt className="w-full h-full" />,
  },
  {
    label: "Community",
    component: Community,
    icon: <RiCommunityFill className="w-full h-full" />,
  },
  {
    label: "Friends",
    component: Friends,
    icon: <MdPeopleAlt className="w-full h-full" />,
  },
  {
    label: "Favorite",
    component: Favorite,
    icon: <MdFavorite className="w-full h-full" />,
  },
];

const Main = () => {
  const [activePage, setActivePage] = useState(pages[0]);

  const { user } = useAuth();

  const Page = activePage.component;

  return (
    <GamesProvider>
      <div className="md:flex flex-row">
        <div className="bg-red-300 md:w-[18vw] w-full">
          <NavBar pages={pages} onClick={setActivePage} />
        </div>

        <div
          className={`h-screnn md:h-screen ${
            !!user ? "md:w-[64vw]" : "md:w-[82vw]"
          } w-[100vw] bg-gradient-to-b from-[#3E1F47] to-[#272640]`}
        >
          <Suspense fallback={<p>Loading...</p>}>
            <Page />
          </Suspense>
        </div>

        {!!user && (
          <div className="hidden md:block h-screen w-[18vw] bg-gradient-to-b from-[#3E1F47] to-[#272640] border-s-2 border-black/30">
            <RightBar />
          </div>
        )}
      </div>
    </GamesProvider>
  );
};

export default Main;
