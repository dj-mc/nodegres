import { useState } from "react";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ is_auth, set_auth }) => {
  const [input, set_input] = useState({
    user_email: "",
    user_password: "",
    user_name: "",
  });

  const { user_email, user_password, user_name } = input;

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
      const response = await fetch("http://localhost:5000/auth/register", {
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
      <h1>Register</h1>
      <form
        onSubmit={on_submit_handler}
        style={{ width: "600px", margin: "auto" }}
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
        <input
          type="text"
          name="user_name"
          value={user_name}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <span>{is_auth ? "logged in" : "logged out"}</span>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-outline-secondary"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
