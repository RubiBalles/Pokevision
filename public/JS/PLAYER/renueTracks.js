const tracks = [
  { label: "Español",kind:"subtitles", lang: "es", src: "src/tracks/descriptions/tokioDescriptionESP.vtt", default: true },
  { label: "English",kind:"subtitles", lang: "en", src: "src/tracks/descriptions/tokioDescriptionEN.vtt" },
  { label: "Català",kind:"subtitles", lang: "ca", src: "src/tracks/descriptions/tokioDescriptionCAT.vtt" },
  { label: "Meta",kind: "metadata", lang: "en", src: "src/tracks/meta/tokioMeta.vtt" }
];

// Después de inicializar dashPlayer o hlsPlayer


function attachVTTTracks(videoElement) {
  // Limpia tracks previos
  const oldTracks = videoElement.querySelectorAll('track');
  oldTracks.forEach(t => t.remove());

  // Agrega tracks nuevos
  tracks.forEach(info => {
    const track = document.createElement('track');
    track.kind = info.kind;
    track.label = info.label;
    track.srclang = info.lang;
    track.src = info.src;
    track.default = info.default || false;
    videoElement.appendChild(track);
  });
}