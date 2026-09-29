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
    return this.stock > 0
      ? `El producto "${this.nombre}" está disponible. Stock: ${this.stock}`
      : `El producto "${this.nombre}" está agotado.`;
  }
}

// Acceso a elementos del DOM
const formularioAgregacion = document.getElementById("form-agregacion");
const contenedorProductos = document.getElementById("contenedor-items");
const btnAgregar = document.getElementById("btn-agregar");
const notificaciones = document.getElementById("notificacion");

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputDescripcion = document.querySelector("#descripcion");
const inputBuscar = document.querySelector("#buscar");

let temporizador;

// Instanciación
const productosIniciales = [
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

// Obtener productos almacenados en localStorage
const productosAlmacenados = localStorage.getItem("listadoProductos") ?? null;

let listadoProductos;

// Si existen productos en localStorage
if (productosAlmacenados) {
  // Convertir JSON a objeto JS
  const productosJSON = JSON.parse(productosAlmacenados);

  // Reconstruir las instancias de Producto
  listadoProductos = productosJSON.map(
    (producto) =>
      new Producto(
        producto.id,
        producto.nombre,
        producto.stock,
        producto.precio,
        producto.descripcion,
      ),
  );
} else {
  // Si no existe localStorage, utilizar los productos iniciales
  listadoProductos = [...productosIniciales];

  // Guardar productos iniciales en localStorage
  localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));
}

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
    // Desestructuración
    const { id, nombre, precio, descripcion } = producto;

    const cardProducto = document.createElement("div");

    cardProducto.className = "card-producto";
    cardProducto.id = producto.id;

    cardProducto.innerHTML = `
      <h6>#${id}</h6>
      <h3>${nombre}</h3>
      <p>$${precio}</p>
      <p>${descripcion}</p>
      <p>${producto.verificarStock()}</p>

      <button 
        type="button"
        class="btn-eliminar"
        data-id="${id}">
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

  // Actualizar localStorage
  localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));

  mostrarProductos();

  productoEliminado &&
    mostrarNotificaciones(
      `Se ha eliminado el producto "${productoEliminado.nombre}" del listado.`,
    );
}

// Agrega un producto al listado
function agregarProducto(event) {
  event.preventDefault();

  const nombre = inputNombre?.value?.trim() || "";
  const precio = Number(inputPrecio?.value);
  const stock = Number(inputStock?.value);
  const descripcion = inputDescripcion?.value?.trim() || "Sin descripción";

  // Validación del nombre
  if (nombre === "") {
    mostrarNotificaciones("El nombre del producto no es válido.");
    return;
  }

  // Validación del precio
  if (inputPrecio.value === "" || precio <= 0) {
    mostrarNotificaciones("El precio ingresado no es válido.");
    return;
  }

  // Validación del stock
  if (inputStock.value === "" || stock < 1 || stock > 20) {
    mostrarNotificaciones("El stock ingresado no es válido.");
    return;
  }

  // Generar un ID nuevo
  const nuevoId =
    listadoProductos.length > 0
      ? Math.max(...listadoProductos.map((producto) => producto.id)) + 1
      : 1;

  // Crea nuevo producto
  const nuevoProducto = new Producto(
    nuevoId,
    nombre,
    stock,
    precio,
    descripcion,
  );

  // Agregar al listado
  listadoProductos.push(nuevoProducto);

  // Actualizar localStorage
  localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));

  // Actualizar interfaz
  mostrarProductos();

  // Mostrar notificación
  mostrarNotificaciones(
    `El producto "${nuevoProducto.nombre}" se ha agregado al listado exitosamente.`,
  );

  // Limpiar formulario
  formularioAgregacion.reset();
}

function buscarProducto(textoInput) {
  const texto = textoInput?.trim()?.toLowerCase() || "";

  // Validaciones
  if (texto === "") {
    mostrarProductos();
    return;
  }

  const productosEncontrados = listadoProductos.filter((producto) =>
    producto.nombre?.toLowerCase()?.includes(texto),
  );

  if (productosEncontrados.length === 0) {
    mostrarProductos([]);
    return;
  }

  mostrarProductos(productosEncontrados);
}

// Eventos
btnAgregar.addEventListener("click", agregarProducto);

inputBuscar.addEventListener("keyup", (event) => {
  // Limpia el temporizador anterior
  clearTimeout(temporizador);

  // Espera 300 milisegundos antes de realizar la búsqueda
  temporizador = setTimeout(() => {
    buscarProducto(event.target.value);
  }, 300);
});

contenedorProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-eliminar")) {
    eliminarProducto(event);
  }
});

// Inicializa simulador
mostrarProductos();
