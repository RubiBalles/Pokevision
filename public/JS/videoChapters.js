// Obtener el elemento de video
const video = document.getElementById("myVideo");
const gifOverlay = document.getElementById("gifOverlay");
const pokeTrainer=document.getElementById("pokeTrainer");
const radioGroup=document.getElementsByClassName("radio-group")[0];

// Esperar a que el video cargue y los tracks estén disponibles
video.addEventListener("loadedmetadata", ()=>{updateMediaTracks("tokio",1)});



