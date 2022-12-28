import validator from "validator";

const validate = async (req, res, next) => {
  const { user_name, user_email, user_password } = req.body;

  if (req.path === "/login") {
    if (
      ![user_email, user_password].every(Boolean) ||
      !validator.isEmail(user_email)
    ) {
      return res.status(401).send("Invalid credentials");
    }
  }

  if (req.path === "/register") {
    if (
      ![user_name, user_email, user_password].every(Boolean) ||
      !validator.isEmail(user_email)
    ) {
      return res.status(401).send("Invalid credentials");
    }
  }

  next();
};

export default validate;
