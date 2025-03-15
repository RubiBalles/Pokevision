// Obtener los elementos necesarios
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// Agregar evento de clic al botón de menú
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show"); // Alternar la clase 'show' en el menú
});
