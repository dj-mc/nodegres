import { useState } from "react";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ is_auth, set_auth }) => {
  const [input, set_input] = useState({
    user_email: "",
    user_password: "",
  });

  const { user_email, user_password } = input;

  const on_input_change = (e) => {
    set_input({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // console.log(is_auth);

  // useEffect(() => {
  //   if (is_auth) {
  //     navigate("/home");
  //   }
  // }, [is_auth, navigate]);

  const on_submit_handler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...input }),
      });

      const expected_token = await response.json();
      localStorage.setItem("token", expected_token.token);
      if (localStorage.token) {
        set_auth(true);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "15vh" }}>
      <h1>Login</h1>
      <form
        onSubmit={on_submit_handler}
        style={{ width: "400px", margin: "auto" }}
      >
        <input
          type="email"
          name="user_email"
          value={user_email}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="user_password"
          value={user_password}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <div className="d-flex justify-content-between auth-button">
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <span>{is_auth ? "Already logged in?" : "You're logged out"}</span>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-outline-secondary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
