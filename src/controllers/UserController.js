import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      // aqui está recebendo o corpo da requisição que contém os dados
      res.json(newUser);
    } catch (e) {
      // se houver erro retorna um array com os erros
      // vamos tratar esse erro e exibir na tela qual é
      // primeiro vamos exibir o status 400 (bad request)
      // vamos utilizar a função map para percorrer esse array
      // e retornar a mensagem que ele exibe configurada no model :)
      // por fim vamos colocar num objeto com a propriedade errors
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
