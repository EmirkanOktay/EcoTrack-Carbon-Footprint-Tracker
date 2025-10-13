const express = require("express");
const userRouter = require("./routes/userRouter");
const NotificationRouter = require("./routes/NotificationRouter");
require("dotenv").config();
require("./config/db");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use("/api/user", userRouter);
app.use("/api/notification", NotificationRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running")
})