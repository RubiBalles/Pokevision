let playerType = null; // 'dash' o 'hls'
let videoElement = document.querySelector('video');

// Interface común
const videoController = {

    togglePlayPause: () => videoElement.paused ? videoElement.play() : videoElement.pause(),
    seek: (time) => videoElement.currentTime = time,
    setVolume: (value) => {
        videoElement.volume = value
        document.getElementById("pokeAudio").volume=value
    },

    toggleMute: () => {
        videoElement.muted = !videoElement.muted
        document.getElementById("pokeAudio").muted=videoElement.muted
    },
    isMuted: () => videoElement.muted,
    getCurrentTime: () => videoElement.currentTime,
    getDuration: () => videoElement.duration,
    getBuffered: () => videoElement.buffered,
    setBitrate: (index) => {
        if (playerType === 'dash') {
            setDashBitrateByIndex(index);
        } else if (playerType === 'hls') {
            hlsPlayer.currentLevel = index;
        }
    },
    getBitrates: () => {
        if (playerType === 'dash') {
            return getDashBitrates();
        } else if (playerType === 'hls') {
            return hlsPlayer.levels;
        }
    }
};

document.getElementById("playPauseBtn").addEventListener("click", () => {
    videoController.togglePlayPause();
    updatePlayPauseIcon()
});

document.getElementById("muteBtn").addEventListener("click", () => {
    videoController.toggleMute();
    document.getElementById("iconMute").className = videoController.isMuted() ? 'icon-mute-on' : 'icon-mute-off';
});

document.getElementById("volumebar").addEventListener("input", (e) => {
    videoController.setVolume(e.target.value);
});

document.getElementById("seekbar").addEventListener("click", (e) => {
    const percent = e.offsetX / e.target.offsetWidth;
    const newTime = percent * videoController.getDuration();
    videoController.seek(newTime);
});
document.getElementById("bitrateListBtn").addEventListener("click", () => {
    const bitrates = videoController.getBitrates();

    if (!bitrates || bitrates.length === 0) {
        alert("No hay opciones de bitrate disponibles.");
        return;
    }
    
});

videoElement.addEventListener("timeupdate", () => {
  document.getElementById("videoTime").textContent = formatTime(video.currentTime);
});

document.getElementById("fullscreenBtn").addEventListener("click", toggleFullscreen);


// Actualizar tiempo y duración
videoElement.addEventListener('loadedmetadata', () => {
    const current = videoController.getCurrentTime();
    const duration = videoController.getDuration();
    document.getElementById("videoTime").textContent = formatTime(current);
    document.getElementById("videoDuration").textContent = formatTime(duration);
    setupMetadataListener(videoElement)
    if(dashPlayer){
        const audioTracks=dashPlayer.getTracksFor("audio")
        console.log(audioTracks.length>1)
          if (audioTracks[0].bitrateList.length>1) {
            dashPlayer.setCurrentTrack(audioTracks[1]);
  }
    }
});

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updatePlayPauseIcon() {
    const icon = document.getElementById("iconPlayPause");
    if (videoElement.paused) {
        icon.classList.remove("icon-pause");
        icon.classList.add("icon-play");
    } else {
        icon.classList.remove("icon-play");
        icon.classList.add("icon-pause");
    }
}


function toggleFullscreen() {
const videoContainer = document.getElementById("videoContainer"); // o el contenedor principal del video

    if (!document.fullscreenElement) {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { // Safari
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { // IE11
            videoContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}



document.addEventListener("fullscreenchange", () => {
    const videoControllerElement = document.getElementById("videoController");
    const isFullscreen = !!document.fullscreenElement;
    if (isFullscreen) {
        videoControllerElement.className="video-controller-fullscreen";
    } else {
        videoControllerElement.className="video-controller";
    }
});


