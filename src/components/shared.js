import React, { useEffect, useState } from "react";
import { RoundedButton } from "./inputs";
import { ImCross } from "react-icons/im";
import {
  MdArrowDropDown,
  MdOutlineNotificationsActive,
  MdPerson,
} from "react-icons/md";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Modal = ({
  isOpen,
  children,
  title,
  close,
  noStatic = false,
  headerColor = "bg-paleteTwo-500/10",
  bodyColor = "bg-white",
  size = "md",
}) => {
  const mySize =
    size === "xs"
      ? "w-5/12" //42%
      : size === "sm"
      ? "w-6/12" //50%
      : size === "md"
      ? "w-7/12 md:w-1/2" //58%
      : size === "lg"
      ? "w-8/12" //66%
      : size === "xl"
      ? "w-9/12" //75%
      : size === "2xl"
      ? "w-10/12" //83%
      : size;
  const BACKGROUND = "fixed top-0 bottom-0 start-0 end-0 bg-black/60 z-50";
  const CONTAINER = `fixed bottom-1/2 end-1/2 translate-x-1/2 translate-y-1/2 pt-10 pb-4 px-4 rounded-lg z-[60] ${bodyColor} ${mySize}`;

  if (isOpen)
    return (
      <>
        <div className={BACKGROUND} onClick={noStatic ? close : null}></div>
        <div className={CONTAINER}>
          <div
            className={
              "absolute top-0 w-full start-0 px-2 py-1 rounded-lg flex justify-between " +
              headerColor
            }
          >
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              className="cursor-pointer px-2 font-bold hover:text-black/30"
              onClick={close}
            >
              <ImCross className="w-3" />
            </button>
          </div>
          {children}
        </div>
      </>
    );

  return null;
};

// utils/validateEmail.js

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

const UserInfoRes = ({ user, logOut }) => {
  const options = [
    {
      description: "Ver Perfil",
      onClick: () => {
        alert("Ver Perfil");
      },
    },
    {
      description: "Log out",
      onClick: () => {
        logOut();
      },
    },
  ];

  return (
    <>
      <div className="w-full flex my-4 px-2 items-center ">
        <div className="rounded-full w-12 h-12 bg-white"></div>
        <div className="ml-4 text-white">
          <p className="font-extrabold">@{user.username}</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div className="ml-5">
          <Dropdown options={options} isRounded color="white" />
        </div>
      </div>
    </>
  );
};

const Notifications = ({ message, notifications, withUser = false }) => {
  return (
    <div className="basis-1/2 space-x-3  flex justify-center py-2">
      <RoundedButton size={10} value={<HiOutlineEnvelope size={25} />} />
      <RoundedButton
        size={10}
        value={<MdOutlineNotificationsActive size={25} />}
      />
      {withUser && <RoundedButton size={10} value={<MdPerson size={25} />} />}
    </div>
  );
};

const Dropdown = ({ options, label, isRounded, color = "white" }) => {
  const [isOpen, setIsOpen] = useState(false); // Controle do estado aberto/fechado
  const toggleDropdown = () => setIsOpen(!isOpen); // Função para alternar o dropdown

  useEffect(() => {
    const time = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left">
      {/* Botão do Dropdown */}
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-between items-center w-full
          ${
            isRounded ? "rounded-full" : "rounded-md"
          }  text-sm font-medium text-gray-700 `}
      >
        {label}
        {/* Ícone de seta */}
        {isOpen ? (
          <FiChevronUp size={20} className={"text-" + color} />
        ) : (
          <FiChevronDown size={20} className={"text-" + color} />
        )}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  option.onClick();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-paleteOne-300 w-full text-left"
                role="menuitem"
              >
                {option.description}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Modal, validateEmail, UserInfoRes, Notifications, Dropdown };
