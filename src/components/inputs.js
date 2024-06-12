import React from "react";

const Button = (props) => {
  const myClasses =
    "pt-0 p-1 m-0 rounded-md " + props.color + " hover:" + props.hvColor;

  return (
    <button type={props.type} onClick={props.onClick} className={myClasses}>
      {props.value}
    </button>
  );
};

const TextBox = (props) => {
  return (
    <input
      className="w-[18rem] h-[2rem] px-2 text-white text-lg font-normal rounded-md bg-[#6f3b6f] focus:outline-none"
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      />
  );
};

const Search = () => {
  return (
    <div class="relative ...">
      <div class="absolute pointer-events-none ...">
        <svg
          class="absolute text-slate-400 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input type="text" placeholder="Search" class="..." />
    </div>
  );
};

const RoundedButton = (props) => {
  const size = "w-" + props.size + " h-" + props.size;
  const myClasses =
    size +
    " rounded-full bg-white/20 text-paleteOne-300/50 flex justify-center py-2 hover:text-paleteOne-300 focus:outline-none";

//   console.log(myClasses);
  return (
    <button className={myClasses} type="button">
      {props.value}
    </button>
  );
};

export { Button, TextBox, RoundedButton, Search };
