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
function validarCantidad(cantidad, stock) {
  return cantidad > 0 && cantidad <= stock;
}

// Calcula el total de la compra realizada
const calcularTotal = (cantidad, precioUnitario) => {
  return cantidad * precioUnitario;
};

// Muestra el resumen de la compra realizada
function mostrarResumenCompra(cantidad, precioUnitario, total) {
  console.log("=== RESUMEN DE COMPRA ===");
  console.log(`Unidades compradas: ${cantidad}`);
  console.log(`Precio unitario: $${precioUnitario}`);
  console.log(`Total a pagar: $${total}`);
}

// Ejecutar simulador
validadorStock();
