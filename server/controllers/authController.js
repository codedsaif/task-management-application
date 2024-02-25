const User = require("../models/User.js");

const signup = async (req, res, next) => {
  // console.log("SINGUP ROUTE CALLED");
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all values" });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    // console.log("Created User", user, token);
    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    // Handling unexpected errors
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all values" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = user.createJWT();
    user.password = undefined;

    res.status(200).json({ user, token });
  } catch (error) {
    // Handling unexpected errors
    console.error("Error in signin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, signin };
