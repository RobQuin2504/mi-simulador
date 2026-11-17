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

// Convertir imagen a Base64
function convertirImagenBase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(lector.error);

    lector.readAsDataURL(archivo);
  });
}

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
      <img
        src="${imagen.startsWith("data:image/") ? imagen : `assets/${imagen}`}"
        alt="${nombre}"
        class="imagen-producto"
      >
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
async function agregarProductoAdmin(event) {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const precio = Number(inputPrecio.value);
  const stock = Number(inputStock.value);
  const descripcion = inputDescripcion.value.trim();
  const archivoImagen = inputImagen.files[0];

  // Valida campos vaciós
  if (!nombre || !descripcion || !archivoImagen) {
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

  // Validar que sea una imagen
  if (!archivoImagen.type.startsWith("image/")) {
    App.mostrarNotificacion("Selecciona un archivo de imagen válido.", "error");
    return;
  }

  try {
    // Convertir imagen
    const imagen = await convertirImagenBase64(archivoImagen);

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
  } catch (error) {
    console.error(`Error al cargar la imagen: ${error}`);
    App.mostrarNotificacion("No fue posible cargar la imagen.", "error");
  }
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

          <div style="margin: 15px 0;">
            <label for="swal-imagen">
              Imagen del producto
            </label>

            ${
              producto.imagen
                ? `
                  <img
                    src="${
                      producto.imagen.startsWith("data:image/")
                        ? producto.imagen
                        : `assets/${producto.imagen}`
                    }"
                    alt="Imagen actual"
                    style="
                      display:block;
                      max-width:150px;
                      max-height:120px;
                      object-fit:contain;
                      margin:10px auto;
                    "
                  >
                `
                : "<p>Sin imagen disponible</p>"
            }

            <input
              id="swal-imagen"
              type="file"
              accept="image/*"
            >

            <small>
              Selecciona una nueva imagen o conserva la actual.
            </small>
          </div>
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
      const archivoImagen = popup.querySelector("#swal-imagen").files[0];

      if (!nombre || !descripcion) {
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

      if (archivoImagen && !archivoImagen.type.startsWith("image/")) {
        Swal.showValidationMessage("Selecciona un archivo de imagen válido.");
        return false;
      }

      return { nombre, precio, stock, descripcion, archivoImagen };
    },
  });

  if (!resultado.isConfirmed) return;

  try {
    const datos = resultado.value;

    // Conservar imagen anterior si no se selecciona otra
    let imagen = producto.imagen;

    // Convertir nueva imagen si fue seleccionada
    if (datos.archivoImagen) {
      imagen = await convertirImagenBase64(datos.archivoImagen);
    }

    const productoActualizado = {
      nombre: datos.nombre,
      precio: datos.precio,
      stock: datos.stock,
      descripcion: datos.descripcion,
      imagen,
    };

    if (App.actualizarProducto(id, productoActualizado)) {
      mostrarProductos();
      App.mostrarNotificacion("Producto actualizado correctamente.", "success");
    } else {
      App.mostrarNotificacion(
        "No fue posible actualizar el producto.",
        "error",
      );
    }
  } catch (error) {
    console.error(`Error al actualizar el producto: ${error}`);
    App.mostrarNotificacion("No fue posible procesar la imagen.", "error");
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
