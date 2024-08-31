    document.addEventListener('DOMContentLoaded', () => {
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');

        // Retrieve the audio source path from localStorage
        const savedAudioSource = localStorage.getItem('audio-path');
        if (savedAudioSource) {
            audioSource.src = savedAudioSource;
            audioPlayer.load(); // Load the saved source

            // Retrieve the saved time and play status from localStorage
            const savedTime = localStorage.getItem('audio-time');
            if (savedTime) {
                audioPlayer.currentTime = savedTime;
            }

            const wasPlaying = localStorage.getItem('audio-playing') === 'true';
            if (wasPlaying) {
                // Ensure the audio player auto-plays after loading the source
                audioPlayer.play();
            }
        } else {
            console.warn('No audio source found in localStorage.');
        }

        // Ensure the audio player continues to play even with interaction
        audioPlayer.addEventListener('pause', () => {
            const wasPlaying = localStorage.getItem('audio-playing') === 'true';
            if (wasPlaying) {
                audioPlayer.play();
            }
        });

        // Prevent pausing when the player is clicked
        audioPlayer.addEventListener('click', (e) => {
            e.preventDefault();
            audioPlayer.play();
        });

        // Prevent pausing when any part of the document is clicked
        document.addEventListener('click', () => {
            audioPlayer.play();
        });

        // Ensure the audio resumes even after any interaction
        document.addEventListener('touchend', () => {
            audioPlayer.play();
        });

        // Save the current audio time and playing status to localStorage
        audioPlayer.ontimeupdate = () => {
            localStorage.setItem('audio-time', audioPlayer.currentTime);
        };

        audioPlayer.onplay = () => {
            localStorage.setItem('audio-playing', 'true');
        };

        audioPlayer.onpause = () => {
            localStorage.setItem('audio-playing', 'false');
        };

        // Save audio progress to localStorage when paused or ended
        audioPlayer.addEventListener('pause', saveAudioProgress);
        audioPlayer.addEventListener('ended', saveAudioProgress);

        function saveAudioProgress() {
            localStorage.setItem('audio-time', audioPlayer.currentTime);
        }
    });
