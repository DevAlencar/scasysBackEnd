const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("../routes/routes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./config/dbConfig");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
