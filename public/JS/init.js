
  const video=document.querySelector("video")
  const player=document.getElementById("playerSelector")
  const ROUTE=document.getElementById("route");
  document.addEventListener("DOMContentLoaded", () => {
   
    player.addEventListener('change',()=>{
      const curTime=video.currentTime
      updatePlayer(curTime)
    })
    ROUTE.addEventListener('change',updatePlayer)

    if (Hls.isSupported()) {
      loadHLS(video,ROUTE.value)
    }else{
      createDASH(video,ROUTE.value)
    }
    
    document.getElementById("iconMute").className = videoController.isMuted() ? 'icon-mute-on' : 'icon-mute-off';
     setSeekInf()
});

async function updatePlayer(curTime=null){

  const ROUTE=document.getElementById("route"); 
  if (player.value==="dash"){
    createDASH(video,ROUTE.value,curTime)
  }
  else if(player.value==='hls'){
    loadHLS(video,ROUTE.value,curTime)
  }
  else if(player.value==='ipfs'){
   const pathIPFS="https://media.thetavideoapi.com/org_ruesn20pxcar9eh5mwuijbmh30ks/srvacc_pb5er089qadwns5cdmzms5y44/video_383ucpv384ckqig4nwaqe5yz7z/master.m3u8"
   loadHLS(video,pathIPFS,curTime,true)
  }
}

async function updatePlayerRemote(player,route){
  const curTime=video.currentTime
  if (player==="dash"){
    createDASH(video,route,curTime)
  }
  else if(player==='hls'){
    loadHLS(video,route,curTime)
  }
  else if(player==='ipfs'){
   const pathIPFS="https://media.thetavideoapi.com/org_ruesn20pxcar9eh5mwuijbmh30ks/srvacc_pb5er089qadwns5cdmzms5y44/video_383ucpv384ckqig4nwaqe5yz7z/master.m3u8"
   loadHLS(video,pathIPFS,true)
  }
}