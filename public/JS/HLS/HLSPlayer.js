const M3U8_DICC={
  "tokio":"https://gdie2501.ltim.uib.es/src/videos/tokio/tokio_manifest.m3u8",
  "suiza":"https://gdie2501.ltim.uib.es/src/adaptative/mainfests.m3u8",
  "test":"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
}

let hlsPlayer

function loadHLS(video,src,curTime=null,ipfs=false) {
    if (dashPlayer) {
      dashPlayer.reset();
      dashPlayer = null;
    }
    removeHLS()
    if (Hls.isSupported()) {
      playerType="hls"
      hlsPlayer = new Hls();
      const source= ipfs ? src : M3U8_DICC[src] 
      hlsPlayer.loadSource(source);
      hlsPlayer.attachMedia(video);
      hlsPlayer.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => {
        video.currentTime=curTime
        loadHlsAudioTracks(hlsPlayer);
});

      attachVTTTracks(video);
      activeMetadata()

    } else {
      alert('HLS no soportado en este navegador');
    }
}

function removeHLS(){
    if (hlsPlayer) {
      hlsPlayer.destroy();
      hlsPlayer = null;
    }
}