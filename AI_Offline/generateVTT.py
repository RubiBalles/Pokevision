import json

def load_json(file_path):
    """Carga los datos desde un archivo JSON."""
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def generate_vtt(chapters,video,info, chapter_duration=10):
    if info=="meta":
        output_file=f"{video}Meta.vtt"
    elif info=="desc":
        output_file=f"{video}DescriptionESP.vtt"
    """Genera un archivo .vtt a partir de los datos del JSON."""
    current_time = 0
    vtt_content = ["WEBVTT\n"]
    
    for chapter_info in chapters:

        start_time = current_time
        end_time = current_time + chapter_duration

        # Formatear tiempos en HH:MM:SS.mmm
        start_time_str = f"{start_time // 3600:02}:{(start_time % 3600) // 60:02}:{start_time % 60:02}.000"
        end_time_str = f"{end_time // 3600:02}:{(end_time % 3600) // 60:02}:{end_time % 60:02}.000"
        vtt_content.append(f"{start_time_str} --> {end_time_str}")
        
        # Agregar capítulo al contenido del VTT
        if info=="meta":
            title = chapter_info.get("capitulo")  # Nombre del capítulo
            habitat = chapter_info.get("Habitat")  # Hábitat u otra información adicional
            vtt_content.append(f"{title} - {habitat}\n")  # Combinar título y hábitat
        elif info =="desc":
            vtt_content.append(f"{chapter_info}\n")
        # Avanzar el tiempo
        current_time += chapter_duration

    # Guardar archivo .vtt
    with open(output_file, "w", encoding="utf-8") as file:
        file.write("\n".join(vtt_content))

    print(f"Archivo {output_file} generado con éxito.")

def generateVTTFile(video,info_type):
    # Cargar JSON y generar el archivo VTT
    if info_type=="meta":
        json_url = f"C:\\GEDIE\\{video}Metadata.json"
    elif info_type =="desc":
        json_url = f"C:\\GEDIE\\{video}DescriptionEsp.json"

    json_data = load_json(json_url)
    generate_vtt(json_data,video=video,info=info_type)

generateVTTFile("tokio","desc")
generateVTTFile("suiza","desc")

