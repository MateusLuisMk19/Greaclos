import React, { useState } from "react";
import { SiGamedeveloper } from "react-icons/si";
import { MdSettings, MdHelp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { Modal } from "./shared";

const NavBar = ({ pages, custom, fake = false, play = false, onClick }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHelps, setShowHelps] = useState(false);

  const Default_Styl =
    "w-1/4 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640] z-40";
  const Play_Styl =
    "w-1/5 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640] z-40 " + custom ;

  const navigate = useNavigate();

  const options = [
    {
      label: "Settings",
      component: () => setShowSettings(true),
      icon: <MdSettings size={30} />,
    },
    {
      label: "Help",
      component: () => setShowHelps(true),
      icon: <MdHelp size={30} />,
    },
  ];

  const navigateFake = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className={play ? Play_Styl : Default_Styl}>
        {!play && (
          <div className="flex space-x-8 m-4 text-white">
            <div className="w-6 cursor-pointer">
              <SiGamedeveloper size={35} />
            </div>
            <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
          </div>
        )}

        {play && <TopBar page="play" />}

        <div className="p-4 pl-6 space-y-3">
          {pages.map(
            (page, idx) =>
              !page.last && (
                <div
                  key={idx}
                  className="flex space-x-4 text-white hover:text-[#0B525B]"
                  onClick={
                    fake || play
                      ? () => navigateFake(page.component)
                      : () => onClick(page)
                  }
                >
                  <div className="w-6 cursor-pointer">{page.icon}</div>
                  <button
                    className="text-lg font-medium focus:outline-none"
                    type="button"
                    key={page.label}
                  >
                    {page.label}
                  </button>
                </div>
              )
          )}
        </div>

        <div className="absolute bottom-4 left-6 space-y-4">
          {!play &&
            options.map((page, idx) => (
              <div
                key={idx}
                className="flex space-x-4 text-white hover:text-[#0B525B]"
                onClick={page.component}
              >
                <div className="w-6 cursor-pointer">{page.icon}</div>
                <button
                  className="text-lg font-medium focus:outline-none"
                  type="button"
                >
                  {page.label}
                </button>
              </div>
            ))}

          {play &&
            pages.map(
              (page, idx) =>
                page.last && (
                  <div
                    key={idx}
                    className="flex space-x-4 text-white hover:text-[#0B525B]"
                  >
                    <div className="w-6 cursor-pointer">{page.icon}</div>
                    <button
                      className="text-lg font-medium focus:outline-none"
                      type="button"
                      key={page.label}
                      onClick={() => navigateFake(page.component)}
                    >
                      {page.label}
                    </button>
                  </div>
                )
            )}
        </div>
        <Modal
          title={"Settings"}
          isOpen={showSettings}
          close={() => setShowSettings(!showSettings)}
        >
          <p>eu sou a Modal de Configurações</p>
        </Modal>
        <Modal
          title={"Help"}
          isOpen={showHelps}
          noStatic
          close={() => setShowHelps(!showHelps)}
        >
          <p>Eu sou a Modal de Ajuda</p>
        </Modal>
      </div>
    </>
  );
};

export default NavBar;
