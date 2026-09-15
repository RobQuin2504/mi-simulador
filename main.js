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
  // Arreglo de datos
  const productos = [
    "Teléfono inteligente",
    "Computadora portátil",
    "Tableta",
    "Consola",
    "Audífonos",
    "Cámara digital",
  ];

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

  const producto4 = new Producto(
    4,
    "Monitor",
    8,
    3500,
    "Monitor Full HD de 24 pulgadas",
  );

  const producto5 = new Producto(
    5,
    "Audífonos",
    20,
    800,
    "Audífonos inalámbricos con cancelación de ruido",
  );

  // Probar método
  console.log(producto1.verificarStock());
  console.log(producto2.verificarStock());
  console.log(producto3.verificarStock());
  console.log(producto4.verificarStock());
  console.log(producto5.verificarStock());

  // Array de productos
  const listadoProductos = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
  ];

  console.log("=== VALIDADOR DE STOCK ===");

  const producto = solicitarProducto(listadoProductos);

  if (producto !== null) {
    const cantidad = solicitarCantidad(producto);
    const total = calcularTotal(cantidad, precioUnitario);

    // Mostrar resumen de compra
    mostrarResumenCompra(cantidad, precioUnitario, total);
  }

  // Realiza operaciones sobre el listado de productos
  gestionarProductos(productos);

  // Operaciones con funciones de orden superior
  realizarOperaciones(listadoProductos);
}

// Solicita un el nombre de un producto válido
function solicitarProducto(listaProductos) {
  console.log("=== Productos disponibles ===");

  if (listaProductos.length === 0) {
    alert("No hay productos disponibles");
    return null;
  } else {
    listaProductos.forEach((producto) => {
      console.log(producto.nombre);
    });
  }

  let producto;

  // Bucle: se repite hasta que el usuario ingrese un producto válido
  do {
    // Captura entrada del usuario
    producto = prompt(`Ingresa el producto que desea adquirir: `);

    // Verifica la existencia del producto
    let existeProducto = listaProductos.some(
      (prod) => prod.nombre.toUpperCase() === producto.toUpperCase(),
    );

    // Valida producto ingresado
    if (!existeProducto) {
      alert(`Error: El producto "${producto}" no esta disponible`);
    }
  } while (!existeProducto);

  // Busca un producto en particular a través de su nombre
  const productoBuscado = listaProductos.find(
    (prod) => prod.nombre.toUpperCase() === producto.toUpperCase(),
  );

  return productoBuscado;
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

// Muestra el detalle de un producto en particular
function mostrarDetalleProducto(listaProductos) {
  const producto = solicitarProducto(listaProductos);

  if (producto === null) {
    return;
  }

  console.log(`Nombre del producto: ${producto.nombre}`);
  console.log(`Stock disponible: ${producto.stock}`);
  console.log(`Precio: $${producto.precio}`);
  console.log(`Descripción: ${producto.descripcion}`);
}

// Muestra solo aquellos productos que cuentan con stock disponible
function mostrarProductosConStock(listaProductos) {
  const productosConStock = listaProductos.filter((prod) => prod.stock > 0);
  console.log(productosConStock);
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
