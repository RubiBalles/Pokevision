async function getPokemonHabitat(habitat){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();

        const pokeList=data.pokemon_species;

        const len=pokeList.length()

        return getPokemonApi(pokeList[Math.floor(Math.random() * len)].name)
}


