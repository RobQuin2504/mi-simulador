# 🛒 Simulador: Validador de Stock

Pequeño simulador desarrollado en **JavaScript** que permite validar la cantidad de productos que un usuario desea comprar y calcular el total de la compra.

Además, el proyecto incluye diferentes operaciones con arreglos, como agregar, eliminar, buscar, actualizar y mostrar productos.

También se implementa una clase Producto para representar productos con información como identificador, nombre, stock, precio y descripción, así como un método para verificar su disponibilidad.

## 📌 Funcionalidades

- Validar que la cantidad solicitada esté dentro del stock disponible.
- Calcular el total de una compra.
- Mostrar un resumen de la compra.
- Agregar productos al final de un arreglo.
- Agregar productos al inicio de un arreglo.
- Buscar productos dentro del arreglo.
- Actualizar un producto existente
- Eliminar el último producto del arreglo.
- Mostrar la lista de productos disponibles.
- Buscar productos dentro del arreglo.
- Actualizar un producto existente

## 🛠️ Tecnologías

- JavaScript
- `prompt()` para recibir datos del usuario.
- `alert()` para mostrar mensajes.
- `console.log()` para mostrar información en la consola.

## 📂 Conceptos utilizados

El simulador utiliza diferentes conceptos fundamentales de JavaScript:

- Variables y constantes.
- Funciones.
- Condicionales.
- Bucle `while`.
- Arreglos.
- Métodos de arreglos.
- Entrada de datos mediante `prompt()`.
- Salida de información mediante `alert()` y `console.log()`.
- Clases y objetos.

### Métodos de arreglos utilizados

- `push()` → agrega un elemento al final.
- `unshift()` → agrega un elemento al inicio.
- `pop()` → elimina el último elemento.
- `indexOf()` → busca la posición de un elemento.

### Clase Producto

Se creó la clase **Producto** para representar productos con diferentes propiedades:

Cada producto contiene:

- **id** → identificador del producto.
- **nombre** → nombre del producto.
- **stock** → cantidad disponible.
- **precio** → precio del producto.
- **descripcion** → descripción del producto.

La clase también incluye el método `verificarStock()`, que permite determinar si un producto está disponible o agotado.

## ▶️ Ejecución

Para ejecutar el simulador, abre el archivo JavaScript en un entorno que soporte:

- `prompt()`
- `alert()`
- `console.log()`

## 🎯 Objetivo

El objetivo de este proyecto es practicar conceptos básicos de **JavaScript** mediante la creación de un pequeño simulador de compras y la manipulación de arreglos, así como el uso de clases y objetos.
