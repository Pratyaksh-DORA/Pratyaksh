const express = require("express");
const cookieParser = require("cookie-parser")
const connectWithDatabase = require("./config/db")

const dotenv = require("dotenv").config();
const app = express();

// connect with DB
connectWithDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/user");

app.use("/api/v1", user);

module.exports = app