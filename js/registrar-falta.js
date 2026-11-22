// ULive · Registrar o simular una falta (J19) y falta registrada (J25)

const formularioFalta = document.getElementById('form-falta');
const selectorClase = document.getElementById('clase');
const casillaJustificada = document.getElementById('justificada');
const errorClase = document.getElementById('error-clase');
const cajaSimulacion = document.getElementById('caja-simulacion');
const simulacionTitulo = document.getElementById('simulacion-titulo');

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
const registradaClase = document.getElementById('registrada-clase');
const registradaMarca = document.getElementById('registrada-marca');

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

// Próximas clases de Cálculo II (Lun / Mié 08:00)
const clasesCalculo = {
  'mie-7-oct': { texto: 'Mié 7 oct · Teoría', frase: 'el miércoles 7' },
  'lun-12-oct': { texto: 'Lun 12 oct · Teoría', frase: 'el lunes 12' },
  'mie-14-oct': { texto: 'Mié 14 oct · Teoría', frase: 'el miércoles 14' }
};

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

// Faltas que quedarían: una falta justificada no se descuenta
function restantesCon(justificada) {
  var nuevas = 1;
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

// Estado 1: simulación al elegir la clase o marcar la casilla
function actualizarSimulacion() {
  const clase = clasesCalculo[selectorClase.value];
  if (!clase) {
    simulacionTitulo.textContent = 'Elige una clase para ver cuántas faltas te quedarían';
    pintarCaja(cajaSimulacion, simulacionTitulo, iconosSimulacion, 'ninguno');
    return;
  }
  const restantes = restantesCon(casillaJustificada.checked);
  if (casillaJustificada.checked) {
    simulacionTitulo.textContent = 'Si faltas ' + clase.frase + ' con justificación aprobada, te seguirían quedando ' + restantes + ' faltas';
  } else {
    simulacionTitulo.textContent = 'Si faltas ' + clase.frase + ', ' + textoQuedarian(restantes);
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

// Estado 2: llena J25 con la clase elegida
function mostrarRegistrada(clase, justificada) {
  const restantes = restantesCon(justificada);
  var usadas = USADAS_CALCULO + 1;
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
  registradaClase.textContent = clase.texto;
  if (justificada) {
    registradaMarca.textContent = 'Registrada hoy · justificada';
  } else {
    registradaMarca.textContent = 'Registrada hoy';
  }

  vistaFalta.style.display = 'none';
  vistaRegistrada.style.display = 'block';
  // Resumen breve para el lector de pantalla; la consecuencia completa está en la caja
  anuncioFalta.textContent = 'Falta registrada: ' + clase.texto + '. ' + tituloRegistrada(restantes) + '.';
}

selectorClase.addEventListener('change', function () {
  if (selectorClase.value !== '') {
    errorClase.textContent = '';
    selectorClase.style.borderColor = '';
    selectorClase.setAttribute('aria-invalid', 'false');
  }
  actualizarSimulacion();
});

casillaJustificada.addEventListener('change', function () {
  actualizarSimulacion();
});

// Al registrar
formularioFalta.addEventListener('submit', function (e) {
  e.preventDefault();
  const clase = clasesCalculo[selectorClase.value];
  if (!clase) {
    errorClase.textContent = '⚠ Elige la clase a la que faltaste o faltarías.';
    selectorClase.style.borderColor = '#B3261E';
    selectorClase.setAttribute('aria-invalid', 'true');
    selectorClase.focus();
    return;
  }
  mostrarRegistrada(clase, casillaJustificada.checked);
});
