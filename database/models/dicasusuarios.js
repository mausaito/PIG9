'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasUsuarios extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'idUsuarios_fk',
        id: 'id',
        as: 'Usuario'
      })
      this.belongsTo(models.DicasGerais, {
        foreignKey: 'idDicasGerais_fk',
        id: 'id',
        as: 'DicasGerais'
      })
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
    idDicasGerais_fk: { type:
      DataTypes.INTEGER,
      references: {
        model: "DicasGerais",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'DicasUsuarios',
  });
  return DicasUsuarios;
};
