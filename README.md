# 🛒 Simulador: Validador de Stock

Pequeño simulador desarrollado en **JavaScript** que permite gestionar un inventario de productos de electrónica y simular un proceso de compra mediante una interfaz web.

El proyecto cuenta con dos vistas principales: una **vista de administrador**, que permite gestionar los productos del inventario, y una **vista de cliente**, que permite consultar el catálogo, seleccionar productos y realizar una compra simulada.

Se implementa una clase **Producto** para representar cada elemento del inventario mediante propiedades como identificador, nombre, stock, precio, descripción e imagen, así como un método para verificar su disponibilidad.

El proyecto incorpora persistencia de datos mediante **`localStorage`** permitiendo conservar tanto la información del inventario como los productos agregados al carrito, incluso después de recargar o cerrar la página.

Además, se implementa la carga asíncrona de productos desde un archivo JSON local mediante **`fetch()`** y **`async/await`**, junto con mecanismos para manejar errores durante la carga, modificación y almacenamiento de información.

Para organizar el código, se distribuyen las responsabilidades en un máximo de tres archivos JavaScript: **main.js**, **admin.js** y **cliente.js**, manteniendo un único archivo HTML para ambas vistas.

## 📌 Funcionalidades

### Vista de administrador

- Mostrar el listado de productos del inventario.
- Cargar productos iniciales desde un archivo JSON local.
- Agregar nuevos productos al inventario.
- Registrar nombre, precio, stock, descripción e imagen de cada producto.
- Buscar productos por nombre.
- Editar la información de los productos.
- Eliminar productos del inventario.
- Vaciar completamente el listado.
- Validar los datos ingresados antes de registrar un producto.
- Verificar la disponibilidad de stock.
- Actualizar dinámicamente la interfaz mediante manipulación del DOM.
- Guardar los cambios del inventario en **`localStorage`**.

### Vista de cliente

- Consultar el catálogo de productos disponibles.
- Visualizar imágenes, nombres, precios, descripciones y stock.
- Buscar productos por nombre.
- Agregar productos al carrito de compras.
- Evitar agregar cantidades superiores al stock disponible.
- Modificar las cantidades de los productos seleccionados.
- Eliminar productos individuales del carrito.
- Calcular automáticamente los subtotales y el total de la compra.
- Mostrar la cantidad total de unidades seleccionadas.
- Vaciar completamente el carrito.
- Confirmar una compra mediante una alerta de confirmación.
- Descontar del inventario las unidades adquiridas.
- Actualizar el catálogo después de confirmar una compra.
- Guardar el carrito en localStorage.
- Recuperar los productos seleccionados al recargar la página.
- Sincronizar el carrito con el inventario para evitar conservar productos inexistentes o cantidades superiores al stock disponible.

### Funcionalidades generales

- Mostrar mensajes de notificación al usuario.
- Implementar alertas de confirmación y resultados de operaciones.
- Manejar errores mediante **`try/catch/finally`** en operaciones que pueden generar excepciones.

## 🛠️ Tecnologías

- **HTML5** para la estructura de la aplicación.
- **CSS3** para los estilos y el diseño responsive.
- **JavaScript** para la lógica y funcionalidad del simulador.
- **Toastify** para mostrar notificaciones.
- **SweetAlert2** para mostrar alertas, confirmaciones y mensajes de resultado.
- **Fetch API** para obtener información desde un archivo JSON.
- **Manipulación del DOM** para actualizar dinámicamente la interfaz.
- **Eventos del navegador** para gestionar las interacciones del usuario.
- **LocalStorage** para almacenar el inventario y el carrito.
- **JSON**como formato de almacenamiento inicial de productos.
- **Asincronía con async/await** para gestionar operaciones asíncronas.

## 📂 Conceptos utilizados

El simulador utiliza diferentes conceptos fundamentales de JavaScript:

- Variables y constantes.
- Funciones.
- Funciones fleha.
- Condicionales.
- Operadores lógicos.
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
- Modularización y separación de responsabilidades.

### Métodos de arreglos utilizados

- `push()` → agrega un elemento al final del arreglo.
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
- **imagen** → ruta o dirección de la imagen del producto.

La clase también incluye el método `verificarStock()`, que permite determinar si un producto está disponible o agotado.

### Modularización

Para mantener una mejor organización del código, se separan las funcionalidades en tres archivos JavaScript.

Esta distribución permite establecer responsabilidades específicas para cada archivo y evitar concentrar toda la lógica de la aplicación en un único documento.

Las funciones compartidas se encuentran en **main.js**, mientras que las operaciones administrativas y las funcionalidades del cliente se encuentran separadas en **admin.js** y **cliente.js**, respectivamente.

### Carga asíncrona de productos

El proyecto utiliza la función `obtenerProductos()` para recuperar los productos iniciales desde un archivo JSON local mediante **fetch()**.

La función se declara con `async/await` para esperar la respuesta de la petición y la conversión de los datos mediante `response.json()`.

La función `inicializarProductos()` coordina la carga inicial, recupera los datos almacenados en el navegador cuando existen y actualiza la interfaz una vez finalizado el proceso.

### Persistencia con localStorage

El proyecto incorpora **`localStorage`** para conservar la información del inventario en el navegador.

De esta manera, los productos agregados o eliminados permanecen disponibles después de recargar la página.

Se manejan dos conjuntos de información independientes:

#### Inventario (listadoProductos)

Almacena los productos registrados, incluyendo sus propiedades y cantidades disponibles.

Permite conservar los productos agregados, editados o eliminados desde la vista administrativa.

#### Carrito (carritoCompras)

Almacena los identificadores de los productos seleccionados y sus respectivas cantidades.

Permite recuperar el carrito después de recargar la página y continuar con la selección de productos.

Antes de utilizar el carrito, se realiza una sincronización con el inventario para comprobar que los productos sigan existiendo y que las cantidades seleccionadas no superen el stock disponible.

### Proceso de compra

La vista de cliente incorpora un proceso de compra simulado.

Cuando el usuario confirma una compra:

1. Se verifica que el carrito contenga productos.
2. Se comprueba que los productos sigan existiendo en el inventario.
3. Se valida que las cantidades seleccionadas estén disponibles.
4. Se calcula el total de la compra.
5. Se solicita la confirmación del usuario mediante SweetAlert2.
6. Se descuentan las unidades adquiridas del inventario.
7. Se actualiza el almacenamiento del inventario.
8. Se limpia el carrito y se actualiza su almacenamiento.
9. Se muestra un mensaje indicando que la compra se realizó correctamente.

### Manejo de errores

El simulador incorpora **`try/catch/finally`** para controlar posibles errores durante operaciones como:

- Lectura de productos desde el archivo JSON.
- Conversión de información mediante JSON.
- Recuperación de datos desde localStorage.
- Almacenamiento de productos y carrito.
- Actualización de información del inventario.

De esta manera, se busca evitar interrupciones inesperadas y proporcionar mensajes informativos al usuario.

## 🖥️ Interfaz

El proyecto cuenta con dos vistas principales que permiten diferenciar las operaciones administrativas de las acciones disponibles para el cliente.

### Vista de administrador

Permite gestionar los productos que forman parte del inventario.

#### Agregar un producto

El formulario permite ingresar:

- Nombre.
- Precio.
- Stock.
- Descripción.
- Imagen.

Antes de agregar el producto se realizan diferentes validaciones para comprobar que los datos sean válidos.

Una vez validados, se genera automáticamente un nuevo ID y el producto se agrega al inventario.

Después de agregarlo, se actualiza **`localStorage`** y se vuelve a renderizar la interfaz.

#### Buscar un producto

El usuario puede ingresar el nombre de un producto para localizarlo dentro del inventario.

Los resultados se muestran dinámicamente conforme al texto ingresado.

#### Listado de productos

Cada producto incluye:

- Identificador.
- Imagen.
- Nombre.
- Precio.
- Descripción.
- Estado del stock.
- Opciones para editar y eliminar.

#### Editar un producto

Permite modificar la información de un producto existente y actualizar los cambios en el inventario.

#### Eliminar un producto

Cada producto cuenta con una opción para eliminarlo del inventario.

Después de realizar la operación, se actualiza **`localStorage`** y se vuelve a mostrar el listado.

#### Vaciar inventario

Permite eliminar todos los productos registrados en el inventario.

### Vista de cliente

Permite consultar los productos disponibles y simular una compra.

#### Catálogo de productos

Los productos se muestran mediante tarjetas que incluyen:

- Imagen.
- Nombre.
- Precio.
- Descripción.
- Disponibilidad de stock.
- Botón para agregar al carrito.

#### Buscar productos

El usuario puede buscar productos por nombre para localizar rápidamente los artículos disponibles.

#### Carrito de compras

El carrito muestra los productos seleccionados y permite:

- Aumentar cantidades.
- Disminuir cantidades.
- Eliminar productos individuales.
- Consultar el subtotal de cada producto.
- Consultar la cantidad total de unidades.
- Calcular el importe total de la compra.

Las cantidades están limitadas por el stock disponible en el inventario.

#### Confirmar compra

Al seleccionar la opción de confirmar compra, se muestra una alerta mediante SweetAlert2 para solicitar la confirmación del usuario.

Una vez confirmada, se actualiza el inventario, se descuentan las unidades adquiridas y se limpia el carrito.

### Notificaciones y alertas

El proyecto utiliza dos librerías para comunicar diferentes situaciones al usuario.

#### Toastify

Se utiliza para mostrar notificaciones rápidas relacionadas con las operaciones realizadas.

Se implementan diferentes tipos de notificaciones:

- `success` → indica que una operación se completó correctamente.
- `error` → informa sobre errores o datos no válidos.
- `info` → permite mostrar mensajes informativos.
- `warning` → informa sobre situaciones que requieren atención.

#### SweetAlert2

Se utiliza para mostrar alertas y solicitar confirmaciones antes de realizar determinadas operaciones.

Por ejemplo:

- Confirmar si se desea vaciar el carrito.
- Confirmar una compra.
- Mostrar el resultado de una compra.
- Informar sobre situaciones importantes que requieren la atención del usuario.

## ▶️ Ejecución

Para ejecutar el proyecto, abre el archivo **index.html** en un navegador web.

La estructura principal del proyecto está compuesta por:

```text
📁 mi-simulador
├── 📄 index.html
├── 📁 css
│   └── 📄 style.css
├── 📁 js
│   ├── 📄 main.js
│   ├── 📄 admin.js
│   └── 📄 cliente.js
└── 📄 productos.json
```

El archivo HTML contiene ambas vistas y realiza la carga de las librerías externas y los tres archivos JavaScript.

La hoja de estilos se encuentra en **css/style.css**, mientras que el archivo **productos.json** contiene la información inicial de los productos.

La interacción con el simulador se realiza directamente desde la interfaz gráfica mediante formularios, botones y elementos dinámicos.

Los datos del inventario y del carrito se almacenan localmente en el navegador mediante **`localStorage`**.

## 🎯 Objetivo

El objetivo de este proyecto es practicar conceptos fundamentales de JavaScript mediante la creación de un pequeño sistema de gestión de productos y simulación de compras.

A través del proyecto se ponen en práctica conceptos como **arreglos, clases, objetos, funciones, métodos de orden superior, validaciones, eventos, manipulación del DOM, programación asíncrona, consumo de archivos JSON, modularización, manejo de errores y almacenamiento local**, aplicados a un caso práctico de administración de inventario y proceso de compra.

El proyecto permite comprender cómo diferentes funcionalidades pueden integrarse en una misma aplicación, manteniendo una separación de responsabilidades y utilizando herramientas básicas del desarrollo web.
