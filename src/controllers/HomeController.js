import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Leonardo',
      sobrenome: 'Policarpo',
      email: 'teste@teste.com',
      idade: 27,
      peso: 72,
      altura: 1.74,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
