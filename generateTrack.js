import fs from 'fs';
import { join } from 'path';
import ffmpeg from 'fluent-ffmpeg';

// Función para obtener la duración del video
function getVideoDuration(videoPath) {
    //ffmpeg.setFfprobePath('C:\\ffmpeg\\bin\\ffprobe.exe')
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) reject('Error al obtener la duración del video: ' + err);
            else resolve(metadata.format.duration); // Duración en segundos
        });
    });
}

// Función para convertir segundos a formato WebVTT (hh:mm:ss.sss)
function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String((seconds % 60).toFixed(3)).padStart(6, '0');
    return `${h}:${m}:${s}`;
}

// Función para generar capítulos aleatorios
function generateChapters(duration, count) {
    let chapters = [];
    let usedTimes = new Set();

    while (chapters.length < count) {
        let start = Math.floor(Math.random() * (duration - 10)); // Evitar que caiga en el último segundo
        if (!usedTimes.has(start)) {
            usedTimes.add(start);
            let title = `Capítulo ${chapters.length + 1}`;
            chapters.push({ start, title });
        }
    }

    // Ordenar los capítulos por tiempo de inicio
    chapters.sort((a, b) => a.start - b.start);

    return chapters;
}

// Función para generar el archivo .vtt
async function createVTTFile(__dirname) {
    try {
        // Verificar si la carpeta "tracks" existe, si no, crearla
        const tracksDir = join(__dirname, 'public', 'src', 'tracks');
        if (!fs.existsSync(tracksDir)) {
            fs.mkdirSync(tracksDir, { recursive: true });
        }

        const videoFile = join(__dirname, 'public', 'src', 'video', 'video.mp4');
        const videoDuration = await getVideoDuration(videoFile);
        console.log(`Duración del video: ${videoDuration} segundos`);

        const chapters = generateChapters(videoDuration, 5);

        let vttContent = "WEBVTT\n\n"; // Encabezado VTT

        chapters.forEach((chapter, index) => {
            let startTime = formatTime(chapter.start);
            let endTime = formatTime(chapter.start + 5); // Cada capítulo dura 5 segundos
            vttContent += `Chapter ${index + 1}\n${startTime} --> ${endTime}\n${Math.floor(Math.random() * 151) + 1}\n\n`;
        });

        // Ruta del archivo VTT
        const vttFile = join(__dirname, 'public', 'src', 'tracks', 'chapters.vtt');

        // Escribir el archivo .vtt
        fs.writeFile(vttFile, vttContent, (err) => {
            if (err) {
                console.error('Error al escribir el archivo VTT:', err);
                return;
            }
            console.log(`Archivo VTT generado exitosamente: ${vttFile}`);
        });

    } catch (error) {
        console.error(error);
    }
}

// Exportar la función para ser usada en otro archivo
export { createVTTFile };
