import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ is_auth, set_auth }) => {
  const [input, set_input] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = input;

  const on_input_change = (e) => {
    set_input({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (is_auth) {
      navigate("/home");
    }
  }, [is_auth, navigate]);

  const on_submit_handler = async (e) => {
    e.preventDefault();

    try {
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
          name="email"
          value={email}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => on_input_change(e)}
          className="form-control my-3"
        />
        <div className="d-flex justify-content-between">
          <button
            onClick={() => set_auth(true)}
            className="btn btn-outline-primary"
          >
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
