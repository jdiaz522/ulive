// ULive · Landing page
// Única interacción: validar el correo del formulario de registro (estados J26 y J27).

const tarjetaRegistro = document.getElementById('tarjeta-registro');
const formulario = document.getElementById('form-registro');
const campoCorreo = document.getElementById('correo');
const errorCorreo = document.getElementById('error-correo');
const iconoConfirmacion = document.getElementById('icono-confirmacion');
const confirmacion = document.getElementById('confirmacion');
const confirmacionDetalle = document.getElementById('confirmacion-detalle');

// Texto sin espacios, una @, texto, un punto y al menos dos letras al final
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const patronArroba = /@/;

const mensajeSinArroba = '⚠ Revisa tu correo, le falta la @. Lo que escribiste se conserva.';
const mensajeGeneral = '⚠ Escribe un correo válido, por ejemplo nombre@correo.com';

// Muestra el error junto al campo y pone en rojo el campo y la tarjeta del formulario
function mostrarError(mensaje) {
  errorCorreo.textContent = mensaje;
  campoCorreo.style.border = '2px solid #B3261E';
  tarjetaRegistro.style.border = '2px solid #B3261E';
  // Estado de error para lectores de pantalla (lectura U3S12)
  campoCorreo.setAttribute('aria-invalid', 'true');
}

// Borra el error y devuelve los bordes definidos en el CSS
function limpiarError() {
  errorCorreo.textContent = '';
  campoCorreo.style.border = '';
  tarjetaRegistro.style.border = '';
  campoCorreo.setAttribute('aria-invalid', 'false');
}

// Revisa el correo y devuelve true si es válido.
// No cambia lo que el usuario escribió.
function validarCorreo() {
  const valor = campoCorreo.value.trim();

  if (patronCorreo.test(valor)) {
    limpiarError();
    return true;
  }

  if (valor !== '' && !patronArroba.test(valor)) {
    mostrarError(mensajeSinArroba);
  } else {
    mostrarError(mensajeGeneral);
  }
  return false;
}

// Al salir del campo: valida solo si el usuario escribió algo.
// No devuelve el foco aquí para no atrapar a quien navega con el teclado.
campoCorreo.addEventListener('blur', function () {
  if (campoCorreo.value.trim() !== '') {
    validarCorreo();
  }
});

// Al enviar: no hay servidor, así que siempre se evita el envío real
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validarCorreo()) {
    campoCorreo.focus();
    return;
  }

  // Correo válido: se oculta el formulario y se muestran el escudo y el detalle (J27).
  // El párrafo role="status" ya está en la página desde el inicio, así que al
  // recibir su texto el lector de pantalla lo anuncia (lectura U3S12).
  formulario.style.display = 'none';
  iconoConfirmacion.style.display = 'block';
  confirmacionDetalle.style.display = 'block';
  confirmacion.textContent = '✓ Listo. Te escribiremos a ' + campoCorreo.value.trim();
});
