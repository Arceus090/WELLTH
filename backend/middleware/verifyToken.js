const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ msg: "Not authorized. No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "Not authorized. No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ msg: "Token expired" });
            } else {
                return res.status(403).json({ msg: "Invalid token" });
            }
        } else {
            req.user = decodedToken; // decodedToken = {id: newUser._id}
            next();
        }
    });
};

module.exports = verifyToken;
