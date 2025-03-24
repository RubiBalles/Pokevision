const videoPlayer = document.getElementById('myVideo')



document.addEventListener("DOMContentLoaded", () => {
    const MUSIC_SELECT = document.getElementById('musicSelector');

    MUSIC_SELECT.addEventListener('change', () => {
        document.getElementById("MP3").src = "src/audio/Gen" + MUSIC_SELECT.value + ".mp3";
        document.getElementById("M4A").src = "src/audio/Gen" + MUSIC_SELECT.value + ".m4a";
        audio.load()
        video.pause()
        video.play()
    });

    document.getElementById('route').addEventListener('change', ()=>changeVideo(true));

    document.getElementById('qualitySelector').addEventListener('change',() =>changeVideo())


});

async function changeVideo(changeTracks=false){
    const QUALITY_SELECTOR= document.getElementById('qualitySelector');
    const VIDEO=document.getElementById("myVideo");
    const ROUTE=document.getElementById("route");
    
    document.getElementById("MP4").src="src/videos/"+QUALITY_SELECTOR.value+"/"+ROUTE.value+".mp4"
    document.getElementById("WEBM").src="src/videos/"+QUALITY_SELECTOR.value+"/"+ROUTE.value+".webm"
    console.log("Vide cambiado de calidad: "+QUALITY_SELECTOR.value)
    
    console.log("src/videos/"+QUALITY_SELECTOR.value+"/"+ROUTE.value+".webm")
        
    if(changeTracks){
        await updateMediaTracksDyn(ROUTE.value.value)
        console.log("traks updated!")
    }
        

    VIDEO.load()
}


