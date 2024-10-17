import React, { useState } from "react";
import { SiGamedeveloper } from "react-icons/si";
import { MdSettings, MdHelp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Modal, Notifications } from "./shared";
import { TextBox } from "./inputs";
import { GameForm } from "./MyForms";
import { useFirestore } from "../hooks/useFirestore";

const NavBar = ({ pages, custom, fake = false, play = false, onClick }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showHelps, setShowHelps] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Novo estado para controlar o colapso da Navbar
  const [textBox, setTextBox] = useState("");
  const [secretConfig, setSecretConfig] = useState(false);

  const { setDocument } = useFirestore();

  const Default_Styl = `${
    isOpen ? "h-screen" : "h-fit md:h-screen"
  } bg-gradient-to-b from-[#3E1F47] to-[#272640] z-40 w-full md:w-full`; // Adicionada responsividade
  const Play_Styl =
    "h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640] z-40 w-full md:w-full " +
    custom;

  const navigate = useNavigate();

  const options = [
    {
      label: "Settings",
      component: () => setShowSettings(true),
      icon: <MdSettings className="w-full h-full" />,
    },
    {
      label: "Help",
      component: () => setShowHelps(true),
      icon: <MdHelp className="w-full h-full" />,
    },
  ];

  const navigateFake = (path) => {
    navigate(path);
  };

  const handleSaveConfig = () => {
    if (textBox === "admin") {
      setSecretConfig(true);
    }
  };

  const handleGameSubmit = async (gameData) => {
    const game = {
      cover: {
        background: gameData.cover.background,
        profile: gameData.cover.profile,
      },
      description: gameData.description,
      info: {
        cpu: gameData.cpu,
        difficult: gameData.difficult,
        max_players: gameData.max_players,
        min_players: gameData.min_players,
      },
      name: gameData.name,
    };

    console.log(game);

    // const res = await setDocument({ collect: "games", data: gameData });
    // console.log(res);
  };

  return (
    <>
      <div className={play ? Play_Styl : Default_Styl}>
        {/* Hamburger button para dispositivos menores */}
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex space-x-4 md:mr-6">
            <SiGamedeveloper size={35} className="cursor-pointer" />
            <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
          </div>

          <button
            className="ml-8 text-white focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Ícone de hambúrguer */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu colapsado - exibido apenas quando isOpen for true ou em telas maiores */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:block p-4 pl-6 space-y-3`}
        >
          <div className="md:hidden flex justify-center items-center">
            <Notifications withUser />
          </div>

          {pages.map(
            (page, idx) =>
              !page.last && (
                <div
                  key={idx}
                  className="flex space-x-4 text-white hover:text-[#0B525B]"
                  onClick={
                    fake || play
                      ? () => navigateFake(page.component)
                      : () => {
                          onClick(page);
                          isOpen && setIsOpen(false);
                        }
                  }
                >
                  <div className="w-10 md:w-6 cursor-pointer">{page.icon}</div>
                  <button
                    className="text-2xl md:text-lg font-medium focus:outline-none"
                    type="button"
                    key={page.label}
                  >
                    {page.label}
                  </button>
                </div>
              )
          )}
          <div className="absolute bottom-4 left-6 space-y-4">
            {!play &&
              options.map((page, idx) => (
                <div
                  key={idx}
                  className="flex space-x-4 text-white hover:text-[#0B525B]"
                  onClick={page.component}
                >
                  <div className="w-10 md:w-6 cursor-pointer">{page.icon}</div>
                  <button
                    className="text-2xl md:text-lg font-medium focus:outline-none"
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
        </div>

        <Modal
          title={"Settings"}
          isOpen={showSettings}
          close={() => setShowSettings(!showSettings)}
          size="w-full md:w-1/2"
        >
          {!secretConfig && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Modo Escuro</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold">Notificações</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <span className="font-semibold">Idioma</span>
                <select className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option>Português</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>

              <TextBox
                name="secretConfig"
                value={textBox}
                onChange={(e) => setTextBox(e.target.value)}
                color="bg-white"
                textColor="text-black"
                className="w-full"
              />

              <button
                onClick={() => handleSaveConfig()}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Salvar Configurações
              </button>
            </div>
          )}
          {secretConfig && <GameForm onSubmit={handleGameSubmit} />}
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
