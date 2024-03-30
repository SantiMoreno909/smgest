const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Vendedores = sequelize.define(
    "Vendedores",
    {
      VendedorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.TEXT,
      },
      apellido: {
        type: DataTypes.TEXT,
      },
      direccion: {
        type: DataTypes.TEXT,
      },
      telefono: {
        type: DataTypes.INTEGER,
      },
      telefonoEmergencia: {
        type: DataTypes.INTEGER,
      },
      fec_nac: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "Vendedores",
      timestamps: false,
    }
  );

  return Vendedores;
};
