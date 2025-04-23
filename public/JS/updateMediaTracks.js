

async function updateMediaTracksDyn(id) {  
    const META_TRACK=id+"Meta.vtt"
    const SUBT_TRACKS=[id+"DescriptionCAT.vtt",id+"DescriptionEN.vtt",id+"DescriptionESP.vtt"]

    document.getElementById("META").src="src/tracks/meta/"+META_TRACK
    document.getElementById("ESP").src="src/tracks/descriptions/"+SUBT_TRACKS[2]
    document.getElementById("EN").src="src/tracks/descriptions/"+SUBT_TRACKS[1]
    document.getElementById("CAT").src="src/tracks/descriptions/"+SUBT_TRACKS[0]

    video.load()
}


function MetadataFunction(activeCue){
 // Obtener el cue activo
            
    if (activeCue) {
        console.log(`Capítulo en curso: ${activeCue.text}`);
        resetPlayer()
        const appear=Math.floor(Math.random()*5)
        if(appear<2)
            return
        // Aplicar efectos al video
        video.pause();
        video.style.filter = "blur(10px)";
        const continueButton=document.getElementById("continueVideo")
        const captureButton=document.getElementById("capturePokemonButton")
        if (continueButton) continueButton.hidden = false;
        if (captureButton) captureButton.hidden = false;
        
        // Llamar a la API con el número del capítulo
        getPokemonHabitat(activeCue.text.substring(4))
        gifOverlay.style.display="block"

        socket.emit('pokemon_appear')

        // Mostrar UI adicional
        //pokeTrainer.style.display = "block";
        //radioGroup.style.display = "flex";
    }
}

