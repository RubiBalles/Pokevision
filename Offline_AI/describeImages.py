import os
import json
import torch

from transformers import AutoProcessor, AutoModelForVision2Seq
from PIL import Image
from generateVTT import *


def generateDescriptionFile(video):

    output_file = f"{video}Description.json"

    # Cargar el modelo de imagen a texto (BLIP)
    processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model_vision = AutoModelForVision2Seq.from_pretrained("Salesforce/blip-image-captioning-base")

    # Asegurar que el modelo use CPU
    device = torch.device("cpu")
    model_vision.to(device)

    # Ruta de la carpeta con imágenes
    carpeta_imagenes = f"C:\\GEDIE\\public\\src\\video\\{video}"

    # Obtener lista de archivos de imagen (ordenados numéricamente)
    imagenes = sorted(
        [f for f in os.listdir(carpeta_imagenes) if f.lower().endswith(".jpg")],
        key=lambda x: int(x.split('.')[0])
    )

    # Procesar imágenes en bloques de 10
    descripciones = []
    for i, imagen in enumerate(imagenes, start=1):
        image_path = os.path.join(carpeta_imagenes, imagen)
        image = Image.open(image_path)

        # Generar la descripción de la imagen
        inputs = processor(images=image, return_tensors="pt").to(device)
        output = model_vision.generate(**inputs)
        descripcion = processor.batch_decode(output, skip_special_tokens=True)[0]

        # Agregar la descripción al bloque actual
        descripciones.append(descripcion)

    # Guardar los bloques de 10 descripciones en JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(descripciones, f, indent=4, ensure_ascii=False)

    #print(f"Guardado: {output_file}")
    generateVTTFile(video,"desc")
