function addPokeSound(file){
    document.getElementById("pokeAudioM4A").src="src/audio/"+file+".m4a"
    document.getElementById("pokeAudioMP3").src="src/audio/"+file+".mp3"
    //document.getElementById("pokeAudio").load()
    //document.getElementById("pokeAudio").play()
}

async function changeMusicEvent(music=null) {
    const MUSIC_SELECT = document.getElementById('musicSelector');
    const BASE_PATH="src/audio/Gen"
    const DEF_NAME=BASE_PATH+ MUSIC_SELECT.value
    const fullName= music ? BASE_PATH + MUSIC_SELECT.value : DEF_NAME
    
    document.getElementById("MP3").src = fullName+".mp3";
    document.getElementById("M4A").src = fullName+".m4a";
    audio.load()
    video.pause()
    video.play()
}