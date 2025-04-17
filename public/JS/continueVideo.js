const BUTTON=document.getElementById("continueVideo");
BUTTON.addEventListener("click",resetPlayer)

function resetPlayer(){
    if(!BUTTON.hidden){
        gifOverlay.style.display = "none"; // Ocultar GIF
        gifOverlay.classList.remove("intoPokeball");
        pokeball.classList.remove("shake");
        video.style.filter = "none"; // Quitar desenfoque
        pokeball.style.display="none";
        pokeTrainer.style.display="none";
        radioGroup.style.display="none";
        video.play()
        document.getElementById("pokeAudio").pause();
        BUTTON.hidden=true
    }

}