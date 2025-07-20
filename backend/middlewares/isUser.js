const userModel = require('../models/userModel');
const isUser = async (req, res, next) => {
    const user = await userModel.findById(req.user.id);

    if (user && user.role === "user") {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access denied" });
    }
};

module.exports = isUser;
