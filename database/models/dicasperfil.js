'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasPerfil extends Model {
    static associate(models) {
    }
  };
  DicasPerfil.init({
    idUsuarios_fk: {
      type:
        DataTypes.BIGINT,
      references: {
        model: "Usuario",
        key: "id"
      }
    },
    idDicasGerais_fk: {
      type:
        DataTypes.INTEGER,
      references: {
        model: "DicasGerais",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DicasPerfil',
    timestamps: false
  });
  return DicasPerfil;
};