import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Button = ({
  color,
  hvColor,
  type,
  onClick,
  children,
  disable = false,
}) => {
  const myClasses = "pt-0 p-1 m-0 rounded-md " + color + " hover:" + hvColor;

  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={myClasses}
    >
      {children}
    </button>
  );
};

const TextBox = ({
  color = "bg-[#6f3b6f]",
  textColor = "text-white",
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className,
  min,
  max,
  rows,
  textArea = false,
}) => {
  return (
    <>
      {!textArea && (
        <input
          className={`w-[18rem] h-[2rem] px-2 py-1 text-lg font-normal rounded-md  focus:outline-none ${color} ${textColor} ${className}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      )}
      {textArea && (
        <textarea
          className={`w-[18rem] py-1 px-2 text-lg font-normal rounded-md  focus:outline-none ${color} ${textColor} ${className}`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          rows={rows}
          max={max}
        />
      )}
    </>
  );
};

const SelectField = ({
  color = "bg-[#6f3b6f]",
  textColor = "text-white",
  name,
  options,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <select
      className={`w-[18rem] h-[2rem] px-2 text-lg font-normal rounded-md  focus:outline-none ${color} ${textColor} ${className}`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
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

const RoundedButton = ({
  size,
  children,
  color = "bg-white/20",
  onClick,
  textColor = "text-paleteOne-100",
  hover = "hover:text-paleteOne-500",
}) => {
  const mysize = "w-" + size + " h-" + size;
  const myClasses = `${mysize} ${color} rounded-full ${textColor} ${hover} flex justify-center items-center py-2 focus:outline-none`;

  //   console.log(myClasses);
  return (
    <button className={myClasses} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

const MyCheckBox = ({ id, checked, onChange, label, className = "", size = "md" }) => {
  const mysize = "w-" + size === "md" ? "w-8 h-8" : "w-4 h-4";

  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <label htmlFor={id} className="font-semibold cursor-pointer">
          {label}
        </label>
      )}
      {checked ? (
        <MdCheckBox
          id={id}
          onClick={onChange}
          className={`text-2xl text-blue-500 ${mysize} cursor-pointer mr-2 `}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          id={id}
          onClick={onChange}
          className={`text-2xl text-gray-400 ${mysize} cursor-pointer mr-2 `}
        />
      )}
    </div>
  );
};

export { Button, TextBox, RoundedButton, Search, SelectField, MyCheckBox };
