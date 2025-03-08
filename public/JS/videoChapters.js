  // Obtener el elemento de video
  const video = document.getElementById("myVideo");
  const gifOverlay = document.getElementById("gifOverlay");
  const pokeTrainer=document.getElementById("pokeTrainer");

  // Esperar a que el video cargue y los tracks estén disponibles
  video.addEventListener("loadedmetadata", function() {
      // Acceder al track de capítulos
      const track = video.textTracks[0]; // El primer track (asumimos que es el de capítulos)

      // Verificar si el track está disponible
      if (track) {
          // Escuchar los cambios en los capítulos
          track.oncuechange = function() {
              const activeCue = track.activeCues[0]; // Obtener el primer cue activo (capítulo actual)
              
              if (activeCue) {
                  // Mostrar la descripción del capítulo actual
                  console.log(`Capítulo en curso: ${activeCue.text}`);
                  video.pause()
                  video.style.filter = "blur(10px)";
                  document.getElementById("continueVideo").hidden=false;
                  document.getElementById("capturePokemonButton").hidden=false;
                  
                  getPokeAPI(Number(activeCue.text),true); // Llamada a la API con el número del capítulo
                 pokeTrainer.style.display="block"

              }
          };
      } else {
          console.error("No se encontró el track de capítulos.");
      }
  });