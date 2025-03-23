const videoPlayer = document.getElementById('myVideo')

document.getElementById('route').addEventListener('change', async function(event) {
    audio.pause()
    //Cogemos todas las sources del viedo
    const videoSrc =Array.from(videoPlayer.getElementsByTagName("source"));
    const base_route=`src/videos/${this.value}10min.`
    //Cambiamos las sources que hagan referencias a videos y colocamos los formatos
    //correspondientes
    videoSrc.forEach(element => {
        if (element.type=="video/mp4")
            element.src=base_route+"mp4"
        else if (element.type="video/webm")
            element.src=base_route+"webm"
    });
    await updateMediaTracksDyn(this.value,document.getElementById('route').value)
});

document.addEventListener("DOMContentLoaded", () => {
    const MUSIC_SELECT = document.getElementById('musicSelector');

    MUSIC_SELECT.addEventListener('change', () => {
        document.getElementById("MP3").src = "src/audio/Gen" + MUSIC_SELECT.value + ".mp3";
        document.getElementById("M4A").src = "src/audio/Gen" + MUSIC_SELECT.value + ".m4a";
        audio.load();  // Recargar el reproductor para aplicar cambios
        video.pause()
        video.play()
    });


});


