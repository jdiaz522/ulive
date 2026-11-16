// ULive · Actividades (J7, J20) y HU-17 (marcar una actividad como entregada)
// - Filtros: al elegir una opción (change), recorre las filas y oculta o muestra cada una
//   según su estado. El conteo se anuncia en un párrafo con role="status".
// - Casilla "Entregada" (change, .checked): actualiza "entregada" en el array, cambia el texto
//   del estado ("✓ Entregada" o el estado anterior) y vuelve a aplicar el filtro elegido.
// - Una actividad vencida sin marcar muestra "Vencida" (riesgo, ⚠ y texto). Va arriba en el HTML.
// Pendientes = todo lo que aún no se entrega ("Pendiente", "En curso" y "Vencida").
// Limitación: la marca dura mientras la página está abierta (sin almacenamiento local).

const conteoActividades = document.getElementById('conteo-actividades');

// Colores de la tabla de tokens
const COLOR_SEGURO = '#1B7F4B';

// Cada actividad: su fila, su casilla, el estado escrito en el HTML y la fecha de vencimiento
// (año, mes de 1 a 12, día) para saber si ya venció respecto de "hoy" (HOY_PROTOTIPO).
function actividad(id, estadoInicial, anio, mes, dia) {
  return {
    fila: document.getElementById('act-' + id),
    casilla: document.getElementById('entregada-' + id),
    estado: document.getElementById('estado-' + id),
    texto: document.getElementById('estado-texto-' + id) || document.getElementById('estado-' + id),
    icono: document.getElementById('icono-vencida-' + id),
    estadoInicial: estadoInicial,
    vencida: diasDesdeHoy(anio, mes, dia) < 0,
    entregada: false
  };
}

// En el mismo orden que la tabla: primero las vencidas y después por impacto
const filasActividades = [
  actividad('cuestionario-4', 'Vencida', 2026, 10, 5),
  actividad('taller-3', 'Pendiente', 2026, 10, 6),
  actividad('foro-patrones', 'Pendiente', 2026, 10, 7),
  actividad('informe-laboratorio', 'Pendiente', 2026, 10, 9),
  actividad('guia-integrales', 'En curso', 2026, 10, 9),
  actividad('proyecto-api', 'En curso', 2026, 10, 30),
  actividad('foro-dudas', 'Pendiente', 2026, 10, 12)
];

const opcionesActividades = [
  document.getElementById('filtro-todas'),
  document.getElementById('filtro-pendientes'),
  document.getElementById('filtro-entregadas')
];

function actividadVisible(item, filtro) {
  switch (filtro) {
    case 'pendientes':
      return !item.entregada;
    case 'entregadas':
      return item.entregada;
    default:
      return true;
  }
}

// "7 actividades", "1 actividad pendiente", "No hay actividades entregadas"
function textoConteoActividades(cantidad, filtro) {
  if (cantidad === 0 && filtro === 'entregadas') {
    return 'No hay actividades entregadas';
  }
  if (cantidad === 0 && filtro === 'pendientes') {
    return 'No hay actividades pendientes';
  }
  if (cantidad === 0) {
    return 'No hay actividades';
  }
  var plural = 's';
  if (cantidad === 1) {
    plural = '';
  }
  var texto = cantidad + ' actividad';
  if (cantidad !== 1) {
    texto = cantidad + ' actividades';
  }
  if (filtro === 'pendientes') {
    texto = texto + ' pendiente' + plural;
  }
  if (filtro === 'entregadas') {
    texto = texto + ' entregada' + plural;
  }
  return texto;
}

// Filtro elegido en este momento
function filtroElegido() {
  for (var i = 0; i < opcionesActividades.length; i++) {
    if (opcionesActividades[i].checked) {
      return opcionesActividades[i].value;
    }
  }
  return 'todas';
}

function filtrarActividades(filtro) {
  var visibles = 0;
  for (var i = 0; i < filasActividades.length; i++) {
    if (actividadVisible(filasActividades[i], filtro)) {
      filasActividades[i].fila.style.display = '';
      visibles = visibles + 1;
    } else {
      filasActividades[i].fila.style.display = 'none';
    }
  }
  conteoActividades.textContent = textoConteoActividades(visibles, filtro);
}

// Escribe el estado de una fila: "✓ Entregada", "Vencida" o el estado del HTML
function pintarEstado(item) {
  if (item.entregada) {
    item.texto.textContent = '✓ Entregada';
    item.estado.style.color = COLOR_SEGURO;
    item.estado.style.borderColor = COLOR_SEGURO;
    if (item.icono) {
      item.icono.style.display = 'none';
    }
    return;
  }
  if (item.vencida) {
    item.texto.textContent = 'Vencida';
  } else {
    item.texto.textContent = item.estadoInicial;
  }
  item.estado.style.color = '';
  item.estado.style.borderColor = '';
  if (item.icono) {
    item.icono.style.display = '';
  }
}

function enfocarDespuesDe(item) {
  var paso = false;
  for (var i = 0; i < filasActividades.length; i++) {
    if (filasActividades[i] === item) {
      paso = true;
    } else if (paso && filasActividades[i].fila.style.display !== 'none') {
      filasActividades[i].casilla.focus();
      return;
    }
  }
  for (var m = 0; m < opcionesActividades.length; m++) {
    if (opcionesActividades[m].checked) {
      opcionesActividades[m].focus();
    }
  }
}

for (var j = 0; j < opcionesActividades.length; j++) {
  const opcion = opcionesActividades[j];
  opcion.addEventListener('change', function () {
    filtrarActividades(opcion.value);
  });
}

for (var k = 0; k < filasActividades.length; k++) {
  const item = filasActividades[k];
  item.casilla.addEventListener('change', function () {
    item.entregada = item.casilla.checked;
    pintarEstado(item);
    filtrarActividades(filtroElegido());
    // Si el filtro ocultó la fila, el foco pasa a la siguiente casilla visible
    // o, si no hay, al filtro elegido, para no perderlo
    if (item.fila.style.display === 'none') {
      enfocarDespuesDe(item);
    }
  });
  // Si el navegador recuerda la casilla al volver atrás, el estado coincide con ella
  item.entregada = item.casilla.checked;
  pintarEstado(item);
}
filtrarActividades(filtroElegido());
