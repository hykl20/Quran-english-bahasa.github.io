document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    // Retrieve the audio source path from localStorage
    const savedAudioSource = localStorage.getItem('audio-path');
    if (savedAudioSource) {
        audioSource.src = savedAudioSource;

        // Ensure the audio player loads the source and initializes correctly
        audioPlayer.addEventListener('loadedmetadata', () => {
            // Retrieve the saved time from localStorage
            const savedTime = localStorage.getItem('audio-time');
            if (savedTime) {
                audioPlayer.currentTime = parseFloat(savedTime);
            }

            // Start playback if it was playing before
            const wasPlaying = localStorage.getItem('audio-playing') === 'true';
            if (wasPlaying) {
                audioPlayer.play().catch(error => {
                    console.error('Error attempting to play audio:', error);
                });
            }
        });

        // Handle play/pause interactions
        audioPlayer.addEventListener('pause', () => {
            const wasPlaying = localStorage.getItem('audio-playing') === 'true';
            if (wasPlaying) {
                audioPlayer.play().catch(error => {
                    console.error('Error attempting to play audio:', error);
                });
            }
        });

        // Prevent pausing when the player is clicked
        audioPlayer.addEventListener('click', (e) => {
            e.preventDefault();
            audioPlayer.play().catch(error => {
                console.error('Error attempting to play audio:', error);
            });
        });

        // Prevent pausing when any part of the document is clicked
        document.addEventListener('click', () => {
            audioPlayer.play().catch(error => {
                console.error('Error attempting to play audio:', error);
            });
        });

        // Ensure the audio resumes even after any interaction
        document.addEventListener('touchend', () => {
            audioPlayer.play().catch(error => {
                console.error('Error attempting to play audio:', error);
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
    } else {
        console.warn('No audio source found in localStorage.');
    }
});
