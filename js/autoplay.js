const audioPlayer = document.getElementById('audioPlayer');

    // Ensure the audio player auto-plays and keeps playing
    audioPlayer.play();

    // Restart audio playback if the user pauses or interacts with other elements
    audioPlayer.addEventListener('pause', () => {
        audioPlayer.play();
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
