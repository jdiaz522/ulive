// ULive · Evaluaciones (J3, J15)
// Filtros: al elegir una opción (change), recorre las filas y oculta o muestra cada una
// según su estado. El conteo se anuncia en un párrafo con role="status".

const conteoEvaluaciones = document.getElementById('conteo-evaluaciones');

// Filas de la tabla y si ya tienen nota
const filasEvaluaciones = [
  { fila: document.getElementById('eval-parcial-2'), calificada: false },
  { fila: document.getElementById('eval-taller-2'), calificada: true },
  { fila: document.getElementById('eval-parcial-1'), calificada: true },
  { fila: document.getElementById('eval-practica-1'), calificada: true },
  { fila: document.getElementById('eval-quiz'), calificada: true },
  { fila: document.getElementById('eval-laboratorio-2'), calificada: true },
  { fila: document.getElementById('eval-proyecto-api'), calificada: false }
];

const opcionesFiltro = [
  document.getElementById('filtro-todas'),
  document.getElementById('filtro-pendientes'),
  document.getElementById('filtro-calificadas')
];

// Devuelve true si la fila se muestra con el filtro elegido
function seMuestra(item, filtro) {
  switch (filtro) {
    case 'pendientes':
      return !item.calificada;
    case 'calificadas':
      return item.calificada;
    default:
      return true;
  }
}

// Texto del conteo: "7 evaluaciones", "2 evaluaciones pendientes", "1 evaluación calificada"
function textoConteo(cantidad, filtro) {
  var plural = 's';
  if (cantidad === 1) {
    plural = '';
  }
  var texto = cantidad + ' evaluación';
  if (cantidad !== 1) {
    texto = cantidad + ' evaluaciones';
  }
  if (filtro === 'pendientes') {
    texto = texto + ' pendiente' + plural;
  }
  if (filtro === 'calificadas') {
    texto = texto + ' calificada' + plural;
  }
  return texto;
}

// Aplica el filtro: '' devuelve la fila a lo que diga el CSS (fila de tabla en web, tarjeta en móvil)
function aplicarFiltro(filtro) {
  var visibles = 0;
  for (var i = 0; i < filasEvaluaciones.length; i++) {
    if (seMuestra(filasEvaluaciones[i], filtro)) {
      filasEvaluaciones[i].fila.style.display = '';
      visibles = visibles + 1;
    } else {
      filasEvaluaciones[i].fila.style.display = 'none';
    }
  }
  conteoEvaluaciones.textContent = textoConteo(visibles, filtro);
}

for (var j = 0; j < opcionesFiltro.length; j++) {
  const opcion = opcionesFiltro[j];
  opcion.addEventListener('change', function () {
    aplicarFiltro(opcion.value);
  });
}
