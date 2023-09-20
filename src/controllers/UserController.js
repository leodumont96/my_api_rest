import User from '../models/User';

class UserController {
  // store - cria um usuário
  async store(req, res) {
    try {
      // aqui está recebendo o corpo da requisição que contém os dados
      const newUser = await User.create(req.body);
      // e vamos retornar apenas os campos id, nome e email
      // para isso desestruturamos
      const { id, nome, email } = newUser;
      return res.json({ id, nome, email });
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
      // podemos filtrar quais campos exibir com a propriedade atributes
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // show - mostra um usuário
  async show(req, res) {
    try {
      // vou procurar pelo id, nos parâmetros da requisição
      // find by pk = primary key
      const user = await User.findByPk(req.params.id);
      // desestruturo o objeto usuário e retorno apenas esses dados num objeto json
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // update
  async update(req, res) {
    try {
      /*
        pegamos o id informado

        const { id } = req.params;

        verificamos se o id existe, se não ele apresanta o erro

        if (!id) {
          return res.status(400).json({
            errors: ['ID não enviado'],
          });
        }
        porém não precisamos mais disso pois colocamos o id do usuário
        logado dentra da requisição
      */

      // procuramos o usuário pelo id da requisição feita
      // pois ele identifica que é aquele usuário que está acessando
      // o userId informamos quando o usuário logar no sistema :)
      const user = await User.findByPk(req.userId);
      // agora verificamos se o usuário existe
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      // depois de encontrado, vamos atualizar o usuário com o body
      // enviado na requisição e atribuir a uma váriavel para esperar (await)
      const novosDados = await user.update(req.body);
      // por fim poderíamos retornar o usuário
      // return res.json(novosDados);
      // porém queremos também apenas os campos id, nome e email
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      /*

        assim como no update, não precisamos mais disso, pois pegaremos
        diretamente assim que o usuário logar

        const { id } = req.params;

        if (!id) {
          return res.status(400).json({
            errors: ['ID não enviado'],
          });
        }
      */
      // definimos quem é o usuário pelo id informado na requisição
      const user = await User.findByPk(req.userId);

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
