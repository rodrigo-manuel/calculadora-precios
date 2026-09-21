const btnCalcular = document.getElementById('btnCalcular');
const resultados = document.getElementById('resultados');
const inputCosto = document.getElementById('costo');
const inputFlete = document.getElementById('flete');

// --- Formateo en vivo con puntos de miles mientras escribes ---
function formatearMientrasEscribe(input) {
  input.addEventListener('input', () => {
    let valor = input.value.replace(/\D/g, ''); // deja solo dígitos
    if (valor === '') valor = '0';
    input.value = Number(valor).toLocaleString('es-CO');
  });
}

formatearMientrasEscribe(inputCosto);
formatearMientrasEscribe(inputFlete);

// --- Selecciona todo el contenido al enfocar el campo, para que el 0 se reemplace solo ---
function seleccionarAlEnfocar(input) {
  input.addEventListener('focus', () => {
    input.select();
  });
}

seleccionarAlEnfocar(inputCosto);
seleccionarAlEnfocar(inputFlete);
seleccionarAlEnfocar(document.getElementById('cantidad'));
seleccionarAlEnfocar(document.getElementById('porcentaje'));

// Convierte "20.000" (texto con puntos) de vuelta a número real
function limpiarNumero(valorTexto) {
  return parseFloat(valorTexto.replace(/\./g, '')) || 0;
}

btnCalcular.addEventListener('click', calcular);

function calcular() {
  const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
  const costo = limpiarNumero(inputCosto.value);
  const porcentaje = parseFloat(document.getElementById('porcentaje').value) || 0;
  const fleteTotal = limpiarNumero(inputFlete.value);

  if (cantidad <= 0 || costo <= 0) {
    alert('Ingresa una cantidad y un costo válidos (mayores a 0).');
    return;
  }

  const fletePorUnidad = fleteTotal / cantidad;
  const costoReal = costo + fletePorUnidad;
  const precioVenta = costoReal + (costoReal * (porcentaje / 100));
  const gananciaUnidad = precioVenta - costoReal;
  const gananciaTotal = gananciaUnidad * cantidad;
  const ventaTotal = precioVenta * cantidad;

  document.getElementById('rFletePorUnidad').textContent = formatear(fletePorUnidad);
  document.getElementById('rCostoReal').textContent = formatear(costoReal);
  document.getElementById('rPrecioVenta').textContent = formatear(precioVenta);
  document.getElementById('rGananciaUnidad').textContent = formatear(gananciaUnidad);
  document.getElementById('rGananciaTotal').textContent = formatear(gananciaTotal);
  document.getElementById('rVentaTotal').textContent = formatear(ventaTotal);

  resultados.classList.remove('oculto');
}

function formatear(numero) {
  return numero.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}