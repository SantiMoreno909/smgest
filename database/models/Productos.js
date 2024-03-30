const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Productos = sequelize.define(
    "Productos",
    {
      ProductoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.TEXT,
      },
      precioVenta: {
        type: DataTypes.DECIMAL,
      },
      categoriaID: {
        type: DataTypes.INTEGER,
      },
      subcategoriaID: {
        type: DataTypes.INTEGER,
      },
      ProveedorID: {
        type: DataTypes.INTEGER,
      },
      presentacion: {
        type: DataTypes.TEXT,
      },
      url_foto: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "Productos",
      timestamps: false,
    }
  );

  // Relaciones de productos
  Productos.associate = function (models) {
    // Relaciones con categorias
    Productos.belongsTo(models.Categorias, {
      as: "Categorias",
      foreignKey: "categoriaID",
    });

    // Relaciones con subcategorias
    Productos.belongsTo(models.Subcategorias, {
      as: "Subcategorias",
      foreignKey: "subcategoriaID",
    });

    // Relaciones con proveedores
    Productos.belongsTo(models.Proveedores, {
      as: "Proveedores",
      foreignKey: "ProveedorID",
    });
  };

  return Productos;
};
