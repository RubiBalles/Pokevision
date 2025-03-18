// Obtener el elemento de video
const video = document.getElementById("myVideo");
const gifOverlay = document.getElementById("gifOverlay");
const pokeTrainer=document.getElementById("pokeTrainer");
const radioGroup=document.getElementsByClassName("radio-group")[0];

var INIT=0;

// Esperar a que el video cargue y los tracks estén disponibles
video.addEventListener("loadedmetadata", async ()=>{
    if(INIT=0){
        await updateMediaTracks("tokio",1)
        INIT=1;
    }
        });



