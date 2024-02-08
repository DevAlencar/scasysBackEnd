module.exports = {
    async read(req, res) {
        return res.status(200).json({ msg: "deu certo" });
    },
};
