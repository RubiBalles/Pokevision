const MPD_DICC={
    "tokio":"https://gdie2501.ltim.uib.es/src/videos/tokio/tokio_manifest.mpd",
    "suiza":"https://gdie2501.ltim.uib.es/src/videos/suiza/manifest.mpd",
    "test":"https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
}

let dashPlayer;
const ctrlBarElement=document.querySelector("#videoController")
/**
 * If exists, delete the actual DASH plyer
 */
function removeDASH(){
    if (dashPlayer) {
      dashPlayer.reset();
      dashPlayer = null;
    }
}

/**
 * Generate a new Dash player
 * @param {HTMLVideoElement} video 
 * @param {string} src 
 */
function createDASH(video,src,curTime=null) {
    if (dashPlayer){
        loadDASH(video,src)
        return
    }
        
    removeHLS()
    removeDASH()
    playerType="dash"
    dashPlayer = dashjs.MediaPlayer().create();
    dashPlayer.initialize(video, MPD_DICC[src], true);
    video.volume=0.5
    dashPlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        loadDashAudioTracks(dashPlayer);
        video.currentTime=curTime
        video.pause()
});



    attachVTTTracks(video);
    activeMetadata()
    
    //var controlbar = new ControlBar(dashPlayer);
    //controlbar.initialize();
}

/**
 * Allows to change source video playing in Dash player
 * @param {HTMLVideoElement} video 
 * @param {string} src 
 */
function loadDASH(video,src){
    dashPlayer.reset()
    dashPlayer.initialize(video, MPD_DICC[src], true);
}