// ULive · Landing page
// Única interacción: validar el correo del formulario de registro (estados J26 y J27)
// y volver al formulario desde la confirmación con "Usar otro correo".

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

// Muestra el error junto al campo y cambia solo el color del borde del campo.
// El grosor sigue siendo el del CSS (1 px), así el campo no se mueve.
function mostrarError(mensaje) {
  errorCorreo.textContent = mensaje;
  campoCorreo.style.borderColor = '#B3261E';
  // Estado de error para lectores de pantalla (lectura U3S12)
  campoCorreo.setAttribute('aria-invalid', 'true');
}

// Borra el error y devuelve el color de borde definido en el CSS
function limpiarError() {
  errorCorreo.textContent = '';
  campoCorreo.style.borderColor = '';
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

  // Correo válido: se oculta el formulario y se muestran el escudo, el detalle y
  // la fila del enlace "Usar otro correo" (J27). El párrafo role="status" ya está en la
  // página desde el inicio, así que al recibir su texto el lector de pantalla
  // lo anuncia (lectura U3S12).
  formulario.style.display = 'none';
  iconoConfirmacion.style.display = 'block';
  confirmacionDetalle.style.display = 'block';
  filaEnlace.style.display = 'flex';
  // Sin ✓ en el texto: el escudo ya lleva el check y el estado tiene ícono y texto
  confirmacion.textContent = 'Listo. Te escribiremos a ' + campoCorreo.value.trim();

  // El botón "Avisarme", que tenía el foco, quedó oculto. El foco pasa al enlace
  // "Usar otro correo" para que quien usa teclado no vuelva al inicio de la página.
  // El mensaje role="status" se anuncia igual, después del enlace.
  enlaceOtroCorreo.focus();
});

// "Usar otro correo": vuelve al formulario con el correo anterior escrito,
// para corregirlo o reemplazarlo, y pone el foco en el campo.
enlaceOtroCorreo.addEventListener('click', function (e) {
  e.preventDefault();

  // Se vacía el párrafo de estado para que la fila de confirmación no ocupe alto
  // y para que un nuevo envío vuelva a anunciarse
  confirmacion.textContent = '';
  iconoConfirmacion.style.display = 'none';
  confirmacionDetalle.style.display = 'none';
  filaEnlace.style.display = 'none';

  formulario.style.display = 'block';
  campoCorreo.focus();
});
