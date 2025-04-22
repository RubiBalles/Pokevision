const socket = io();
const statusInf = document.getElementById('status');
const controls = document.getElementById('controls');

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
    socket.emit('hide_controls')
});

socket.on('controller_connected', () => {
    statusInf.innerText = '✅ Conectado correctamente a la pantalla.';
    controls.style.display = 'block';
    socket.emit('hide_controls')
});

socket.on('pokemon_appear',async ()=>{
    const response=await fetch("/captureController.html")
    const HTML= await response.text()
    document.getElementById("botonera").style.display="none"
})