'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DicasGerais extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: 'dicasPerfil',
        as: 'dicas',
        foreignKey: 'idDicasGerais_fk',
        othertKey: 'idUsuarios_fk'        
      })
    }
  };
  DicasGerais.init({
    id: {
      type:
        DataTypes.INTEGER,
      primaryKey: true,
      autoIcrement: true,
      allownull: false
    },
    dicasPerfil: DataTypes.STRING(150),
    titulo: DataTypes.STRING(45),
    valorMin: DataTypes.DECIMAL(10,0),
    texto: DataTypes.STRING(500),
    situacao: DataTypes.ENUM('NEGATIVO', 'POSITIVO'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  },{
    sequelize,
    modelName: 'DicasGerais',
  });
  return DicasGerais;
};
