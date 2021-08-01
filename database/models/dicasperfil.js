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
      this.belongsTo(models.Usuario, {
        foreignKey: 'idUsuarios_fk',
        id: 'id',
        as: 'usuario'
      })
      this.belongsTo(models.DicasGerais, {
        foreignKey: 'idDicasGerais_fk',
        id: 'id',
        as: 'dicasGerais'
      })
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
  });
  return DicasPerfil;
};