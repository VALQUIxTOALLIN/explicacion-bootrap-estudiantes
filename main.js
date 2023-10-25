// Creamos un arreglo vacío llamado productos para guardar la información de los productos
let productos = [];

// Hacemos una solicitud a un archivo JSON para obtener la información de los productos
fetch("./js/productos.json")
    .then(response => response.json())  // Convertimos la respuesta a formato JSON
    .then(data => {
        productos = data;  // Guardamos la información en el arreglo productos
        cargarProductos(productos);  // Llamamos a la función cargarProductos
    })

// Obtenemos elementos HTML para manipularlos más adelante
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Cuando se hace clic en un botón de categoría, ocultamos el menú lateral
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar los productos en la página web
function cargarProductos(productosElegidos) {

    // Limpiamos el contenedor de productos
    contenedorProductos.innerHTML = "";

    // Añadimos cada producto al contenedor
    productosElegidos.forEach(producto => {

        // Creamos un nuevo elemento div y le añadimos clases y contenido
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        // Añadimos el nuevo div al contenedor de productos
        contenedorProductos.append(div);
    })

    // Actualizamos los botones de agregar al carrito
    actualizarBotonesAgregar();
}

// Añadimos comportamiento a los botones de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        // Quitamos la clase 'active' de todos los botones y se la añadimos al que se clickeó
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Filtramos los productos según la categoría seleccionada y los cargamos
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

// Actualiza los botones para agregar productos al carrito
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    // Añadimos un evento de clic a cada botón
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Variables para manejar el carrito de compras
let productosEnCarrito;

// Obtenemos los productos en el carrito desde el almacenamiento local
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Inicializamos el carrito de compras
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {

    // Mostramos una notificación de que el producto fue agregado
    // (Aquí se usa una biblioteca llamada Toastify para mostrar la notificación)
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
    }).showToast();

    // Buscamos el producto que se quiere agregar
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    // Agregamos el producto al carrito o incrementamos su cantidad si ya estaba
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Actualizamos el número que muestra cuántos productos hay en el carrito
    actualizarNumerito();

    // Guardamos el estado del carrito en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Función para actualizar el número de productos en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
