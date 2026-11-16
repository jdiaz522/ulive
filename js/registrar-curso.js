// ULive · Registrar curso (J12 y J24)
// - Al elegir una plantilla (HU-02), llena los pesos de la fórmula y recalcula la suma.
// - Al cambiar un peso, recalcula y muestra la suma (role="status").
// - Al guardar, si los pesos no suman 100 %: no se envía, se muestra la diferencia,
//   se marca el peso que hay que revisar y se le devuelve el foco. Lo ingresado se conserva.
// - Si suman 100 %, el formulario se envía a cursos.html (su action).

const formularioCurso = document.getElementById('form-curso');
const selectorPlantilla = document.getElementById('plantilla');
const avisoPlantilla = document.getElementById('aviso-plantilla');
const cajaSuma = document.getElementById('caja-suma');
const sumaTitulo = document.getElementById('suma-titulo');
const sumaPrefijo = document.getElementById('suma-prefijo');
const sumaValor = document.getElementById('suma-valor');
const sumaDiferenciaTexto = document.getElementById('suma-diferencia-texto');
const sumaDiferencia = document.getElementById('suma-diferencia');
const sumaCierre = document.getElementById('suma-cierre');
const sumaConsejo = document.getElementById('suma-consejo');
const iconoSumaOk = document.getElementById('icono-suma-ok');
const iconoSumaError = document.getElementById('icono-suma-error');

// Evaluaciones de la fórmula: su campo de peso y su aviso
const filasFormula = [
  { codigo: 'pc1', campo: document.getElementById('peso-pc1'), aviso: document.getElementById('aviso-pc1') },
  { codigo: 'lb1', campo: document.getElementById('peso-lb1'), aviso: document.getElementById('aviso-lb1') },
  { codigo: 'ea', campo: document.getElementById('peso-ea'), aviso: document.getElementById('aviso-ea') },
  { codigo: 'lb2', campo: document.getElementById('peso-lb2'), aviso: document.getElementById('aviso-lb2') },
  { codigo: 'pc2', campo: document.getElementById('peso-pc2'), aviso: document.getElementById('aviso-pc2') },
  { codigo: 'eb', campo: document.getElementById('peso-eb'), aviso: document.getElementById('aviso-eb') }
];

// Plantillas disponibles: la del mockup (Ciencias con laboratorio)
const plantillas = {
  'ciencias-laboratorio': {
    nombre: 'Ciencias con laboratorio',
    pesos: { pc1: 15, lb1: 10, ea: 25, lb2: 10, pc2: 15, eb: 25 }
  }
};

// Un peso válido es un número entero de 0 a 100 (campo vacío = 0)
const patronPeso = /^\d{1,3}$/;

// Último peso que cambió el usuario: es el que se marca si la suma no da 100 %
var ultimaFilaCambiada = null;

// Devuelve el peso de una fila como número, o null si no es válido
function leerPeso(fila) {
  const texto = fila.campo.value.trim();
  if (texto === '') {
    return 0;
  }
  if (!patronPeso.test(texto) || Number(texto) > 100) {
    return null;
  }
  return Number(texto);
}

// Marca o desmarca un peso: texto junto al campo, borde de riesgo y aria-invalid
function marcarPeso(fila, mensaje) {
  fila.aviso.textContent = mensaje;
  fila.campo.style.border = '2px solid #B3261E';
  fila.campo.setAttribute('aria-invalid', 'true');
}

function desmarcarPeso(fila) {
  fila.aviso.textContent = '';
  fila.campo.style.border = '';
  fila.campo.setAttribute('aria-invalid', 'false');
}

// Suma los pesos válidos con calculos.js (los no válidos cuentan como 0)
function calcularSuma() {
  const pesos = [];
  for (var i = 0; i < filasFormula.length; i++) {
    const peso = leerPeso(filasFormula[i]);
    if (peso === null) {
      pesos[pesos.length] = { peso: 0 };
    } else {
      pesos[pesos.length] = { peso: peso };
    }
  }
  return sumarPesos(pesos);
}

// Escribe la diferencia: "Falta asignar 10 %." o "Sobran 10 %."
function escribirDiferencia(suma) {
  if (suma < 100) {
    sumaDiferenciaTexto.textContent = 'Falta asignar';
    sumaDiferencia.textContent = (100 - suma) + ' %';
  } else {
    sumaDiferenciaTexto.textContent = 'Sobran';
    sumaDiferencia.textContent = (suma - 100) + ' %';
  }
  sumaCierre.textContent = '.';
}

// Muestra la suma mientras se edita: segura si da 100 %, neutra si no
function mostrarSuma(suma) {
  iconoSumaError.style.display = 'none';
  sumaPrefijo.textContent = 'Suma:';
  sumaValor.textContent = suma + ' %';
  sumaConsejo.textContent = '';
  if (suma === 100) {
    sumaDiferenciaTexto.textContent = 'Los pesos están completos.';
    sumaDiferencia.textContent = '';
    sumaCierre.textContent = '';
    sumaTitulo.style.color = '#1B7F4B';
    cajaSuma.style.borderColor = '#1B7F4B';
    iconoSumaOk.style.display = 'block';
  } else {
    escribirDiferencia(suma);
    sumaTitulo.style.color = '';
    cajaSuma.style.borderColor = '';
    iconoSumaOk.style.display = 'none';
  }
}

// Muestra el error de J24 al intentar guardar sin 100 %
function mostrarErrorSuma(suma) {
  sumaPrefijo.textContent = 'Los pesos suman';
  sumaValor.textContent = suma + ' %';
  escribirDiferencia(suma);
  sumaConsejo.textContent = ' Revisa si falta una evaluación o si algún peso cambió. Lo que ingresaste se conserva.';
  sumaTitulo.style.color = '#B3261E';
  cajaSuma.style.borderColor = '#B3261E';
  iconoSumaOk.style.display = 'none';
  iconoSumaError.style.display = 'block';
}

// Al cambiar un peso: se revisa ese campo y se recalcula la suma
for (var i = 0; i < filasFormula.length; i++) {
  const fila = filasFormula[i];
  fila.campo.addEventListener('change', function () {
    ultimaFilaCambiada = fila;
    if (leerPeso(fila) === null) {
      marcarPeso(fila, '⚠ Escribe un número entero de 0 a 100.');
    } else {
      desmarcarPeso(fila);
    }
    mostrarSuma(calcularSuma());
  });
}

// Al elegir una plantilla: se llenan los pesos con .value y se recalcula
selectorPlantilla.addEventListener('change', function () {
  const plantilla = plantillas[selectorPlantilla.value];
  if (!plantilla) {
    avisoPlantilla.textContent = '';
    return;
  }
  for (var i = 0; i < filasFormula.length; i++) {
    filasFormula[i].campo.value = plantilla.pesos[filasFormula[i].codigo];
    desmarcarPeso(filasFormula[i]);
  }
  ultimaFilaCambiada = null;
  avisoPlantilla.textContent = 'Plantilla aplicada: ' + plantilla.nombre + '. Puedes cambiar cualquier peso.';
  mostrarSuma(calcularSuma());
});

// Al guardar
formularioCurso.addEventListener('submit', function (e) {
  // 1. Un peso que no es número entero de 0 a 100
  for (var i = 0; i < filasFormula.length; i++) {
    if (leerPeso(filasFormula[i]) === null) {
      e.preventDefault();
      marcarPeso(filasFormula[i], '⚠ Escribe un número entero de 0 a 100.');
      filasFormula[i].campo.focus();
      return;
    }
  }

  // 2. La suma no da 100 %: se marca el último peso cambiado (o el examen final)
  const suma = calcularSuma();
  if (suma !== 100) {
    e.preventDefault();
    var filaRevisar = ultimaFilaCambiada;
    if (filaRevisar === null) {
      filaRevisar = filasFormula[filasFormula.length - 1];
    }
    for (var j = 0; j < filasFormula.length; j++) {
      desmarcarPeso(filasFormula[j]);
    }
    marcarPeso(filaRevisar, '⚠ Revisa este peso');
    mostrarErrorSuma(suma);
    filaRevisar.campo.focus();
  }
  // 3. Si suma 100 %, el formulario sigue su action (cursos.html)
});
