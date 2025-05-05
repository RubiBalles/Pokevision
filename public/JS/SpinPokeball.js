// Archivo: SpinPokeball.js
// Descripción: Este script permite que una Pokéball gire al ser presionada y se detenga al soltarla.
function spinPokeBall(){
    const pokeball = document.querySelector(".pokeball");

    let spinning = false;

    // Cuando se mantiene presionada la Pokéball
    function startSpin() {
        spinning = true;
        pokeball.classList.add("spin");
    }

    // Cuando se deja de presionar
    function stopSpin() {
        spinning = false;
        pokeball.classList.remove("spin");
        pokeball.style.transform = "translateX(-50%) rotate(0deg)"; // Vuelve a su posición inicial
    }

    // Eventos para ratón
    pokeball.addEventListener("mousedown", startSpin);
    document.addEventListener("mouseup", stopSpin);

    // Eventos para pantallas táctiles
    pokeball.addEventListener("touchstart", startSpin);
    document.addEventListener("touchend", stopSpin);
}
window.spinPokeBall = spinPokeBall;