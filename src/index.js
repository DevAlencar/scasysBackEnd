const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("../routes/userRoutes");
require("./config/dbConfig");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
