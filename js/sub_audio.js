document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progress-container');

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

                // Update progress bar
                updateProgressBar();

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
                updateProgressBar();
            };

            audioPlayer.onplay = () => {
                localStorage.setItem('audio-playing', 'true');
            };

            audioPlayer.onpause = () => {
                localStorage.setItem('audio-playing', 'false');
            };

            audioPlayer.addEventListener('loadeddata', () => {
                audioPlayer.style.display = 'block';
            });

        } else {
            console.warn('No audio source found in localStorage.');
        }
    }

    function updateProgressBar() {
        if (audioPlayer.readyState >= 3) { // HAVE_FUTURE_DATA
            progressBar.max = audioPlayer.duration;
            progressBar.value = audioPlayer.currentTime;
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

    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            initializeAudioPlayer();
        }
    }

    // Initialize audio player on page load
    initializeAudioPlayer();

    // Handle visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle page unload or navigation away
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audio-time', audioPlayer.currentTime);
        localStorage.setItem('audio-playing', audioPlayer.paused ? 'false' : 'true');
    });
});
