const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuarios = sequelize.define(
    "Usuarios",
    {
      UsuarioID: {
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
      username: {
        type: DataTypes.TEXT,
      },
      contrasena: {
        type: DataTypes.TEXT,
      },
      confirmar_contrasena: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      telefono: {
        type: DataTypes.TEXT,
      },
      fec_nac: {
        type: DataTypes.DATE,
      },
      rol: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "Usuarios",
      timestamps: false,
    }
  );

  return Usuarios;
};
