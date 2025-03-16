// Obtener el elemento de video
const video = document.getElementById("myVideo");
const gifOverlay = document.getElementById("gifOverlay");
const pokeTrainer=document.getElementById("pokeTrainer");
const radioGroup=document.getElementsByClassName("radio-group")[0];

// Esperar a que el video cargue y los tracks estén disponibles
video.addEventListener("loadedmetadata", metadataTrackEventManagement);
function metadataTrackEventManagement(){
    // Acceder al track de capítulos
    const tracks = video.textTracks; // El primer track (asumimos que es el de capítulos)

}

function trackEventManagement(){
        const activeCue = tracks.activeCues[0]; // Obtener el primer cue activo (capítulo actual)
        
        if (activeCue) {
            // Mostrar la descripción del capítulo actual
            console.log(`Capítulo en curso: ${activeCue.text}`);
            video.pause()
            video.style.filter = "blur(10px)";
            document.getElementById("continueVideo").hidden=false;
            document.getElementById("capturePokemonButton").hidden=false;
            
            getPokeAPI(Number(activeCue.text),true); // Llamada a la API con el número del capítulo
            pokeTrainer.style.display="block"
            radioGroup.style.display="flex"

        }
    }

