// ULive · Simulador de matrícula (J22): suma los créditos marcados y los compara con el tope

const formularioMatricula = document.getElementById('form-matricula');
const grupoCursos = document.getElementById('grupo-cursos');
const errorMatricula = document.getElementById('error-matricula');
const creditosSeleccionados = document.getElementById('creditos-seleccionados');
const topeValor = document.getElementById('tope-matricula');
const topeNota = document.getElementById('tope-nota');
const promedioValor = document.getElementById('promedio-matricula');

const cajaMatricula = document.getElementById('caja-matricula');
const matriculaTitulo = document.getElementById('matricula-titulo');
const matriculaDetalle = document.getElementById('matricula-detalle');
const iconosMatricula = {
  seguro: document.getElementById('icono-mat-seguro'),
  riesgo: document.getElementById('icono-mat-riesgo'),
  info: document.getElementById('icono-mat-info')
};

// Colores de cada tono (tabla de tokens); "info" es el primario
const coloresMatricula = { seguro: '#1B7F4B', riesgo: '#B3261E', info: '#15497A' };

// Promedio proyectado del ciclo 2026-2 (el mismo de Inicio)
const PROMEDIO_PROYECTADO = 15.2;

// Cursos que se pueden elegir (J22); Investigación de Operaciones no está: falta Estadística II
const cursosMatricula = [
  { campo: document.getElementById('curso-calculo-3'), creditos: 5 },
  { campo: document.getElementById('curso-fisica-3'), creditos: 4 },
  { campo: document.getElementById('curso-base-datos'), creditos: 5 },
  { campo: document.getElementById('curso-programacion-4'), creditos: 5 },
  { campo: document.getElementById('curso-etica'), creditos: 3 },
  { campo: document.getElementById('curso-diseno-experimentos'), creditos: 4 }
];

const tope = topeCreditos(PROMEDIO_PROYECTADO);

// Suma de créditos de las casillas marcadas
function creditosMarcados() {
  const cursos = [];
  for (var i = 0; i < cursosMatricula.length; i++) {
    cursos[i] = { creditos: cursosMatricula[i].creditos, marcado: cursosMatricula[i].campo.checked };
  }
  return sumarCreditos(cursos);
}

// "1 crédito", "5 créditos"
function textoCreditos(cantidad) {
  if (cantidad === 1) {
    return '1 crédito';
  }
  return cantidad + ' créditos';
}

// Pinta la caja con un tono: borde, color del título y su ícono
function pintarCajaMatricula(tono) {
  iconosMatricula.seguro.style.display = 'none';
  iconosMatricula.riesgo.style.display = 'none';
  iconosMatricula.info.style.display = 'none';
  iconosMatricula[tono].style.display = 'block';
  cajaMatricula.style.borderColor = coloresMatricula[tono];
  matriculaTitulo.style.color = coloresMatricula[tono];
}

// Quita el error de la lista
function limpiarErrorMatricula() {
  errorMatricula.textContent = '';
  grupoCursos.style.borderColor = '';
  for (var i = 0; i < cursosMatricula.length; i++) {
    cursosMatricula[i].campo.setAttribute('aria-invalid', 'false');
  }
}

// Marca el error: texto junto a la lista, borde de riesgo y aria-invalid en las casillas
function marcarErrorMatricula(mensaje) {
  errorMatricula.textContent = mensaje;
  grupoCursos.style.borderColor = '#B3261E';
  for (var i = 0; i < cursosMatricula.length; i++) {
    cursosMatricula[i].campo.setAttribute('aria-invalid', 'true');
  }
}

// Recalcula la suma, la compara con el tope y actualiza la caja
function actualizarMatricula() {
  const suma = creditosMarcados();

  if (tope === SIN_DATO) {
    creditosSeleccionados.textContent = textoCreditos(suma);
    matriculaTitulo.textContent = 'No podemos comparar tu selección con un tope';
    matriculaDetalle.textContent = 'La regla de tope para promedios de 13 a 15 no está configurada. Seleccionados: ' + textoCreditos(suma) + '.';
    pintarCajaMatricula('info');
    return;
  }

  creditosSeleccionados.textContent = suma + ' de ' + textoCreditos(tope);
  const libres = tope - suma;
  if (suma === 0) {
    matriculaTitulo.textContent = 'Aún no eliges cursos';
    matriculaDetalle.textContent = 'Marca los cursos que quieres llevar. Tu tope es de ' + textoCreditos(tope) + '.';
    pintarCajaMatricula('info');
  } else if (libres >= 0) {
    matriculaTitulo.textContent = 'Tu selección cabe en tu tope';
    if (libres === 0) {
      matriculaDetalle.textContent = 'No te quedan créditos libres.';
    } else if (libres === 1) {
      matriculaDetalle.textContent = 'Te queda 1 crédito libre.';
    } else {
      matriculaDetalle.textContent = 'Te quedan ' + libres + ' créditos libres.';
    }
    pintarCajaMatricula('seguro');
  } else {
    matriculaTitulo.textContent = '⚠ Tu selección supera tu tope';
    matriculaDetalle.textContent = 'Te pasas por ' + textoCreditos(-libres) + '. Quita cursos por al menos ' + textoCreditos(-libres) + ' para poder matricularlos.';
    pintarCajaMatricula('riesgo');
  }
}

// Al cargar: promedio y tope calculados
promedioValor.textContent = formatearDecimal(PROMEDIO_PROYECTADO);
if (tope === SIN_DATO) {
  topeValor.textContent = 'Sin dato';
  topeNota.textContent = 'regla no configurada';
} else {
  topeValor.textContent = tope;
}
actualizarMatricula();

// Al marcar o desmarcar un curso
for (var i = 0; i < cursosMatricula.length; i++) {
  cursosMatricula[i].campo.addEventListener('change', function () {
    limpiarErrorMatricula();
    actualizarMatricula();
  });
}

// Al guardar
formularioMatricula.addEventListener('submit', function (e) {
  const suma = creditosMarcados();
  if (suma === 0) {
    e.preventDefault();
    marcarErrorMatricula('⚠ Elige al menos un curso para guardar la simulación.');
    cursosMatricula[0].campo.focus();
    return;
  }
  if (tope !== SIN_DATO && suma > tope) {
    e.preventDefault();
    marcarErrorMatricula('⚠ Tu selección supera tu tope de ' + textoCreditos(tope) + '. Quita cursos por al menos ' + textoCreditos(suma - tope) + '.');
    cursosMatricula[0].campo.focus();
  }
});
