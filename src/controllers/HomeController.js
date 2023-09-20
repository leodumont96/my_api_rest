import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('Home OK');
  }
}

export default new HomeController();
