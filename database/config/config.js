module.exports = {
  development: {
    username: "root",
    password: null,
    database: "smgest",
    host: "localhost",
    dialect: "sqlite",
    storage: "C:/Users/Santiago/Desktop/SMGest/smgest/database/smgest.db", // Ruta actualizada
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "../smgest.db", // Ruta actualizada
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "../smgest.db", // Ruta actualizada
  },
};
