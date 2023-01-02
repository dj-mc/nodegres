import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  const [is_authentic, set_is_authentic] = useState(false);

  const set_authentication_handler = (bool) => {
    set_is_authentic(bool);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<h1>Index</h1>} />
            <Route
              exact
              path="/login"
              element={
                <Login
                  is_auth={is_authentic}
                  set_auth={set_authentication_handler}
                />
              }
            />
            <Route
              exact
              path="/register"
              element={
                <Register
                  is_auth={is_authentic}
                  set_auth={set_authentication_handler}
                />
              }
            />
            <Route
              exact
              path="/home"
              element={
                <Home
                  is_auth={is_authentic}
                  set_auth={set_authentication_handler}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
