import React, { useState } from "react";
import { SiGamedeveloper } from "react-icons/si";
import { MdSettings, MdHelp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const navigateFake = (path) => {
    navigate(path);
  };

  if (props.fake) {
    return (
      <div className="bg-blue-500 w-1/4 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <div className="flex space-x-8 m-4 text-white">
          <div className="w-6 cursor-pointer">
            <SiGamedeveloper size={35} />
          </div>
          <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
        </div>

        <div className="p-4 pl-6 space-y-3">
          {props.pages.map((page, idx) => (
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
          ))}
        </div>

        <div className="absolute bottom-4 left-6 space-y-4">
          <div className="flex space-x-4 text-white hover:text-[#0B525B]">
            <div className="w-6 cursor-pointer">
              <MdSettings size={30} />
            </div>
            <button
              className="text-lg font-medium focus:outline-none"
              type="button"
            >
              Settings
            </button>
          </div>
          <div className="flex space-x-4 text-white hover:text-[#0B525B]">
            <div className="w-6 cursor-pointer">
              <MdHelp size={30} />
            </div>
            <button
              className="text-lg font-medium focus:outline-none"
              type="button"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-500 w-1/4 h-screen bg-gradient-to-b from-[#3E1F47] to-[#272640]">
        <div className="flex space-x-8 m-4 text-white">
          <div className="w-6 cursor-pointer">
            <SiGamedeveloper size={35} />
          </div>
          <div className="font-black text-3xl cursor-pointer">GREACLOS</div>
        </div>

        <div className="p-4 pl-6 space-y-3">
          {props.pages.map((page, idx) => (
            <div
              key={idx}
              className="flex space-x-4 text-white hover:text-[#0B525B]"
            >
              <div className="w-6 cursor-pointer">{page.icon}</div>
              <button
                className="text-lg font-medium focus:outline-none"
                type="button"
                key={page.label}
                onClick={() => props.onClick(page)}
              >
                {page.label}
              </button>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-6 space-y-4">
          <div className="flex space-x-4 text-white hover:text-[#0B525B]">
            <div className="w-6 cursor-pointer">
              <MdSettings size={30} />
            </div>
            <button
              className="text-lg font-medium focus:outline-none"
              type="button"
            >
              Settings
            </button>
          </div>
          <div className="flex space-x-4 text-white hover:text-[#0B525B]">
            <div className="w-6 cursor-pointer">
              <MdHelp size={30} />
            </div>
            <button
              className="text-lg font-medium focus:outline-none"
              type="button"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default NavBar;
