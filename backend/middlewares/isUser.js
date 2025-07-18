const isUser = (req, res, next) => {
    if (req.user && req.user.role === "user") {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access denied" });
    }
};

module.exports = isUser;
