import express from "express";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createVTTFile } from './generateTrack.js'; // Importar la función para generar el archivo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 80;

//Se generan los VTT dinamicamente
createVTTFile(__dirname);

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Example app listening on port
    ${port}`);
    });