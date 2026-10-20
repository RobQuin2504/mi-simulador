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
const btnVaciarListado = document.getElementById("btn-vaciar-listado");
const notificaciones = document.getElementById("notificacion");
const modalBienvenida = document.getElementById("modal-bienvenida");

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputDescripcion = document.querySelector("#descripcion");
const inputBuscar = document.querySelector("#buscar");

// Estado de la aplicación
let temporizador;
let listadoProductos = [];

// Muestra ventana de bienvenida
setTimeout(() => {
  modalBienvenida.classList.add("visible");

  setTimeout(() => {
    modalBienvenida.classList.remove("visible");
  }, 3000);
}, 100);

// Instanciación
// const productosIniciales = [
//   new Producto(1, "Laptop", 10, 15000, "Laptop para trabajo y estudio"),
//   new Producto(2, "Mouse inalámbrico", 0, 450, "Mouse inalámbrico ergonómico"),
//   new Producto(3, "Teclado mecánico", 15, 1200, "Teclado mecánico RGB"),
//   new Producto(4, "Monitor", 8, 3500, "Monitor Full HD de 24 pulgadas"),
//   new Producto(
//     5,
//     "Audífonos",
//     20,
//     800,
//     "Audífonos inalámbricos con cancelación de ruido",
//   ),
// ];

// Obtener productos desde el JSON local
async function obtenerProductos() {
  try {
    const response = await fetch("../productos.json");

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      // Si el estado no es 200-299, lanza un error manual
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();

    return data.map((producto) => {
      return new Producto(
        Number(producto.id),
        producto.nombre,
        Number(producto.stock),
        Number(producto.precio),
        producto.descripcion ?? "Sin descripción",
      );
    });
  } catch (error) {
    // Captura errores de red o errores lanzados manualmente arriba
    console.error(`No fue posible cargar los productos: ${error}`);
  }
}

// Inicialización asíncrona
async function inicializarProductos() {
  // Mostrar el mensaje antes de iniciar la petición
  contenedorProductos.innerHTML = `
    <p class="sin-productos">
      Cargando...
    </p>
  `;

  try {
    // Obtener productos almacenados en localStorage
    const productosAlmacenados =
      localStorage.getItem("listadoProductos") ?? null;

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
      // Si no hay datos guardados, cargar el JSON local
      listadoProductos = await obtenerProductos();

      // Guardar productos iniciales en localStorage
      localStorage.setItem(
        "listadoProductos",
        JSON.stringify(listadoProductos),
      );
    }

    mostrarProductos();
  } catch (error) {
    console.error(`Error al cargar productos: ${error.message}`);

    // Recuperamos los productos iniciales
    listadoProductos = [];
    mostrarProductos();

    contenedorProductos.innerHTML = `
      <p class="sin-productos">
        No fue posible cargar los productos almacenados
      </p>
    `;
  } finally {
    console.log("Proceso de carga de productos finalizado.");
  }
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

  try {
    listadoProductos.splice(indiceProducto, 1);

    // Actualizar localStorage
    localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));

    productoEliminado &&
      mostrarNotificaciones(
        `Se ha eliminado el producto "${productoEliminado.nombre}" del listado.`,
      );
  } catch (error) {
    console.error(`Error al eliminar el producto: ${error.message}`);

    mostrarNotificaciones("No se pudo eliminar el producto.");
  } finally {
    mostrarProductos();
  }
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

  try {
    // Actualizar localStorage
    localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));

    // Mostrar notificación
    mostrarNotificaciones(
      `El producto "${nuevoProducto.nombre}" se ha agregado al listado exitosamente.`,
    );
  } catch (error) {
    console.error(`Error al guardar el producto: ${error.message}`);

    mostrarNotificaciones("Ocurrió un error al guardar el producto.");
  } finally {
    // Limpiar formulario
    formularioAgregacion.reset();

    // Actualizar interfaz
    mostrarProductos();
  }
}

// Vacía por completo el listado
function borrarListado() {
  listadoProductos = [];
  localStorage.removeItem("listadoProductos");
  mostrarProductos();
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

btnVaciarListado.addEventListener("click", borrarListado);

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
