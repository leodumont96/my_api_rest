import User from '../models/User';

class UserController {
  // store - cria um usuário
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      // aqui está recebendo o corpo da requisição que contém os dados
      return res.json(newUser);
    } catch (e) {
      // se houver erro retorna um array com os erros
      // vamos tratar esse erro e exibir na tela qual é
      // primeiro vamos exibir o status 400 (bad request)
      // vamos utilizar a função map para percorrer esse array
      // e retornar a mensagem que ele exibe configurada no model :)
      // por fim vamos colocar num objeto com a propriedade errors
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index - retorna todos os usuários cadastrados
  // para isso usamo o método findAll()
  // precisamos criar uma rota para executar e exibir o resultado
  // e fazemos dentro do userRoutes mesmo
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // show - mostra um usuário
  async show(req, res) {
    try {
      // vou procurar pelo id, nos parâmetros da requisição
      const { id } = req.params;
      // find by pk = primary key
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {
      // pegamos o id informado
      const { id } = req.params;
      // verificamos se o id existe, se não ele apresanta o erro
      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      // procuramos o usuário pelo id
      const user = await User.findByPk(id);
      // agora verificamos se o usuário existe
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      // depois de encontrado, vamos atualizar o usuário com o body
      // enviado na requisição e atribuir a uma váriavel para esperar (await)
      const novosDados = await user.update(req.body);
      // por fim retorno o usuário
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      // por fim apagamos, usando o método destroy
      await user.destroy();
      // optei por colocar essa mensagem ao concluir
      return res.json('Usuário apagado');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
