const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = {
  LoginUser: async (db, user, res) => {
    const password = crypto.createHmac("sha256", user.password).digest("hex");

    try {
      const [data, _] = await db.query(
        "SELECT * FROM users WHERE (username, password) = (?, ?)",
        [user.username, password]
      );

      const User = data[0];

      const token = jwt.sign(JSON.stringify(User), process.env.SECRET_KEY);

      res.cookie("authtoken", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        SameSite: "Strict",
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

module.exports = users;
