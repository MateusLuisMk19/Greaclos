import React, { Suspense,  useState } from "react";
import { useParams } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

const Search = () => {
  const { text } = useParams();

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
      <div className="w-full bg-red-200 h-screen p-2 bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <Suspense fallback={<p>Loading...</p>}>
          <TopBar page="home" />

          <div>Search to {text}</div>
        </Suspense>
      </div>
    </>
  );
};

export default Search;
