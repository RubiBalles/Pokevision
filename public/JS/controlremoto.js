// Elemento ficticio que representa el gif del Pokémon apareciendo
const gifOverlay = document.createElement('img');
gifOverlay.style.display = 'none'; // Oculto por defecto
gifOverlay.src = "src/img/PokemonAparece.gif"; // Asegúrate de tener esta imagen

// Lo insertamos al body para que checkPokemonAppearance() lo vea
document.body.appendChild(gifOverlay);

// Simula la aparición del Pokémon
function simularAparicionPokemon() {
    gifOverlay.style.display = 'block';
    checkPokemonAppearance();
}

// Función para mostrar u ocultar la botonera y la pokébola
function checkPokemonAppearance() {
    const botonera = document.getElementById('botonera');
    const captureButton = document.getElementById('capturePokemonButton');
    const pokeball = document.querySelector('.pokeball');
    const body = document.body;

    if (gifOverlay.src && gifOverlay.style.display !== 'none') {
        body.classList.remove('botonera-active');
        botonera.style.display = 'none';
        pokeball.style.display = 'block';
        captureButton.hidden = false;
    } else {
        body.classList.add('botonera-active');
        botonera.style.display = 'flex';
        pokeball.style.display = 'none';
        captureButton.hidden = true;
    }
}
