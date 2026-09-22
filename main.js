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

// Acceso a elementos del DOM
const formularioAgregacion = document.getElementById("form-agregacion");
const contenedorProductos = document.getElementById("contenedor-items");
const btnAgregar = document.getElementById("btn-agregar");
const btnBuscar = document.getElementById("btn-buscar");
const notificaciones = document.getElementById("notificacion");

const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const inputDescripcion = document.querySelector("#descripcion");
const inputBuscar = document.querySelector("#buscar");

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
