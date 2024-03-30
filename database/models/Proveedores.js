const { DataTypes } = require("sequelize");

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

  return Proveedores;
};
