const audio=document.getElementById("myAudio")
video.onplay = () => audio.play()
video.onpause = () => audio.pause()
video.onseeked = () => (audio.currentTime = video.currentTime);