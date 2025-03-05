// script.js

document.getElementById('addPokeBallBtn').addEventListener('click', increasePokemonTeam);

function increasePokemonTeam(){// Creamos un nuevo contenedor
    const container = document.createElement('div');
    container.style.display = "inline-block"; // Para que el div tenga el tamaño de las imágenes
    container.style.position = "relative"; // Necesario para que las imágenes se posicionen dentro automáticamente
    
    // Imagen de la Pokébola
    const pokeBallImage = document.createElement('img');
    pokeBallImage.src = 'src/img/PokeBall.png';
    pokeBallImage.alt = 'Pokébola';
    pokeBallImage.style.width = "100%";
    pokeBallImage.style.height = "100%";
    pokeBallImage.style.display = "block"; // Para evitar espacios adicionales
    pokeBallImage.onload = () => {
        container.style.width = pokeBallImage.width + "px"; // Ajustar el div al tamaño de la imagen
        container.style.height = pokeBallImage.height + "px";
    };
    
    // Imagen del Pokémon
    const pokemonSprite = document.createElement('img');
    pokemonSprite.src = ACT_POKEMON_SPRITE.src;
    pokemonSprite.alt = ACT_POKEMON_SPRITE.name;
    pokemonSprite.style.position = "absolute"; // Superponer sobre la Pokébola
    pokemonSprite.style.top = "0";
    pokemonSprite.style.left = "0";
    pokemonSprite.style.width = "100%";
    pokemonSprite.style.height = "100%";
    pokemonSprite.style.objectFit = "contain"; // Asegura que el Pokémon no se deforme
    
    // Agregar imágenes al contenedor
    container.appendChild(pokeBallImage);
    container.appendChild(pokemonSprite);
    
    // Agregar evento al Pokémon
    pokemonSprite.addEventListener('click', () => getPokeAPI(pokemonSprite.alt));
    
    // Añadir el contenedor al DOM
    document.getElementById('pokeBallContainer').appendChild(container);
    }
