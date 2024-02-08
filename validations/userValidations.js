const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerV(userData, User) {
    const { name, email, password, confirmPassword, institution } = userData;

    //verificando existencia dos dados
    if (!name) {
        return 1;
    }
    if (!email) {
        return 2;
    }
    if (!password) {
        return 3;
    }
    if (!confirmPassword) {
        return 4;
    }
    if (password !== confirmPassword) {
        return 5;
    }
    if (!institution) {
        return 6;
    }

    //verificando existencia do usuario
    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return 7;
    }

    //criptografando password
    const salt = await bcrypt.genSalt(15);
    const passwordHash = await bcrypt.hash(password, salt);

    //criando usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
        institution,
    });

    try {
        await user.save();
        return 8;
    } catch (error) {
        return 0;
    }
}
