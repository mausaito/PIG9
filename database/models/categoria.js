'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      this.hasOne(models.Lancamento, {
        foreignKey: 'idCategorias_fk',
        targetKey: 'id',
        as: 'lancamento'
      })
    }
  };
  Categoria.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nome: DataTypes.STRING(150),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};