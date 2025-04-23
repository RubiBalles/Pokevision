from pokemonSuggest import process_images
from describeImages import generateDescriptionFile

video_list=["suiza","tokio"]

for video in video_list:
    process_images(video=video)
    generateDescriptionFile(video=video)