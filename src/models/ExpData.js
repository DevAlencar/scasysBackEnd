const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    institution: String,
});

module.exports = mongoose.model("users", UserDataSchema);

/*TODO:
    falar com guilherme para modelar os experimentos
*/
