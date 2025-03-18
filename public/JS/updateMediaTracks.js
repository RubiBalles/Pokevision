 

async function updateMediaTracks(id, language) {
    // Obtener el video y sus tracks

    const tracks = video.textTracks;
// Iterar sobre los tracks
for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].kind === "metadata") {
        if(tracks[i].label.includes(id)){
            tracks[i].mode = "hidden"; // Asegurar que el track de metadatos está activo
            tracks[i].addEventListener("cuechange",()=> MetadataFunction(i,tracks));
        }
        else{
            tracks[i].mode="disabled"
            tracks[i].removeEventListener("cuechange",()=>MetadataFunction(i,tracks));
        }
        
    }else if (tracks[i].kind=="descriptions"){
        if(tracks[i].label.includes(id)){
            tracks[i].mode="showing";
        }
    }
}
}

function MetadataFunction(i,tracks){
    const activeCue = tracks[i].activeCues[0]; // Obtener el cue activo
            
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
