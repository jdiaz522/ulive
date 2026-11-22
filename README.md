# ULive · Landing page

Landing page responsive de ULive (EduMetrics), del curso 1ASI0784 HCI for UX Design (UPC). Está hecha solo con HTML, CSS y JavaScript, sin librerías ni proceso de build. Funciona abriendo `index.html` y se puede publicar tal cual en GitHub Pages.

Referencias de Figma: H8 (wireframe web), J8 (mockup web), J26 (correo no válido) y J27 (confirmación).

## Archivos

```
index.html
css/base.css      tokens, tipografía, botones y campos (la reutilizará la app)
css/landing.css   estilos propios de la landing
js/landing.js     validación del formulario de registro
img/              vista previa de la app e íconos exportados desde Figma
```

## Técnicas usadas

Las técnicas usadas son conceptos extraídos de las lecturas pre clase del curso.

| Técnica | Archivo |
|---|---|
| `<!DOCTYPE html>`, `html lang="es"`, `head`, `body`, `title` | index.html |
| `meta` charset, viewport, description, keywords y author | index.html |
| `link rel="stylesheet"` (hojas externas y Google Fonts) | index.html |
| `script src` antes de `</body>` | index.html |
| `header`, `nav`, `main`, `section`, `article`, `footer` | index.html |
| `aria-label` en `nav`, `aria-describedby` y `aria-invalid` en el correo, `role="status"` en la confirmación y en el error del correo | index.html |
| `:focus-visible` con `outline` y `outline-offset` | css/base.css |
| `.setAttribute('aria-invalid', ...)` | js/landing.js |
| `h1`–`h3`, `p`, `ul`, `li`, `a href="#id"` | index.html |
| `img` con `alt` (descriptivo o vacío si es decorativa) | index.html |
| `details` y `summary` para las preguntas frecuentes | index.html |
| `form`, `label for`, `input type="email"` con `placeholder`, `button type="submit"` | index.html |
| Atributos `class` e `id` | index.html |
| Selectores de elemento, clase, id y descendiente | css/base.css, css/landing.css |
| `:hover`, `:active`, `:first-child` | css/base.css, css/landing.css |
| Colores en hex | css/base.css, css/landing.css |
| `background-color` | css/base.css, css/landing.css |
| `margin` (incluido `auto`), `padding`, `border`, `border-radius` | css/base.css, css/landing.css |
| `width`, `max-width`, `min-height`, `height`, `box-sizing` | css/base.css, css/landing.css |
| `display` (flex, block, inline), `flex-direction`, `flex-wrap`, `flex` | css/base.css, css/landing.css |
| `font-family`, `font-size`, `font-weight` | css/base.css, css/landing.css |
| `color`, `text-align`, `text-transform`, `text-decoration`, `line-height`, `white-space` | css/base.css, css/landing.css |
| `cursor` | css/base.css, css/landing.css |
| `@media screen and (max-width: 800px)` | css/base.css, css/landing.css |
| `const`, funciones, `if`, operadores de comparación y lógicos | js/landing.js |
| `document.getElementById` | js/landing.js |
| `addEventListener` con `blur`, `submit` y `click` | js/landing.js |
| `.value`, `.trim()`, `.textContent`, `.style.borderColor`, `.style.display`, `.focus()`, `e.preventDefault()` | js/landing.js |
| Expresiones regulares con `.test()` | js/landing.js |

## Adaptaciones propias

- **Tipografía:** se usan los tamaños de la guía de estilos en vez de los del mockup:
  - h1: 32 px (40 px en el mockup).
  - h2: 24 px (32 px en el mockup).
  - h3 en peso 500.
  - Cifra "83 %": 40 px (56 px en el mockup).
- **Espaciado:** el mockup usa 80, 72, 64, 48, 20 y 12 px. Aquí se usan solo valores de la escala:
  - Margen lateral de 32 px en web y 16 px en móvil.
  - Cada sección suma 32 + 32 px arriba y abajo.
  - Los huecos de 12 y 20 px pasan a 8, 16 o 24 px.
- **Antetítulo "Para universitarios de Lima":** el mockup lo pone sobre el h1. Se quitó, junto con su regla `.antetitulo`: la etiqueta en mayúsculas competía con el título, y el público ya se nombra en la descripción, en el aviso de prelanzamiento y en la sección "Para quién es". La vista previa de la app es una imagen y conserva su botón "Ver actividad".
- **Longitud de línea:** los párrafos tienen `max-width: 680px`. Por eso la descripción de la primera sección y el dato del problema ocupan más líneas que en el mockup.
- **Centrado vertical:** `align-items` y `justify-content` no están en la lista de técnicas. El texto de la primera sección y el del dato del problema se centran con `margin-top: auto; margin-bottom: auto` dentro de un contenedor flex. En el encabezado, `margin-right: auto` en la marca empuja la navegación a la derecha, igual que el "Espaciador" del mockup.
- **Separación entre tarjetas:** no se usa `gap`. Cada tarjeta lleva `margin-left: 24px` y la primera lo anula con `:first-child`. En móvil pasa a `margin-top: 16px`.
- **Botones como enlaces:** `<a>` con `display: block` dentro de un contenedor flex, para que tomen el ancho de su texto. El alto es 8 + 30 + 8 px más 2 px de borde, es decir 48 px como en el mockup.
- **Preguntas frecuentes:** el mockup muestra "+" y "−". Para cambiar ese marcador harían falta técnicas fuera de la lista, así que se mantiene el triángulo nativo de `<summary>`, que cumple la misma función. La primera pregunta empieza abierta, como en el mockup.
- **Estados sin definir en el mockup:**
  - `:hover` subraya el texto de botones, enlaces y preguntas, y cambia a primario el borde del campo.
  - `:active` usa primario oscuro (#0F2A44).
- **Encabezado fijo:** se queda arriba al desplazarse, en web y en móvil.
- **Enlace "Probar el prototipo" (22 nov 2026):** el handbook exige que las 30 HU core se puedan verificar desde la URL publicada, así que la landing enlaza a la app. El enlace lleva a `app/bienvenida.html`, el inicio del flujo, y está en el encabezado y en el pie. Dice "prototipo" a propósito: la landing anuncia que ULive aún no está disponible, y el enlace no lo contradice. No está en el mockup H8/J8.
  - Va dentro del `<nav>`, que pasa a llamarse "Navegación principal" (antes "Secciones de la página", pero ya no solo lleva a secciones), y fuera de la lista `<ul>`, antes de ella. Por eso en web queda antes de "Funciones" y no como cuarto enlace: sin `order` no se puede reordenar.
  - **Por qué fuera de la lista:** como cuarto `<li>`, a 390 px abría una tercera fila y el encabezado fijo pasaba de 114 a 163 px; a 801 px los enlaces se partían en dos líneas y medía 113 px.
- **Encabezado en web entre 801 y unos 885 px:** la barra tiene `flex-wrap: wrap` también en web y los enlaces de la navegación llevan `white-space: nowrap`. Si no cabe todo en una fila, el botón "Quiero enterarme" pasa entero a una segunda fila, alineado con la marca, y ninguna palabra se parte. Para eso los 32 px entre la navegación y el botón son margen derecho de la navegación y no margen izquierdo del botón. Medidas: 65 px de alto a 1440, 930 y 890 px; 113 px a 880 y 801 px. Sin otro `@media`.
- **Encabezado en móvil:** dos filas (114 px de alto a 390 px, igual que antes del enlace): la marca y "Probar el prototipo" arriba, y la lista de secciones debajo.
  - La marca y la navegación miden 50 % cada una y entran juntas en la primera fila. La navegación es flex con `flex-wrap`: el enlace del prototipo va a la derecha (`margin-left: auto`) y la lista, con `width: 200%` y `flex: none`, pasa a la segunda línea. `margin-left: -100%` (porcentaje del ancho de la navegación) la lleva al borde izquierdo, debajo de la marca, sin taparla.
  - La marca lleva `margin-bottom: auto` para no estirarse al alto de las dos filas: estirada, cubría la mitad izquierda de la lista y un toque entre enlaces llevaba a `#inicio`. Su área táctil es la mitad del ancho y 48 px de alto.
  - Los enlaces de la lista usan `nav li { display: inline; }`. Su relleno vertical de 16 px les da unos 49 px de área táctil, porque `min-height` no se aplica a elementos en línea. Con `nowrap`, a 360 px "Preguntas frecuentes" pasa entera a una tercera fila (163 px, lo mismo que antes, cuando se partía en dos líneas).
  - El botón "Quiero enterarme" del encabezado se oculta en móvil, porque el mismo botón está en la primera sección. Con él, el encabezado fijo ocupaba 170 px, una quinta parte de la pantalla.
- **`<details open>`:** el atributo `open` no aparece en las lecturas pre clase; se usa para que la primera pregunta empiece abierta, como en el mockup.
- **Primera sección en móvil:** la vista previa de la app pasa debajo del texto, de modo que el h1 y el botón quedan visibles sin desplazarse a 390 px.
- **Formulario en móvil:** el campo y el botón "Avisarme" se apilan.
- **Mensajes de error:** se acordaron dos, los dos con ⚠:
  - Si falta la @: "⚠ Revisa tu correo, le falta la @. Lo que escribiste se conserva."
  - En los demás casos: "⚠ Escribe un correo válido, por ejemplo nombre@correo.com".
  - Con error, el borde del campo cambia solo de color a #B3261E y mantiene 1 px; la tarjeta no cambia. Así el campo no se mueve y el rojo queda en el campo que origina el error. El mensaje lleva ⚠ y texto, así que el estado no depende solo del color.
  - El párrafo del error tiene `role="status"`, para que el lector de pantalla lo anuncie también cuando aparece al salir del campo (`blur`) y no solo al enviar.
- **Decisiones de accesibilidad que se mantienen (auditoría del 21 de noviembre de 2026):**
  - **Error anunciado dos veces:** `#error-correo` tiene `role="status"` y además es el `aria-describedby` del campo. Al enviar con error, el foco vuelve al campo y algunos lectores de pantalla leen el mensaje dos veces: una por la región de estado y otra como descripción del campo. Se deja así porque las dos vías vienen de las lecturas pre clase: `role="status"` hace que el error se anuncie también al salir del campo (`blur`), donde el foco no vuelve al campo, y `aria-describedby` hace que el error se lea cada vez que el campo recibe el foco.
  - **Color del placeholder:** "tu.correo@ejemplo.com" usa el gris por defecto del navegador (en Chrome, unos 4,6:1 sobre blanco, por encima del 4,5:1 de AA). No es un token de la guía, pero `::placeholder` no está en la lista de técnicas. El placeholder solo es un ejemplo: la etiqueta "Correo electrónico" siempre está visible.
- **Validación en `blur`:** solo valida si el campo tiene texto, y no devuelve el foco. Si lo devolviera al salir del campo, quien navega con el teclado no podría salir de él. El foco se devuelve solo al enviar.
- **Confirmación:** el texto sale del correo escrito (J27). El símbolo del estado es el escudo con check (`img/escudo-check.svg`), alineado arriba con la primera línea del título para que, si un correo largo ocupa varias líneas, marque el inicio del mensaje. El título no repite el ✓ porque el escudo ya lo lleva; el estado sigue teniendo ícono y texto en color seguro. El formulario y la confirmación comparten una tarjeta (`#tarjeta-registro`), y el error ya no la pinta. El párrafo `role="status"` está en la página desde que carga, vacío y sin alto. Así, al recibir el texto, el lector de pantalla lo anuncia. Si estuviera dentro de un bloque oculto que se muestra en el mismo momento, muchos lectores no lo anunciarían.
- **Usar otro correo:** J27 no muestra cómo corregir un correo ya enviado. Tras confirmar aparece el enlace "Usar otro correo" (`#usar-otro-correo`), que vuelve a mostrar el formulario con el correo anterior escrito, pone el foco en el campo y vacía el párrafo de estado, para que un nuevo envío se anuncie otra vez. Es un `<a href="#registro">` con `click` y `e.preventDefault()`, con `min-height: 44px`. Va dentro de `<div class="fila-enlace">` con `display: flex` y `flex-direction: row`: como elemento de una fila flex, el enlace mide solo su texto, mantiene los 44 px de alto y su contorno de foco no ocupa toda la columna. La fila empieza con `display: none` y el JS la muestra con `display: flex`. Al confirmar, el foco pasa a este enlace con `.focus()`, porque el botón "Avisarme", que lo tenía, queda oculto.
- **Pie de página:** se quitó "Aviso de privacidad" porque no existe esa página. El texto de ayuda del formulario ya explica para qué se usa el correo. Lleva el enlace "Probar el prototipo" (ver arriba), en #FFFFFF y subrayado sobre #0F2A44, con 44 px de alto y solo el ancho de su texto (párrafo flex). Su contorno de foco es #FFFFFF, como en el menú lateral de la app, porque el primario #15497A no se distingue sobre #0F2A44.
- **Íconos:** se mantienen los tamaños del mockup, que no son los 24 px por defecto: 32 px en las funciones y 28 px en la confirmación. Cada uno va junto a un título visible y por eso lleva `alt=""`.
- **Vista previa de la app:** es un recorte de la parte superior de J14 (Detalle de curso móvil) y no la pantalla de Inicio completa. Muestra Cálculo II con la nota actual 13,8, las faltas 4 / 6 y el aviso "Necesitas 12,4", para que la portada enseñe un cálculo real. Se exportó a 2x (780 × 792 px) y lleva `width` y `height` para reservar su espacio al cargar. El marco del celular es plano, sin sombra, como pide DESIGN.md.

## Excepciones usadas

- `display: none`: el escudo y el texto de detalle de la confirmación empiezan ocultos con CSS. Al enviar un correo válido, el JS pone `formulario.style.display = 'none'` y muestra el escudo y el detalle con `.style.display = 'block'`. Se apoya en que las lecturas pre clase dicen que el DOM permite "mostrar, ocultar o eliminar elementos". En CSS también oculta en móvil el botón del encabezado.
- `novalidate` en el formulario de registro: el correo es `type="email"` para que el celular muestre el teclado con @. Sin `novalidate`, el navegador bloquearía el envío con su propio aviso antes de que corra el script, y no se verían los mensajes de J26. No aparece en las lecturas pre clase; se aprobó para este caso.
- `autocomplete="email"` en el campo de correo: declara que el campo pide el correo del propio usuario, para que el navegador y los gestores de contraseñas lo autocompleten. Es la técnica habitual para el criterio 1.3.5 de las WCAG 2.2 (Identificar el propósito de la entrada, nivel AA), que ayuda sobre todo a personas con dificultades motoras o cognitivas. No aparece en las lecturas pre clase; se aprobó para este campo.
- `overflow-wrap: anywhere` en `.confirmacion-titulo` (css/landing.css): un correo largo sin espacios (por ejemplo, uno de 66 caracteres) medía 599 px dentro de una tarjeta de 356 px a 390 px de ancho y causaba desplazamiento horizontal. Ninguna técnica de la lista corta una palabra sin espacios (`white-space` solo controla los cortes en espacios). Con esta propiedad, el correo se corta solo donde no cabe y se copia intacto. No aparece en las lecturas pre clase; se aprobó para este caso.
- `position: sticky; top: 0;` en el encabezado y `scroll-padding-top` en `html`: mantienen el encabezado fijo y evitan que tape el título de la sección o el contorno de foco al usar los enlaces o Tab. No aparece en las lecturas pre clase. Valores:
  - 124 px en web y en móvil (113 o 114 px de encabezado en dos filas + 7 px del contorno, redondeado). En web era 72 px (65 + 7), pero entre 801 y unos 885 px el encabezado pasa a dos filas y, sin otro `@media`, el valor tiene que cubrir ese caso. Se fija en `css/landing.css`, sin cambiar la regla de `css/base.css`; en web ancha deja 52 px de aire de más sobre el título de la sección.

No se usaron `Number()` ni `toLocaleString()`, porque la landing no hace cálculos.

---

# App ULive

Pantallas en `app/`, estilos en `css/base.css` (compartido) y `css/app.css`, y cálculos en `js/calculos.js`. Mockups de Figma: J1–J7 (web) y J9–J25 (móvil). El archivo nombra los frames por pantalla, no por código. Los códigos J se asignaron por nombre: los wireframes usan la barra "Barra superior" o "Navegación lateral" y los mockups, "BarraNavegacion".

Son las 15 pantallas de la app. Dos no son archivos aparte, sino estados de otra página: Resultado de simulación y el aviso de falta registrada (J25). Las historias de usuario salen de la Tabla 16 del informe y de sus secciones 4.3 y 4.4.

| Pantalla | Archivo | Mockup web | Mockup móvil | Historias de usuario |
|---|---|---|---|---|
| Landing | index.html | J8; estados J26 (correo no válido) y J27 (confirmación) | — | HU-43, HU-44, HU-45 |
| Bienvenida | app/bienvenida.html | — | J9 | HU-31, HU-36 |
| Inicio | app/inicio.html | J1 | J10 | HU-08, HU-12, HU-16, HU-22, HU-47, HU-48 |
| Mis cursos | app/cursos.html | — | J11 | HU-08, HU-09, HU-12 |
| Registrar curso | app/registrar-curso.html | — | J12, error J24 | HU-01, HU-02, HU-20 |
| Registrar nota | app/registrar-nota.html | — | J13 | HU-07, HU-47 |
| Detalle de curso | app/curso.html | J2 | J14 | HU-08, HU-09, HU-10, HU-13 |
| Evaluaciones | app/evaluaciones.html | J3 | J15 | HU-08, HU-11 |
| Simulación de nota | app/simulacion.html | J4 | J16 | HU-09, HU-10, HU-11, HU-13 |
| Resultado de simulación | estado de app/simulacion.html | J5 | J17 | HU-10, HU-11, HU-13 |
| Faltas | app/faltas.html | J6 | J18 | HU-22, HU-24, HU-32 |
| Registrar o simular falta | app/registrar-falta.html (J25 es un estado de la página) | — | J19, aviso J25 | HU-21, HU-23, HU-25 |
| Actividades | app/actividades.html | J7 | J20 | HU-15, HU-16, HU-17 |
| Cambio de turno | app/cambio-turno.html | — | J21 | HU-28 |
| Simulador de matrícula | app/matricula.html | — | J22 | HU-32, HU-33, HU-34 |
| Registrar actividad | app/registrar-actividad.html | — | J23 | HU-14, HU-15 |

La landing no es una de las 15 pantallas de la app; va en la tabla para mostrar sus historias.

## Historias Must Have que el prototipo web no cubre

- **HU-03 (editar la fórmula de un curso):** no hay pantalla de edición. En el informe, la edición reutiliza el formulario de Registrar curso.
- **HU-37 (datos en el dispositivo) y HU-46 (funcionar sin conexión):** necesitan almacenamiento local o un service worker, que están fuera de las lecturas pre clase. Bienvenida ya no lo menciona: decía "Tus cursos y notas se guardan en tu celular", algo que el prototipo no hace. Ahora dice "Tú registras tus cursos y notas. ULive no se conecta al portal." (revisión de UX, 22 nov 2026).

## Cambios de datos respecto de los mockups

Regla: el código (`js/calculos.js`) es la fuente de verdad. Los datos de los mockups son ilustrativos.

| Dato | Mockup | Ahora | Motivo |
|---|---|---|---|
| Evaluaciones de Cálculo II | Parcial 1 (20 %) y Taller 2 (10 %) | Se agrega "Práctica 1": 15 %, nota 12, del 4 sep, "Desaprobada" (una evaluación se aprueba con 13 o más) | Así suman el 45 % evaluado que dicen J2, J4 y J13. El promedio queda en 13,78 y se muestra 13,8. |
| Nota necesaria de Cálculo II | 12,4 y 10,2 | 12,4 y 10,2 (12,36 y 10,17 redondeados hacia arriba) | Se redondea hacia arriba porque es un mínimo. |
| Faltas de la tarjeta de resumen (J1, J6) | "Faltas acumuladas 4 / 6" | "Faltas en Cálculo II 4 / 6" | Las 4 faltas y el máximo de 6 son de Cálculo II. En el ciclo son 5 (4 + 1 + 0). |
| Alerta de faltas (J1) | "Te quedan 2 faltas" | "Te quedan 2 faltas en Cálculo II" | El mismo alcance que la tarjeta. |
| Avance del curso (J2) | 62 % | 63 % | `Math.round` de 62,5. |
| Programación III y Física II (J11) | 16,4 / necesita 9,1 y 15,3 / necesita 11,6 | Sin cambios | Son datos fijos del ejemplo, no calculados: el prototipo solo detalla Cálculo II. |
| Peso del laboratorio de Física II (J12, J23) | 10 % | 15 % | Es el peso que usan J1, J3 y J21. En J23, el ejemplo es "Laboratorio 2 · 15 %". |
| Curso de ejemplo en Registrar curso (J12, J24) | Física II | Química General, con la misma fórmula | Física II ya está en Mis cursos. |
| Fecha de actualización de faltas (J25) | "al 7 de octubre" | "al 6 de octubre" | "Hoy" es martes 6 de octubre. La falta es de la clase del miércoles 7 y se registró hoy. |
| Estado de Programación III y Física II (J1, J11 y siguientes) | "Asegurado" | "Con margen" | Ninguno ha alcanzado 13 todavía. Con la regla de estados, los márgenes son 7,3 y 3,7 puntos. |
| Formato de porcentajes | "67%", "25%" | "67 %", "25 %" | Siempre con espacio, como el resto de las cifras. Para que la cifra y el "%" no queden en líneas distintas, van en un `<span class="cifra">` con `white-space: nowrap`. En los textos que arma el JS, cada cifra tiene su propio `<span class="cifra">` en el HTML y el JS solo escribe dentro. En los `<option>`, que no admiten `<span>`, va un espacio normal. |
| Faltas de la clase de Física II en Cambio de turno (J21) | "Usaría 1 de tus 6 faltas", en color de atención y con reloj | "usarías 1 de tus 6 faltas (te quedarían 5)" con "Margen holgado" (seguro, escudo) | Le quedarían 5 faltas: con la regla de `estadoFaltas` es margen holgado. La regla manda sobre el mockup. |
| Estado en Resultado (J5, J17) | "Asegurado" | El de la regla, según el escenario ("Con margen" con 15 en el Parcial 2) | Con 15 en el Parcial 2, el promedio proyectado es 14,2 con 70 % evaluado y necesita 10,2: margen de 4,0 puntos. No ha alcanzado 13. |
| "Necesitas 10,2 en promedio en lo que falta" (J4, J5, J16, J17) | Texto o caja en color de atención, sin estado | Caja informativa (primario, balanza) en Resultado y texto normal en Simulación, con el indicador de estado al lado | Los colores de estado se reservan para el estado del curso y siempre van con ícono y texto. Con margen 4,0, el color de atención contradecía el estado "Con margen". |
| Evaluación de la entrega de ejemplo en Registrar actividad (J23) | "LB2 · peso 10 %" | Sin ejemplo: el formulario empieza vacío | El ejemplo chocaba con los datos: Laboratorio 2 ya está calificado (18, 8 sep). |
| Evaluaciones pendientes de Física II | — | Se agrega "Laboratorio 3" (15 %, pendiente), y la actividad "Informe de laboratorio" (Física II, 9 oct) de Inicio y Actividades queda ligada a ella | Para que haya una evaluación pendiente a la cual ligar una entrega de Física II. No se agrega a la tabla de Evaluaciones, igual que Taller 3 y el examen final, que están pendientes y ligados a actividades y tampoco aparecen ahí. |
| "Foro de dudas" (Cálculo II, 5 %, 12 oct) | Solo en Detalle de curso (J2) | También en Actividades (J7, J20) | Las dos pantallas deben mostrar las mismas actividades. Con la regla de impacto (5 ÷ 6 días = 0,83) queda en el sexto lugar, así que las tres próximas actividades de Inicio no cambian. |
| "Cuestionario 4" (Programación III, 5 %, venció el lun 5 oct, 23:59) | — | Nueva actividad de ejemplo, vencida y sin entregar, en Actividades | Para que se pueda probar el escenario 3 de la HU-17 (una actividad vencida sin marcar aparece como vencida): con "hoy" el 6 de octubre, ninguna otra ha vencido. Va arriba de la lista, antes del orden por impacto. |
| "Actividades pendientes" en Inicio (J1, J10) | 3, "Esta semana" | 4, "Esta semana, sin contar la vencida", con el estado "⚠ 1 vencida" | Sin entregar y con vencimiento de hoy (mar 6) al domingo 11: Taller 3, Foro de patrones, Informe de laboratorio y Guía de integrales. El Cuestionario 4 no cuenta porque ya venció y no se puede entregar, pero la tarjeta lo avisa con el estado de riesgo "⚠ 1 vencida"; el Foro de dudas vence el 12. "Revisar primero" sigue siendo el Taller 3. |
| Posición de una entrega nueva en Registrar actividad (J23) | — | Cuenta también la vencida: "quedaría 5.º de 8" en el ejemplo de 15 % a 3 días (antes "4.º de 7") | En Actividades las vencidas van primero, así que la nueva entrega queda detrás de ellas. |
| Orden de actividades (J7, J20) | — | Sin cambios entre las que se pueden entregar; las vencidas van antes | Con la regla de impacto (peso ÷ días que faltan, mínimo 1 día, de mayor a menor) sale el mismo orden: Taller 3 (10), Foro de patrones (5), Informe de laboratorio (5, empata y vence después), Guía de integrales (1,67) y Proyecto API (1,25). |

## Regla de estados (`estadoCurso` en `js/calculos.js`)

Se basa en el margen entre lo que el estudiante viene sacando y lo que necesita (HU-12). Los tokens ya hablan de "margen holgado" (estado seguro) y "margen reducido" (estado de atención). Se usan estos datos:
- `p`: promedio de lo evaluado.
- `n`: nota necesaria en lo que falta para llegar a 13, sin redondear.
- `margen = p − n`.

Las condiciones se revisan en este orden:

| Estado | Condición | Color e ícono |
|---|---|---|
| Ya no alcanza 13 | n > 20 | Riesgo, ⚠ |
| Asegurado | n ≤ 0: ya alcanzó 13 aunque saque 0 en lo que falta | Seguro, escudo |
| Con margen | margen ≥ 3 | Seguro, escudo |
| Depende del final | 0 ≤ margen < 3 | Atención, ⚠ |
| En riesgo | margen < 0: necesita más de lo que viene sacando | Riesgo, ⚠ |

- **Umbral de 3 puntos:** es una decisión de diseño. Está en la constante `UMBRAL_MARGEN`.
- **Nota actual** (`estadoNotaActual`): "Aprobando" si p ≥ 13 y "Desaprobando" si p < 13.
- **Promedio general** (`estadoPromedioGeneral`): "Situación estable" si es 13 o más y ningún curso está "En riesgo" ni en "Ya no alcanza 13". Si no, "Requiere atención".
- **Resultado con los datos del ejemplo:**
  - Cálculo II: margen 1,4 → "Depende del final".
  - Programación III: margen 7,3 → "Con margen".
  - Física II: margen 3,7 → "Con margen".
  - Promedio general de 15,2 → "Situación estable".
  - Los márgenes de Programación III y Física II salen de sus datos fijos (promedio y nota necesaria).

## Adaptaciones propias de la app

- **Una página para web y móvil.** El informe (sección 4.2.2) dice que la versión móvil conserva el contenido y cambia la disposición, y las lecturas pre clase piden no perder contenido al reducir el ancho. Inicio muestra en las dos versiones el contenido de la web (J1), que incluye todo lo de J10:
  - 4 tarjetas de resumen, agrupadas en dos pares (`.resumen-par`). En móvil van en 2 × 2: cada par ocupa una fila y sus dos tarjetas miden lo mismo de alto (`flex: 1 1 40%` y `:nth-child(odd)`). J10 tenía 3 en fila.
  - 3 cursos y 3 actividades. J10 mostraba 2 de cada uno.
  - El aviso de faltas.
  - El botón "Registrar cambio de turno", que en J10 estaba solo en móvil.
  - El aviso "Revisar primero" va después del resumen en las dos versiones, como en J1. En J10 iba antes. A 390 px se sigue viendo sin desplazarse.
- **Navegación global:** un solo `<nav aria-label="Navegación principal">`.
  - En web es la columna lateral, a la izquierda.
  - En móvil es la barra inferior. Para eso, `.app` usa `flex-direction: column-reverse`.
  - **A 320 px no desborda (HU-48, escenario 3):** los cinco destinos usan `flex: 1`, pero sin `min-width: 0`, así que ninguno mide menos que su texto. A 320 px "Evaluaciones" (76 px) y "Actividades" (68 px) conservan su ancho y los otros tres se reparten el resto (44 px cada uno, con 56 px de alto). Antes la barra se pasaba 10 px del ancho. Desde unos 400 px los cinco vuelven a medir casi igual. Se midió a 306, 360 y 390 px de ancho útil.
  - En el HTML la navegación va antes que el contenido, en todas las páginas. Por eso, con Tab, llega primero a la navegación, tanto en web como en móvil.
  - El destino activo lleva la clase `activa` (cambia el fondo y el peso de la letra) y `aria-current="page"`, para no depender solo de lo visual.
- **Foco sobre fondo oscuro:** el contorno de foco de `base.css` es primario (#15497A) y sobre #0F2A44 casi no se ve (1,6:1). En la columna lateral (web) y en la tarjeta "Revisar primero" pasa a blanco (14,6:1) con `.lateral a:focus-visible` y `.notificacion a:focus-visible`. En móvil la barra inferior es blanca y vuelve el contorno primario.
- **Indicadores de estado sin borde (revisión de UX, 21 nov 2026):** con borde se leían como botones. `.estado` y `.estado-neutro` quedan sin borde, con su texto, su ícono y su color sobre fondo #F5F7FA y radio de 4 px, en todas las pantallas. "Pendiente" y "En curso" van en texto secundario (#55606E). El JS de Actividades y de Cambio de turno ya no cambia el color del borde, solo el del texto. Contraste sobre #F5F7FA: seguro #1B7F4B 4,68:1; atención #8A5A00 5,52:1; riesgo #B3261E 6,09:1; neutro #55606E 5,96:1 (todos AA para texto de 14 px).
- **Sin bordes de 2 px para destacar:** un borde de 2 px en primario se leía como "activo" o con foco. Las tarjetas que tenían `.resumen-destacado` (Inicio, Curso, Faltas, Registrar falta, Registrar nota y Simulación) y `.actividad-prioritaria` (Inicio y Curso) llevan el mismo borde de 1 px #D6DEE7 que las demás tarjetas. La prioridad de Taller 3 se marca por el orden y con "Hoy, 23:59" en peso 600 (`.vence-pronto`), sin color: el reloj pasa a gris y el texto a texto principal, porque los colores de estado son solo para la situación académica. Las dos clases se borraron del HTML porque ya no tenían estilos.
- **Filas planas dentro de un panel (revisión de UX, 22 nov 2026):** las listas de Inicio ("Mis cursos" y "Próximas actividades") y la de actividades de Detalle de curso eran tarjetas con borde, radio y fondo blanco dentro de un panel con el mismo borde y fondo: una tarjeta dentro de otra. Ahora cada fila es un bloque plano separado por un divisor de 1 px #D6DEE7 arriba (salvo la primera), con 16 px de relleno arriba y abajo. En Inicio, el ícono de libro va sin su caja gris. Las tablas que en móvil son listas siguen la misma regla (ver más abajo).
- **Columnas que pasan abajo (justo por encima del punto de quiebre):** con una columna lateral de ancho fijo (390 px, o el formulario de 560 px en Simulación), a 801 px de ventana la columna principal quedaba en 68 px o la página se desbordaba. Sin agregar puntos de quiebre, `.columnas-ajustables` agrega `flex-wrap: wrap` y anchos base con `flex`: 480 px la columna principal, 390 px la lateral y 560 px el formulario. Cuando no entran juntas, la segunda pasa debajo y las dos ocupan toda la fila. La principal crece con `flex: 1000` contra `flex: 1`, así que en web ancha las columnas miden lo mismo que antes. Cada columna lleva 24 px de margen a la izquierda y abajo, y el contenedor los compensa con −24 px: en una fila queda el mismo espacio entre columnas y, al pasar abajo, ninguna queda corrida y hay 24 px entre filas. En móvil todo sigue en una columna, como antes. Medidas a 801 px:
  - Inicio: "Mis cursos" pasaba de 68 px de ancho (cada fila de curso, 34 px) a 482 px; "Próximas actividades" y el aviso de faltas pasan debajo.
  - Faltas: el aviso de faltas y "Faltas por curso" pasaban de 68 a 482 px; las tarjetas de resumen y "Regla institucional" pasan debajo.
  - Simulación: el formulario (560 px) desbordaba la página 50 px; ahora mide 482 px y el resultado estimado pasa debajo. El resultado de la simulación (segundo estado) se desbordaba 99 px y también pasa a dos filas.
  - Detalle de curso: Evaluaciones pasaba de 68 a 482 px; Actividades pasa debajo.
  - A 1440 y 390 px las columnas miden lo mismo que antes. La única diferencia es que en Simulación (web) el panel del resultado estimado mide 480 px de alto, igual que el formulario; antes medía 496 y su borde inferior quedaba 16 px más abajo que el del formulario.
- **"Peso 10 %":** `.actividad-peso` es flex y absorbía el espacio entre "Peso" y la cifra ("Peso10 %"). "Peso" y la cifra van juntos en un `<span>`, que conserva el espacio.
- **Íconos de la navegación:** cambian de color entre web (blanco) y móvil (gris o primario). Se usa `<picture>` con `<source media>`. Las variantes se generaron cambiando solo el color del trazo del SVG exportado.
- **Repetidos ocultos con `display: none`:**
  - La marca y el perfil aparecen en la columna lateral (web) y en la barra superior (móvil). En cada versión se oculta la copia que sobra.
  - En móvil también se ocultan la ruta y el ciclo. Es información que el mockup móvil (J10) no muestra y que en web es secundaria: la ruta repite el h1.
- **Símbolo "U" de la marca:** en la columna lateral es primario (#15497A), no acento, porque el acento queda para la acción principal de cada pantalla.
- **"Ciclo 2026-2":** es texto, no un selector, porque hay un solo ciclo.
- **Enlaces de Inicio:** solo enlazan las filas de Cálculo II, que es el único curso con detalle en el prototipo. Las filas de Programación III y Física II no tienen hover ni aspecto de clicables.
  - Las tarjetas de resumen que son enlace terminan con una acción visible, subrayada en primario (14 px, peso 500): "Ver mis faltas" (a Faltas) y "Ver actividades" (a Actividades). Esta última se volvió enlace para que la actividad vencida ("1 vencida") tenga salida desde Inicio. Las tarjetas que no son enlace no llevan esa línea.
- **Cálculos a la vista en Inicio** (el producto muestra el cálculo, no solo el resultado). Cada cifra sale de `js/calculos.js` con los datos del ejemplo:
  - Alerta de faltas: "Límite UPC: 25 % de 24 sesiones = 6 faltas" (`faltasPermitidas(24)` = 6; Cálculo II tiene 24 sesiones, como en Registrar falta). Reemplaza el "67 %", que no decía de qué era. Faltas usa la misma línea en su alerta.
  - La prioridad del día ("Entregar Taller 3 de Cálculo II") y la alerta de faltas (en Inicio y en Faltas) son `<h2>` con sus mismas clases, para que quien navega por encabezados las encuentre. Las clases fijan tamaño, peso, color y alto de línea, así que el aspecto no cambia.
  - Cada actividad muestra su impacto con el mismo formato de un decimal de Registrar actividad: Taller 3 "Impacto 10,0 = 10 % ÷ 1 día" (vence hoy y cuenta el mínimo de 1 día), Foro de patrones "5,0 = 5 % ÷ 1 día" e Informe de laboratorio "5,0 = 15 % ÷ 3 días" (`impacto`).
  - Promedio general: "Promedio simple de tus 3 cursos (sin créditos)", con el estado "Situación estable" (`estadoPromedioGeneral`) como indicador seguro con escudo, igual que los demás estados. Es el promedio simple de las notas de Cálculo II, Programación III y Física II: (13,8 + 16,4 + 15,3) / 3 = 15,17, que se muestra 15,2. El 15,2 viene del mockup (Respuesta-1) y coincide con ese cálculo. No se pondera por créditos porque el prototipo no tiene los créditos de esos cursos.
  - El criterio dice cómo se desempata: "Si dos empatan, va primero la que vence antes", que es la regla de `ordenarPorImpacto`. Por eso el Foro (vence el 7) va antes que el Informe (vence el 9).
  - **Crítica de diseño (22 nov 2026):**
    - **La cifra de la nota:** cada fila dice cuánto necesita el curso, con los mismos datos de la tabla de Mis cursos: "Necesitas 12,4 en lo que falta para llegar a 13" (Cálculo II, la cifra de la caja "Depende del final" de Detalle de curso), 9,1 (Programación III) y 11,6 (Física II). Estas dos últimas son datos fijos del ejemplo (ver "Cambios de datos"). Con la línea en las tres, las filas miden lo mismo. Las tres notas llevan encima "Nota actual", para que 13,8 no se lea sin contexto.
    - **Líneas de cálculo:** el criterio de orden, el impacto de cada actividad y el "Límite UPC" de la alerta pasan de Texto auxiliar (12 px, #55606E) a Etiqueta (14 px, peso 500, #1A2430), con la clase `.etiqueta` de `base.css`. El cálculo es lo que distingue al producto y no debía verse como letra pequeña. El "Límite UPC" de la alerta de Faltas usa el mismo estilo, para que la regla se lea igual en las dos pantallas.
    - **Ícono de "Peso":** en las tarjetas de actividad de Detalle de curso (Inicio ya no lleva esa línea, ver "Crítica final"), el calendario se cambió por la balanza gris (`icono-balanza-gris.svg`), porque el peso no es una fecha. Es la misma balanza con el trazo en texto secundario (#55606E), el mismo color del texto "Peso" y del reloj de al lado. La balanza primaria (`icono-balanza.svg`) sigue en las cajas de regla de Detalle de curso, Faltas, Matrícula, Registrar nota y Simulación.
    - **Faltas de Cálculo II:**
      - La tarjeta de resumen lleva el estado "⚠ Margen reducido", la misma etiqueta de `estadoFaltas(2)`. Así la tarjeta y la alerta muestran el mismo estado. En la tarjeta estrecha de móvil, el estado puede ocupar dos líneas.
      - La alerta de Inicio conserva su título, "Te quedan 2 faltas en Cálculo II", que es la etiqueta de ejemplo de la sección 4.2 del informe. Baja a 20 px (18 px en móvil) para quedar por debajo de los títulos de sección; en Faltas sigue a 24 px.
      - Debajo del título, la alerta agrega una línea tranquila: "Puedes faltar 2 veces más sin perder el curso".
      - La alerta termina con un siguiente paso: el enlace "Ver mis faltas" y el botón "Registrar cambio de turno", que antes quedaba suelto debajo de ella.
  - **Crítica final (22 nov 2026):**
    - **Actividad vencida visible:** en la tarjeta "Actividades pendientes", "1 vencida" pasa de texto auxiliar a estado de riesgo con ícono ("⚠ 1 vencida"), porque es una situación académica. No se agrega una fila en "Próximas actividades": lo vencido no es próximo. La nota dice "Esta semana, sin contar la vencida", porque el 4 no la incluye (ver "Cambios de datos").
    - **Qué es el impacto:** se explica una vez, en el criterio de orden: "Ordenado por impacto = % de la nota por cada día que falta (peso ÷ días que faltan, mínimo 1 día)". Cada actividad sigue mostrando su cálculo.
    - **Qué significa cada estado:** debajo de "Mis cursos", un `<details>` "¿Qué significan los estados?" explica con palabras del estudiante las reglas en tres grupos, cada uno con su etiqueta (`.ayuda-grupo`): "Nota del curso" (`estadoCurso`: Asegurado, Con margen, Depende del final, En riesgo, Ya no alcanza 13), "Promedio general" (`estadoPromedioGeneral`: Situación estable) y "Faltas" (`estadoFaltas`: Margen holgado, Margen reducido, Última falta disponible, Sin faltas disponibles, Límite superado). Los estados de faltas van todos, no solo los que se ven en el ejemplo, porque Inicio muestra "Margen reducido" en el resumen de faltas.
    - **Tarjetas de resumen a 801 px:** con `flex: 1` sin base, las cuatro medían 112 px de ancho y el estado "Margen reducido" se partía. Ahora van en dos pares de base 416 px (dos tarjetas de 200 px y 16 px entre ellas), con el mismo margen negativo de `.columnas-ajustables`. Si los dos pares no caben en una fila, el segundo pasa abajo entero: 2 × 2, nunca 3 + 1. Medidas: a 1440 px, cuatro en fila de 272 px; a 801 px, 2 × 2 de 240 px, con los estados en una línea; a 390 px, 2 × 2 de 175 px, con la misma altura dentro de cada par.
    - **Filas de Mis cursos a 801 px:** el nombre quedaba en unos 150 px, "MAT-204" se cortaba y "Necesitas…" ocupaba 3 líneas. Ahora el estado y la nota van juntos en `.curso-resultado` y la fila tiene `flex-wrap: wrap` también en web. El nombre no baja de 240 px (`flex: 1000 1 240px`). Si la fila no cabe, el estado y la nota pasan juntos a una segunda línea, con el estado a la izquierda y la nota a la derecha, como en móvil. A 1440 px todo queda en una línea; a 801 px, los detalles y "Necesitas…" van en una línea cada uno.
    - **La cifra que decide manda:** cada fila dice "Necesitas **12,4** para llegar a 13" (9,1 y 11,6 en los otros cursos). La cifra va en `<strong>` a 20 px y peso 600 en primario oscuro (18 px en móvil), el estilo que antes tenía la nota actual. La nota actual pasa a dato de referencia: 16 px, peso 500, texto principal, con su etiqueta "Nota actual". El 13 se explica una sola vez, en el subtítulo del panel: "Situación académica del ciclo · En la UPC apruebas con 13 (escala de 0 a 20)".
    - **Sin la línea "Peso" en Inicio:** la fórmula del impacto ya lo muestra ("Impacto 10,0 = 10 % ÷ 1 día"). En Detalle de curso la línea se queda.
    - **"Ver actividad" y Taller 3 llevan a `curso.html#actividades`,** la sección de actividades de Detalle de curso, y no al inicio de la página.
    - **Mismo formato de vencimiento:** "Revisar primero" decía "vence hoy, 23:59" y la fila de Taller 3, "Hoy, 23:59". Ahora la tarjeta dice "Vence: Hoy, 23:59". Lleva "Vence:" porque sobre el fondo oscuro no hay reloj que lo indique.
    - **"Revisar primero" sin mayúsculas:** se quitó `text-transform: uppercase` de `.notificacion-etiqueta`, para que siga el tono del resto de las etiquetas.
    - **Sin #D6DEE7 como texto:** la descripción de "Revisar primero" (sobre #0F2A44) y el detalle del perfil de la columna lateral (sobre #15497A) usaban el token Divisor. Pasan a #FFFFFF, que está en la tabla.
    - **Borde de la alerta de faltas a 1 px** (Inicio y Faltas): con 2 px era el único borde grueso de Inicio y competía con "Revisar primero". Sigue en ámbar de atención (#8A5A00), con su título, su ícono y su texto.
- **Tokens y tipografía:**
  - Títulos de tarjeta: 18 px con peso 600 en Figma; aquí h3 de 20/18 px con peso 500.
  - Etiquetas de 14 px: peso 600 en Figma; aquí 500.
  - Textos de 12 px: aquí peso 400. El texto de los indicadores de estado pasa a Etiqueta (14 px con peso 500).
  - Descripciones de pantalla: 14 px en Figma; aquí cuerpo de 16 px.
  - Valores de las tarjetas de resumen: 24/20 px.
  - Espaciados de 12 px: aquí 8 px dentro de un bloque y 16 px entre bloques. Los de 2 px pasan a 4 px.
  - Radio de 10 px de J21: 8 px en tarjetas de actividad y controles, 12 px en tarjetas de curso y bloques grandes.
- **Barra de progreso:** el ancho del avance se fija con una clase por porcentaje (`.avance-67`), porque no se usa `style=""`.
- **Pantallas con solo mockup móvil** (Bienvenida y las de registro): en web llevan el menú lateral y el contenido en una columna centrada de `max-width: 480px`. Bienvenida no lleva navegación: su barra muestra la marca y "Estudiante" en las dos versiones.
- **Bienvenida (J9):**
  - Es la entrada de la app y "Continuar" lleva a `inicio.html`.
  - **Universidad: un select con la UPC elegida (HU-31, 22 nov 2026).** El escenario 1 de HU-31 pide elegir la universidad y confirmarla, y el 2, poder decir que no está en la lista. Por eso vuelve a ser un `<select>` con dos opciones: "Universidad Peruana de Ciencias Aplicadas (UPC)", elegida con `selected`, y "Mi universidad no está en la lista". A 390 px el nombre completo cabe en el select de 48 px de alto sin desbordar la página.
    - **"Mi universidad no está en la lista"** (escenario 2): con `change`, `js/bienvenida.js` muestra un `<fieldset>` "Reglas de tu universidad" (empieza con `display: none` y pasa a `block`) con dos campos: "Límite de faltas (% de sesiones)", un entero de 1 a 100 (expresión regular y `Number()`), y "Nota aprobatoria", de 0 a 20 con hasta dos decimales (`textoANota`). Si están vacíos o mal escritos, al continuar aparece el error con ⚠ junto a cada campo, borde de riesgo, `aria-invalid` y foco en el primero. Al volver a la UPC, el bloque se oculta y sus errores se borran.
    - **Limitación:** sin almacenamiento, las reglas escritas no llegan a las demás pantallas, que siguen con las de la UPC. Se pueden ingresar, pero no se aplican.
  - **Carrera es un dato fijo,** como "Turno actual" en Cambio de turno (`.dato-fijo`): tiene una sola opción real.
  - **El ciclo viene marcado en 5.º, el de Daniela (revisión de UX, 22 nov 2026).** Sin almacenamiento, el ciclo elegido no llega a Inicio, que siempre muestra "Ingeniería · 5.º ciclo". Si alguien elegía 1.º, la pantalla siguiente lo contradecía. Ahora el select empieza en 5.º ciclo con el atributo `selected` (el mismo recurso que `checked` en las casillas y botones de opción del prototipo) y basta pulsar "Continuar". Sigue siendo un select de 1.º a 10.º con la opción "Elige tu ciclo": si alguien vuelve a ella, `js/bienvenida.js` muestra "⚠ Elige tu ciclo actual.". La descripción dice "ULive carga las reglas de evaluación, faltas y matrícula de tu universidad. Elige tu universidad y confirma tu ciclo actual."
  - **La ayuda va debajo de Universidad** y está vinculada al select con `aria-describedby`: "Por ahora ULive solo tiene configuradas las reglas de la UPC: escala de 0 a 20 y límite de 25 % de faltas. Las reglas dependen de la universidad, no de la carrera."
  - **h1 "Te damos la bienvenida",** sin "a ULive": la marca ya está en la barra, y así "ULive" no queda sola en la segunda línea (pasaba a 1440 y a 390). No se usa "Bienvenida a ULive" porque tiene género y la app es para todos.
  - **Caja del escudo:** "No pedimos tu contraseña del portal" / "Tú registras tus cursos y notas. ULive no se conecta al portal." Ya no promete que los datos se guardan en el celular (HU-37 no está cubierta).
  - **Pendiente:** corregir J9 (muestra tres selects; el prototipo tiene dos, Universidad y Ciclo, y el bloque de reglas manuales) para que coincida con el prototipo.
- **Mis cursos (J11):**
  - Es una tabla en web y tarjetas en móvil, como Detalle de curso, Evaluaciones y Actividades. J11 es una lista. La tabla deja comparar los cursos por columnas: Curso, Nota actual, Necesitas y Faltas. Las cabeceras son cortas porque el caption ya define "Necesitas" ("la nota que te hace falta en las evaluaciones pendientes para llegar a 13"); con "Necesitas en lo que falta", la cabecera ocupaba 3 líneas a 801 px.
  - En web usa el ancho completo del contenido y no la columna de 480 px de las pantallas con solo mockup móvil, porque cuatro columnas no caben en 480 px.
  - El estado va debajo del nombre del curso, en la misma celda, como en las tarjetas móviles. Con una columna propia, la tabla no cabía justo por encima del punto de quiebre: a 801 px de ventana necesitaba unos 520 px y había 448. Por lo mismo, en esta tabla el texto de las celdas puede partirse (`white-space: normal` sobre el `nowrap` de `.estado` y `.cifra`), salvo "Te quedan N", que no separa el número de su frase, y las celdas llevan 8 px de relleno lateral en web.
  - La columna Faltas muestra primero lo que queda y debajo las usadas: "Te quedan 2" y "4 de 6". Es el lenguaje de la pantalla Faltas. J11 decía "4 de 6 faltas".
  - **Dos estados por curso (revisión de UX, 22 nov 2026):** bajo las faltas usadas va el estado del margen de faltas, con los nombres de `estadoFaltas`: "⚠ Margen reducido" en Cálculo II (te quedan 2) y "Margen holgado" con el escudo en Programación III y Física II, como en Inicio y en Faltas. El chip bajo el nombre habla de la nota; sin el segundo, el ⚠ de Cálculo II parecía decir solo eso, aunque también está justo de faltas.
  - **"Necesitas" es la cifra que manda:** usa la misma clase que en Inicio (`.curso-necesita-cifra`: 20 px, peso 600, #0F2A44; 18 px en móvil). La nota actual sigue a 16 px y peso 400, como dato de referencia.
  - **Qué significa cada estado:** al pie del panel va el mismo `<details>` "¿Qué significan los estados?" de Inicio, para quien llega a Mis cursos desde la navegación sin pasar por Inicio. Tiene los grupos "Nota del curso" y "Faltas" (todos los estados de `estadoFaltas`, porque la columna Faltas muestra dos de ellos). Sin "Situación estable", que es del promedio general y solo aparece en Inicio.
  - Solo el nombre de Cálculo II es un enlace, subrayado y de 44 px de alto, porque es el único curso con detalle en el prototipo. Programación III y Física II son texto.
  - Encima de la tabla hay un título de sección, "Cursos del ciclo", con la regla que usan las cifras: "Se aprueba con 13 · Límite de faltas: 25 % de las sesiones".
  - **"Agregar curso" va en la cabecera de la tabla y no al final.** Así sigue a la vista aunque la lista crezca: con 6 o 7 cursos, al final quedaría debajo de la barra inferior en móvil. Se aparta de la sección 4.2 del informe ("las acciones principales van al final") y de J11. **Pendiente:** corregir J11 y la sección 4.2 del informe para que coincidan con el prototipo.
  - "Simular matrícula del próximo ciclo" sigue al pie, como botón secundario.
  - "Depende del final" lleva el triángulo ⚠ y no el reloj del mockup, igual que en el resto de la app y en la regla de estados.
- **Registrar curso (J12, J24):**
  - Los pesos son campos editables, porque la pantalla recalcula la suma al cambiarlos. En el mockup eran texto.
  - Los pesos son `type="text"`. Con `type="number"`, el navegador bloquearía el envío con su propio aviso antes de que corra el script.
  - "Usar una plantilla" es un `<select>`. Al elegir "Ciencias con laboratorio" (HU-02), llena los pesos con `.value` y recalcula la suma.
  - Los pesos empiezan vacíos, así que la suma inicial es "Suma: 0 % · Falta asignar 100 %", en una caja neutra (borde #7D8B99, sin ícono). Con 100 % pasa a la caja segura de J12.
  - **Al guardar con una suma distinta de 100 %** (J24):
    - Se marca con "⚠ Revisa este peso" el último peso que el usuario cambió (o el examen final, si no cambió ninguno), con borde de riesgo y `aria-invalid="true"`, y se le devuelve el foco.
    - La caja muestra la diferencia ("Falta asignar 10 %." o "Sobran 10 %.") y lo ingresado se conserva.
  - Un peso que no es un entero de 0 a 100 muestra "⚠ Escribe un número entero de 0 a 100." junto al campo.
  - El nombre y las sesiones vienen con los valores del ejemplo. El mockup no muestra errores para ellos, así que no se validan.
  - **Sin "Nota objetivo" (22 nov 2026):** el campo no se usaba en ningún cálculo. La nota objetivo pasó a Simulación, donde sí cambia la nota necesaria (HU-09). La tarjeta se llama ahora "Faltas".
- **Tablas que en móvil son listas** (Detalle de curso, Evaluaciones, Actividades y Mis cursos):
  - Es una sola `<table>` con `<caption>`, `<thead>` y `<th>`. En móvil, `table`, `tbody` y `td` pasan a `display: block`, el `<thead>` se oculta y cada `<tr>` es un bloque (`display: flex` con `flex-wrap`) separado por un divisor de 1 px #D6DEE7 arriba, también el primero, que así queda separado del caption. Antes cada `<tr>` era una tarjeta con borde y radio dentro del panel, una tarjeta dentro de otra.
  - **Justo por encima del punto de quiebre (801 px)** las cuatro tablas desbordaban el panel y la página tenía desplazamiento horizontal. Sin agregar puntos de quiebre, se probó en orden: dejar que el texto se parta, juntar columnas y bajar el relleno lateral a 8 px, midiendo a 801 px después de cada paso:
    - Todas las celdas llevan 8 px de relleno lateral en web (antes 16 px).
    - Evaluaciones: el curso va bajo el nombre de la evaluación ("Evaluación / curso"), como en Actividades. Pasa de 589 a 448 px. En móvil conserva su línea "Curso: …". El curso (`.tabla-curso`) va en texto principal #1A2430 también en web: en primario y sin subrayado parecía un enlace, y no lo es (auditoría, 22 nov 2026).
    - Actividades: el estado va sobre la casilla "Entregada" ("Estado / acciones"), porque la casilla es la que lo cambia. Pasa de 588 a 448 px. En móvil sigue en su propia línea, antes de la casilla: "Estado:" y el indicador comparten la línea. `.estado-accion` es una fila flex con `flex-wrap` en web y en móvil; antes, en móvil era `display: block` y el indicador "Vencida" o "✓ Entregada" se estiraba a todo el ancho (311 px a 390 px de ventana, ahora 94 px). Los márgenes `auto` centran la etiqueta en alto junto al indicador.
    - Detalle de curso: sin columna Curso, porque todas las filas son del curso de la página (auditoría, 22 nov 2026). A 801 px, "Cálculo II" y las fechas ya no se parten en dos líneas.
    - La fecha lleva `white-space: nowrap`: a 801 px, el indicador de Resultado le quitaba ancho y "28 sep" se partía en Evaluaciones.
    - Mis cursos: ver "Mis cursos (J11)".
    - En Evaluaciones y Actividades no hizo falta dejar que el texto se parta: solo liberaba el `nowrap` de `.cifra` (8 px) y partía "25 %".
  - Cada celda lleva un `<span class="etiqueta-movil">` ("Fecha: ", "Nota: "…), oculto en web.
  - Diferencias con J14 y J15:
    - El resultado no va a la derecha del nombre, sino en la línea de fecha, nota y peso. Moverlo exigiría `order` o duplicar contenido.
    - Evaluaciones muestra el curso, que J15 omite, para no perder contenido al reducir el ancho. Detalle de curso no lo muestra, como J14.
  - **Resultado de cada evaluación** (Detalle de curso y Evaluaciones; auditoría, 22 nov 2026): antes era texto en primario #15497A sin ícono, distinto de los indicadores del resto de la app. Ahora usa los mismos indicadores de estado, dentro de `.estado-celda` (fila flex con la etiqueta móvil "Resultado:"):
    - **Aprobada** (`.estado-seguro`, escudo): la nota llega a la nota aprobatoria de `REGLAS_UPC` en `js/calculos.js` (13). Taller 2 (16), Parcial 1 (14) y Laboratorio 2 (18).
    - **Desaprobada** (`.estado-riesgo`, triángulo ⚠): la nota no llega a 13. Práctica 1 (12) y Quiz estructuras (9).
    - **Pendiente** (`.estado-neutro`, texto secundario, sin ícono): aún no tiene nota. Parcial 2 y Proyecto API. Es el mismo indicador neutro de "Pendiente" en Inicio y Detalle de curso.
    - Las tablas son HTML fijo con los datos del ejemplo; no hay función nueva en `calculos.js`, el estado sale de comparar cada nota con `REGLAS_UPC.notaAprobatoria`.
  - Detalle de curso muestra las 4 evaluaciones de Cálculo II en las dos versiones. J14 mostraba 2.
- **Detalle de curso (J2, J14):**
  - **Columnas que pasan abajo:** a 801 px, la columna lateral (Actividades) dejaba a Evaluaciones en 68 px y la tabla desbordaba. Ver "Columnas que pasan abajo" en las adaptaciones de la app.
  - El aviso "Depende del final" sale de la regla de estados. Lleva una línea de ayuda: "Con el redondeo, un promedio final de 12,50 ya cuenta como 13." La nota necesaria se sigue calculando para llegar a 13,00, que es la meta segura.
  - **Nota calculada y nota oficial (HU-13):** una caja informativa dice "Nota calculada 13,78 · nota oficial 14" y "Si el curso terminara así, tu nota oficial sería 14 (la UPC redondea desde 0,50)". El enlace "Ver regla (se abre en otra pestaña)" abre el reglamento con `target="_blank"`, como en Faltas.
  - "Taller 3" enlaza a Actividades, como en el prototipo móvil. Las otras actividades no tienen enlace.
  - "Registrar nota" va en web y en móvil.
- **Evaluaciones (J3, J15):**
  - **Filtros:** son tres `input type="radio"` dentro de un `<fieldset>` con `<legend>Mostrar</legend>`. Cada botón va dentro de su `<label>` de 44 px de alto, que es el área que se toca.
    - El estado elegido se ve con el punto del botón de opción y no con un color de fondo, porque `:checked` no está en la lista de técnicas.
    - Con `change`, `js/evaluaciones.js` recorre las filas y las oculta (`.style.display = 'none'`) o las devuelve a su estilo del CSS (`''`).
    - Un `<p role="status">` dice cuántas filas se muestran ("2 evaluaciones pendientes").
  - El acceso a la simulación va en un bloque al final ("¿Qué nota necesitas?") en las dos versiones. En J3 era un botón arriba a la derecha y en J15, un bloque al final.
- **Registrar nota (J13):**
  - La evaluación se elige entre las tres pendientes de Cálculo II. El examen final no tiene fecha en ningún mockup, así que va sin fecha.
  - La nota empieza vacía. Antes de guardar, la vista previa (`role="status"`) muestra el promedio con esa nota, el % evaluado, la nota necesaria ("Necesitarás 10,2…") y las evaluaciones que quedan. Sin nota válida, muestra la nota necesaria de hoy.
  - Si la nota no es válida, no se envía, aparece el error junto al campo y el foco vuelve a él. Si es válida, el formulario va a `curso.html`.
- **Simulación (J4, J16):**
  - Viene precargada con el escenario del mockup (Parcial 2, nota 15 y nota objetivo 13).
  - **Nota objetivo (HU-09, escenario 2):** un campo "Nota objetivo" que empieza en 13, la aprobatoria de la UPC, y se valida como las notas (`textoANota`). Al cambiarlo (`change`), `simularEvaluacion` recibe el objetivo y recalcula la nota necesaria: con 13, "Necesitas 10,2 en promedio en lo que falta para llegar a 13"; con 10, "Necesitas 0,2…"; con 16, "Ya no alcanzarías 16: necesitarías más de 20 en lo que falta". La caja "Contexto del cálculo" y la tarjeta "Nota necesaria · para llegar a…" muestran el objetivo escrito. El indicador de estado y "seguirías aprobando" siguen midiendo contra 13, porque dicen si apruebas, no si llegas a tu meta.
    - Si el objetivo no es válido, aparece el error con ⚠ junto al campo y, al simular, el foco va a él.
  - Al cambiar la evaluación o la nota, se recalculan el peso, la nota necesaria, el promedio proyectado y el indicador de estado. Hay tres indicadores (seguro, atención y riesgo) y el JS muestra solo el que corresponde, porque no se puede cambiar el `src` de una imagen.
- **Redondeo en el resultado de Simulación (HU-13):** debajo del promedio proyectado, una caja muestra la nota calculada con dos decimales y la nota oficial que daría, con `formatearCentesimas` y `notaOficial`:
  - De 12,50 a 12,99 avisa, en color de atención con ⚠: "Con el redondeo de la UPC, 12,60 se vuelve 13: aprobarías". Se prueba con 9,95 en el examen final.
  - De 12,00 a 12,49 avisa, en color de atención con ⚠: "Te faltarían 0,10 para que el redondeo te dé 13". Se prueba con 9,3 en el examen final.
  - En los demás casos es informativa: "Nota calculada 14,21 · nota oficial 14".
  - El anuncio con `role="status"` incluye ese aviso.
  - El promedio grande sigue con un decimal, como en el resto de la app; las dos cifras están en la caja.
- **Resultado de simulación (J5, J17): es un estado de `simulacion.html`, no una página aparte.**
  - **Por qué:** una página aparte solo podría mostrar un resultado fijo. Sin `localStorage` ni lectura de la URL, no hay forma de pasarle lo que escribió el usuario. Quien escribiera 18 vería un resultado calculado con 15, y en las pruebas de usabilidad eso sería un error. Se usa la misma solución que en la confirmación de la landing.
  - **Al enviar una nota válida:** `preventDefault()` (no hay servidor), se oculta el formulario y se muestra el bloque de resultado, que empieza con `display: none`. Todos sus valores se escriben con `textContent` a partir de lo que escribió el usuario: nota, evaluación, promedio proyectado, nota necesaria, peso, desglose, % que queda por evaluar e indicador de estado.
  - **Anuncio:** un `<p role="status">` que existe desde que carga la página (vacío y sin alto) recibe el resumen ("Resultado: si obtienes 18 en el examen final, tu nota acumulada sería 15,1…"), para que el lector de pantalla lo anuncie.
  - **"Nueva simulación"** (`type="button"`, evento `click`) vuelve a mostrar el formulario con los valores que tenía, vacía el anuncio y lleva el foco a la nota.
  - Se quitó "Cambiar datos" de J5, porque haría lo mismo que "Nueva simulación".
  - En el resultado, "Cómo se calculó" y "Contexto" son `h3`, porque el bloque lleva su propio `h2` ("Resultado de simulación").
  - Se borró `app/resultado.html`, y el `action` del formulario es `simulacion.html`.
- **Actividades (J7, J20):**
  - Es una tabla que en móvil es lista, con la misma técnica que Evaluaciones. Nombre y curso van en la misma celda, uno debajo del otro.
  - **Filtros** "Todas / Pendientes / Entregadas": botones de opción en un `<fieldset>` y `js/actividades.js`, igual que en Evaluaciones.
    - "Pendientes" incluye todo lo que no se ha entregado: "Pendiente", "En curso" y "Vencida".
    - Al cargar, ninguna actividad está entregada, así que "Entregadas" muestra "No hay actividades entregadas" en el `<p role="status">`.
  - **Marcar como entregada (HU-17):** cada fila (tarjeta en móvil) lleva una casilla "Entregada" dentro de su `<label>`, con área táctil de 44 px, como "Falta justificada".
    - Al cambiarla (`change`, `.checked`), `js/actividades.js` actualiza `entregada` en su array, cambia el estado de la fila a "✓ Entregada" (color seguro) o al estado anterior, y vuelve a aplicar el filtro elegido, con el conteo en el `role="status"`. Con el filtro "Pendientes", la fila marcada desaparece y el conteo baja. Al desmarcarla, vuelve a las pendientes.
    - Si el filtro oculta la fila que tenía el foco, el foco pasa a la siguiente casilla visible o, si no hay, al filtro elegido, para que no se pierda.
    - Como el texto "Entregada" se repite en cada fila, cada casilla lleva `aria-describedby` hacia el nombre de su actividad, para que el lector de pantalla diga cuál es. Es una extensión de las lecturas pre clase, que muestran `aria-describedby` en campos con error.
    - **Vencida:** una actividad sin entregar cuya fecha ya pasó (`diasDesdeHoy` < 0) muestra "Vencida" en color de riesgo, con ⚠ y texto. Si se marca, pasa a "✓ Entregada".
    - **Limitación:** la marca dura mientras la página está abierta. Guardarla entre páginas necesita almacenamiento local, fuera de las lecturas pre clase, igual que HU-37.
  - "Ordenar: Impacto ▾" es texto ("Primero las vencidas sin entregar; después, por impacto: peso en la nota entre días que faltan"), no un control. Las vencidas van arriba porque ya no se pueden entregar a tiempo y hay que decidir qué hacer con ellas.
  - **Botón por fila:** solo las actividades de Cálculo II lo llevan, porque el prototipo solo detalla ese curso. Dice "Ver curso" (en J7 decía "Ver") porque lleva al Detalle del curso y no a la actividad, y porque "Ver" solo no dice adónde va.
  - "Agregar actividad" (acción principal, acento) va en web y en móvil. En J7 no estaba.
- **Registrar actividad (J23):** `js/registrar-actividad.js`.
  - **Formulario vacío al empezar:**
    - El nombre tiene el placeholder "Ej. Informe de laboratorio 3" y la evaluación empieza en "Ninguna: sin peso registrado".
    - Al elegir la evaluación, el curso se completa solo con `.value`. La hora es opcional.
  - **Evaluación de la fórmula:** solo ofrece evaluaciones **pendientes**, agrupadas por curso con `<optgroup>`, porque a una evaluación ya calificada no se le registra una entrega.
  - **Peso opcional (HU-15, escenario 3; 22 nov 2026):** la evaluación es "(opcional)", como la hora. Si se deja en "Ninguna: sin peso registrado", la caja de impacto dice "Sin peso registrado · vence en 3 días · impacto 0,0: quedaría 8.º de 8 en Actividades": con peso 0 el impacto es 0 y queda después de las que pesan. Como entonces el curso no se completa solo, el curso pasa a ser obligatorio: sin él aparece "⚠ Elige el curso de la actividad." Al guardar se revisan curso, nombre y fecha, y el foco va al primero con error.
    - **Limitación:** la vista de Actividades no muestra la actividad nueva (no hay almacenamiento), así que "sin peso registrado" se ve en Registrar actividad y no en la lista de la semana.
  - **Caja de impacto** (`role="status"`, existe desde que carga la página): al cambiar la evaluación o la fecha (`change`) muestra el peso, los días que faltan, el impacto y la posición que tendría en Actividades.
    - Ejemplo: "Peso 15 % · vence en 3 días · impacto 5,0: quedaría 5.º de 8 en Actividades".
    - Usa `impacto` y `ordenarPorImpacto` con las seis actividades de ejemplo que aún se pueden entregar, y suma antes la vencida (Cuestionario 4), que en Actividades va primero. Si empata, va primero la que vence antes. Con el mismo impacto y los mismos días, la nueva queda después.
    - Cada cifra va en su propio `<span class="cifra">`.
    - Mientras falte la evaluación o una fecha válida, la caja muestra el criterio: "Elige la evaluación y la fecha para ver su peso e impacto…".
  - **Días que faltan:** se cuentan desde el "hoy" del prototipo, el martes 6 de octubre de 2026 (`HOY_PROTOTIPO` en `calculos.js`), no desde la fecha real del equipo.
    - Las fechas se construyen con `new Date(año, mes, día)` y se restan (`diasDesdeHoy`), para que la zona horaria no mueva el día.
    - El año, el mes y el día salen del texto "aaaa-mm-dd" del campo, leyendo sus caracteres por posición. Antes, una expresión regular comprueba el formato.
  - **Validación al guardar:** el nombre, la evaluación y la fecha son obligatorios, con "⚠", borde de riesgo y `aria-invalid`, y el foco va al primer campo con error.
    - Una fecha anterior a hoy da "⚠ Esa fecha ya pasó. Elige hoy (6 de octubre) o una fecha posterior." (HU-14, escenario 3). Este error aparece también al cambiar la fecha.
    - Si todo está bien, el formulario se envía a `actividades.html` (su `action`).
  - **Fecha y hora:** son dos campos, `type="date"` y `type="time"` (los dos están en la tabla de tipos de input de las lecturas pre clase), agrupados con `<fieldset>` y `<legend>`. En J23 era un solo selector.
- **Estado del margen de faltas** (`estadoFaltas` en `js/calculos.js`): en las pantallas de faltas, el indicador muestra el margen de faltas y no el estado de la nota. Usa los nombres de la guía de estilos ("margen de faltas holgado / reducido", "umbral superado"):

  | Estado | Condición (faltas que quedan) | Color e ícono |
  |---|---|---|
  | Margen holgado | 3 o más | Seguro, escudo |
  | Margen reducido | 2 | Atención, ⚠ |
  | Última falta disponible | 1 (la HU-23 pide avisar justo cuando queda una) | Riesgo, ⚠ |
  | Sin faltas disponibles | 0 (una más y el examen final se califica con cero) | Riesgo, ⚠ |
  | Límite superado | menos de 0 | Riesgo, ⚠ |

  - **Umbral de 3 faltas:** es una decisión de diseño. Está en la constante `UMBRAL_FALTAS_HOLGADO`.
  - **Faltas por curso:**
    - Cálculo II (2 restantes) muestra "Margen reducido", en el mismo color de atención que J6 y J18.
    - Programación III (5) y Física II (6) muestran "Margen holgado", en el mismo color seguro que J6 y J18.
    - Cambian las etiquetas, que en el mockup eran "Depende del final" y "Asegurado".
  - **J25:** con 1 falta restante, la caja usa el color de riesgo (última falta disponible), como en el mockup. La simulación de Registrar falta usa los mismos tramos.
- **Faltas (J6, J18):**
  - El aviso y las tres tarjetas son de Cálculo II, el curso con menos margen: "Te quedan 2 faltas en Cálculo II", "Registradas en Cálculo II". Para que ninguna cifra quede sin alcance claro, "Actuales" se queda en 4 y la etiqueta dice que es de Cálculo II.
  - Las tres tarjetas van en una fila también en móvil, como en J18.
  - La fila de Cálculo II lleva a Registrar o simular falta, como en el prototipo móvil. Las otras filas no tienen enlace.
  - "Consultar reglamento" abre la fuente del informe (`target="_blank"`) y lo dice en el texto: "(se abre en otra pestaña)".
  - En móvil, "Faltas por curso" va antes que la regla. En J18 iba después.
- **Registrar o simular falta (J19) y falta registrada (J25): J25 es un estado de `registrar-falta.html`, no una página aparte.**
  - **Por qué:** es el mismo motivo que en Simulación. J25 muestra la clase registrada, las faltas usadas y las restantes, y una página aparte solo podría mostrar las del mockup, aunque el usuario eligiera otra clase o marcara "Falta justificada". Por eso no existe `falta-registrada.html`.
  - **Curso:** solo se ofrece Cálculo II, porque el prototipo solo detalla las faltas de ese curso. La fecha de la falta de Programación III no aparece en ningún mockup.
  - **Clases:** las próximas tres según el horario de Cálculo II (Lun / Mié 08:00): Mié 7 oct, Lun 12 oct y Mié 14 oct. **Son casillas, no un select (HU-25, escenario 2; 22 nov 2026):** con un select solo se simulaba una falta y, con 4 de 6 usadas, nunca se llegaba al límite. Ahora van en un `<fieldset>` "Clases a las que faltaste o faltarías" y se pueden marcar varias. Empiezan sin marcar.
  - **Simulación** (`role="status"`, existe desde que carga la página): al marcar clases o "Falta justificada" (`change`), muestra cuántas faltas quedarían y pinta la caja según el margen. Ejemplos: "Si faltas el miércoles 7, te quedaría 1 falta"; con dos, "…no te quedaría ninguna falta"; con justificación, "…te seguirían quedando 2 faltas".
    - **Con las tres** se supera el límite, y la consecuencia aparece antes de registrar, en riesgo y con ícono: "Si faltas el miércoles 7, el lunes 12 y el miércoles 14, superarías el límite de 6 faltas · Llegarías a 7 faltas, más que las 6 permitidas: según la regla UPC, tu examen final se calificaría con cero. Simulación: aún no se guarda."
  - **Al registrar:**
    - Sin clases: "⚠ Marca al menos una clase a la que faltaste o faltarías.", con borde de riesgo en las tres opciones, `aria-invalid` en sus casillas y foco en la primera.
    - Con clases: `preventDefault()` (no hay servidor), se oculta el formulario y se muestra J25 con las clases marcadas (la lista tiene una fila por clase y el JS muestra solo las marcadas).
    - J25 incluye las faltas usadas y las restantes ("Faltas registradas" es un `h2`, para no saltar del `h1` al `h3`), la marca "Registrada hoy" (y "· justificada" si corresponde) y la consecuencia de la regla UPC. El `h1` pasa a "Faltas de Cálculo II".
    - Un `<p role="status">` resume el registro ("Falta registrada: Mié 7 oct · Teoría. Te queda 1 falta en Cálculo II." o, con varias, "Faltas registradas: …").
  - **"Deshacer el registro" (HU-21, escenario 3; 22 nov 2026):** botón secundario (`button type="button"` con `click`) en J25. Vuelve al formulario con las casillas sin marcar (`.checked = false`), el título y la descripción originales ("Cálculo II · 4 de 6 faltas usadas"), y la caja dice "Registro deshecho: sigues con 4 de 6 faltas usadas". El foco va a la primera clase y el `<p role="status">` lo anuncia.
  - **Falta justificada:** no se descuenta del margen, pero queda en la lista con la marca "justificada".
  - **"Simular otra clase"** recarga la página (enlace a `registrar-falta.html`). **"Volver a Faltas"** es un enlace a `faltas.html`.
  - Se quitaron los botones "Eliminar" de J25: no tenían ninguna acción, y un botón que no hace nada confunde.
  - La casilla "Falta justificada" va dentro de su `<label>`, que tiene más de 44 px de alto y es el área que se toca.
- **Cambio de turno (J21):** `js/cambio-turno.js`.
  - **Turno actual:** es un dato y no un campo (en el mockup no tenía flecha), así que va como texto debajo de su etiqueta.
  - **Nuevo turno:** un `<select>` que empieza en "Elige tu nuevo turno", como Registrar actividad. Solo ofrece el turno del mockup.
    - La opción dice "Jue 8 y vie 9 oct · mañana" y el horario ("Turno de mañana: 8:00 a. m. a 2:00 p. m.") va en una ayuda debajo, vinculada con `aria-describedby`. Un `<select>` no parte su texto en dos líneas, y a 390 px el texto completo del mockup quedaba cortado.
  - **Al elegir el turno** (`change`):
    - Se muestran los bloques "Lo que choca con tu nuevo turno" y "Espacios libres", que empiezan con `display: none` en el CSS.
    - La caja `role="status"` resume lo que choca: "Con este turno, 2 cosas chocan con tu semana".
  - **Clase de Física II (vie 9 oct, 8:00):** las faltas se calculan con `faltasPermitidas`, `faltasRestantes` y `estadoFaltas` (24 sesiones y 0 faltas usadas). El texto dice "usarías 1 de tus 6 faltas (te quedarían 5)".
    - El indicador es "Margen holgado" (seguro, escudo), porque le quedarían 5 faltas.
    - En el mockup era "Usaría 1 de tus 6 faltas", en color de atención y con reloj. Gana la regla.
  - **Informe de laboratorio (Laboratorio 3, 15 %, vence vie 9 oct):** "Tendrás menos tiempo", en color de atención, siempre con ⚠ y texto, en vez del reloj del mockup, igual que el resto de la app. Criterio: la entrega vence en un día del nuevo turno.
  - **Espacios libres:** botones de opción dentro de un `<fieldset>` con su `<legend>`. El primero viene elegido, como en J21. El elegido se ve por el punto del botón (no se usa `:checked`).
  - **Al guardar:** sin turno, aparece "⚠ Elige tu nuevo turno para guardar el plan." junto al campo, con borde de riesgo, `aria-invalid` y foco. Con turno, el formulario va a `actividades.html` (su `action`), porque, según el informe (4.5.2, wireflow de UF-05), el plan guardado se refleja en Actividades. "Cancelar" vuelve a Inicio (el Dashboard).
  - **Navegación:** Inicio queda como destino activo, como en J21.
- **Simulador de matrícula (J22):** `js/matricula.js`.
  - **Promedio ponderado (22 nov 2026):** es un campo, "Tu promedio ponderado", que empieza en 15,2 (el promedio proyectado de Inicio) y se valida como las notas (`textoANota`). Reemplaza la tarjeta fija "Tu promedio". Al cambiarlo (`change`), el tope se recalcula con `topeCreditos` y la selección se compara de nuevo:
    - **15,2 (más de 15):** tope 27, "Tu selección cabe en tu tope · Te quedan 5 créditos libres".
    - **Vacío (HU-33, escenario 2):** "Sin dato · promedio no registrado" en la tarjeta y "Promedio no registrado" en la caja (informativa), con los créditos elegidos. Al guardar, error junto al campo y foco en él.
    - **Entre 13 y 15, por ejemplo 14 (HU-32, escenario 3):** "Sin dato · regla no configurada" y "No podemos comparar tu selección con un tope". Se puede guardar, porque no hay tope con qué comparar.
    - **Menos de 13, por ejemplo 12 (HU-34, escenario 3):** tope 18. Los 22 créditos del ejemplo lo superan: "⚠ Tu selección supera tu tope · Te pasas por 4 créditos…", y al guardar no se envía. Quitando Cálculo III quedan 17 de 18 y cabe.
    - **Fuera de 0 a 20 o mal escrito:** "⚠ Escribe tu promedio ponderado, de 0 a 20 con hasta dos decimales (15,2 o 15.25).", con borde de riesgo y `aria-invalid`.
  - La regla UPC dice ahora también "Entre 13 y 15, la regla aún no está configurada."
  - **Cursos:** cada uno es un `input type="checkbox"` dentro de su `<label>`, agrupados en un `<fieldset>` con su `<legend>`. Vienen marcados los cinco del mockup (22 créditos), igual que Simulación viene precargada.
  - **Investigación de Operaciones** no se puede elegir. Como el atributo `disabled` no está en la lista de técnicas, va sin casilla, con borde punteado (`border-style: dashed`), texto secundario (#55606E) y el motivo: "No disponible: requiere Estadística II, que aún no apruebas".
    - No se usa `opacity`, aunque el mockup la tenía. Con 75 %, el texto #55606E quedaba cerca de 3,6:1 sobre blanco, por debajo del 4,5:1 de WCAG AA (lecturas pre clase). Además, `opacity` crea un contexto de apilamiento, y en móvil el curso se pintaba encima de la barra inferior fija.
  - **Al marcar o desmarcar** (`change`): `sumarCreditos` suma los créditos y se actualiza "Seleccionados: 22 de 27 créditos". La caja `role="status"` muestra el resultado:
    - "Tu selección cabe en tu tope · Te quedan 5 créditos libres" (seguro, escudo).
    - "⚠ Tu selección supera tu tope · Te pasas por N créditos…" (riesgo, ⚠). Con el tope de 27 no se llega (el máximo es 26 créditos); con un promedio menor a 13 (tope 18), sí.
    - "Aún no eliges cursos" (informativa), si no hay ninguno marcado.
  - **Al guardar:** sin cursos, o si se supera el tope, aparece el error junto a la lista con ⚠, borde de riesgo en la tarjeta, `aria-invalid` en las casillas y foco en la primera. Si está bien, el formulario va a `cursos.html` (su `action`), que es desde donde se llega.
  - **Promedio y tope:** el promedio va en su campo y el tope en una tarjeta resaltada debajo, en web y en móvil. En J22 eran dos tarjetas en fila; el promedio pasó a campo para poder cambiarlo.
- **Casillas y botones de opción (limitación):** usan el estilo del navegador, porque `accent-color` no está en la lista de técnicas. El color de la marca depende del navegador.
- **Notas con hasta dos decimales:** Registrar nota y Simulación aceptan notas de 0 a 20 con hasta dos decimales, con coma o con punto (15 · 15,5 · 15.75), porque el reglamento (art. 2.5.a) expresa las notas de cada evaluación con centésimas.
  - `textoANota` (en `calculos.js`) comprueba el formato con una expresión regular y `.test()`, y arma el número leyendo los caracteres por posición (parte entera y decimales), la misma lectura por posición que se usa para las fechas. No usa `.replace()`.
  - La ayuda dice "Nota de 0 a 20, hasta dos decimales (15,5 o 15.75)" y el error, "⚠ Escribe una nota de 0 a 20, con hasta dos decimales (15,5 o 15.75)".
- **Flecha propia en los select (revisión de UX, 22 nov 2026):** Chrome dibuja la flecha nativa a unos 4 px del borde, mientras el texto empieza a 16 px. Con la excepción `appearance: none` (ver "Técnicas y excepciones de la app"), `select.campo` usa una flecha de 16 px exportada a `img/flecha-select.svg` (trazo de 1,5 px en #1A2430, como los demás íconos), colocada con `background-image`, `background-repeat: no-repeat` y `background-position: right 16px center`.
  - `padding-right: 48px` = 16 (separación entre el texto y la flecha) + 16 (flecha) + 16 (de la flecha al borde). No es un valor nuevo de la escala: es la suma de tres valores de 16 px, simétrica con los 16 px del texto a la izquierda.
  - Aplica a los 9 selects de la app. A 390 px se probó la opción más larga de cada uno; la más ajustada es "Parcial 2 · 14 oct · peso 25 %" (Registrar nota): 210 px de texto en 243 px útiles.
  - El contorno de foco (3 px #15497A, separado 4 px) y el borde de error (1 px #B3261E) se siguen viendo, con la flecha en su sitio.
  - **Límite:** la lista desplegada la sigue dibujando el sistema operativo. Chrome no aplica `border` ni `padding` a las `<option>`, así que no se les puede poner borde.
- **Borde de error de 1 px (revisión de UX, 22 nov 2026):** en los formularios de la app, el error pasaba el borde a `2px solid #B3261E`. El campo crecía 2 px y todo lo de abajo saltaba. Ahora el JS cambia solo `.style.borderColor` a #B3261E, como en la landing, y el borde se queda en 1 px. Al corregir, `borderColor = ''` devuelve el color del CSS. El error sigue teniendo texto con ⚠, borde rojo, `aria-invalid="true"` y foco en el campo. Aplica a Bienvenida (ciclo y reglas manuales), Registrar curso (pesos), Registrar nota, Registrar falta (opciones de clase), Registrar actividad (curso, nombre y fecha), Matrícula (promedio y tarjeta de la lista de cursos), Cambio de turno (nuevo turno) y Simulación (nota esperada y nota objetivo).
- **Foco visible en `select` y `textarea`:** se agregaron a la regla `:focus-visible` de `base.css` porque antes no incluía ni `select` ni `textarea`. La landing no tiene ninguno de los dos, así que no cambia.

## Técnicas y excepciones de la app

Las técnicas usadas son conceptos extraídos de las lecturas pre clase del curso.

| Técnica | Archivo |
|---|---|
| `picture` y `source media` para los íconos de la navegación | app/inicio.html |
| `aria-label` en el `<nav>` principal | app/inicio.html |
| `aria-current="page"` en el destino activo (extensión de las lecturas pre clase) | app/inicio.html |
| `:nth-child(odd)` en la cuadrícula móvil del resumen | css/app.css |
| Funciones, `var`, `const`, `if`, bucles `for` y `while`, objetos, arrays y `Math.round` | js/calculos.js |
| `form` con `action` hacia la pantalla siguiente; `select`, `option` y `label for` | app/bienvenida.html, app/registrar-curso.html |
| `addEventListener` con `change` y `submit`, `e.preventDefault()` solo si hay error, `.value`, `.trim()`, `.textContent`, `.style`, `.focus()` | js/bienvenida.js, js/registrar-curso.js |
| `.style.borderColor` para marcar el error (el borde se queda en 1 px, como en la landing) | js/bienvenida.js, js/registrar-*.js, js/matricula.js, js/cambio-turno.js, js/simulacion.js |
| `option` con `selected` para la universidad (UPC) y el ciclo del ejemplo (5.º), como `checked` en las casillas | app/bienvenida.html |
| `fieldset` y `legend` para las reglas manuales; expresión regular con `.test()` y `Number()` para el límite de faltas | app/bienvenida.html, js/bienvenida.js |
| Expresión regular con `.test()` para validar los pesos | js/registrar-curso.js |
| `table`, `caption`, `thead`, `tbody`, `tr`, `th`, `td` | app/curso.html, app/evaluaciones.html, app/cursos.html |
| `border-collapse` y `vertical-align` en tablas | css/app.css |
| `input type="radio"` dentro de `fieldset` y `legend` | app/evaluaciones.html |
| `switch` y `change` en los filtros | js/evaluaciones.js, js/actividades.js |
| `input type="checkbox"` dentro de su `label` (clases y Falta justificada) y `.checked`, también para desmarcarlas al deshacer | app/registrar-falta.html, js/registrar-falta.js |
| `a` con `target="_blank"` (Consultar reglamento) | app/faltas.html |
| `input type="date"` y `type="time"` en un `fieldset`, `select` con `optgroup` | app/registrar-actividad.html |
| `new Date(año, mes, día)` y resta de fechas; lectura de caracteres por posición | js/calculos.js, js/registrar-actividad.js |
| `button type="button"` con el evento `click` (Nueva simulación, Deshacer el registro) | app/simulacion.html, js/simulacion.js, app/registrar-falta.html, js/registrar-falta.js |
| `white-space: nowrap` en `.cifra`, para que una cifra y su "%" no se separen | css/app.css |
| `simularEvaluacion` y `formatearDecimal` (funciones puras) | js/calculos.js |
| Validación de 0 a 20, vista previa y resultado estimado con `change` y `submit` | js/registrar-nota.js, js/simulacion.js |
| `aria-describedby`, `aria-invalid` (cambiado con `.setAttribute()`) y `role="status"` en la suma y en el aviso de plantilla | app/bienvenida.html, app/registrar-curso.html, js/*.js |
| `:focus-visible` con `outline` y `outline-offset`, también en `select` y `textarea` | css/base.css |
| `background-image`, `background-repeat` y `background-position` para la flecha de los select | css/app.css |
| `input type="radio"` (espacios libres) e `input type="checkbox"` (cursos) dentro de su `label`, en un `fieldset` con `legend` | app/cambio-turno.html, app/matricula.html |
| `.checked` para leer casillas (las lecturas pre clase leen y marcan casillas con `checked` en jQuery; aquí es lo mismo sin librería) | js/registrar-falta.js, js/matricula.js |
| `topeCreditos`, `sumarCreditos`, `faltasPermitidas`, `faltasRestantes` y `estadoFaltas` (funciones puras) | js/calculos.js, js/cambio-turno.js, js/matricula.js |
| `border-style: dashed` en el curso que no se puede elegir | css/app.css |
| Casilla "Entregada" con `change` y `.checked`; `aria-describedby` hacia el nombre de la actividad (extensión de las lecturas pre clase) | app/actividades.html, js/actividades.js |
| `notaOficial`, `formatearCentesimas`, `redondearCentesimas` y `textoANota` (funciones puras) | js/calculos.js |
| Lectura de caracteres por posición también en las notas (`textoANota`), después de comprobar el formato con `.test()` | js/calculos.js |
| `a` con `target="_blank"` hacia el reglamento (Ver regla) | app/curso.html |

- **Navegación fija:** `position: sticky; top: 0;` en el contenido de la columna lateral (web) y `position: sticky; bottom: 0;` en la barra inferior (móvil). En `html`, `scroll-padding-top: 8px` y, en móvil, `scroll-padding-bottom: 80px` (72 px de barra + 7 px del contorno de foco, redondeado), para que el elemento con foco no quede debajo de la barra.
  - **Pantallas bajas:** con `@media screen and (max-height: 500px)`, `.lateral-contenido` pasa a `position: static`. En un celular en horizontal (874 × 402) o una laptop con zoom, el menú lateral es más alto que la ventana y, fijo, dejaba la tarjeta del perfil cortada hasta llegar al final de la página; así se desplaza con ella. Es la misma técnica de `@media` de la lista, aplicada al alto, y solo desactiva la excepción sticky. No toca `.lateral`: la barra inferior móvil sigue fija.
- **`appearance: none`** en `select.campo` (css/app.css): quita la flecha nativa del select, que Chrome dibuja a unos 4 px del borde y que no se mueve con `padding`, para poner una flecha propia a 16 px con `background-image` y `background-position` (técnicas de las lecturas pre clase). No aparece en las lecturas pre clase; se aprobó para los selects.
- **`Number()`** (excepción mínima): convierte en número el texto de los pesos (`js/registrar-curso.js`), de las notas (`js/registrar-nota.js` y `js/simulacion.js`) y del año, el mes y el día de la fecha de entrega (`js/registrar-actividad.js`).
- **`toLocaleString('es', ...)`** (excepción mínima, en `formatearDecimal`): muestra las cifras calculadas con coma (14,2). Se usa `'es'` y no `'es-PE'` porque, en Chrome, `'es-PE'` da "14.2", ya que los datos de idioma de Perú usan punto decimal.
- **`display: none`** (excepción mínima):
  - **En el CSS:**
    - Bloques repetidos: la marca y el perfil están en la columna lateral (web) y en la barra superior (móvil). En cada versión se oculta la copia que sobra.
    - En móvil, la ruta y el ciclo: el mockup móvil no los muestra y en web son secundarios.
    - Tablas que en móvil son listas: el `<thead>` se oculta en móvil y el `<span class="etiqueta-movil">` de cada celda se oculta en web.
    - Bloques que empiezan ocultos y que el JS muestra:
      - El resultado de Simulación.
      - J25 en Registrar falta.
      - Las reglas manuales de Bienvenida.
      - Los choques y los espacios libres de Cambio de turno.
      - Los íconos de estado que no corresponden (clase `icono-oculto`).
  - **Desde JavaScript (`.style.display`):**
    - Evaluaciones y Actividades: los filtros ocultan filas con `'none'` y las devuelven con `''`.
    - Registrar curso: muestra el escudo o la alerta de la caja de suma (`'block'` / `'none'`).
    - Registrar nota: oculta los espacios de "Quedan…" que no se usan.
    - Simulación: muestra solo el indicador de estado que corresponde y alterna entre el formulario y el resultado (`'none'`, `'block'` y `''`).
    - Registrar actividad: en la caja de impacto, alterna entre el criterio ("Elige la fecha…") y las cifras (`'none'` / `'inline'`).
    - Registrar falta: muestra el ícono del tono en la simulación y en J25, alterna entre el formulario y J25 (también al deshacer) y muestra en J25 solo las filas de las clases marcadas.
    - Bienvenida: muestra u oculta las reglas manuales (`'block'` / `'none'`).
    - Cambio de turno: al elegir el turno, muestra los choques y los espacios libres, y el ícono del estado de faltas.
    - Simulador de matrícula: muestra el ícono de la caja (seguro, riesgo o informativa).
- **Redondeo hacia arriba:** se hace sin `Math.ceil`, con `Math.round` y una comparación (`redondearArribaDecimal`).
- **Redondeo de la nota final no configurado (HU-13, escenario 3):** `notaOficial` devuelve "sin dato" si la universidad no tiene `redondeoFinal`, y Simulación mostraría solo el valor exacto con "Tu universidad no tiene configurado el redondeo de la nota final". En el prototipo solo está configurada la UPC, así que no se ve en pantalla, igual que el tramo "sin dato" del tope de créditos.
- **Tope de créditos con promedio entre 13 y 15:** `topeCreditos` devuelve "sin dato", porque esa regla no está configurada (HU-32, escenario 3). El Simulador de matrícula lo dice en pantalla en vez de suponer un tope; se ve escribiendo un promedio entre 13 y 15.

## 30 HU core implementadas

Las 28 de la tabla de pantallas más HU-13 y HU-17. Cada una se puede verificar en la versión publicada. HU-47 reemplaza a HU-27 (Reprogramar una actividad), que no cumplía ningún escenario; Cambio de turno sigue en el prototipo por HU-28.

| HU | Pantalla donde se verifica |
|---|---|
| HU-01 | Registrar curso |
| HU-02 | Registrar curso (plantilla) |
| HU-07 | Registrar nota |
| HU-08 | Inicio, Mis cursos, Detalle de curso, Evaluaciones |
| HU-09 | Mis cursos, Detalle de curso, Simulación (nota objetivo) |
| HU-10 | Detalle de curso, Simulación |
| HU-11 | Evaluaciones, Simulación |
| HU-12 | Inicio, Mis cursos |
| HU-13 | Detalle de curso, Simulación (nota calculada y nota oficial) |
| HU-14 | Registrar actividad |
| HU-15 | Actividades, Registrar actividad (sin peso registrado) |
| HU-16 | Inicio, Actividades |
| HU-17 | Actividades (marcar como entregada, vencida) |
| HU-20 | Registrar curso |
| HU-21 | Registrar o simular falta (con Deshacer) |
| HU-22 | Inicio, Faltas |
| HU-23 | Registrar o simular falta |
| HU-24 | Faltas |
| HU-25 | Registrar o simular falta (varias clases, límite superado) |
| HU-28 | Cambio de turno |
| HU-31 | Bienvenida (universidad y reglas manuales) |
| HU-32 | Faltas, Simulador de matrícula (promedio entre 13 y 15) |
| HU-33 | Simulador de matrícula (promedio editable) |
| HU-34 | Simulador de matrícula (tope 18 con promedio menor a 13) |
| HU-36 | Bienvenida |
| HU-43 | Landing |
| HU-44 | Landing |
| HU-45 | Landing |
| HU-47 | Inicio (margen de faltas al abrir), Registrar nota (vista previa al instante) |
| HU-48 | Inicio; barra inferior sin desborde a 320 px |
