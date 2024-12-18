import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Play from "./games/Play";
import Search from "./pages/Search";
import Game from "./pages/Game";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    /*  <div className="flex">
      <Main />
    </div> */
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex">
            <Routes>
              {/* <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              /> */}
              {/* <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={
                  user ? (
                    isAdmin() ? (
                      <Register />
                    ) : (
                      <Navigate to="/" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              /> */}
              <Route path="/" element={<Main />} />
              <Route path="/play/:gameid" element={<Play />} />
              <Route path="/game/:id" element={<Game />} />
              <Route path="/search/:text" element={<Search />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
