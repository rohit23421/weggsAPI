const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    //now verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("INVALID TOKEN");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("YOU ARE NOT AUTHENTICATED");
  }
}

module.exports = verify;
