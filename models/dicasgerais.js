'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasGerais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DicasGerais.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIcrement: true,
      allownull: false
    },
    dicaPerfil: DataTypes.STRING(150),
    dicaUsuario: DataTypes.STRING(150),
    createdAt: DataTypes.DATE(150),
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'DicasGerais',
  });
  return DicasGerais;
};