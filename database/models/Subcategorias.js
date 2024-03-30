const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subcategorias = sequelize.define(
    "Subcategorias",
    {
      subcategoriaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.TEXT,
      },
      categoriaID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Subcategorias",
      timestamps: false,
    }
  );

  // Relaciones de Subcategorias
  Subcategorias.associate = function (models) {
    // Relaciones con categorias
    Subcategorias.belongsTo(models.Categorias, {
      as: "categoria",
      foreignKey: "categoriaID",
    });
  };

  return Subcategorias;
};
