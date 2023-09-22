import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/app';

export default class Foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo precisa ser preenchido',
          },
        },
      },
      // vamos criar um campo virtual que quando obter os valores gere uma url
      url: {
        type: Sequelize.VIRTUAL,
        // usamos o método get para obter o valor de um campo e realizar operações
        // antes de retornar, no caso
        get() {
          // usamos o método getDataValue para acessar o valor do campo filename
          // consiguramos nossa url na pasta config, e alteramos o destino para
          // as imagens serem upadas na pasta images :)
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'fotos',
    });
    return this;
  }

  // vamos associar a Foto ao Aluno
  static associate(models) {
    // this refere-se ao Model, método belongsTo - pertence à
    // 1º argumento - model que será vinculado
    // 2º argumento - chave estrangeira que faz referência
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
    // poderíamos fazer o mesmo no aluno, usando o método hasOne ou hasMany
    // que foi feito :)
  }

  // por fim inicializamos o model e
}
