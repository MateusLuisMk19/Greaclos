import React from "react";
import { RoundedButton, TextBox } from "./inputs";

import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TopBar = (tb) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const myClasses = tb.float
    ? "h-14 absolute end-0 w-1/2 flex flex-row z-40 " + tb.classes
    : "h-14 flex flex-row " + tb.classes;

  function onSearch(data) {
    const { text } = data;
    navigate(`/search/:${text}`);
  }

  if (tb.page == "home") {
    return (
      <div className={myClasses}>
        <form
          onSubmit={handleSubmit(onSearch)}
          className="basis-1/4 pt-3 px-1 "
        >
          <input
            className="w-[18rem] h-[2rem] px-2 text-white text-lg font-normal rounded-md bg-[#6f3b6f] focus:outline-none"
            type="search"
            placeholder="Search"
            {...register("text")}
          />
        </form>
        <div className="basis-1/4"></div>

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
  } else if (tb.page == "game") {
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
  } else if (tb.page == "play") {
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
