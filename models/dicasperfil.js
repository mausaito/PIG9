'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasPerfil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DicasPerfil.init({
    idUsuarios_fk: { type:
      DataTypes.NUMBER,
      references: {
        model: "Usuario",
        key: "id"
      }
    },
    idDicasGerais: { type:
      DataTypes.NUMBER,
      references: {
        model: "DicasGerais",
        key: "id"
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  },
  {
    sequelize,
    modelName: 'DicasPerfil',
  });
  return DicasPerfil;
};