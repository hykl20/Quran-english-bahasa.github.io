window.addEventListener('load', () => {
    const fragment = window.location.hash.substring(1); // Get the fragment without the '#'
    const chapterKey = fragment.padStart(3, '0'); // Pad the number to 3 digits (e.g., '1' becomes '001')

    if (chapters[chapterKey]) {
        // Redirect to the audio URL for the corresponding chapter
        window.location.href = chapters[chapterKey].url;
    } else {
        console.log('Chapter not found.');
    }
});
