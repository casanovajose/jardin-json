const botones = {
  fondos: [
    { nombre: "tierra", img: "TIERRA-01.png" }
  ],
  cosas: [],
};

// Jardín de ejemplo
const jardinEjemplo = {
  //
};

// Guardar jardín
function guardarJardin(jardin) {
  // guardar el ojbeto "jardin" en local storage
}

document.getElementById("guardar-jardin").addEventListener("click", () => {

});

// Inicializar
crearNav("fondos");
crearNav("cosas");
iniciarGrilla();
actualizarInfoJardin();
let jardin = null;

// Cargar jardín desde local storage o sino hay usar jardín de ejemplo al iniciar
dibujarJardin(jardin);
