require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('./config/passport');

const connectCloudinary = require('./config/cloudinary');
const userRouter = require("./routes/userRouter");


connectDB();

connectCloudinary();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', userRouter);

app.get("/", (req, res) => res.send("Api is running!"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));