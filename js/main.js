/* SIMULADOR: VALIDADOR DE STOCK */

// Declaración de clase
class Producto {
  constructor(id, nombre, stock, precio, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.stock = stock;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }

  verificarStock() {
    return this.stock > 0
      ? `El producto "${this.nombre}" está disponible. Stock: ${this.stock}`
      : `El producto "${this.nombre}" está agotado.`;
  }
}

// Estado de la aplicación
let listadoProductos = [];

// Función para guardar productos
function guardarProductos(productos) {
  try {
    localStorage.setItem("listadoProductos", JSON.stringify(productos));
    listadoProductos = productos;
    return true;
  } catch (error) {
    console.error(`Error al guardar productos: ${error}`);
    return false;
  }
}

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
        producto.imagen ?? "",
      );
    });
  } catch (error) {
    // Captura errores de red o errores lanzados manualmente arriba
    console.error(`No fue posible cargar los productos: ${error}`);
  }
}

// Inicializar productos
async function inicializarProductos() {
  try {
    // Obtener productos almacenados en localStorage
    const productosAlmacenados =
      localStorage.getItem("listadoProductos") ?? null;

    // Si existen productos en localStorage
    if (productosAlmacenados !== null) {
      // Convertir JSON a objeto JS
      const datos = JSON.parse(productosAlmacenados);

      if (!Array.isArray(datos)) {
        throw new Error("Los datos almacenados no son válidos.");
      }

      // Reconstruir las instancias de Producto
      listadoProductos = datos.map(
        (producto) =>
          new Producto(
            Number(producto.id),
            producto.nombre,
            Number(producto.stock),
            Number(producto.precio),
            producto.descripcion ?? "Sin descripción",
            producto.imagen ?? "",
          ),
      );
    } else {
      // Si no hay datos guardados, cargar el JSON local
      listadoProductos = await obtenerProductos();

      // Guardar productos iniciales en localStorage
      if (!guardarProductos(listadoProductos)) {
        throw new Error("No fue posible guardar los productos iniciales.");
      }
    }
  } catch (error) {
    console.error(`Error al cargar productos: ${error}`);

    // Recupera los productos iniciales
    listadoProductos = [];
  } finally {
    console.log("Proceso de carga de productos finalizado.");
  }
}

// Generar nuevo ID
function generarId() {
  return listadoProductos.length > 0
    ? Math.max(...listadoProductos.map((p) => p.id)) + 1
    : 1;
}

// Agrega un producto al listado
function agregarProducto(datos) {
  const nuevoProducto = new Producto(
    generarId(),
    datos.nombre,
    datos.stock,
    datos.precio,
    datos.descripcion,
    datos.imagen,
  );

  const nuevosProductos = [...listadoProductos, nuevoProducto];

  return guardarProductos(nuevosProductos) ? nuevoProducto : null;
}

// Editar producto
function actualizarProducto(id, datos) {
  const nuevosProductos = listadoProductos.map((producto) =>
    producto.id === id
      ? new Producto(
          producto.id,
          datos.nombre,
          datos.stock,
          datos.precio,
          datos.descripcion,
          datos.imagen,
        )
      : producto,
  );

  return guardarProductos(nuevosProductos);
}

// Eliminar producto
function eliminarProducto(id) {
  const nuevosProductos = listadoProductos.filter(
    (producto) => producto.id !== id,
  );

  return guardarProductos(nuevosProductos);
}

// Vaciar inventario
function vaciarListado() {
  return guardarProductos([]);
}

// Muestra en pantalla las acciones realizadas
function mostrarNotificacion(mensaje, tipo = "info") {
  const estilos = {
    success: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    error: {
      background: "linear-gradient(to right, #ff5f6d, #ffc371)",
    },
    info: {
      background: "linear-gradient(to right, #2193b0, #6dd5ed)",
    },
    warning: {
      background: "linear-gradient(to right, #f7971e, #ffd200)",
    },
  };

  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      ...(estilos[tipo] || estilos.info),
      borderRadius: "12px",
    },
  }).showToast();
}

// Mostrar alerta informativa
function mostrarAlerta(titulo, mensaje, tipo = "info") {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: tipo,
    confirmButtonText: "Aceptar",
  });
}

// Solicitar confirmación
function confirmarAccion(titulo, mensaje, textoBoton = "Confirmar") {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: textoBoton,
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
}

// Navegación entre vistas
function cambiarVista(vista) {
  const vistaAdmin = document.getElementById("vista-admin");
  const vistaCliente = document.getElementById("vista-cliente");

  vistaAdmin.hidden = vista !== "admin";
  vistaCliente.hidden = vista !== "cliente";
}

// Inicialización
const productosListos = inicializarProductos();

// Eventos de navegación
document.getElementById("btn-admin").addEventListener("click", () => {
  cambiarVista("admin");
});

document.getElementById("btn-cliente").addEventListener("click", () => {
  cambiarVista("cliente");
});

// Exponer funciones
window.App = {
  Producto,
  productosListos,

  getProductos: () => listadoProductos,

  guardarProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  vaciarListado,

  mostrarNotificacion,
  mostrarAlerta,
  confirmarAccion,
  cambiarVista,
};
