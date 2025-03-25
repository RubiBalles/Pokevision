
// Al cargar la página
window.onload = function() {
    const captureButton = document.getElementById('capturePokemonButton');
    const continueButton = document.getElementById('continueVideo');
    const video = document.getElementById('myVideo');
    
    // Función para mostrar el botón cuando aparece un Pokémon
    function showCaptureButton() {
        captureButton.hidden = false; // Mostrar el botón
    }

    // Evento para cuando el video se reanuda
    continueButton.addEventListener('click', function() {
        captureButton.hidden = true; // Ocultar el botón al reanudar el video
    });
};

document.getElementById('capturePokemonButton').addEventListener('click', function() {
    document.getElementById('capturePokemonButton').hidden=true
    var pokeball = document.getElementById('pokeball');
    var compStyle=getComputedStyle(document.querySelector(":root"))

    // Mostrar la Pokéball y activar la animación
    pokeball.style.display = "block";
    pokeball.classList.remove("launch"); // Reiniciar animación si ya se lanzó antes
    void pokeball.offsetWidth; // Forzar reflow
    pokeball.classList.add("launch");
    gifOverlay.classList.add("intoPokeball");
    
        // Cuando termine la animación de lanzamiento, iniciar la animación de giro
        pokeball.addEventListener("animationend", function onLaunchEnd(event) {
            if (event.animationName === "launch") {

                pokeball.classList.remove("launch");
                pokeball.classList.add("shake");

            }
            else if(event.animationName=="shake"){
                increasePokemonTeam();
                addPokeSound("captured")
                pokeball.removeEventListener("animationend", onLaunchEnd);
            }
        });
});
function checkPokemonAppearance() {
    const gifOverlay = document.getElementById('gifOverlay');
    const captureButton = document.getElementById('capturePokemonButton');

    if (gifOverlay.src && gifOverlay.style.display !== 'none') {
        captureButton.hidden = false; // Muestra el botón
    } else {
        captureButton.hidden = true; // Oculta el botón
    }
}
function showPokemon(pokemonImage) {
    const gifOverlay = document.getElementById('gifOverlay');
    gifOverlay.src = pokemonImage; 
    gifOverlay.style.display = 'block'; // Muestra el Pokémon

    // Verificar si el Pokémon ha aparecido
    checkPokemonAppearance();
}
pokeball.addEventListener("animationend", function onLaunchEnd(event) {
    if (event.animationName === "launch") {
        pokeball.classList.remove("launch");
        pokeball.classList.add("shake");
    } else if (event.animationName === "shake") {
        increasePokemonTeam();
        pokeball.removeEventListener("animationend", onLaunchEnd);
        
        // Ocultar el botón después de capturar
        document.getElementById('capturePokemonButton').hidden = true;
    }
});
