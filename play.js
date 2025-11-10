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

// Try to autoplay the background audio; if blocked show a tap-to-play overlay
document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('bg-audio');
    if (!bg) return;

    // Helper to create an overlay that requests a user gesture to play
    function showPlayOverlay() {
        // avoid adding multiple overlays
        if (document.getElementById('play-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'play-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.background = 'rgba(0,0,0,0.35)';
        overlay.style.zIndex = '9999';

        const btn = document.createElement('button');
        btn.textContent = 'Tap to play audio';
        btn.style.fontSize = '18px';
        btn.style.padding = '12px 20px';
        btn.style.borderRadius = '8px';
        btn.style.border = 'none';
        btn.style.background = '#FFF0C4';
        btn.style.color = '#3E0703';
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', async () => {
            try {
                await bg.play();
            } catch (e) {
                // still couldn't play, keep overlay so user can try again
                console.warn('Playback failed after gesture:', e);
                return;
            }
            overlay.remove();
        });

        overlay.appendChild(btn);
        document.body.appendChild(overlay);
    }

    // Attempt to play; if blocked, browser will throw and we show overlay
    (async () => {
        try {
            await bg.play();
            // autoplay succeeded
        } catch (err) {
            // autoplay was blocked (most browsers require a user gesture)
            console.info('Autoplay blocked, showing play overlay');
            showPlayOverlay();
        }
    })();
});
