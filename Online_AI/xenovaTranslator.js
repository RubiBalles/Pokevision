// services/translator.js

import { pipeline } from '@xenova/transformers';

// Variable para guardar la instancia del pipeline
let translator = null;

// Función para inicializar el modelo (solo una vez)
export async function initializeTranslator() {
  if (!translator) {
    console.log('Cargando modelo de traducción...');
    translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
    console.log('Modelo de traducción cargado.');
  }
}

// Función para traducir texto
export async function translateText(text) {
  if (!translator) {
    throw new Error('Translator no inicializado. Llama a initializeTranslator primero.');
  }
  const output = await translator(text, { src_lang: 'eng_Latn', tgt_lang: 'spa_Latn' });
  return output[0].translation_text;
}

await initializeTranslator()

