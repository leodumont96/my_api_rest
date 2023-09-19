import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    // preciso pegar o email e a senha da requisição
    const { email = '', password = '' } = req.body;
    // verificamos se o email ou a senha foram informados
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    // aqui checamos se há esse email cadastrado
    // email: email - na sintaxe apenas email
    const user = await User.findOne({ where: { email } });
    // agora verificamos se existe o usuário com o email informado
    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não existe'],
      });
    }

    // agora precisamos verificar as credenciais do usuário com o bcryptjs
    // podemos criar no model --> User

    // feito isso vamos fazer a validação se estiver errada
    // recebe como argumento a senha entrada pelo usuário
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        erros: ['Senha inválida'],
      });
    }
    // pegamos o id do usuário
    const { id } = user;

    // aqui vamos gerar um token para o usuário
    const token = jwt.sign(
      // 1º elemento, dados a serem incluidos = id e email
      { id, email },
      // 2º elemento a chave para assinar op token, no arquivo .env
      process.env.TOKEN_SECRET,
      // 3º elemento opções adicionais como algoritmo do hash, data de expiração
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    // retorna um objeto com o token gerado :)
    return res.json({ token });
  }
}

export default new TokenController();
