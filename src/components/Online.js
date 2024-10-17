import React from "react";

const Online = (props) => {
  const myClasses = "pb-4 mr-2 mt-1 space-y-1 overflow-y-auto h-96 custom-scrollbar " + props.classes;

  const perfil = (username, email) => {
    return (
      <div className="px-4 py-2 m-2 flex bg-white rounded-xl text-black">
        <div className="rounded-full w-10 h-10 bg-blue-400"></div>
        <div className="ml-3 space-y-0">
          <p className="font-bold">{username}</p>
          <p className="text-xs">{"Offline a 12min"}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/20 rounded-xl m-2 pt-2">
      <div className="bg-paleteOne-500 mx-2 p-1 pl-2 rounded-xl text-white font-bold">Friends</div>
      <div className={myClasses}>
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
        {perfil("myusername98", "myemail@gmail.com")}
      </div>
    </div>
  );
};

export default Online;
