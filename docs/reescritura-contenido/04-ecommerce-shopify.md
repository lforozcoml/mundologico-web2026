# 04. Página /productos/ecommerce-shopify (borrador de contenido)

Estado: borrador de Claude para aprobación de Federico (2026-11-06). La página se construye con `noindex` y sin entrar al sitemap hasta que Federico cambie la bandera `PUBLICADO` en `src/content/data/ecommerce-shopify.ts`.
Reglas: sin em dashes, sin precios, sin cifras de ventas, sin promesas de crecimiento, sin afirmar capacidades que no estén en producción. Todo texto con [A DEFINIR] NO se renderiza: se deja fuera o detrás de una bandera en false.

## Metadatos
- title: Desarrollo de e-commerce en Shopify (se añade " | Mundo Lógico")
- description: Tiendas Shopify bien construidas y conectadas a tu operación: pedidos, pagos y atención. Desarrollo a la medida, optimización y soporte mensual en Colombia.
- H1: Una tienda en Shopify que vende bien y no complica tu operación

## 1. Hero (actualizado 2026-11-06)
Eyebrow (texto pequeño, no encabezado): Desarrollo de e-commerce en Shopify
H1: Una tienda en Shopify que vende bien y no complica tu operación
Subtítulo: Cuando una tienda crece, aparecen los pedidos copiados a mano, los pagos que no cuadran y la atención que no da abasto. Construimos y optimizamos tiendas en Shopify pensando en lo que pasa después de la compra.
CTA principal: Agenda una llamada de 20 minutos →  (CALENDARIO_URL)
CTA secundario: Ver cómo revisamos una tienda (ancla #revision, sección Revisión de tienda)
Línea de apoyo: Sin costo. Revisamos tu caso y te decimos si podemos ayudarte.
Segunda línea de apoyo: Desarrollamos tiendas en Shopify desde 2022, con operación en pesos y en dólares.
Leyenda bajo la captura (se compone con los datos de la tienda visible): <nombre>: tienda desarrollada por Mundo Lógico. <desde>.
  Hoy: Parchita: tienda desarrollada por Mundo Lógico. Desde 2022.
Etiquetas flotantes: Pedidos, Medios de pago, Atención al cliente.

## 2. Tres formas de trabajar contigo (actualizado 2026-11-06)
Intro: Cada negocio llega en un punto distinto. Puedes empezar una tienda nueva, mejorar la que ya vende o dejar su mantenimiento en manos de un equipo que conoce tu operación.

### 1. Tienda desde cero
- Título: Construimos tu tienda
- Para quién: Para negocios que van a vender en línea por primera vez o que quieren rehacer su tienda sobre bases sólidas.
- Descripción: Diseñamos y desarrollamos tu tienda en Shopify pensando, desde el inicio, en el catálogo, los pagos, los envíos y la forma en que se conectará con tu operación.
- Qué recibes:
  - Arquitectura del catálogo: colecciones, filtros y atributos.
  - Diseño y desarrollo sobre Shopify, pensado para celular y escritorio.
  - Medios de pago y envíos de tu mercado, en una o varias monedas.
  - Lanzamiento con la cuenta, el dominio y los datos a nombre de tu empresa.
- Enlace: Ver cómo lo hacemos (#como-trabajamos)

### 2. Tienda existente
- Título: Optimizamos tu tienda
- Para quién: Para tiendas que ya venden, hechas por nosotros o por otro equipo, y que rinden menos de lo que podrían.
- Descripción: Empezamos con una Revisión de tienda en seis frentes, sin tocar nada sin tu aprobación. Con los hallazgos priorizamos y mejoramos primero lo que más impacto tiene.
- Qué recibes:
  - Informe en lenguaje de negocio, no solo técnico.
  - Hallazgos priorizados por impacto y esfuerzo.
  - Plan a 30, 60 y 90 días.
  - Ejecución de las mejoras que decidas, con alcance acordado por escrito.
- Enlace: Ver los seis frentes (#revision)

### 3. Soporte mensual
- Título: Cuidamos tu tienda
- Para quién: Para tiendas en operación que necesitan un equipo de confianza para corregir, ajustar y evolucionar.
- Descripción: Un paquete mensual de horas de trabajo para mantener la tienda sana y mejorarla de forma continua.
- Qué recibes:
  - Correcciones y ajustes dentro del paquete de horas.
  - Seguimiento de la tienda.
  - Primera respuesta en horario hábil.
  - Funcionalidades nuevas cotizadas aparte, con alcance acordado por escrito.
- Enlace: Ver cómo funciona (#soporte)

Cierre: Después de cualquiera de las tres, podemos conectar la operación de tu tienda. (PENDIENTE: texto nuevo)
Ayuda: (PENDIENTE: texto y CTA)
Peldaños de la escalera: Revisión, Proyecto, Soporte, Operación.

## 3. Revisión de tienda (id: revision, actualizado 2026-11-06)
H2: Revisión de tienda: dónde se te escapan ventas, y qué corregir primero
Intro: Una tienda puede recibir visitas y aun así vender menos de lo esperado. A veces el problema está en el pago, a veces en la velocidad, en apps que se estorban o en procesos manuales detrás de la tienda. Revisamos seis frentes y te decimos cuál pesa más.

Esquema del recorrido (reemplaza el hexágono):
- Título: El recorrido de tu cliente, y dónde mira cada frente
- Nota: Los números del esquema corresponden a las tarjetas.
- Etiquetas de tarjeta: "Qué revisamos" y "Qué te dejamos claro".
- Frentes 1 a 4 son etapas del recorrido (nodos con flechas); 5 y 6 son capas (barras de ancho completo).

Seis frentes, en el orden del recorrido:

1. SEO técnico (etapa: Te encuentran)
   Pregunta: ¿Google entiende tu tienda y la muestra a quien busca lo que vendes?
   Qué revisamos: Títulos y descripciones de productos y colecciones. / Estructura de colecciones y enlaces internos. / Datos estructurados e indexación.
   Qué te dejamos claro: Qué te impide aparecer en las búsquedas y qué corregir primero.

2. Velocidad y celular (etapa: Navegan)
   Pregunta: ¿Tu tienda carga rápido y se compra fácil desde el celular?
   Qué revisamos: Tiempos de carga en celular. / Imágenes, apps y código que la frenan. / Uso del menú, los filtros y las fichas de producto.
   Qué te dejamos claro: Qué hace lenta o incómoda la tienda y qué arreglar primero.

3. Conversión (etapa: Compran)
   Pregunta: ¿Dónde se cae la compra?
   Qué revisamos: El recorrido de sesión, carrito, pago y compra, paso a paso. / Fricciones en el pago y en los medios de pago. / Páginas de producto y carrito.
   Qué te dejamos claro: En qué paso pierdes más clientes y qué cambios probar.

4. Operación detrás de la tienda (etapa: Después de comprar)
   Pregunta: ¿Cuánto trabajo manual genera cada pedido?
   Qué revisamos: Cómo pasa un pedido del pago a la bodega. / Conciliación de pagos y facturación. / Atención al cliente e inventario.
   Qué te dejamos claro: Qué tareas repites a mano y cuáles se pueden automatizar.

5. Apps y costos (capa: En toda la tienda)
   Pregunta: ¿Pagas por apps que no necesitas?
   Qué revisamos: Qué apps tienes instaladas y qué hace cada una. / Cuáles se solapan o duplican funciones. / Cuáles frenan la tienda.
   Qué te dejamos claro: Qué dejar, qué cambiar y qué quitar.

6. Analítica y cumplimiento (capa: En todo el recorrido)
   Pregunta: ¿Puedes confiar en tus números?
   Qué revisamos: Que la medición esté bien configurada. / El consentimiento de cookies. / Las políticas de la tienda.
   Qué te dejamos claro: Si tus números son confiables y si el consentimiento y las políticas están bien implementados.

Qué recibes al final: Un informe en lenguaje de negocio, con hallazgos priorizados por impacto y esfuerzo, y un plan a 30, 60 y 90 días.

Plan (tres tarjetas):
1. Primeros 30 días. Lo que más impacto tiene con menos esfuerzo: correcciones que se notan pronto.
2. Días 31 a 60. Mejoras que requieren más trabajo de desarrollo o de configuración.
3. Días 61 a 90. Cambios de fondo y, si aplica, conectar la operación detrás de la tienda.

Nota: Trabajamos con acceso de colaborador y permisos mínimos. No cambiamos nada sin tu aprobación.
CTA: Agenda una llamada de 20 minutos →  (CALENDARIO_URL)
Apoyo: La llamada no tiene costo. Ahí definimos si la revisión es lo que tu tienda necesita.
(El embudo ilustrativo se eliminó.)

## 4. (Eliminada 2026-11-06: "Tienda desde cero: qué incluye" se fusionó en Cómo trabajamos)

## 5. Más que una tienda que vende: una operación que puedes leer
En el código (export operacion, actualizado 2026-11-06; sigue sin renderizarse mientras los módulos estén en false):
- Título: Operación conectada: que vender no genere trabajo manual
- Intro: Según el caso, conectamos tu tienda con lo que pasa después de la compra:
- Nota: Cada módulo se muestra solo si lo tenemos funcionando en un cliente.
Idea de la sección: una tienda no solo vende, también produce información. Conectamos lo que pasa antes, durante y después de la compra para que tú y tu equipo vean el negocio completo, y puedan actuar a tiempo.
Cada tarjeta es un atributo con bandera (todas en false hasta tener un cliente en producción que lo use). Si ninguna está en true, la sección entera no se renderiza.

1. Tablero que responde preguntas de negocio. [bandera: ATRIBUTO_TABLERO = false]
   Texto: Diseñamos tu tablero a partir de las preguntas que de verdad importan en tu negocio, no de los datos que casualmente hay. Pedidos, pagos, inventario y atención en una sola vista.
   Ejemplos de preguntas (sin cifras): ¿Cuánto tarda un pedido desde el pago hasta el despacho? ¿Qué clientes vuelven a comprar? ¿Qué pagos quedaron sin conciliar?
2. Radar de fricción. [bandera: ATRIBUTO_FRICCION = false]
   Texto: Un pago fallido, un carrito abandonado, un pedido atascado o una pregunta que se repite no son incidentes sueltos: son señales. Las detectamos y las convertimos en alertas y en una lista de qué corregir primero.
3. Una sola versión de cada pedido. [bandera: ATRIBUTO_PEDIDO = false]
   Texto: Ventas, bodega, atención y cliente ven el mismo estado del pedido, sin copiar datos entre hojas, correos y mensajes.
4. Atención que conoce al cliente. [bandera: ATRIBUTO_AGENTE = false]
   Texto: Un agente de IA que responde con información real de tus pedidos y pasa el caso a una persona cuando hace falta.
5. Conciliación de medios de pago. [bandera: ATRIBUTO_CONCILIACION = false]
   Texto: Cuadrar cada pasarela con lo que recibió el negocio, sin hojas de cálculo.
6. Avisos antes del problema. [bandera: ATRIBUTO_PREVENTIVO = false]
   Texto: Reglas que avisan cuando el inventario baja de un mínimo, un pedido lleva demasiado tiempo sin despacharse o hay pagos sin cuadrar.
7. Tus datos son tuyos. [siempre visible: es política, no capacidad]
   Texto: Tu tienda, tus datos y tus cuentas quedan a nombre de tu empresa. Documentamos dónde vive cada dato, quién puede verlo y cómo te lo llevas si algún día decides irte.
8. Informe mensual. [bandera: ATRIBUTO_INFORME = false] (solo con soporte mensual)
   Texto: Cada mes, una página con lo que pasó en tu operación, lo que aprendimos y lo que sigue.
Nota visible: Cada capacidad aparece aquí solo cuando la tenemos funcionando en un cliente.

## 6. Cómo trabajamos (id: como-trabajamos, actualizado 2026-11-06)
H2: Cómo trabajamos: sabes qué sigue en cada paso
Intro: Cada paso tiene un resultado claro. El camino cambia si tu tienda es nueva o ya existe.
Pestañas (patrón ARIA, "Tienda nueva" activa por defecto). Formato: Paso | Qué hacemos | Qué recibes.

Tienda nueva:
1. Alcance | Entendemos tu negocio y definimos qué debe lograr la tienda. | Propuesta escrita con alcance y cronograma
2. Diseño | Definimos catálogo, navegación y diseño de la tienda. | Diseño para tu aprobación
3. Desarrollo | Construimos en Shopify: pagos, envíos, monedas, SEO de base y analítica. | Avances que puedes revisar
4. Pruebas | Probamos compra, pagos, envíos, medición y cookies, en celular y escritorio. | Lista de verificación
5. Lanzamiento | Publicamos con tu dominio y tus cuentas, y capacitamos a tu equipo. | Capacitación y documentación
6. Soporte (opcional) | Seguimos con un paquete mensual de horas. | Primera respuesta en horario hábil

Tienda que ya tienes:
1. Acceso | Definimos qué se revisa y entramos como colaborador con permisos mínimos. | Alcance por escrito
2. Revisión | Analizamos los seis frentes de tu tienda. | Hallazgos priorizados
3. Plan | Te explicamos los hallazgos en lenguaje de negocio. | Informe y plan a 30, 60 y 90 días
4. Mejoras | Ejecutamos lo que decidas, empezando por lo de más impacto. | Cambios con alcance por escrito
5. Soporte (opcional) | Seguimos con un paquete mensual de horas. | Primera respuesta en horario hábil

Confianza: Tus cuentas, tu dominio y tus pasarelas siempre quedan a nombre de tu empresa.
Sin CTA en esta sección. (No se muestran tiempos.)

## 7. Soporte mensual (id: soporte, actualizado 2026-11-06)
H2: Soporte mensual: tu tienda sigue cuidada después del lanzamiento
Intro: Un paquete mensual de horas con un equipo que ya conoce tu tienda.
Dentro del paquete de horas: Correcciones / Ajustes / Seguimiento de la tienda
Se cotiza aparte: Funcionalidades nuevas, con alcance acordado por escrito.
Cómo respondemos: Primera respuesta en horario hábil, de lunes a viernes, hora de Colombia.
Ilustración (decorativa, sin números): "Tu paquete mensual de horas", barra en tres segmentos (Correcciones, Ajustes, Seguimiento) y aparte, con borde punteado, "Funcionalidades nuevas: se cotizan aparte".
CTA: Hablemos del soporte de tu tienda → (calendario)
Apoyo: La llamada de 20 minutos no tiene costo.
Por definir (no se muestra): tamaños o precios de paquetes, número de horas, canales de atención, informes mensuales, tiempos de resolución.

## 1B. Franja de logos (bajo el hero, actualizado 2026-11-06)
Texto: Tiendas que hemos desarrollado
Logos de las tiendas visibles que tengan logo: Parchita, Autollantas y Formex. Fila estática, sin enlaces ni animación. En gris con opacidad 0.7, a color en hover. Si hay menos de 2 logos, la franja no se muestra.

## 8. Tiendas que hemos desarrollado  (id: tiendas, actualizado 2026-11-06)
Título: Tiendas que hemos desarrollado
Intro: Negocios que nos confiaron el desarrollo de su tienda en Shopify.
Tarjetas compactas ("Ver tienda" en las tres desde 2026-11-06): logo, nombre, desde, servicios, descripción, cifra (solo si está activa) y "Ver tienda" (solo si mostrarEnlace y hay url).
Consentimiento para nombre y logo de las tres tiendas confirmado por Federico, 2026-11-06. Las tres verificadas como Shopify.
- Parchita (parchita.com.co y parchita.co). Desde 2022. Servicios: Desarrollo, Soporte mensual. Tienda completa en Colombia (pesos) y EE.UU. (dólares), con soporte mensual. autorizado: true. mostrarEnlace: true. Logo: /tiendas/logos/parchita.png (164 x 40). Dato: más de 20.000 pedidos en los últimos 12 meses (corte 5 de noviembre de 2026). Cifra: bandera aparte `mostrarCifraParchita = false` hasta confirmar con el cliente.
- Autollantas (autollantas.com.co). Desde 2023. Servicios: Desarrollo. Tienda de llantas con búsqueda por vehículo y por medida. autorizado: true. mostrarEnlace: true. Logo: /tiendas/logos/autollantas.png (377 x 57).
- Formex (formex.com.co). Desde 2022. Servicios: Desarrollo. Tienda de insumos de refrigeración y aire acondicionado. autorizado: true. mostrarEnlace: true. Logo: /tiendas/logos/formex.png (195 x 36).

## 8B. Autodiagnóstico de operación (futuro; bandera AUTODIAGNOSTICO = false)
Seis preguntas de sí, a medias o no: ¿tus datos de ventas, pagos e inventario se ven juntos? ¿Los pedidos siguen reglas claras o dependen de una persona? ¿Las señales llegan a quien debe actuar? ¿Las alertas se convierten en tareas? ¿Tus áreas ven el mismo estado de un pedido? ¿Lo que aprendes de un error queda documentado? Resultado: un perfil y una sugerencia de siguiente paso. No se construye en el Lote 1.

## 9. Preguntas frecuentes (id: preguntas, respuestas en párrafos, actualizado 2026-11-06)
Cada respuesta se muestra como párrafos separados. En el JSON-LD (FAQPage) los párrafos se unen con un espacio.

### ¿La tienda, el dominio y los datos quedan a mi nombre?
Sí. La cuenta de Shopify, el dominio, las pasarelas de pago y la información de tus clientes y pedidos pertenecen a tu empresa. Configuramos todo bajo tus cuentas y trabajamos con acceso de colaborador.

Si en algún momento decides continuar con otro equipo, basta con retirar nuestro acceso. La tienda no depende de nosotros para operar.

### ¿Qué pasa después del lanzamiento? ¿Dan soporte?
Sí. El soporte mensual funciona por paquetes de horas de trabajo y cubre correcciones, ajustes y seguimiento de la tienda. Atendemos en horario hábil, de lunes a viernes, hora de Colombia, y la primera respuesta se da dentro de ese horario.

Las funcionalidades nuevas o los desarrollos de mayor alcance no consumen el paquete de horas: se definen y se cotizan aparte, con un alcance acordado por escrito.

### ¿Trabajan con tiendas que ya existen?
Sí. Muchas tiendas llegan a nosotros ya construidas, por nuestro equipo o por otros. Para esos casos hacemos una Revisión de tienda en seis frentes y entregamos un plan priorizado a 30, 60 y 90 días, con lo que conviene corregir primero y por qué.

Para revisarla solo necesitamos acceso de colaborador con los permisos mínimos necesarios. No tocamos nada sin tu aprobación.

### ¿Se conecta con mi sistema de facturación o ERP?
Depende de tu sistema. Si tiene API o un conector disponible, normalmente es posible. En el diagnóstico definimos qué información debe viajar entre la tienda y tu sistema (pedidos, inventario, clientes, facturas), en qué dirección y con qué frecuencia.

Para la facturación electrónica ante la DIAN, conectamos la tienda con el proveedor tecnológico autorizado que ya uses o el que elijas.

Si tu sistema no permite integración, te lo decimos desde el inicio y proponemos una alternativa realista en lugar de prometer algo que no se puede sostener.

### ¿Cuánto cuesta y cuánto tarda?
Depende del alcance: tamaño del catálogo, integraciones, mercados y monedas, contenido que ya tengas y nivel de personalización. Por eso no publicamos un precio único.

Después de una conversación inicial te entregamos una propuesta escrita con alcance, entregables, supuestos, exclusiones, cronograma y criterios de aceptación. Así sabes qué recibes y cuándo antes de comprometerte.

### ¿Qué necesito tener listo para empezar?
Lo básico es tu marca (logo y colores), tu catálogo (productos, precios y fotos), la documentación legal de tu empresa para activar las pasarelas de pago, tus definiciones de envío y una persona con capacidad de decisión que sea nuestro punto de contacto.

Si algo de esto aún no está definido, lo trabajamos contigo al inicio del proyecto.

### ¿En qué se diferencian de una agencia que solo diseña la tienda?
Una tienda que se ve bien es el punto de partida. Nosotros además diseñamos cómo se conecta con tu operación: pedidos, pagos, inventario y atención al cliente.

También definimos desde el inicio qué indicadores necesitas para tomar decisiones con tus propios datos. El objetivo es que la tienda no solo venda, sino que te permita leer el negocio.

### ¿Qué medios de pago y envíos se pueden configurar?
Configuramos las pasarelas de pago y las opciones de envío disponibles en Shopify para tu país, según lo que elijas para tu negocio.

Si manejas varios medios de pago, evaluamos contigo cómo automatizar la conciliación para que cuadrar ventas y recaudos deje de ser un proceso manual.

### ¿Se puede vender en varios países o en varias monedas?
Sí. Shopify permite operar en múltiples mercados y monedas. Lo que define el alcance real es la combinación de pasarelas de pago, impuestos y envíos de cada mercado, y eso lo revisamos en el diagnóstico.

Hemos operado tiendas en más de un mercado y moneda.

## 10. Cierre (banda final, actualizado 2026-11-06)
Título: ¿Tienes una tienda en Shopify o vas a abrir una?
Descripción: Agenda una llamada de 20 minutos. Revisamos tu caso y te decimos qué conviene hacer primero y si podemos ayudarte.
CTA principal: el del CtaBand por defecto (Agenda una llamada de 20 minutos →).
CTA secundario: Ver preguntas frecuentes (#preguntas)

## Orden de secciones (actualizado 2026-11-06)
Hero, franja de logos, Tres formas, Revisión de tienda (#revision), Operación conectada (solo con módulos activos), Tiendas que hemos desarrollado (#tiendas), Cómo trabajamos (#como-trabajamos), Soporte mensual (#soporte), Preguntas frecuentes (#preguntas), banda final.
