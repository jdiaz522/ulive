// ULive · Registrar nota (J13)
// - Valida que la nota sea de 0 a 20, con hasta dos decimales y coma o punto
//   (al cambiar el campo y al guardar). La convierte con textoANota (calculos.js).
// - Antes de guardar, muestra cómo cambian el promedio y la nota necesaria (role="status").
// - Si la nota es válida, el formulario se envía a curso.html (su action).

const formularioNota = document.getElementById('form-nota');
const selectorEvaluacion = document.getElementById('evaluacion');
const campoNota = document.getElementById('nota');
const errorNota = document.getElementById('error-nota');
const promedioConNota = document.getElementById('promedio-con-nota');
const evaluadoConNota = document.getElementById('evaluado-con-nota');
const necesariaTitulo = document.getElementById('necesaria-titulo');

// Hasta tres evaluaciones que quedan, cada una en su span, y sus separadores
const espaciosQuedan = [
  document.getElementById('queda-1'),
  document.getElementById('queda-2'),
  document.getElementById('queda-3')
];
const separador1 = document.getElementById('separador-1');
const separador2 = document.getElementById('separador-2');

// Evaluaciones de Cálculo II (las mismas que en curso.html)
const evaluacionesCalculo = [
  { codigo: 'practica-1', nombre: 'Práctica 1', nota: 12, peso: 15 },
  { codigo: 'parcial-1', nombre: 'Parcial 1', nota: 14, peso: 20 },
  { codigo: 'taller-2', nombre: 'Taller 2', nota: 16, peso: 10 },
  { codigo: 'parcial-2', nombre: 'Parcial 2', nota: null, peso: 25 },
  { codigo: 'taller-3', nombre: 'Taller 3', nota: null, peso: 10 },
  { codigo: 'examen-final', nombre: 'el examen final', nota: null, peso: 20 }
];

// Devuelve la nota como número, o null si no es válida
function leerNota() {
  return textoANota(campoNota.value.trim());
}

function marcarError() {
  errorNota.textContent = '⚠ Escribe una nota de 0 a 20, con hasta dos decimales (15,5 o 15.75)';
  campoNota.style.border = '2px solid #B3261E';
  campoNota.setAttribute('aria-invalid', 'true');
}

function limpiarError() {
  errorNota.textContent = '';
  campoNota.style.border = '';
  campoNota.setAttribute('aria-invalid', 'false');
}

// Escribe "Taller 3 (10 %) y el examen final (20 %)" en los spans de la caja
function escribirRestantes(restantes) {
  for (var i = 0; i < espaciosQuedan.length; i++) {
    if (i < restantes.length) {
      espaciosQuedan[i].textContent = restantes[i].nombre + ' (' + restantes[i].peso + ' %)';
      espaciosQuedan[i].style.display = '';
    } else {
      espaciosQuedan[i].textContent = '';
      espaciosQuedan[i].style.display = 'none';
    }
  }
  // Dos evaluaciones: "A y B". Tres: "A, B y C".
  separador1.textContent = '';
  separador2.textContent = '';
  if (restantes.length === 2) {
    separador1.textContent = ' y ';
  }
  if (restantes.length === 3) {
    separador1.textContent = ', ';
    separador2.textContent = ' y ';
  }
}

// Frase de la nota necesaria según el caso
function textoNecesaria(necesaria) {
  if (necesaria <= 0) {
    return 'Con esta nota ya alcanzas 13, aunque saques 0 en lo que falta';
  }
  if (necesaria > REGLAS_UPC.notaMaxima) {
    return 'Con esta nota ya no alcanzarías 13: necesitarías más de 20 en lo que falta';
  }
  return 'Necesitarás ' + formatearDecimal(redondearArribaDecimal(necesaria)) + ' en lo que falta para llegar a 13';
}

// Actualiza la vista previa con la evaluación elegida y la nota escrita
function actualizarVistaPrevia() {
  const nota = leerNota();
  if (nota === null) {
    // Sin una nota válida se muestra la situación de hoy (el código vacío no elige
    // ninguna evaluación: solo sirve para obtener las que quedan y la nota necesaria actual)
    const hoy = simularEvaluacion(evaluacionesCalculo, '', 0);
    promedioConNota.textContent = '—';
    evaluadoConNota.textContent = 'Escribe la nota para verlo';
    necesariaTitulo.textContent = 'Hoy necesitas ' + formatearDecimal(redondearArribaDecimal(hoy.necesariaActual)) + ' en lo que falta para llegar a 13';
    escribirRestantes(hoy.restantes);
    return;
  }
  const escenario = simularEvaluacion(evaluacionesCalculo, selectorEvaluacion.value, nota);
  promedioConNota.textContent = formatearDecimal(redondearDecimal(escenario.proyectado));
  evaluadoConNota.textContent = escenario.pesoProyectado + ' % evaluado';
  necesariaTitulo.textContent = textoNecesaria(escenario.necesariaNueva);
  escribirRestantes(escenario.restantes);
}

campoNota.addEventListener('change', function () {
  if (campoNota.value.trim() !== '' && leerNota() === null) {
    marcarError();
  } else {
    limpiarError();
  }
  actualizarVistaPrevia();
});

selectorEvaluacion.addEventListener('change', function () {
  actualizarVistaPrevia();
});

// Al guardar: si la nota no es válida, no se envía y el foco vuelve al campo
formularioNota.addEventListener('submit', function (e) {
  if (leerNota() === null) {
    e.preventDefault();
    marcarError();
    campoNota.focus();
  }
});
