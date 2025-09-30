const express = require("express");
const userRouter = require("./routes/userRouter");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log("server is running")
})