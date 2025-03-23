function addPokeSound(file){
    document.getElementById("pokeAudioM4A").src="src/audio/"+file+".m4a"
    document.getElementById("pokeAudioMP3").src="src/audio/"+file+".mp3"
    document.getElementById("pokeAudio").load()
    document.getElementById("pokeAudio").play()
}