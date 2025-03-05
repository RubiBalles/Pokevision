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
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        `;
    } catch (error) {
        infoDiv.innerHTML = `<p>Error: Pokémon no encontrado.</p>`;
    }
}
