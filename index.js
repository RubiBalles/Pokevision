
import express from "express";
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createVTTFile } from './generateTrack.js'; // Importar la función para generar el archivo
// import { initializeTranslator, translateText } from './Online_AI/test.js';

import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 80;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Se generan los VTT dinamicamente
createVTTFile(__dirname);

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
          socket.emit('error_message', '❌ Esta pantalla ya tiene un controlador.');
          return;
        }
    
        socket.role = 'controller';
        socket.screenSocket = screenSocket;
    
        controllers[screenSocket.id] = socket;

        screenSocket.controllerSocket = socket;

    
        console.log(`🎮 Controlador conectado al PIN: ${pin}`);
        socket.emit('controller_connected');
      });
    
      socket.on('play', () => {
        //console.log("Se ha pulsado el boton de play")
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('play');
        }
      });
    
      socket.on('pause', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('pause');
        }
      });

      socket.on('selectVideo', (changeVideo,videoName,fullName) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('selectVideo', changeVideo,videoName,fullName);
        }
      });

      socket.on('selectQuality', (value) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('selectVideo', value);
        }
      });

      socket.on('subtitles', (value) => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('subtitles', value);
        }
      });
    
      socket.on('hide_controls', () => {
        if (socket.role === 'controller' && socket.screenSocket) {
          socket.screenSocket.emit('hide_controls');
        }
      });

      socket.on('continue', () => {
        if (socket.role === 'screen' && socket.controllerSocket) {
          //console.log("Continue clicked")
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
        console.log('Texto recibido:', text);
  
        try {
          const translated = await translateText(text);
          console.log('Texto traducido:', translated);
          socket.emit('translated_text', translated);
        } catch (error) {
          console.error('Error durante la traducción:', error);
          socket.emit('translated_text', 'Error al traducir el texto');
        }
      });

      socket.on('disconnect', () => {
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
    });