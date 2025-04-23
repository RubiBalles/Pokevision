function changeSubtitles(selectedLang){
    const tracks = document.getElementById('myVideo').textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = (tracks[i].language === selectedLang) ? 'showing' : 'disabled';
    }
}