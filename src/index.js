const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("../routes/userRoutes");
const msgRoutes = require("../routes/msgRoutes");
const expRoutes = require("../routes/expRoutes");
require("./config/dbConfig");
const jwt = require("jsonwebtoken");

const middleware = require("../middleware/checkToken");

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/msg", msgRoutes);
app.use("/exp", middleware.checkToken, expRoutes);

app.listen(3333);
