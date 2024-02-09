const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("../routes/userRoutes");
const expRoutes = require("../routes/expRoutes");
require("./config/dbConfig");
const jwt = require("jsonwebtoken");

const middleware = require("../middleware/checkToken");

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
//TODO: verificar necessidade do id nessa parte
app.use("/exp/:id", middleware.checkToken, expRoutes);

app.listen(3333);
