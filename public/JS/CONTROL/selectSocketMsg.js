
const route=document.getElementById("route")
const qualitySelect=document.getElementById("qualitySelector")
const subtiles=document.getElementById("subtitleSelector")
const volume=document.getElementById("volumebar")
const musicSelector=document.getElementById("musicSelector")
const player=document.getElementById("playerSelector")

route.addEventListener("change",()=> socket.emit('selectPlayer', player.value,route.value))

player.addEventListener("change",()=> socket.emit('selectVideo', player.value,route.value))

qualitySelect.addEventListener("change",()=> socket.emit('selectQuality', qualitySelect.value))

subtiles.addEventListener("change",()=>socket.emit('subtitles',subtiles.value))

volume.addEventListener("change",()=>{socket.emit('volumeChange',volume.value)})

musicSelector.addEventListener("change",()=>socket.emit('changeMusic',musicSelector.value))