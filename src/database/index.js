import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from '../models/Foto';

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseConfig.development);

models.forEach((model) => model.init(connection));
// Aqui digo que para cada model, será feita essa checagem
// poderia ser um if mas optamos por essa maneira:
// havendo esse método associate no model feito aí sim ele executa
// o método
models.forEach((model) => model.associate && model.associate(connection.models));
