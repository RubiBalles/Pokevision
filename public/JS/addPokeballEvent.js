// script.js
var LAST_INSERT;
async function increasePokemonTeam(){// Creamos un nuevo contenedor
    if(LAST_INSERT==ACT_POKEMON_SPRITE)
        return;
    const container = document.createElement('div');
    container.style.display = "inline"; // Para que el div tenga el tamaño de las imágenes
    container.style.position = "relative"; // Necesario para que las imágenes se posicionen dentro automáticamente
    
    // Imagen de la Pokébola
    const pokeBallImage = document.createElement('img');
    container.appendChild(pokeBallImage);
    pokeBallImage.src = 'src/img/PokeBall.png';
    pokeBallImage.alt = 'Pokebola';
    pokeBallImage.style.width = "80%";
    pokeBallImage.style.height = "80%";
    pokeBallImage.style.display = "block"; // Para evitar espacios adicionales

    
    // Imagen del Pokémon
    const pokemonSprite = document.createElement('img');
    container.appendChild(pokemonSprite);
    pokemonSprite.src = ACT_POKEMON_SPRITE.src;
    pokemonSprite.alt = ACT_POKEMON_SPRITE.name;
    pokemonSprite.style.position = "absolute"; // Superponer sobre la Pokébola
    pokemonSprite.style.top = "0";
    pokemonSprite.style.left = "0";
    pokemonSprite.style.width = "80%";
    pokemonSprite.style.height = "80%";
    pokemonSprite.style.objectFit = "contain"; // Asegura que el Pokémon no se deforme
    
    // Agregar imágenes al contenedor


    
    // Agregar evento al Pokémon
    pokemonSprite.addEventListener('click', () => getPokeAPI(pokemonSprite.alt));
    
    // Añadir el contenedor al DOM
    document.getElementById('pokeBallContainer').appendChild(container);

    LAST_INSERT=ACT_POKEMON_SPRITE;
    }
