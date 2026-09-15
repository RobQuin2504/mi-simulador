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

// Función principal del simulador
function ejecutarSimulador() {
  // Arreglo de datos
  // const productos = [
  //   "Teléfono inteligente",
  //   "Computadora portátil",
  //   "Tableta",
  //   "Consola",
  //   "Audífonos",
  //   "Cámara digital",
  // ];

  console.log("====================================");
  console.log("      VALIDADOR DE STOCK");
  console.log("====================================");

  console.log("=== Estado del inventario ===");

  listadoProductos.forEach((producto) => {
    console.log(producto.verificarStock());
  });

  console.log("=== Proceso de compra ===");
  const producto = solicitarProducto(listadoProductos);

  if (producto !== null) {
    const cantidad = solicitarCantidad(producto);
    const total = calcularTotal(cantidad, producto.precio);

    // Mostrar resumen de compra
    mostrarResumenCompra(cantidad, precioUnitario, total);

    // Actualizar stock después de la compra
    producto.stock -= cantidad;
    console.log(`Stock restante de "${producto.nombre}": ${producto.stock}`);
  }

  // Realiza operaciones sobre el listado de productos
  gestionarProductos(listadoProductos);

  // Operaciones con funciones de orden superior
  mostrarInformacionInventario(listadoProductos);
}

// Solicita un el nombre de un producto válido
function solicitarProducto(listaProductos) {
  console.log("=== Productos disponibles ===");

  if (listaProductos.length === 0) {
    alert("No hay productos disponibles");
    return null;
  }

  // Mostrar productos
  listaProductos.forEach((producto) => {
    console.log(
      `${producto.nombre} | Stock: ${producto.stock} | Precio: $${producto.precio}`,
    );
  });

  let nombreProducto;
  let productoEncontrado;

  // Bucle: se repite hasta que el usuario ingrese un producto válido
  do {
    // Captura entrada del usuario
    nombreProducto = prompt(`Ingresa el producto que desea adquirir: `);

    // Si el usuario presiona Cancelar
    if (nombreProducto === null) {
      return null;
    }

    // Verifica la existencia del producto
    productoEncontrado = listaProductos.find(
      (producto) =>
        producto.nombre.toLowerCase() === nombreProducto.toLowerCase(),
    );

    // Valida producto ingresado
    if (!productoEncontrado) {
      alert(`Error: El producto "${producto}" no esta disponible`);
    }
  } while (!productoEncontrado);

  // Verificar si existe stock
  if (productoEncontrado.stock === 0) {
    alert(`El producto "${productoEncontrado.nombre}" está agotado.`);
    return null;
  }

  return productoEncontrado;
}

// Solicita una cantidad válida al usuario
function solicitarCantidad(producto) {
  let cantidad;
  const stock = producto.stock;

  // Bucle: se repite hasta que el usuario ingrese una cantidad válida
  do {
    const // Captura entrada del usuario
      cantidad = parseInt(
        prompt(`Ingresa la cantidad de unidades a comprar (1 - ${stock}):`),
      );
    // Valida cantidad ingresada
    if (!validarCantidad(cantidad, stock)) {
      alert(`Error: La cantidad ingresada debe estar entre 1 y ${stock}`);
    }
  } while (!validarCantidad(cantidad, stock));

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
function mostrarResumenCompra(producto, unidades, total) {
  console.log("=== Resumen de compra ===");
  console.log(`Producto: ${producto.nombre}`);
  console.log(`Unidades compradas: ${unidades}`);
  console.log(`Precio unitario: $${producto.precio}`);
  console.log(`Total a pagar: $${total}`);
}

/* Operaciones con arreglos */

// Agrega producto al final del arreglo
function agregarProductoFin(listaProductos) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Fin):`);

  if (producto === null || nombre === "") {
    console.log("No se agregó ningún producto.");
    return;
  }

  const nuevoId = listaProductos[listaProductos.length - 1].id + 1;

  const nuevoProducto = new Producto(
    nuevoId,
    nombre,
    0,
    0,
    "Descripción del producto",
  );

  listaProductos.push(nuevoProducto);

  console.log(
    `Producto "${nuevoProducto.nombre}" agregado al final del listado.`,
  );
}

// Elimina producto del final
function eliminarProductoFin(listaProductos) {
  if (listaProductos.length === 0) {
    alert("El listado de productos está vacío.");
    return;
  }

  const productoEliminado = listaProductos.pop();
  alert(`Se ha eliminado el producto "${productoEliminado.nombre}".`);
  console.log(`Se ha eliminado el producto "${productoEliminado.nombre}".`);
}

// Agrega producto al inicio del arreglo
function agregarProductoInicio(listaProductos) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Inicio):`);

  if (producto === null || nombre === "") {
    console.log("No se agregó ningún producto.");
    return;
  }

  const nuevoId = listaProductos[listaProductos.length - 1].id + 1;

  const nuevoProducto = new Producto(
    nuevoId,
    nombre,
    0,
    0,
    "Descripción del producto",
  );

  listaProductos.push(nuevoProducto);

  console.log(
    `Producto "${nuevoProducto.nombre}" agregado al final del listado.`,
  );
}

// Busca un producto específico en el arreglo
function buscarProducto(listaProductos) {
  let producto = prompt(`Ingresa el nombre del producto a buscar:`);

  if (producto === null || producto === "") {
    alert("No se proporcionó ningún producto para la búsqueda.");
    return -1;
  }

  if (!listaProductos.includes(producto)) {
    console.log(`El producto "${producto}" no forma parte del listado.`);
    return -1;
  }

  const posicion = listaProductos.indexOf(producto);

  console.log(
    `El producto "${producto}" se encuentra en la posición ${posicion}.`,
  );

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

  const nuevoNombre = prompt(
    `Ingresa el nuevo nombre para "${productoAnterior.nombre}":`,
  );

  if (nuevoNombre === null || nuevoNombre === "") {
    console.log("Actualización cancelada.");
    return;
  }

  productoAnterior.nombre = nuevoNombre.trim();

  console.log(
    `El producto "${productoAnterior.nombre}" ha sido actualizado correctamente.`,
  );
}

// Muestra los productos almacenados en el arreglo
function mostrarProductos(listaProductos) {
  console.log("=== Lista de productos ===");

  if (listaProductos.length === 0) {
    console.log("No hay productos disponibles.");
    return;
  }

  listaProductos.forEach((producto) => {
    console.log(
      `ID: ${producto.id} | Producto: ${producto.nombre} | Stock: ${producto.stock} | Precio: $${producto.precio}`,
    );
  });
}

// Muestra el detalle de un producto en particular
function mostrarDetalleProducto(listaProductos) {
  const producto = solicitarProducto(listaProductos);

  if (producto === null) {
    return;
  }

  console.log("=== Detalle del producto ===");
  console.log(`Nombre del producto: ${producto.nombre}`);
  console.log(`Stock disponible: ${producto.stock}`);
  console.log(`Precio: $${producto.precio}`);
  console.log(`Descripción: ${producto.descripcion}`);
}

// Muestra únicamente los productos con stock
function mostrarProductosConStock(listaProductos) {
  console.log("=== Productos con stock ===");

  const productosConStock = listaProductos.filter(
    (producto) => producto.stock > 0,
  );

  if (productosConStock.length === 0) {
    console.log("No hay productos con stock disponible.");
    return;
  }

  productosConStock.forEach((producto) => {
    console.log(`${producto.nombre} | Stock: ${producto.stock}`);
  });
}

// Muestra el total invertido en stock
function mostrarTotalInvertidoEnStock(listadoProductos) {
  const total = listadoProductos.reduce(
    (acc, prod) => acc + prod.precio * prod.stock,
    0,
  );
  console.log(`Total invertido en stock: $${total}`);
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

// Ejecuta operaciones de orden superior sobre el listado de productos
function realizarOperaciones(listaProductos) {
  mostrarDetalleProducto(listaProductos);
  mostrarProductosConStock(listaProductos);
  mostrarTotalInvertidoEnStock(listaProductos);
}

// Ejecutar simulador
ejecutarSimulador();
