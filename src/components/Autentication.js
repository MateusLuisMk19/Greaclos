import React, { useEffect, useState } from "react";
import AlertsProvider from "./Alert";
import { Modal, validateEmail } from "./shared";
import { useAuth } from "../context/authContext";
import { useFirestore } from "../hooks/useFirestore";

const Autentication = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login, signup } = useAuth();
  const { setDocWithId } = useFirestore();

  const resetData = () => {
    setNome("");
    setUsername("");
    setDate("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const resetAlerts = () => {
    setError(null);
    setWarning(null);
    setSuccess(null);
  };

  useEffect(() => {
    (error || success || warning) && setShowAlert(true);

    return () => {
      setShowAlert(false);
    };
  }, [error, success, warning]);

  const handleLogin = () => async (e) => {
    e.preventDefault();
    resetAlerts();

    if (!email || !password) {
      setWarning("Todos os campos são obrigatórios.");
      return;
    }

    const req = await login({
      email: email,
      password: password,
    });

    if (req.ok) {
      resetData();
      setSuccess("Cadastro realizado com sucesso.");
      setShowSignUpModal(false);
    } else {
      setError(req.message);
    }
    resetAlerts();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    resetAlerts();

    if (
      !nome ||
      !username ||
      !date ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setWarning("Todos os campos são obrigatórios.");
      return;
    }

    // Validação do email
    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const req = await signup({
      email: email,
      password: password,
      username: username,
    });

    if (req.ok) {
      try {
        await setDocWithId({
          collect: "users",
          id: req.user.uid,
          data: { name: nome, date: date, email: email, username: username },
        });
        console.info("User created:", req.user);
      } catch (error) {
        console.log(error);
      } finally {
        resetData();
        setSuccess("Cadastro realizado com sucesso.");
        setShowSignUpModal(false);
      }
    } else {
      setError(req.message);
    }
    resetAlerts();
  };

  const authModal = () => {
    return (
      <>
        <Modal
          title={"Login"}
          isOpen={showLoginModal}
          size="md"
          headerColor="bg-paleteOne-400/50"
          bodyColor="bg-paleteOne-300"
          close={() => setShowLoginModal(!showLoginModal)}
        >
          <form onClick={handleLogin()} className="space-y-3">
            <div>
              {" "}
              <label htmlFor="">Email</label>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <p className="w-full text-center">
              Não está registado? Registe-se{" "}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignUpModal(true);
                }}
                className="text-blue-500 hover:text-darkblue-200"
              >
                aqui.
              </button>
            </p>
            <button
              type="submit"
              className="w-full py-2 text-white text-lg font-normal rounded-md bg-paleteTwo-400/80 hover:bg-paleteTwo-400 focus:outline-none"
            >
              Login
            </button>
          </form>
        </Modal>

        <Modal
          title={"Sign Up"}
          isOpen={showSignUpModal}
          size="md"
          headerColor="bg-paleteOne-400/50"
          bodyColor="bg-paleteOne-300"
          close={() => setShowSignUpModal(!showSignUpModal)}
        >
          <form onSubmit={handleSignUp} className="space-y-3">
            <div>
              {" "}
              <label htmlFor="">Nome</label>
              <input
                autoFocus
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Nome Completo"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="username"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="">Data de Nascimento</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="DD-MM-AAAA"
              />
            </div>
            <div>
              {" "}
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                minLength={7}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 text-white text-lg font-normal rounded-md bg-paleteOne-400/70 focus:bg-paleteOne-400 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
            <p className="w-full text-center">
              Já está registado?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignUpModal(false);
                  setShowLoginModal(true);
                }}
                className="text-blue-500 hover:text-darkblue-200"
              >
                Entrar.
              </button>
            </p>
            <button
              type="submit"
              className="w-full py-2 text-white text-lg font-normal rounded-md bg-paleteTwo-400/80 hover:bg-paleteTwo-400 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div className="space-x-3 flex justify-end px-4">
        <button
          onClick={() => setShowLoginModal(true)}
          className="bg-paleteTwo-400 hover:bg-paleteTwo-300/50 text-paleteOne-300 hover:text-paleteOne-100 rounded py-1 px-4"
        >
          Login
        </button>
        <button
          onClick={() => setShowSignUpModal(true)}
          className="bg-paleteTwo-300 hover:bg-paleteTwo-300/50 text-paleteOne-300 hover:text-paleteOne-100 rounded py-1 px-4"
        >
          Sign Up
        </button>
      </div>
      {authModal()}
      <AlertsProvider
        show={showAlert}
        onClose={() => setShowAlert(false)}
        error={error}
        success={success}
        warning={warning}
      />
    </>
  );
};

export default Autentication;
