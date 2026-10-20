# 🛒 Simulador: Validador de Stock

Pequeño simulador desarrollado en **JavaScript** que permite gestionar un listado de productos de electrónica, verificar su disponibilidad de stock y realizar diferentes operaciones sobre el inventario.

El proyecto cuenta con una interfaz web que permite **agregar, buscar, mostrar y eliminar productos**, además de validar los datos ingresados por el usuario.

También se implementa una clase **Producto** para representar cada producto con información como identificador, nombre, stock, precio y descripción, así como un método para verificar su disponibilidad.

El proyecto incorpora persistencia de datos mediante **`localStorage`**, permitiendo conservar la información del inventario incluso después de recargar o cerrar la página.

Además, se implementa la carga asíncrona de productos desde un archivo JSON local mediante **fetch()** y **async/await**, junto con mecanismos para manejar errores durante la carga y el almacenamiento de información.

## 📌 Funcionalidades

- Mostrar un listado inicial de productos.
- Cargar productos desde un archivo JSON local.
- Agregar nuevos productos al listado.
- Buscar productos por nombre.
- Mostrar los productos encontrados.
- Eliminar productos del listado.
- Verificar la disponibilidad de stock de cada producto.
- Mostrar mensajes de notificación al usuario.
- Actualizar dinámicamente la interfaz mediante manipulación del DOM.
- Guardar los productos en **`localStorage`**.
- Recuperar los productos almacenados al cargar la aplicación.
- Manejar errores mediante **`try/catch/finally`** en operaciones que pueden generar excepciones.

## 🛠️ Tecnologías

- **HTML5**
- **CSS3**
- **JavaScript**
- **Toastify** para mostrar notificaciones
- **Fetch API** para obtener información desde un archivo JSON
- **Manipulación del DOM**
- **Eventos del navegador**
- **LocalStorage**
- **JSON**
- **Asincronía con async/await**

## 📂 Conceptos utilizados

El simulador utiliza diferentes conceptos fundamentales de JavaScript:

- Variables y constantes.
- Funciones.
- Funciones fleha.
- Condicionales.
- Operadores avanzados.
- Arreglos.
- Métodos de arreglos.
- Clases y objetos.
- Instanciación de objetos.
- Métodos de clase.
- Funciones de orden superior.
- Desestructuración.
- Manipulación del DOM.
- Eventos.
- Validación de datos.
- Template literals.
- Uso de **`setTimeout()`** y **`clearTimeout()`**.
- Peticiones asíncronas mediante **`fetch()`**.
- Uso de **`async/await`**.
- Persistencia de datos con **`localStorage`**.
- Serialización y deserialización mediante JSON.
- Manejo de excepciones con **`try/catch/finally`**.

### Métodos de arreglos utilizados

- `push()` → agrega un elemento al final del arreglo.
- `splice()` → elimina un producto del arreglo.
- `findIndex()` → busca la posición de un elemento que cumple con una condición.
- `map()` → obtiene los identificadores de los productos para generar un nuevo ID.
- `forEach()` → recorre los elementos del arreglo.
- `filter()` → crea un nuevo arreglo con los productos cuyo nombre coincide con el texto de búsqueda.

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
- `filter()` para realizar búsquedas por nombre.
- `map()` para obtener los IDs existentes y generar un nuevo identificador.

### Carga asíncrona de productos

El proyecto utiliza la función obtenerProductos() para recuperar los productos iniciales desde un archivo JSON local mediante **fetch()**.

La función se declara con async y utiliza await para esperar la respuesta de la petición y la conversión de los datos mediante response.json().

La función inicializarProductos() se encarga de coordinar la carga inicial, mostrar un mensaje de carga y actualizar la interfaz cuando finaliza el proceso.

### Persistencia con localStorage

El proyecto incorpora **`localStorage`** para conservar la información del inventario en el navegador.

De esta manera, los productos agregados o eliminados permanecen disponibles después de recargar la página.

### Manejo de errores

El simulador incorpora **`try/catch/finally`** para manejar posibles errores durante operaciones como la lectura y conversión de información almacenada en **`localStorage`**.

## 🖥️ Interfaz

El proyecto cuenta con diferentes secciones para facilitar la interacción con el usuario:

### Agregar un producto

El formulario permite ingresar:

- Nombre.
- Precio.
- Stock.
- Descripción.

Antes de agregar el producto se realizan diferentes validaciones para comprobar que los datos sean válidos.

Una vez validados los datos, se genera automáticamente un nuevo ID y el producto se agrega al listado.

Después de agregarlo, se actualiza **`localStorage`** y se vuelve a renderizar la interfaz.

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

### Eliminar un producto

Cada producto cuenta con un botón Eliminar.

Al eliminar un producto, se actualiza nuevamente **`localStorage`** y se vuelve a mostrar el listado actualizado.

### Notificaciones

El proyecto utiliza **Toastify** para mostrar notificaciones visuales que informan al usuario sobre las operaciones realizadas.

Se implementan diferentes tipos de notificaciones:

`success` → indica que una operación se completó correctamente.
`error` → informa sobre errores o datos no válidos.
`info` → permite mostrar mensajes informativos.
`warning` → define un estilo para advertencias.

## ▶️ Ejecución

Para ejecutar el proyecto, abre el archivo **index.html** en un navegador web.

La estructura principal del proyecto está compuesta por:

```text
📁 mi-simulador
├── 📄 index.html
├── 📁 css
│   └── 📄 style.css
├── 📁 js
│   └── 📄 main.js
└── 📄 productos.json
```

El archivo HTML carga los estilos desde **css/style.css** y el código JavaScript desde **js/main.js**. El archivo productos.json contiene la información inicial de los productos.

La interacción con el simulador se realiza directamente desde la interfaz gráfica mediante formularios, botones y elementos dinámicos.

Los datos del inventario se almacenan localmente en el navegador mediante **`localStorage`**.

## 🎯 Objetivo

El objetivo de este proyecto es practicar conceptos fundamentales de **JavaScript** mediante la creación de un pequeño sistema de gestión de productos.

A través del proyecto se ponen en práctica conceptos como **arreglos, clases, objetos, funciones, métodos de orden superior, validaciones, eventos y manipulación del DOM, programación asíncrona, consumo de archivos JSON, manejo de errores y almacenamiento local**, aplicados a un caso práctico de inventario y control de stock.
