/**
 * Tablero de Control de Indicadores 2026
 * Archivo: app.js
 * 
 * - Actualizado con los datos de Octubre 2026 (30 novedades en Vigilancia Regulatoria).
 * - Soporte para Filtro por Mes (Ene - Dic) y Filtro por Trimestre (Q1 - Q4).
 * - Gráficos combinados (Real en Barras + Metas en Línea).
 * - Treemaps dinámicos y Mapa Mundial Coroplético de Vigilancia Regulatoria.
 */

Chart.defaults.color = '#475569';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.06)';

const nombresMeses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const nombresMesesAbrev = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const procesosLabels = [
  'Advocacy', 
  'Asesoramiento a Clientes', 
  'Difusión del conocimiento', 
  'Mejora Continua', 
  'Participación en proyectos y comites', 
  'GLOBAL'
];

const metasInfullProc = [100, 100, 99.6, 98.0, 100, 100];
const metasOntimeProc = [null, 91.0, 81.0, null, null, 87.0];

// Series históricas de evolución anual (Ene - Oct 2026)
const historicoEvolucion = {
  infull: [100.0, 95.2, 98.7, 98.7, 100.0, 78.8, 87.3, 89.5, 93.5, 67.2, null, null],
  ontime: [93.1, 84.1, 89.5, 87.0, 87.7, 75.3, 79.4, 82.5, 83.9, 63.8, null, null],
  horasReg: [67, 62, 64, 90, 119, 71, 67, 68, 65, 51, null, null],
  tiempoAses: [15.17, 22.48, 9.61, 9.66, 11.07, 9.66, 7.87, 8.62, 7.02, 5.22, null, null],
  tiempoDif: [52.74, 26.82, 21.83, 12.67, 18.21, 26.42, 12.36, 9.92, 3.40, 14.42, null, null]
};

// Treemaps base
const treemapSolicData = [
  { label: 'ALA', valor: 19, color: '#1f618d' },
  { label: 'I+D Bagley', valor: 8, color: '#0288d1' },
  { label: 'I+D Alimentos', valor: 7, color: '#2e7d32' },
  { label: 'Sin valor', valor: 6, color: '#7b1fa2' },
  { label: 'Comex', valor: 4, color: '#1a365d' },
  { label: 'I+D Brasil', valor: 3, color: '#1b5e20' },
  { label: 'MKT Confectionary', valor: 2, color: '#1e4620' },
  { label: 'I+D Ingrecor', valor: 2, color: '#a04000' },
  { label: 'MKT Bagley', valor: 2, color: '#e65100' },
  { label: 'I+D Funcionales', valor: 1, color: '#00838f' },
  { label: 'Calidad Alimentos', valor: 1, color: '#006064' },
  { label: 'Op Comex', valor: 1, color: '#0288d1' },
  { label: 'Calidad Bagley', valor: 1, color: '#d84315' }
];

const treemapTareasData = [
  { label: 'Reunión/Participación de espacios', valor: 46, color: '#1a5276' },
  { label: 'Revisar Información', valor: 20, color: '#196f3d' },
  { label: 'Actualizar/modificar documento', valor: 13, color: '#d35400' },
  { label: 'Estudiar e incorporar reglamentación', valor: 13, color: '#1e8449' },
  { label: 'Ejecución de actividad', valor: 12, color: '#8e44ad' },
  { label: 'Generación de criterios', valor: 8, color: '#239b56' },
  { label: 'Estudio de impacto para Compañía', valor: 8, color: '#ba4a00' },
  { label: 'Consulta a externos/proveedores', valor: 7, color: '#145a32' },
  { label: 'Interconsulta a otras áreas', valor: 5, color: '#5b2c6f' },
  { label: 'Comunicar Interesados', valor: 5, color: '#0e6251' },
  { label: 'Búsqueda de información', valor: 5, color: '#2980b9' },
  { label: 'Pago a proveedores', valor: 5, color: '#e67e22' },
  { label: 'Búsqueda de reglamentación', valor: 4, color: '#27ae60' },
  { label: 'Capacitación', valor: 3, color: '#21618c' }
];

// Novedades Regulatorias por Mes (DF-VigReg2026 - Vigilancia Regulatoria.xlsm)
const novedadesPorMes = [
  // Ene (0)
  { "ARG": 18, "BRA": 14, "MEX": 12, "CHL": 6, "COL": 5, "URY": 4, "PER": 3, "USA": 8, "ESP": 6, "ITA": 3, "DEU": 4, "FRA": 3, "GBR": 5, "CHN": 4, "KOR": 2, "SAU": 1 },
  // Feb (1)
  { "ARG": 15, "BRA": 11, "MEX": 9, "CHL": 5, "COL": 4, "URY": 3, "PER": 2, "USA": 7, "ESP": 5, "ITA": 2, "DEU": 3, "FRA": 2, "GBR": 4, "CHN": 3, "KOR": 1, "SAU": 1 },
  // Mar (2)
  { "ARG": 16, "BRA": 12, "MEX": 10, "CHL": 4, "COL": 5, "URY": 2, "PER": 3, "USA": 9, "ESP": 7, "ITA": 4, "DEU": 5, "FRA": 4, "GBR": 6, "CHN": 2, "KOR": 2, "SAU": 2 },
  // Abr (3)
  { "ARG": 14, "BRA": 10, "MEX": 8, "CHL": 5, "COL": 3, "URY": 2, "PER": 2, "USA": 6, "ESP": 4, "ITA": 3, "DEU": 3, "FRA": 2, "GBR": 3, "CHN": 1, "KOR": 1, "SAU": 0 },
  // May (4)
  { "ARG": 20, "BRA": 15, "MEX": 14, "CHL": 7, "COL": 6, "URY": 4, "PER": 4, "USA": 11, "ESP": 8, "ITA": 5, "DEU": 6, "FRA": 4, "GBR": 7, "CHN": 5, "KOR": 3, "SAU": 2 },
  // Jun (5)
  { "ARG": 17, "BRA": 13, "MEX": 11, "CHL": 6, "COL": 4, "URY": 3, "PER": 3, "USA": 8, "ESP": 6, "ITA": 3, "DEU": 4, "FRA": 3, "GBR": 5, "CHN": 3, "KOR": 2, "SAU": 1 },
  // Jul (6)
  { "ARG": 19, "BRA": 14, "MEX": 13, "CHL": 8, "COL": 5, "URY": 3, "PER": 4, "USA": 10, "ESP": 7, "ITA": 4, "DEU": 5, "FRA": 3, "GBR": 6, "CHN": 4, "KOR": 4, "SAU": 2 },
  // Ago (7)
  { "ARG": 16, "BRA": 12, "MEX": 10, "CHL": 6, "COL": 4, "URY": 2, "PER": 3, "USA": 9, "ESP": 5, "ITA": 3, "DEU": 4, "FRA": 3, "GBR": 5, "CHN": 3, "KOR": 2, "SAU": 3 },
  // Sep (8)
  { "ARG": 22, "BRA": 17, "MEX": 15, "CHL": 9, "COL": 7, "URY": 5, "PER": 4, "ECU": 3, "BOL": 3, "PRY": 2, "USA": 12, "ESP": 9, "ITA": 6, "DEU": 7, "FRA": 5, "GBR": 8, "CHN": 6, "KOR": 5, "SAU": 4, "VNM": 2, "TUR": 2 },
  // Oct (9) -> 30 novedades exactas actualizadas del nuevo Excel
  { 
    "ARG": 8, 
    "ESP": 2, 
    "FRA": 2, 
    "DEU": 2, 
    "ITA": 2, 
    "SAU": 3, 
    "PER": 2, 
    "CHN": 1, 
    "USA": 1, 
    "BRA": 1, 
    "CHL": 1, 
    "ECU": 1, 
    "GTM": 1, 
    "MAR": 1, 
    "SRB": 1, 
    "CPV": 1 
  },
  // Nov (10)
  {},
  // Dic (11)
  {}
];

const nombresPaisesES = {
  "ARG": "Argentina", "BRA": "Brasil", "MEX": "México", "CHL": "Chile",
  "COL": "Colombia", "URY": "Uruguay", "PER": "Perú", "ECU": "Ecuador",
  "BOL": "Bolivia", "PRY": "Paraguay", "USA": "Estados Unidos",
  "ESP": "España", "ITA": "Italia", "DEU": "Alemania", "FRA": "Francia",
  "GBR": "Reino Unido", "CHN": "China", "KOR": "Corea del Sur",
  "SAU": "Arabia Saudita", "VNM": "Vietnam", "TUR": "Turquía",
  "GTM": "Guatemala", "MAR": "Marruecos", "SRB": "Serbia",
  "CPV": "Cabo Verde"
};

// Datos mensuales base (Indicadores del area por mes 2026.xlsx)
const dataPorMes = [
  // Enero (0)
  { solicIng: 116, solicSol: 116, solicSla: 108, tareasIng: 207, tareasFin: 207, tareasOntime: 196, infullGlobal: 100.0, ontimeGlobal: 93.1, infullProc: [100.0, 100.0, 100.0, 100.0, 100.0, 100.0], ontimeProc: [83.3, 95.1, 90.2, 100.0, 100.0, 93.1], backlogTotal: 1, backlogNoVenc: 1, backlogVenc: 0, horasProc: [43.75, 645.2, 580.25, 509.75, 74.25], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [16.24, 7.69, 17.09, 10.26, 0.85, 1.71, 2.56], areasHoras: [3.66, 3.45, 2.73, 2.07, 0.11, 0.86, 1.08] },
  // Febrero (1)
  { solicIng: 63, solicSol: 60, solicSla: 53, tareasIng: 150, tareasFin: 150, tareasOntime: 141, infullGlobal: 95.2, ontimeGlobal: 84.1, infullProc: [100.0, 92.9, 97.0, 0, 0, 95.2], ontimeProc: [100.0, 85.7, 81.8, 0, 0, 84.1], backlogTotal: 1, backlogNoVenc: 1, backlogVenc: 0, horasProc: [94.0, 100.25, 243.5, 0.0, 0.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [3.12, 14.06, 26.56, 1.56, 0.0, 3.12, 3.12], areasHoras: [0.57, 15.08, 16.11, 1.48, 0.0, 0.34, 0.91] },
  // Marzo (2)
  { solicIng: 76, solicSol: 75, solicSla: 68, tareasIng: 207, tareasFin: 206, tareasOntime: 197, infullGlobal: 98.7, ontimeGlobal: 89.5, infullProc: [0, 97.6, 100.0, 100.0, 0, 98.7], ontimeProc: [0, 85.4, 94.1, 100.0, 0, 89.5], backlogTotal: 2, backlogNoVenc: 1, backlogVenc: 1, horasProc: [0.0, 188.25, 295.75, 6.0, 0.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [3.9, 9.09, 29.87, 6.49, 0.0, 0.0, 3.9], areasHoras: [4.29, 7.04, 31.07, 2.4, 0.0, 0.0, 0.77] },
  // Abril (3)
  { solicIng: 77, solicSol: 76, solicSla: 67, tareasIng: 240, tareasFin: 240, tareasOntime: 228, infullGlobal: 98.7, ontimeGlobal: 87.0, infullProc: [100.0, 100.0, 96.6, 0, 0, 98.7], ontimeProc: [100.0, 86.7, 86.2, 0, 0, 87.0], backlogTotal: 3, backlogNoVenc: 1, backlogVenc: 2, horasProc: [30.0, 137.85, 219.0, 0.0, 0.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [8.97, 5.13, 32.05, 5.13, 2.56, 2.56, 0.0], areasHoras: [8.53, 8.01, 22.23, 2.58, 0.65, 0.32, 0.0] },
  // Mayo (4)
  { solicIng: 65, solicSol: 65, solicSla: 57, tareasIng: 249, tareasFin: 248, tareasOntime: 241, infullGlobal: 100.0, ontimeGlobal: 87.7, infullProc: [100.0, 100.0, 100.0, 0, 100.0, 100.0], ontimeProc: [33.3, 94.6, 87.0, 0, 50.0, 87.7], backlogTotal: 5, backlogNoVenc: 1, backlogVenc: 4, horasProc: [9.0, 167.25, 204.25, 0.0, 54.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [12.31, 7.69, 21.54, 4.62, 0.0, 0.0, 1.54], areasHoras: [5.18, 4.83, 14.79, 7.54, 0.0, 0.0, 0.92] },
  // Junio (5)
  { solicIng: 85, solicSol: 67, solicSla: 64, tareasIng: 239, tareasFin: 239, tareasOntime: 229, infullGlobal: 78.8, ontimeGlobal: 75.3, infullProc: [50.0, 89.7, 93.8, 0.0, 0.0, 78.8], ontimeProc: [25.0, 89.7, 87.5, 0.0, 0.0, 75.3], backlogTotal: 22, backlogNoVenc: 15, backlogVenc: 7, horasProc: [129.0, 478.25, 395.0, 115.0, 27.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [4.71, 3.53, 11.76, 7.06, 0.0, 2.35, 2.35], areasHoras: [0.7, 0.79, 6.23, 1.27, 0.0, 0.35, 0.26] },
  // Julio (6)
  { solicIng: 63, solicSol: 55, solicSla: 50, tareasIng: 221, tareasFin: 219, tareasOntime: 212, infullGlobal: 87.3, ontimeGlobal: 79.4, infullProc: [0, 96.4, 89.7, 33.3, 33.3, 87.3], ontimeProc: [0, 82.1, 86.2, 33.3, 33.3, 79.4], backlogTotal: 34, backlogNoVenc: 23, backlogVenc: 11, horasProc: [0.0, 95.25, 277.5, 121.5, 17.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [4.69, 10.94, 14.06, 9.38, 1.56, 1.56, 3.12], areasHoras: [1.03, 10.76, 5.33, 1.76, 4.01, 0.2, 1.86] },
  // Agosto (7)
  { solicIng: 57, solicSol: 51, solicSla: 47, tareasIng: 198, tareasFin: 198, tareasOntime: 196, infullGlobal: 89.5, ontimeGlobal: 82.5, infullProc: [100.0, 96.2, 85.7, 0, 50.0, 89.5], ontimeProc: [100.0, 84.6, 82.1, 0, 50.0, 82.5], backlogTotal: 48, backlogNoVenc: 27, backlogVenc: 21, horasProc: [1.0, 350.45, 309.75, 0.0, 35.5], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [5.26, 24.56, 10.53, 8.77, 0.0, 3.51, 1.75], areasHoras: [1.79, 9.87, 1.54, 1.0, 0.0, 0.29, 0.43] },
  // Septiembre (8)
  { solicIng: 62, solicSol: 58, solicSla: 52, tareasIng: 234, tareasFin: 231, tareasOntime: 228, infullGlobal: 93.5, ontimeGlobal: 83.9, infullProc: [0.0, 94.7, 100.0, 0, 50.0, 93.5], ontimeProc: [0.0, 84.2, 90.5, 0, 50.0, 83.9], backlogTotal: 71, backlogNoVenc: 32, backlogVenc: 39, horasProc: [0.0, 161.25, 150.25, 0.0, 12.6], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [16.13, 14.52, 6.45, 6.45, 4.84, 1.61, 3.23], areasHoras: [5.09, 18.67, 8.64, 4.17, 2.47, 0.62, 2.47] },
  // Octubre (9)
  { solicIng: 58, solicSol: 39, solicSla: 37, tareasIng: 153, tareasFin: 151, tareasOntime: 149, infullGlobal: 67.2, ontimeGlobal: 63.8, infullProc: [0, 78.9, 50.0, 0.0, 0.0, 67.2], ontimeProc: [0, 76.3, 44.4, 0.0, 0.0, 63.8], backlogTotal: 90, backlogNoVenc: 45, backlogVenc: 45, horasProc: [0.0, 107.7, 142.5, 31.0, 27.0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [13.79, 12.07, 5.17, 0.0, 0.0, 0.0, 3.45], areasHoras: [5.68, 16.39, 1.78, 0.0, 0.0, 0.0, 2.76] },
  // Noviembre (10)
  { solicIng: 0, solicSol: 0, solicSla: 0, tareasIng: 0, tareasFin: 0, tareasOntime: 0, infullGlobal: 0, ontimeGlobal: 0, infullProc: [0,0,0,0,0,0], ontimeProc: [0,0,0,0,0,0], backlogTotal: 90, backlogNoVenc: 45, backlogVenc: 45, horasProc: [0,0,0,0,0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [0,0,0,0,0,0,0], areasHoras: [0,0,0,0,0,0,0] },
  // Diciembre (11)
  { solicIng: 0, solicSol: 0, solicSla: 0, tareasIng: 0, tareasFin: 0, tareasOntime: 0, infullGlobal: 0, ontimeGlobal: 0, infullProc: [0,0,0,0,0,0], ontimeProc: [0,0,0,0,0,0], backlogTotal: 90, backlogNoVenc: 45, backlogVenc: 45, horasProc: [0,0,0,0,0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [0,0,0,0,0,0,0], areasHoras: [0,0,0,0,0,0,0] }
];
// Consolidación trimestral automática
function calcularDatosTrimestre(mesesIndices) {
  let solicIng = 0, solicSol = 0, solicSla = 0;
  let tareasIng = 0, tareasFin = 0, tareasOntime = 0;
  let horasProc = [0, 0, 0, 0, 0];
  let backlogTotal = 0, backlogNoVenc = 0, backlogVenc = 0;

  mesesIndices.forEach(idx => {
    const m = dataPorMes[idx];
    solicIng += m.solicIng;
    solicSol += m.solicSol;
    solicSla += m.solicSla;
    tareasIng += m.tareasIng;
    tareasFin += m.tareasFin;
    tareasOntime += m.tareasOntime;
    for (let i = 0; i < 5; i++) {
      horasProc[i] += m.horasProc[i];
    }
  });

  const ultimoMesConDatos = [...mesesIndices].reverse().find(idx => dataPorMes[idx].solicIng > 0) ?? mesesIndices[0];
  backlogTotal = dataPorMes[ultimoMesConDatos].backlogTotal;
  backlogNoVenc = dataPorMes[ultimoMesConDatos].backlogNoVenc;
  backlogVenc = dataPorMes[ultimoMesConDatos].backlogVenc;

  const infullGlobal = solicIng > 0 ? Number(((solicSol / solicIng) * 100).toFixed(1)) : 0;
  const ontimeGlobal = solicIng > 0 ? Number(((solicSla / solicIng) * 100).toFixed(1)) : 0;

  const infullProc = dataPorMes[ultimoMesConDatos].infullProc;
  const ontimeProc = dataPorMes[ultimoMesConDatos].ontimeProc;

  return {
    solicIng, solicSol, solicSla,
    tareasIng, tareasFin, tareasOntime,
    infullGlobal, ontimeGlobal,
    infullProc, ontimeProc,
    backlogTotal, backlogNoVenc, backlogVenc,
    horasProc,
    areasLabels: dataPorMes[ultimoMesConDatos].areasLabels,
    areasSolic: dataPorMes[ultimoMesConDatos].areasSolic,
    areasHoras: dataPorMes[ultimoMesConDatos].areasHoras
  };
}

const dataTrimestres = {
  "Q1": calcularDatosTrimestre([0, 1, 2]),
  "Q2": calcularDatosTrimestre([3, 4, 5]),
  "Q3": calcularDatosTrimestre([6, 7, 8]),
  "Q4": calcularDatosTrimestre([9, 10, 11])
};

function consolidarNovedadesTrimestre(indices) {
  const result = {};
  indices.forEach(idx => {
    const novs = novedadesPorMes[idx] || {};
    Object.entries(novs).forEach(([pais, cant]) => {
      result[pais] = (result[pais] || 0) + cant;
    });
  });
  return result;
}

const novedadesPorTrimestre = {
  "Q1": consolidarNovedadesTrimestre([0, 1, 2]),
  "Q2": consolidarNovedadesTrimestre([3, 4, 5]),
  "Q3": consolidarNovedadesTrimestre([6, 7, 8]),
  "Q4": novedadesPorMes[9] // 30 novedades de Octubre
};

const pluginValoresEnBarras = {
  id: 'pluginValoresEnBarras',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (meta.hidden) return;
      meta.data.forEach((element, index) => {
        const val = dataset.data[index];
        if (val !== null && val !== undefined && val > 0) {
          ctx.save();
          ctx.fillStyle = '#1e293b';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          const txt = Number.isInteger(val) ? val.toString() : Number(val).toFixed(2).replace('.', ',');
          ctx.fillText(txt, element.x, element.y - 4);
          ctx.restore();
        }
      });
    });
  }
};

let chartMetas, chartInfull, chartOntime, chartFlujos, chartBacklog, chartHoras, chartAreas, chartHorasReg, chartTiempoRta, chartTiempoMes;
let modoFiltro = 'mes'; 
let currentSelectedMonth = 9; // Octubre por defecto
let currentSelectedQuarter = 'Q4'; 

let mapaMundial = null;
let geojsonLayer = null;
let geojsonData = null;

function getColorNovedades(d) {
  return d > 15 ? '#581c87' :
         d >= 10 ? '#7e22ce' :
         d >= 5  ? '#a855f7' :
         d >= 2  ? '#c084fc' :
         d >= 1  ? '#e9d5ff' :
                   '#e2e8f0';
}

async function initMapa() {
  const mapElement = document.getElementById('mapa-novedades');
  if (!mapElement) return;

  mapaMundial = L.map('mapa-novedades', {
    center: [20, 0],
    zoom: 2,
    minZoom: 1.5,
    maxZoom: 5,
    zoomControl: true,
    attributionControl: false
  });

  try {
    const res = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
    geojsonData = await res.json();
    actualizarCapaMapa();
  } catch (err) {
    console.error('Error al cargar GeoJSON mundial:', err);
  }
}

function actualizarCapaMapa() {
  if (!mapaMundial || !geojsonData) return;

  if (geojsonLayer) {
    mapaMundial.removeLayer(geojsonLayer);
  }

  const datosPeriodo = modoFiltro === 'mes' 
    ? (novedadesPorMes[currentSelectedMonth] || {}) 
    : (novedadesPorTrimestre[currentSelectedQuarter] || {});

  let totalPeriodo = 0;
  Object.values(datosPeriodo).forEach(cant => totalPeriodo += cant);
  
  const badgeTotal = document.getElementById('badge-total-novedades');
  if (badgeTotal) {
    badgeTotal.textContent = `Total Novedades: ${totalPeriodo}`;
  }

  geojsonLayer = L.geoJson(geojsonData, {
    style: function (feature) {
      const iso = feature.id;
      const cantidad = datosPeriodo[iso] || 0;
      return {
        fillColor: getColorNovedades(cantidad),
        weight: 1,
        opacity: 1,
        color: '#cbd5e1',
        fillOpacity: 0.85
      };
    },
    onEachFeature: function (feature, layer) {
      const iso = feature.id;
      const nombreES = nombresPaisesES[iso] || feature.properties.name;
      const cantidad = datosPeriodo[iso] || 0;

      layer.bindTooltip(`
        <div class="map-tooltip-content">
          <strong>${nombreES}</strong>
          <span>Novedades: <b>${cantidad}</b></span>
        </div>
      `, {
        sticky: true,
        direction: 'auto',
        className: 'custom-map-tooltip'
      });

      layer.on({
        mouseover: function (e) {
          const l = e.target;
          l.setStyle({ weight: 2.5, color: '#0284c7', fillOpacity: 0.95 });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            l.bringToFront();
          }
        },
        mouseout: function (e) {
          geojsonLayer.resetStyle(e.target);
        }
      });
    }
  }).addTo(mapaMundial);
}

function renderTreemap(containerId, items, factorEscala = 1) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const total = items.reduce((acc, curr) => acc + (curr.valor * factorEscala), 0);

  items.forEach(item => {
    const valCalculado = Math.round(item.valor * factorEscala);
    if (valCalculado <= 0) return;

    const peso = (valCalculado / total) * 100;
    const box = document.createElement('div');
    box.className = 'treemap-node';
    box.style.backgroundColor = item.color;
    box.style.flexBasis = `calc(${Math.max(peso * 1.8, 14)}% - 6px)`;
    box.style.flexGrow = (peso / 4).toFixed(2);

    box.innerHTML = `
      <span class="tm-label">${item.label}</span>
      <span class="tm-val">${valCalculado}</span>
    `;

    container.appendChild(box);
  });
}

function initCharts() {
  // 1. Evolución Real vs Meta
  chartMetas = new Chart(document.getElementById('chartEvolucionMetas'), {
    type: 'line',
    data: {
      labels: nombresMesesAbrev,
      datasets: [
        {
          label: 'INFULL Real',
          data: [],
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.08)',
          borderWidth: 2.5,
          tension: 0.25,
          pointRadius: ctx => (ctx.dataIndex === currentSelectedMonth && ctx.raw !== null ? 7 : 4),
          pointBackgroundColor: ctx => (ctx.dataIndex === currentSelectedMonth ? '#fff' : '#0284c7')
        },
        {
          label: 'ONTIME Real',
          data: [],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.08)',
          borderWidth: 2.5,
          tension: 0.25,
          pointRadius: ctx => (ctx.dataIndex === currentSelectedMonth && ctx.raw !== null ? 7 : 4),
          pointBackgroundColor: ctx => (ctx.dataIndex === currentSelectedMonth ? '#fff' : '#06b6d4')
        },
        {
          label: 'Meta INFULL (100%)',
          data: Array(12).fill(100),
          borderColor: '#d97706',
          borderDash: [5, 5],
          borderWidth: 1.8,
          pointRadius: 0
        },
        {
          label: 'Meta ONTIME (87%)',
          data: Array(12).fill(87),
          borderColor: '#dc2626',
          borderDash: [5, 5],
          borderWidth: 1.8,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { min: 40, max: 105, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // 2. INFULL por Proceso (Combinado)
  chartInfull = new Chart(document.getElementById('chartInfullProceso'), {
    data: {
      labels: procesosLabels,
      datasets: [
        {
          type: 'line',
          label: 'META INFULL',
          data: metasInfullProc,
          borderColor: '#16a34a',
          backgroundColor: '#16a34a',
          borderWidth: 2.8,
          pointRadius: 2.5,
          tension: 0,
          fill: false,
          order: 1
        },
        {
          type: 'bar',
          label: 'INFULL',
          data: [],
          backgroundColor: '#93c5fd',
          borderColor: '#60a5fa',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.55,
          order: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 25, bottom: 5, left: 5, right: 10 } },
      scales: {
        y: { min: 0, max: 110, ticks: { stepSize: 20, callback: v => (v <= 100 ? v + ' %' : '') }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false }, ticks: { maxRotation: 35, minRotation: 25, font: { size: 10 } } }
      },
      plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { size: 11 } } } }
    }
  });

  // 3. ONTIME por Proceso (Combinado)
  chartOntime = new Chart(document.getElementById('chartOntimeProceso'), {
    data: {
      labels: procesosLabels,
      datasets: [
        {
          type: 'line',
          label: 'META ONTIME',
          data: metasOntimeProc,
          borderColor: '#22c55e',
          backgroundColor: '#22c55e',
          borderWidth: 2.8,
          pointRadius: 2.5,
          tension: 0,
          fill: false,
          spanGaps: false,
          order: 1
        },
        {
          type: 'bar',
          label: 'ONTIME',
          data: [],
          backgroundColor: '#fb923c',
          borderColor: '#f97316',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.55,
          order: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 25, bottom: 5, left: 5, right: 10 } },
      scales: {
        y: { min: 0, max: 110, ticks: { stepSize: 20, callback: v => (v <= 100 ? v + ' %' : '') }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false }, ticks: { maxRotation: 35, minRotation: 25, font: { size: 10 } } }
      },
      plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { size: 11 } } } }
    }
  });

  // 4. Flujo
  chartFlujos = new Chart(document.getElementById('chartFlujos'), {
    type: 'bar',
    plugins: [pluginValoresEnBarras],
    data: {
      labels: ['Ingresadas', 'Solucionadas / Finalizadas', 'Dentro de SLA / En Tiempo'],
      datasets: [
        {
          label: 'Solicitudes',
          data: [],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
          borderColor: ['#dc2626', '#d97706', '#059669'],
          borderWidth: 1.2,
          borderRadius: 6
        },
        {
          label: 'Tareas',
          data: [],
          backgroundColor: ['#b91c1c', '#d97706', '#047857'],
          borderColor: ['#991b1b', '#b45309', '#065f46'],
          borderWidth: 1.2,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 22, bottom: 5, left: 5, right: 5 } },
      scales: {
        y: { grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10.5, weight: '600' } } }
      },
      plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11.5, weight: '600' } } } }
    }
  });

  // 5. Backlog
  chartBacklog = new Chart(document.getElementById('chartBacklog'), {
    type: 'bar',
    data: {
      labels: ['Backlog Total', 'No Vencido', 'Vencido (SLA)'],
      datasets: [{
        label: 'Cantidad Acumulada',
        data: [],
        backgroundColor: ['#0284c7', '#16a34a', '#dc2626'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
      },
      plugins: { legend: { display: false } }
    }
  });

  // 6. Horas por Proceso
  chartHoras = new Chart(document.getElementById('chartHorasProceso'), {
    type: 'doughnut',
    data: {
      labels: ['Advocacy', 'Asesoramiento', 'Difusión', 'Mejora Continua', 'Proyectos'],
      datasets: [{
        data: [],
        backgroundColor: ['#94a3b8', '#0284c7', '#06b6d4', '#64748b', '#d97706'],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} hs` } } }
    }
  });

  // 7. Áreas Clientes
  chartAreas = new Chart(document.getElementById('chartAreasClientes'), {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        { label: '% Solicitudes Recibidas', data: [], backgroundColor: '#06b6d4', borderColor: '#0891b2', borderWidth: 1, borderRadius: 4 },
        { label: '% Horas Dedicadas', data: [], backgroundColor: '#f59e0b', borderColor: '#d97706', borderWidth: 1, borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { 
        y: { ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // 8. % Horas Registradas
  chartHorasReg = new Chart(document.getElementById('chartHorasRegistradas'), {
    type: 'line',
    data: {
      labels: nombresMesesAbrev,
      datasets: [{
        label: '% Horas Registradas',
        data: [],
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: ctx => (ctx.dataIndex === currentSelectedMonth && ctx.raw !== null ? 8 : 4),
        pointBackgroundColor: ctx => (ctx.dataIndex === currentSelectedMonth ? '#fff' : '#16a34a')
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { 
        y: { min: 40, max: 130, ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // 9. Tiempo Promedio de Respuesta - Evolución
  chartTiempoRta = new Chart(document.getElementById('chartTiempoRespuestaEvol'), {
    type: 'line',
    data: {
      labels: nombresMesesAbrev,
      datasets: [
        {
          label: 'Asesoramiento (Días)',
          data: [],
          borderColor: '#d97706',
          borderWidth: 2.2,
          tension: 0.25,
          pointRadius: ctx => (ctx.dataIndex === currentSelectedMonth && ctx.raw !== null ? 7 : 4),
          pointBackgroundColor: ctx => (ctx.dataIndex === currentSelectedMonth ? '#fff' : '#d97706')
        },
        {
          label: 'Difusión Conoc. (Días)',
          data: [],
          borderColor: '#7c3aed',
          borderWidth: 2.2,
          tension: 0.25,
          pointRadius: ctx => (ctx.dataIndex === currentSelectedMonth && ctx.raw !== null ? 7 : 4),
          pointBackgroundColor: ctx => (ctx.dataIndex === currentSelectedMonth ? '#fff' : '#7c3aed')
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 15, bottom: 5, left: 5, right: 10 } },
      scales: {
        y: { min: 0, max: 60, ticks: { stepSize: 15, callback: v => v + ' d' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false } }
      },
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 6, font: { size: 10 } } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw !== null ? ctx.raw + ' d' : 'S/D'}` } }
      }
    }
  });

  // 10. Tiempo Promedio Respuesta del Período
  chartTiempoMes = new Chart(document.getElementById('chartTiempoRespuestaMes'), {
    type: 'bar',
    plugins: [pluginValoresEnBarras],
    data: {
      labels: ['Asesoramiento', 'Difusión'],
      datasets: [{
        label: 'Días Promedio',
        data: [],
        backgroundColor: ['rgba(244, 114, 182, 0.45)', 'rgba(134, 239, 172, 0.45)'],
        borderColor: ['#ec4899', '#22c55e'],
        borderWidth: 1.5,
        borderRadius: 6,
        barPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 22, bottom: 5, left: 5, right: 5 } },
      scales: {
        y: { min: 0, max: 70, ticks: { stepSize: 15, callback: v => v.toFixed(0) + 'd' }, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: '600' }, color: '#334155' } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function actualizarDashboard() {
  let d, labelPeriodo, mesCorte;

  if (modoFiltro === 'mes') {
    d = dataPorMes[currentSelectedMonth];
    labelPeriodo = nombresMeses[currentSelectedMonth];
    mesCorte = currentSelectedMonth;
  } else {
    d = dataTrimestres[currentSelectedQuarter];
    labelPeriodo = currentSelectedQuarter === 'Q1' ? 'Q1 (Ene - Mar)' :
                   currentSelectedQuarter === 'Q2' ? 'Q2 (Abr - Jun)' :
                   currentSelectedQuarter === 'Q3' ? 'Q3 (Jul - Sep)' :
                   'Q4 (Oct - Dic)';
    mesCorte = currentSelectedQuarter === 'Q1' ? 2 :
               currentSelectedQuarter === 'Q2' ? 5 :
               currentSelectedQuarter === 'Q3' ? 8 : 11;
  }

  // 1. Textos
  document.getElementById('subtitulo-periodo').textContent = `Área de Legislación Alimentaria — Período: ${labelPeriodo} 2026`;
  document.getElementById('label-status').textContent = `Datos de ${labelPeriodo}`;
  
  const rangoTexto = `Ene - ${nombresMesesAbrev[Math.min(mesCorte, 9)]} 2026`;
  ['tag-evolucion', 'tag-tiempo-resp', 'tag-horas-reg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = rangoTexto;
  });

  ['tag-infull', 'tag-ontime', 'tag-flujo', 'tag-backlog', 'tag-horas', 'tag-areas', 'tag-tiempo-mes', 'tag-treemap-solic', 'tag-treemap-tareas', 'tag-mapa'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = labelPeriodo;
  });

  const titleTiempoMes = document.getElementById('title-tiempo-mes');
  if (titleTiempoMes) titleTiempoMes.textContent = `Promedio - ${labelPeriodo}`;

  const titleTreemapSolic = document.getElementById('title-treemap-solic');
  if (titleTreemapSolic) titleTreemapSolic.textContent = `Solicitudes por Área - ${labelPeriodo}`;

  const titleTreemapTareas = document.getElementById('title-treemap-tareas');
  if (titleTreemapTareas) titleTreemapTareas.textContent = `Tipo de Tareas - ${labelPeriodo}`;

  const titleMapa = document.getElementById('title-mapa-novedades');
  if (titleMapa) {
    titleMapa.textContent = `Vigilancia Regulatoria: Novedades por País - ${labelPeriodo} 2026`;
  }

  // 2. Tarjetas KPIs
  document.getElementById('kpi-solic').textContent = d.solicIng;
  document.getElementById('kpi-solic-sub').textContent = `${d.solicSol} Solucionadas (${d.solicSla} en SLA)`;

  document.getElementById('kpi-tareas').textContent = d.tareasIng;
  document.getElementById('kpi-tareas-sub').textContent = `${d.tareasFin} Finalizadas (${d.tareasOntime} a tiempo)`;

  const infullCard = document.getElementById('card-infull');
  const infullVal = document.getElementById('kpi-infull');
  const infullSub = document.getElementById('kpi-infull-sub');
  infullVal.textContent = d.infullGlobal > 0 ? `${d.infullGlobal}%` : 'S/D';
  if (d.infullGlobal >= 100) {
    infullCard.className = 'kpi-card success';
    infullSub.className = 'kpi-sub pos';
    infullSub.textContent = 'Meta: 100% (Cumplida)';
  } else if (d.infullGlobal > 0) {
    infullCard.className = 'kpi-card alert';
    infullSub.className = 'kpi-sub neg';
    infullSub.textContent = `Meta: 100% (${(d.infullGlobal - 100).toFixed(1)}%)`;
  } else {
    infullCard.className = 'kpi-card';
    infullSub.className = 'kpi-sub';
    infullSub.textContent = 'Sin registros';
  }

  const ontimeCard = document.getElementById('card-ontime');
  const ontimeVal = document.getElementById('kpi-ontime');
  const ontimeSub = document.getElementById('kpi-ontime-sub');
  ontimeVal.textContent = d.ontimeGlobal > 0 ? `${d.ontimeGlobal}%` : 'S/D';
  if (d.ontimeGlobal >= 87) {
    ontimeCard.className = 'kpi-card success';
    ontimeSub.className = 'kpi-sub pos';
    ontimeSub.textContent = 'Meta: 87% (Cumplida)';
  } else if (d.ontimeGlobal > 0) {
    ontimeCard.className = 'kpi-card alert';
    ontimeSub.className = 'kpi-sub neg';
    ontimeSub.textContent = `Meta: 87% (${(d.ontimeGlobal - 87).toFixed(1)}%)`;
  } else {
    ontimeCard.className = 'kpi-card';
    ontimeSub.className = 'kpi-sub';
    ontimeSub.textContent = 'Sin registros';
  }

  document.getElementById('kpi-backlog').textContent = d.backlogVenc;
  document.getElementById('kpi-backlog-sub').textContent = `Backlog Total Acumulado: ${d.backlogTotal}`;

  // 3. Evolución Dinámica
  const serieInfullHastaCorte = historicoEvolucion.infull.map((val, idx) => (idx <= mesCorte ? val : null));
  const serieOntimeHastaCorte = historicoEvolucion.ontime.map((val, idx) => (idx <= mesCorte ? val : null));
  const serieHorasRegHastaCorte = historicoEvolucion.horasReg.map((val, idx) => (idx <= mesCorte ? val : null));
  const serieAsesHastaCorte = historicoEvolucion.tiempoAses.map((val, idx) => (idx <= mesCorte ? val : null));
  const serieDifHastaCorte = historicoEvolucion.tiempoDif.map((val, idx) => (idx <= mesCorte ? val : null));

  chartMetas.data.datasets[0].data = serieInfullHastaCorte;
  chartMetas.data.datasets[1].data = serieOntimeHastaCorte;
  chartMetas.update();

  chartTiempoRta.data.datasets[0].data = serieAsesHastaCorte;
  chartTiempoRta.data.datasets[1].data = serieDifHastaCorte;
  chartTiempoRta.update();

  chartHorasReg.data.datasets[0].data = serieHorasRegHastaCorte;
  chartHorasReg.update();

  // 4. Gráficos de Proceso y Flujo
  chartInfull.data.datasets[1].data = d.infullProc;
  chartInfull.update();

  chartOntime.data.datasets[1].data = d.ontimeProc;
  chartOntime.update();

  chartFlujos.data.datasets[0].data = [d.solicIng, d.solicSol, d.solicSla];
  chartFlujos.data.datasets[1].data = [d.tareasIng, d.tareasFin, d.tareasOntime];
  chartFlujos.update();

  chartBacklog.data.datasets[0].data = [d.backlogTotal, d.backlogNoVenc, d.backlogVenc];
  chartBacklog.update();

  chartHoras.data.datasets[0].data = d.horasProc;
  chartHoras.update();

  chartAreas.data.labels = d.areasLabels;
  chartAreas.data.datasets[0].data = d.areasSolic;
  chartAreas.data.datasets[1].data = d.areasHoras;
  chartAreas.update();

  // 5. Tiempo Promedio del Período
  let valorAses = 0, valorDif = 0;
  if (modoFiltro === 'mes') {
    valorAses = historicoEvolucion.tiempoAses[currentSelectedMonth] ?? 0;
    valorDif = historicoEvolucion.tiempoDif[currentSelectedMonth] ?? 0;
  } else {
    const mesesTrim = currentSelectedQuarter === 'Q1' ? [0, 1, 2] :
                      currentSelectedQuarter === 'Q2' ? [3, 4, 5] :
                      currentSelectedQuarter === 'Q3' ? [6, 7, 8] : [9];
    if (mesesTrim.length > 0) {
      const sumAses = mesesTrim.reduce((acc, m) => acc + (historicoEvolucion.tiempoAses[m] || 0), 0);
      const sumDif = mesesTrim.reduce((acc, m) => acc + (historicoEvolucion.tiempoDif[m] || 0), 0);
      valorAses = Number((sumAses / mesesTrim.length).toFixed(2));
      valorDif = Number((sumDif / mesesTrim.length).toFixed(2));
    }
  }
  chartTiempoMes.data.datasets[0].data = [valorAses, valorDif];
  chartTiempoMes.update();

  // 6. Treemaps Dinámicos
  const factorSolic = d.solicIng > 0 ? (d.solicIng / 58) : 0;
  const factorTareas = d.tareasIng > 0 ? (d.tareasIng / 153) : 0;
  renderTreemap('treemap-solic-container', treemapSolicData, factorSolic);
  renderTreemap('treemap-tareas-container', treemapTareasData, factorTareas);

  // 7. Mapa Mundial
  actualizarCapaMapa();
}

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initMapa();

  const btnModoMes = document.getElementById('btn-modo-mes');
  const btnModoTrimestre = document.getElementById('btn-modo-trimestre');
  const wrapperMes = document.getElementById('wrapper-select-mes');
  const wrapperTrimestre = document.getElementById('wrapper-select-trimestre');
  const selectMes = document.getElementById('select-mes');
  const selectTrimestre = document.getElementById('select-trimestre');

  btnModoMes.addEventListener('click', () => {
    modoFiltro = 'mes';
    btnModoMes.classList.add('active');
    btnModoTrimestre.classList.remove('active');
    wrapperMes.classList.remove('hidden');
    wrapperTrimestre.classList.add('hidden');
    actualizarDashboard();
  });

  btnModoTrimestre.addEventListener('click', () => {
    modoFiltro = 'trimestre';
    btnModoTrimestre.classList.add('active');
    btnModoMes.classList.remove('active');
    wrapperTrimestre.classList.remove('hidden');
    wrapperMes.classList.add('hidden');
    actualizarDashboard();
  });

  selectMes.addEventListener('change', (e) => {
    currentSelectedMonth = parseInt(e.target.value, 10);
    actualizarDashboard();
  });

  selectTrimestre.addEventListener('change', (e) => {
    currentSelectedQuarter = e.target.value;
    actualizarDashboard();
  });

  // Inicializa con Octubre seleccionado
  actualizarDashboard();
});