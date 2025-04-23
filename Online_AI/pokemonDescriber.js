import { pipeline } from '@xenova/transformers';

const token = ""; // Sustituye con tu token
// Función para obtener la descripción básica de la imagen
export async function getBasicDescription(imageUrl) {
  const captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');  // Modelo de captioning adecuado
  
  const output = await captioner(imageUrl);
  
  return output[0].generated_text;
}

// Función para expandir la descripción con más detalles sobre el Pokémon
export async function expandDescription(name, basicDescription) {
    const textGenerator = await pipeline('zero-shot-classification', 'facebook/bart-large-cnn');
  
  // Ajustamos el prompt para que sea más preciso y relevante para un Pokémon
  const prompt = `
  Describe ${name} a pokemon with this apparence${basicDescription}".`;
  
  const result = await textGenerator(prompt, {
    max_new_tokens: 150, do_sample: true
  });
  console.log(result[0].generated_text)
  return result[0].generated_text;
}

// Función principal
const run = async () => {
  const pokemonName = 'Charmander';
  const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

  try {
    const basicDescription = await getBasicDescription(imageUrl);
    const finalDescription = await expandDescription(pokemonName, basicDescription);

    console.log(`📸 Descripción básica: ${basicDescription}`);
    console.log(`📖 Descripción final:\n${finalDescription}`);
  } catch (error) {
    console.error('Error al generar la descripción:', error);
  }
};

// Ejecutar la función
run();
