require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('./config/passport');
const connectCloudinary = require('./config/cloudinary');

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const wishlistRouter = require("./routes/wishListRouter");
const orderRouter = require("./routes/orderRouter");
const stripeWebhooks = require("./controllers/stripeWebhooks");

app.post("/api/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

connectDB();
connectCloudinary();
const allowedOrigins = ["http://localhost:5173", "https://tech-zone-e-commerce-project.vercel.app",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', userRouter);
app.use('/api/product', productRouter); 
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => res.send("Api is running!"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
