import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TodoInput from "../components/todo-input";
import TodoList from "../components/todo-list";

const Home = ({ is_auth, set_auth }) => {
  const navigate = useNavigate();
  const [logged_in_user, set_logged_in_user] = useState(null);
  const get_logged_in_user = async () => {
    try {
      const response = await fetch("http://localhost:5000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const response_object = await response.json();
      if (response_object.user_name) {
        set_logged_in_user(response_object.user_name);
        set_auth(true);
      } else {
        set_logged_in_user(null);
        set_auth(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    get_logged_in_user();
  });

  useEffect(() => {
    if (!is_auth && !logged_in_user) {
      navigate("/login");
    }
  }, [is_auth, logged_in_user, navigate]);

  return is_auth ? (
    <div>
      <h1>Home</h1>
      <TodoInput />
      <TodoList />
      <div className="logout-button">
        <span>
          Logged in as: <span className="user_name">{logged_in_user}</span>
        </span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            set_logged_in_user(null);
            set_auth(false);
          }}
          className={"btn btn-outline-secondary"}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <p>Authorizing...</p>
  );
};

export default Home;
