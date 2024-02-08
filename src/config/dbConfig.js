const mongoose = require("mongoose");

const dbConfig =
  "mongodb+srv://user:user@cluster0.ezmc5wg.mongodb.net/estudos?retryWrites=true&w=majority";

const connection = mongoose.connect(dbConfig);

module.exports = connection;
