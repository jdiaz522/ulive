// ULive · Registrar o simular faltas (J19) y falta registrada (J25)

const formularioFalta = document.getElementById('form-falta');
const casillaJustificada = document.getElementById('justificada');
const errorClase = document.getElementById('error-clase');
const cajaSimulacion = document.getElementById('caja-simulacion');
const simulacionTitulo = document.getElementById('simulacion-titulo');
const simulacionDetalle = document.getElementById('simulacion-detalle');
const botonDeshacer = document.getElementById('boton-deshacer');

const tituloFalta = document.getElementById('titulo-falta');
const descripcionFalta = document.getElementById('descripcion-falta');
const descripcionFaltaCifra = document.getElementById('descripcion-falta-cifra');
const vistaFalta = document.getElementById('vista-falta');
const vistaRegistrada = document.getElementById('vista-registrada');
const anuncioFalta = document.getElementById('anuncio-falta');

const cajaRegistrada = document.getElementById('caja-registrada');
const registradaTitulo = document.getElementById('registrada-titulo');
const registradaConsecuencia = document.getElementById('registrada-consecuencia');
const registradaUsadas = document.getElementById('registrada-usadas');
const registradaRestantes = document.getElementById('registrada-restantes');
const registradaRestantesNota = document.getElementById('registrada-restantes-nota');

// Íconos de cada caja, uno por tono
function iconos(prefijo) {
  return {
    seguro: document.getElementById('icono-' + prefijo + '-seguro'),
    atencion: document.getElementById('icono-' + prefijo + '-atencion'),
    riesgo: document.getElementById('icono-' + prefijo + '-riesgo')
  };
}
const iconosSimulacion = iconos('sim');
const iconosRegistrada = iconos('reg');

// Colores de cada tono (tabla de tokens)
const coloresTono = { seguro: '#1B7F4B', atencion: '#8A5A00', riesgo: '#B3261E' };

// Cálculo II: 24 sesiones y 4 faltas usadas antes de esta
const SESIONES_CALCULO = 24;
const USADAS_CALCULO = 4;
const permitidasCalculo = faltasPermitidas(SESIONES_CALCULO);

// Próximas clases de Cálculo II (Lun / Mié 08:00): casilla, opción, fila de J25 y su marca
function clase(codigo, texto, frase) {
  return {
    texto: texto,
    frase: frase,
    casilla: document.getElementById('clase-' + codigo),
    opcion: document.getElementById('opcion-' + codigo),
    fila: document.getElementById('registrada-' + codigo),
    marca: document.getElementById('marca-' + codigo)
  };
}
const clasesCalculo = [
  clase('mie-7-oct', 'Mié 7 oct · Teoría', 'el miércoles 7'),
  clase('lun-12-oct', 'Lun 12 oct · Teoría', 'el lunes 12'),
  clase('mie-14-oct', 'Mié 14 oct · Teoría', 'el miércoles 14')
];

// Clases marcadas, en orden de fecha
function clasesMarcadas() {
  const marcadas = [];
  for (var i = 0; i < clasesCalculo.length; i++) {
    if (clasesCalculo[i].casilla.checked) {
      marcadas[marcadas.length] = clasesCalculo[i];
    }
  }
  return marcadas;
}

// "el miércoles 7", "el miércoles 7 y el lunes 12", "el miércoles 7, el lunes 12 y el miércoles 14"
function frasesClases(marcadas) {
  var texto = '';
  for (var i = 0; i < marcadas.length; i++) {
    if (i > 0 && i === marcadas.length - 1) {
      texto = texto + ' y ';
    } else if (i > 0) {
      texto = texto + ', ';
    }
    texto = texto + marcadas[i].frase;
  }
  return texto;
}

function limpiarErrorClase() {
  errorClase.textContent = '';
  for (var i = 0; i < clasesCalculo.length; i++) {
    clasesCalculo[i].opcion.style.borderColor = '';
    clasesCalculo[i].casilla.setAttribute('aria-invalid', 'false');
  }
}

function marcarErrorClase() {
  errorClase.textContent = '⚠ Marca al menos una clase a la que faltaste o faltarías.';
  for (var i = 0; i < clasesCalculo.length; i++) {
    clasesCalculo[i].opcion.style.borderColor = '#B3261E';
    clasesCalculo[i].casilla.setAttribute('aria-invalid', 'true');
  }
}

// Pinta una caja con el tono del estado: borde, color del título y su ícono
function pintarCaja(caja, titulo, grupoIconos, tono) {
  const tonos = ['seguro', 'atencion', 'riesgo'];
  for (var i = 0; i < tonos.length; i++) {
    if (tonos[i] === tono) {
      grupoIconos[tonos[i]].style.display = 'block';
    } else {
      grupoIconos[tonos[i]].style.display = 'none';
    }
  }
  if (coloresTono[tono]) {
    caja.style.borderColor = coloresTono[tono];
    titulo.style.color = coloresTono[tono];
  } else {
    caja.style.borderColor = '';
    titulo.style.color = '';
  }
}

// Faltas que quedarían: las justificadas no se descuentan
function restantesCon(cantidad, justificada) {
  var nuevas = cantidad;
  if (justificada) {
    nuevas = 0;
  }
  return faltasRestantes(permitidasCalculo, USADAS_CALCULO + nuevas);
}

// "te quedaría 1 falta", "te quedarían 2 faltas", "no te quedaría ninguna falta"
function textoQuedarian(restantes) {
  if (restantes < 0) {
    return 'superarías el límite de ' + permitidasCalculo + ' faltas';
  }
  if (restantes === 0) {
    return 'no te quedaría ninguna falta';
  }
  if (restantes === 1) {
    return 'te quedaría 1 falta';
  }
  return 'te quedarían ' + restantes + ' faltas';
}

// Detalle de la caja; con el límite superado, la consecuencia se dice antes de decidir (HU-25)
const DETALLE_SIMULACION = 'Simulación: no se guarda hasta que la registres. Superar ' + permitidasCalculo + ' faltas hace que el examen final se califique con cero.';

// Estado 1: simulación al marcar clases o la casilla de justificada
function actualizarSimulacion() {
  const marcadas = clasesMarcadas();
  if (marcadas.length === 0) {
    simulacionTitulo.textContent = 'Marca una o varias clases para ver cuántas faltas te quedarían';
    simulacionDetalle.textContent = DETALLE_SIMULACION;
    pintarCaja(cajaSimulacion, simulacionTitulo, iconosSimulacion, 'ninguno');
    return;
  }
  const restantes = restantesCon(marcadas.length, casillaJustificada.checked);
  if (casillaJustificada.checked) {
    simulacionTitulo.textContent = 'Si faltas ' + frasesClases(marcadas) + ' con justificación aprobada, te seguirían quedando ' + restantes + ' faltas';
  } else {
    simulacionTitulo.textContent = 'Si faltas ' + frasesClases(marcadas) + ', ' + textoQuedarian(restantes);
  }
  if (restantes < 0) {
    simulacionDetalle.textContent = 'Llegarías a ' + (USADAS_CALCULO + marcadas.length) + ' faltas, más que las ' + permitidasCalculo + ' permitidas: según la regla UPC, tu examen final se calificaría con cero. Simulación: aún no se guarda.';
  } else {
    simulacionDetalle.textContent = DETALLE_SIMULACION;
  }
  pintarCaja(cajaSimulacion, simulacionTitulo, iconosSimulacion, estadoFaltas(restantes).tono);
}

// Título de J25 según las faltas que quedan
function tituloRegistrada(restantes) {
  if (restantes < 0) {
    return 'Superaste el límite de faltas en Cálculo II';
  }
  if (restantes === 0) {
    return 'Ya no te quedan faltas en Cálculo II';
  }
  if (restantes === 1) {
    return 'Te queda 1 falta en Cálculo II';
  }
  return 'Te quedan ' + restantes + ' faltas en Cálculo II';
}

// Consecuencia que fija la regla de la UPC
function consecuencia(restantes, justificada) {
  if (restantes < 0) {
    return 'Superaste ' + permitidasCalculo + ' faltas: según la regla UPC, tu examen final se califica con cero.';
  }
  if (justificada) {
    return 'La registramos como justificada: no se descuenta de tu margen si la universidad la valida. Si superas ' + permitidasCalculo + ' faltas, tu examen final se califica con cero (regla UPC).';
  }
  return 'Si superas ' + permitidasCalculo + ' faltas, tu examen final se califica con cero (regla UPC). Te avisaremos antes de cada clase.';
}

// Estado 2: llena J25 con las clases marcadas
function mostrarRegistrada(marcadas, justificada) {
  const restantes = restantesCon(marcadas.length, justificada);
  var usadas = USADAS_CALCULO + marcadas.length;
  if (justificada) {
    usadas = USADAS_CALCULO;
  }
  var disponibles = restantes;
  if (disponibles < 0) {
    disponibles = 0;
  }

  tituloFalta.textContent = 'Faltas de Cálculo II';
  descripcionFalta.textContent = 'Registro actualizado al 6 de octubre';
  descripcionFaltaCifra.textContent = '';

  registradaTitulo.textContent = tituloRegistrada(restantes);
  registradaConsecuencia.textContent = consecuencia(restantes, justificada);
  pintarCaja(cajaRegistrada, registradaTitulo, iconosRegistrada, estadoFaltas(restantes).tono);
  registradaUsadas.textContent = usadas;
  registradaRestantes.textContent = disponibles;
  if (disponibles === 1) {
    registradaRestantesNota.textContent = 'disponible';
  } else {
    registradaRestantesNota.textContent = 'disponibles';
  }
  var textos = '';
  for (var i = 0; i < clasesCalculo.length; i++) {
    if (clasesCalculo[i].casilla.checked) {
      clasesCalculo[i].fila.style.display = 'block';
      if (justificada) {
        clasesCalculo[i].marca.textContent = 'Registrada hoy · justificada';
      } else {
        clasesCalculo[i].marca.textContent = 'Registrada hoy';
      }
      if (textos !== '') {
        textos = textos + ', ';
      }
      textos = textos + clasesCalculo[i].texto;
    } else {
      clasesCalculo[i].fila.style.display = 'none';
    }
  }

  vistaFalta.style.display = 'none';
  vistaRegistrada.style.display = 'block';
  // Resumen breve para el lector de pantalla; la consecuencia completa está en la caja
  var registro = 'Falta registrada: ';
  if (marcadas.length > 1) {
    registro = 'Faltas registradas: ';
  }
  anuncioFalta.textContent = registro + textos + '. ' + tituloRegistrada(restantes) + '.';
}

// Deshacer (HU-21): quita lo registrado y el margen vuelve a 4 de 6
function deshacerRegistro() {
  tituloFalta.textContent = 'Registrar o simular una falta';
  descripcionFalta.textContent = 'Cálculo II · ';
  descripcionFaltaCifra.textContent = USADAS_CALCULO + ' de ' + permitidasCalculo + ' faltas usadas';
  vistaRegistrada.style.display = 'none';
  vistaFalta.style.display = '';
  for (var i = 0; i < clasesCalculo.length; i++) {
    clasesCalculo[i].casilla.checked = false;
  }
  casillaJustificada.checked = false;
  actualizarSimulacion();
  simulacionTitulo.textContent = 'Registro deshecho: sigues con ' + USADAS_CALCULO + ' de ' + permitidasCalculo + ' faltas usadas';
  anuncioFalta.textContent = simulacionTitulo.textContent + '.';
  clasesCalculo[0].casilla.focus();
}

for (var i = 0; i < clasesCalculo.length; i++) {
  clasesCalculo[i].casilla.addEventListener('change', function () {
    if (clasesMarcadas().length > 0) {
      limpiarErrorClase();
    }
    actualizarSimulacion();
  });
}

casillaJustificada.addEventListener('change', function () {
  actualizarSimulacion();
});

// Al registrar
formularioFalta.addEventListener('submit', function (e) {
  e.preventDefault();
  const marcadas = clasesMarcadas();
  if (marcadas.length === 0) {
    marcarErrorClase();
    clasesCalculo[0].casilla.focus();
    return;
  }
  mostrarRegistrada(marcadas, casillaJustificada.checked);
});

botonDeshacer.addEventListener('click', function () {
  deshacerRegistro();
});

// Al cargar, por si el navegador recuerda casillas marcadas al volver atrás
actualizarSimulacion();
