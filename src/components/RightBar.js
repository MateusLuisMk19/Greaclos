import React, { useEffect } from "react";
import { UserInfoRes } from "./shared";
import Online from "./Online";
import { useAuth } from "../context/authContext";
import Recently from "./Recently";

const RightBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="">
        <UserInfoRes user={user} logOut={logout} />
        <Online />

        <Recently />
      </div>
    </>
  );
};

export default RightBar;
