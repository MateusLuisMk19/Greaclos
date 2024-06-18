import React from "react";

const Modal = ({ isOpen, children, title, close, noStatic = false }) => {
  const BACKGROUND = "fixed top-0 bottom-0 start-0 end-0 bg-black/60 z-50";
  const CONTAINER =
    "fixed bottom-1/2 end-1/2 translate-x-1/2 translate-y-1/2 p-36 bg-white rounded-lg z-[60]";

  if (isOpen)
    return (
      <>
        <div className={BACKGROUND} onClick={noStatic ? close : null}></div>
        <div className={CONTAINER}>
          <div className="bg-paleteTwo-500/10 absolute top-0 w-full start-0 px-2 py-1 rounded-lg flex justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
            <button
              className="cursor-pointer px-2 font-bold hover:text-black/30"
              onClick={close}
            >
              X
            </button>
          </div>
          {children}
        </div>
      </>
    );

  return null;
};

export { Modal };
