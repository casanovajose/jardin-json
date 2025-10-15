# Jardín interactivo

Clase JSON y repaso Local Storage


## Documentación de lib.js

A continuación se describen brevemente las funciones principales del archivo `lib.js`:

- **obtenerJardin()**: Convierte el estado actual de la grilla en un objeto *Jardín*, extrayendo el nombre, autor, *fondos* o *cosas* desde el DOM.


Formato de objeto *Jardín*:

```json
{
	"nombre": "Jardincito",
	"autor": "Anónimo",
	"fondos": [ { "img": "TIERRA-01.png" }, ... ],
	"cosas": [ null, { "img": "FLOR-01.png" }, ... ]
}
```

- **dibujarJardin(jardin)**: Dibuja la grilla a partir de un objeto Jardín, aplicando imágenes de fondo y cosas a cada celda, y actualiza los datos de nombre y autor en la interfaz.
- **crearNav(tipo)**: Crea los botones de navegación para seleccionar imágenes de fondos o cosas, permitiendo elegir qué imagen aplicar en la grilla.
- **iniciarGrilla()**: Asocia el evento de click en la grilla para aplicar la imagen seleccionada (fondo o cosa) a la celda correspondiente.
- **actualizarInfoJardin()**: Sincroniza los inputs de nombre y autor con el título y el display del autor en la interfaz, actualizándolos en tiempo real.

### Ejemplo de uso

```js
// Obtener el estado actual del jardín desde la grilla:
const jardin = obtenerJardin();

// Dibujar un jardín en la grilla:
dibujarJardin(jardin);
```