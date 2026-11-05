// Acceso a elementos del DOM
const catalogo = document.getElementById("catalogo-productos");
const carritoContenedor = document.getElementById("carrito");

const inputBuscarCliente = document.getElementById("buscar-cliente");

const cantidadTotal = document.getElementById("cantidad-total");
const totalCarrito = document.getElementById("total");

const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
const btnConfirmar = document.getElementById("btn-confirmar");

// Estado de la aplicación
let temporizadorCliente;

// Recuperar carrito desde localStorage
function cargarCarrito() {
  try {
    const carritoGuardado = localStorage.getItem("carritoCompras");

    if (!carritoGuardado) {
      return [];
    }

    const datos = JSON.parse(carritoGuardado);

    if (!Array.isArray(datos)) {
      return [];
    }

    return datos.filter(
      (item) => Number(item.id) && Number(item.cantidad) && item.cantidad > 0,
    );
  } catch (error) {
    console.error(`Error al recuperar el carrito: ${error}`);
    return [];
  }
}

// Inicializar carrito
let carrito = cargarCarrito();

// Guardar carrito
function guardarCarrito() {
  try {
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));

    return true;
  } catch (error) {
    console.error(`Error al guardar el carrito: ${error}`);

    App.mostrarNotificacion("No fue posible guardar el carrito.", "error");

    return false;
  }
}

// Sincronizar carrito con inventario
function sincronizarCarrito() {
  const productos = App.getProductos();

  carrito = carrito.filter((item) => {
    const producto = productos.find((p) => p.id === item.id);

    // Eliminar productos que ya no existen
    if (!producto) {
      return false;
    }

    // Ajustar cantidad si supera el stock disponible
    if (item.cantidad > producto.stock) {
      item.cantidad = producto.stock;
    }

    // Eliminar productos agotados
    return item.cantidad > 0;
  });

  guardarCarrito();
}

// Muestra en pantalla los productos del listado
function mostrarCatalogo(productos = App.getProductos()) {
  catalogo.innerHTML = "";

  if (productos.length === 0) {
    catalogo.innerHTML = `
      <p class="sin-productos">
        No hay productos disponibles.
      </p>
    `;
    return;
  }

  productos.forEach((producto) => {
    // Desestructuración
    const { id, nombre, precio, stock, descripcion, imagen } = producto;

    const cardProducto = document.createElement("div");
    cardProducto.className = "card-producto";

    cardProducto.innerHTML = `
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
      <p>Stock: ${stock}</p>

      <button
        type="button"
        class="btn-agregar-carrito"
        data-id="${id}"
        ${stock <= 0 ? "disabled" : ""}>
        Agregar al carrito
      </button>
    `;

    catalogo.appendChild(cardProducto);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = App.getProductos().find((p) => p.id === id);

  if (!producto || producto.stock <= 0) {
    App.mostrarNotificacion("Este producto no está disponible.", "warning");
    return;
  }

  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    if (productoExistente.cantidad >= producto.stock) {
      App.mostrarNotificacion("No hay más unidades disponibles.", "warning");
      return;
    }

    productoExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      cantidad: 1,
    });
  }

  // Guardar cambios
  if (!guardarCarrito()) {
    if (productoExistente) {
      productoExistente.cantidad--;
    } else {
      carrito = carrito.filter((p) => p.id !== id);
    }

    mostrarCarrito();
    return;
  }

  mostrarCarrito();

  App.mostrarNotificacion(
    `"${producto.nombre}" agregado al carrito.`,
    "success",
  );
}

// Mostrar productos del carrito
function mostrarCarrito() {
  carritoContenedor.innerHTML = "";

  let total = 0;
  let cantidad = 0;

  if (carrito.length === 0) {
    carritoContenedor.innerHTML = `
      <p class="sin-productos">
        Tu carrito está vacío.
      </p>
    `;
  }

  carrito.forEach((item) => {
    const producto = App.getProductos().find((p) => p.id === item.id);

    // Ignorar productos que ya no existen
    if (!producto) return;

    const subtotal = producto.precio * item.cantidad;

    total += subtotal;
    cantidad += item.cantidad;

    const elemento = document.createElement("div");
    elemento.className = "item-carrito";

    elemento.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>

      <div class="controles-cantidad">
        <button
          type="button"
          data-action="disminuir"
          data-id="${producto.id}">
          -
        </button>

        <span>${item.cantidad}</span>

        <button
          type="button"
          data-action="aumentar"
          data-id="${producto.id}"
          ${item.cantidad >= producto.stock ? "disabled" : ""}>
          +
        </button>

        <button
          type="button"
          data-action="eliminar"
          data-id="${producto.id}">
          Eliminar
        </button>
      </div>
    `;

    carritoContenedor.appendChild(elemento);
  });

  cantidadTotal.textContent = cantidad;
  totalCarrito.textContent = `$${total.toFixed(2)}`;
}

// Modificar cantidades
function modificarCantidad(id, accion) {
  const item = carrito.find((p) => p.id === id);

  const producto = App.getProductos().find((p) => p.id === id);

  if (!item || !producto) return;

  const cantidadAnterior = item.cantidad;
  const carritoAnterior = [...carrito];

  if (accion === "aumentar") {
    if (item.cantidad >= producto.stock) {
      App.mostrarNotificacion("Stock máximo alcanzado.", "warning");
      return;
    }

    item.cantidad++;
  } else if (accion === "disminuir") {
    item.cantidad--;

    if (item.cantidad <= 0) {
      carrito = carrito.filter((p) => p.id !== id);
    }
  } else if (accion === "eliminar") {
    carrito = carrito.filter((p) => p.id !== id);
  }

  // Guardar modificaciones
  if (!guardarCarrito()) {
    // Recuperar estado anterior
    carrito = carritoAnterior;

    mostrarCarrito();
    return;
  }

  mostrarCarrito();
}

// Vaciar carrito
async function vaciarCarrito() {
  if (carrito.length === 0) {
    App.mostrarNotificacion("El carrito ya está vacío.", "info");
    return;
  }

  const resultado = await App.confirmarAccion(
    "¿Vaciar carrito?",
    "Se eliminarán todos los productos seleccionados.",
    "Sí, vaciar",
  );

  if (!resultado.isConfirmed) return;

  const carritoAnterior = [...carrito];

  carrito = [];

  if (!guardarCarrito()) {
    carrito = carritoAnterior;

    mostrarCarrito();

    return;
  }

  mostrarCarrito();

  App.mostrarNotificacion("El carrito está vacío.", "success");
}

// Confirmar compra
async function confirmarCompra() {
  if (carrito.length === 0) {
    App.mostrarNotificacion(
      "Agrega productos antes de confirmar la compra.",
      "warning",
    );
    return;
  }

  const productos = App.getProductos();

  let total = 0;

  // Validar que todos los productos sigan disponibles
  for (const item of carrito) {
    const producto = productos.find((p) => p.id === item.id);

    if (!producto || item.cantidad > producto.stock) {
      App.mostrarNotificacion(
        "Algún producto ya no tiene suficiente stock.",
        "error",
      );

      sincronizarCarrito();
      mostrarCatalogo();
      mostrarCarrito();
      return;
    }

    total += producto.precio * item.cantidad;
  }

  const resultado = await Swal.fire({
    title: "¿Confirmar compra?",
    text: `El total de tu compra es $${total.toFixed(2)}.`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar compra",
    cancelButtonText: "Seguir comprando",
  });

  if (!resultado.isConfirmed) return;

  // Descontar existencias
  const productosActualizados = productos.map((producto) => {
    const item = carrito.find((p) => p.id === producto.id);

    if (item) {
      return {
        ...producto,
        stock: producto.stock - item.cantidad,
      };
    }

    return producto;
  });

  // Guardar cambios en inventario
  if (!App.guardarProductos(productosActualizados)) {
    App.mostrarNotificacion(`No fue posible procesar la compra: ${error}`);
    return;
  }

  const carritoAnterior = [...carrito];

  // Vaciar carrito después de guardar correctamente
  carrito = [];

  if (!guardarCarrito()) {
    // Restaurar el carrito en memoria
    carrito = carritoAnterior;

    mostrarCarrito();

    App.mostrarAlerta(
      "Compra procesada",
      "El inventario se actualizó, pero no se pudo limpiar el carrito almacenado. Vacíalo manualmente para evitar repetir la compra.",
      "warning",
    );

    mostrarCatalogo();
    return;
  }

  mostrarCatalogo();
  mostrarCarrito();

  await App.mostrarAlerta(
    "¡Compra confirmada!",
    `Gracias por tu compra. Total pagado: $${total.toFixed(2)}.`,
    "success",
  );
}

// Buscar productos en el catálogo
function buscarProductoCliente(texto) {
  const busqueda = texto.trim().toLowerCase();

  const productosFiltrados = App.getProductos().filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda),
  );

  mostrarCatalogo(productosFiltrados);
}

// Eventos del catálogo
catalogo.addEventListener("click", (event) => {
  const boton = event.target.closest(".btn-agregar-carrito");

  if (!boton || boton.disabled) return;

  agregarAlCarrito(Number(boton.dataset.id));
});

// Eventos del carrito
carritoContenedor.addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-action]");

  if (!boton) return;

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.action;

  modificarCantidad(id, accion);
});

// Buscador
inputBuscarCliente.addEventListener("keyup", (event) => {
  // Limpia el temporizador anterior
  clearTimeout(temporizadorCliente);

  // Espera 300 milisegundos antes de realizar la búsqueda
  temporizadorCliente = setTimeout(() => {
    buscarProductoCliente(event.target.value);
  }, 300);
});

// Vaciar carrito
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

// Confirmar compra
btnConfirmar.addEventListener("click", confirmarCompra);

// Inicialización
App.productosListos.then(() => {
  sincronizarCarrito();
  mostrarCatalogo();
  mostrarCarrito();
});
