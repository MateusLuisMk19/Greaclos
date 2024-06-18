import React from "react";
import Online from "../components/Online";
import Recently from "../components/Recently";
import TopBar from "../components/TopBar";
import Actually from "../components/Actually";

const Home = () => {
  return (
    <div className="m-2">
      <TopBar page="home" />

      <div className="my-2 h-[26rem] flex">
        <div className="bg-black w-full mr-2">Pub</div>
        <Online classes="w-[20rem]" />
      </div>

      <div className="my-2 h-64 flex">
        <Actually />
        <Recently />
      </div>

    </div>
  );
};

export default Home;
