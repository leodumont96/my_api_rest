import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.json(novoAluno);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new AlunoController();
