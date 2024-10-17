import React, { useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useFirestore } from "../hooks/useFirestore";
import { Timestamp } from "firebase/firestore";

// Criação do contexto
const AuthContext = React.createContext({
  user: null,
  loading: true,
  signup: async ({ email, password, username, name, date }) => {},
  login: async ({ email, password }) => {},
  logout: () => {},
});

// Função para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Provider do contexto
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setDocWithId, getDocId } = useFirestore();

  // Função para buscar informações do usuário na Firestore
  async function fetchUserInfo(user) {
    try {
      const userData = await getDocId({ collect: "users", id: user.uid });

      if (userData) {
        setUser({
          ...userData,
          id: user.uid,
          username: user.displayName,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
      return { ok: false, message: "Erro ao buscar informações do usuário" };
    }
  }

  // Função para registrar o usuário no Firebase
  async function signup({ email, password, username }) {
    try {
      // Criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Atualizar o perfil do usuário com o nome de usuário
      await updateProfile(user, { displayName: username });

      console.log("Usuário registrado com sucesso:", user);
      return { ok: true, user: user };
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return { ok: false, message: error.message };
    }
  }

  // Função para login
  async function login({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  // Função para logout
  function logout() {
    signOut(auth);
    window.location.reload();
  }

  // useEffect para verificar o estado da autenticação e persistência da sessão
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup do listener ao desmontar o componente
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
