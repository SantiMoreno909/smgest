window.addEventListener("DOMContentLoaded", () => {
  console.log("Conectado");

  document.querySelector("form").addEventListener("submit", function (event) {
    // Limpiar errores anteriores
    document.querySelector(".errores").innerHTML = "";
    let errores = "";

    // Validación del campo "Nombre"
    errores += validarCampo("nombre", "Nombre");
    // Validación del campo "Apellido"
    errores += validarCampo("apellido", "Apellido");
    // Validación del campo "Username"
    errores += validarCampo("username", "Username");
    // Validación del campo "Email"
    errores += validarEmail("email");
    // Validación del campo "Contraseña"
    errores += validarContraseña("contrasena");
    // Validación del campo "Confirmar Contraseña"
    errores += validarConfirmarContraseña("contrasena", "confirmar_contrasena");

    // Mostrar errores
    if (errores.length > 0) {
      event.preventDefault();
      document.querySelector(".errores").innerHTML = errores;
    }
  });
});

function validarCampo(campoId, nombreCampo) {
  const campo = document.getElementById(campoId);
  if (campo.value.trim() === "") {
    return `<div class="error-card">El campo "${nombreCampo}" no puede estar vacío</div>`;
  } else if (campo.value.trim().length < 2) {
    return `<div class="error-card">El campo "${nombreCampo}" debe tener al menos 2 caracteres</div>`;
  }
  return "";
}

function validarEmail(emailId) {
  const email = document.getElementById(emailId);
  if (email.value.trim() === "") {
    return '<div class="error-card">El campo "Email" no puede estar vacío</div>';
  } else if (!email.value.includes("@") || !email.value.includes(".")) {
    return '<div class="error-card">El campo "Email" no es válido</div>';
  }
  return "";
}

function validarContraseña(contrasenaId, confirmarContrasenaId) {
  const contrasena = document.getElementById(contrasenaId);
  const confirmarContrasena = document.getElementById(confirmarContrasenaId);

  if (contrasena.value.trim() === "") {
    return '<div class="error-card">El campo "Contraseña" no puede estar vacío</div>';
  } else if (contrasena.value.length < 8) {
    return '<div class="error-card">La contraseña debe tener al menos 8 caracteres</div>';
  } else if (contrasena.value.trim() !== confirmarContrasena.value.trim()) {
    return '<div class="error-card">Las contraseñas no coinciden</div>';
  }

  return "";
}

function validarConfirmarContraseña(contrasenaId, confirmarContrasenaId) {
  const contrasena = document.getElementById(contrasenaId);
  const confirmarContrasena = document.getElementById(confirmarContrasenaId);
  if (contrasena.value.trim() !== confirmarContrasena.value.trim()) {
    return '<div class="error-card">Las contraseñas no coinciden</div>';
  }
  return "";
}
