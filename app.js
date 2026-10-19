/**
 * Tablero de Control de Indicadores 2026
 * Archivo: app.js
 */

// Configuración adaptada para Tema Claro / Blanco
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

const historicoEvolucion = {
  infull: [99.1, 95.2, 97.4, 98.7, 96.9, 76.5, 81.0, 75.4, 62.9, null, null, null],
  ontime: [92.2, 84.1, 88.2, 87.0, 86.2, 74.1, 74.6, 71.9, 56.5, null, null, null],
  horasReg: [67, 62, 64, 90, 119, 71, 67, 68, 65, null, null, null],
  tiempoAses: [15.17, 22.48, 9.61, 9.66, 11.07, 9.66, 7.87, 8.62, 7.02, null, null, null],
  tiempoDif: [52.74, 26.82, 21.83, 12.67, 18.21, 26.42, 12.36, 9.92, 3.40, null, null, null]
};

// Datos para Treemap 1: Solicitudes por Área
const treemapSolicData = [
  { label: 'ALA', valor: 16, color: '#1f618d' },
  { label: 'I+D Bagley', valor: 9, color: '#0288d1' },
  { label: 'I+D Alimentos', valor: 9, color: '#2e7d32' },
  { label: 'I+D Brasil', valor: 4, color: '#1b5e20' },
  { label: 'Sin valor', valor: 4, color: '#7b1fa2' },
  { label: 'I+D Confectionary', valor: 4, color: '#9c27b0' },
  { label: 'I+D México', valor: 3, color: '#0d381e' },
  { label: 'Op Comex', valor: 3, color: '#0288d1' },
  { label: 'Calidad Alimentos', valor: 2, color: '#006064' },
  { label: 'ALA Interno', valor: 2, color: '#d84315' },
  { label: 'I+D Chile', valor: 1, color: '#102a43' },
  { label: 'I+D Ingrecor', valor: 1, color: '#a04000' },
  { label: 'MKT Confectionary', valor: 1, color: '#1e4620' },
  { label: 'Comex', valor: 1, color: '#1a365d' },
  { label: 'RT Bolivia', valor: 1, color: '#388e3c' },
  { label: 'COMEX', valor: 1, color: '#00838f' }
];

// Datos para Treemap 2: Tipo de Tareas
const treemapTareasData = [
  { label: 'Reunión/Participación en Espacios', valor: 33, color: '#1a5276' },
  { label: 'Actualizar/modificar documento', valor: 28, color: '#d35400' },
  { label: 'Consulta a exter o inter/Solic. a prove.', valor: 26, color: '#145a32' },
  { label: 'Estudio e incorporar la reglamentación', valor: 20, color: '#1e8449' },
  { label: 'Revisar Información', valor: 15, color: '#196f3d' },
  { label: 'Búsqueda de reglamentación', valor: 8, color: '#27ae60' },
  { label: 'Comunicar novedades', valor: 8, color: '#0e6251' },
  { label: 'Estudio de impacto para la Compañía', valor: 7, color: '#ba4a00' },
  { label: 'Ejecución de actividad', valor: 7, color: '#8e44ad' },
  { label: 'Generación de criterios', valor: 5, color: '#239b56' },
  { label: 'Búsqueda de información asociada al tema', valor: 3, color: '#2980b9' },
  { label: 'Capacitación', valor: 2, color: '#21618c' },
  { label: 'Interconsulta a otras áreas', valor: 2, color: '#5b2c6f' },
  { label: 'Pago a proveedores', valor: 1, color: '#e67e22' },
  { label: 'Tratamiento de desvíos / Reclamos', valor: 1, color: '#d81b60' }
];

// Base mensual consolidada
const dataPorMes = [
  // Enero (0)
  {
    solicIng: 117, solicSol: 116, solicSla: 107,
    tareasIng: 198, tareasFin: 195, tareasOntime: 190,
    infullGlobal: 99.1, ontimeGlobal: 92.2,
    infullProc: [100, 99.2, 98.5, 100, 100, 99.1],
    ontimeProc: [null, 93.1, 91.5, null, null, 92.2],
    backlogTotal: 1, backlogNoVenc: 1, backlogVenc: 0,
    horasProc: [12.0, 195.5, 180.0, 14.5, 35.2],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [18.2, 16.5, 12.4, 9.5, 6.2, 4.1, 3.2],
    areasHoras: [11.5, 14.2, 16.8, 8.4, 3.2, 2.5, 1.9]
  },
  // Febrero (1)
  {
    solicIng: 64, solicSol: 61, solicSla: 52,
    tareasIng: 142, tareasFin: 138, tareasOntime: 134,
    infullGlobal: 95.2, ontimeGlobal: 84.1,
    infullProc: [80.0, 96.0, 94.8, 100, 90.0, 95.2],
    ontimeProc: [null, 85.2, 83.5, null, null, 84.1],
    backlogTotal: 1, backlogNoVenc: 1, backlogVenc: 0,
    horasProc: [8.5, 160.0, 142.0, 10.0, 28.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [17.0, 15.2, 11.0, 8.5, 5.8, 3.9, 2.8],
    areasHoras: [10.2, 12.8, 14.5, 7.8, 2.9, 2.2, 1.5]
  },
  // Marzo (2)
  {
    solicIng: 77, solicSol: 75, solicSla: 68,
    tareasIng: 165, tareasFin: 160, tareasOntime: 155,
    infullGlobal: 97.4, ontimeGlobal: 88.2,
    infullProc: [100, 98.0, 96.5, 100, 95.0, 97.4],
    ontimeProc: [null, 89.1, 87.4, null, null, 88.2],
    backlogTotal: 2, backlogNoVenc: 1, backlogVenc: 1,
    horasProc: [10.0, 175.0, 150.0, 12.0, 31.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [16.5, 16.0, 10.5, 8.2, 5.5, 3.8, 2.5],
    areasHoras: [9.8, 13.5, 13.9, 7.2, 2.7, 2.0, 1.4]
  },
  // Abril (3)
  {
    solicIng: 78, solicSol: 77, solicSla: 68,
    tareasIng: 180, tareasFin: 176, tareasOntime: 170,
    infullGlobal: 98.7, ontimeGlobal: 87.0,
    infullProc: [100, 99.0, 98.0, 100, 96.0, 98.7],
    ontimeProc: [null, 87.5, 86.8, null, null, 87.0],
    backlogTotal: 3, backlogNoVenc: 1, backlogVenc: 2,
    horasProc: [14.0, 185.0, 165.0, 15.0, 40.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [15.8, 15.5, 11.2, 8.0, 5.2, 3.5, 2.2],
    areasHoras: [8.5, 12.0, 15.1, 6.9, 2.5, 1.8, 1.2]
  },
  // Mayo (4)
  {
    solicIng: 65, solicSol: 63, solicSla: 56,
    tareasIng: 155, tareasFin: 151, tareasOntime: 147,
    infullGlobal: 96.9, ontimeGlobal: 86.2,
    infullProc: [90.0, 97.5, 96.0, 100, 92.0, 96.9],
    ontimeProc: [null, 86.8, 85.5, null, null, 86.2],
    backlogTotal: 5, backlogNoVenc: 1, backlogVenc: 4,
    horasProc: [11.0, 170.0, 155.0, 13.0, 34.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [15.2, 14.8, 10.1, 7.8, 5.0, 3.2, 2.0],
    areasHoras: [7.9, 11.2, 13.8, 6.5, 2.2, 1.6, 1.1]
  },
  // Junio (5)
  {
    solicIng: 85, solicSol: 65, solicSla: 63,
    tareasIng: 172, tareasFin: 162, tareasOntime: 158,
    infullGlobal: 76.5, ontimeGlobal: 74.1,
    infullProc: [50.0, 78.2, 75.0, 60.0, 70.0, 76.5],
    ontimeProc: [null, 75.0, 73.8, null, null, 74.1],
    backlogTotal: 22, backlogNoVenc: 15, backlogVenc: 7,
    horasProc: [9.0, 155.0, 140.0, 11.0, 30.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [16.0, 15.0, 9.8, 7.5, 4.8, 3.0, 1.9],
    areasHoras: [6.8, 10.5, 12.5, 5.9, 1.9, 1.4, 0.9]
  },
  // Julio (6)
  {
    solicIng: 64, solicSol: 52, solicSla: 48,
    tareasIng: 150, tareasFin: 142, tareasOntime: 139,
    infullGlobal: 81.0, ontimeGlobal: 74.6,
    infullProc: [60.0, 83.0, 80.5, 70.0, 75.0, 81.0],
    ontimeProc: [null, 76.2, 74.0, null, null, 74.6],
    backlogTotal: 34, backlogNoVenc: 23, backlogVenc: 11,
    horasProc: [7.5, 148.0, 135.0, 9.5, 26.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [15.5, 14.5, 8.5, 7.0, 5.0, 2.8, 1.8],
    areasHoras: [5.5, 9.2, 11.5, 4.8, 1.5, 1.1, 0.8]
  },
  // Agosto (7)
  {
    solicIng: 57, solicSol: 43, solicSla: 41,
    tareasIng: 139, tareasFin: 130, tareasOntime: 127,
    infullGlobal: 75.4, ontimeGlobal: 71.9,
    infullProc: [40.0, 76.5, 74.2, 50.0, 68.0, 75.4],
    ontimeProc: [null, 73.0, 71.5, null, null, 71.9],
    backlogTotal: 48, backlogNoVenc: 27, backlogVenc: 21,
    horasProc: [6.0, 135.0, 125.0, 8.0, 22.0],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [14.8, 14.2, 7.5, 6.8, 4.5, 2.2, 1.7],
    areasHoras: [4.2, 8.1, 10.4, 3.5, 0.8, 0.7, 0.6]
  },
  // Septiembre (8)
  {
    solicIng: 62, solicSol: 39, solicSla: 35,
    tareasIng: 147, tareasFin: 135, tareasOntime: 133,
    infullGlobal: 62.9, ontimeGlobal: 56.5,
    infullProc: [0, 74.3, 63.2, 0, 50.0, 62.9],
    ontimeProc: [0, 62.9, 63.2, 0, 50.0, 56.5],
    backlogTotal: 71, backlogNoVenc: 32, backlogVenc: 39,
    horasProc: [0, 123.5, 112.25, 0, 6.1],
    areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'],
    areasSolic: [14.52, 14.52, 6.45, 6.45, 4.84, 1.61, 1.61],
    areasHoras: [3.05, 6.72, 9.60, 2.20, 0.37, 0.49, 0.89]
  },
  // Proyecciones
  { solicIng: 0, solicSol: 0, solicSla: 0, tareasIng: 0, tareasFin: 0, tareasOntime: 0, infullGlobal: 0, ontimeGlobal: 0, infullProc: [0,0,0,0,0,0], ontimeProc: [0,0,0,0,0,0], backlogTotal: 71, backlogNoVenc: 32, backlogVenc: 39, horasProc: [0,0,0,0,0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [0,0,0,0,0,0,0], areasHoras: [0,0,0,0,0,0,0] },
  { solicIng: 0, solicSol: 0, solicSla: 0, tareasIng: 0, tareasFin: 0, tareasOntime: 0, infullGlobal: 0, ontimeGlobal: 0, infullProc: [0,0,0,0,0,0], ontimeProc: [0,0,0,0,0,0], backlogTotal: 71, backlogNoVenc: 32, backlogVenc: 39, horasProc: [0,0,0,0,0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [0,0,0,0,0,0,0], areasHoras: [0,0,0,0,0,0,0] },
  { solicIng: 0, solicSol: 0, solicSla: 0, tareasIng: 0, tareasFin: 0, tareasOntime: 0, infullGlobal: 0, ontimeGlobal: 0, infullProc: [0,0,0,0,0,0], ontimeProc: [0,0,0,0,0,0], backlogTotal: 71, backlogNoVenc: 32, backlogVenc: 39, horasProc: [0,0,0,0,0], areasLabels: ['I+D Bagley', 'I+D Alimentos', 'I+D Brasil', 'I+D Confectionary', 'I+D México', 'I+D Chile', 'I+D Ingrecor'], areasSolic: [0,0,0,0,0,0,0], areasHoras: [0,0,0,0,0,0,0] }
];

// Plugin para valores numéricos enteros o decimales sobre barras
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
          // Si es entero muestra número entero, si tiene decimales muestra con coma
          const txt = Number.isInteger(val) ? val.toString() : Number(val).toFixed(2).replace('.', ',');
          ctx.fillText(txt, element.x, element.y - 4);
          ctx.restore();
        }
      });
    });
  }
};

let chartMetas, chartInfull, chartOntime, chartFlujos, chartBacklog, chartHoras, chartAreas, chartHorasReg, chartTiempoRta, chartTiempoMes;
let currentSelectedMonth = 8; // Septiembre

// Renderizador visual de Treemaps
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
        y: { 
          min: 40, 
          max: 105, 
          ticks: { callback: v => v + '%' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        x: { grid: { display: false } }
      }
    }
  });

  // 2. INFULL por Proceso
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

  // 3. ONTIME por Proceso
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

  // 4. Flujo Mensual (SEMÁFORO: Rojo -> Amarillo -> Verde)
  chartFlujos = new Chart(document.getElementById('chartFlujos'), {
    type: 'bar',
    plugins: [pluginValoresEnBarras],
    data: {
      labels: ['Ingresadas', 'Solucionadas / Finalizadas', 'Dentro de SLA / En Tiempo'],
      datasets: [
        {
          label: 'Solicitudes',
          data: [],
          // Rojo claro (Ingresadas) | Amarillo ámbar (Solucionadas) | Verde esmeralda (En SLA)
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
          borderColor: ['#dc2626', '#d97706', '#059669'],
          borderWidth: 1.2,
          borderRadius: 6
        },
        {
          label: 'Tareas',
          data: [],
          // Rojo carmesí intenso (Ingresadas) | Amarillo mostaza (Finalizadas) | Verde bosque (En Tiempo)
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
        y: { 
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
          ticks: { font: { size: 11 } }
        },
        x: { 
          grid: { display: false },
          ticks: { font: { size: 10.5, weight: '600' } }
        }
      },
      plugins: { 
        legend: { 
          position: 'top',
          labels: {
            boxWidth: 12,
            font: { size: 11.5, weight: '600' }
          }
        }
      }
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
        { 
          label: '% Solicitudes Recibidas', 
          data: [], 
          backgroundColor: '#06b6d4',
          borderColor: '#0891b2',
          borderWidth: 1,
          borderRadius: 4 
        },
        { 
          label: '% Horas Dedicadas', 
          data: [], 
          backgroundColor: '#f59e0b',
          borderColor: '#d97706',
          borderWidth: 1,
          borderRadius: 4 
        }
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

  // 10. Tiempo Promedio Respuesta Mensual (Achicado en ancho)
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

function actualizarDashboardPorMes(mesIdx) {
  currentSelectedMonth = mesIdx;
  const mesNombre = nombresMeses[mesIdx];
  const d = dataPorMes[mesIdx];

  // 1. Textos y encabezados
  document.getElementById('subtitulo-periodo').textContent = `Área de Legislación Alimentaria — Período: ${mesNombre} 2026`;
  document.getElementById('label-status').textContent = `Datos de ${mesNombre}`;
  
  const rangoTexto = mesIdx === 0 ? 'Enero 2026' : `Ene - ${nombresMesesAbrev[mesIdx]} 2026`;
  
  ['tag-evolucion', 'tag-tiempo-resp', 'tag-horas-reg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = rangoTexto;
  });

  ['tag-infull', 'tag-ontime', 'tag-flujo', 'tag-backlog', 'tag-horas', 'tag-areas', 'tag-tiempo-mes', 'tag-treemap-solic', 'tag-treemap-tareas'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = mesNombre;
  });

  const titleTiempoMes = document.getElementById('title-tiempo-mes');
  if (titleTiempoMes) titleTiempoMes.textContent = `Tiempo Promedio - ${mesNombre}`;

  const titleTreemapSolic = document.getElementById('title-treemap-solic');
  if (titleTreemapSolic) titleTreemapSolic.textContent = `Cantidad de Solicitudes por Área - ${mesNombre}`;

  const titleTreemapTareas = document.getElementById('title-treemap-tareas');
  if (titleTreemapTareas) titleTreemapTareas.textContent = `Tipo de Tareas - ${mesNombre}`;

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
  document.getElementById('kpi-backlog-sub').textContent = `Total Acumulado: ${d.backlogTotal}`;

  // 3. Evolución Dinámica
  const serieInfullHastaMes = historicoEvolucion.infull.map((val, idx) => (idx <= mesIdx ? val : null));
  const serieOntimeHastaMes = historicoEvolucion.ontime.map((val, idx) => (idx <= mesIdx ? val : null));
  const serieHorasRegHastaMes = historicoEvolucion.horasReg.map((val, idx) => (idx <= mesIdx ? val : null));
  const serieAsesHastaMes = historicoEvolucion.tiempoAses.map((val, idx) => (idx <= mesIdx ? val : null));
  const serieDifHastaMes = historicoEvolucion.tiempoDif.map((val, idx) => (idx <= mesIdx ? val : null));

  chartMetas.data.datasets[0].data = serieInfullHastaMes;
  chartMetas.data.datasets[1].data = serieOntimeHastaMes;
  chartMetas.update();

  chartTiempoRta.data.datasets[0].data = serieAsesHastaMes;
  chartTiempoRta.data.datasets[1].data = serieDifHastaMes;
  chartTiempoRta.update();

  chartHorasReg.data.datasets[0].data = serieHorasRegHastaMes;
  chartHorasReg.update();

  // 4. Gráficos de Proceso y Distribución
  chartInfull.data.datasets[1].data = d.infullProc;
  chartInfull.update();

  chartOntime.data.datasets[1].data = d.ontimeProc;
  chartOntime.update();

  // Flujo Mensual (actualización de datos)
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

  // 5. Tiempo Promedio Respuesta del Mes
  const valorAsesMes = historicoEvolucion.tiempoAses[mesIdx] !== null ? historicoEvolucion.tiempoAses[mesIdx] : 0;
  const valorDifMes = historicoEvolucion.tiempoDif[mesIdx] !== null ? historicoEvolucion.tiempoDif[mesIdx] : 0;
  chartTiempoMes.data.datasets[0].data = [valorAsesMes, valorDifMes];
  chartTiempoMes.update();

  // 6. Treemaps Dinámicos
  const factorSolic = d.solicIng > 0 ? (d.solicIng / 62) : 0;
  const factorTareas = d.tareasIng > 0 ? (d.tareasIng / 147) : 0;

  renderTreemap('treemap-solic-container', treemapSolicData, factorSolic);
  renderTreemap('treemap-tareas-container', treemapTareasData, factorTareas);
}

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  const selectMes = document.getElementById('select-mes');
  actualizarDashboardPorMes(parseInt(selectMes.value, 10));

  selectMes.addEventListener('change', (e) => {
    actualizarDashboardPorMes(parseInt(e.target.value, 10));
  });
});