const trackMenu = document.getElementById("audioTrackMenu");
const trackSwitchBtn = document.getElementById("trackSwitchBtn");

// Mostrar/ocultar menú
trackSwitchBtn.addEventListener("click", () => {
  trackMenu.classList.toggle("show");
});

// DASH.js
function loadDashAudioTracks(player) {
  const audioTracks = player.getTracksFor("audio");
  trackMenu.innerHTML = "";
  audioTracks.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = `${track.lang || "Audio"} (${track.label || track.id})`;
    li.onclick = () => player.setCurrentTrack(track);
    trackMenu.appendChild(li);
  });
}

// HLS.js
function loadHlsAudioTracks(hls) {
  const levels = hls.audioTracks;
  trackMenu.innerHTML = "";
  levels.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${track.lang || "Audio"} (${track.name || index})`;
    li.onclick = () => {
      hls.audioTrack = index;
    };
    trackMenu.appendChild(li);
  });
}