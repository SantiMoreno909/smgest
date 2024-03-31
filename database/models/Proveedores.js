const { DataTypes } = require("sequelize");
const Productos = require("./Productos");

module.exports = (sequelize) => {
  const Proveedores = sequelize.define(
    "Proveedores",
    {
      ProveedorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.TEXT,
      },
      direccion: {
        type: DataTypes.TEXT,
      },
      telefono: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Proveedores",
      timestamps: false,
    }
  );

  Proveedores.associate = function (models) {
    Proveedores.hasMany(models.Productos, {
      foreignKey: "proveedorID",
      as: "Productos",
    });
  };

  return Proveedores;
};
