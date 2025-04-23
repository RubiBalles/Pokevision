function resetPlayer(){

    gifOverlay.style.display = "none"; // Ocultar GIF
    gifOverlay.classList.remove("intoPokeball")
    pokeball.classList.remove("shake")
    video.style.filter = "none";
    pokeball.style.display="none"

    video.play()
    document.getElementById("pokeAudio").pause();
    
}
/*function resetPlayer(){
    const BUTTON=document.getElementById("continueVideo");   
    if(BUTTON && !BUTTON.hidden){
        gifOverlay.style.display = "none"; // Ocultar GIF
        gifOverlay.classList.remove("intoPokeball");
        pokeball.classList.remove("shake");
        video.style.filter = "none"; // Quitar desenfoque
        //pokeTrainer.style.display="none"
        pokeball.style.display="none"
        radioGroup.style.display="none"
        video.play()
        document.getElementById("pokeAudio").pause();
        BUTTON.hidden=true
    }
}
*/

