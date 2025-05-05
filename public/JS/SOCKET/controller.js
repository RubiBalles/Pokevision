const socket = io();
const statusInf = document.getElementById('status');
const controls = document.getElementById('controls');
const insertCode=document.getElementById('insertCode');

function connect() {
  const pin = document.getElementById('pin').value;
  socket.emit('register_controller', pin);
}

socket.on('error_message', (msg) => {
    statusInf.innerText = msg;
    controls.style.display = 'none';
});

socket.on('controller_connected', () => {
    statusInf.innerText = '✅ Conectado correctamente a la pantalla.';
    controls.style.display = 'block';
    insertCode.style.display='none'
    socket.emit('hide_controls')
});

socket.on('continue', () => {
    const botonera = document.getElementById('botonera');
    const pokeball = document.querySelector('.pokeball');
    const body = document.body;
    body.classList.add('botonera-active');
    botonera.style.display = 'flex';
    pokeball.style.display = 'none';
});

socket.on('pokemon_appear',async ()=>{
    const botonera = document.getElementById('botonera');
    const pokeball = document.querySelector('.pokeball');
    const body = document.body;
    body.classList.remove('botonera-active');
    pokeball.style.display = 'block';
    botonera.style.display = 'none';
    //captureButton.hidden = false;
 
    /*
    else {
        body.classList.add('botonera-active');
        botonera.style.display = 'flex';
        pokeball.style.display = 'none';
        //captureButton.hidden = true;
    }
    */
})
