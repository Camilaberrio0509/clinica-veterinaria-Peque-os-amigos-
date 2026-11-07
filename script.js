/**
 * ============================================================================
 * VETSALUD - LÓGICA INTERACTIVA Y SEMIOLOGÍA DE PERROS Y GATOS
 * Proyecto Académico de Medicina Veterinaria | 2026
 * Ponente: MV Simón Quintero
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnatomyModule();
  initTriageSimulator();
  initDiseaseFilters();
  initQuizModule();
  initScrollEffects();
  initImageOfflineFallbacks();
});

/* ==========================================================================
   1. NAVEGACIÓN Y MENÚ RESPONSIVO
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Menú Móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sombra al hacer scroll en cabecera
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Resaltado de sección activa según scroll (Spy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. ATLAS ANATÓMICO INTERACTIVO: PERROS Y GATOS (360°)
   ========================================================================== */
const anatomyAtlas = {
  "perro": {
    "cuerpo": {
      "image": "images/anatomy/perro-cuerpo.jpg",
      "title": "Perro &bull; Regiones Clínicas Externas",
      "subtitle": "Puntos de exploración semiológica, auscultación y morfología exterior",
      "items": [
        {
          "id": "cabeza",
          "num": 1,
          "name": "Cabeza Canina",
          "x": 18,
          "y": 22,
          "tag": "Región 1 &bull; Cabeza",
          "subtitle": "Órganos sensoriales, cavidad oral y vías aéreas superiores",
          "location": "Extremo anterior del cuerpo, articulada con el cuello en la unión occipitoatloidea.",
          "function": "Aloja el encéfalo, órganos sensoriales (visión, olfato, audición), realiza la masticación y aprehensión con 42 piezas dentales.",
          "clinical": "Exploración de mucosas orales (TLLC < 2 s), revisión dental de cálculo y periodontitis, palpación de nódulos linfáticos mandibulares y simetría facial.",
          "welfare": "El cepillado dental con pasta veterinaria previene dolor crónico, bacteriemia y fístulas oronasales; evitar collares que causen presión ocular en braquicéfalos."
        },
        {
          "id": "cuello",
          "num": 2,
          "name": "Cuello y Canal Yugular",
          "x": 28,
          "y": 34,
          "tag": "Región 2 &bull; Cuello",
          "subtitle": "Tráquea, esófago, glándula tiroides y acceso vascular",
          "location": "Entre la cabeza y el tórax; comprende 7 vértebras cervicales, musculatura braquiocefálica y el surco yugular.",
          "function": "Soporte flexible de la cabeza, conducción de aire traqueal y bolo alimenticio esofágico, y retorno venoso yugular.",
          "clinical": "Palpación traqueal para provocar el reflejo tusígeno en colapso traqueal (tos en graznido de ganso); punción de vena yugular para tomas de muestras sanguíneas.",
          "welfare": "Usar arnés pectoral en lugar de collar en razas miniatura propensas a colapso de tráquea (Chihuahua, Caniche, Pomerania)."
        },
        {
          "id": "torax",
          "num": 3,
          "name": "Tórax y Área Cardiorrespiratoria",
          "x": 42,
          "y": 46,
          "tag": "Región 3 &bull; Tórax",
          "subtitle": "Focos cardíacos, campos pulmonares y 13 pares de costillas",
          "location": "Entre el cuello y el diafragma, delimitado por 13 vértebras torácicas, costillas y el esternón.",
          "function": "Aloja el corazón y los pulmones; genera la presión negativa torácica indispensable para la respiración.",
          "clinical": "Auscultación de focos cardíacos en hemitórax izquierdo (PAM: Pulmonar 3.º, Aórtico 4.º, Mitral 5.º espacio intercostal) y derecho (Tricúspide 4.º). Frecuencia normal: 60-160 lpm.",
          "welfare": "Detección precoz de soplos mitrales en razas predispuestas (Cavalier, Poodle) antes de la insuficiencia cardíaca congestiva."
        },
        {
          "id": "abdomen",
          "num": 4,
          "name": "Abdomen Canino",
          "x": 58,
          "y": 44,
          "tag": "Región 4 &bull; Abdomen",
          "subtitle": "Tracto gastrointestinal, hígado, bazo, riñones y vejiga",
          "location": "Entre el diafragma y la entrada pélvica; pared muscular ventral y lateral.",
          "function": "Digestión, absorción de nutrientes, metabolismo hepático, detoxificación y excreción urinaria.",
          "clinical": "Palpación abdominal suave bimanual para detectar dolor (abdomen agudo), organomegalia, cuerpos extraños intestinales, distensión gástrica o cálculos.",
          "welfare": "Prevención del Síndrome de Dilatación-Vólvulo Gástrico (DVG) en razas grandes: evitar ejercicio vigoroso inmediatamente después de comer o beber en exceso."
        },
        {
          "id": "extremidades",
          "num": 5,
          "name": "Extremidades y Locomoción",
          "x": 34,
          "y": 72,
          "tag": "Región 5 &bull; Extremidades",
          "subtitle": "Miembros torácicos (60% peso) y miembros pelvianos (propulsión)",
          "location": "Miembros anteriores suspendidos por musculatura sinsarcósica; miembros posteriores articulados con la pelvis.",
          "function": "Locomoción cuadrúpeda digitígrada, soporte del peso, equilibrio, salto y aceleración.",
          "clinical": "Inspección de aplomos y marcha al paso y trote; test de cajón para ligamento cruzado craneal de rodilla; prueba de Ortolani para displasia de cadera.",
          "welfare": "Control de peso estricto y ejercicio moderado regular para prevenir y mitigar la artrosis en perros senior."
        },
        {
          "id": "almohadillas",
          "num": 6,
          "name": "Pata, Almohadillas y Uñas",
          "x": 88,
          "y": 75,
          "tag": "Región 6 &bull; Apoyo Podal",
          "subtitle": "Almohadillas digitales, carpianas/tarsianas y estuche ungueal",
          "location": "Porción distal de la extremidad canina (manos y pies).",
          "function": "Amortiguación de impactos, tracción antideslizante, disipación de calor por glándulas sudoríparas ecrinas y protección digital.",
          "clinical": "Inspección de cortes, cuerpos extraños (espigas), pododermatitis interdigital, quemaduras térmicas por asfalto caliente y longitud de uñas.",
          "welfare": "Corte de uñas periódico cada 3-4 semanas respetando el lecho vascular ('quick') para evitar deformaciones posturales."
        }
      ]
    },
    "musculos": {
      "image": "images/anatomy/perro-musculos.jpg",
      "title": "Perro &bull; Sistema Muscular Completo",
      "subtitle": "Miología canina: función biomecánica, ubicación anatómica y semiología clínica",
      "items": [
        {
          "id": "masseter",
          "num": 1,
          "name": "Músculo Masetero (Masseter)",
          "x": 20,
          "y": 20,
          "tag": "Cabeza &bull; Músculo Masticador",
          "subtitle": "Potente músculo elevador de la mandíbula",
          "location": "En la cara lateral de la rama de la mandíbula, extendiéndose desde el arco cigomático hasta la fosa masetérica.",
          "function": "Eleva y cierra la mandíbula con gran fuerza para triturar alimentos y morder; estabiliza la articulación temporomandibular.",
          "clinical": "Es el músculo principal afectado en la miositis de los músculos masticatorios (enfermedad inmunomediada por anticuerpos anti-fibra 2M), produciendo trismo e imposibilidad de abrir la boca.",
          "welfare": "El dolor masticatorio agudo provoca anorexia inmediata; la higiene dental previene abscesos de muelas carniceras con tumefacción en esta zona."
        },
        {
          "id": "temporalis",
          "num": 2,
          "name": "Músculo Temporal (Temporalis)",
          "x": 19,
          "y": 12,
          "tag": "Cabeza &bull; Músculo Craneal",
          "subtitle": "El músculo masticador más voluminoso",
          "location": "Ocupa toda la fosa temporal en la cara dorsolateral del cráneo, insertándose en el proceso coronoides mandibular.",
          "function": "Cierra la boca con máxima potencia y mantiene la mandíbula apretada en la prensión de objetos y alimento.",
          "clinical": "Su atrofia bilateral visible ('cabeza afinada') es un marcador semiológico clave de desnutrición avanzada, caquexia tumoral, hiperadrenocorticismo o miositis masticatoria crónica.",
          "welfare": "La pérdida de masa temporal debe alertar al clínico sobre dolor crónico en boca o enfermedad sistémica consuntiva."
        },
        {
          "id": "buccinator",
          "num": 3,
          "name": "Músculo Bucinador (Buccinator)",
          "x": 14,
          "y": 19,
          "tag": "Cabeza &bull; Músculo Facial",
          "subtitle": "Forma la pared muscular de la mejilla",
          "location": "En la cara lateral del rostro entre los bordes alveolares del maxilar y la mandíbula.",
          "function": "Mantiene el bolo alimenticio entre las arcadas dentales durante la masticación y retrae la comisura labial.",
          "clinical": "Se paraliza en la parálisis del nervio facial (VII par craneal), provocando caída del labio, babeo continuo y acúmulo de alimento en el vestíbulo bucal.",
          "welfare": "Requiere limpieza facial diaria en pacientes neurológicos para evitar dermatitis perioral por maceración salival."
        },
        {
          "id": "sternocephalicus",
          "num": 4,
          "name": "Músculo Esternocefálico (Sternocephalicus)",
          "x": 26,
          "y": 27,
          "tag": "Cuello &bull; Musculatura Ventral",
          "subtitle": "Delimitador ventral del canal yugular",
          "location": "Discurre a lo largo de la cara ventrolateral del cuello, desde el manubrio esternal hasta el hueso occipital y mastoides.",
          "function": "Flexiona la cabeza y el cuello hacia abajo (en contracción bilateral); rota e inclina la cabeza hacia el mismo lado (contracción unilateral).",
          "clinical": "Delimita el borde ventral del surco yugular; su palpación revela contracturas dolorosas en meningitis-arteritis sensible a esteroides (SRMA) y discopatías cervicales.",
          "welfare": "Evitar tirones bruscos con collares en la tráquea y el cuello ventral para proteger este complejo muscular y nervioso."
        },
        {
          "id": "cleidocephalicus",
          "num": 5,
          "name": "Cleidocefálico / Braquiocefálico (Cleidocephalicus)",
          "x": 28,
          "y": 35,
          "tag": "Cuello y Hombro &bull; Conexión Cérvico-Brquial",
          "subtitle": "Principal músculo protráctil del miembro anterior",
          "location": "Se origina en la intersección clavicular fibrosa vestigial y se extiende hacia el cuello craneal y cráneo.",
          "function": "Tracciona el miembro torácico hacia adelante (protracción) alargando la zancada; inclina y extiende el cuello lateralmente.",
          "clinical": "Evaluado en cojeras del tren anterior; contracturas o desgarros limitan la fase craneal del paso.",
          "welfare": "Los calentamientos previos al ejercicio intenso protegen este puente muscular en perros de agilidad y canicross."
        },
        {
          "id": "omotransversarius",
          "num": 6,
          "name": "Músculo Omotransverso (Omotransversarius)",
          "x": 32,
          "y": 28,
          "tag": "Cuello &bull; Musculatura Escapular",
          "subtitle": "Conector entre el atlas y la escápula",
          "location": "Banda muscular que discurre desde el ala del atlas (primera vértebra cervical) hasta el acromion de la escápula.",
          "function": "Adelanta el miembro torácico y flexiona lateralmente el cuello.",
          "clinical": "Cubre de forma superficial al linfonodo cervical superficial (preescapular); su palpación precisa es obligatoria en oncología veterinaria.",
          "welfare": "La inflamación del nódulo bajo este músculo puede ser la primera señal de metástasis o infección dérmica regional."
        },
        {
          "id": "trapezius",
          "num": 7,
          "name": "Músculo Trapecio (Trapezius)",
          "x": 36,
          "y": 24,
          "tag": "Espalda &bull; Musculatura Toraco-Cervical",
          "subtitle": "Músculo plano y triangular de fijación escapular",
          "location": "Cubre la región dorsal del cuello y del tórax craneal, insertándose en toda la espina de la escápula.",
          "function": "Eleva la extremidad anterior, fija la escápula contra el tórax y ayuda a bascular el hombro hacia adelante o atrás.",
          "clinical": "Punto de referencia dorsal en la palpación de la cruz; presenta mialgias por sobrecarga en perros con cojeras compensatorias contralaterales.",
          "welfare": "Los arneses deben permitir el libre deslizamiento escapular sin comprimir las inserciones del trapecio."
        },
        {
          "id": "deltoid",
          "num": 8,
          "name": "Músculo Deltoides (Deltoid)",
          "x": 34,
          "y": 39,
          "tag": "Hombro &bull; Articulación Escapulohumeral",
          "subtitle": "Flexor y abductor lateral del hombro",
          "location": "En la cara lateral de la articulación del hombro, con dos porciones (escapular y acromial) que convergen en la tuberosidad deltoidea del húmero.",
          "function": "Flexiona la articulación del hombro y abduce el brazo (lo separa del cuerpo hacia afuera).",
          "clinical": "Se explora en contracturas infraspinosas y deltoideas en perros de caza, las cuales provocan rotación externa característica de la mano.",
          "welfare": "El estiramiento pasivo en fisioterapia restaura el rango articular del hombro tras inmovilizaciones quirúrgicas."
        },
        {
          "id": "latissimus_dorsi",
          "num": 9,
          "name": "Músculo Dorsal Ancho (Latissimus dorsi)",
          "x": 46,
          "y": 35,
          "tag": "Tórax &bull; Musculatura Dorsolateral",
          "subtitle": "Gran abanico muscular retropulsor",
          "location": "Amplia lámina muscular triangular en el dorso y pared costal lateral, convergiendo en la cara medial del húmero.",
          "function": "Tracciona el miembro anterior hacia atrás (retropulsión) y flexiona el hombro; si el miembro está fijo, arrastra el tronco hacia adelante.",
          "clinical": "Interviene de forma secundaria en la respiración forzada; su integridad es vital para nadar y galopar.",
          "welfare": "La tensión en este músculo es muy común en perros con lordosis o dolor lumbar crónico compensatorio."
        },
        {
          "id": "intercostals",
          "num": 10,
          "name": "Músculos Intercostales (Intercostals)",
          "x": 49,
          "y": 45,
          "tag": "Tórax &bull; Musculatura Respiratoria",
          "subtitle": "Motores de la expansión y retracción costal",
          "location": "Ocupan los 12 espacios intercostales a cada lado del tórax; se dividen en externos (oblicuos caudoventrales) e internos.",
          "function": "Los intercostales externos elevan y expanden las costillas en la inspiración; los internos deprimen las costillas en la espiración activa.",
          "clinical": "En perros con dificultad respiratoria (disnea) o neumotórax, se evidencia un marcado esfuerzo intercostal y retracción paradójica.",
          "welfare": "La presencia de 'respiración forzada intercostal' es una emergencia veterinaria inmediata (Código Rojo)."
        },
        {
          "id": "pectoralis",
          "num": 11,
          "name": "Pectoral Mayor y Menor (Pectoralis)",
          "x": 41,
          "y": 56,
          "tag": "Tórax &bull; Suelo Ventral del Pecho",
          "subtitle": "Aductores del miembro anterior y soporte del tronco",
          "location": "En el suelo del pecho, extendiéndose desde el esternón hasta el húmero y fascia del brazo.",
          "function": "Aducen los miembros anteriores (juntan las patas hacia el centro) y suspenden el peso corporal entre ambas extremidades anteriores.",
          "clinical": "Sitio de impacto directo en caídas frontales o atropellos; se revisa en traumatismos torácicos y hernias diafragmáticas.",
          "welfare": "Un pecho musculado protege los órganos intratorácicos; la natación es un ejercicio terapéutico de bajo impacto para este grupo."
        },
        {
          "id": "rectus_abdominis",
          "num": 12,
          "name": "Recto del Abdomen (Rectus abdominis)",
          "x": 57,
          "y": 58,
          "tag": "Abdomen &bull; Pared Ventral",
          "subtitle": "La cincha muscular longitudinal del vientre",
          "location": "A ambos lados de la línea alba, extendiéndose desde el cartílago xifoides y costillas hasta el tendón prepúbico.",
          "function": "Flexiona la columna vertebral, sostiene las vísceras abdominales y genera la presión necesaria para defecar, orinar y parir.",
          "clinical": "La línea alba que une ambos rectos es la vía de abordaje quirúrgico por excelencia para laparotomías, cesáreas y esterilizaciones (OVH).",
          "welfare": "Los cuidados postoperatorios de la herida en línea alba son cruciales para evitar dehiscencias y eventraciones."
        },
        {
          "id": "obliques",
          "num": 13,
          "name": "Oblicuos Abdominales (External & Internal Obliques)",
          "x": 57,
          "y": 40,
          "tag": "Abdomen &bull; Pared Lateral",
          "subtitle": "Capas musculares cruzadas de compresión abdominal",
          "location": "Cubren los flancos laterales del abdomen con fibras dispuestas en direcciones opuestas para máxima resistencia mecánica.",
          "function": "Comprimen y protegen el contenido visceral abdominal; ayudan en la espiración forzada y arqueo del tronco.",
          "clinical": "En peritonitis o hemoperitoneo agudo, se produce una contracción refleja espasmódica conocida como 'abdomen en tabla'.",
          "welfare": "La palpación indolora de los flancos confirma la relajación y ausencia de dolor visceral agudo."
        },
        {
          "id": "biceps_brachii",
          "num": 14,
          "name": "Bíceps Braquial (Biceps brachii)",
          "x": 29,
          "y": 54,
          "tag": "Brazo &bull; Cara Craneal",
          "subtitle": "Flexor del codo y estabilizador del hombro",
          "location": "En la cara craneal del húmero, naciendo en el tubérculo supraglenoideo y cruzando el surco intertubercular.",
          "function": "Flexiona la articulación del codo y extiende/estabiliza la articulación del hombro.",
          "clinical": "Tenosinovitis bicipital muy común en razas de trabajo (Labrador, Golden, Pastor Alemán), causante de cojera anterior que empeora tras el reposo.",
          "welfare": "El calentamiento y evitar paradas bruscas en juegos de persecución de pelotas reducen la incidencia de tendinopatías bicipitales."
        },
        {
          "id": "triceps_brachii",
          "num": 15,
          "name": "Tríceps Braquial (Triceps brachii)",
          "x": 34,
          "y": 50,
          "tag": "Brazo &bull; Cara Caudal",
          "subtitle": "El extensor principal y sostén del codo",
          "location": "Gran masa muscular con 4 cabezas (larga, lateral, medial y accesoria) que se insertan en la tuberosidad del olécranon.",
          "function": "Es el músculo extensor indispensable del codo; sin él, la pata anterior se colapsaría por el peso del cuerpo.",
          "clinical": "Inervado por el nervio radial; su parálisis provoca incapacidad absoluta de extender el codo y apoyo sobre el dorso de la mano.",
          "welfare": "El tono tricipital es un indicador excelente de vitalidad y fuerza muscular en el examen neurológico canino."
        },
        {
          "id": "gluteals",
          "num": 16,
          "name": "Músculos Glúteos (Gluteals)",
          "x": 63,
          "y": 34,
          "tag": "Pelvis &bull; Región de la Grupa",
          "subtitle": "Motores primarios de extensión de cadera",
          "location": "Sobre el ala del ilion, insertándose en el trocánter mayor del fémur (glúteos superficial, medio y profundo).",
          "function": "Extienden y abducen la articulación coxofemoral; aportan el empuje propulsor principal en el galope y salto.",
          "clinical": "Punto anatómico de inyección intramuscular profunda (con aguja dirigida cranealmente); se atrofian marcadamente en displasia de cadera.",
          "welfare": "La fisioterapia acuática y caminatas en pendientes suaves ayudan a regenerar masa glútea en perros con displasia coxofemoral."
        },
        {
          "id": "hamstrings",
          "num": 17,
          "name": "Isquiotibiales (Hamstrings: Bíceps Femoral, Semitendinoso)",
          "x": 69,
          "y": 47,
          "tag": "Muslo &bull; Cara Caudal",
          "subtitle": "Complejo flexor de rodilla y propulsor de carrera",
          "location": "Cara caudal del muslo, originándose en la tuberosidad isquiática y descendiendo hacia la tibia y calcáneo.",
          "function": "Extienden la cadera, flexionan la rodilla y extienden el tarso; generan la máxima potencia propulsora.",
          "clinical": "Al administrar inyecciones intramusculares caudales se debe evitar el nervio ciático que discurre por debajo de este grupo.",
          "welfare": "La contractura del músculo gracilis o semitendinoso genera una marcha espasmódica con rotación interna de la rodilla."
        },
        {
          "id": "quadriceps",
          "num": 18,
          "name": "Cuádriceps Femoral (Quadriceps femoris)",
          "x": 63,
          "y": 50,
          "tag": "Muslo &bull; Cara Craneal",
          "subtitle": "El extensor más potente de la rodilla",
          "location": "Envuelve las caras craneal, lateral y medial del fémur, insertándose en la rótula (patella) y cresta tibial.",
          "function": "Extiende vigorosamente la articulación de la rodilla; indispensable para pararse, caminar y correr.",
          "clinical": "Se explora mediante el reflejo rotuliano (nervio femoral); su atrofia severa acompaña a la rotura del ligamento cruzado craneal.",
          "welfare": "Mantener cuádriceps tonificados previene la inestabilidad de la articulación de la rodilla y la luxación de rótula."
        },
        {
          "id": "gastrocnemius",
          "num": 19,
          "name": "Músculo Gastrocnemio (Gastrocnemius)",
          "x": 68,
          "y": 72,
          "tag": "Pierna &bull; Cara Caudal",
          "subtitle": "Gemelos y tendón común del calcáneo (Aquiles)",
          "location": "Nace en las tuberosidades supracondíleas del fémur y se inserta en el tubérculo del calcáneo.",
          "function": "Extiende la articulación del tarso (corvejón) y asiste en la flexión de la rodilla.",
          "clinical": "La rotura o desinserción del tendón calcáneo común provoca apoyo plantígrado patológico (el corvejón toca el suelo).",
          "welfare": "Las cirugías reconstructivas del tendón de Aquiles requieren inmovilización temporal estricta para una cicatrización fibrosa óptima."
        },
        {
          "id": "digital_extensors_flexors",
          "num": 20,
          "name": "Extensores y Flexores Digitales",
          "x": 35,
          "y": 76,
          "tag": "Antebrazo y Pata &bull; Musculatura Distal",
          "subtitle": "Control fino del apoyo y movimiento de los dedos",
          "location": "A lo largo de los huesos radio/ulna y tibia hacia las falanges de los dedos.",
          "function": "Extienden y flexionan las falanges digitales; absorben el impacto inicial en el aterrizaje de cada paso.",
          "clinical": "Se evalúan en cortes de tendones por vidrios en la calle y en contracturas digitales congénitas o traumáticas.",
          "welfare": "Proteger las patas en terrenos rocosos o con hielo y sal industrial evita lesiones tendinosas distales."
        },
        {
          "id": "hindpaw_muscles",
          "num": 21,
          "name": "Músculos Intrínsecos de la Pata y Almohadillas",
          "x": 88,
          "y": 72,
          "tag": "Pata &bull; Estructura Podal Detallada",
          "subtitle": "Almohadillas plantares, interóseos y garras",
          "location": "En el metatarso y falanges de los dedos posteriores (mostrado en el recuadro inferior derecho).",
          "function": "Amortiguación hidrostática de impacto, dispersión de carga y estabilidad biomecánica de los dedos.",
          "clinical": "Las almohadillas no cicatrizan como la piel común; las laceraciones profundas requieren suturas de alivio de tensión especiales.",
          "welfare": "Examinar almohadillas tras paseos para retirar semillas adheridas o brea que puedan causar abscesos interdigitales."
        }
      ]
    },
    "esqueleto": {
      "image": "images/anatomy/perro-esqueleto.jpg",
      "title": "Perro &bull; Sistema Óseo y Esqueleto",
      "subtitle": "Osteología canina: esqueleto axial, apendicular y puntos de interés traumatológico",
      "items": [
        {
          "id": "cranium",
          "num": 1,
          "name": "Cráneo y Maxilar (Cranium & Maxilla)",
          "x": 19,
          "y": 14,
          "tag": "Esqueleto Axial &bull; Neurocráneo",
          "subtitle": "Bóveda ósea protectora del encéfalo y órganos de los sentidos",
          "location": "Parte dorsal y rostral de la cabeza ósea canina.",
          "function": "Protege el cerebro, aloja los órganos del olfato, ojos y oído interno, y sostiene las piezas dentales superiores.",
          "clinical": "Variaciones conformacionales notables (dolicocéfalos como Galgos, mesocéfalos como Beagle, braquicéfalos como Bulldog con síndrome obstructivo).",
          "welfare": "El síndrome braquicéfalo es un problema de conformación ósea que requiere desobstrucción quirúrgica en casos severos."
        },
        {
          "id": "mandible",
          "num": 2,
          "name": "Mandíbula (Mandible)",
          "x": 17,
          "y": 23,
          "tag": "Esqueleto Axial &bull; Esqueleto Visceral",
          "subtitle": "Hueso par móvil articulado en la sínfisis mandibular",
          "location": "Piso de la cavidad bucal, articulado con el temporal en la ATM.",
          "function": "Sostiene los dientes inferiores y soporta las enormes fuerzas de masticación.",
          "clinical": "Sitio frecuente de fracturas en sínfisis por atropellos o caídas; corregibles con cerclajes alámbricos interdentales.",
          "welfare": "La pérdida ósea mandibular por periodontitis avanzada puede desencadenar fracturas patológicas espontáneas."
        },
        {
          "id": "cervical_vertebrae",
          "num": 3,
          "name": "Vértebras Cervicales (C1 - C7)",
          "x": 29,
          "y": 24,
          "tag": "Esqueleto Axial &bull; Columna Cervical",
          "subtitle": "Soporte móvil del cuello: Atlas (C1) y Axis (C2)",
          "location": "Entre la base occipital y la primera vértebra torácica.",
          "function": "Permite movimientos rotacionales y de inclinación de la cabeza; protege la médula espinal cervical.",
          "clinical": "Subluxación atlantoaxial congénita en razas toy e inestabilidad cervical ('Wobbler') en Doberman y Gran Danés.",
          "welfare": "El collar ejerce presión directa sobre estas vértebras; priorizar siempre el uso de arneses."
        },
        {
          "id": "scapula",
          "num": 4,
          "name": "Escápula / Omóplato (Scapula)",
          "x": 34,
          "y": 34,
          "tag": "Esqueleto Apendicular &bull; Cinturón Escapular",
          "subtitle": "Hueso plano triangular sin clavícula articular",
          "location": "Dorsolateral al tórax sobre las primeras 4-5 costillas.",
          "function": "Transmite la fuerza del miembro anterior al tronco; su falta de clavícula rígida absorbe toneladas de impacto y amplifica la zancada.",
          "clinical": "Fracturas del cuello y cuerpo escapular; osteocondritis disecante (OCD) en la cavidad glenoidea.",
          "welfare": "Permitir la libre basculación de la escápula ajustando correctamente las correas de los arneses."
        },
        {
          "id": "humerus",
          "num": 5,
          "name": "Húmero (Humerus)",
          "x": 33,
          "y": 49,
          "tag": "Esqueleto Apendicular &bull; Brazo",
          "subtitle": "Hueso largo de gran resistencia mecánica",
          "location": "Entre la escápula (hombro) y el radio/ulna (codo).",
          "function": "Palanca ósea fundamental para el soporte del peso corporal anterior.",
          "clinical": "Fracturas del cóndilo humeral muy comunes en cachorros de Spaniel; osteosarcoma en metáfisis proximal.",
          "welfare": "El dolor óseo intenso continuo en este hueso en perros de edad media/avanzada exige descartar neoplasias óseas primarias."
        },
        {
          "id": "radius_ulna",
          "num": 6,
          "name": "Radio y Cúbito (Radius and Ulna)",
          "x": 35,
          "y": 68,
          "tag": "Esqueleto Apendicular &bull; Antebrazo",
          "subtitle": "Pilares de soporte del miembro torácico",
          "location": "Entre el codo y el carpo; el radio soporta la mayor parte del peso, la ulna forma el olécranon.",
          "function": "Soporte de carga y estabilidad articular en el trote y carrera.",
          "clinical": "Displasia de codo (no unión del proceso ancóneo, fragmentación coronoides) y fracturas diafisarias en razas toy (Pinscher, Galgo italiano).",
          "welfare": "Los cachorros en crecimiento deben evitar saltos desde sillones o camas para prevenir fracturas de cúbito y radio."
        },
        {
          "id": "carpus_metacarpus_phalanges",
          "num": 7,
          "name": "Carpo, Metacarpo y Falanges Anteriores",
          "x": 33,
          "y": 88,
          "tag": "Esqueleto Apendicular &bull; Mano Canina",
          "subtitle": "Estructura ósea del apoyo digitígrado anterior",
          "location": "Porción distal del miembro anterior; 7 huesos carpianos, 5 metacarpianos y falanges con garras.",
          "function": "Amortiguación elástica de aterrizaje y soporte articular en la pisada.",
          "clinical": "Hiperextensión carpiana traumática por rotura del fibrocartílago palmar tras caídas; requiere artrodesis quirúrgica.",
          "welfare": "El recorte de pelo interdigital previene la formación de bolas de hielo o barro que lesionan las articulaciones de los dedos."
        },
        {
          "id": "thoracic_ribs",
          "num": 8,
          "name": "Vértebras Torácicas y Costillas (13 pares)",
          "x": 44,
          "y": 40,
          "tag": "Esqueleto Axial &bull; Caja Torácica",
          "subtitle": "Escudo óseo cardiopulmonar",
          "location": "Región dorsal y lateral del tórax (T1 - T13).",
          "function": "Protección de órganos vitales torácicos y soporte del fuelle respiratorio.",
          "clinical": "Fracturas costales por mordeduras o atropellos con riesgo de volet costal (tórax batiente) y laceración pulmonar.",
          "welfare": "La compresión torácica en accidentes debe evaluarse de inmediato con radiografías para descartar neumotórax."
        },
        {
          "id": "sternum",
          "num": 9,
          "name": "Esternón (Sternum: Manubrio y Xifoides)",
          "x": 43,
          "y": 58,
          "tag": "Esqueleto Axial &bull; Suelo Torácico",
          "subtitle": "Serie de 8 esternebras fusionadas ventralmente",
          "location": "Línea media ventral del tórax.",
          "function": "Cierre de la jaula torácica ventral e inserción de costillas y músculos pectorales.",
          "clinical": "Pectus excavatum (deformidad congénita con hundimiento esternal) que reduce la capacidad ventilatoria en cachorros.",
          "welfare": "En cachorros con pectus excavatum, el tratamiento ortopédico temprano corrige la compresión cardíaca."
        },
        {
          "id": "lumbar_vertebrae",
          "num": 10,
          "name": "Vértebras Lumbares (L1 - L7)",
          "x": 56,
          "y": 30,
          "tag": "Esqueleto Axial &bull; Columna Lumbar / Lomo",
          "subtitle": "Soporte flexible del tronco y cavidad abdominal",
          "location": "Entre la última vértebra torácica y el sacro.",
          "function": "Transmite el impulso propulsor de los miembros posteriores hacia adelante; soporte del peso visceral.",
          "clinical": "Sitio de máxima incidencia de hernia de disco intervertebral (Hansen I y II) con paresia o parálisis en razas condrodistróficas (Teckel/Dachshund).",
          "welfare": "Evitar que perros con predisposición a hernias discales suban o bajen escaleras repetitivamente; uso de rampas."
        },
        {
          "id": "pelvis",
          "num": 11,
          "name": "Pelvis (Ilion, Isquion, Pubis)",
          "x": 63,
          "y": 34,
          "tag": "Esqueleto Apendicular &bull; Cinturón Pelviano",
          "subtitle": "Cintura pélvica articulada con el sacro",
          "location": "Extremo caudal del tronco, fusionada en la sínfisis pélvica.",
          "function": "Aloja el canal del parto, recto y vejiga; aloja el acetábulo para la articulación de la cadera.",
          "clinical": "Displasia coxofemoral (mala congruencia acetábulo-femoral); fracturas pélvicas por atropellos.",
          "welfare": "La radiografía oficial de cadera bajo anestesia a partir del año de vida es esencial para el control de la displasia en reproductores."
        },
        {
          "id": "femur",
          "num": 12,
          "name": "Fémur (Femur)",
          "x": 65,
          "y": 48,
          "tag": "Esqueleto Apendicular &bull; Muslo",
          "subtitle": "El hueso más robusto del sistema esquelético",
          "location": "Entre la cadera (acetábulo) y la rodilla (tibia y patella).",
          "function": "Palanca motora principal para la propulsión, galope y salto.",
          "clinical": "Fracturas diafisarias transversales o conminutas; necrosis aséptica de cabeza femoral (Legg-Calvé-Perthes en razas pequeñas).",
          "welfare": "La osteotomía de cabeza y cuello femoral (FHO) alivia el dolor crónico incapacitante en casos severos."
        },
        {
          "id": "patella",
          "num": 13,
          "name": "Rótula / Patella (Patella)",
          "x": 60,
          "y": 58,
          "tag": "Esqueleto &bull; Hueso Sesamoideo",
          "subtitle": "Inserto dentro del tendón del cuádriceps",
          "location": "En el surco troclear craneal del fémur distal.",
          "function": "Desvía el tendón del cuádriceps aumentando la palanca biomecánica de extensión de la rodilla.",
          "clinical": "Luxación medial de patella (grados I a IV) sumamente prevalente en razas pequeñas (Yorkshire, Poodle, Chihuahua), produciendo marcha a tres patas intermitente.",
          "welfare": "La corrección quirúrgica (trocleoplastia y transposición de cresta tibial) devuelve la marcha normal y previene artrosis severa."
        },
        {
          "id": "tibia_fibula",
          "num": 14,
          "name": "Tibia y Peroné (Tibia and Fibula)",
          "x": 66,
          "y": 70,
          "tag": "Esqueleto Apendicular &bull; Pierna",
          "subtitle": "Huesos de soporte entre la rodilla y el corvejón",
          "location": "Entre el fémur y el tarso.",
          "function": "Transmisión de cargas del muslo al tarso y estabilidad en la pisada.",
          "clinical": "Área de la meseta tibial donde se produce la rotura del ligamento cruzado craneal; corregida mediante osteotomías TPLO o TTA.",
          "welfare": "El reposo controlado postquirúrgico con correa es obligatorio tras cirugías ortopédicas de tibia."
        },
        {
          "id": "tarsus_metatarsus_phalanges",
          "num": 15,
          "name": "Tarso, Metatarso y Falanges Posteriores",
          "x": 71,
          "y": 88,
          "tag": "Esqueleto Apendicular &bull; Pie Canino",
          "subtitle": "Articulación del corvejón y dedos posteriores",
          "location": "Extremo distal del miembro pelviano.",
          "function": "Despegue potente en el salto y absorción elástica de fuerzas propulsoras.",
          "clinical": "Fracturas del calcáneo en perros de carreras (Galgo) y luxación de los tendones flexores.",
          "welfare": "Mantener las uñas posteriores cortas evita tensiones anómalas en las falanges distales."
        },
        {
          "id": "caudal_vertebrae",
          "num": 16,
          "name": "Vértebras Caudales / Cola",
          "x": 79,
          "y": 35,
          "tag": "Esqueleto Axial &bull; Cola",
          "subtitle": "Serie de 15 a 23 vértebras progresivamente reducidas",
          "location": "Continuación caudal del sacro.",
          "function": "Timón de equilibrio dinámico en giros rápidos y herramienta de comunicación etológica canina.",
          "clinical": "Fracturas por atrapamiento en puertas; luxaciones coccígeas y síndrome de cola rota ('limber tail') por sobreesfuerzo en agua fría.",
          "welfare": "La caudectomía estética (corte de cola) está éticamente desaprobada y prohibida en la medicina veterinaria moderna."
        },
        {
          "id": "pedal_skeleton",
          "num": 17,
          "name": "Esqueleto Podal Detallado (Pata Posterior)",
          "x": 88,
          "y": 72,
          "tag": "Esqueleto &bull; Detalle Podológico",
          "subtitle": "Tarso, metatarso, falanges y sesamoideos distales",
          "location": "Vista de la cara plantar del pie posterior (recuadro inferior derecho).",
          "function": "Soporte de impacto y articulación de las garras caninas.",
          "clinical": "Espolones o dedos accesorios vestigiales posteriores (débiles, propensos a enganches y arrancamientos).",
          "welfare": "La extirpación preventiva de espolones no articulados evita desgarros dolorosos en paseos por el campo."
        }
      ]
    }
  },
  "gato": {
    "cuerpo": {
      "image": "images/anatomy/gato-cuerpo.jpg",
      "title": "Gato &bull; Regiones Clínicas Externas",
      "subtitle": "Exploración semiológica felina, puntos de estrés bajo (Fear Free) y morfología externa",
      "items": [
        {
          "id": "cat_cabeza",
          "num": 1,
          "name": "Cabeza Felina",
          "x": 10,
          "y": 24,
          "tag": "Región 1 &bull; Cabeza",
          "subtitle": "Órganos sensoriales hiperdesarrollados, vibrisas y dentición carnívora",
          "location": "Extremo anterior, cráneo redondeado y órbitas oculares de gran tamaño orientadas hacia adelante.",
          "function": "Visión binocular crepuscular, audición con pabellones orientables 180°, órgano vomeronasal (Jacobson) y 30 dientes afilados especializados en cortar carne.",
          "clinical": "Exploración de mucosas, simetría pupilar (anisocoria en trauma/FeLV), revisión de pabellones auriculares (ácaros Otodectes cynotis) y examen dental (gingivoestomatitis crónica y resorción dental felina - FORL).",
          "welfare": "Las vibrisas (bigotes) son receptores sensoriales táctiles vitales; jamás deben cortarse. Evitar 'fatiga de bigotes' usando comederos planos y anchos."
        },
        {
          "id": "cat_cuello",
          "num": 2,
          "name": "Cuello y Región Tiroidea",
          "x": 19,
          "y": 42,
          "tag": "Región 2 &bull; Cuello",
          "subtitle": "Tráquea elástica, glándula tiroides y venas yugulares",
          "location": "Une la cabeza con el tórax; piel dorsal con pliegue de transporte maternal ('scruff').",
          "function": "Soporte flexible cefálico, paso aéreo traqueal y vascular yugular.",
          "clinical": "Palpación suave de tiroides para detectar nódulos (adenoma en hipertiroidismo felino, común en gatos senior con pérdida de peso y polifagia). Evitar la sujeción violenta por el pellejo dorsal ('scruffing') en consultas modernas Fear Free.",
          "welfare": "El manejo 'Low Stress Handling' sin inmovilizaciones forzadas reduce drásticamente el cortisol sérico y la agresividad por miedo en gatos."
        },
        {
          "id": "cat_torax",
          "num": 3,
          "name": "Tórax Cardiorrespiratorio",
          "x": 34,
          "y": 48,
          "tag": "Región 3 &bull; Tórax",
          "subtitle": "Corazón de alta frecuencia, campos pulmonares y caja torácica flexible",
          "location": "Entre el cuello y el abdomen; 13 costillas delgadas de gran elasticidad.",
          "function": "Aloja el corazón y los pulmones; permite aplanarse para pasar por aberturas reducidas.",
          "clinical": "Auscultación en reposo: Frecuencia cardíaca fisiológica de 140 a 220 lpm. Detección de ritmo de galope o soplos en cardiomiopatía hipertrófica (CMH); auscultación pulmonar en asma felina (sibilancias).",
          "welfare": "El jadeo con la boca abierta en un gato NUNCA es normal: indica hipoxia severa, estrés extremo o falla cardíaca inminente (Código Rojo)."
        },
        {
          "id": "cat_abdomen",
          "num": 4,
          "name": "Abdomen y Vientre Felino",
          "x": 54,
          "y": 52,
          "tag": "Región 4 &bull; Abdomen",
          "subtitle": "Riñones palpables, vejiga y bolsa primordial",
          "location": "Entre el tórax y la pelvis; piel laxa ventral que forma la 'bolsa primordial'.",
          "function": "Digestión de carnívoro estricto con colon corto; filtración renal y almacenamiento vesical.",
          "clinical": "Palpación renal bimanual (los riñones felinos son normalmente palpables y móviles); palpación suave de vejiga para descartar retención urinaria dura en gatos con obstrucción uretral (FLUTD).",
          "welfare": "La bolsa primordial ventral es un rasgo fisiológico protector de patadas de presas, no grasa patológica; no confundir con obesidad."
        },
        {
          "id": "cat_extremidades",
          "num": 5,
          "name": "Extremidades y Garras Retráctiles",
          "x": 26,
          "y": 78,
          "tag": "Región 5 &bull; Miembros y Garras",
          "subtitle": "Articulaciones hiperflexibles y mecanismo de retracción de garras",
          "location": "Extremidades anteriores y posteriores digitígradas con garras queratinizadas retráctiles.",
          "function": "Trepado vertical, salto de longitud y altura, aterrizaje elástico y caza silenciosa.",
          "clinical": "Inspección de garras encarnadas en gatos senior que pierden la capacidad de rascar; dolor articular sutil en codos y tarsos por artrosis felina.",
          "welfare": "La desungulación ('declawing' o amputación de falanges) es una mutilación cruenta desaprobada y prohibida; proveer rascadores verticales estables."
        },
        {
          "id": "cat_cola_columna",
          "num": 6,
          "name": "Cola y Columna Vertebral Felina",
          "x": 88,
          "y": 33,
          "tag": "Región 6 &bull; Cola y Columna",
          "subtitle": "El timón de equilibrio y máxima expresión etológica",
          "location": "A lo largo de toda la línea dorsal hasta el extremo de la cola (18-23 vértebras caudales).",
          "function": "Equilibrio dinámico en saltos y caídas ('reflejo de enderezamiento felino'); comunicación de estados anímicos.",
          "clinical": "Riesgo de síndrome de avulsión del plexo lumbosacro por atrapamiento de la cola, con incontinencia urinaria y fecal; hiperestesia felina.",
          "welfare": "Una cola erecta con punta curvada expresa confianza y bienvenida; una cola oscilando rápido de lado a lado indica frustración o irritación."
        }
      ]
    },
    "musculos": {
      "image": "images/anatomy/gato-musculos.jpg",
      "title": "Gato &bull; Sistema Muscular Completo",
      "subtitle": "Miología felina: fibras de contracción rápida, elasticidad dorsal y garras retráctiles",
      "items": [
        {
          "id": "cat_masseter",
          "num": 1,
          "name": "Músculo Masetero (Masseter)",
          "x": 16,
          "y": 24,
          "tag": "Cabeza &bull; Musculatura Facial",
          "subtitle": "Potente músculo masticador de presa",
          "location": "En la cara lateral de la mandíbula inferior felina, insertándose desde el arco cigomático.",
          "function": "Cierre fulgurante y corte enérgico de la mandíbula al apresar y triturar carne.",
          "clinical": "Se explora en abscesos por mordedura de pelea entre gatos y en lesiones de la articulación temporomandibular.",
          "welfare": "La presencia de dolor masetérico o rechazo al alimento seco suele indicar resorción dental felina (FORL) o gingivoestomatitis."
        },
        {
          "id": "cat_sternocephalicus",
          "num": 2,
          "name": "Músculo Esternocefálico (Sternocephalicus)",
          "x": 20,
          "y": 36,
          "tag": "Cuello &bull; Musculatura Ventral",
          "subtitle": "Flexor y orientador de la cabeza",
          "location": "A lo largo del cuello ventrolateral desde el esternón hacia la base occipitomastoidea del cráneo.",
          "function": "Flexiona la cabeza hacia abajo y participa en el acicalamiento del pecho.",
          "clinical": "Borde guía anatómico para la venopunción yugular en gatos, realizada preferentemente con el paciente en posición esternal tranquila.",
          "welfare": "Técnicas de manejo sin presión estrangulante en el cuello garantizan una toma de muestras libre de estrés."
        },
        {
          "id": "cat_brachiocephalicus",
          "num": 3,
          "name": "Braquiocefálico (Brachiocephalicus)",
          "x": 24,
          "y": 40,
          "tag": "Cuello &bull; Eje Cérvico-Braquial",
          "subtitle": "Conector directo entre cráneo y extremidad anterior",
          "location": "Se extiende desde el cráneo y cuello dorsal hasta la cresta del húmero.",
          "function": "Adelanta la extremidad con extrema velocidad y permite una zancada muy amplia al no tener clavícula rígida.",
          "clinical": "Presenta gran elasticidad en el gato; evaluado en cojeras y caídas de altura.",
          "welfare": "Permite al gato estirarse de forma característica al despertar para desentumecer el eje cervical."
        },
        {
          "id": "cat_trapezius",
          "num": 4,
          "name": "Músculo Trapecio (Trapezius)",
          "x": 31,
          "y": 28,
          "tag": "Espalda &bull; Fijador Escapular",
          "subtitle": "Placa muscular en abanico sobre la cruz",
          "location": "Cubre la región dorsal interescapular del cuello y del tórax craneal.",
          "function": "Eleva y orienta la escápula en tres dimensiones, dotando al gato de una asombrosa movilidad del hombro.",
          "clinical": "Área de aplicación subcutánea de fluidos (fluidoterapia SC en enfermedad renal crónica felina).",
          "welfare": "La fluidez del trapecio es esencial para que el gato pueda trepar y acechar con el cuerpo pegado al suelo."
        },
        {
          "id": "cat_deltoideus",
          "num": 5,
          "name": "Músculo Deltoides (Deltoideus)",
          "x": 26,
          "y": 48,
          "tag": "Hombro &bull; Articulación Escapulohumeral",
          "subtitle": "Flexor y abductor ágil del brazo",
          "location": "Sobre la cara lateral de la articulación del hombro, insertándose en la tuberosidad deltoidea.",
          "function": "Abduce y flexiona el hombro; permite al gato abrir la pata para abrazar presas o manotear en el juego.",
          "clinical": "Se hipertrofia en gatos trepadores activos; se examina en cojeras altas del miembro torácico.",
          "welfare": "El juego diario con cañas estimula la acción de este músculo previniendo la atrofia por sedentarismo de interior."
        },
        {
          "id": "cat_triceps_brachii",
          "num": 6,
          "name": "Tríceps Braquial (Triceps brachii)",
          "x": 25,
          "y": 60,
          "tag": "Brazo &bull; Cara Posterior",
          "subtitle": "Potente masa muscular extensora del codo",
          "location": "En la parte caudal del brazo, insertándose en el olécranon de la ulna.",
          "function": "Extiende la articulación del codo; soporta el impacto del tren anterior al aterrizar de un salto.",
          "clinical": "Se evalúa con el reflejo tricipital; sitio de palpación para estimar la masa muscular corporal magra en gatos enfermos.",
          "welfare": "Superficies acolchadas o alfombras reducen el impacto en este músculo al saltar desde muebles altos."
        },
        {
          "id": "cat_biceps_brachii",
          "num": 7,
          "name": "Bíceps Braquial (Biceps brachii)",
          "x": 29,
          "y": 56,
          "tag": "Brazo &bull; Cara Craneal",
          "subtitle": "Flexor del codo para el agarre y trepado",
          "location": "En la cara anterior del húmero felino.",
          "function": "Flexiona el codo y asiste en la sujeción de ramas, troncos rascadores y presas.",
          "clinical": "Evaluado en contusiones tras caídas de ventanas (síndrome del gato paracaidista).",
          "welfare": "Los rascadores verticales permiten al gato colgarse y estirar este músculo de forma instintiva."
        },
        {
          "id": "cat_latissimus_dorsi",
          "num": 8,
          "name": "Músculo Dorsal Ancho (Latissimus dorsi)",
          "x": 42,
          "y": 34,
          "tag": "Tórax &bull; Pared Lateral",
          "subtitle": "Músculo retropulsor del miembro anterior",
          "location": "Se extiende desde la fascia toracolumbar hasta la cara medial del húmero.",
          "function": "Tira de la extremidad anterior hacia atrás durante el trepado y la escalada.",
          "clinical": "Crucial en la natación y en la biomecánica del acecho a ras del suelo.",
          "welfare": "El enriquecimiento ambiental con estantes y circuitos elevados mantiene tonificado este músculo dorsal."
        },
        {
          "id": "cat_intercostals",
          "num": 9,
          "name": "Músculos Intercostales (Intercostals)",
          "x": 44,
          "y": 50,
          "tag": "Tórax &bull; Dinámica Respiratoria",
          "subtitle": "Músculos entre las 13 costillas felinas",
          "location": "Ocupan los espacios intercostales bilaterales.",
          "function": "Mueven la caja torácica durante la ventilación pulmonar.",
          "clinical": "En crisis asmáticas felinas (bronquitis alérgica) se observa una respiración costal forzada con abdomen hundido.",
          "welfare": "Mantener el hogar libre de humo de tabaco, aerosoles y polvo de arena de bentonita protege las vías aéreas felinas."
        },
        {
          "id": "cat_sacrospinalis",
          "num": 10,
          "name": "Complejo Sacroespinal (Sacrospinalis complex)",
          "x": 55,
          "y": 30,
          "tag": "Columna &bull; Eje Dorsolumbar",
          "subtitle": "El resorte dorsal de máxima flexibilidad felina",
          "location": "Corre paralelo a toda la columna vertebral toracolumbar y sacra.",
          "function": "Permite el arqueo dorsal extremo, el giro en el aire durante la caída y la extensión elástica en carrera.",
          "clinical": "Sitio de gran reactividad dolorosa en espondilosis deformante y en el síndrome de hiperestesia felina ('rolling skin disease').",
          "welfare": "La sensibilidad extrema o contracciones cutáneas involuntarias sobre este músculo indican hiperestesia o dolor neuropático."
        },
        {
          "id": "cat_external_oblique",
          "num": 11,
          "name": "Oblicuo Externo (External oblique)",
          "x": 64,
          "y": 35,
          "tag": "Abdomen &bull; Pared Lateral",
          "subtitle": "Lámina muscular de contención visceral",
          "location": "En el flanco abdominal lateral, cubriendo desde las costillas hasta la pelvis.",
          "function": "Contiene los órganos abdominales y flexiona lateralmente el tronco.",
          "clinical": "Se distiende ostensiblemente en PIF efusivo (peritonitis infecciosa felina con exudado líquido peritoneal).",
          "welfare": "Un abdomen suave y relajado es signo directo de bienestar y ausencia de patología digestiva o urinaria."
        },
        {
          "id": "cat_gluteals",
          "num": 12,
          "name": "Músculos Glúteos (Gluteal muscles)",
          "x": 66,
          "y": 38,
          "tag": "Pelvis &bull; Grupa Felina",
          "subtitle": "Los propulsores explosivos del salto vertical",
          "location": "En la cara dorsal de la pelvis sobre el ilion, insertándose en el fémur.",
          "function": "Extienden la cadera con potencia explosiva instantánea, permitiendo saltos de hasta 6 veces la altura del gato.",
          "clinical": "Se evalúan en la palpación muscular; la atrofia glútea es evidente en gatos senior que dejan de saltar a lugares altos.",
          "welfare": "Si un gato deja de subir a sus lugares favoritos, sospechar dolor osteoartrítico en cadera o atrofia glútea."
        },
        {
          "id": "cat_quadriceps",
          "num": 13,
          "name": "Cuádriceps Femoral (Quadriceps femoris group)",
          "x": 62,
          "y": 50,
          "tag": "Muslo &bull; Cara Craneal",
          "subtitle": "El extensor de rodilla en el despegue",
          "location": "En la cara anterior del muslo, convergiendo en la rótula y ligamento patelar.",
          "function": "Extiende la articulación de la rodilla con fuerza para propulsar el salto.",
          "clinical": "Pérdida de masa muscular palpable en osteoartritis felina y diabetes mellitus no controlada.",
          "welfare": "Colocar rampas o escalones de apoyo para gatos senior facilita el acceso a camas y ventanas sin sobrecargar el cuádriceps."
        },
        {
          "id": "cat_biceps_femoris",
          "num": 14,
          "name": "Bíceps Femoral (Biceps femoris)",
          "x": 68,
          "y": 53,
          "tag": "Muslo &bull; Cara Lateral",
          "subtitle": "La masa muscular más extensa del muslo",
          "location": "Cubre la mayor parte de la cara lateral del muslo entre la tuberosidad isquiática y la fascia lata/tibia.",
          "function": "Extiende la articulación coxofemoral y flexiona la rodilla en carrera.",
          "clinical": "Punto habitual de inyección intramuscular en felinos (en cuadrante craneal del músculo para no lesionar el nervio isquiático).",
          "welfare": "La inyección debe realizarse con agujas finas (25G) y a temperatura corporal para evitar dolor y estrés."
        },
        {
          "id": "cat_semitendinosus",
          "num": 15,
          "name": "Músculo Semitendinoso (Semitendinosus)",
          "x": 70,
          "y": 62,
          "tag": "Muslo &bull; Cara Caudal",
          "subtitle": "Banda muscular flexora de la rodilla",
          "location": "Forma el contorno posterior redondeado del muslo felino.",
          "function": "Flexiona la rodilla y colabora en la extensión de la cadera.",
          "clinical": "Se palpa para evaluar tono muscular y contracturas por traumatismos en extremidad trasera.",
          "welfare": "Masajes de fisioterapia suaves en gatos con osteoartritis alivian contracturas en esta zona caudal."
        },
        {
          "id": "cat_gastrocnemius",
          "num": 16,
          "name": "Músculo Gastrocnemio (Gastrocnemius)",
          "x": 68,
          "y": 72,
          "tag": "Pierna &bull; Gemelos Felinos",
          "subtitle": "Formador del tendón calcáneo común",
          "location": "En la cara posterior de la tibia hacia el hueso calcáneo.",
          "function": "Extiende el tarso en el despegue y aterrizaje.",
          "clinical": "En la neuropatía diabética felina por hiperglucemia crónica, el gato debilita este músculo y apoya todo el tarso en el suelo (postura plantígrada).",
          "welfare": "El control veterinario de la glucemia con insulina y dieta baja en carbohidratos revierte la postura plantígrada."
        },
        {
          "id": "cat_forelimb_muscles",
          "num": 17,
          "name": "Flexores y Extensores del Miembro Anterior",
          "x": 32,
          "y": 76,
          "tag": "Antebrazo y Mano &bull; Control de Garras",
          "subtitle": "Mecanismo biomecánico de las garras retráctiles",
          "location": "A lo largo de los huesos radio/ulna hacia las falanges de los dedos anteriores.",
          "function": "Controlan la protracción voluntaria de las garras para cazar o trepar, y su retracción pasiva elástica al caminar.",
          "clinical": "Inspección de vainas tendinosas por heridas de pelea que provocan flemones e infecciones bacterianas anaerobias.",
          "welfare": "Rascar postes de sisal es una necesidad fisiológica y comportamental para liberar feromonas interdigitales y renovar la funda ungueal."
        },
        {
          "id": "cat_tail_muscles",
          "num": 18,
          "name": "Musculatura de la Cola (Sacrocaudales)",
          "x": 84,
          "y": 32,
          "tag": "Cola &bull; Control Caudal Fino",
          "subtitle": "Músculos sacrocaudales dorsales, ventrales y laterales",
          "location": "Discurren longitudinalmente a lo largo delle 18-23 vértebras caudales.",
          "function": "Control micrométrico del movimiento de la cola para equilibrar el centro de gravedad y expresar emociones.",
          "clinical": "Peligro severo de avulsión del plexo sacrocaudal (tirón de cola por puertas o niños) que deja la cola flácida y causa incontinencia.",
          "welfare": "Nunca jalar la cola de un gato; educar a los miembros del hogar sobre el respeto a esta delicada extensión medular."
        }
      ]
    },
    "esqueleto": {
      "image": "images/anatomy/gato-esqueleto.jpg",
      "title": "Gato &bull; Sistema Óseo y Esqueleto",
      "subtitle": "Osteología felina: esqueleto axial, apendicular y adaptaciones biomecánicas del salto",
      "items": [
        {
          "id": "cat_skull",
          "num": 1,
          "name": "Cráneo (Skull: Neurocráneo y Órbitas)",
          "x": 14,
          "y": 19,
          "tag": "Esqueleto Axial &bull; Cabeza Felina",
          "subtitle": "Bóveda craneal compacta con órbitas oculares gigantescas",
          "location": "Parte dorsal y rostral de la cabeza ósea felina.",
          "function": "Protege el encéfalo y aloja grandes ojos adaptados a la visión crepuscular en 3D para calcular distancias milimétricas en saltos.",
          "clinical": "Fracturas de mandíbula y paladar duro por síndrome del gato paracaidista (caídas de edificios); crepitación o deformidad craneal.",
          "welfare": "Proteger balcones y ventanas con redes certificadas previene caídas que provocan traumatismos craneoencefálicos graves."
        },
        {
          "id": "cat_mandible",
          "num": 2,
          "name": "Mandíbula (Mandible)",
          "x": 13,
          "y": 29,
          "tag": "Esqueleto Axial &bull; Esqueleto Visceral",
          "subtitle": "Mandíbula inferior articulada en la ATM",
          "location": "Piso de la cavidad bucal, unida en la sínfisis mandibular rostral.",
          "function": "Aloja los colmillos y piezas premolares/molares en tijera; soporta la mordida mortal sobre la médula espinal de presas.",
          "clinical": "La fractura o separación de la sínfisis mandibular es la lesión traumática facial más frecuente en gatos tras caídas o atropellos; se repara con cerclaje de alambre.",
          "welfare": "La resorción dental felina (FORL) produce cavidades dolorosas que erosionan el hueso alveolar mandibular; requiere extracciones quirúrgicas oportunas."
        },
        {
          "id": "cat_atlas_axis",
          "num": 3,
          "name": "Atlas (C1) y Axis (C2)",
          "x": 24,
          "y": 22,
          "tag": "Esqueleto Axial &bull; Unión Craneocervical",
          "subtitle": "Vértebras especializadas de rotación y flexión cefálica",
          "location": "Unión occipito-cervical en el nacimiento del cuello.",
          "function": "El atlas permite el cabeceo de arriba a abajo ('articulación del sí') y el axis la rotación lateral ('articulación del no').",
          "clinical": "Zona de gran movilidad evaluada en casos de dolor cervical agudo, ventroflexión del cuello (por hipopotasemia en enfermedad renal o hiperaldosteronismo) o traumatismos.",
          "welfare": "Evitar cualquier método coercitivo que retuerza el cuello felino durante la consulta médica."
        },
        {
          "id": "cat_cervical_vertebrae",
          "num": 4,
          "name": "Vértebras Cervicales (C1 - C7)",
          "x": 29,
          "y": 15,
          "tag": "Esqueleto Axial &bull; Columna Cervical",
          "subtitle": "Siete vértebras cervicales de extraordinaria movilidad",
          "location": "A lo largo del cuello felino.",
          "function": "Permite el giro extremo del cuello para el acicalamiento corporal completo y la orientación auditivo-visual inmediata.",
          "clinical": "Rigidez cervical marcada en meningitis o traumatismos de cuello.",
          "welfare": "El acceso a platos elevados de comida y agua alivia la flexión cervical en gatos de edad avanzada con espondilosis."
        },
        {
          "id": "cat_scapula",
          "num": 5,
          "name": "Escápula / Omóplato (Scapula)",
          "x": 31,
          "y": 38,
          "tag": "Esqueleto Apendicular &bull; Cinturón Escapular",
          "subtitle": "Hueso plano triangular libre flotante (clavícula vestigial)",
          "location": "Dorsolateral sobre las costillas torácicas anteriores.",
          "function": "Articula con el húmero; al tener solo una clavícula vestigial libre flotante no fijada al esternón, el gato puede pasar por cualquier hueco donde quepa su cabeza.",
          "clinical": "Evaluada en fracturas del cuerpo o cuello escapular y luxaciones escapulohumerales.",
          "welfare": "El diseño escapular felino absorbe hasta 9 veces su peso en un aterrizaje sin dislocación ósea."
        },
        {
          "id": "cat_humerus",
          "num": 6,
          "name": "Húmero (Humerus)",
          "x": 29,
          "y": 50,
          "tag": "Esqueleto Apendicular &bull; Brazo Felino",
          "subtitle": "Hueso largo del brazo con foramen supracondilar",
          "location": "Entre la escápula (hombro) y el codo.",
          "function": "Palanca de soporte y tracción en la escalada y zancada.",
          "clinical": "Posee un foramen supracondilar medial específico del gato por donde cruzan la arteria braquial y el nervio mediano, de gran importancia anatómica en cirugías ortopédicas.",
          "welfare": "Cojeras que mejoran con el reposo y empeoran con el frío suelen denotar osteoartritis en hombro o codo."
        },
        {
          "id": "cat_radius_ulna",
          "num": 7,
          "name": "Radio y Cúbito (Radius and Ulna)",
          "x": 34,
          "y": 72,
          "tag": "Esqueleto Apendicular &bull; Antebrazo",
          "subtitle": "Huesos que permiten pronación y supinación de la mano",
          "location": "Entre el codo y el carpo.",
          "function": "A diferencia de los perros, el gato tiene gran capacidad de rotar el antebrazo (supinación/pronación) para trepar, lavarse la cara y manipular presas.",
          "clinical": "Fracturas diafisarias frecuentes por accidentes automovilísticos o caídas de altura; reparadas con miniplacas bloqueadas de osteosíntesis.",
          "welfare": "La inmovilización prolongada del codo genera anquilosis rápida en gatos; la rehabilitación activa precoz es indispensable."
        },
        {
          "id": "cat_carpus_metacarpus_phalanges",
          "num": 8,
          "name": "Carpo, Metacarpo y Falanges Anteriores",
          "x": 33,
          "y": 90,
          "tag": "Esqueleto Apendicular &bull; Mano Felina",
          "subtitle": "Estructura ósea de soporte y anclaje de garras retráctiles",
          "location": "Porción distal del miembro anterior (muñeca y dedos).",
          "function": "Apoyo digitígrado elástico y anclaje ligamentoso para las falanges distales con garras.",
          "clinical": "Hiperextensión carpiana traumática; luxaciones interfalángicas.",
          "welfare": "La tercera falange alberga la matriz ungueal viva; la desungulación o extirpación de la falange distal causa dolor fantasma y problemas de comportamiento permanentes."
        },
        {
          "id": "cat_thoracic_ribs",
          "num": 9,
          "name": "Vértebras Torácicas y Costillas (13 pares)",
          "x": 44,
          "y": 38,
          "tag": "Esqueleto Axial &bull; Tórax Óseo",
          "subtitle": "Caja torácica esbelta y altamente comprimible",
          "location": "Entre el cuello y la región lumbar (T1 - T13).",
          "function": "Protege el corazón y los pulmones; su flexibilidad permite al gato estrechar su tórax lateralmente.",
          "clinical": "Contusiones torácicas y neumotórax tras caídas; efusión pleural (quilotórax, piotórax) que colapsa los pulmones.",
          "welfare": "El jadeo o respiración costal dificultosa en un gato requiere oxigenoterapia inmediata en ambiente libre de ruidos."
        },
        {
          "id": "cat_sternum",
          "num": 10,
          "name": "Esternón (Sternum: 8 esternebras)",
          "x": 44,
          "y": 60,
          "tag": "Esqueleto Axial &bull; Suelo Torácico",
          "subtitle": "Eje óseo ventral que articula con las costillas",
          "location": "Línea media ventral del pecho desde el manubrio hasta el proceso xifoides.",
          "function": "Cierre ventral de la jaula torácica y punto de anclaje de la musculatura pectoral.",
          "clinical": "Pectus excavatum congénito en gatitos, reducible con férulas externas si se trata en las primeras semanas de vida.",
          "welfare": "La palpación suave del esternón permite verificar la regularidad costal y descartar fracturas o hematomas torácicos."
        },
        {
          "id": "cat_lumbar_vertebrae",
          "num": 11,
          "name": "Vértebras Lumbares (L1 - L7)",
          "x": 57,
          "y": 29,
          "tag": "Esqueleto Axial &bull; Columna Lumbar",
          "subtitle": "Siete vértebras lumbares con procesos transversos alargados",
          "location": "Zona del lomo felino entre las costillas y la pelvis.",
          "function": "Confiere la asombrosa elasticidad dorsal que permite al gato doblarse como un arco en carreras y brincos.",
          "clinical": "Espondilosis deformante lumbar (puentes óseos ventrales) frecuente en gatos de más de 10 años, causante de reticencia a saltar y dificultad para entrar al arenero.",
          "welfare": "Areneros con bordes bajos facilitan la entrada de gatos senior con dolor articular o rigidez lumbar."
        },
        {
          "id": "cat_sacrum",
          "num": 12,
          "name": "Sacro (Sacrum: 3 vértebras fusionadas)",
          "x": 67,
          "y": 32,
          "tag": "Esqueleto Axial &bull; Unión Sacropélvica",
          "subtitle": "Bloque óseo de anclaje de la pelvis a la columna",
          "location": "Entre la última vértebra lumbar (L7) y la primera vértebra caudal (Cd1).",
          "function": "Transmite el descomunal impulso motor de las patas traseras a todo el eje dorsal del cuerpo.",
          "clinical": "Luxación sacroilíaca por atropello de tráfico; provoca inestabilidad pélvica e incapacidad de apoyar el tercio posterior.",
          "welfare": "La estabilización quirúrgica con tornillo transiliosacro restaura el soporte y alivia el dolor agudo."
        },
        {
          "id": "cat_pelvis",
          "num": 13,
          "name": "Pelvis (Ilion, Isquion, Pubis)",
          "x": 65,
          "y": 36,
          "tag": "Esqueleto Apendicular &bull; Cinturón Pelviano",
          "subtitle": "Canal pélvico protector de órganos genitourinarios",
          "location": "Extremo caudal del tronco, cerrado en la sínfisis púbica.",
          "function": "Protege el colon distal, recto, vejiga y uretra; aloja el acetábulo para la articulación de la cadera.",
          "clinical": "Fracturas de pelvis con estrechamiento del canal pélvico, complicación que predispone al megacolon obstructivo por retención fecal crónica.",
          "welfare": "Evaluar la amplitud del canal pélvico tras traumatismos para prevenir estreñimiento y megacolon felino."
        },
        {
          "id": "cat_femur",
          "num": 14,
          "name": "Fémur (Femur)",
          "x": 67,
          "y": 52,
          "tag": "Esqueleto Apendicular &bull; Muslo Felino",
          "subtitle": "Palanca ósea vertical propulsora",
          "location": "Entre la cadera (acetábulo) y la articulación de la rodilla.",
          "function": "Soporta la máxima carga de flexión y despegue en el salto felino.",
          "clinical": "Fracturas diafisarias y epifisiolisis de la cabeza femoral en gatos jóvenes castrados tempranamente (displasia fisaria felina).",
          "welfare": "El dolor femoral impide el acicalamiento del tercio posterior; el pelo descuidado o apelmazado en la grupa suele indicar dolor ortopédico."
        },
        {
          "id": "cat_patella",
          "num": 15,
          "name": "Rótula / Patella (Patella)",
          "x": 59,
          "y": 59,
          "tag": "Esqueleto &bull; Hueso Sesamoideo",
          "subtitle": "Sesamoideo dentro del tendón del cuádriceps",
          "location": "En la cara anterior de la rodilla (tróclea femoral).",
          "function": "Optimiza la palanca extensora de la rodilla y protege el tendón cuadricipital del desgaste articular.",
          "clinical": "Luxación patelar medial o lateral en razas como Maine Coon, Abisinio y Devon Rex; artrosis femororotuliana.",
          "welfare": "El examen ortopédico regular detecta crepitación rotuliana antes de que cause cojera manifiesta."
        },
        {
          "id": "cat_tibia_fibula",
          "num": 16,
          "name": "Tibia y Peroné (Tibia and Fibula)",
          "x": 65,
          "y": 72,
          "tag": "Esqueleto Apendicular &bull; Pierna Felina",
          "subtitle": "Huesos largos entre rodilla y corvejón",
          "location": "Pierna posterior del gato.",
          "function": "Transmisión de fuerzas mecánicas desde la rodilla hacia el tarso.",
          "clinical": "Fracturas tibiales abiertas por atropello; rotura de ligamentos cruzados (menos ruidosa clínicamente en gatos que en perros).",
          "welfare": "Los gatos enmascaran el dolor ortopédico durmiendo más horas o aislándose; no esperar cojeras escandalosas para consultar."
        },
        {
          "id": "cat_tarsus_metatarsus_phalanges",
          "num": 17,
          "name": "Tarso, Metatarso y Falanges Posteriores",
          "x": 68,
          "y": 88,
          "tag": "Esqueleto Apendicular &bull; Pie Felino",
          "subtitle": "El resorte elástico del salto de longitud",
          "location": "Extremo distal del miembro pelviano posterior.",
          "function": "Palanca de propulsión para saltar y acelerar; amortigua el aterrizaje posterior.",
          "clinical": "Apoyo plantígrado patológico en neuropatía diabética (el corvejón toca el suelo); luxaciones del tarso por caídas.",
          "welfare": "Un gato que camina apoyando los talones en el suelo requiere medición urgente de glucosa en sangre."
        },
        {
          "id": "cat_caudal_vertebrae",
          "num": 18,
          "name": "Vértebras Caudales de la Cola (18 - 23 vértebras)",
          "x": 80,
          "y": 30,
          "tag": "Esqueleto Axial &bull; Cola Felina",
          "subtitle": "Eje esquelético segmentado de equilibrio",
          "location": "Continuación de la columna vertebral desde el sacro hasta la punta de la cola.",
          "function": "Actúa como contrapeso giroscópico en caídas y carreras; vehículo esencial del lenguaje corporal felino.",
          "clinical": "Fracturas por atrapamiento en puertas y avulsión de raíces sacras que causa pérdida de control del esfínter anal y vesical.",
          "welfare": "Cualquier tirón de la cola es sumamente lesivo; proteger a los gatos de puertas batientes o cierres bruscos."
        }
      ]
    }
  }
};
 
let currentAnatomySpecies = 'perro';
let currentAnatomyLayer =  'cuerpo';
let activeAnatomyItemId = null;

function initAnatomyModule() {
  // Selector de Especie
  const btnSpeciesDog = document.getElementById('btnSpeciesDog');
  const btnSpeciesCat = document.getElementById('btnSpeciesCat');
  
  if (btnSpeciesDog && btnSpeciesCat) {
    btnSpeciesDog.addEventListener('click', () => switchAnatomySpecies('perro'));
    btnSpeciesCat.addEventListener('click', () => switchAnatomySpecies('gato'));
  }

  // Selector de Lámina / Capa
  const btnLayerBody = document.getElementById('btnLayerBody');
  const btnLayerMuscles = document.getElementById('btnLayerMuscles');
  const btnLayerSkeleton = document.getElementById('btnLayerSkeleton');

  if (btnLayerBody) btnLayerBody.addEventListener('click', () => switchAnatomyLayer('cuerpo'));
  if (btnLayerMuscles) btnLayerMuscles.addEventListener('click', () => switchAnatomyLayer('musculos'));
  if (btnLayerSkeleton) btnLayerSkeleton.addEventListener('click', () => switchAnatomyLayer('esqueleto'));

  // Carga inicial
  renderAnatomyView();
}

function switchAnatomySpecies(species) {
  if (currentAnatomySpecies === species) return;
  currentAnatomySpecies = species;

  // Actualizar estado de botones de especie
  document.querySelectorAll('#speciesControl .seg-btn').forEach(btn => {
    if (btn.getAttribute('data-species') === species) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAnatomyView();
}

function switchAnatomyLayer(layer) {
  if (currentAnatomyLayer === layer) return;
  currentAnatomyLayer = layer;

  // Actualizar estado de botones de capa
  document.querySelectorAll('#layerControl .seg-btn').forEach(btn => {
    if (btn.getAttribute('data-layer') === layer) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAnatomyView();
}

function renderAnatomyView() {
  const speciesData = anatomyAtlas[currentAnatomySpecies];
  if (!speciesData) return;

  const layerData = speciesData[currentAnatomyLayer];
  if (!layerData) return;

  const mainImg = document.getElementById('anatomyMainImg');
  const overlay = document.getElementById('anatomyHotspotsOverlay');
  const chipsGrid = document.getElementById('anatomyChipsGrid');
  const chipsCount = document.getElementById('anatomyChipsCount');
  const pendingNotice = document.getElementById('anatomyPendingNotice');

  // Manejo especial: Esqueleto de gato en espera de la foto del usuario
  if (layerData.isPending) {
    if (pendingNotice) pendingNotice.classList.remove('hidden');
    if (overlay) overlay.innerHTML = '';
    if (chipsGrid) chipsGrid.innerHTML = '';
    if (chipsCount) chipsCount.textContent = 'Pendiente de imagen';
    
    // Panel informativo en espera
    const panel = document.getElementById('anatomyInfoPanel');
    if (panel) {
      document.getElementById('anatRegionNumber').textContent = 'Felino • Sistema Óseo (En Espera)';
      document.getElementById('anatRegionTitle').textContent = 'Esqueleto del Gato';
      document.getElementById('anatRegionSubtitle').textContent = 'Lámina en espera de la foto que suministrarás en el siguiente comando';
      document.getElementById('anatLocation').textContent = 'Pendiente de activar con la lámina fotográfica que proporcionarás en el próximo mensaje.';
      document.getElementById('anatFunction').textContent = 'El esqueleto felino consta de unas 244 piezas óseas con una clavícula flotante que le confiere extrema agilidad.';
      document.getElementById('anatClinical').textContent = 'En espera de incorporar los hotspots y análisis detallado de cada hueso en cuanto recibamos la imagen.';
      document.getElementById('anatWelfare').textContent = 'Listo para desplegar el mapa osteológico completo tan pronto nos des la foto.';
    }
    return;
  } else {
    if (pendingNotice) pendingNotice.classList.add('hidden');
  }

  // Actualizar imagen con suave transición
  if (mainImg) {
    mainImg.style.opacity = '0.4';
    mainImg.src = layerData.image;
    mainImg.onload = () => {
      mainImg.style.opacity = '1';
    };
    // Por si ya está en caché
    setTimeout(() => { mainImg.style.opacity = '1'; }, 100);
  }

  // Limpiar capas previas
  if (overlay) overlay.innerHTML = '';
  if (chipsGrid) chipsGrid.innerHTML = '';

  const items = layerData.items || [];
  if (chipsCount) {
    const labelType = currentAnatomyLayer === 'musculos' ? 'músculos' : (currentAnatomyLayer === 'esqueleto' ? 'huesos' : 'regiones');
    chipsCount.textContent = `${items.length} ${labelType}`;
  }

  // Inyectar Pines flotantes y Chips interactivos
  items.forEach((item, index) => {
    // 1. Pin sobre la imagen
    if (overlay) {
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'anatomy-pin';
      pin.style.left = `${item.x}%`;
      pin.style.top = `${item.y}%`;
      pin.setAttribute('data-id', item.id);
      pin.setAttribute('aria-label', item.name);
      pin.innerHTML = `<span>${item.num}</span><span class="pin-tooltip">${item.name}</span>`;

      pin.addEventListener('click', () => selectAnatomyItem(item.id));
      overlay.appendChild(pin);
    }

    // 2. Chip selector debajo
    if (chipsGrid) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'anat-chip-btn';
      chip.setAttribute('data-id', item.id);
      chip.innerHTML = `<span class="chip-num">${item.num}</span> <span>${item.name}</span>`;

      chip.addEventListener('click', () => selectAnatomyItem(item.id));
      chipsGrid.appendChild(chip);
    }
  });

  // Seleccionar por defecto el primer elemento
  if (items.length > 0) {
    selectAnatomyItem(items[0].id);
  }
}

function selectAnatomyItem(itemId) {
  activeAnatomyItemId = itemId;
  const speciesData = anatomyAtlas[currentAnatomySpecies];
  if (!speciesData) return;
  const layerData = speciesData[currentAnatomyLayer];
  if (!layerData || !layerData.items) return;

  const item = layerData.items.find(i => i.id === itemId);
  if (!item) return;

  // Actualizar clases activas en Pines
  document.querySelectorAll('.anatomy-pin').forEach(pin => {
    if (pin.getAttribute('data-id') === itemId) {
      pin.classList.add('active');
    } else {
      pin.classList.remove('active');
    }
  });

  // Actualizar clases activas en Chips
  document.querySelectorAll('.anat-chip-btn').forEach(chip => {
    if (chip.getAttribute('data-id') === itemId) {
      chip.classList.add('active');
      chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      chip.classList.remove('active');
    }
  });

  // Actualizar panel lateral con animación suave
  const panel = document.getElementById('anatomyInfoPanel');
  if (!panel) return;

  panel.style.opacity = '0.5';
  panel.style.transform = 'translateY(4px)';

  setTimeout(() => {
    const speciesLabel = currentAnatomySpecies === 'perro' ? 'Canino' : 'Felino';
    const layerLabel = currentAnatomyLayer === 'musculos' ? 'Sistema Muscular' : (currentAnatomyLayer === 'esqueleto' ? 'Sistema Óseo' : 'Anatomía General');

    const tagEl = document.getElementById('anatRegionNumber');
    const titleEl = document.getElementById('anatRegionTitle');
    const subtitleEl = document.getElementById('anatRegionSubtitle');
    const locEl = document.getElementById('anatLocation');
    const funcEl = document.getElementById('anatFunction');
    const clinEl = document.getElementById('anatClinical');
    const welfEl = document.getElementById('anatWelfare');

    if (tagEl) tagEl.textContent = `${speciesLabel} • ${layerLabel} (#${item.num})`;
    if (titleEl) titleEl.textContent = item.name;
    if (subtitleEl) subtitleEl.textContent = item.subtitle;
    if (locEl) locEl.textContent = item.location;
    if (funcEl) funcEl.textContent = item.function;
    if (clinEl) clinEl.textContent = item.clinical;
    if (welfEl) welfEl.textContent = item.welfare;

    panel.style.opacity = '1';
    panel.style.transform = 'translateY(0)';
  }, 120);
}

/* ==========================================================================
   3. SIMULADOR DE TRIAGE CLÍNICO Y CONSTANTES VITALES (HERRAMIENTA JURADO)
   ========================================================================== */
function initTriageSimulator() {
  const selectSpecies = document.getElementById('selectSpecies');
  const inputFC = document.getElementById('inputFC');
  const inputFR = document.getElementById('inputFR');
  const inputTemp = document.getElementById('inputTemp');
  const selectTLLC = document.getElementById('selectTLLC');

  const valFC = document.getElementById('valFC');
  const valFR = document.getElementById('valFR');
  const valTemp = document.getElementById('valTemp');
  const valSpecies = document.getElementById('valSpecies');
  const fcNormalLabel = document.getElementById('fcNormalLabel');
  const frNormalLabel = document.getElementById('frNormalLabel');
  const tempNormalLabel = document.getElementById('tempNormalLabel');

  if (!selectSpecies || !inputFC || !inputFR || !inputTemp || !selectTLLC) return;

  function updateSpeciesLabels() {
    const sp = selectSpecies.value;
    if (sp === 'gato') {
      valSpecies.textContent = 'Gato adulto';
      fcNormalLabel.textContent = 'Gato: 140-220 lpm';
      frNormalLabel.textContent = 'Gato: 20-30 rpm';
      tempNormalLabel.textContent = 'Gato: 38.1 - 39.2 °C';
    } else if (sp === 'gato_cachorro') {
      valSpecies.textContent = 'Gato cachorro';
      fcNormalLabel.textContent = 'Gato cachorro: 160-240 lpm';
      frNormalLabel.textContent = 'Gato cachorro: 25-40 rpm';
      tempNormalLabel.textContent = 'Gato cachorro: 38.0 - 39.3 °C';
    } else if (sp === 'perro_cachorro') {
      valSpecies.textContent = 'Perro cachorro';
      fcNormalLabel.textContent = 'Perro cachorro: 110-220 lpm';
      frNormalLabel.textContent = 'Perro cachorro: 15-40 rpm';
      tempNormalLabel.textContent = 'Perro cachorro: 38.0 - 39.3 °C';
    } else {
      valSpecies.textContent = 'Perro adulto';
      fcNormalLabel.textContent = 'Perro: 60-160 lpm';
      frNormalLabel.textContent = 'Perro: 10-30 rpm';
      tempNormalLabel.textContent = 'Perro: 37.5 - 39.2 °C';
    }
  }

  function updateSimulator() {
    const species = selectSpecies.value;
    const fc = parseInt(inputFC.value, 10);
    const fr = parseInt(inputFR.value, 10);
    const temp = parseFloat(inputTemp.value);
    const tllc = parseFloat(selectTLLC.value);

    valFC.textContent = `${fc} lpm`;
    valFR.textContent = `${fr} rpm`;
    valTemp.textContent = `${temp.toFixed(1)} °C`;

    updateSpeciesLabels();
    evaluateTriage(species, fc, fr, temp, tllc);
  }

  inputFC.addEventListener('input', updateSimulator);
  inputFR.addEventListener('input', updateSimulator);
  inputTemp.addEventListener('input', updateSimulator);
  selectTLLC.addEventListener('change', updateSimulator);
  selectSpecies.addEventListener('change', () => {
    const sp = selectSpecies.value;
    if (sp === 'gato') loadTriagePreset('gato_sano');
    else if (sp === 'gato_cachorro') loadTriagePreset('gato_cachorro_sano');
    else if (sp === 'perro_cachorro') loadTriagePreset('perro_cachorro_sano');
    else loadTriagePreset('normal');
  });

  updateSimulator();
}

function evaluateTriage(species, fc, fr, temp, tllc) {
  const card = document.getElementById('triageIndicator');
  const title = document.getElementById('triageClassTitle');
  const headline = document.getElementById('triageHeadline');
  const desc = document.getElementById('triageDesc');
  const action = document.getElementById('triageActionText');

  let speciesName = 'canino';
  let normal = { fcMin: 60, fcMax: 160, frMin: 10, frMax: 30, tempMin: 37.5, tempMax: 39.2 };

  if (species === 'gato') {
    speciesName = 'felino adulto';
    normal = { fcMin: 140, fcMax: 220, frMin: 20, frMax: 30, tempMin: 38.1, tempMax: 39.2 };
  } else if (species === 'gato_cachorro') {
    speciesName = 'gatito/cachorro felino';
    normal = { fcMin: 160, fcMax: 240, frMin: 25, frMax: 40, tempMin: 38.0, tempMax: 39.3 };
  } else if (species === 'perro_cachorro') {
    speciesName = 'cachorro canino';
    normal = { fcMin: 110, fcMax: 220, frMin: 15, frMax: 40, tempMin: 38.0, tempMax: 39.3 };
  } else {
    speciesName = 'canino adulto';
  }

  const red =
    fc > (normal.fcMax + 40) || fc < (normal.fcMin - 20) ||
    fr > (normal.frMax + 20) || fr < 8 ||
    temp > 40.2 || temp < 36.5 ||
    tllc >= 4.0;

  const orange =
    fc > (normal.fcMax + 20) || fc < (normal.fcMin - 10) ||
    fr > (normal.frMax + 10) || fr < 10 ||
    temp > 39.6 || temp < 37.2 ||
    tllc >= 3.0;

  const outOfNormal =
    fc < normal.fcMin || fc > normal.fcMax ||
    fr < normal.frMin || fr > normal.frMax ||
    temp < normal.tempMin || temp > normal.tempMax ||
    tllc >= 2.5;

  card.className = 'triage-status-card';

  if (red) {
    card.classList.add('status-red');
    title.textContent = 'CÓDIGO ROJO: EMERGENCIA VETERINARIA CRÍTICA';
    headline.textContent = 'Compromiso Sistémico Severo / Riesgo de Shock';
    const redCauses = species.includes('gato')
      ? 'obstrucción uretral, panleucopenia felina, sepsis agudizada o hipotermia severa'
      : 'parvovirus canino hemorrágico, sepsis, shock hipovolémico o deshidratación grave';
    desc.textContent = `Se detectan constantes severamente descompensadas (FC: ${fc} lpm, FR: ${fr} rpm, T°: ${temp} °C, TLLC: ${tllc} s). En un ${speciesName} esto sugiere ${redCauses}.`;
    action.textContent = 'CONTACTO VETERINARIO INMEDIATO. No administre fármacos humanos ni remedios caseros. Traslade de urgencia al centro clínico veterinario más cercano.';
  } else if (orange) {
    card.classList.add('status-orange');
    title.textContent = 'CÓDIGO NARANJA: URGENCIA CLÍNICA PRIORITARIA';
    headline.textContent = 'Estrés Fisiológico y Dolor Moderado a Severo';
    desc.textContent = `Valores con alteración patológica evidente (FC: ${fc} lpm, FR: ${fr} rpm, T°: ${temp} °C). Compatible con moquillo canino, leucemia felina sintomática, procesos infecciosos o dolor agudo en el ${speciesName}.`;
    action.textContent = 'Revisión veterinaria prioritaria (1-2 horas). Monitorice hidratación, estado mental, apetito y presencia de secreciones o vómitos.';
  } else if (outOfNormal) {
    card.classList.add('status-yellow');
    title.textContent = 'CÓDIGO AMARILLO: PRECAUCIÓN / MONITOREO ACTIVO';
    headline.textContent = 'Parámetros Ligeramente Fuera de Rango Fisiológico';
    desc.textContent = `Constantes vitales fuera del rango de reposo habitual (FC: ${fc} lpm, FR: ${fr} rpm, T°: ${temp} °C). Puede asociarse a diabetes mellitus, estrés transitorio o inicio subclínico de enfermedad en el ${speciesName}.`;
    action.textContent = 'Repetir la medición en 30 minutos con el paciente en completo reposo. Monitorear ingesta de agua, volumen de orina y comportamiento general.';
  } else {
    card.classList.add('status-green');
    title.textContent = 'CÓDIGO VERDE: ESTABILIDAD FISIOLÓGICA ÓPTIMA';
    headline.textContent = 'Parámetros dentro de Límites Normales de Reposo';
    desc.textContent = `Todos los indicadores (FC: ${fc} lpm, FR: ${fr} rpm, T°: ${temp} °C, TLLC: < 2 s) corresponden a un ${speciesName} sano en reposo fisiológico.`;
    action.textContent = 'Mantener la rutina preventiva habitual: nutrición acorde a la edad, agua fresca, esquema de vacunación y control parasitario.';
  }
}

// Preajustes para demostración rápida ante el jurado
window.loadTriagePreset = function(type) {
  const selectSpecies = document.getElementById('selectSpecies');
  const inputFC = document.getElementById('inputFC');
  const inputFR = document.getElementById('inputFR');
  const inputTemp = document.getElementById('inputTemp');
  const selectTLLC = document.getElementById('selectTLLC');

  if (!selectSpecies || !inputFC || !inputFR || !inputTemp || !selectTLLC) return;

  if (type === 'normal') {
    selectSpecies.value = 'perro';
    inputFC.value = 100;
    inputFR.value = 20;
    inputTemp.value = 38.5;
    selectTLLC.value = '1.5';
  } else if (type === 'perro_cachorro_sano') {
    selectSpecies.value = 'perro_cachorro';
    inputFC.value = 140;
    inputFR.value = 25;
    inputTemp.value = 38.6;
    selectTLLC.value = '1.5';
  } else if (type === 'gato_sano') {
    selectSpecies.value = 'gato';
    inputFC.value = 180;
    inputFR.value = 24;
    inputTemp.value = 38.6;
    selectTLLC.value = '1.5';
  } else if (type === 'gato_cachorro_sano') {
    selectSpecies.value = 'gato_cachorro';
    inputFC.value = 190;
    inputFR.value = 30;
    inputTemp.value = 38.7;
    selectTLLC.value = '1.5';
  } else if (type === 'parvovirus') {
    selectSpecies.value = 'perro_cachorro';
    inputFC.value = 230;
    inputFR.value = 55;
    inputTemp.value = 39.9;
    selectTLLC.value = '4.0';
  } else if (type === 'obstruccion') {
    selectSpecies.value = 'gato';
    inputFC.value = 255;
    inputFR.value = 48;
    inputTemp.value = 37.2;
    selectTLLC.value = '4.0';
  } else if (type === 'panleucopenia') {
    selectSpecies.value = 'gato_cachorro';
    inputFC.value = 250;
    inputFR.value = 50;
    inputTemp.value = 36.2;
    selectTLLC.value = '4.0';
  } else if (type === 'moquillo') {
    selectSpecies.value = 'perro';
    inputFC.value = 185;
    inputFR.value = 42;
    inputTemp.value = 39.7;
    selectTLLC.value = '2.5';
  } else if (type === 'felv') {
    selectSpecies.value = 'gato';
    inputFC.value = 225;
    inputFR.value = 36;
    inputTemp.value = 39.6;
    selectTLLC.value = '2.5';
  } else if (type === 'diabetes') {
    selectSpecies.value = 'perro';
    inputFC.value = 140;
    inputFR.value = 28;
    inputTemp.value = 39.3;
    selectTLLC.value = '2.5';
  }

  inputFC.dispatchEvent(new Event('input'));
};

/* ==========================================================================
   4. FILTROS PARA ENFERMEDADES
   ========================================================================== */
function initDiseaseFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const diseaseCards = document.querySelectorAll('.disease-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      diseaseCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. MODALES DE CUIDADOS BÁSICOS
   ========================================================================== */
const careDetails = {
  nutricion: {
    tag: "Protocolo de Nutrición y Digestión",
    title: "Alimentación Fisiológica de Perros y Gatos",
    content: `
      <h4>Necesidades Nutricionales Diferentes</h4>
      <p>El perro es una especie oportunista con adaptaciones a una dieta variada, mientras que el gato es un <strong>carnívoro obligado</strong>. El gato requiere nutrientes que no puede sintetizar en cantidad suficiente, como taurina, arginina, ácido araquidónico, vitamina A preformada y niacinа. La deficiencia de taurina puede causar cardiomiopatía dilatada y degeneración retiniana.</p>
      
      <h4>Reglas de Oro en la Alimentación:</h4>
      <ul>
        <li><strong>Dieta completa y equilibrada:</strong> Elegir alimentos formulados para la especie y etapa de vida. Las dietas caseras deben formularse con asesoría veterinaria para evitar deficiencias.</li>
        <li><strong>Raciones medidas:</strong> Ajustar según condición corporal (escala 1-9, ideal 4-5/9), edad, actividad y estado reproductivo. Evitar la obesidad, que predispone a diabetes, artrosis y problemas cardíacos.</li>
        <li><strong>Alimentos tóxicos:</strong> Chocolate, uvas y pasas, cebolla, ajo, alcohol y xilitol son peligrosos para los perros. En gatos, evitar leche de vaca y pescado crudo en exceso; nunca compartir alimentos medicados entre especies.</li>
        <li><strong>Transición gradual:</strong> Cambiar de alimento en 7-10 días mezclando proporciones crecientes del nuevo producto.</li>
        <li><strong>Agua siempre disponible:</strong> Lavar bebederos a diario y ofrecer varios puntos de agua, especialmente en gatos.</li>
      </ul>
    `
  },
  hidratacion: {
    tag: "Protocolo Hidroelectrolítico",
    title: "Manejo de la Hidratación y Calidad del Agua",
    content: `
      <h4>Fisiología del Agua en Perros y Gatos</h4>
      <p>El agua representa aproximadamente el 60% del peso corporal y es esencial para la función renal, la digestión y la termorregulación. Las necesidades orientativas son de 40 a 60 ml/kg/día, aunque varían con el clima, el ejercicio, la lactancia y el tipo de alimento (el alimento húmedo aporta agua).</p>

      <h4>Evaluación Rápida de Deshidratación:</h4>
      <ul>
        <li><strong>Prueba del pliegue cutáneo:</strong> La piel del dorso debe recuperar su posición en menos de 2 segundos. Un retorno lento puede indicar deshidratación, aunque es menos fiable en animales obesos o senior.</li>
        <li><strong>Mucosas y ojos:</strong> Encías secas o pegajosas, ojos hundidos y letargo son signos de alarma.</li>
        <li><strong>Orina:</strong> La disminución marcada de la producción de orina requiere evaluación veterinaria urgente.</li>
        <li><strong>Gatos:</strong> Muchos prefieren agua corriente; las fuentes y el alimento húmedo ayudan a aumentar el consumo. Colocar varios bebederos lejos del arenero y del comedero.</li>
      </ul>
    `
  },
  higiene: {
    tag: "Protocolo de Dermatología y Aseo",
    title: "Higiene Integral de Perros y Gatos",
    content: `
      <h4>El Cepillado como Exploración Diaria</h4>
      <p>El cepillado elimina pelo muerto, distribuye los aceites naturales de la piel y permite detectar parásitos, heridas, masas o zonas dolorosas. En gatos de pelo largo reduce la formación de bolas de pelo.</p>

      <h4>Pasos Metódicos de Higiene:</h4>
      <ul>
        <li><strong>1. Cepillado:</strong> Usar cepillos adecuados al tipo de manto; cepillar suavemente en la dirección del pelo y revisar axilas, ingles y detrás de las orejas.</li>
        <li><strong>2. Baños:</strong> Con champú veterinario y solo cuando sea necesario (cada 4-8 semanas o según indicación). Nunca usar champú humano; evitar productos con permetrina en gatos.</li>
        <li><strong>3. Orejas:</strong> Limpiar solo la parte visible del pabellón auricular con una gasa y solución veterinaria; no introducir hisopos profundos.</li>
        <li><strong>4. Dientes:</strong> Cepillar con pasta dental veterinaria y cepillo suave, idealmente a diario o al menos 2-3 veces por semana.</li>
      </ul>
    `
  },
  garras: {
    tag: "Podología y Cuidado de Garras",
    title: "Corte de Uñas, Garras y Cuidado de Almohadillas",
    content: `
      <h4>Anatomía de la Uña</h4>
      <p>La uña está formada por queratina y contiene en su interior el <strong>quick</strong>, una zona rosada con vasos sanguíneos y nervios. Cortar demasiado cerca produce dolor y sangrado. En gatos, las uñas son retráctiles y se desgastan con el rascado, pero pueden crecer en exceso en interiores.</p>

      <h4>Medidas Preventivas Fundamentales:</h4>
      <ul>
        <li><strong>Corte seguro:</strong> Usar cortaúñas adecuados y cortar solo la punta transparente; en uñas oscuras, hacer cortes pequeños y observar la sección. Tener polvo hemostático disponible.</li>
        <li><strong>Frecuencia:</strong> Perros cada 3-4 semanas; gatos cada 2-4 semanas o cuando las uñas se enganchen en telas o se curven hacia la almohadilla.</li>
        <li><strong>Rascadores para gatos:</strong> Ofrecer rascadores verticales y horizontales para el desgaste natural y para evitar que usen muebles.</li>
        <li><strong>Almohadillas:</strong> Revisar después de paseos; evitar asfalto caliente, hielo y sales. Acudir al veterinario ante cortes, cojera, inflamación o cuerpos extraños.</li>
      </ul>
    `
  },
  actividad: {
    tag: "Medicina del Comportamiento y Ejercicio",
    title: "Programa de Ejercicio, Juego y Descanso",
    content: `
      <h4>Ejercicio Adaptado a Cada Especie</h4>
      <p>El ejercicio regular previene la obesidad, fortalece el sistema musculoesquelético y mejora el bienestar emocional. En gatos, el juego simula la caza y es fundamental para la salud mental.</p>

      <h4>Estructura de la Rutina:</h4>
      <ul>
        <li><strong>Perros:</strong> 30-60 minutos diarios de actividad adaptada a raza, edad y salud. Cachorros y razas braquicéfalas necesitan sesiones cortas y controladas; evitar ejercicio intenso con calor.</li>
        <li><strong>Gatos:</strong> 2-3 sesiones de juego de 10-15 minutos al día con juguetes tipo caña, pelota o ratón; rotar juguetes para mantener el interés.</li>
        <li><strong>Enriquecimiento:</strong> Espacios verticales, escondites, cajas, rascadores y comederos interactivos para gatos; paseos con olfateo y juegos de búsqueda para perros.</li>
        <li><strong>Descanso:</strong> Respetar el sueño y ofrecer camas y zonas tranquilas; los animales senior necesitan rampas y periodos de descanso más frecuentes.</li>
      </ul>
    `
  },
  veterinaria: {
    tag: "Semiología y Examen Clínico",
    title: "Protocolo del Examen Físico General en Perros y Gatos",
    content: `
      <h4>La Rutina Semiológica Reglamentaria</h4>
      <p>El médico veterinario realiza una evaluación clínica metódica, comenzando por la cabeza y avanzando hacia el tercio caudal, para no omitir ningún sistema orgánico.</p>

      <h4>Puntos Clave del Chequeo Clínico Periódico:</h4>
      <ul>
        <li><strong>1. Constantes vitales en reposo:</strong> Perro: FC 60-160 lpm, FR 10-30 rpm, T° 37.5-39.2 °C. Gato: FC 140-220 lpm, FR 20-30 rpm, T° 38.1-39.2 °C. TLLC < 2 s.</li>
        <li><strong>2. Evaluación de mucosas:</strong> Color rosado pálido normal; valorar palidez, ictericia, cianosis y tiempo de llenado capilar.</li>
        <li><strong>3. Salud dental:</strong> Revisión de sarro, gingivitis, piezas fracturadas y enfermedad periodontal; cepillado con pasta veterinaria.</li>
        <li><strong>4. Condición corporal:</strong> Escala 1-9, ideal 4-5/9; pesar en cada visita y ajustar la dieta.</li>
        <li><strong>5. Prevención:</strong> Vacunas según riesgo, desparasitación con coprología, control de pulgas y garrapatas, microchip y análisis de sangre en animales senior.</li>
      </ul>
    `
  }
};

window.openCareModal = function(careKey) {
  const data = careDetails[careKey];
  if (!data) return;

  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBody').innerHTML = data.content;

  const backdrop = document.getElementById('careModalBackdrop');
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeCareModal = function(event) {
  if (event && event.target && event.target !== event.currentTarget && !event.target.classList.contains('modal-close-btn') && !event.target.closest('.modal-close-btn') && !event.target.classList.contains('btn-secondary')) {
    return;
  }
  const backdrop = document.getElementById('careModalBackdrop');
  backdrop.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const backdrop = document.getElementById('careModalBackdrop');
    if (backdrop && !backdrop.classList.contains('hidden')) {
      backdrop.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }
});

/* ==========================================================================
   6. EVALUACIÓN INTERACTIVA (QUIZ DE 10 PREGUNTAS VETERINARIAS)
   ========================================================================== */
const quizQuestions = [
  {
    question: "1. ¿Cuál es el rango fisiológico normal de la frecuencia cardíaca en un perro adulto en reposo?",
    options: [
      "20 a 40 latidos por minuto",
      "60 a 160 latidos por minuto",
      "180 a 260 latidos por minuto",
      "300 a 350 latidos por minuto"
    ],
    correct: 1,
    explanation: "En reposo, un perro adulto suele presentar entre 60 y 160 lpm, con variaciones según la talla y la condición física. Los perros pequeños tienden a tener frecuencias más altas. Una frecuencia muy elevada o muy baja debe evaluarse por un veterinario."
  },
  {
    question: "2. ¿Cuál es el rango normal de temperatura rectal en un gato adulto?",
    options: [
      "35.0 a 36.0 °C",
      "36.0 a 37.0 °C",
      "38.1 a 39.2 °C",
      "40.5 a 41.5 °C"
    ],
    correct: 2,
    explanation: "La temperatura rectal normal del gato adulto se sitúa aproximadamente entre 38.1 y 39.2 °C. Valores superiores a 39.5 °C o inferiores a 37.5 °C pueden indicar fiebre, inflamación o hipotermia y requieren evaluación veterinaria."
  },
  {
    question: "3. ¿Cuál es la principal vía de transmisión del parvovirus canino?",
    options: [
      "Por picadura de mosquitos",
      "Por vía fecal-oral, mediante heces contaminadas",
      "Por contacto con la piel de un humano sano",
      "Por el aire a larga distancia"
    ],
    correct: 1,
    explanation: "El parvovirus canino se transmite principalmente por vía fecal-oral. El virus es muy resistente en el ambiente y puede permanecer infectante durante meses. La vacunación completa y la desinfección con hipoclorito diluido son medidas clave."
  },
  {
    question: "4. ¿Cuál de estos medicamentos humanos es especialmente tóxico para los gatos y nunca debe administrarse sin indicación veterinaria?",
    options: [
      "Paracetamol (acetaminofén)",
      "Suero fisiológico estéril",
      "Solución salina para limpieza de heridas",
      "Agua tibia"
    ],
    correct: 0,
    explanation: "El paracetamol puede causar metahemoglobinemia y daño hepático grave en gatos; el ibuprofeno también es peligroso. Nunca administre medicamentos humanos a perros o gatos sin indicación de un Médico Veterinario."
  },
  {
    question: "5. ¿Cómo se transmite principalmente el virus de la leucemia felina (FeLV)?",
    options: [
      "Por saliva, mordeduras y contacto íntimo entre gatos",
      "Por el aire a varios metros de distancia",
      "Por picadura de garrapatas",
      "Por compartir el arenero únicamente"
    ],
    correct: 0,
    explanation: "El FeLV se transmite principalmente por saliva (acicalamiento, comederos compartidos y mordeduras), sangre y de madre a cría. No se transmite a los humanos. La prueba previa y la vacunación en gatos de riesgo son medidas preventivas importantes."
  },
  {
    question: "6. Un gato macho que entra y sale del arenero, vocaliza y no logra orinar debe ser atendido:",
    options: [
      "En casa con abundante agua y observación durante 48 horas",
      "Como emergencia veterinaria inmediata",
      "Solo si presenta vómitos",
      "Con un antiparasitario de amplio espectro"
    ],
    correct: 1,
    explanation: "La obstrucción uretral felina es una emergencia potencialmente mortal. La retención de orina puede causar hiperpotasemia, arritmias y daño renal agudo en 24-72 horas. No se debe presionar la vejiga ni esperar."
  },
  {
    question: "7. ¿Cuál es la vacuna core (esencial) para gatos que protege contra panleucopenia, herpesvirus y calicivirus?",
    options: [
      "Vacuna FeLV",
      "Vacuna FVRCP",
      "Vacuna contra la rabia únicamente",
      "Vacuna contra Bordetella"
    ],
    correct: 1,
    explanation: "La vacuna FVRCP protege contra panleucopenia felina, rinotraqueítis por herpesvirus y calicivirosis. Es una vacuna core recomendada para todos los gatos, con series en gatitos y refuerzos según el protocolo veterinario."
  },
  {
    question: "8. ¿Cuál es el valor normal del tiempo de llenado capilar (TLLC) en perros y gatos sanos?",
    options: [
      "Menos de 2 segundos",
      "Entre 4 y 5 segundos",
      "Entre 6 y 8 segundos",
      "No se puede medir en pequeños animales"
    ],
    correct: 0,
    explanation: "El TLLC normal es menor de 2 segundos. Un tiempo prolongado puede indicar deshidratación, hipoperfusión o shock. Se evalúa presionando suavemente la mucosa gingival y observando el retorno del color rosado."
  },
  {
    question: "9. ¿Cuál de los siguientes signos es característico de diabetes mellitus en perros y gatos?",
    options: [
      "Disminución de la sed y de la orina",
      "Poliuria, polidipsia, polifagia y pérdida de peso",
      "Aumento de peso sin cambios de apetito",
      "Pelo brillante y aumento de energía"
    ],
    correct: 1,
    explanation: "La diabetes mellitus se manifiesta con poliuria, polidipsia, polifagia y pérdida de peso, además de letargo. En perros pueden aparecer cataratas y en gatos debilidad con marcha plantígrada. El diagnóstico y el tratamiento deben ser veterinarios."
  },
  {
    question: "10. ¿Cuál de estos alimentos es tóxico para los perros y nunca debe ofrecerse?",
    options: [
      "Pollo cocido sin hueso",
      "Zanahoria cocida",
      "Chocolate",
      "Arroz blanco cocido"
    ],
    correct: 2,
    explanation: "El chocolate contiene teobromina, tóxica para perros y gatos. Otros alimentos peligrosos son uvas y pasas, cebolla, ajo, alcohol y xilitol. Ante una ingestión accidental, contacte de inmediato al veterinario."
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = []; // Almacena historial de respuestas para el informe final

function initQuizModule() {
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNextQuestion);
  }
  loadQuestion(0);
}

function loadQuestion(index) {
  const qData = quizQuestions[index];
  if (!qData) return;

  // Actualizar metadatos y barra de progreso
  document.getElementById('currentQuestionNum').textContent = index + 1;
  const progressPercent = ((index + 1) / quizQuestions.length) * 100;
  document.getElementById('quizProgressBar').style.width = `${progressPercent}%`;

  // Actualizar texto de la pregunta
  document.getElementById('questionText').textContent = qData.question;

  // Ocultar feedback previo
  const feedbackBox = document.getElementById('quizFeedback');
  feedbackBox.classList.add('hidden');
  feedbackBox.className = 'quiz-feedback hidden';

  // Deshabilitar botón siguiente hasta responder
  const nextBtn = document.getElementById('nextQuestionBtn');
  nextBtn.disabled = true;
  nextBtn.querySelector('span:first-child').textContent = (index === quizQuestions.length - 1) ? "Finalizar Evaluación" : "Siguiente Pregunta";

  // Renderizar opciones
  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  qData.options.forEach((optText, optIndex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[optIndex]}</span>
      <span class="option-text">${optText}</span>
    `;
    btn.addEventListener('click', () => handleOptionSelection(optIndex, btn));
    optionsList.appendChild(btn);
  });
}

function handleOptionSelection(selectedIndex, clickedBtn) {
  const qData = quizQuestions[currentQuestionIndex];
  const allOptionBtns = document.querySelectorAll('.option-btn');

  // Deshabilitar todos los botones para que no cambie de respuesta
  allOptionBtns.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === qData.correct;
  if (isCorrect) {
    userScore++;
    clickedBtn.classList.add('selected-correct');
  } else {
    clickedBtn.classList.add('selected-wrong');
    // Resaltar la correcta
    allOptionBtns[qData.correct].classList.add('show-correct');
  }

  // Guardar respuesta para revisión final
  userAnswers.push({
    questionNum: currentQuestionIndex + 1,
    questionText: qData.question,
    selectedOption: selectedIndex,
    correctOption: qData.correct,
    selectedText: qData.options[selectedIndex],
    correctText: qData.options[qData.correct],
    isCorrect: isCorrect,
    explanation: qData.explanation
  });

  // Actualizar contador en vivo
  document.getElementById('liveScoreText').textContent = userScore;

  // Mostrar Feedback
  const feedbackBox = document.getElementById('quizFeedback');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackDesc = document.getElementById('feedbackExplanation');

  feedbackBox.classList.remove('hidden');
  if (isCorrect) {
    feedbackBox.className = 'quiz-feedback correct';
    feedbackIcon.textContent = '✓';
    feedbackTitle.textContent = '¡Excelente! Respuesta Clínicamente Correcta';
  } else {
    feedbackBox.className = 'quiz-feedback wrong';
    feedbackIcon.textContent = '✗';
    feedbackTitle.textContent = 'Respuesta Incorrecta (Criterio Clínico Discrepante)';
  }
  feedbackDesc.textContent = qData.explanation;

  // Habilitar botón de continuar
  const nextBtn = document.getElementById('nextQuestionBtn');
  nextBtn.disabled = false;
}

function handleNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    showQuizSummary();
  }
}

function showQuizSummary() {
  document.getElementById('questionBox').classList.add('hidden');
  const summaryScreen = document.getElementById('quizSummaryScreen');
  summaryScreen.classList.remove('hidden');

  document.getElementById('finalScoreNumber').textContent = userScore;

  const verdictEl = document.getElementById('scoreVerdict');
  const summaryIcon = document.getElementById('summaryIcon');

  if (userScore >= 9) {
    summaryIcon.textContent = '🏆';
    verdictEl.innerHTML = `
      <h4>Criterio Clínico Veterinario Sobresaliente</h4>
      <p>Excelente dominio técnico de las constantes fisiológicas, prevención de parvovirus y panleucopenia, vacunación y bienestar de perros y gatos. Nivel óptimo para la defensa académica.</p>
    `;
  } else if (userScore >= 7) {
    summaryIcon.textContent = '🩺';
    verdictEl.innerHTML = `
      <h4>Conocimiento Clínico Aprobado y Sólido</h4>
      <p>Buen entendimiento de los cuidados básicos y signos clínicos mayores. Se recomienda repasar la desparasitación basada en riesgo, la triada de urgencia felina y el tiempo de llenado capilar.</p>
    `;
  } else {
    summaryIcon.textContent = '📚';
    verdictEl.innerHTML = `
      <h4>Requiere Refuerzo en Medicina Preventiva</h4>
      <p>Puntuación inferior al estándar clínico. Repase las fichas de semiología, urgencias urinarias y cuidados preventivos disponibles en la plataforma.</p>
    `;
  }

  // Generar lista de revisión detallada
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';

  userAnswers.forEach(ans => {
    const item = document.createElement('div');
    item.className = `review-item ${ans.isCorrect ? 'correct' : 'wrong'}`;
    item.innerHTML = `
      <span class="review-q-num">Pregunta ${ans.questionNum}: ${ans.isCorrect ? '✔ Acierto' : '✖ Fallo'}</span>
      <p><strong>Pregunta:</strong> ${ans.questionText}</p>
      <p><strong>Su respuesta:</strong> ${ans.selectedText}</p>
      ${!ans.isCorrect ? `<p><strong>Respuesta Correcta:</strong> ${ans.correctText}</p>` : ''}
      <p style="font-style: italic; color: #444; margin-top: 0.3rem;"><small><strong>Fundamento:</strong> ${ans.explanation}</small></p>
    `;
    reviewList.appendChild(item);
  });
}

window.restartQuiz = function() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = [];

  document.getElementById('liveScoreText').textContent = '0';
  document.getElementById('quizSummaryScreen').classList.add('hidden');
  document.getElementById('questionBox').classList.remove('hidden');

  loadQuestion(0);
};

/* ==========================================================================
   7. GESTIÓN DE CONTACTO
   ========================================================================== */
window.handleContactSubmit = function(event) {
  if (event) event.preventDefault();
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('formSuccessMessage');
  if (form && toast) {
    toast.classList.remove('hidden');
    form.reset();
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  }
};

/* ==========================================================================
   8. EFECTOS DE SCROLL Y VOLVER ARRIBA
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });
}

window.scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/* ==========================================================================
   9. RESPALDO OFFLINE PARA IMÁGENES (DEFENSA UNIVERSITARIA SIN CONEXIÓN)
   ========================================================================== */
function initImageOfflineFallbacks() {
  const images = document.querySelectorAll('img');
  // SVG elegante generado en línea con siluetas de perro y gato y fondo verde bosque
  const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='100%25' height='100%25' fill='%23184e38'/%3E%3Ccircle cx='400' cy='220' r='120' fill='%23d6e4f0' opacity='0.25'/%3E%3Cpath d='M330 180 C330 145, 360 125, 390 135 C405 120, 430 125, 435 145 C465 155, 475 185, 460 210 C445 235, 415 245, 390 238 C365 232, 330 215, 330 180 Z' fill='%23ffffff'/%3E%3Cpath d='M325 160 C300 170, 300 205, 330 220 C340 208, 338 185, 338 172 Z' fill='%23d6e4f0'/%3E%3Cpath d='M470 175 L490 140 L510 170 C525 165, 540 165, 555 170 L575 140 L595 175 C610 195, 608 225, 590 240 C565 260, 505 260, 480 240 C465 225, 462 195, 470 175 Z' fill='%23ffffff'/%3E%3Ctext x='400' y='420' fill='%23ffd166' font-family='sans-serif' font-size='22' font-weight='bold' text-anchor='middle'%3EVETSALUD &bull; Medicina de Perros y Gatos%3C/text%3E%3C/svg%3E";

  images.forEach(img => {
    img.addEventListener('error', () => {
      img.src = fallbackSvg;
    });
  });
}
