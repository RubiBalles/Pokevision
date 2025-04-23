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