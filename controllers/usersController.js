const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database/models");
const { Usuarios } = require("../database/models");
const { unsubscribe } = require("../routes/usersRoutes");

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
      const sessionUsername = req.params.username; // Obtener el username de los parámetros de la URL
      console.log("USERNAME: " + sessionUsername);

      const usuario = await db.Usuarios.findOne({
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

  // editarUsuario: async (req, res) => {
  //   try {
  //     const UsuarioID = usuario.UsuarioID;
  //     const usuario = await db.Usuario.findByPk(UsuarioID);

  //     if (!usuario) {
  //       res.render("users/detallesUsuario"); // Manejo de caso en que no se encuentra el usuario
  //       return;
  //     }

  //     res.render("users/detallesUsuario", { usuario });
  //   } catch (error) {
  //     console.error("Error al intentar obtener el usuario:", error);
  //     res.render("users/detallesUsuario", {
  //       error: "Error al obtener el usuario",
  //     });
  //   }
  // },

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

  cerrarSesion: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = controlador;
