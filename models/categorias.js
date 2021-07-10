'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Categorias.init({
    id: { type:
      DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nome: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};