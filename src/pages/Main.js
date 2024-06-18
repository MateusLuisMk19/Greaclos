import React, { useState, Suspense, lazy } from "react";
import NavBar from "../components/NavBar";

import { AiFillHome } from "react-icons/ai";
import { MdPeopleAlt, MdFavorite } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiCommunityFill } from "react-icons/ri";

const Home = lazy(() => import("./Home"));
const Category = lazy(() => import("./Category"));
const Community = lazy(() => import("./Community"));
const Friends = lazy(() => import("./Friends"));
const Favorite = lazy(() => import("./Favorite"));

const pages = [
  {
    label: "Home",
    component: Home,
    icon: <AiFillHome size={30} />,
  },
  {
    label: "Category",
    component: Category,
    icon: <BiSolidCategoryAlt size={30} />,
  },
  {
    label: "Community",
    component: Community,
    icon: <RiCommunityFill size={30} />,
  },
  {
    label: "Friends",
    component: Friends,
    icon: <MdPeopleAlt size={30} />,
  },
  {
    label: "Favorite",
    component: Favorite,
    icon: <MdFavorite size={30} />,
  },
];

const Main = () => {
  const [activePage, setActivePage] = useState(pages[0]);

  const Page = activePage.component;

  return (
    <>
      <NavBar pages={pages} onClick={setActivePage}/>

      <div className="w-full bg-red-200 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <Suspense fallback={<p>Loading...</p>}>
          <Page />
        </Suspense>
      </div>
    </>
  );
};

export default Main;
