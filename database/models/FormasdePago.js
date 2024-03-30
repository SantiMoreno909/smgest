const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const FormasPago = sequelize.define(
    "FormasPago",
    {
      FormaPagoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      formapago: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "FormasPago",
      timestamps: false,
    }
  );

  return FormasPago;
};
