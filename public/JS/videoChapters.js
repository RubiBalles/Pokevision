// Obtener el elemento de video
const video = document.getElementById("myVideo");

video.textTracks[0].mode="hidden";
video.textTracks[0].addEventListener("cuechange",()=> MetadataFunction(video.textTracks[0].activeCues[0]));
const gifOverlay = document.getElementById("gifOverlay");
const pokeTrainer=document.getElementById("pokeTrainer");
const radioGroup=document.getElementsByClassName("radio-group")[0];

var INIT=0;

// Esperar a que el video cargue y los tracks estén disponibles
video.addEventListener("loadedmetadata", async ()=>{
    if(INIT==0){
        await updateMediaTracksDyn(document.getElementById("route").value)
        INIT=1;
    }
        });



