'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lancamento extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'idUsuarios_fk',
        id: 'id',
        as: 'usuario'
      })
      this.belongsTo(models.Moeda, {
        foreignKey: 'idMoedas_fk',
        id: 'id',
        as: 'moeda'
      })
      this.belongsTo(models.Categoria, {
        foreignKey: 'idCategorias_fk',
        id: 'id',
        as: 'categoria'
      })
    }
  };
  Lancamento.init({
    id: { type:
      DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    descricao: DataTypes.STRING(50),
    valor: DataTypes.DECIMAL(10,2),
    dataPagto: DataTypes.DATE,
    observacao: DataTypes.STRING(200),
    tipoLancamento: DataTypes.ENUM('Receita', 'Despesa'),
    banco: DataTypes.STRING(45),
    idUsuarios_fk: { type:
      DataTypes.BIGINT,
      references: {
        model: "Usuario",
        key: "id"
      }
    },
    idMoedas_fk: { type:
      DataTypes.INTEGER,
      references: {
        model: "Moedas",
        key: "id"
      }
    },
    idCategorias_fk: { type:
      DataTypes.INTEGER,
      references: {
        model: "Categorias",
        key: "id"
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.STRING(150),
    updatedBy: DataTypes.STRING(150)
  }, {
    sequelize,
    modelName: 'Lancamento',
  });
  return Lancamento;
};
