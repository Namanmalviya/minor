const jwt = require("jsonwebtoken");
const RegisterUser = require("./registerusers");

const protect = async (req, res, next) => {
  let token=req.headers.authorization;
  console.log(token)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    
  ) {
    token = req.headers.authorization.split(" ")[1];
    
  }

  if (!token) {
    //console.log("In auth middleware");
    return res.status(401).json({ message: "No token" });
    
  }

  try {
    const decoded = jwt.verify(token, "secret");
console.log(decoded);
    // ✅ IMPORTANT: attach user to req
    req.user = await RegisterUser.findById(decoded.id).select("_id");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
