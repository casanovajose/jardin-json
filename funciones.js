const botones = {
  fondos: [
    { nombre: "tierra", img: "TIERRA-01.png" },
    { nombre: "tierra", img: "TIERRA-02.png" },
    { nombre: "tierra", img: "TIERRA-03.png" },
    { nombre: "tierra", img: "TIERRA-04.png" },
    { nombre: "pasto", img: "PASTO-01.png" },
    { nombre: "pasto", img: "PASTO-02.png" },
    { nombre: "pasto", img: "PASTO-03.png" },
    { nombre: "pasto", img: "PASTO-04.png" }
  ],
  cosas: [
    { nombre: "gatito", img: "GATITO-01.png" },
    { nombre: "gatito", img: "GATITO-02.png" },
    { nombre: "gatito", img: "GATITO-03.png" },
    { nombre: "gatito", img: "GATITO-04.png" },
    { nombre: "pajarito", img: "PAJARITO-01.png" },
    { nombre: "pajarito", img: "PAJARITO-02.png" },
    { nombre: "pajarito", img: "PAJARITO-03.png" },
    { nombre: "pajarito", img: "PAJARITO-04.png" },
    { nombre: "arbol", img: "ARBOL-01.png" },
    { nombre: "arbol", img: "ARBOL-02.png" },
    { nombre: "arbol", img: "ARBOL-03.png" },
    { nombre: "arbol", img: "ARBOL-04.png" },
    { nombre: "flor", img: "FLOR-01.png" },
    { nombre: "flor", img: "FLOR-02.png" },
    { nombre: "flor", img: "FLOR-03.png" },
    { nombre: "flor", img: "FLOR-04.png" }
  ],
};


// Jardín de ejemplo
const jardinEjemplo = {
  nombre: "De tuin der lusten",
  autor: "Hieronymus Bosch",
  fondos: [
    { img: "TIERRA-01.png" }, { img: "PASTO-03.png" }, { img: "TIERRA-01.png" }, { img: "PASTO-03.png" },
    { img: "PASTO-03.png" }, { img: "TIERRA-02.png" }, { img: "PASTO-03.png" }, { img: "TIERRA-01.png" },
    { img: "TIERRA-01.png" }, { img: "PASTO-03.png" }, { img: "TIERRA-02.png" }, { img: "PASTO-03.png" },
    { img: "PASTO-03.png" }, { img: "TIERRA-01.png" }, { img: "PASTO-03.png" }, { img: "TIERRA-02.png" }
  ],
  cosas: [
    null, { img: "FLOR-01.png" }, null, { img: "PAJARITO-01.png" },
    { img: "FLOR-02.png" }, null, { img: "GATITO-01.png" }, null,
    null, { img: "FLOR-01.png" }, null, { img: "FLOR-02.png" },
    { img: "FLOR-02.png" }, null, { img: "FLOR-01.png" }, null
  ]
};

// Guardar jardín

function guardarJardin(jardin) {
  // guardar el ojbeto "jardin" en local storage
  localStorage.setItem("jardin", JSON.stringify(jardin));
}

document.getElementById("guardar-jardin").addEventListener("click", () => {
  guardarJardin(obtenerJardin());
});

// Inicializar
crearNav("fondos");
crearNav("cosas");
iniciarGrilla();
actualizarInfoJardin();
let jardin = null;
// Cargar jardín de ejemplo al iniciar
if (localStorage.getItem("jardin")) {
  jardin = JSON.parse(localStorage.getItem("jardin"));
} else {
  jardin = jardinEjemplo;
}
dibujarJardin(jardin);
