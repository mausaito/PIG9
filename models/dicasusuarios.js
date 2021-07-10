'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasUsuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DicasUsuarios.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    saldo: DataTypes.NUMBER(10,0),
    dica: DataTypes.STRING(150),
    idUsuarios_fk: { type:
      DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "id"
      }
    },
    idDicasGerais: { type:
      DataTypes.INTEGER,
      references: {
        model: "DicasGerais",
        key: "id"
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'DicasUsuarios',
  });
  return DicasUsuarios;
};