    // Seleccionar todos los radios con name="gender"
    document.querySelectorAll('input[name="trainer"]').forEach((radio) => {
        radio.addEventListener("change", (event) => {
            document.getElementById("pokeTrainer").src="src/img/PokeTrainer_".concat(event.target.value,".png")
        });
    });