import React, { useEffect, useState } from "react";
import { RoundedButton, TextBox } from "./inputs";

import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Notifications } from "./shared";
import Autentication from "./Autentication";

const TopBar = ({ page, float, classes }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { user } = useAuth();

  const myClasses = float
    ? "h-14 absolute end-0 w-1/2 flex flex-row z-40  " + classes
    : "h-14 flex flex-row " + classes;

  function onSearch(data) {
    const { text } = data;
    navigate(`/search/:${text}`);
  }

  if (page == "home") {
    return (
      <div className={myClasses + "md:justify-start justify-center"}>
        <form
          onSubmit={handleSubmit(onSearch)}
          className="md:basis-1/4 py-2.5 px-1 "
        >
          <input
            className="md:w-[18rem] w-[22rem] h-[2.3rem] px-2 text-white text-lg font-normal rounded-md bg-[#6f3b6f] focus:outline-none"
            type="search"
            placeholder="Search"
            {...register("text")}
          />
        </form>

        <div className="basis-1/4 hidden md:block"></div>

        {!!user && (
          <div className="hidden md:block">
            <Notifications />
          </div>
        )}

        {!!!user && (
          <div className="hidden md:block basis-1/2 py-3">
            <Autentication />
          </div>
        )}
      </div>
    );
  } else if (page == "game") {
    return (
      <div className={myClasses}>
        <div className="basis-1/2 flex flex-row">
          <div className="basis-1/2 space-x-3  flex justify-center py-2">
            <RoundedButton size={10} value={<HiOutlineEnvelope size={25} />} />
            <RoundedButton
              size={10}
              value={<MdOutlineNotificationsActive size={25} />}
            />
          </div>

          <div className="basis-32 px-4 flex absolute end-2">
            <div className="rounded-full w-12 h-12 bg-white"></div>
            <div className="ml-4 text-white">
              <p className="font-extrabold">myusername98</p>
              <p className="font-medium">myemail@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page == "play") {
    return (
      <div /* className={myClasses} */>
        <div className="px-4 py-4 flex">
          <div className="rounded-full w-12 h-12 bg-white"></div>
          <div className="ml-4 text-white">
            <p className="font-extrabold ">myusername98</p>
            <p className="font-medium text-sm">myemail@gmail.com</p>
          </div>
        </div>

        <div className="basis-1/2 space-x-3  flex justify-center py-2">
          <RoundedButton size={10} value={<HiOutlineEnvelope size={25} />} />
          <RoundedButton
            size={10}
            value={<MdOutlineNotificationsActive size={25} />}
          />
        </div>
      </div>
    );
  }
};

export default TopBar;
