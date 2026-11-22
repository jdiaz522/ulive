// ULive · Landing: valida el correo del registro (J26, J27)

const formulario = document.getElementById('form-registro');
const campoCorreo = document.getElementById('correo');
const errorCorreo = document.getElementById('error-correo');
const iconoConfirmacion = document.getElementById('icono-confirmacion');
const confirmacion = document.getElementById('confirmacion');
const confirmacionDetalle = document.getElementById('confirmacion-detalle');
const filaEnlace = document.getElementById('fila-enlace');
const enlaceOtroCorreo = document.getElementById('usar-otro-correo');

// Texto sin espacios, una @, texto, un punto y al menos dos letras al final
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const patronArroba = /@/;

const mensajeSinArroba = '⚠ Revisa tu correo, le falta la @. Lo que escribiste se conserva.';
const mensajeGeneral = '⚠ Escribe un correo válido, por ejemplo nombre@correo.com';

// Error junto al campo; solo cambia el color del borde, no el grosor, así el campo no se mueve
function mostrarError(mensaje) {
  errorCorreo.textContent = mensaje;
  campoCorreo.style.borderColor = '#B3261E';
  // Estado de error para lectores de pantalla
  campoCorreo.setAttribute('aria-invalid', 'true');
}

// Borra el error y devuelve el color de borde definido en el CSS
function limpiarError() {
  errorCorreo.textContent = '';
  campoCorreo.style.borderColor = '';
  campoCorreo.setAttribute('aria-invalid', 'false');
}

// Revisa el correo sin cambiar lo escrito; devuelve true si es válido
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

// Al salir del campo: valida si hay texto, sin devolver el foco para no atrapar al teclado
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

  // Correo válido: se muestra la confirmación (J27). El párrafo role="status" ya está en la página,
  // así que se anuncia al recibir su texto
  formulario.style.display = 'none';
  iconoConfirmacion.style.display = 'block';
  confirmacionDetalle.style.display = 'block';
  filaEnlace.style.display = 'flex';
  // Sin ✓ en el texto: el escudo ya lleva el check y el estado tiene ícono y texto
  confirmacion.textContent = 'Listo. Te escribiremos a ' + campoCorreo.value.trim();

  // El botón que tenía el foco quedó oculto: el foco pasa a "Usar otro correo"
  enlaceOtroCorreo.focus();
});

// "Usar otro correo": vuelve al formulario con el correo escrito y el foco en el campo
enlaceOtroCorreo.addEventListener('click', function (e) {
  e.preventDefault();

  // Vaciar el estado le quita el alto y permite anunciar un nuevo envío
  confirmacion.textContent = '';
  iconoConfirmacion.style.display = 'none';
  confirmacionDetalle.style.display = 'none';
  filaEnlace.style.display = 'none';

  formulario.style.display = 'block';
  campoCorreo.focus();
});
