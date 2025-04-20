const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log("Cookies:", req.cookies);
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err);
      return res.status(403).json({ message: "Token is not valid!" });
    }

    console.log("Decoded token:", decoded); 
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };
