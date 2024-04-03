const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/models");
const { Usuarios } = require("../database/models");

const controlador = {
  login: (req, res) => {
    console.log("entra login");
    res.render("users/login");
  },

  registro: (req, res) => {
    res.render("users/registro");
  },

  guardarUsuario: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/registro", { errors: errors.array() });
    }

    const {
      nombre,
      apellido,
      username,
      email,
      contrasena,
      confirmar_contrasena,
      telefono,
      fec_nac,
      rol,
    } = req.body;

    try {
      // Verificar si las contraseñas coinciden
      if (contrasena !== confirmar_contrasena) {
        return res.render("users/registro", {
          error: "Las contraseñas no coinciden",
        });
      }

      // Hash de la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(contrasena, 10); // Se utiliza una sal de 10 rounds

      // Crear el nuevo usuario en la base de datos con la contraseña encriptada
      await db.Usuarios.create({
        nombre,
        apellido,
        username,
        email,
        contrasena: hashedPassword, // Se guarda la contraseña encriptada
        confirmar_contrasena: hashedPassword,
        telefono,
        fec_nac,
        rol,
      });

      res.redirect("login");
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      res.render("users/registro", {
        error: "Error al registrar el usuario. Por favor, inténtalo de nuevo.",
      });
    }
  },

  iniciarSesion: async (req, res) => {
    try {
      console.log("Iniciando sesión");
      // Validar los resultados de la validación
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("users/login", { errors: errors.array() });
      }

      const { email, contrasena } = req.body;
      console.log("Iniciando");
      // Buscar al usuario en la base de datos utilizando Sequelize
      const usuario = await Usuarios.findOne({ where: { email } });
      console.log("Usuario encontrado:", usuario);

      if (usuario && bcrypt.compareSync(contrasena, usuario.contrasena)) {
        req.session.UsuarioID = usuario.UsuarioID;
        req.session.username = usuario.username;
        req.session.rol = usuario.rol;
        console.log(req.session);
        res.redirect("/");
      } else {
        res.render("users/login", {
          errors: [{ msg: "Usuario y/o contraseña incorrectos" }],
        });
      }
    } catch (error) {
      console.error("Error en la función iniciarSesion:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  detallesUsuario: async (req, res) => {
    try {
      const sessionUsername = req.session.username;
      console.log("USERNAME: " + sessionUsername);

      const usuario = await db.Usuarios.findAll({
        where: {
          username: sessionUsername,
        },
        raw: true,
        nest: true,
      });

      res.render("users/detallesUsuario", { usuario });
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje de error en una página de error
      res.render("users/detallesUsuario", {
        error: "Error al registrar el usuario. Por favor, inténtalo de nuevo.",
      });
    }
  },

  destruirUsuario: async (req, res) => {
    const { id } = req.params;

    try {
      // Buscar el usuario en la base de datos por su ID y eliminarlo
      await db.Usuarios.destroy({
        where: {
          id: id,
        },
      });

      res.redirect("/users/usuarios");
    } catch (error) {
      console.error("Error al intentar eliminar el usuario:", error);
      res.redirect(
        "/users/usuarios?error=Error al intentar eliminar el usuario"
      );
    }
  },

  editarUsuario: async (req, res) => {
    try {
      const userId = req.params.id;
      const usuario = await db.Usuario.findByPk(userId);

      if (!usuario) {
        res.render("usuario"); // Manejo de caso en que no se encuentra el usuario
        return;
      }

      res.render("users/userEdit", { usuario });
    } catch (error) {
      console.error("Error al intentar obtener el usuario:", error);
      res.render("usuario", { error: "Error al obtener el usuario" });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        username,
        email,
        contrasena,
        confirmar_contrasena,
        telefono,
        fec_nac,
        rol,
      } = req.body;
      const id = parseInt(req.params.id);

      // Buscar el usuario en la base de datos por su ID
      const usuario = await db.Usuario.findByPk(id);

      if (!usuario) {
        res.render("usuario"); // Manejo de caso en que no se encuentra el usuario
        return;
      }

      // Actualizar los datos del usuario
      await usuario.update({
        nombre,
        apellido,
        username,
        email,
        contrasena,
        confirmar_contrasena,
        telefono,
        fec_nac,
        rol,
      });

      res.redirect("/users/usuarios");
    } catch (error) {
      console.error("Error al intentar actualizar el usuario:", error);
      res.render("usuario", { error: "Error al actualizar el usuario" });
    }
  },

  cerrarSesion: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = controlador;
