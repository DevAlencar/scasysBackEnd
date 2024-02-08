require("dotenv/config");

const mongoose = require("mongoose");

//Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Connect to DB
const dbConfig = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ezmc5wg.mongodb.net/scasys?retryWrites=true&w=majority`;
const connection = mongoose
    .connect(dbConfig)
    .then(() => console.log("conectou com sucesso"))
    .catch((err) => console.log(err));

module.exports = connection;
