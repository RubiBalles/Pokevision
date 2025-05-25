const socket = io();

socket.emit('register_screen');

socket.on('pin_assigned', (pin) => document.getElementById('pinLabel').innerText+=pin);
socket.on('play', () => video.play());
socket.on('pause', () => video.pause());
socket.on('continue', () => resetPlayer());
socket.on('hide_controls', () => hideScreenControlers())
socket.on('selectQuality', (value) => videoController.setBitrate(Number(value)))
socket.on('selectVideo',async (player,route) => updatePlayerRemote(player,route))
socket.on('selectPlayer',async (player,route) => {
  const currTime=video.currentTime
  updatePlayerRemote(player,route)
  video.currentTime=currTime}
)
socket.on('subtitles',(value)=>setSubtitleTrack(Number(value)))
socket.on('fullscreen',toggleFullscreen)
socket.on('volumeChange',(value)=>{
  video.volume=value
  document.getElementById("pokeAudio").volume=value
})
socket.on('changeMusic',(value)=>{
  console.log("recibido el mensaje 'changeMusic'")
  if(dashPlayer)
    dashPlayer.setCurrentTrack(player.getTracksFor("audio")[value])
  else
    hlsPlayer.audioTrack = value;
})
 socket.on('throw_pokeball',()=>pokeballAnimation())

socket.on('translated_text', (translated) => document.getElementById('translated-text').innerText = translated);

socket.on('error', ({ message }) => console.error(message));

socket.on("chatMessage", ({ username, message }) => {
    appendMessage(`${username}: ${message}`);
});

socket.on("userJoined", (name) => {
    appendMessage(`🟢 ${name} se ha unido al chat`, true);
});
