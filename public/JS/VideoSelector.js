async function changeVideo(changeTracks=false,video=null,fullName=null){
    const QUALITY_SELECTOR= document.getElementById('qualitySelector');
    const VIDEO=document.getElementById("myVideo");
    const ROUTE=document.getElementById("route");
    const BASE_PATH="src/videos/"
    const DEFAULT_FULL_NAME=BASE_PATH+QUALITY_SELECTOR.value+"/"+ROUTE.value

    const videoMP4Src= fullName ? BASE_PATH+fullName+".mp4" : DEFAULT_FULL_NAME+".mp4"

    const videoWEBMSrc=fullName ? BASE_PATH+fullName+".mp4" : DEFAULT_FULL_NAME+".mp4"
    
    document.getElementById("MP4").src=videoMP4Src
    document.getElementById("WEBM").src=videoWEBMSrc
        
    if(changeTracks){
        await updateMediaTracksDyn(video ? video : ROUTE.value)
    }
    VIDEO.load()
}


