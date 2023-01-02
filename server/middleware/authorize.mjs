import jwt from "jsonwebtoken";

// Authorize access to a logged in user

const authorize = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (token) {
      const verified_token = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified_token.user;
      next();
    } else {
      return res.status(403).send("Not authorized");
    }
  } catch (err) {
    return res.status(403).send("Not authorized");
  }
};

export default authorize;
