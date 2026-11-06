# VETSALUD &bull; Medicina Veterinaria Preventiva de Perros y Gatos

> **«Cuidando la salud y el bienestar de perros y gatos»**  
> **Proyecto Académico de Medicina Veterinaria | Convocatoria 2026**  
> **Pie de Página Oficial:** «VetSalud | Proyecto Académico de Medicina Veterinaria | 2026»

---

## 1. Descripción General del Proyecto

**VetSalud** es una plataforma web educativa, interactiva y 100% responsiva diseñada para la **defensa de grado en Medicina Veterinaria ante el jurado calificador**.

El objetivo principal es acercar la semiología y la medicina preventiva a estudiantes, médicos veterinarios, criadores y tutores de **perros y gatos**, con énfasis en la **detección temprana de patologías**, el **bienestar animal** y la **prevención de la automedicación**.

---

## 2. Cómo Ejecutar la Página

La plataforma utiliza **HTML5, CSS3 y JavaScript nativo**. No requiere base de datos, Node.js ni servidores externos.

### Método 1: Apertura Directa
1. Ubica la carpeta del proyecto: `pagina de nani`.
2. Haz doble clic en `index.html`.
3. Se abrirá en el navegador predeterminado (Chrome, Edge, Firefox, Safari, Brave u Opera).

### Método 2: Servidor Local (Recomendado para la Defensa)
* **Con Python:**
  1. Abre una terminal en la carpeta del proyecto.
  2. Ejecuta:
     ```bash
     python -m http.server 8080
     ```
  3. Abre `http://localhost:8080`.
* **Con Live Server de VS Code:**
  1. Abre la carpeta en VS Code.
  2. Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

---

## 3. Secciones y Módulos

### 1. Barra Superior Académica y Encabezado
* Indicador: *Proyecto de Grado 2026 &bull; Facultad de Ciencias Veterinarias*.
* Línea de orientación veterinaria: `0424-3685596`.
* **Logotipo SVG:** siluetas de perro y gato con estetoscopio y cruz veterinaria.
* Menú responsive con navegación dinámica y resaltado de sección activa.

### 2. Portada (Inicio / Hero)
* Imagen de consulta veterinaria con un perro.
* Titular **VETSALUD** y eslogan: *«Cuidando la salud y el bienestar de perros y gatos»*.
* Botones de acción para explorar cuidados, enfermedades y evaluación.
* **Barra de constantes fisiológicas:**
  * Frecuencia cardíaca del perro: 60-160 lpm.
  * Frecuencia cardíaca del gato: 140-220 lpm.
  * Frecuencia respiratoria: perro 10-30 rpm; gato 20-30 rpm.
  * Temperatura rectal: perro 37.5-39.2 °C; gato 38.1-39.2 °C.

### 3. Sobre Nosotros
* Fundamentación del proyecto como herramienta de extensión universitaria.
* **Misión, Visión y Objetivo General**.
* **Cinco Pilares del Bienestar Animal en Perros y Gatos** basados en las Cinco Libertades y el modelo de los Cinco Dominios:
  1. Libre de hambre y sed.
  2. Libre de incomodidad.
  3. Libre de dolor, lesión y enfermedad.
  4. Libertad de expresión etológica.
  5. Libre de miedo y estrés.
* Ficha del investigador: **MV Simón Quintero**.

### 4. Cuidados Básicos de Perros y Gatos (6 Tarjetas con Modales)
1. **Alimentación y nutrición:** diferencias entre el perro oportunista y el gato carnívoro obligado; taurina, arginina, vitamina A preformada; alimentos tóxicos; condición corporal 1-9.
2. **Hidratación:** 40-60 ml/kg/día como orientación; prueba del pliegue cutáneo; fuentes de agua y alimento húmedo para gatos.
3. **Higiene y aseo:** cepillado, baños con champú veterinario, limpieza de orejas y cepillado dental.
4. **Uñas, garras y almohadillas:** corte seguro del quick, frecuencia de corte, rascadores y protección de almohadillas.
5. **Actividad física, juego y descanso:** 30-60 minutos diarios en perros; 2-3 sesiones de juego en gatos; enriquecimiento ambiental.
6. **Revisiones veterinarias:** examen anual, salud dental, vacunas, desparasitación, microchip y control de peso.

### 5. Enfermedades Frecuentes en Perros y Gatos (con Filtros)
Cada patología incluye descripción etiopatogénica, signos clínicos, prevención y conducta inmediata.
* **Parvovirus canino:** emergencia viral, diarrea hemorrágica, vómitos y deshidratación; vacunación core y desinfección con hipoclorito.
* **Obstrucción uretral felina:** emergencia urológica, más frecuente en gatos machos; disuria, vocalización y riesgo de hiperpotasemia.
* **Moquillo canino:** enfermedad viral sistémica con signos respiratorios, digestivos y neurológicos; prevención con vacuna DHPP.
* **Leucemia felina (FeLV):** retrovirus transmitido por saliva y contacto íntimo; prueba previa y vacunación en gatos de riesgo.
* **Panleucopenia felina:** parvovirus felino, urgencia viral con vómitos, diarrea y leucopenia; vacuna FVRCP.
* **Diabetes mellitus:** poliuria, polidipsia, polifagia y pérdida de peso; diagnóstico con glucemia y fructosamina; manejo con insulina y dieta.
* **Filtros:** Todas, Emergencias Críticas, Infecciosas Virales, Urológicas y Metabólicas.

### 6. Vacunación y Desparasitación Estratégica
* **Tabla de inmunización orientativa** basada en WSAVA:
  * Rabia (core/zoonosis).
  * DHPP canina: moquillo, adenovirus 2 y parvovirus.
  * Leptospirosis canina (riesgo/zoonosis).
  * Traqueobronquitis infecciosa canina (riesgo).
  * FVRCP felina: panleucopenia, herpesvirus y calicivirus.
  * FeLV felina (riesgo).
  * Influenza canina (riesgo).
* **Desparasitación basada en riesgo:** desparasitación inicial de cachorros y gatitos por riesgo zoonótico de *Toxocara*, coprología en adultos y prevención adaptada al estilo de vida.
* **Advertencias:** no usar productos para perros en gatos; algunos principios activos como la permetrina son tóxicos para los felinos.

### 7. Atlas Anatómico Interactivo 360° (Perros y Gatos)
Atlas dinámico multiespecie con láminas de alta resolución (1024x558 px), pines interactivos y fichas médicas completas:
* **Selector de Especie:** Perro (Canino) y Gato (Felino).
* **Selector de Lámina / Sistema:**
  1. **Regiones Clínicas Externas:** Exploración semiológica de cabeza, cuello, tórax, abdomen, extremidades y apoyo podal/cola.
  2. **Sistema Muscular:** 21+ músculos caninos y 18+ felinos (Masetero, Temporal, Cleidocefálico, Esternocefálico, Trapecio, Deltoides, Tríceps, Bíceps, Pectorales, Dorsal Ancho, Intercostales, Oblicuos, Recto abdominal, Glúteos, Cuádriceps, Isquiotibiales, Gastrocnemio, garras retráctiles, etc.).
  3. **Sistema Óseo / Esqueleto:** Huesos del perro (Cráneo, Mandíbula, Vértebras C1-C7, T1-T13, L1-L7, Escápula, Húmero, Radio/Cúbito, Pelvis, Fémur, Rótula, Tibia/Peroné, etc.); lámina del esqueleto felino preparada para incorporar la fotografía del usuario.
* **Ficha de Diagnóstico por Estructura:** Al pulsar sobre cualquier pin o botón de la lámina, despliega:
  * **Nombre anatómico** oficial (en español y terminología anatómica internacional).
  * **¿Dónde se encuentra?** (Ubicación precisa).
  * **¿Para qué sirve?** (Función biomecánica y fisiológica).
  * **Relevancia clínica veterinaria** (puntos de inyección, patologías frecuentes, signos de alarma).
  * **Relevancia para el bienestar animal**.

### 8. Simulador de Triage Clínico
* Permite seleccionar **perro adulto** o **gato adulto** y modificar:
  * Frecuencia cardíaca.
  * Frecuencia respiratoria.
  * Temperatura rectal.
  * Tiempo de llenado capilar (TLLC).
* Clasificación en tiempo real:
  * 🟢 **Código Verde:** estabilidad fisiológica.
  * 🟡 **Código Amarillo:** precaución y monitoreo.
  * 🟠 **Código Naranja:** urgencia clínica prioritaria.
  * 🔴 **Código Rojo:** emergencia crítica.
* Casos predefinidos: *Perro Sano*, *Gato Sano*, *Parvovirus Canino* y *Obstrucción Uretral Felina*.

### 9. Galería de Consejos Veterinarios
1. Manejo responsable y etología de perros y gatos.
2. Identificación temprana del dolor con escalas validadas (Feline Grimace Scale y Colorado State University Canine Acute Pain Scale).
3. Bioseguridad y limpieza del hogar.
4. Prevención de lesiones y obesidad.
5. Cuarentena de 14-21 días para nuevos ingresos.
6. Botiquín de primeros auxilios y advertencia sobre medicamentos humanos.

### 10. Evaluación Interactiva (Quiz de 10 Preguntas)
* Preguntas de selección múltiple con cuatro opciones.
* Corrección inmediata con explicación clínica.
* Barra de progreso y puntuación en vivo.
* Pantalla final con dictamen, desglose pedagógico y opción de repetir.

### 11. Fuentes Bibliográficas
* WSAVA Vaccination Guidelines.
* WSAVA Global Nutrition and Parasite Control Guidelines.
* Ettinger, Feldman & Côté — *Textbook of Veterinary Internal Medicine*.
* Greene — *Infectious Diseases of the Dog and Cat*.
* AAFP — *2020 Feline Retrovirus Testing and Management Guidelines*.
* *The Merck Veterinary Manual*.

### 12. Contacto y Pie de Página
* Ponente: **MV Simón Quintero**.
* Correo: `albertyquin43@gmail.com`.
* Teléfono: `0424-3685596`.
* Ficha de contacto y espacio reservado para el jurado calificador.
* Pie de página: **«VetSalud | Proyecto Académico de Medicina Veterinaria | 2026»**.

---

## 4. Paleta de Colores y Estilo Visual

| Color | Código Hex | Uso en la Plataforma |
| :--- | :--- | :--- |
| **Fondo Azul Claro** | `#d6e4f0` / `#edf4fa` | Fondos de secciones alternas, contenedores anatómicos y tarjetas |
| **Detalles Azul Oscuro** | `#0033cc` | Botones principales, enlaces, bordes de acento e iconos clínicos |
| **Verde Bosque Oscuro** | `#184e38` | Títulos, tarjetas institucionales, encabezados y barra superior |
| **Verde Turquesa** | `#008b8b` / `#169873` | Insignias de bienestar, detalles de anatomía y etiquetas |
| **Tonos Tierra (Cuero/Dorado)** | `#8b5a2b` / `#c29b38` | Siluetas de perro y gato, insignias y marcos de honor |
| **Blanco Puro** | `#ffffff` | Fondo de tarjetas, modales y tablas |
| **Triage Rojo** | `#d90429` | Parvovirus, panleucopenia, obstrucción uretral y shock |
| **Triage Naranja** | `#f77f00` | Moquillo, FeLV y dolor moderado a severo |
| **Triage Amarillo** | `#fcbf49` | Diabetes y monitoreo preventivo |
| **Triage Verde** | `#2a9d8f` | Parámetros fisiológicos y vacunas core |

---

## 5. Recomendaciones para la Defensa ante el Jurado

1. **Apertura:** muestra la portada y destaca el eslogan *«Cuidando la salud y el bienestar de perros y gatos»*, contextualizando la importancia de la medicina preventiva en pequeños animales.
2. **Anatomía interactiva:** selecciona **Tórax** y **Abdomen**, explicando la auscultación cardiorrespiratoria y la palpación abdominal en perros y gatos.
3. **Simulador de triage:** selecciona *Gato Sano* y luego *Obstrucción Uretral Felina*; explica el cambio a Código Rojo y la relación con la hiperpotasemia y el daño renal agudo.
4. **Desparasitación racional:** resalta la sección de inmunización para explicar la diferencia entre desparasitación inicial de cachorros/gatitos y control basado en riesgo en adultos.
5. **Cierre interactivo:** invita a un miembro del jurado a responder 2 o 3 preguntas de la **Evaluación Interactiva**.

---

*VetSalud | Proyecto Académico de Medicina Veterinaria | 2026*
