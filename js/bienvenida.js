// ULive · Bienvenida (J9)
// Universidad y carrera son datos fijos (solo está configurada la UPC):
// solo se comprueba que el ciclo tenga valor antes de continuar.
// Si todo está completo, el formulario se envía a inicio.html (su action).

const formularioBienvenida = document.getElementById('form-bienvenida');

// Cada campo con su mensaje de error y el texto que se muestra si está vacío
const camposBienvenida = [
  { campo: document.getElementById('ciclo'), error: document.getElementById('error-ciclo'), mensaje: '⚠ Elige tu ciclo actual.' }
];

// Marca un campo con error: texto junto al campo, borde de riesgo y aria-invalid
function marcarError(item) {
  item.error.textContent = item.mensaje;
  item.campo.style.border = '2px solid #B3261E';
  item.campo.setAttribute('aria-invalid', 'true');
}

// Quita el error y devuelve el borde definido en el CSS
function limpiarError(item) {
  item.error.textContent = '';
  item.campo.style.border = '';
  item.campo.setAttribute('aria-invalid', 'false');
}

// Devuelve true si el campo tiene un valor elegido
function revisarCampo(item) {
  if (item.campo.value === '') {
    marcarError(item);
    return false;
  }
  limpiarError(item);
  return true;
}

// Al elegir una opción se quita el error de ese campo
for (var i = 0; i < camposBienvenida.length; i++) {
  const item = camposBienvenida[i];
  item.campo.addEventListener('change', function () {
    revisarCampo(item);
  });
}

// Al continuar: si falta algún valor, no se envía y el foco va al primer campo vacío
formularioBienvenida.addEventListener('submit', function (e) {
  var primerError = null;
  for (var i = 0; i < camposBienvenida.length; i++) {
    if (!revisarCampo(camposBienvenida[i]) && primerError === null) {
      primerError = camposBienvenida[i];
    }
  }
  if (primerError !== null) {
    e.preventDefault();
    primerError.campo.focus();
  }
});
