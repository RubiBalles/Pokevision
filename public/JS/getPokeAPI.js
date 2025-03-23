const GENERIC_URL="https://projectpokemon.org/images/normal-sprite/"
const GEN_8_URL="https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/"
const GEN_9_STATIC_URL="https://projectpokemon.org/images/sprites-models/sv-sprites-regular/"

var ACT_POKEMON_SPRITE;

async function getPokeAPI(nameOrId,chapterPokemon=false){
    const infoDiv = document.getElementById("pokemonDescription");
    const gifOverlay = document.getElementById("gifOverlay");
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();
        var pokemonName;
        switch(data.id){
            case 122:
                pokemonName=data.name.replace("-",".")
                break
            case 32:
            case 29:
                pokemonName=data.name.replace("-","_")
                break
            default:
                pokemonName=data.name
                break
        }
        let IMG
        if(data.id<810){
            IMG=GENERIC_URL+pokemonName+".gif"
        }else if(data.id>=810 && data.id <900){
            IMG=GEN_8_URL+pokemonName+".gif"
        }else{
            IMG =GEN_9_STATIC_URL+"0"+data.id+".png"
        }
        if(chapterPokemon){    
            gifOverlay.src = IMG;
            gifOverlay.style.display = "block";
            ACT_POKEMON_SPRITE={name:data.name,src:data.sprites.front_default}
        }

        infoDiv.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img id="pokemonSprite" src=${data.sprites.front_default} alt="${data.name}">
            <p><strong>Nº de Pokedex:</strong> ${data.id}</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            <div style="align-items: center;">
                <p><strong>Tipo:<img id="type1" class="pokeType"><img id="type2" class="pokeType"></p>
            </div>
            
        `;
        getPokemonType(data.types)

    } catch (error) {
        infoDiv.innerHTML = `<p>Error: Pokémon no encontrado.</p>`;
    }
    addPokeSound("PokemonAppear");
}

async function getPokemonType(typesArray){

    var i = 1, urls = [];

    try {
        // Esperar a que todas las promesas se resuelvan
        const responses = await Promise.all(typesArray.map(async (element) => {
            const response = await fetch(element.type.url);
            if (!response.ok) throw new Error("Tipo Pokémon no encontrado!");
            const data = await response.json();
            return data.sprites["generation-viii"]["sword-shield"].name_icon;
        }));

        // Guardar las URLs una vez que todas las promesas se completaron
        urls = responses;
    } catch (error) {
        console.log(error);
    }

    // Ahora podemos recorrer urls porque ya están todas las imágenes cargadas
    urls.forEach(element => {
        document.getElementById("type" + i).src = element;
        i++;
    });
}


