'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nomeCompleto: DataTypes.STRING(150),
    email: DataTypes.STRING(150),
    dataNasc: DataTypes.DATE,
    tipoPerfil: DataTypes.ENUM('Conservador', 'Moderado', 'Arrojado'),
    hashSenha: DataTypes.STRING(60),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};