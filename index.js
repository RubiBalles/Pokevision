import express from "express";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createVTTFile } from './generateTrack.js'; // Importar la función para generar el archivo
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

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Example app listening on port
    ${port}`);
    });

    io.on('connection', (socket) => {
        console.log("S'ha connectat algú");
        });

    server.listen(port, () => {
        console.log(`Example app listening on port
        ${port}`);
        });