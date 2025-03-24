import json
import os
import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image

from generateVTT import *

# Lista de categorías personalizadas
HABITATS = [
    "cave", "forest", "grassland", "mountain", "rare",
    "rough-terrain", "sea", "urban", "waters-edge"
]

# Cargar el modelo CLIP y el procesador
model_name = "openai/clip-vit-base-patch16"
model = CLIPModel.from_pretrained(model_name)
processor = CLIPProcessor.from_pretrained(model_name)

# Función para clasificar una imagen
def classify_image_with_clip(image_path):
    """Clasifica una imagen y devuelve la categoría predicha con su confianza."""
    image = Image.open(image_path).convert("RGB")
    
    # Crear descripciones para CLIP con HABITATS
    texts = [f"an image of a {category}" for category in HABITATS]  
    
    # Preprocesar imagen y texto
    inputs = processor(text=texts, images=image, return_tensors="pt", padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    # Obtener similitudes y probabilidades
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)

    # Obtener la mejor categoría predicha
    predicted_idx = torch.argmax(probs, dim=1).item()
    predicted_category = HABITATS[predicted_idx]

    return predicted_category

# Función para procesar imágenes y guardar en JSON
def process_images(video, num_images=60):
    directory=f"C:\\GEDIE\\public\\src\\video\\{video}"
    output_file=f"{video}Metadata.json"
    """Procesa múltiples imágenes, las clasifica y guarda los resultados en un archivo JSON."""
    results = []

    for i in range(1, num_images + 1):
        image_path = os.path.join(directory, f"{i}.jpg")
        
        if os.path.exists(image_path):  # Verifica si la imagen existe
            category = classify_image_with_clip(image_path)
            results.append({"capitulo": i, "Habitat": category})  # Agregar resultado en formato JSON
        else:
            print(f"⚠️ Imagen {image_path} no encontrada, saltando...")

    # Guardar resultados en un archivo JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    #print(f"✅ Resultados guardados en {output_file}")

    generateVTTFile(video,"meta")

# Procesar imágenes


