const db = require("../database/models");

const controlador = {
  index: async (req, res) => {
    try {
      const productos = await db.Productos.findAll({
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      res.render("index", { productos });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      // Redirigir a una página de error genérica
      res.status(500).send("Ocurrió un error al obtener los productos.");
    }
  },
  detalleProductos: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el parámetro id de la URL
      const producto = await db.Productos.findByPk(id, {
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      if (!producto) {
        // Si no se encuentra el producto, retornar un error 404
        return res.status(404).send("Producto no encontrado.");
      }

      res.render("detalleProducto", { producto }); // Renderizar la vista detalleProducto con los datos del producto
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
      // Redirigir a una página de error genérica
      res
        .status(500)
        .send("Ocurrió un error al obtener los detalles del producto.");
    }
  },
  vinos: async (req, res) => {
    try {
      const productos = await db.Productos.findAll({
        where: { CategoriaID: 1 }, // Filtrar por CategoriaID igual a 1
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      if (!productos || productos.length === 0) {
        // Si no se encuentran productos, retornar un error 404
        return res.status(404).send("No se encontraron productos.");
      }

      res.render("vinos", { productos }); // Renderizar la vista productosVinos con los datos de los productos encontrados
    } catch (error) {
      console.error("Error al obtener los detalles de los productos:", error);
      // Redirigir a una página de error genérica
      res
        .status(500)
        .send("Ocurrió un error al obtener los detalles de los productos.");
    }
  },
  licores: async (req, res) => {
    try {
      const productos = await db.Productos.findAll({
        where: { CategoriaID: 2 }, // Filtrar por CategoriaID igual a 1
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      if (!productos || productos.length === 0) {
        // Si no se encuentran productos, retornar un error 404
        return res.status(404).send("No se encontraron productos.");
      }

      res.render("licores", { productos }); // Renderizar la vista productosVinos con los datos de los productos encontrados
    } catch (error) {
      console.error("Error al obtener los detalles de los productos:", error);
      // Redirigir a una página de error genérica
      res
        .status(500)
        .send("Ocurrió un error al obtener los detalles de los productos.");
    }
  },
  cervezas: async (req, res) => {
    try {
      const productos = await db.Productos.findAll({
        where: { CategoriaID: 3 }, // Filtrar por CategoriaID igual a 1
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      if (!productos || productos.length === 0) {
        // Si no se encuentran productos, retornar un error 404
        return res.status(404).send("No se encontraron productos.");
      }

      res.render("cervezas", { productos }); // Renderizar la vista productosVinos con los datos de los productos encontrados
    } catch (error) {
      console.error("Error al obtener los detalles de los productos:", error);
      // Redirigir a una página de error genérica
      res
        .status(500)
        .send("Ocurrió un error al obtener los detalles de los productos.");
    }
  },
  sinAlcohol: async (req, res) => {
    try {
      const productos = await db.Productos.findAll({
        where: { CategoriaID: 4 }, // Filtrar por CategoriaID igual a 1
        include: [
          { model: db.Categorias, as: "Categorias" },
          { model: db.Subcategorias, as: "Subcategorias" },
          { model: db.Proveedores, as: "Proveedores" },
        ],
      });

      if (!productos || productos.length === 0) {
        // Si no se encuentran productos, retornar un error 404
        return res.status(404).send("No se encontraron productos.");
      }

      res.render("bebidasSinAlcohol", { productos }); // Renderizar la vista productosVinos con los datos de los productos encontrados
    } catch (error) {
      console.error("Error al obtener los detalles de los productos:", error);
      // Redirigir a una página de error genérica
      res
        .status(500)
        .send("Ocurrió un error al obtener los detalles de los productos.");
    }
  },
};

module.exports = controlador;
