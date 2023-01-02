// import TodoInput from "../components/todo-input";
// import TodoList from "../components/todo-list";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ is_auth, set_auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!is_auth) {
      navigate("/login");
    }
  }, [is_auth, navigate]);

  return is_auth ? (
    <div>
      <h1>nodegres</h1>
      <p>A todo list app built using the PERN stack</p>
      <h1>Home</h1>
      <span>{is_auth ? "logged in" : "logged out"}</span>
      <button
        onClick={() => set_auth(false)}
        className={"btn btn-outline-secondary"}
      >
        Logout
      </button>
    </div>
  ) : (
    <p>Authorizing...</p>
  );
};

export default Home;
