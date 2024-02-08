const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("../routes/userRoutes");
const expRoutes = require("../routes/expRoutes");
require("./config/dbConfig");

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
//FIXME:
app.use("/exp", expRoutes);

app.listen(3333);
