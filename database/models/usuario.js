'use strict';
const {
  Model
} = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');
const { update } = require('sequelize/lib/model');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Lancamento, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'lancamento'
      })
      this.hasMany(models.DicasUsuarios, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'dicasUsuario'
      })
      this.hasMany(models.DicasPerfil, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'dicasPerfil'
      })
    }
  };
  Usuario.init({
    id: { type:
      DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    nomeCompleto: DataTypes.STRING(150),
    email: DataTypes.STRING(150),
    dataNasc: DataTypes.DATE,
    tipoPerfil: DataTypes.ENUM('CONSERVADOR', 'MODERADO', 'ARROJADO'),
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