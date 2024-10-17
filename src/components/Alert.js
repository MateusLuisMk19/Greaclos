import { useEffect } from "react";
import { BiCross } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { PiCrossFill } from "react-icons/pi";

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-black",
    error: "bg-red-100 border-red-400 text-black",
    warning: "bg-yellow-100 border-yellow-400 text-black",
    info: "bg-blue-100 border-blue-400 text-darkblue-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Change the delay to match your needs. You can also pass a custom duration as a prop. 3000ms = 3 seconds.

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`absolute start-5 animate-bounce bottom-24 border-l-4 p-4 mb-4 rounded ${alertStyles[type]} flex items-center`}
      role="alert"
    >
      <svg
        className="fill-current w-5 h-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9 12h2V9H9v3zm0 4h2v-2H9v2zm1-14C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm0 18C5.589 20 2 16.411 2 12S5.589 4 10 4s8 3.589 8 8-3.589 8-8 8z" />
      </svg>
      <span className="mr-4">{message}</span>
      <button onClick={onClose} className="absolute top-2 end-2">
        <ImCross className="w-3" />
      </button>
    </div>
  );
};

const AlertsProvider = ({
  show,
  onClose,
  error = false,
  success = false,
  warning = false,
  info = false,
}) => {
  useEffect(() => {}, [show]);

  return (
    <div className="p-4 z-50">
      {show && (
        <>
          {!!error && <Alert message={error} type="error" onClose={onClose} />}
          {!!success && (
            <Alert message={success} type="success" onClose={onClose} />
          )}
          {!!warning && (
            <Alert message={warning} type="warning" onClose={onClose} />
          )}
          {!!info && <Alert message={info} type="info" onClose={onClose} />}
        </>
      )}
    </div>
  );
};

export default AlertsProvider;
