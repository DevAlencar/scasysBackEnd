const Users = require("../models/UserData");

module.exports = {
    async register(req, res) {
        switch (registerV(await req.body, Users)) {
            case 1:
                return res.status(422).json("msg: É necessário um nome");
            case 2:
                return res.status(422).json("msg: É necessário um email");
            case 3:
                return res.status(422).json("msg: É necessário uma senha");
            case 4:
                return res
                    .status(422)
                    .json("msg: É necessário senha de confirmação");
            case 5:
                return res.status(422).json("msg: as senhas não coencidem");
            case 6:
                return res
                    .status(422)
                    .json("msg: É necessário uma instituição");
            case 7:
                return res
                    .status(422)
                    .json("msg: Já existe um usuário com este email");
            case 8:
                return res.status(201).json("msg: Usuário criado com sucesso");
            default:
                return res.status(500).json("msg: serverError");
        }
    },

    async read(request, response) {
        const UserList = await Users.find();

        return response.json(UserList);
    },

    /*async create(request, response) {
    const { title, notes, priority } = request.body;

    if (!notes || !title) {
      return response.status(400).json({
        error: "Necessário um título/anotação",
      });
    }

    const annotationCreated = await Annotations.create({
      title,
      notes,
      priority,
    });

    return response.json(annotationCreated);
  },

  async delete(request, response) {
    const { id } = request.params;

    const annotationDeleted = await Annotations.findOneAndDelete({
      _id: id,
    });

    if (annotationDeleted) {
      return response.json(annotationDeleted);
    } else {
      return response.status(401).json({
        error: "Não foi encontrado o registro",
      });
    },
}*/
};
