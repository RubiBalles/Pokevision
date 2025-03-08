window.onload=function(){}

document.getElementById('capturePokemonButton').addEventListener('click', function() {
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
                pokeball.removeEventListener("animationend", onLaunchEnd);
            }
        });
});
