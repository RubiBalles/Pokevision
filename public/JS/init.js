document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('musicSelector').addEventListener('change', () => changeMusicEvent());

    document.getElementById('route').addEventListener('change', ()=>changeVideo(true));

    document.getElementById('qualitySelector').addEventListener('change',() =>changeVideo())

    //document.getElementById("continueVideo").addEventListener("click",()=>resetPlayer())

    document.addEventListener("DOMContentLoaded", ()=>spinPokeBall());

});