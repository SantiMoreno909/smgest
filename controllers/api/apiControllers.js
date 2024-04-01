const db = require("../../database/models");

const controllerAPI = {
  productos: (req, res) => {
    db.Productos.findAll({
      include: [
        { association: "Categorias" },
        { association: "Subcategorias" },
        { association: "Proveedores" },
      ],
      raw: true,
      nest: true,
    }).then(function (productos) {
      let products = productos.map((producto) => {
        return {
          id: producto.ProductoID,
          name: producto.nombre,
          description: producto.presentacion,
          category: producto.Categorias.nombre, // Obtener el nombre de la categoría utilizando el campo asociado
          subcategory: producto.Subcategorias.nombre, // Obtener el nombre de la subcategoría utilizando el campo asociado
          provider: producto.Proveedores.nombre, // Obtener el nombre del proveedor utilizando el campo asociado
          detail: `/api/productos/${producto.ProductoID}`,
          url_foto: producto.url_foto,
        };
      });
      const response = {
        contador: products.length,
        productos: products,
      };
      res.json(response);
    });
  },

  productoPorId: (req, res) => {
    let id = req.params.id;
    db.Productos.findByPk(id).then(function (producto) {
      return res.json(producto);
    });
  },
  usuarios: (req, res) => {
    db.Usuarios.findAll({
      raw: true,
      nest: true,
    }).then(function (usuarios) {
      let users = usuarios.map((usuarios) => {
        return {
          id: usuarios.UsuarioID,
          name: usuarios.nombre + " " + usuarios.apellido,
          username: usuarios.username,
          email: usuarios.email,
          telefono: usuarios.telefono,
          nacimiento: usuarios.fec_nac,
          rol: usuarios.rol,
          detail: `/api/usuarios/${usuarios.id}`,
        };
      });
      const response = {
        contador: usuarios.length,
        usuarios: users,
      };
      res.json(response);
    });
  },
  usuarioPorId: (req, res) => {
    let id = req.params.id;
    const usuarios = db.Usuarios.findByPk(id).then(function (usuarios) {
      return res.json(usuarios);
    });
  },
};

module.exports = controllerAPI;
