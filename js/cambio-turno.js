// ULive · Cambio de turno (J21): choques con la semana y faltas que usaría la clase que choca

const formularioTurno = document.getElementById('form-turno');
const selectorTurno = document.getElementById('nuevo-turno');
const errorTurno = document.getElementById('error-turno');
const turnoTitulo = document.getElementById('turno-titulo');
const turnoDetalle = document.getElementById('turno-detalle');
const bloqueChoques = document.getElementById('bloque-choques');
const bloqueEspacios = document.getElementById('bloque-espacios');

const choqueFaltas = document.getElementById('choque-faltas');
const estadoChoque = document.getElementById('estado-choque');
const estadoChoqueTexto = document.getElementById('estado-choque-texto');
const iconosChoque = {
  seguro: document.getElementById('icono-choque-seguro'),
  atencion: document.getElementById('icono-choque-atencion'),
  riesgo: document.getElementById('icono-choque-riesgo')
};

// Colores de cada tono (tabla de tokens)
const coloresTurno = { seguro: '#1B7F4B', atencion: '#8A5A00', riesgo: '#B3261E' };

// Física II: 24 sesiones, 0 faltas usadas (J11, J18). La clase del vie 9 oct choca con el turno.
const SESIONES_FISICA = 24;
const USADAS_FISICA = 0;

// Turnos que se pueden elegir y lo que choca con cada uno
const turnos = {
  'jue-vie-manana': { clasesQueChocan: 1, entregasQueChocan: 1 }
};

// Escribe las faltas que usaría la clase que choca y pinta su indicador de estado
function actualizarChoqueFaltas() {
  const permitidas = faltasPermitidas(SESIONES_FISICA);
  const restantes = faltasRestantes(permitidas, USADAS_FISICA + 1);
  const estado = estadoFaltas(restantes);
  var quedarian = 'te quedarían ' + restantes;
  if (restantes === 1) {
    quedarian = 'te quedaría 1';
  }
  choqueFaltas.textContent = 'usarías 1 de tus ' + permitidas + ' faltas (' + quedarian + ')';
  estadoChoqueTexto.textContent = estado.etiqueta;
  estadoChoque.style.color = coloresTurno[estado.tono];
  iconosChoque.seguro.style.display = 'none';
  iconosChoque.atencion.style.display = 'none';
  iconosChoque.riesgo.style.display = 'none';
  iconosChoque[estado.tono].style.display = 'block';
}

function marcarErrorTurno(mensaje) {
  errorTurno.textContent = mensaje;
  selectorTurno.style.borderColor = '#B3261E';
  selectorTurno.setAttribute('aria-invalid', 'true');
}

function limpiarErrorTurno() {
  errorTurno.textContent = '';
  selectorTurno.style.borderColor = '';
  selectorTurno.setAttribute('aria-invalid', 'false');
}

// Muestra u oculta los bloques según el turno elegido y actualiza el resumen
function actualizarTurno() {
  const turno = turnos[selectorTurno.value];
  if (!turno) {
    bloqueChoques.style.display = '';
    bloqueEspacios.style.display = '';
    turnoTitulo.textContent = 'Elige tu nuevo turno para ver qué choca con tu semana';
    turnoDetalle.textContent = 'ULive compara el turno con tus clases y entregas de la semana.';
    return;
  }
  limpiarErrorTurno();
  actualizarChoqueFaltas();
  const total = turno.clasesQueChocan + turno.entregasQueChocan;
  turnoTitulo.textContent = 'Con este turno, ' + total + ' cosas chocan con tu semana';
  turnoDetalle.textContent = turno.clasesQueChocan + ' clase de Física II y ' + turno.entregasQueChocan + ' entrega. Elige un espacio libre para adelantar el informe.';
  bloqueChoques.style.display = 'block';
  bloqueEspacios.style.display = 'block';
}

selectorTurno.addEventListener('change', function () {
  actualizarTurno();
});

// Al guardar: el turno es obligatorio
formularioTurno.addEventListener('submit', function (e) {
  if (selectorTurno.value === '') {
    e.preventDefault();
    marcarErrorTurno('⚠ Elige tu nuevo turno para guardar el plan.');
    selectorTurno.focus();
  }
});

// Si el navegador recuerda el turno al volver atrás, los bloques se muestran de nuevo
actualizarTurno();
