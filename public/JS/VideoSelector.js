const videoPlayer = document.getElementById('myVideo')

document.getElementById('route').addEventListener('change', async function(event) {

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
    await updateMediaTracks(this.value,document.getElementById('descriptionLanguage').value)
    videoPlayer.load()
});
/*
    document.getElementById('descriptionLanguage').addEventListener('change', async ()=> {
    await updateMediaTracks(document.getElementById('route').value,document.getElementById('descriptionLanguage').value)
    videoPlayer.load()
});
*/
