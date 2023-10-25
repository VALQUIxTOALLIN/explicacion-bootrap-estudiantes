// Obtenemos el botón para abrir el menú, su id es "open-menu"
const openMenu = document.querySelector("#open-menu");

// Obtenemos el botón para cerrar el menú, su id es "close-menu"
const closeMenu = document.querySelector("#close-menu");

// Obtenemos el elemento "aside", que es el menú lateral
const aside = document.querySelector("aside");

// Añadimos un evento de clic al botón para abrir el menú
openMenu.addEventListener("click", () => {
    // Cuando se hace clic en el botón, añadimos la clase "aside-visible" al menú
    // Esto hará que el menú se muestre
    aside.classList.add("aside-visible");
})

// Añadimos un evento de clic al botón para cerrar el menú
closeMenu.addEventListener("click", () => {
    // Cuando se hace clic en el botón, quitamos la clase "aside-visible" del menú
    // Esto hará que el menú se oculte
    aside.classList.remove("aside-visible");
})