# 🛒 Simulador: Validador de Stock

Pequeño simulador desarrollado en **JavaScript** que permite gestionar un listado de productos de electrónica, verificar su disponibilidad de stock y realizar diferentes operaciones sobre el inventario.

El proyecto cuenta con una interfaz web que permite **agregar, buscar, mostrar y eliminar productos**, además de validar los datos ingresados por el usuario.

También se implementa una clase **Producto** para representar cada producto con información como identificador, nombre, stock, precio y descripción, así como un método para verificar su disponibilidad.

## 📌 Funcionalidades

- Mostrar un listado inicial de productos.
- Agregar nuevos productos al listado.
- Buscar productos por nombre.
- Mostrar los productos encontrados.
- Eliminar productos del listado.
- Verificar la disponibilidad de stock de cada producto.
- Mostrar mensajes de notificación al usuario.
- Actualizar dinámicamente la interfaz mediante manipulación del DOM.

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript
- Manipulación del DOM.
- Eventos del navegador.

## 📂 Conceptos utilizados

El simulador utiliza diferentes conceptos fundamentales de JavaScript:

- Variables y constantes.
- Funciones.
- Funciones fleha.
- Condicionales.
- Arreglos.
- Métodos de arreglos.
- Clases y objetos.
- Instanciación de objetos.
- Métodos de clase.
- Funciones de orden superior.
- Manipulación del DOM.
- Eventos.
- Validación de datos.
- Template literals.
- Uso de setTimeout().

### Métodos de arreglos utilizados

- `push()` → agrega un elemento al final del arreglo.
- `splice()` → elimina un producto del arreglo.
- `findIndex()` → busca la posición de un elemento que cumple con una condición.
- `map()` → obtiene los identificadores de los productos para generar un nuevo ID.
- `forEach()` → recorre los elementos del arreglo.
- `filter()` → crea un nuevo arreglo con los elementos que cumplen una condición.

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
- `findIndex()` para obtener la posición de un producto.
- `filter()` para obtener únicamente los productos que cuentan con stock.
- `map()` para obtener los IDs existentes y generar un nuevo identificador.

## 🖥️ Interfaz

El proyecto cuenta con diferentes secciones para facilitar la interacción con el usuario:

### Agregar un producto

El formulario permite ingresar:

- Nombre.
- Precio.
- Stock.
- Descripción.

Antes de agregar el producto se realizan diferentes validaciones para comprobar que los datos sean válidos.

### Buscar un producto

El usuario puede ingresar el nombre de un producto para buscarlo dentro del listado.

Si el producto existe, se muestran sus datos en la interfaz. Si no se encuentra, se muestra una notificación indicando que no existen coincidencias.

### Listado de productos

Los productos se muestran dinámicamente mediante JavaScript.

Cada producto incluye:

- Identificador.
- Nombre.
- Precio.
- Descripción.
- Estado del stock.
- Botón para eliminarlo.

### Notificaciones

El proyecto utiliza un sistema de notificaciones para informar al usuario cuando:

- Los datos ingresados no son válidos.
- Se agrega un producto correctamente.
- Se elimina un producto.
- No se encuentra un producto durante una búsqueda.

Las notificaciones se muestran durante unos segundos y luego desaparecen automáticamente.

## ▶️ Ejecución

Para ejecutar el proyecto, abre el archivo **index.html** en un navegador web.

El archivo HTML carga los estilos desde **style.css** y el código JavaScript desde **main.js**.

La interacción con el simulador se realiza directamente desde la interfaz gráfica mediante formularios, botones y elementos dinámicos.

## 🎯 Objetivo

El objetivo de este proyecto es practicar conceptos fundamentales de **JavaScript** mediante la creación de un pequeño sistema de gestión de productos.

A través del proyecto se ponen en práctica conceptos como **arreglos, clases, objetos, funciones, métodos de orden superior, validaciones, eventos y manipulación del DOM**, aplicados a un caso práctico de inventario y control de stock.
