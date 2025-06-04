const captionBtn = document.getElementById('captionBtn');
const subtitleMenu = document.getElementById('subtitleMenu');

  // Mostrar / ocultar menú al click en botón
  captionBtn.addEventListener('click', () => {
    subtitleMenu.classList.toggle('hidden');
  });

  // Funciones para activar/desactivar subtítulos
  function setSubtitleTrack(index) {
    const subtitleTracks = Array.from(video.textTracks).filter(track => track.kind === "subtitles");
    for (let i = 0; i < subtitleTracks.length; i++) {
      subtitleTracks[i].mode = (i === index) ? 'showing' : 'disabled';
    }
    activeMetadata()
  }

  function disableSubtitles() {
    
  const video = document.querySelector('video'); // Cambia selector si es necesario
    const subtitleTracks = Array.from(video.textTracks).filter(track => track.kind === "subtitles");
    
    for (let i = 0; i < subtitleTracks.length; i++) {
      subtitleTracks[i].mode = 'disabled';
    }
  }

  function activeMetadata(){
    const metaTracks = Array.from(video.textTracks).filter(track => track.kind === "metadata");
    metaTracks.forEach((track)=>{
      track.mode='hidden'
    })
  }

  // Manejar click en cada item del menú
  subtitleMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
      const trackIndex = parseInt(item.getAttribute('data-track'), 10);
      if (trackIndex === -1) {
        disableSubtitles();
      } else {
        setSubtitleTrack(trackIndex);
      }
      subtitleMenu.classList.add('hidden'); // Ocultar menú tras seleccionar
    });
  });

  // Opcional: cerrar menú si clicas fuera
  document.addEventListener('click', (e) => {
    if (!captionBtn.contains(e.target)) {
      subtitleMenu.classList.add('hidden');
    }
  });

  // Inicialmente desactivar subtítulos
  disableSubtitles();
