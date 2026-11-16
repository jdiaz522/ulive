// ULive · Simulación de nota (J4, J16) y su resultado (J5, J17)
// - Precarga el escenario del mockup (15 en el Parcial 2).
// - Al cambiar la evaluación o la nota, recalcula el resultado estimado (role="status").
// - Al enviar: si la nota no es válida, error junto al campo y foco. Si es válida,
//   preventDefault() (no hay servidor), se oculta el formulario y se muestra el bloque de
//   resultado con lo que escribió el usuario; el anuncio con role="status" lo resume.
// - "Nueva simulación" vuelve al formulario con los valores que tenía.

const formularioSimulacion = document.getElementById('form-simulacion');
const selectorSimulado = document.getElementById('evaluacion-simulada');
const pesoSimuladoValor = document.getElementById('peso-simulado-valor');
const campoEsperada = document.getElementById('nota-esperada');
const errorEsperada = document.getElementById('error-esperada');
const resultadoNecesaria = document.getElementById('resultado-necesaria');
const resultadoDetalle = document.getElementById('resultado-detalle');

// Los dos estados de la pantalla y el anuncio
const vistaFormulario = document.getElementById('vista-formulario');
const vistaResultado = document.getElementById('vista-resultado');
const anuncioResultado = document.getElementById('anuncio-resultado');
const botonNueva = document.getElementById('boton-nueva');

// Valores del bloque de resultado
const resultado = {
  nota: document.getElementById('r-nota'),
  evaluacion: document.getElementById('r-evaluacion'),
  proyectado: document.getElementById('r-proyectado'),
  necesariaTitulo: document.getElementById('r-necesaria-titulo'),
  necesaria: document.getElementById('r-necesaria'),
  peso: document.getElementById('r-peso'),
  nombre: document.getElementById('r-nombre'),
  escenarioNombre: document.getElementById('r-escenario-nombre'),
  escenarioPeso: document.getElementById('r-escenario-peso'),
  escenarioNota: document.getElementById('r-escenario-nota'),
  evaluado: document.getElementById('r-evaluado'),
  proyectadoDesglose: document.getElementById('r-proyectado-desglose'),
  contexto: document.getElementById('r-contexto'),
  restante: document.getElementById('r-restante')
};

// Un indicador por tono en cada estado de la pantalla; se muestra solo el que corresponde
function indicadores(prefijo) {
  return {
    seguro: { caja: document.getElementById(prefijo + 'estado-seguro'), texto: document.getElementById(prefijo + 'texto-estado-seguro') },
    atencion: { caja: document.getElementById(prefijo + 'estado-atencion'), texto: document.getElementById(prefijo + 'texto-estado-atencion') },
    riesgo: { caja: document.getElementById(prefijo + 'estado-riesgo'), texto: document.getElementById(prefijo + 'texto-estado-riesgo') }
  };
}
const indicadoresEstimado = indicadores('');
const indicadoresResultado = indicadores('r-');

// Evaluaciones de Cálculo II (las mismas que en curso.html)
const evaluacionesSimulacion = [
  { codigo: 'practica-1', nombre: 'Práctica 1', articulo: 'la', nota: 12, peso: 15 },
  { codigo: 'parcial-1', nombre: 'Parcial 1', articulo: 'el', nota: 14, peso: 20 },
  { codigo: 'taller-2', nombre: 'Taller 2', articulo: 'el', nota: 16, peso: 10 },
  { codigo: 'parcial-2', nombre: 'Parcial 2', articulo: 'el', nota: null, peso: 25 },
  { codigo: 'taller-3', nombre: 'Taller 3', articulo: 'el', nota: null, peso: 10 },
  { codigo: 'examen-final', nombre: 'Examen final', articulo: 'el', nota: null, peso: 20 }
];

// Nota de 0 a 20 con hasta dos decimales, con coma o punto (textoANota en calculos.js)
function leerEsperada() {
  return textoANota(campoEsperada.value.trim());
}

// Nota escrita como la ve el usuario: con coma y solo los decimales que tiene (15,5 · 15,75 · 15)
function textoNotaUsuario(nota) {
  return nota.toLocaleString('es', { maximumFractionDigits: 2 });
}

function marcarError() {
  errorEsperada.textContent = '⚠ Escribe una nota de 0 a 20, con hasta dos decimales (15,5 o 15.75)';
  campoEsperada.style.border = '2px solid #B3261E';
  campoEsperada.setAttribute('aria-invalid', 'true');
}

function limpiarError() {
  errorEsperada.textContent = '';
  campoEsperada.style.border = '';
  campoEsperada.setAttribute('aria-invalid', 'false');
}

// Datos de la evaluación elegida
function buscarEvaluacion(codigo) {
  for (var i = 0; i < evaluacionesSimulacion.length; i++) {
    if (evaluacionesSimulacion[i].codigo === codigo) {
      return evaluacionesSimulacion[i];
    }
  }
  return null;
}

// "el Parcial 2", "el examen final"
function conArticulo(evaluacion) {
  if (evaluacion.codigo === 'examen-final') {
    return 'el examen final';
  }
  return evaluacion.articulo + ' ' + evaluacion.nombre;
}

// Muestra solo el indicador del tono del estado, con su texto
function mostrarEstado(grupo, estado) {
  const tonos = ['seguro', 'atencion', 'riesgo'];
  for (var i = 0; i < tonos.length; i++) {
    if (tonos[i] === estado.tono) {
      grupo[tonos[i]].caja.style.display = 'flex';
      grupo[tonos[i]].texto.textContent = estado.etiqueta;
    } else {
      grupo[tonos[i]].caja.style.display = 'none';
    }
  }
}

function textoNecesaria(necesaria) {
  if (necesaria <= 0) {
    return 'Ya alcanzarías 13, aunque saques 0 en lo que falta';
  }
  if (necesaria > REGLAS_UPC.notaMaxima) {
    return 'Ya no alcanzarías 13: necesitarías más de 20 en lo que falta';
  }
  return 'Necesitas ' + formatearDecimal(redondearArribaDecimal(necesaria)) + ' en promedio en lo que falta';
}

// Valor corto de la nota necesaria para la tarjeta ("10,2", "0,0" o "más de 20")
function valorNecesaria(necesaria) {
  if (necesaria <= 0) {
    return '0,0';
  }
  if (necesaria > REGLAS_UPC.notaMaxima) {
    return 'más de 20';
  }
  return formatearDecimal(redondearArribaDecimal(necesaria));
}

// Estado 1: resultado estimado mientras se edita
function actualizarEstimado() {
  const evaluacion = buscarEvaluacion(selectorSimulado.value);
  pesoSimuladoValor.textContent = evaluacion.peso + ' %';
  const nota = leerEsperada();
  if (nota === null) {
    resultadoNecesaria.textContent = 'Escribe una nota de 0 a 20 para ver el resultado';
    resultadoDetalle.textContent = '';
    mostrarEstado(indicadoresEstimado, { tono: 'ninguno', etiqueta: '' });
    return;
  }
  const escenario = simularEvaluacion(evaluacionesSimulacion, evaluacion.codigo, nota);
  resultadoNecesaria.textContent = textoNecesaria(escenario.necesariaNueva);
  resultadoDetalle.textContent = 'Con ' + textoNotaUsuario(nota) + ' en ' + conArticulo(evaluacion) + ', tu promedio proyectado sería ' + formatearDecimal(redondearDecimal(escenario.proyectado)) + '.';
  mostrarEstado(indicadoresEstimado, escenario.estado);
}

// Estado 2: llena el bloque de resultado con el escenario del usuario
function llenarResultado(evaluacion, nota) {
  const escenario = simularEvaluacion(evaluacionesSimulacion, evaluacion.codigo, nota);
  const proyectado = formatearDecimal(redondearDecimal(escenario.proyectado));
  resultado.nota.textContent = textoNotaUsuario(nota);
  resultado.evaluacion.textContent = conArticulo(evaluacion);
  resultado.proyectado.textContent = proyectado;
  resultado.necesariaTitulo.textContent = textoNecesaria(escenario.necesariaNueva);
  resultado.necesaria.textContent = valorNecesaria(escenario.necesariaNueva);
  resultado.peso.textContent = evaluacion.peso + ' %';
  resultado.nombre.textContent = evaluacion.nombre;
  resultado.escenarioNombre.textContent = evaluacion.nombre;
  resultado.escenarioPeso.textContent = evaluacion.peso + ' %';
  resultado.escenarioNota.textContent = textoNotaUsuario(nota);
  resultado.evaluado.textContent = escenario.pesoProyectado + ' %';
  resultado.proyectadoDesglose.textContent = proyectado;
  resultado.restante.textContent = (100 - escenario.pesoProyectado) + ' %';
  if (estadoNotaActual(escenario.proyectado) === 'Aprobando') {
    resultado.contexto.textContent = 'Con este resultado seguirías aprobando el curso.';
  } else {
    resultado.contexto.textContent = 'Con este resultado tu promedio quedaría por debajo de 13.';
  }
  mostrarEstado(indicadoresResultado, escenario.estado);
  const redondeo = llenarRedondeo(escenario.proyectado);

  // Resumen para el lector de pantalla (y línea visible sobre el resultado)
  anuncioResultado.textContent = 'Resultado: si obtienes ' + textoNotaUsuario(nota) + ' en ' + conArticulo(evaluacion) + ', tu nota acumulada sería ' + proyectado + '. ' + redondeo + ' ' + textoNecesaria(escenario.necesariaNueva) + '.';
}

// Valores de la caja de redondeo (HU-13)
const cajaRedondeo = document.getElementById('r-redondeo');
const redondeoTitulo = document.getElementById('r-redondeo-titulo');
const redondeoDetalle = document.getElementById('r-redondeo-detalle');
const redondeoIconoInfo = document.getElementById('r-redondeo-icono-info');
const redondeoIconoAtencion = document.getElementById('r-redondeo-icono-atencion');

// Pinta la caja de redondeo: informativa (primario) o de atención (⚠)
function tonoRedondeo(atencion) {
  if (atencion) {
    redondeoIconoInfo.style.display = 'none';
    redondeoIconoAtencion.style.display = 'block';
    cajaRedondeo.style.borderColor = '#8A5A00';
    redondeoTitulo.style.color = '#8A5A00';
  } else {
    redondeoIconoInfo.style.display = 'block';
    redondeoIconoAtencion.style.display = 'none';
    cajaRedondeo.style.borderColor = '';
    redondeoTitulo.style.color = '';
  }
}

// Nota calculada con dos decimales y nota oficial según la regla de redondeo (HU-13).
// Si el redondeo decide si apruebas (de 12,00 a 12,99), lo advierte. Devuelve el resumen.
function llenarRedondeo(proyectado) {
  const calculada = formatearCentesimas(proyectado);
  const oficial = notaOficial(proyectado, REGLAS_UPC);
  if (oficial === SIN_DATO) {
    redondeoTitulo.textContent = 'Nota calculada ' + calculada;
    redondeoDetalle.textContent = 'Tu universidad no tiene configurado el redondeo de la nota final: se muestra el valor exacto.';
    tonoRedondeo(false);
    return 'Nota calculada ' + calculada + '; redondeo no configurado.';
  }
  const centesimas = redondearCentesimas(proyectado);
  if (centesimas >= 12.5 && centesimas < REGLAS_UPC.notaAprobatoria) {
    redondeoTitulo.textContent = 'Con el redondeo de la UPC, ' + calculada + ' se vuelve ' + oficial + ': aprobarías';
    redondeoDetalle.textContent = 'Si el curso terminara con este promedio: nota calculada ' + calculada + ' · nota oficial ' + oficial + '. La UPC redondea desde 0,50, pero el margen es mínimo.';
    tonoRedondeo(true);
    return redondeoTitulo.textContent + '.';
  }
  if (centesimas >= 12 && centesimas < 12.5) {
    redondeoTitulo.textContent = 'Te faltarían ' + formatearCentesimas(12.5 - centesimas) + ' para que el redondeo te dé 13';
    redondeoDetalle.textContent = 'Si el curso terminara con este promedio: nota calculada ' + calculada + ' · nota oficial ' + oficial + ' (la UPC redondea desde 0,50).';
    tonoRedondeo(true);
    return redondeoTitulo.textContent + '.';
  }
  redondeoTitulo.textContent = 'Nota calculada ' + calculada + ' · nota oficial ' + oficial;
  redondeoDetalle.textContent = 'Si el curso terminara con este promedio, tu nota oficial sería ' + oficial + ' (la UPC redondea desde 0,50).';
  tonoRedondeo(false);
  return 'Nota calculada ' + calculada + ', nota oficial ' + oficial + '.';
}

campoEsperada.addEventListener('change', function () {
  if (leerEsperada() === null) {
    marcarError();
  } else {
    limpiarError();
  }
  actualizarEstimado();
});

selectorSimulado.addEventListener('change', function () {
  actualizarEstimado();
});

// Al simular
formularioSimulacion.addEventListener('submit', function (e) {
  e.preventDefault();
  const nota = leerEsperada();
  if (nota === null) {
    marcarError();
    campoEsperada.focus();
    return;
  }
  limpiarError();
  llenarResultado(buscarEvaluacion(selectorSimulado.value), nota);
  vistaFormulario.style.display = 'none';
  vistaResultado.style.display = 'block';
});

// Nueva simulación: vuelve al formulario con los valores que tenía
botonNueva.addEventListener('click', function () {
  vistaResultado.style.display = 'none';
  vistaFormulario.style.display = '';
  anuncioResultado.textContent = '';
  campoEsperada.focus();
});
