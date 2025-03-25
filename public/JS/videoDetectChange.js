
const track = video.textTracks[0];

let LAST_CHAPTER=0
video.addEventListener("timeupdate", () => {
    if(track.mode=="hidden"){
        for (let i = 0; i < track.cues.length; i++) {
            const cue = track.cues[i];
            if (video.currentTime >= cue.startTime && video.currentTime <= cue.endTime) {
                if(cue.text.substr(0,1)!=LAST_CHAPTER){
                    //MetadataFunction(cue)
                    LAST_CHAPTER=cue.text.substr(0,1)
                }
            }
        }
    }
    }
);