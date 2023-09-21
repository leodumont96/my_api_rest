import Sequelize, { Model } from 'sequelize';

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
  }

  // por fim inicializamos o model e 
}
