require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "MicroLinks API is running"
    });
});

app.use("/api", urlRoutes);
app.use("/", urlRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`MicroLinks running on port ${PORT}`);
});