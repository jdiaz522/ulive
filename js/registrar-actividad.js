// ULive · Registrar actividad (J23): impacto, curso automático y validación (HU-14)

const formularioActividad = document.getElementById('form-actividad');
const selectorCurso = document.getElementById('curso');
const campoActividad = document.getElementById('actividad');
const campoFecha = document.getElementById('fecha-entrega');
const selectorFormula = document.getElementById('evaluacion-formula');

const impactoPendiente = document.getElementById('impacto-pendiente');
const impactoDatos = document.getElementById('impacto-datos');
const impactoPeso = document.getElementById('impacto-peso');
const impactoPesoEtiqueta = document.getElementById('impacto-peso-etiqueta');
const impactoDias = document.getElementById('impacto-dias');
const impactoValor = document.getElementById('impacto-valor');
const impactoPosicion = document.getElementById('impacto-posicion');

// Campos obligatorios con su mensaje de error; la evaluación es opcional (HU-15)
const campoNombre = { campo: campoActividad, error: document.getElementById('error-actividad') };
const campoCurso = { campo: selectorCurso, error: document.getElementById('error-curso') };
const campoDeFecha = { campo: campoFecha, error: document.getElementById('error-fecha') };

// Evaluaciones pendientes de la fórmula: su curso y su peso
const evaluacionesPendientes = {
  'calculo-2-parcial-2': { curso: 'calculo-2', peso: 25 },
  'calculo-2-taller-3': { curso: 'calculo-2', peso: 10 },
  'calculo-2-examen-final': { curso: 'calculo-2', peso: 20 },
  'programacion-3-proyecto-api': { curso: 'programacion-3', peso: 30 },
  'fisica-2-laboratorio-3': { curso: 'fisica-2', peso: 15 }
};

// Vencidas sin entregar: van arriba en Actividades (Cuestionario 4, venció el lun 5 oct)
const VENCIDAS_EJEMPLO = 1;

// Actividades de ejemplo que aún se pueden entregar, con los días que faltan desde hoy (6 oct)
const actividadesEjemplo = [
  { nombre: 'Taller 3', peso: 10, dias: 0 },
  { nombre: 'Foro de patrones', peso: 5, dias: 1 },
  { nombre: 'Informe de laboratorio', peso: 15, dias: 3 },
  { nombre: 'Guía de integrales', peso: 5, dias: 3 },
  { nombre: 'Proyecto API', peso: 30, dias: 24 },
  { nombre: 'Foro de dudas', peso: 5, dias: 6 }
];

// El campo de fecha entrega el texto "aaaa-mm-dd"
const patronFecha = /^\d{4}-\d{2}-\d{2}$/;

// Días que faltan para la fecha elegida, o null si no hay una fecha válida
function leerDias() {
  const texto = campoFecha.value;
  if (!patronFecha.test(texto)) {
    return null;
  }
  const anio = Number(texto[0] + texto[1] + texto[2] + texto[3]);
  const mes = Number(texto[5] + texto[6]);
  const dia = Number(texto[8] + texto[9]);
  return diasDesdeHoy(anio, mes, dia);
}

function marcarError(item, mensaje) {
  item.error.textContent = mensaje;
  item.campo.style.borderColor = '#B3261E';
  item.campo.setAttribute('aria-invalid', 'true');
}

function limpiarError(item) {
  item.error.textContent = '';
  item.campo.style.borderColor = '';
  item.campo.setAttribute('aria-invalid', 'false');
}

// "hoy", "mañana" o "en 3 días"
function textoDias(dias) {
  if (dias === 0) {
    return 'hoy';
  }
  if (dias === 1) {
    return 'mañana';
  }
  return 'en ' + dias + ' días';
}

// Posición en Actividades: después de las vencidas y, entre las demás, por impacto
function posicionEnLista(nueva) {
  const todas = [];
  for (var i = 0; i < actividadesEjemplo.length; i++) {
    todas[todas.length] = actividadesEjemplo[i];
  }
  todas[todas.length] = nueva;
  const ordenadas = ordenarPorImpacto(todas);
  for (var j = 0; j < ordenadas.length; j++) {
    if (ordenadas[j] === nueva) {
      return { lugar: VENCIDAS_EJEMPLO + j + 1, total: VENCIDAS_EJEMPLO + ordenadas.length };
    }
  }
  return null;
}

// Actualiza la caja de impacto; sin fecha válida muestra el criterio.
// Sin evaluación el peso es 0: "sin peso registrado" y queda después de las que pesan.
function actualizarImpacto() {
  const evaluacion = evaluacionesPendientes[selectorFormula.value];
  const dias = leerDias();
  if (dias === null || dias < 0) {
    impactoDatos.style.display = 'none';
    impactoPendiente.style.display = 'inline';
    return;
  }
  var peso = 0;
  if (evaluacion) {
    peso = evaluacion.peso;
    impactoPesoEtiqueta.textContent = 'Peso ';
    impactoPeso.textContent = peso + ' %';
  } else {
    impactoPesoEtiqueta.textContent = '';
    impactoPeso.textContent = 'Sin peso registrado';
  }
  const nueva = { nombre: 'Nueva actividad', peso: peso, dias: dias };
  const posicion = posicionEnLista(nueva);
  impactoDias.textContent = textoDias(dias);
  impactoValor.textContent = formatearDecimal(redondearDecimal(impacto(peso, dias)));
  impactoPosicion.textContent = posicion.lugar + '.º de ' + posicion.total;
  impactoPendiente.style.display = 'none';
  impactoDatos.style.display = 'inline';
}

// Revisa la fecha: vacía, pasada o válida
function revisarFecha() {
  const dias = leerDias();
  if (dias === null) {
    marcarError(campoDeFecha, '⚠ Elige la fecha de entrega.');
    return false;
  }
  if (dias < 0) {
    marcarError(campoDeFecha, '⚠ Esa fecha ya pasó. Elige hoy (6 de octubre) o una fecha posterior.');
    return false;
  }
  limpiarError(campoDeFecha);
  return true;
}

function revisarNombre() {
  if (campoActividad.value.trim() === '') {
    marcarError(campoNombre, '⚠ Escribe el nombre de la actividad.');
    return false;
  }
  limpiarError(campoNombre);
  return true;
}

function revisarCurso() {
  if (selectorCurso.value === '') {
    marcarError(campoCurso, '⚠ Elige el curso de la actividad.');
    return false;
  }
  limpiarError(campoCurso);
  return true;
}

// Al elegir la evaluación: se completa el curso y se recalcula el impacto
selectorFormula.addEventListener('change', function () {
  const evaluacion = evaluacionesPendientes[selectorFormula.value];
  if (evaluacion) {
    selectorCurso.value = evaluacion.curso;
    limpiarError(campoCurso);
  }
  actualizarImpacto();
});

selectorCurso.addEventListener('change', function () {
  if (selectorCurso.value !== '') {
    limpiarError(campoCurso);
  }
});

// Al cambiar la fecha: si ya pasó se avisa enseguida; si está vacía, se espera a guardar
campoFecha.addEventListener('change', function () {
  if (campoFecha.value === '') {
    limpiarError(campoDeFecha);
  } else {
    revisarFecha();
  }
  actualizarImpacto();
});

campoActividad.addEventListener('blur', function () {
  if (campoActividad.value.trim() !== '') {
    limpiarError(campoNombre);
  }
});

// Al guardar: se revisan curso, nombre y fecha; el foco va al primero con error
formularioActividad.addEventListener('submit', function (e) {
  const cursoBien = revisarCurso();
  const nombreBien = revisarNombre();
  const fechaBien = revisarFecha();
  if (cursoBien && nombreBien && fechaBien) {
    return;
  }
  e.preventDefault();
  if (!cursoBien) {
    selectorCurso.focus();
  } else if (!nombreBien) {
    campoActividad.focus();
  } else {
    campoFecha.focus();
  }
});
