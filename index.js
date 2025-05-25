
import express from "express";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { initializeTranslator, translateText } from './Online_AI/xenovaTranslator.js';


import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 80;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Se generan los VTT dinamicamente
//createVTTFile(__dirname);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.static('public'));

app.get('/controller', (req, res) => {
  res.sendFile(__dirname + '/public/ControlRemoto.html');
});

server.listen(port, () => {
    console.log(`Example app listening on port
    ${port}`);
    });


const screens = {};         // pin => screenSocket
const controllers = {};     // screenSocket.id => controllerSocket
const activePins = {};      // screenSocket.id => pin

function generatePin() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  }

io.on('connection', (socket) => {
    console.log("S'ha connectat algú");

    socket.on('register_screen', () => {
        const pin = generatePin();
        screens[pin] = socket;
        activePins[socket.id] = pin;
        socket.role = 'screen';
        socket.pin = pin;
    
        console.log(`🖥️ Pantalla registrada con PIN: ${pin}`);
        socket.emit('pin_assigned', pin);
      });
    
      socket.on('register_controller', (pin) => {
        const screenSocket = screens[pin];
        if (!screenSocket) {
          socket.emit('error_message', '❌ PIN inválido o expirado.');
          return;
        }
    
        // Verifica que no haya ya un controlador
        if (controllers[screenSocket.id]) {
          socket.emit('error_message', '❌ Esta sala ya está completa');
          return;
        }

        if(screenSocket.username)
          socket.username=screenSocket.username
    
        socket.role = 'controller';
        socket.screenSocket = screenSocket;
    
        controllers[screenSocket.id] = socket;

        screenSocket.controllerSocket = socket;

    
        console.log(`🎮 Controlador conectado al PIN: ${pin}`);
        socket.emit('controller_connected');
      });
    
      socket.on('play', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('play');
        }
      });
    
      socket.on('pause', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('pause');
        }
      });

      socket.on('selectVideo', (player,video) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('selectVideo', player,video);
        }
      });
      socket.on('selectPlayer', (player,video) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('selectPlayer', player,video);
        }
      });

      socket.on('selectQuality', (value) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('selectQuality', value);
        }
      });

      socket.on('subtitles', (value) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('subtitles', value);
        }
      });

      socket.on('fullscreen', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('fullscreen');
        }
      });

      socket.on('changeMusic', (value) => {

        if (socket.role === 'controller' && socket.screenSocket) {

          socket.screenSocket.emit('changeMusic', value);
        }
      });

      socket.on('volumeChange', (value) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('volumeChange', value);
        }
      });
    
      socket.on('hide_controls', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('hide_controls');
        }
      });

      socket.on('continue', (pokemon,route) => {
        let username
        if(socket.role==="screen" && socket.controllerSocket){
          username=socket.username ? socket.username : socket.controllerSocket.username
        }
        else if (socket.role==="screen"){
          username=socket.username ? socket.username : -1
        }

        if(typeof(username)=== "string") {
          const message=`⭐ Acabo de capturar un ${pokemon} en ${route}!!`
          io.emit("chatMessage",{ username, message });
        }
        if (socket.role === 'screen' && socket.controllerSocket) {
          socket.controllerSocket.emit('continue');
        }
      });

      socket.on('pokemon_appear',()=>{
        if (socket.role === 'screen' && socket.controllerSocket) {
          socket.controllerSocket.emit('pokemon_appear');
        }
      });

      socket.on('throw_pokeball', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('throw_pokeball');
        }
      });

      socket.on('translate_text', async (text) => {
  
        try {
          const translated = await translateText(text);
          socket.emit('translated_text', translated);
        } catch (error) {
          console.error('Error durante la traducción:', error);
          socket.emit('translated_text', 'Error al traducir el texto');
        }
      });

      socket.on('disconnect', () => {
        if (socket.username) {
          io.emit("userJoined", `${socket.username} salió del chat`);
        }
        if (socket.role === 'screen') {
          const pin = activePins[socket.id];
          if (pin) delete screens[pin];
          delete activePins[socket.id];
    
          const controllerSocket = controllers[socket.id];
          if (controllerSocket) {
            controllerSocket.emit('error_message', '❌ La pantalla se ha desconectado.');
            delete controllers[socket.id];
          }
    
          console.log(`❌ Pantalla desconectada, PIN liberado: ${pin}`);
        }
    
        if (socket.role === 'controller') {
          const screenSocket = socket.screenSocket;
          if (screenSocket) {
            delete controllers[screenSocket.id];
            console.log('❌ Controlador desconectado');
          }
        }
      });
      socket.on("userJoined", (name) => {
      socket.username = name;
        io.emit("userJoined", name);
      });

      socket.on("chatMessage", ({ username, message }) => {
        io.emit("chatMessage", { username, message });
      });
    });
    