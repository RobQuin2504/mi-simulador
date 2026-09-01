/* SIMULADOR: VALIDADOR DE STOCK */

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

// Función principal del simulador
function validadorStock() {
  console.log("=== VALIDADOR DE STOCK ===");

  let cantidad = 0;

  // Bucle: se repite hasta que el usuario ingrese una cantidad válida
  while (!validarCantidad(cantidad, stock)) {
    // Captura entrada del usuario
    cantidad = parseInt(
      prompt(`Ingresa la cantidad de unidades a comprar (1 - ${stock}):`),
    );
    // Valida cantidad ingresada
    if (!validarCantidad(cantidad, stock)) {
      alert(`Error: La cantidad ingresada debe estar entre 1 y ${stock}`);
    }
  }

  const total = calcularTotal(cantidad, precioUnitario);

  // Mostrar resumen de compra
  mostrarResumenCompra(cantidad, precioUnitario, total);
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
function agregarElementoFin(arreglo) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Fin):`);
  arreglo.push(producto);

  console.log(`Producto "${producto}" agregado al final del arreglo.`);
}

// Elimina producto del final
function eliminarElementoFin(arreglo) {
  if (arreglo.length === 0) {
    alert("El arreglo está vacío.");
    return;
  }

  const productoEliminado = arreglo.pop();
  alert(`Se ha eliminado el producto "${productoEliminado}".`);
  console.log(`Se ha eliminado el producto "${productoEliminado}".`);
}

// Agrega producto al inicio del arreglo
function agregarElementoInicio(arreglo) {
  const producto = prompt(`Ingresa el nombre del producto a agregar (Inicio):`);
  arreglo.unshift(producto);

  console.log(`Producto "${producto}" agregado al inicio del arreglo.`);
}

// Busca producto
function buscarElemento(arreglo) {
  let producto = prompt(`Ingresa el nombre del producto a buscar:`);

  if (producto === "") {
    alert("No se proporcionó ningún producto para la búsqueda.");
    return;
  }

  const posicion = arreglo.indexOf(producto);

  if (posicion !== -1) {
    console.log(
      `El producto "${producto}" se encuentra en la posición ${posicion}.`,
    );
  } else {
    console.log(`El producto "${productoBuscado}" no forma parte del arreglo.`);
  }
}

// Mostrar productos
function mostrarArreglo(arreglo) {
  console.log("=== Lista de productos ===");

  if (arreglo.length === 0) {
    console.log("No hay productos disponibles.");
    return;
  }

  for (const element of arreglo) {
    console.log(`Producto: ${element}`);
  }
}

// Ejecutar simulador
validadorStock();
