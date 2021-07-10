'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lancamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lancamento.init({
    id: { type:
      DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allownull: false
    },
    descricao: DataTypes.STRING(50),
    valor: DataTypes.NUMBER(10,2),
    dataPagto: DataTypes.DATE,
    observacao: DataTypes.STRING(200),
    tipoLancamento: DataTypes.ENUM('Receita', 'Despesa'),
    banco: DataTypes.STRING(45),
    idUsuarios_fk: { type:
      DataTypes.INTEGER,
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
    idCategorias: { type:
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