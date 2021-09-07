const config = require("./config.js");

const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      config.JWT_SECRET
    );
  },

  isAuth: (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(401).send("Token is not supplied");
    } else {
      const token = bearerToken.slice(7, bearerToken.length);
      console.log(token);
      jwt.verify(token, config.JWT_SECRET, (err, data) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          console.log(data);
          req.user = data;
          next();
        }
      });
    }
  },
};
