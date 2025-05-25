function getDashBitrates() {
    const videoTracks = dashPlayer.getTracksFor('video')[0].bitrateList;
    return videoTracks.map(track => ({
        id: track.id,
        height: track.height,
        width: track.width,
        bandwidth: track.bandwidth
    }));
}

function setDashBitrateByIndex(index) {
    dashPlayer.updateSettings({ streaming: { abr: { autoSwitchBitrate: { video: false } } } });

    // Obtener todos los tracks y elegir el ID del seleccionado
    const tracks = dashPlayer.getTracksFor('video')[0].bitrateList;
    const selected = tracks[index];
    if (selected) {
        dashPlayer.setRepresentationForTypeById('video', selected.id);
    }
}

const bitrateBtn = document.getElementById("bitrateListBtn");
const bitrateMenu = document.getElementById("bitrateMenu");

bitrateBtn.addEventListener("click", () => {
    const bitrates = videoController.getBitrates();
    if (!bitrates || bitrates.length === 0) {
        alert("No hay bitrates disponibles");
        return;
    }

    // Limpiar el menú
    bitrateMenu.innerHTML = '';

    bitrates.forEach((b, index) => {
        const option = document.createElement("div");
        option.className = "bitrate-option";
        option.textContent = b.height ? `${b.width}p` : `${index}`;
        option.addEventListener("click", () => {
            videoController.setBitrate(index);
            bitrateMenu.classList.add("hidden");
        });
        bitrateMenu.appendChild(option);
    });

    // Mostrar el menú
    bitrateMenu.classList.toggle("hidden");
});

// Ocultar al hacer clic fuera
document.addEventListener("click", (e) => {
    if (!bitrateMenu.contains(e.target) && !bitrateBtn.contains(e.target)) {
        bitrateMenu.classList.add("hidden");
    }
});

function setSeekInf(){
    const seekbarPlay = document.getElementById("seekbar-play");
const seekbarBuffer = document.getElementById("seekbar-buffer");
const videoElement = player.getVideoElement ? player.getVideoElement() : document.querySelector("video");

function updateSeekBar() {
    if (!videoElement || !videoElement.duration || isNaN(videoElement.duration)) return;

    const duration = videoElement.duration;
    const currentTime = videoElement.currentTime;
    const percentPlayed = (currentTime / duration) * 100;

    seekbarPlay.style.width = `${percentPlayed}%`;

    if (dashPlayer && playerType === 'dash') {
        const buffer = dashPlayer.getBufferLength('video');
        const percentBuffered = Math.min((currentTime + buffer) / duration * 100, 100);
        seekbarBuffer.style.width = `${percentBuffered}%`;
    } else if (playerType === 'hls') {
        const buffered = videoElement.buffered;
        if (buffered.length > 0) {
            const bufferEnd = buffered.end(buffered.length - 1);
            const percentBuffered = (bufferEnd / duration) * 100;
            seekbarBuffer.style.width = `${percentBuffered}%`;
        }
    }
}

setInterval(updateSeekBar, 500);
}

