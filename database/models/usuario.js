'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Lancamento, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'Lancamento'
      })
      this.hasMany(models.DicasUsuarios, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'DicasUsuario'
      })
      this.hasMany(models.DicasPerfil, {
        foreignKey: 'idUsuarios_fk',
        targetKey: 'id',
        as: 'DicasPerfil'
      })
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
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};