// ULive · Bienvenida (J9): universidad con sus reglas (HU-31) y ciclo actual

const formularioBienvenida = document.getElementById('form-bienvenida');
const selectorUniversidad = document.getElementById('universidad');
const reglasManuales = document.getElementById('reglas-manuales');

// Límite de faltas: número entero de 1 a 3 cifras (de 1 a 100 se revisa aparte)
const patronPorcentaje = /^\d{1,3}$/;

// Cada campo con su mensaje de error y la función que dice si su valor es válido
const campoCiclo = {
  campo: document.getElementById('ciclo'),
  error: document.getElementById('error-ciclo'),
  mensaje: '⚠ Elige tu ciclo actual.',
  valido: function (texto) {
    return texto !== '';
  }
};
const campoLimite = {
  campo: document.getElementById('limite-faltas'),
  error: document.getElementById('error-limite'),
  mensaje: '⚠ Escribe el límite de faltas como un número entero de 1 a 100.',
  valido: function (texto) {
    return patronPorcentaje.test(texto) && Number(texto) >= 1 && Number(texto) <= 100;
  }
};
const campoAprobatoria = {
  campo: document.getElementById('nota-aprobatoria'),
  error: document.getElementById('error-aprobatoria'),
  mensaje: '⚠ Escribe la nota aprobatoria de 0 a 20, con hasta dos decimales (11 o 10,5).',
  valido: function (texto) {
    return textoANota(texto) !== null;
  }
};

// Marca un campo con error: texto junto al campo, borde de riesgo y aria-invalid
function marcarError(item) {
  item.error.textContent = item.mensaje;
  item.campo.style.borderColor = '#B3261E';
  item.campo.setAttribute('aria-invalid', 'true');
}

// Quita el error y devuelve el borde definido en el CSS
function limpiarError(item) {
  item.error.textContent = '';
  item.campo.style.borderColor = '';
  item.campo.setAttribute('aria-invalid', 'false');
}

// Devuelve true si el campo tiene un valor válido
function revisarCampo(item) {
  if (!item.valido(item.campo.value.trim())) {
    marcarError(item);
    return false;
  }
  limpiarError(item);
  return true;
}

// Campos que se revisan: las reglas manuales solo si la universidad no está en la lista
function camposActivos() {
  if (selectorUniversidad.value === 'otra') {
    return [campoLimite, campoAprobatoria, campoCiclo];
  }
  return [campoCiclo];
}

// Muestra u oculta los campos de reglas según la universidad elegida
function actualizarUniversidad() {
  if (selectorUniversidad.value === 'otra') {
    reglasManuales.style.display = 'block';
  } else {
    reglasManuales.style.display = 'none';
    limpiarError(campoLimite);
    limpiarError(campoAprobatoria);
  }
}

// Al cargar, por si el navegador recuerda la opción al volver atrás
actualizarUniversidad();

selectorUniversidad.addEventListener('change', function () {
  actualizarUniversidad();
});

// El ciclo se revisa al elegirlo; las reglas, al salir del campo si ya tienen texto
campoCiclo.campo.addEventListener('change', function () {
  revisarCampo(campoCiclo);
});
const camposReglas = [campoLimite, campoAprobatoria];
for (var i = 0; i < camposReglas.length; i++) {
  const item = camposReglas[i];
  item.campo.addEventListener('blur', function () {
    if (item.campo.value.trim() !== '') {
      revisarCampo(item);
    }
  });
}

// Al continuar: si algún campo no es válido, no se envía y el foco va al primero
formularioBienvenida.addEventListener('submit', function (e) {
  const campos = camposActivos();
  var primerError = null;
  for (var i = 0; i < campos.length; i++) {
    if (!revisarCampo(campos[i]) && primerError === null) {
      primerError = campos[i];
    }
  }
  if (primerError !== null) {
    e.preventDefault();
    primerError.campo.focus();
  }
});
