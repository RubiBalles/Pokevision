
const route=document.getElementById("route")
const qualitySelect=document.getElementById("qualitySelector")
const subtiles=document.getElementById("subtitleSelector")

route.addEventListener("change",()=> socket.emit('selectVideo', true,route.value,qualitySelect.value+"/"+route.value))

qualitySelect.addEventListener("change",()=> socket.emit('selectVideo', true,route.value,qualitySelect.value+"/"+route.value))

subtiles.addEventListener("change",()=>socket.emit('subtitles',subtiles.value))