document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && !isNaN(hash) && hash > 0 && hash <= 114) {
        showChapter(hash);
    } else if (window.location.hostname === 'muslim1446.github.io') {
        window.location.replace('/sura.html');
    }
});

// Define chapters and translations
const chapters = {
    1: { title: "Al-Fatiha", verses: 7 },
    2: { title: "Al-Baqarah", verses: 286 },
    // Add other chapters as needed
};

const arabic = {
    "1": { title: "الفاتِحة" },
    "2": { title: "البَقَرَة" },
    // Add other chapters as needed
};

const arabicmean = {
    1: { title: "The Opening" },
    2: { title: "The Cow" },
    // Add other chapters as needed
};

// URLs for XML data
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
        chapterDiv.addEventListener('click', () => showChapter(chapNum));

        Object.assign(chapterDiv.style, {
            fontFamily: "'Young Serif', serif",
            borderRadius: '10px',
            color: '#ffffff',
            padding: '10px',
            margin: '5px 0'
        });

        chaptersList.appendChild(chapterDiv);
    });
}

// Fetch XML data
async function fetchXML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        const parser = new DOMParser();
        return parser.parseFromString(text, 'text/xml');
    } catch (error) {
        console.error(`Error fetching XML from ${url}:`, error);
        return null;
    }
}

// Parse XML data into a usable format
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

// Fetch Tafseer data
async function fetchTafseerData(chapNum) {
    try {
        const response = await fetch(`https://equran.id/api/v2/tafsir/${chapNum}`);
        const data = await response.json();
        if (data.code === 200) {
            data.data.tafsir.forEach(tafsir => {
                const tafseerTextDiv = document.getElementById(`tafseer-text-${tafsir.ayat}`);
                if (tafsseerTextDiv) {
                    tafseerTextDiv.innerHTML = `<p>${tafsir.teks}</p>`;
                }
            });
        } else {
            console.error('Tafseer data not available.');
        }
    } catch (error) {
        console.error('Error fetching tafseer data:', error);
    }
}

// Fetch TafseerEN data
async function fetchTafseerENData(chapNum) {
    try {
        for (let verseNum = 1; verseNum <= chapters[chapNum].verses; verseNum++) {
            const response = await fetch(`https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/en-tafisr-ibn-kathir/${chapNum}/${verseNum}.json`);
            if (response.ok) {
                const data = await response.json();
                if (data.ayah) {
                    const tafseerENTextDiv = document.getElementById(`tafseerEN-text-${verseNum}`);
                    if (tafsseerENTextDiv) {
                        tafseerENTextDiv.innerHTML = `<p>${data.text}</p>`;
                    }
                } else {
                    console.error(`TafseerEN data not available for verse ${verseNum}.`);
                }
            } else {
                console.error(`Error fetching TafseerEN data for verse ${verseNum}:`, response.status);
            }
        }
    } catch (error) {
        console.error('Error fetching TafseerEN data:', error);
    }
}

// Toggle text visibility
function toggleText(id) {
    const textElement = document.getElementById(id);
    if (textElement) {
        textElement.style.display = textElement.style.display === 'none' || textElement.style.display === '' ? 'block' : 'none';
    }
}

// Adjust image size based on viewport width
function adjustImageSize() {
    const images = document.querySelectorAll('.arabic-image');
    images.forEach(img => {
        img.style.width = window.innerWidth < 768 ? '100%' : 'auto';
        img.style.height = 'auto';
    });
}

// Show chapter details
async function showChapter(chapNum) {
    const chapterTitleElement = document.getElementById('chapter-title');
    const verseContainer = document.getElementById('verse-container');
    const loadingElement = document.getElementById('loading');

    if (!chapters[chapNum]) {
        console.warn('Invalid chapter number:', chapNum);
        return;
    }

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

    loadingElement.style.display = 'block';

    try {
        const [englishXML, indonesianXML] = await Promise.all([
            fetchXML(englishXMLUrl),
            fetchXML(indonesianXMLUrl)
        ]);

        const englishTranslations = parseXML(englishXML);
        const indonesianTranslations = parseXML(indonesianXML);

        verseContainer.innerHTML = '';

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

            // Tafseer Links
            const toggleLink = document.createElement('p');
            toggleLink.innerHTML = `<a href="#" onclick="toggleText('tafseer-text-${verseNum}')">View Tafseer</a>`;
            verseDiv.appendChild(toggleLink);

            const tafseerDiv = document.createElement('div');
            tafseerDiv.id = `tafseer-text-${verseNum}`;
            tafseerDiv.classList.add('tafseer-text');
            tafseerDiv.style.display = 'none';
            verseDiv.appendChild(tafseerDiv);

            const toggleLinkEN = document.createElement('p');
            toggleLinkEN.innerHTML = `<a href="#" onclick="toggleText('tafseerEN-text-${verseNum}')">View TafseerEN</a>`;
            verseDiv.appendChild(toggleLinkEN);

            const tafseerENDiv = document.createElement('div');
            tafseerENDiv.id = `tafseerEN-text-${verseNum}`;
            tafseerENDiv.classList.add('tafseerEN-text');
            tafseerENDiv.style.display = 'none';
            verseDiv.appendChild(tafseerENDiv);

            verseContainer.appendChild(verseDiv);
        }

        await fetchTafseerData(chapNum);
        await fetchTafseerENData(chapNum);
        setAudioSource(chapNum);

    } catch (error) {
        console.error('Error loading translations:', error);
    } finally {
        loadingElement.style.display = 'none';
        adjustImageSize();
    }
}

// Set audio source and playback
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
        audioPlayer.load();
        audioPlayer.play();

        localStorage.setItem('audio-path', audioSource.src);

        audioPlayer.addEventListener('pause', saveAudioProgress);
        audioPlayer.addEventListener('ended', saveAudioProgress);
        window.addEventListener('beforeunload', saveAudioProgress);

        function saveAudioProgress() {
            localStorage.setItem('audio-time', audioPlayer.currentTime);
            localStorage.setItem('audio-playing', audioPlayer.paused ? 'false' : 'true');
        }
    }
}

// Expand audio player container
document.getElementById('audioPlayerContainer').addEventListener('click', function() {
    this.classList.toggle('expanded');
});
