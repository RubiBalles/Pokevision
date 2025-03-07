function setImgPossition(){
        // Función para obtener las coordenadas de cualquier elemento
    function getPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
    const pokeTrainerPosition = getPosition(document.getElementById("pokeTrainer"));
    const pokemonPosition = getPosition(document.getElementById("gifOverlay"));
    
    const rect = video.getBoundingClientRect();
    const root=document.querySelector(":root");
    root.style.setProperty('--pokeTrainerLeft',`${pokeTrainerPosition.left}px`); // Centrar horizontalmente
    root.style.setProperty('--pokeTrainerTop',`${pokeTrainerPosition.top}px`); // Centrar horizontalmente
    root.style.setProperty('--pokeGifLeft',`${pokemonPosition.left}px`); // Centrar horizontalmente
    root.style.setProperty('--pokeGifTop',`${pokemonPosition.top}px`); // Centrar horizontalmente

    return getComputedStyle(root);

}

const resizeObserver = new ResizeObserver((entries) =>{
    for(let entry of entries){
        setImgPossition()
    }
});

resizeObserver.observe(document.getElementById("myVideo"))