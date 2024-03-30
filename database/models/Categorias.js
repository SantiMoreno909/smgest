const { DataTypes } = require("sequelize");

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

  return Categorias;
};
