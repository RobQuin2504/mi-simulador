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

// Función principal del simulador
function ejecutarSimulador() {
  // Declaración de variables
  const precioUnitario = 5;
  const stock = 10;

  // Arreglo de datos
  const productos = [
    "Teléfono inteligente",
    "Computadora portátil",
    "Tableta",
    "Consola",
    "Audífonos",
    "Cámara digital",
  ];

  console.log("=== VALIDADOR DE STOCK ===");

  const cantidad = solicitarCantidad(stock);
  const total = calcularTotal(cantidad, precioUnitario);

  // Mostrar resumen de compra
  mostrarResumenCompra(cantidad, precioUnitario, total);
  // Realiza operaciones sobre el listado de productos
  gestionarProductos(productos);
  // Instanciación
  const producto1 = new Producto(
    1,
    "Laptop",
    10,
    15000,
    "Laptop para trabajo y estudio",
  );

  const producto2 = new Producto(
    2,
    "Mouse inalámbrico",
    0,
    450,
    "Mouse inalámbrico ergonómico",
  );

  const producto3 = new Producto(
    3,
    "Teclado mecánico",
    15,
    1200,
    "Teclado mecánico RGB",
  );

  // Probar método
  console.log(producto1.verificarStock());
  console.log(producto2.verificarStock());
  console.log(producto3.verificarStock());
}

// Solicita una cantidad válida al usuario
function solicitarCantidad(unidadesDisponibles) {
  let cantidad;

  // Bucle: se repite hasta que el usuario ingrese una cantidad válida
  do {
    // Captura entrada del usuario
    cantidad = parseInt(
      prompt(
        `Ingresa la cantidad de unidades a comprar (1 - ${unidadesDisponibles}):`,
      ),
    );
    // Valida cantidad ingresada
    if (!validarCantidad(cantidad, unidadesDisponibles)) {
      alert(
        `Error: La cantidad ingresada debe estar entre 1 y ${unidadesDisponibles}`,
      );
    }
  } while (!validarCantidad(cantidad, unidadesDisponibles));

  return cantidad;
}

// Valida la cantidad ingresada
function validarCantidad(unidades, unidadesDisponibles) {
  return unidades > 0 && unidades <= unidadesDisponibles;
}

// Calcula el total de la compra realizada
const calcularTotal = (unidades, precioUnidad) => {
  return unidades * precioUnidad;
};

// Muestra el resumen de la compra realizada
function mostrarResumenCompra(unidades, precioUnidad, precioTotal) {
  console.log("=== Resumen de compra ===");
  console.log(`Unidades compradas: ${unidades}`);
  console.log(`Precio unitario: $${precioUnidad}`);
  console.log(`Total a pagar: $${precioTotal}`);
}

/* Operaciones con arreglos */

// Agrega producto al final del arreglo
function agregarProductoFin(listaProductos) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Fin):`);
  listaProductos.push(producto);

  console.log(`Producto "${producto}" agregado al final del listado.`);
}

// Elimina producto del final
function eliminarProductoFin(listaProductos) {
  if (listaProductos.length === 0) {
    alert("El listado de productos está vacío.");
    return;
  }

  const productoEliminado = listaProductos.pop();
  alert(`Se ha eliminado el producto "${productoEliminado}".`);
  console.log(`Se ha eliminado el producto "${productoEliminado}".`);
}

// Agrega producto al inicio del arreglo
function agregarProductoInicio(listaProductos) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Inicio):`);
  listaProductos.unshift(producto);

  console.log(`Producto "${producto}" agregado al inicio del listado.`);
}

// Busca un producto específico en el arreglo
function buscarProducto(listaProductos) {
  let producto = prompt(`Ingresa el nombre del producto a buscar:`);

  if (producto === "") {
    alert("No se proporcionó ningún producto para la búsqueda.");
    return -1;
  }

  let posicion = -1;

  if (listaProductos.includes(producto)) {
    posicion = listaProductos.indexOf(producto);

    if (posicion !== -1) {
      console.log(
        `El producto "${producto}" se encuentra en la posición ${posicion}.`,
      );
    } else {
      console.log(`El producto "${producto}" no forma parte del listado.`);
    }
  } else {
    console.log(`El producto "${producto}" no forma parte del listado.`);
  }

  return posicion;
}

// Actualiza un producto específico dentro del listado
function actualizarProducto(listaProductos) {
  if (listaProductos.length === 0) {
    console.log("No hay productos disponibles.");
    return;
  }

  let indice = buscarProducto(listaProductos);

  if (indice === -1) {
    console.log("El producto no existe.");
    return;
  }

  const productoAnterior = listaProductos[indice];
  const productoNuevo = "Dron";

  listaProductos.splice(indice, 1, productoNuevo);
  console.log(
    `El producto "${productoAnterior}" ha sido reemplazado por "${productoNuevo}".`,
  );
}

// Muestra los productos almacenados en el arreglo
function mostrarProductos(listaProductos) {
  console.log("=== Lista de productos ===");

  if (listaProductos.length === 0) {
    console.log("No hay productos disponibles.");
    return;
  }

  for (const producto of listaProductos) {
    console.log(`Producto: ${producto}`);
  }
}

// Ejecuta operaciones sobre el listado de productos
function gestionarProductos(listaProductos) {
  console.log("=== OPERACIONES CON ARREGLOS ===");

  agregarProductoFin(listaProductos);
  agregarProductoInicio(listaProductos);
  actualizarProducto(listaProductos);
  eliminarProductoFin(listaProductos);
  mostrarProductos(listaProductos);
}

// Ejecutar simulador
ejecutarSimulador();
