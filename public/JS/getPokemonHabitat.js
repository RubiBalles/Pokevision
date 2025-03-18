var LAST_HABITAT;
var LAST_INDEX;
async function getPokemonHabitat(habitat){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();

        const pokeList=Array.from(data.pokemon_species);

        const len=pokeList.length

        var index=Math.floor(Math.random() * len)

        console.log(index)

        if(habitat==LAST_HABITAT)
            while(index==LAST_INDEX){
                index=Math.floor(Math.random() * len)
        }
        LAST_HABITAT=habitat
        LAST_INDEX=index
        return getPokeAPI(pokeList[index].name,true)
}


