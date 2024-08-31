document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    function initializeAudioPlayer() {
        // Retrieve the audio source path from localStorage
        const savedAudioSource = localStorage.getItem('audio-path');
        if (savedAudioSource) {
            audioSource.src = savedAudioSource;

            audioPlayer.addEventListener('canplaythrough', () => {
                // Retrieve the saved time from localStorage
                const savedTime = localStorage.getItem('audio-time');
                if (savedTime) {
                    audioPlayer.currentTime = parseFloat(savedTime);
                }

                // Attempt to play the audio
                audioPlayer.play().catch(error => {
                    console.error('Error attempting to play audio:', error);
                    // Show a play button if autoplay fails
                    showPlayButton();
                });
            });

            // Save audio progress to localStorage
            audioPlayer.ontimeupdate = () => {
                localStorage.setItem('audio-time', audioPlayer.currentTime);
            };

            audioPlayer.onplay = () => {
                localStorage.setItem('audio-playing', 'true');
            };

            audioPlayer.onpause = () => {
                localStorage.setItem('audio-playing', 'false');
            };

            // Ensure the audio player is visible and ready
            audioPlayer.addEventListener('loadeddata', () => {
                audioPlayer.style.display = 'block';
            });
        } else {
            console.warn('No audio source found in localStorage.');
        }
    }

    function showPlayButton() {
        let playButton = document.getElementById('playButton');
        if (!playButton) {
            playButton = document.createElement('button');
            playButton.id = 'playButton';
            playButton.innerText = 'Play Audio';
            document.body.appendChild(playButton);

            playButton.addEventListener('click', () => {
                audioPlayer.play().catch(error => {
                    console.error('Error attempting to play audio:', error);
                });
            });
        }
    }

    // Initialize audio player on page load
    initializeAudioPlayer();

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            initializeAudioPlayer();
        }
    });
});
