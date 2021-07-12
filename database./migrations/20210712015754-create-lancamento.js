'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lancamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.NUMBER
      },
      descricao: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.NUMBER
      },
      dataPagto: {
        type: Sequelize.DATE
      },
      observacao: {
        type: Sequelize.STRING
      },
      tipoLancamento: {
        type: Sequelize.ENUM('Receita', 'Despesa')
      },
      banco: {
        type: Sequelize.STRING
      },
      idUsuarios_fk: {
        type: Sequelize.NUMBER
      },
      idMoedas_fk: {
        type: Sequelize.NUMBER
      },
      idCategorias_fk: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lancamentos');
  }
};