const User = require("../models/UserData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = {
    async register(req, res) {
        const { name, email, password, confirmPassword, institution } =
            req.body;

        //validations

        //verificando existencia dos dados
        if (!name) {
            return res.status(422).json("msg: É necessário um nome");
        }
        if (!email) {
            return res.status(422).json("msg: É necessário um email");
        }
        if (!password) {
            return res.status(422).json("msg: É necessário uma senha");
        }
        if (!confirmPassword) {
            return res
                .status(422)
                .json("msg: É necessário uma senha de confirmaçao");
        }
        if (password !== confirmPassword) {
            return res
                .status(422)
                .json("msg: a senha de confirmação está diferente");
        }
        if (!institution) {
            return res.status(422).json("msg: É necessário uma instituição");
        }

        //verificando existencia do usuario
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json("msg: O usuário já existe");
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
            return res.status(201).json("msg: Usuário criado com sucesso");
        } catch (error) {
            return res.status(500).json("msg: serverError");
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        //validations

        //verificando existencia dos dados
        if (!email) {
            return res.status(422).json("msg: É necessário um email");
        }
        if (!password) {
            return res.status(422).json("msg: É necessário uma senha");
        }

        //verificando se usuario existe
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        //validando senha
        const userPasswordCheck = await bcrypt.compare(password, user.password);
        if (!userPasswordCheck) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        //login do usuario com token
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret
            );

            await user.save();
            res.status(200).json({ msg: "Login realizado com sucesso", token });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete({ _id: id });

            //validando se o usuário foi encontrado
            if (!user) {
                return res.status(404).json({ msg: "Usuário não encontrado" });
            }

            return res
                .status(200)
                .json({ msg: "Usuário deletado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },
};
