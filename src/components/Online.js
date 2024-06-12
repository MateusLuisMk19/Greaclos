import React from "react";

const Online = (props) => {
  const myClasses = "rounded-md pt-10 space-y-4 overflow-auto " + props.classes;

  const perfil = (username, email) => {
    return (
      <div className="basis-30 px-4 flex">
        <div className="rounded-full w-10 h-10 bg-white"></div>
        <div className="ml-4 text-white">
          <p className="font-bold">{username}</p>
          <p className="font-medium text-sm">{email}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="absolute bg-paleteOne-300 w-56 p-1 rounded text-white end-6">Friends Online</div>
      <div className={myClasses}>
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
      </div>
    </>
  );
};

export default Online;
