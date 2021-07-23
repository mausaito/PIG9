'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Moeda extends Model {
    static associate(models) {
      this.hasOne(models.Lancamento, {
        foreignKey: 'idMoedas_fk',
        targetKey: 'id',
        as: 'lancamento'
      })
    }
  };
  Moeda.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nome: DataTypes.STRING(150),
    cifra: DataTypes.STRING(3),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'Moeda',
  });
  return Moeda;
};