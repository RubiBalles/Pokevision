// Obtener el elemento de video
function setVideoChapters(){    
    const video = document.getElementById("myVideo");

    video.textTracks[0].mode="hidden";
    video.textTracks[0].addEventListener("cuechange",async ()=> await MetadataFunction(video.textTracks[0].activeCues[0]));

    var INIT=0;

    // Esperar a que el video cargue y los tracks estén disponibles
    video.addEventListener("loadedmetadata", async ()=>{
        if(INIT==0){  
            await updateMediaTracksDyn(document.getElementById("route").value)
            INIT=1;
        }
        syncVideoAudio()
});
}



