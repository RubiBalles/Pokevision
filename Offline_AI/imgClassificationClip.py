from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import os

# Lista de categorías personalizadas
HABITATS = [
    'cave', 'forest', 'grassland', 'mountain', 'rare',
    'rough-terrain', 'sea', 'urban', 'waters-edge'
]

# Cargar el modelo CLIP y el procesador
model_name = "openai/clip-vit-base-patch16"  # Modelo CLIP preentrenado
model = CLIPModel.from_pretrained(model_name)
processor = CLIPProcessor.from_pretrained(model_name)

# Función para clasificar una imagen
def classify_image_with_clip(image_path):
    image = Image.open(image_path).convert("RGB")
    texts = [f"an image of {category}" for category in HABITATS]  # Crear descripciones para las categorías
    inputs = processor(text=texts, images=image, return_tensors="pt", padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    logits_per_image = outputs.logits_per_image  # Similitud de la imagen con cada categoría
    probs = logits_per_image.softmax(dim=1)  # Convertir las similitudes en probabilidades

    predicted_idx = torch.argmax(probs, dim=1).item()  # Obtener la categoría más probable
    predicted_category = HABITATS[predicted_idx]

    return predicted_category, probs[0][predicted_idx].item()

# Función para procesar todas las imágenes
def process_images(directory, num_images=60):
    results = []
    
    for i in range(1, num_images + 1):
        image_path = os.path.join(directory, f"{i}.jpg")  # Ruta de la imagen
        if os.path.exists(image_path):  # Asegúrate de que la imagen exista
            category, score = classify_image_with_clip(image_path)
            results.append((image_path, category, score))
        else:
            print(f"Imagen {image_path} no encontrada.")
    
    return results

# Procesar las imágenes
directory = "C:\\Users\\skern\\Videos\\thumb2"  # La carpeta que contiene las imágenes
results = process_images(directory)

# Mostrar resultados
for image_path, category, score in results:
    print(f"Imagen: {image_path} | Categoría: {category} | Certeza: {score:.2f}")
