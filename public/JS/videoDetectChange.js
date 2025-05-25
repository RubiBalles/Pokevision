let LAST_CHAPTER = null;

function setupMetadataListener(video) {
    const metadataTracks = Array.from(video.textTracks).filter(track => track.kind === "metadata");

    if (!metadataTracks.length) {
        console.warn("No metadata tracks found.");
        return;
    }

    const track = metadataTracks[0];
    track.mode = "hidden"; // Ensure the track is active but not displayed

    track.addEventListener("cuechange", () => {
        const activeCues = track.activeCues;
        if (activeCues && activeCues.length > 0) {
            const cue = activeCues[0];
            const chapter = cue.text.substr(0, 1);
            if (chapter !== LAST_CHAPTER) {
                LAST_CHAPTER = chapter;
                MetadataFunction(cue);
            }
        }
    });
}
