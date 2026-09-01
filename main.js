/* Simulador: Validador de stock */

// Declaración de variables
const precioUnitario = 5;
const stock = 10;

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
      console.log(`Error: La cantidad ingresada debe estar entre 1 y ${stock}`);
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
  console.log("=== RESUMEN DE COMPRA ===");
  console.log(`Unidades compradas: ${unidades}`);
  console.log(`Precio unitario: $${precioUnidad}`);
  console.log(`Total a pagar: $${precioTotal}`);
}

// Ejecutar simulador
validadorStock();
