import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Camilo',
      sobrenome: 'Policarpo',
      email: 'teste@teste.com',
      idade: 18,
      peso: 55,
      altura: 1.7,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
