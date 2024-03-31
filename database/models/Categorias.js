const { DataTypes } = require("sequelize");
const Productos = require("./Productos");
const Subcategorias = require("./Subcategorias");

module.exports = (sequelize) => {
  const Categorias = sequelize.define(
    "Categorias",
    {
      CategoriaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "Categorias",
      timestamps: false,
    }
  );

  Categorias.associate = function (models) {
    Categorias.hasMany(models.Productos, {
      foreignKey: "categoriaID",
      as: "Productos",
    });
    Categorias.hasMany(models.Subcategorias, {
      foreignKey: "categoriaID",
      as: "Subcategorias",
    });
  };

  return Categorias;
};
