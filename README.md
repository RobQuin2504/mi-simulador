# 🛒 Simulador: Validador de Stock

Pequeño simulador desarrollado en **JavaScript** que permite validar la cantidad de productos que un usuario desea comprar, verificar la disponibilidad de productos y calcular el total de la compra.

Además, el proyecto incluye diferentes operaciones con arreglos, como agregar, eliminar, buscar, actualizar y mostrar productos.

También se implementa una clase **Producto** para representar productos con información como identificador, nombre, stock, precio y descripción, así como un método para verificar su disponibilidad.

## 📌 Funcionalidades

- Validar que el producto ingresado exista en el listado.
- Verificar que el producto seleccionado tenga stock disponible.
- Validar que la cantidad solicitada esté dentro del stock disponible.
- Calcular el total de una compra.
- Mostrar un resumen de la compra.
- Actualizar el stock después de realizar una compra.
- Agregar productos al final de un arreglo.
- Agregar productos al inicio de un arreglo.
- Buscar productos dentro del arreglo.
- Actualizar el nombre de un producto existente.
- Eliminar el último producto del arreglo.
- Mostrar la lista de productos.
- Mostrar el detalle de un producto.
- Mostrar únicamente los productos que tienen stock disponible.
- Calcular el total invertido en el stock.

## 🛠️ Tecnologías

- JavaScript
- `prompt()` para recibir datos del usuario.
- `alert()` para mostrar mensajes.
- `console.log()` para mostrar información en la consola.

## 📂 Conceptos utilizados

El simulador utiliza diferentes conceptos fundamentales de JavaScript:

- Variables y constantes.
- Funciones.
- Funciones fleha.
- Condicionales.
- Bucle `do...while`.
- Arreglos.
- Métodos de arreglos.
- Entrada de datos mediante `prompt()`.
- Salida de información mediante `alert()` y `console.log()`.
- Clases y objetos.
- Instanciación de objetos.
- Métodos de clase.
- Funciones de orden superior.

### Métodos de arreglos utilizados

- `push()` → agrega un elemento al final del arreglo.
- `unshift()` → agrega un elemento al inicio del arreglo.
- `pop()` → elimina el último elemento del arreglo.
- `find()` → busca y devuelve un elemento que cumple con una condición.
- `findIndex()` → busca la posición de un elemento que cumple con una condición.
- `forEach()` → recorre los elementos del arreglo.
- `filter()` → crea un nuevo arreglo con los elementos que cumplen una condición.
- `reduce()` → permite realizar una operación acumulativa sobre los elementos del arreglo.

### Clase Producto

Se creó la clase **Producto** para representar productos con diferentes propiedades:

Cada producto contiene:

- **id** → identificador del producto.
- **nombre** → nombre del producto.
- **stock** → cantidad disponible.
- **precio** → precio del producto.
- **descripcion** → descripción del producto.

La clase también incluye el método `verificarStock()`, que permite determinar si un producto está disponible o agotado.

### Funciones de orden superior

El simulador utiliza diferentes métodos de arreglos para trabajar con la información del inventario:

- `forEach()` para recorrer y mostrar los productos.
- `find()` para localizar un producto por su nombre.
- `findIndex()` para obtener la posición de un producto.
- `filter()` para obtener únicamente los productos que cuentan con stock.
- `reduce()` para calcular el valor total del inventario disponible.

## ▶️ Ejecución

Para ejecutar el simulador, abre el archivo JavaScript en un entorno que soporte:

- `prompt()`
- `alert()`
- `console.log()`

El programa solicita información al usuario mediante ventanas emergentes y muestra los resultados principalmente en la consola del navegador.

## 🎯 Objetivo

El objetivo de este proyecto es practicar conceptos básicos de **JavaScript** mediante la creación de un pequeño simulador de compras y la manipulación de arreglos, así como el uso de clases, objetos, funciones y métodos de orden superior.
