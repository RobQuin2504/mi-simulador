// Acceso a elementos del DOM
const formularioAgregacion = document.getElementById("form-agregacion");
const contenedorProductos = document.getElementById("listado-productos");
const btnVaciarListado = document.getElementById("btn-vaciar-listado");

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputDescripcion = document.querySelector("#descripcion");
const inputImagen = document.querySelector("#imagen");
const inputBuscar = document.querySelector("#buscar");

// Estado de la aplicación
let temporizador;

// Muestra en pantalla los productos del listado
function mostrarProductos(productos = App.getProductos()) {
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
    const { id, nombre, precio, descripcion, imagen } = producto;

    const cardProducto = document.createElement("div");
    cardProducto.className = "card-producto";

    cardProducto.innerHTML = `
      <h6>#${id}</h6>
      ${
        imagen
          ? `
            <img
              src="assets/${imagen}"
              alt="${nombre}"
              class="imagen-producto"
            >
            `
          : ""
      }
      <h3>${nombre}</h3>
      <p>Precio: $${precio.toFixed(2)}</p>
      <p>${descripcion}</p>
      <p>${producto.verificarStock()}</p>

      <button
        type="button"
        class="btn-editar"
        data-id="${id}">
        Editar
      </button>

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

// Agregar producto
function agregarProductoAdmin(event) {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const precio = Number(inputPrecio.value);
  const stock = Number(inputStock.value);
  const descripcion = inputDescripcion.value.trim();
  const imagen = inputImagen.value.trim();

  // Valida campos vaciós
  if (!nombre || !descripcion || !imagen) {
    App.mostrarNotificacion("Completa todos los campos.", "warning");
    return;
  }

  // Valida precio
  if (precio <= 0) {
    App.mostrarNotificacion("El precio ingresado no es válido.", "error");
    return;
  }

  // Valida stock
  if (stock < 1 || stock > 20) {
    App.mostrarNotificacion(
      "El stock debe estar entre 1 y 20 unidades.",
      "error",
    );
    return;
  }

  // Crea nuevo producto
  const nuevoProducto = App.agregarProducto({
    nombre,
    precio,
    stock,
    descripcion,
    imagen,
  });

  if (!nuevoProducto) {
    App.mostrarNotificacion("No fue posible guardar el producto.", "error");
    return;
  }

  formularioAgregacion.reset();
  mostrarProductos();

  App.mostrarNotificacion(
    `El producto "${nuevoProducto.nombre}" se ha agregado correctamente.`,
    "success",
  );
}

// Eliminar producto
async function eliminarProductoAdmin(id) {
  const producto = App.getProductos().find((p) => p.id === id);

  if (!producto) return;

  const resultado = await App.confirmarAccion(
    "¿Eliminar producto?",
    "Esta acción eliminará el producto del inventario.",
    "Sí, eliminar",
  );

  if (!resultado.isConfirmed) return;

  if (App.eliminarProducto(id)) {
    mostrarProductos();

    App.mostrarNotificacion("Producto eliminado correctamente.", "success");
  } else {
    App.mostrarNotificacion("No fue posible eliminar el producto.", "error");
  }
}

// Editar producto
async function editarProductoAdmin(id) {
  const producto = App.getProductos().find((p) => p.id === id);

  if (!producto) return;

  const resultado = await Swal.fire({
    title: "Editar producto",
    html: `
          <input id="swal-nombre" class="swal2-input"
            placeholder="Nombre"
            value="${producto.nombre}"
          >

          <input id="swal-precio" class="swal2-input"
            type="number" min="0.01" step="0.01"
            placeholder="Precio"
            value="${producto.precio}"
          >

          <input id="swal-stock" class="swal2-input"
            type="number" min="0" max="20" step="1"
            placeholder="Stock"
            value="${producto.stock}"
          >

          <input id="swal-descripcion" class="swal2-input"
            placeholder="Descripción"
            value="${producto.descripcion}"
          >

          <input id="swal-imagen" class="swal2-input"
            placeholder="Ruta de imagen"
            value="${producto.imagen}"
          >
        `,
    showCancelButton: true,
    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",

    preConfirm: () => {
      const popup = Swal.getPopup();

      const nombre = popup.querySelector("#swal-nombre").value.trim();
      const precio = Number(popup.querySelector("#swal-precio").value);
      const stock = Number(popup.querySelector("#swal-stock").value);
      const descripcion = popup.querySelector("#swal-descripcion").value.trim();
      const imagen = popup.querySelector("#swal-imagen").value.trim();

      if (!nombre || !descripcion || !imagen) {
        Swal.showValidationMessage("Completa todos los campos.");
        return false;
      }

      if (precio <= 0) {
        Swal.showValidationMessage("El precio no es válido.");
        return false;
      }

      if (stock < 0 || stock > 20) {
        Swal.showValidationMessage("El stock debe estar entre 0 y 20.");
        return false;
      }

      return { nombre, precio, stock, descripcion, imagen };
    },
  });

  if (!resultado.isConfirmed) return;

  if (App.actualizarProducto(id, resultado.value)) {
    mostrarProductos();

    App.mostrarNotificacion("Producto actualizado correctamente.", "success");
  } else {
    App.mostrarNotificacion("No fue posible actualizar el producto.", "error");
  }
}
// Vaciar inventario
async function borrarListado() {
  const productos = App.getProductos();

  if (productos.length === 0) {
    App.mostrarNotificacion("El inventario ya está vacío.", "info");
    return;
  }

  const resultado = await App.confirmarAccion(
    "¿Vaciar inventario?",
    "Se eliminarán todos los productos.",
    "Vaciar inventario",
  );

  if (!resultado.isConfirmed) return;

  if (App.vaciarListado()) {
    mostrarProductos();

    App.mostrarNotificacion("El inventario se ha vaciado.", "success");
  } else {
    App.mostrarNotificacion("No fue posible vaciar el inventario.", "error");
  }
}

// Buscar productos
function buscarProducto(texto) {
  const busqueda = texto.trim().toLowerCase();

  const productosFiltrados = App.getProductos().filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda),
  );

  mostrarProductos(productosFiltrados);
}

// Eventos
formularioAgregacion.addEventListener("submit", agregarProductoAdmin);

btnVaciarListado.addEventListener("click", borrarListado);

inputBuscar.addEventListener("keyup", (event) => {
  // Limpia el temporizador anterior
  clearTimeout(temporizador);

  // Espera 300 milisegundos antes de realizar la búsqueda
  temporizador = setTimeout(() => {
    buscarProducto(event.target.value);
  }, 300);
});

// Delegación de eventos para botones de las tarjetas
contenedorProductos.addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-id]");

  if (!boton) return;

  const id = Number(boton.dataset.id);

  if (boton.classList.contains("btn-eliminar")) {
    eliminarProductoAdmin(id);
  }

  if (boton.classList.contains("btn-editar")) {
    editarProductoAdmin(id);
  }
});

// Esperar a que main termine de cargar los productos
App.productosListos.then(mostrarProductos);
