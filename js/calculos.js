// ULive · Funciones puras de cálculo académico.
// No tocan el DOM: reciben números y devuelven números.
// Reglas de la UPC: escala de 0 a 20, nota aprobatoria 13,
// límite de inasistencias del 25 % de las sesiones y redondeo de la nota final:
// "las fracciones de 0,50 y superiores se consideran como la unidad inmediata superior"
// (Reglamento de Estudios de Pregrado, SICA-REG-05 v14, art. 2.5.a).

const REGLAS_UPC = {
  notaMinima: 0,
  notaMaxima: 20,
  notaAprobatoria: 13,
  limiteFaltas: 0.25,
  redondeoFinal: 0.5
};

// Redondea a un decimal (15,17 -> 15,2)
function redondearDecimal(valor) {
  return Math.round(valor * 10) / 10;
}

// Redondea hacia arriba a un decimal (12,345 -> 12,4).
// Se usa en la nota necesaria, porque es un mínimo.
// Solo con Math.round: si el redondeo quedó por debajo, se suma una décima.
// La tolerancia evita que un error de coma flotante (12,3000000001) suba a 12,4.
function redondearArribaDecimal(valor) {
  const decimas = Math.round(valor * 10);
  if (decimas / 10 < valor - 0.000001) {
    return (decimas + 1) / 10;
  }
  return decimas / 10;
}

// Muestra un número con un decimal y coma (14.2 -> "14,2").
// Excepción mínima: toLocaleString('es', ...) sobre números.
// Se usa 'es' y no 'es-PE' porque los datos de idioma de Perú usan punto decimal.
function formatearDecimal(valor) {
  return valor.toLocaleString('es', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Redondea a centésimas (13,777 -> 13,78)
function redondearCentesimas(valor) {
  return Math.round(valor * 100) / 100;
}

// Muestra un número con dos decimales y coma (13.777 -> "13,78").
// Misma excepción mínima que formatearDecimal.
function formatearCentesimas(valor) {
  return redondearCentesimas(valor).toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Nota oficial (entera) de una nota final calculada, según la regla de redondeo de la universidad.
// Se parte de la nota en centésimas, la misma que se muestra (12,495 -> 12,50 -> 13).
// Si la universidad no tiene regla de redondeo, devuelve SIN_DATO (HU-13, escenario 3).
function notaOficial(nota, reglas) {
  if (reglas.redondeoFinal === undefined) {
    return SIN_DATO;
  }
  const centesimas = redondearCentesimas(nota);
  // Parte entera sin Math.floor: si el redondeo subió, se resta uno
  var entera = Math.round(centesimas);
  if (entera > centesimas) {
    entera = entera - 1;
  }
  // La tolerancia evita que 12,5 guardado como 12,4999999 no llegue a la regla
  if (centesimas - entera >= reglas.redondeoFinal - 0.000001) {
    return entera + 1;
  }
  return entera;
}

// Patrón de una nota con hasta dos decimales, con coma o con punto: 15 · 15,5 · 15.75
const PATRON_NOTA = /^\d{1,2}([.,]\d{1,2})?$/;

// Convierte el texto de una nota en número, o devuelve null si no tiene el formato.
// Lee los caracteres por posición (como las fechas): parte entera y decimales, sin .replace().
function textoANota(texto) {
  if (!PATRON_NOTA.test(texto)) {
    return null;
  }
  var entera = '';
  var decimales = '';
  var enDecimales = false;
  for (var i = 0; i < texto.length; i++) {
    if (texto[i] === ',' || texto[i] === '.') {
      enDecimales = true;
    } else if (enDecimales) {
      decimales = decimales + texto[i];
    } else {
      entera = entera + texto[i];
    }
  }
  var nota = Number(entera);
  if (decimales.length === 1) {
    nota = nota + Number(decimales) / 10;
  } else if (decimales.length === 2) {
    nota = nota + Number(decimales) / 100;
  }
  if (!notaValida(nota)) {
    return null;
  }
  return nota;
}

// Indica si una nota está dentro de la escala de 0 a 20
function notaValida(nota) {
  return nota >= REGLAS_UPC.notaMinima && nota <= REGLAS_UPC.notaMaxima;
}

// Suma los pesos (en %) de una lista de evaluaciones: [{ peso: 15 }, ...]
function sumarPesos(evaluaciones) {
  var suma = 0;
  for (var i = 0; i < evaluaciones.length; i++) {
    suma = suma + evaluaciones[i].peso;
  }
  return suma;
}

// Promedio de lo ya evaluado. Las evaluaciones sin nota (null) no cuentan.
// Devuelve { promedio, pesoEvaluado } sin redondear.
function promedioEvaluado(evaluaciones) {
  var puntos = 0;
  var pesoEvaluado = 0;
  for (var i = 0; i < evaluaciones.length; i++) {
    if (evaluaciones[i].nota !== null) {
      puntos = puntos + evaluaciones[i].nota * evaluaciones[i].peso;
      pesoEvaluado = pesoEvaluado + evaluaciones[i].peso;
    }
  }
  if (pesoEvaluado === 0) {
    return { promedio: 0, pesoEvaluado: 0 };
  }
  return { promedio: puntos / pesoEvaluado, pesoEvaluado: pesoEvaluado };
}

// Promedio proyectado si se obtiene "nota" en una evaluación de "peso" %
function promedioProyectado(promedio, pesoEvaluado, nota, peso) {
  return (promedio * pesoEvaluado + nota * peso) / (pesoEvaluado + peso);
}

// Nota que hace falta, en promedio, en lo que queda por evaluar para llegar al objetivo
function notaNecesaria(promedio, pesoEvaluado, objetivo) {
  const pesoRestante = 100 - pesoEvaluado;
  if (pesoRestante <= 0) {
    return 0;
  }
  return (objetivo * 100 - promedio * pesoEvaluado) / pesoRestante;
}

// Escenario: qué pasa si en la evaluación pendiente "codigo" se obtiene "nota".
// evaluaciones = [{ codigo, nota (null si está pendiente), peso }, ...]
// Devuelve el promedio actual, el proyectado y la nota necesaria antes y después
// (sin redondear), más las evaluaciones que seguirían pendientes.
function simularEvaluacion(evaluaciones, codigo, nota) {
  const actual = promedioEvaluado(evaluaciones);
  var peso = 0;
  const restantes = [];
  for (var i = 0; i < evaluaciones.length; i++) {
    if (evaluaciones[i].codigo === codigo) {
      peso = evaluaciones[i].peso;
    } else if (evaluaciones[i].nota === null) {
      restantes[restantes.length] = evaluaciones[i];
    }
  }
  const proyectado = promedioProyectado(actual.promedio, actual.pesoEvaluado, nota, peso);
  const pesoProyectado = actual.pesoEvaluado + peso;
  return {
    promedioActual: actual.promedio,
    pesoEvaluado: actual.pesoEvaluado,
    necesariaActual: notaNecesaria(actual.promedio, actual.pesoEvaluado, REGLAS_UPC.notaAprobatoria),
    pesoEvaluacion: peso,
    proyectado: proyectado,
    pesoProyectado: pesoProyectado,
    necesariaNueva: notaNecesaria(proyectado, pesoProyectado, REGLAS_UPC.notaAprobatoria),
    estado: estadoCurso(proyectado, pesoProyectado),
    restantes: restantes
  };
}

// Faltas permitidas: hasta el 25 % de las sesiones, sin pasarse (24 sesiones -> 6)
function faltasPermitidas(sesiones) {
  const limite = sesiones * REGLAS_UPC.limiteFaltas;
  const redondeado = Math.round(limite);
  if (redondeado > limite) {
    return redondeado - 1;
  }
  return redondeado;
}

// Faltas que aún se pueden usar
function faltasRestantes(permitidas, usadas) {
  return permitidas - usadas;
}

// Umbral del margen de faltas (decisión de diseño): con 3 o más faltas
// disponibles el margen es holgado.
const UMBRAL_FALTAS_HOLGADO = 3;

// Estado del margen de faltas, con los nombres de la guía de estilos:
// margen holgado (seguro), margen reducido (atención) y umbral superado (riesgo).
// Con 1 falta disponible ya es riesgo: la HU-23 pide avisar cuando queda una.
// Con 0 faltas disponibles, una más hace que el examen final se califique con cero.
function estadoFaltas(restantes) {
  if (restantes < 0) {
    return { etiqueta: 'Límite superado', tono: 'riesgo' };
  }
  if (restantes === 0) {
    return { etiqueta: 'Sin faltas disponibles', tono: 'riesgo' };
  }
  if (restantes === 1) {
    return { etiqueta: 'Última falta disponible', tono: 'riesgo' };
  }
  if (restantes < UMBRAL_FALTAS_HOLGADO) {
    return { etiqueta: 'Margen reducido', tono: 'atencion' };
  }
  return { etiqueta: 'Margen holgado', tono: 'seguro' };
}

// Porcentaje entero de una parte sobre un total (4 de 6 -> 67)
function porcentaje(parte, total) {
  return Math.round(parte / total * 100);
}

// Suma de créditos de los cursos marcados: [{ creditos: 5, marcado: true }, ...]
function sumarCreditos(cursos) {
  var suma = 0;
  for (var i = 0; i < cursos.length; i++) {
    if (cursos[i].marcado) {
      suma = suma + cursos[i].creditos;
    }
  }
  return suma;
}

// Umbral de margen (decisión de diseño): con 3 puntos o más entre lo que viene
// sacando y lo que necesita, el curso tiene "margen holgado".
const UMBRAL_MARGEN = 3;

// Estado de un curso según su margen (HU-12).
// margen = promedio de lo evaluado − nota necesaria en lo que falta (sin redondear).
// Devuelve { etiqueta, tono }; tono es "seguro", "atencion" o "riesgo".
function estadoCurso(promedio, pesoEvaluado) {
  const necesaria = notaNecesaria(promedio, pesoEvaluado, REGLAS_UPC.notaAprobatoria);
  const margen = promedio - necesaria;
  if (necesaria > REGLAS_UPC.notaMaxima) {
    return { etiqueta: 'Ya no alcanza 13', tono: 'riesgo' };
  }
  if (necesaria <= 0) {
    return { etiqueta: 'Asegurado', tono: 'seguro' };
  }
  if (margen >= UMBRAL_MARGEN) {
    return { etiqueta: 'Con margen', tono: 'seguro' };
  }
  if (margen >= 0) {
    return { etiqueta: 'Depende del final', tono: 'atencion' };
  }
  return { etiqueta: 'En riesgo', tono: 'riesgo' };
}

// Situación de la nota actual: "Aprobando" desde 13
function estadoNotaActual(promedio) {
  if (promedio >= REGLAS_UPC.notaAprobatoria) {
    return 'Aprobando';
  }
  return 'Desaprobando';
}

// Situación del promedio general: estable si es 13 o más y ningún curso
// está "En riesgo" ni "Ya no alcanza 13". estados = [{ tono: 'seguro' }, ...]
function estadoPromedioGeneral(promedioGeneral, estados) {
  var hayRiesgo = false;
  for (var i = 0; i < estados.length; i++) {
    if (estados[i].tono === 'riesgo') {
      hayRiesgo = true;
    }
  }
  if (promedioGeneral >= REGLAS_UPC.notaAprobatoria && !hayRiesgo) {
    return 'Situación estable';
  }
  return 'Requiere atención';
}

// Valor que devuelven las reglas que la universidad no tiene configuradas
const SIN_DATO = 'sin dato';

// Tope de créditos según el promedio (regla UPC de J22).
// Promedio mayor a 15: 27 créditos. Menor a 13: 18 créditos.
// Para el tramo de 13 a 15 la regla no está configurada (HU-32, escenario 3):
// se devuelve SIN_DATO y la pantalla debe decirlo, sin suponer un valor.
function topeCreditos(promedio) {
  if (promedio > 15) {
    return 27;
  }
  if (promedio < 13) {
    return 18;
  }
  return SIN_DATO;
}

// "Hoy" del prototipo: martes 6 de octubre de 2026 (no la fecha real del equipo).
// Se construye con año, mes (0 = enero) y día para que la zona horaria no mueva el día.
const HOY_PROTOTIPO = new Date(2026, 9, 6);

// Días que faltan desde hoy hasta una fecha (negativo si ya pasó).
// mes va de 1 a 12, como en el campo de fecha.
function diasDesdeHoy(anio, mes, dia) {
  const fecha = new Date(anio, mes - 1, dia);
  return Math.round((fecha - HOY_PROTOTIPO) / 86400000);
}

// Impacto de una actividad (HU-16): peso en la nota ÷ días que faltan
// para el vencimiento, con un mínimo de 1 día.
function impacto(peso, diasRestantes) {
  var dias = diasRestantes;
  if (dias < 1) {
    dias = 1;
  }
  return peso / dias;
}

// Ordena actividades de mayor a menor impacto: [{ peso: 10, dias: 0 }, ...]
// Si dos tienen el mismo impacto, va primero la que vence antes.
function vaAntes(a, b) {
  const impactoA = impacto(a.peso, a.dias);
  const impactoB = impacto(b.peso, b.dias);
  return impactoA > impactoB || (impactoA === impactoB && a.dias < b.dias);
}

// Devuelve un array nuevo (ordenamiento por inserción, solo con bucles e índices).
function ordenarPorImpacto(actividades) {
  var ordenadas = [];
  for (var i = 0; i < actividades.length; i++) {
    // Se agrega al final y se desplaza hacia adelante mientras vaya antes que la anterior
    var j = ordenadas.length;
    ordenadas[j] = actividades[i];
    while (j > 0 && vaAntes(ordenadas[j], ordenadas[j - 1])) {
      const temporal = ordenadas[j - 1];
      ordenadas[j - 1] = ordenadas[j];
      ordenadas[j] = temporal;
      j = j - 1;
    }
  }
  return ordenadas;
}
