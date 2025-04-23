document.addEventListener("DOMContentLoaded", function() {
    const pokeball = document.querySelector(".pokeball");
    let isDragging = false; // Variable para saber si se está arrastrando
    let startX, startY; // Posiciones de inicio del movimiento
    let currentX, currentY; // Posiciones actuales durante el movimiento
    let moveDirection = { x: 0, y: 0 }; // Dirección del movimiento al soltar
    let moveSpeed = 0; // Velocidad del movimiento al soltar
    let animationFrameId; // ID del frame de animación

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    // Función para comenzar el arrastre
    function startDrag(e) {
        e.preventDefault(); // Evitar selección de texto
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX; // X al inicio
        startY = e.clientY || e.touches[0].clientY; // Y al inicio
    }

    // Función para mover la Pokéball mientras se arrastra
    function dragMove(e) {
        if (!isDragging) return;

        currentX = e.clientX || e.touches[0].clientX; // X actual
        currentY = e.clientY || e.touches[0].clientY; // Y actual

        const diffX = currentX - startX;
        const diffY = currentY - startY;

        // Actualizamos la posición de la Pokéball
        pokeball.style.transform = `translate(-50%, ${20 + diffY}px)`; // Mantener la misma distancia respecto al fondo
        pokeball.style.left = `calc(50% + ${diffX}px)`; // Ajuste de la posición en X
    }

    // Función para finalizar el arrastre y empezar el movimiento automático
    function stopDrag(e) {
        if (!isDragging) return;

        isDragging = false;

        // Detectamos la dirección y velocidad del movimiento al soltar
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        moveDirection = { x: diffX, y: diffY };
        moveSpeed = Math.sqrt(diffX * diffX + diffY * diffY); // Calculamos la velocidad del movimiento

        // Iniciar la animación automática hacia la dirección
        movePokeball();
    }

    // Función para mover la Pokéball automáticamente
    function movePokeball() {
        // Establecer la velocidad de movimiento (mayor que antes)
        const velocity = 8; // Aumentada la velocidad para un movimiento más rápido

        // Mover la Pokéball en la dirección de movimiento
        function animate() {
            // Verificamos las colisiones con los bordes
            const minDistance = SCREEN_WIDTH / 4; // 1/4 de la pantalla

            if (pokeball.offsetTop <= 0 && Math.abs(moveDirection.y) > minDistance) {
                // Si toca el borde superior y ha pasado 1/4 de la distancia, desaparece temporalmente
                pokeball.classList.add("oculto");
                socket.emit("throw_pokeball")
                setTimeout(() => {
                    pokeball.classList.remove("oculto");
                    resetPokeball(); // Vuelve a la posición inicial
                }, 1000); // Desaparece por 1 segundo
                cancelAnimationFrame(animationFrameId); // Detener la animación
                
                return;
            }

            if (pokeball.offsetLeft <= 0 || pokeball.offsetLeft >= SCREEN_WIDTH - pokeball.offsetWidth || pokeball.offsetTop >= SCREEN_HEIGHT - pokeball.offsetHeight) {
                // Si toca el borde izquierdo, derecho o inferior, vuelve a la posición inicial
                resetPokeball();
                cancelAnimationFrame(animationFrameId); // Detener la animación
                return;
            }

            // Actualizamos la posición de la Pokéball
            pokeball.style.left = `${pokeball.offsetLeft + (moveDirection.x / moveSpeed) * velocity}px`;
            pokeball.style.top = `${pokeball.offsetTop + (moveDirection.y / moveSpeed) * velocity}px`;

            // Continuar con la animación
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();
    }

    // Función para resetear la Pokéball a la posición inicial (abajo, centro)
    function resetPokeball() {
        pokeball.style.transition = "transform 0.5s ease-out, left 0.5s ease-out";
        pokeball.style.left = "50%";
        pokeball.style.top = "auto"; // Se asegura de no haber un valor 'top' previo
        pokeball.style.transform = "translateX(-50%)";
    }

    // Eventos para ratón
    pokeball.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", stopDrag);

    // Eventos para pantallas táctiles
    pokeball.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", dragMove);
    document.addEventListener("touchend", stopDrag);
});
