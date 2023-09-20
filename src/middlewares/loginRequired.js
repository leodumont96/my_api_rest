import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  // pego o token que foi enviado pela requisição
  const { authorization } = req.headers;
  // verifico antes se foi enviado pelo usuário
  if (!authorization) {
    return res.status(401).json({
      errors: ['Necessário fazer login'],
    });
  }
  // precisamos tratar o token, separar os dois itens para usarmos apenas o token enviado
  // desestruturamos ele para isso
  // e usamos o método split para dividir
  // acessamos a string, e definimos o separador ' ', espaço vazio
  // com isso atribuimos cada parte dividida em uma variável texto e token
  const [, token] = authorization.split(' ');

  // testamos o token
  try {
    // vamos checar o token, e ele vai retornar o payload (id e email)
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // agora precisamos de cada um individualmente
    const { id, email } = dados;

    // agora precisamos checar se o email e o id ainda são os mesmos
    // pois se forem alterados é necessário gerar um novo token de acesso
    // comparamos com o usuário criado, então, importamos o model User
    // é assíncrono, por isso usamos o await
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    // agora checamos se ainda é o mesmo, se não retornamos um erro
    // sendo diferente o usuário teria que logar novamente e assim
    // gerar um novo token
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    // atribuimos os dados obtidos em propriedades da requisição
    req.userId = id;
    req.userEmail = email;
    // com as informações que precisamos, retornamos um next
    // com isso ele vai para o próximo middleware ou rota
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
