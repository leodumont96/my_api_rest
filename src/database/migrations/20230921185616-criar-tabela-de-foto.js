/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // vamos criar a relação entre as tabelas FK
      // vai receber o id do aluno da tabela alunos
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          // tabela
          model: 'alunos',
          // chave primária
          key: 'id',
        },
        // seja deletando ou atualizando
        // CASCADE - ações feitas na tabela de referencia são refletidas aqui
        // SET NULL - coloca esse campo como nulo
        // RESTRICT - não vai permitir
        // NO ACTION - sem ações
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
