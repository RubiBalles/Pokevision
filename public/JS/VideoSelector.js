document.getElementById('route').addEventListener('change', function(event) {
    const cityImage = document.getElementById('cityImage');

    if (event.target.value === 'tokyo') {
        cityImage.src = 'https://placehold.co/790x498.png?text=Tokio'; // Imagen para Tokio
    } else if (event.target.value === 'sweden') {
        cityImage.src = 'https://placehold.co/790x498.png?text=Suecia'; // Imagen para Suecia
    } else {
        cityImage.src = 'https://placehold.co/790x498'; // Imagen por defecto
    }
});