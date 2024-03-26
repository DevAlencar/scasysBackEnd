require("dotenv/config");

const mongoose = require("mongoose");

//Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Connect to DB
const dbConfig = `mongodb+srv://cauatn:tavarescauac2003@cluster0.igxjawd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const connection = mongoose
    .connect(dbConfig)
    .then(() => console.log("conectou com sucesso"))
    .catch((err) => console.log(err));

module.exports = connection;
