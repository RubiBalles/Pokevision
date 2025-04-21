
const route=document.getElementById("route")
const qualitySelect=document.getElementById("qualitySelector")

route.addEventListener("change",()=> socket.emit('selectVideo', true,route.value,qualitySelect.value+"/"+route.value))

qualitySelect.addEventListener("change",()=> socket.emit('selectVideo', true,route.value,qualitySelect.value+"/"+route.value))