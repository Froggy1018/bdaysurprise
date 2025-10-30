// Get all audio elements on the page
const allAudioElements = document.querySelectorAll('audio');

// Add an event listener to each audio element
allAudioElements.forEach(audioElement => {
    audioElement.addEventListener('play', () => {
        // When an audio element starts playing, pause all others
        allAudioElements.forEach(otherAudioElement => {
            if (otherAudioElement !== audioElement && !otherAudioElement.paused) {
                otherAudioElement.pause();
                // Optionally, reset the time of paused songs
                // otherAudioElement.currentTime = 0; 
            }
        });
    });
});
