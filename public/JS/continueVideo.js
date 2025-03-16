const BUTTON=document.getElementById("continueVideo");
const VIDEO=document.getElementById("myVideo");
BUTTON.addEventListener("click",()=>{
    if(!BUTTON.hidden){
        gifOverlay.style.display = "none"; // Ocultar GIF
        gifOverlay.classList.remove("intoPokeball")
        pokeball.classList.remove("shake")
        video.style.filter = "none"; // Quitar desenfoque
        pokeTrainer.style.display="none"
        pokeball.style.display="none"
        radioGroup.style.display="none"
        VIDEO.play()
        BUTTON.hidden=true
    }
}) 