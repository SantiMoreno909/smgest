const { validationResult } = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

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
      console.log("Datos a enviar a la base de datos:", {
        nombre,
        apellido,
        username,
        email,
        telefono,
        fec_nac,
        rol,
      });

      await db.Usuarios.create({
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

      res.redirect("login");
    } catch (error) {
      console.error("Error al guardar el usuario en la base de datos:", error);
      res.render("users/registro", {
        error: "Error al registrar el usuario. Por favor, inténtalo de nuevo.",
      });
    }
  },

  // usuarios: (req, res) => {
  //   db.Usuarios.findAll({
  //     raw: true,
  //     nest: true,
  //   }).then(function (usuario) {
  //     res.render("users/admin", { usuario: usuario });
  //   });
  // },

  // destroy: (req, res) => {
  //   const { id } = req.params;
  //   const usersIndex = user.findIndex((user) => user.id === parseInt(id));
  //   user.splice(usersIndex, 1);
  //   fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
  //   res.redirect("/users/usuarios");
  // },

  // editar: (req, res) => {
  //   let userId = req.params.id;
  //   const result = user.find((data) => {
  //     if (data.id == userId) {
  //       return data;
  //     }
  //   });

  //   res.render("users/userEdit", { usuario: result });
  // },

  // update: (req, res) => {
  //   const {
  //     Nombre,
  //     Apellido,
  //     email,
  //     tel,
  //     nacimiento,
  //     genero,
  //     type,
  //     contrasena,
  //     fotoPerfil,
  //     confirmar_contrasenia,
  //     aceptar_terminos,
  //     newsletter,
  //   } = req.body;
  //   const id = parseInt(req.params.id);
  //   const index = user.findIndex((user) => user.id === id);

  //   if (index === -1) {
  //     res.render("usuario");
  //     return;
  //   }

  //   user[index].Nombre = Nombre;
  //   user[index].Apellido = Apellido;
  //   user[index].email = email;
  //   user[index].tel = tel;
  //   user[index].nacimiento = nacimiento;
  //   user[index].genero = genero;
  //   user[index].type = type;
  //   user[index].contrasena = contrasena;
  //   user[index].confirmar_contrasenia = confirmar_contrasenia;
  //   user[index].fotoPerfil = fotoPerfil;
  //   user[index].aceptar_terminos = aceptar_terminos;
  //   user[index].newsletter = newsletter;

  //   fs.writeFileSync(userFilePath, JSON.stringify(user), "utf-8");
  //   res.redirect("/users/usuarios");
  // },

  // iniciarSesion: async (req, res) => {
  //   try {
  //     console.log("Iniciando sesión. Modelo Usuarios:", Usuarios);
  //     // Validar los resultados de la validación
  //     const errors = validationResult(req);

  //     if (!errors.isEmpty()) {
  //       return res.render("users/login", { errors: errors.array() });
  //     }

  //     const { email, contrasena } = req.body;
  //     console.log("Iniciando");
  //     // Buscar al usuario en la base de datos utilizando Sequelize
  //     const usuario = await Usuarios.findOne({ where: { email } });
  //     console.log("Usuario encontrado:", usuario);

  //     if (
  //       usuario &&
  //       bcrypt.compareSync(contrasena, bcrypt.hashSync(usuario.contrasenia))
  //     ) {
  //       req.session.user = usuario;
  //       res.redirect("/");
  //     } else {
  //       res.render("users/login", {
  //         errors: [{ msg: "Usuario y/o contraseña incorrectos" }],
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error en la función iniciarSesion:", error);
  //     res.status(500).send("Error interno del servidor");
  //   }
  // },

  // cerrarSesion: (req, res) => {
  //   req.session.destroy();
  //   res.redirect("/");
  // },
};

module.exports = controlador;
