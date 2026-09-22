/* SIMULADOR: VALIDADOR DE STOCK */

// Declaración de clase
class Producto {
  constructor(id, nombre, stock, precio, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.stock = stock;
    this.precio = precio;
    this.descripcion = descripcion;
  }

  verificarStock() {
    if (this.stock > 0) {
      return `El producto "${this.nombre}" está disponible. Stock: ${this.stock}`;
    } else {
      return `El producto "${this.nombre}" está agotado.`;
    }
  }
}

// Acceso a elementos del DOM
const formularioAgregacion = document.getElementById("form-agregacion");
const contenedorProductos = document.getElementById("contenedor-items");
const btnAgregar = document.getElementById("btn-agregar");
const btnBuscar = document.getElementById("btn-buscar");
const notificaciones = document.getElementById("notificacion");

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputDescripcion = document.querySelector("#descripcion");
const inputBuscar = document.querySelector("#buscar");

// Instanciación
const listadoProductos = [
  new Producto(1, "Laptop", 10, 15000, "Laptop para trabajo y estudio"),
  new Producto(2, "Mouse inalámbrico", 0, 450, "Mouse inalámbrico ergonómico"),
  new Producto(3, "Teclado mecánico", 15, 1200, "Teclado mecánico RGB"),
  new Producto(4, "Monitor", 8, 3500, "Monitor Full HD de 24 pulgadas"),
  new Producto(
    5,
    "Audífonos",
    20,
    800,
    "Audífonos inalámbricos con cancelación de ruido",
  ),
];

// Muestra en pantalla las acciones realizadas
function mostrarNotificaciones(mensaje) {
  notificaciones.textContent = mensaje;

  // Mostrar notificación por 3 segundos
  setTimeout(() => {
    notificaciones.textContent = "";
  }, 3000);
}

// Muestra en pantalla los productos del listado
function mostrarProductos(productos = listadoProductos) {
  contenedorProductos.innerHTML = "";

  if (productos.length === 0) {
    contenedorProductos.innerHTML = `
      <p class="sin-productos">
        No hay productos para mostrar.
      </p>
    `;
    return;
  }

  productos.forEach((producto) => {
    const cardProducto = document.createElement("div");

    cardProducto.className = "card-producto";
    cardProducto.id = producto.id;

    cardProducto.innerHTML = `
      <h6>#${producto.id}</h6>
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <p>${producto.descripcion}</p>
      <p>${producto.verificarStock()}</p>

      <button 
        type="button"
        class="btn-eliminar"
        data-id="${producto.id}">
        Eliminar
      </button>
    `;

    contenedorProductos.appendChild(cardProducto);
  });
}

// Elimina productos del listado
function eliminarProducto(event) {
  const idProducto = Number(event.target.dataset.id);

  // Eliminar producto del arreglo
  const indiceProducto = listadoProductos.findIndex(
    (producto) => producto.id === idProducto,
  );

  if (indiceProducto === -1) {
    return;
  }

  const productoEliminado = listadoProductos[indiceProducto];
  listadoProductos.splice(indiceProducto, 1);

  mostrarProductos();

  if (listadoProductos.length > 0) {
    mostrarNotificaciones(
      `Se ha eliminado el producto "${productoEliminado.nombre}" del listado.`,
    );
  }
}
