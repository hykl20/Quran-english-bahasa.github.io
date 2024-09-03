document.getElementById('audioPlayerContainer').addEventListener('click', function() {
    this.classList.toggle('expanded');
});

// Handle URL hash to show the appropriate chapter
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && !isNaN(hash) && hash > 0 && hash <= 114) {
        showChapter(hash);
    } else if (window.location.hostname === 'muslim1446.github.io') {
        window.location.replace('/sura.html');
    }
});

const chapters = {
    1: { "title": "Al-Fatiha", "verses": 7 },
    2: { "title": "Al-Baqarah", "verses": 286 },
    // Add other chapters as needed
};

const arabic = {
    "1": { "title": "الفاتِحة" },
    "2": { "title": "البَقَرَة" },
    // Add other chapters as needed
};

const arabicmean = {
    1: { "title": "The Opening" },
    2: { "title": "The Cow" },
    // Add other chapters as needed
};

const englishXMLUrl = 'https://blue-carlina-25.tiiny.site/quran_xml/en-sahih.xml';
const indonesianXMLUrl = 'https://blue-carlina-25.tiiny.site/quran_xml/id-indonesian.xml';

// Generate Chapter List
function generateChapterList() {
    const chaptersList = document.getElementById('chapters-list');
    Object.keys(chapters).forEach(chapNum => {
        const chapter = chapters[chapNum];
        const chapterDiv = document.createElement('div');
        chapterDiv.classList.add('chapter');
        chapterDiv.innerText = `${chapNum}. ${chapter.title} (${chapter.verses} ayahs)`;
        chapterDiv.onclick = () => showChapter(chapNum);

        // Apply styles
        chapterDiv.style.fontFamily = "'Young Serif', serif";
        chapterDiv.style.borderRadius = '10px';
        chapterDiv.style.color = '#ffffff';
        chapterDiv.style.padding = '10px';
        chapterDiv.style.margin = '5px 0';

        chaptersList.appendChild(chapterDiv);
    });
}

async function fetchXML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        console.log(`Fetched XML from ${url}`);
        const parser = new DOMParser();
        return parser.parseFromString(text, 'text/xml');
    } catch (error) {
        console.error(`Error fetching XML from ${url}:`, error);
        return null;
    }
}

function parseXML(xml) {
    const translations = {};
    if (!xml) return translations;
    const suras = xml.getElementsByTagName('sura');
    for (let sura of suras) {
        const index = sura.getAttribute('index');
        translations[index] = {};
        const ayas = sura.getElementsByTagName('aya');
        for (let aya of ayas) {
            const verseIndex = aya.getAttribute('index');
            const text = aya.getAttribute('text');
            translations[index][verseIndex] = text;
        }
    }
    return translations;
}

async function fetchTafseerData(chapNum) {
    try {
        const response = await fetch(`https://equran.id/api/v2/tafsir/${chapNum}`);
        const data = await response.json();

        if (data.code === 200) {
            const tafseerData = data.data.tafsir;
            tafseerData.forEach(tafsir => {
                const tafseerTextDiv = document.getElementById(`tafseer-text-${tafsir.ayat}`);
                if (tafseerTextDiv) {
                    tafseerTextDiv.innerHTML = `<p>${tafsir.teks} <a href="https://muslim1446.github.io/tafseer/?sura=${chapNum}">Other Tafseer (Indonesia/English)</a></p>`;
                }
            });
        } else {
            console.error('Tafseer data not available.');
        }
    } catch (error) {
        console.error('Error fetching tafseer data:', error);
    }
}

function toggleTafseerText(ayatNumber) {
    const tafseerText = document.getElementById(`tafseer-text-${ayatNumber}`);
    if (tafseerText) {
        tafseerText.style.display = tafseerText.style.display === 'none' || tafseerText.style.display === '' ? 'block' : 'none';
    }
}

function adjustImageSize() {
    const images = document.querySelectorAll('.arabic-image');
    images.forEach(img => {
        img.style.width = window.innerWidth < 768 ? '100%' : 'auto';
        img.style.height = 'auto'; // Maintain aspect ratio
    });
}

async function showChapter(chapNum) {
    const chapterTitleElement = document.getElementById('chapter-title');
    const verseContainer = document.getElementById('verse-container');
    const loadingElement = document.getElementById('loading');

    if (!chapters[chapNum]) {
        console.warn('Invalid chapter number:', chapNum);
        return;
    }

    // Update the page title and chapter title
    document.title = `Surah ${chapters[chapNum].title} - The Noble Qur'an`;
    chapterTitleElement.innerHTML = `
        Surah ${chapNum}: ${chapters[chapNum].title} <a class="cback" href="/sura" target="_self">Back</a>
        <div id="title-container">
            <a class="cback" href="tafseer/?sura=${chapNum}" target="_self">See Tafseer</a>
            <div id="title-container">
                <span style="font-family: 'Reem Kufi', sans-serif; font-size: 60px;">${arabic[chapNum].title}</span>
                <div>
                    <span style="font-style: italic; font-size: 0.8em;">${arabicmean[chapNum].title}</span>
                    <div id="bismillah-container" class="${chapNum === '9' || chapNum === '1' ? 'hidden' : ''}">
                        <hr>
                        <div class="iarabic">أعوذ بالله من الشيطان الرجيم</div>
                        <div class="iarabic0 ${chapNum === '9' || chapNum === '1' ? 'hidden' : ''}">
                            <div>بسم الله الرحمن الرحيم</div>
                        </div>
                        <div class="ienglish">I seek refuge in Allāh from Satan being expelled from His mercy</div>
                        <div class="ienglish0 ${chapNum === '9' || chapNum === '1' ? 'hidden' : ''}">
                            <div>In the name of Allāh, the Entirely Merciful, the Especially Merciful</div>
                        </div>
                        <div class="iindonesian">Aku berlindung kepada Allah dari godaan <i>syaitan</i> yang terkutuk</div>
                        <div class="iindonesian0 ${chapNum === '9' || chapNum === '1' ? 'hidden' : ''}">
                            <div>Dengan nama Allah, Yang Maha Pengasih, Maha Penyayang</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Display loading indicator
    loadingElement.style.display = 'block';

    try {
        // Fetch and parse translations
        const [englishXML, indonesianXML] = await Promise.all([
            fetchXML(englishXMLUrl),
            fetchXML(indonesianXMLUrl)
        ]);

        const englishTranslations = parseXML(englishXML);
        const indonesianTranslations = parseXML(indonesianXML);

        verseContainer.innerHTML = '';

        // Display verses
        for (let verseNum = 1; verseNum <= chapters[chapNum].verses; verseNum++) {
            const verseDiv = document.createElement('div');
            verseDiv.classList.add('verse');
            verseDiv.id = `verse-${verseNum}`;

            // Arabic PNG
            const arabicImg = document.createElement('img');
            arabicImg.src = `https://everyayah.com/data/quranpngs/${chapNum}_${verseNum}.png`;
            arabicImg.alt = `Arabic Verse ${verseNum}`;
            arabicImg.classList.add('arabic-image');
            verseDiv.appendChild(arabicImg);

            // English Translation
            const englishText = englishTranslations[chapNum]?.[verseNum] || 'Translation not available';
            const englishDiv = document.createElement('div');
            englishDiv.classList.add('translation', 'english');
            englishDiv.innerText = englishText;
            verseDiv.appendChild(englishDiv);

            // Indonesian Translation
            const indonesianText = indonesianTranslations[chapNum]?.[verseNum] || 'Translation not available';
            const indonesianDiv = document.createElement('div');
            indonesianDiv.classList.add('translation', 'indonesian');
            indonesianDiv.innerText = indonesianText;
            verseDiv.appendChild(indonesianDiv);

            // Create a paragraph element with a link to toggle Tafseer text
            const toggleLink = document.createElement('p');
            toggleLink.innerHTML = `<a href="#" onclick="toggleTafseerText(${verseNum})">See Tafseer</a>`;
            verseDiv.appendChild(toggleLink);

            // Create a div for the Tafseer text
            const tafseerDiv = document.createElement('div');
            tafseerDiv.id = `tafseer-text-${verseNum}`;
            tafseerDiv.classList.add('tafseer-text');
            tafseerDiv.style.display = 'none'; // Initially hidden

            // Append the Tafseer text div to the verseDiv
            verseDiv.appendChild(tafseerDiv);

            verseContainer.appendChild(verseDiv);
        }

        // Fetch Tafseer data
        await fetchTafseerData(chapNum);

        // Set and play audio for the chapter
        setAudioSource(chapNum);

    } catch (error) {
        console.error('Error loading translations:', error);
    } finally {
        // Hide loading indicator
        loadingElement.style.display = 'none';
        // Adjust image sizes after loading
        adjustImageSize();
    }
}

function setAudioSource(chapNum) {
    const audioSources = {
        1: "https://archive.org/download/Quran-English-Bahasa/001%20Al-Fatiha.mp3",
        2: "https://archive.org/download/Quran-English-Bahasa/002%20Al-Baqara.mp3",
        // Add more audio sources here as needed
    };
    
    const audioSource = document.getElementById('audioSource');
    const audioPlayer = document.getElementById('audioPlayer');

    if (audioSources[chapNum]) {
        audioSource.src = audioSources[chapNum];
        audioPlayer.load(); // Load the new source
        audioPlayer.play(); // Optionally play the audio immediately

        // Save audio path to localStorage
        localStorage.setItem('audio-path', audioSource.src);

        // Save audio progress and playing status to localStorage
        audioPlayer.addEventListener('pause', saveAudioProgress);
        audioPlayer.addEventListener('ended', saveAudioProgress);

        // Save audio progress and playing status when the page is unloaded
        window.addEventListener('beforeunload', saveAudioProgress);

        function saveAudioProgress() {
            localStorage.setItem('audio-time', audioPlayer.currentTime);
            localStorage.setItem('audio-playing', audioPlayer.paused ? 'false' : 'true');
        }
    } else {
        console.warn('Audio source not found for chapter', chapNum);
    }
}

document.addEventListener('DOMContentLoaded', generateChapterList);
document.addEventListener('resize', adjustImageSize);

// Sidebar visibility management based on screen size and user preference
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarVisible = localStorage.getItem('sidebar-visible') !== 'false';

    if (window.innerWidth >= 992) {
        sidebar.style.display = sidebarVisible ? 'block' : 'none';
    }

    document.getElementById('toggleSidebar').addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        localStorage.setItem('sidebar-visible', sidebar.style.display === 'block');
    });
});
