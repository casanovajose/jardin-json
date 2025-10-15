const botones = {
  fondos: [
    {nombre: "fondo1", img: "TIERRA-01.png"},
    {nombre: "fondo2", img: "TIERRA-02.png"},
    {nombre: "fondo3", img: "PASTO-03.png"},
  ],
  cosas: [
    {nombre: "cosa1", img: "GATITO-01.png"},
    {nombre: "cosa2", img: "PAJARITO-01.png"},
    {nombre: "cosa3", img: "FLOR-01.png"},
    {nombre: "cosa4", img: "FLOR-02.png"}
  ],
};


// Jardín de ejemplo
const jardinEjemplo = {
  nombre: "De tuin der lusten",
  autor: "Hieronymus Bosch",
  fondos: [
    {img: "TIERRA-01.png"}, {img: "PASTO-03.png"}, {img: "TIERRA-01.png"}, {img: "PASTO-03.png"},
    {img: "PASTO-03.png"}, {img: "TIERRA-02.png"}, {img: "PASTO-03.png"}, {img: "TIERRA-01.png"},
    {img: "TIERRA-01.png"}, {img: "PASTO-03.png"}, {img: "TIERRA-02.png"}, {img: "PASTO-03.png"},
    {img: "PASTO-03.png"}, {img: "TIERRA-01.png"}, {img: "PASTO-03.png"}, {img: "TIERRA-02.png"}
  ],
  cosas: [
    null, {img: "FLOR-01.png"}, null, {img: "PAJARITO-01.png"},
    {img: "FLOR-02.png"}, null, {img: "GATITO-01.png"}, null,
    null, {img: "FLOR-01.png"}, null, {img: "FLOR-02.png"},
    {img: "FLOR-02.png"}, null, {img: "FLOR-01.png"}, null
  ]
};

// Guardar jardín

function guardarJardin(jardin) {
  localStorage.setItem("jardin", JSON.stringify(jardin));
}

document.getElementById('guardar-jardin').addEventListener('click', () => {  
  guardarJardin(obtenerJardin());
});



// Obtener data del jardín desde la grilla actual
function obtenerJardin() {
  const inputNombre = document.getElementById('nombre-jardin');
  const inputAutor = document.getElementById('autor-jardin');
  if(!inputNombre || !inputAutor) return;

  const nombre = inputNombre.value.trim() || 'Jardincito';
  const autor = inputAutor.value.trim() || 'Anónimo';

  // Obtener todas las celdas usando querySelectorAll
  const celdas = document.querySelectorAll('.celda');

  // Reconstruir fondos usando Array.from y map
  const fondos = Array.from(celdas).map(celda => {
    const fondoEl = celda.querySelector('.fondo');
    const fondoImg = fondoEl.style.backgroundImage;
    
    if(fondoImg && fondoImg !== 'none'){
      const matchFondo = fondoImg.match(/url\(['"]?img\/([^'"]+)['"]?\)/);
      return matchFondo ? {img: matchFondo[1]} : null;
    }
    return null;
  });

  // Reconstruir cosas usando Array.from y map
  const cosas = Array.from(celdas).map(celda => {
    const cosaEl = celda.querySelector('.cosa');
    const cosaImg = cosaEl.style.backgroundImage;
    
    if(cosaImg && cosaImg !== 'none'){
      const matchCosa = cosaImg.match(/url\(['"]?img\/([^'"]+)['"]?\)/);
      return matchCosa ? {img: matchCosa[1]} : null;
    }
    return null;
  });

  return {
    nombre,
    autor,
    fondos,
    cosas
  };
}

// Dibuja un jardín en la grilla (llena las 16 celdas con fondos y cosas)
function dibujarJardin(jardin) { 
  const grilla = document.getElementById('grilla');
  if(!grilla) return;

  // Recorrer fondos usando forEach con índice
  jardin.fondos.forEach((fondoData, i) => {
    const celda = document.getElementById(i.toString());
    if(!celda) return;
    
    const fondoEl = celda.querySelector('.fondo');
    
    // Aplicar fondo si existe
    if(fondoData && fondoData.img){
      fondoEl.style.backgroundImage = `url('img/${fondoData.img}')`;
    } else {
      fondoEl.style.backgroundImage = '';
    }
  });

  // Recorrer cosas usando forEach con índice
  jardin.cosas.forEach((cosaData, i) => {
    const celda = document.getElementById(i.toString());
    if(!celda) return;
    
    const cosaEl = celda.querySelector('.cosa');
    
    // Aplicar cosa si existe
    if(cosaData && cosaData.img){
      cosaEl.style.backgroundImage = `url('img/${cosaData.img}')`;
    } else {
      cosaEl.style.backgroundImage = '';
    }
  });

  // Actualizar inputs y displays con los datos del jardín
  const inputNombre = document.getElementById('nombre-jardin');
  const inputAutor = document.getElementById('autor-jardin');
  const titulo = document.getElementById('titulo-jardin');
  const autorDisplay = document.getElementById('autor-display');
  
  if(inputNombre && inputAutor && titulo && autorDisplay){
    inputNombre.value = jardin.nombre;
    inputAutor.value = jardin.autor;
    titulo.textContent = jardin.nombre;
    document.title = jardin.nombre;
    autorDisplay.textContent = `por ${jardin.autor}`;
  }
}

// Crear botones de navegación para un tipo (fondos o cosas)
function crearNav(tipo){
  const contenedor = document.querySelector(`.nav-items[data-type="${tipo}"]`);
  if(!contenedor) return;

  // Opción vacía (sin selección por defecto)
  const vacio = document.createElement('button');
  vacio.className = 'boton vacio';
  vacio.title = 'vacío';
  vacio.dataset.img = '';
  vacio.dataset.tipo = tipo;
  contenedor.appendChild(vacio);

  // Crear botones desde el objeto botones
  (botones[tipo]||[]).forEach(b=>{
    const btn = document.createElement('button');
    btn.className = 'boton';
    btn.dataset.img = b.img;
    btn.dataset.tipo = tipo;
    btn.title = b.nombre;
    
    // Icono: imagen de fondo
    const icono = document.createElement('span');
    icono.className = 'icono';
    icono.style.backgroundImage = `url('img/${b.img}')`;
    btn.appendChild(icono);
    contenedor.appendChild(btn);
  });

  // Manejador de clicks: solo un botón activo globalmente
  contenedor.addEventListener('click', e=>{
    const boton = e.target.closest('.boton');
    if(!boton) return;
    document.querySelectorAll('.boton.activo').forEach(x=>x.classList.remove('activo'));
    boton.classList.add('activo');
  });
}

// Aplicar imagen seleccionada a la celda clickeada
function iniciarGrilla(){
  const grilla = document.getElementById('grilla');
  if(!grilla) return;

  grilla.addEventListener('click', e=>{
    const celda = e.target.closest('.celda');
    if(!celda) return;

    const activo = document.querySelector('.boton.activo');
    if(!activo) return; // nada seleccionado

    const tipo = activo.dataset.tipo; // 'fondos' o 'cosas'
    const img = activo.dataset.img;

    const fondoEl = celda.querySelector('.fondo');
    const cosaEl = celda.querySelector('.cosa');

    if(tipo === 'fondos'){
      // Actualizar solo el fondo
      fondoEl.style.backgroundImage = img ? `url('img/${img}')` : '';
    } else if(tipo === 'cosas'){
      // Actualizar solo la cosa
      cosaEl.style.backgroundImage = img ? `url('img/${img}')` : '';
    }
  });
}

// Sincronizar inputs con el título y autor
function iniciarInfoJardin(){
  const inputNombre = document.getElementById('nombre-jardin');
  const inputAutor = document.getElementById('autor-jardin');
  const titulo = document.getElementById('titulo-jardin');
  const autorDisplay = document.getElementById('autor-display');

  if(!inputNombre || !inputAutor || !titulo || !autorDisplay) return;

  // Actualizar H1 y title cuando se escribe en nombre
  inputNombre.addEventListener('input', e=>{
    const nombre = e.target.value.trim() || 'Jardincito';
    titulo.textContent = nombre;
    document.title = nombre;
  });

  // Actualizar display de autor cuando se escribe
  inputAutor.addEventListener('input', e=>{
    const autor = e.target.value.trim();
    autorDisplay.textContent = autor ? `por ${autor}` : '';
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () =>{
  crearNav('fondos');
  crearNav('cosas');
  iniciarGrilla();
  iniciarInfoJardin();
  let jardin = null;
  // Cargar jardín de ejemplo al iniciar
  if (localStorage.getItem("jardin")) {
    jardin = JSON.parse(localStorage.getItem("jardin"));
  } else {
    jardin = jardinEjemplo;
  }
  dibujarJardin(jardin);
 
});