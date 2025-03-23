

async function updateMediaTracksDyn(id) {  
    const MP4_VIDEO_SCR=id+"10min.mp4"
    const WEBM_VIDEO_SCR=id+"10min.webm"
    const META_TRACK=id+"Meta.vtt"
    const SUBT_TRACKS=[id+"DescriptionCAT.vtt",id+"DescriptionEN.vtt",id+"DescriptionESP.vtt"]

    document.getElementById("META").src="src/tracks/meta/"+META_TRACK
    document.getElementById("ESP").src="src/tracks/descriptions/"+SUBT_TRACKS[2]
    document.getElementById("EN").src="src/tracks/descriptions/"+SUBT_TRACKS[1]
    document.getElementById("CAT").src="src/tracks/descriptions/"+SUBT_TRACKS[0]

    document.getElementById("MP4").src="src/videos/"+MP4_VIDEO_SCR
    document.getElementById("WEBM").src="src/videos/"+WEBM_VIDEO_SCR

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
        document.getElementById("continueVideo").hidden = false;
        document.getElementById("capturePokemonButton").hidden = false;
        
        // Llamar a la API con el número del capítulo
        getPokemonHabitat(activeCue.text.substring(4))
        gifOverlay.style.display="block"

        // Mostrar UI adicional
        pokeTrainer.style.display = "block";
        radioGroup.style.display = "flex";
    }
}

