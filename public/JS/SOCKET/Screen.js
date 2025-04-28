const socket = io();

socket.emit('register_screen');

socket.on('pin_assigned', (pin) => document.getElementById('pinLabel').innerText+=pin);
socket.on('play', () => video.play());
socket.on('pause', () => video.pause());
socket.on('continue', () => resetPlayer());
socket.on('hide_controls',()=>hideScreenControlers())
socket.on('selectVideo',async (change,videoName,fullName) =>{
    try {
        await changeVideo(change,videoName,fullName);
    } catch (err) {
    console.error('Error al cambiar video:', err);
    }
 })
 socket.on('subtitles',(value)=>changeSubtitles(value))
 socket.on('throw_pokeball',()=>pokeballAnimation())

 socket.on('audio-ready', (audioBuffer) => {
    const audio=document.getElementById("pokemonDescriptionAudio")
    const uint8Array = new Uint8Array(audioBuffer);
    const blob = new Blob([uint8Array], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);

    audio.src = url;
    audio.style.display = 'block';
    audio.play();
  });

socket.on('translated_text', (translated) => {
  document.getElementById('translated-text').innerText += translated; // Mostramos la traducción
});

  socket.on('error', ({ message }) => {
    console.error(message)
  });