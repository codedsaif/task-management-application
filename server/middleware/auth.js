const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Invalid" });
  }
};

module.exports = auth;
