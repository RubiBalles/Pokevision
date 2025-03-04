// script.js

document.getElementById('addPokeBallBtn').addEventListener('click', function() {
    // Creamos una nueva imagen de Pokébola
    const pokeBallImage = document.createElement('img');
    pokeBallImage.src = '/img/PokeBall.png'; // Ruta de la imagen de la Pokébola
    pokeBallImage.alt = 'Pokébola';

    // Añadimos la imagen al contenedor de Pokébolas
    document.getElementById('pokeBallContainer').appendChild(pokeBallImage);
});
