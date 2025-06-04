function hideControlBar(){
    document.getElementById('videoController').style.display="none";
}
function hideScreenControlers(){
    document.getElementById("botonera").style.display="none"
    //document.getElementById("qualitySelector").style.display="none"
    //document.getElementById('myVideo').removeAttribute('controls')
    hideControlBar()
    document.getElementById('chatButtons').style.display="none"
}