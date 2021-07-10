'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moedas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Moedas.init({
    id: { type:
      DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nome: DataTypes.STRING(150),
    cifra: DataTypes.STRING(3)
  }, {
    sequelize,
    modelName: 'Moedas',
  });
  return Moedas;
};