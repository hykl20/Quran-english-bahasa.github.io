<script>
document.getElementById('audioPlayerContainer').addEventListener('click', function() {
    this.classList.toggle('expanded');
});

// Check if there is a hash in the URL
const hash = window.location.hash;
if (hash && hash !== '#') {
    const chapNum = hash.replace('#', ''); // Extract the chapter number from the hash
    if (!isNaN(chapNum) && chapNum > 0 && chapNum <= 114) {
        // If the hash is valid, don't redirect
        // Call showChapter if the hash is a valid chapter number
        document.addEventListener('DOMContentLoaded', () => showChapter(chapNum));
    } else {
        console.warn('Invalid chapter number in URL hash.');
    }
} else if (window.location.hostname === 'muslim1446.github.io') {
    // Redirect to the specified URL if no valid hash and on the correct domain
    window.location.replace('/sura.html');
}

const chapters = {
    1: { "title": "Al-Fatiha", "verses": 7 },
    2: { "title": "Al-Baqarah", "verses": 286 },
3: { "title": "Aal-E-Imran", "verses": 200 },
    4: { "title": "An-Nisa", "verses": 176 },
    5: { "title": "Al-Ma'idah", "verses": 120 },
    6: { "title": "Al-An'am", "verses": 165 },
    7: { "title": "Al-A'raf", "verses": 206 },
    8: { "title": "Al-Anfal", "verses": 75 },
    9: { "title": "At-Tawbah", "verses": 129 },
    10: { "title": "Yunus", "verses": 109 },
    11: { "title": "Hud", "verses": 123 },
    12: { "title": "Yusuf", "verses": 111 },
    13: { "title": "Ar-Ra'd", "verses": 43 },
    14: { "title": "Ibrahim", "verses": 52 },
    15: { "title": "Al-Hijr", "verses": 99 },
    16: { "title": "An-Nahl", "verses": 128 },
    17: { "title": "Al-Isra", "verses": 111 },
    18: { "title": "Al-Kahf", "verses": 110 },
    19: { "title": "Maryam", "verses": 98 },
    20: { "title": "Ta-Ha", "verses": 135 },
    21: { "title": "Al-Anbiya", "verses": 112 },
    22: { "title": "Al-Hajj", "verses": 78 },
    23: { "title": "Al-Mu'minun", "verses": 118 },
    24: { "title": "An-Nur", "verses": 64 },
    25: { "title": "Al-Furqan", "verses": 77 },
    26: { "title": "Ash-Shu'ara", "verses": 227 },
    27: { "title": "An-Naml", "verses": 93 },
    28: { "title": "Al-Qasas", "verses": 88 },
    29: { "title": "Al-Ankabut", "verses": 69 },
    30: { "title": "Ar-Rum", "verses": 60 },
    31: { "title": "Luqman", "verses": 34 },
    32: { "title": "As-Sajda", "verses": 30 },
    33: { "title": "Al-Ahzab", "verses": 73 },
    34: { "title": "Saba", "verses": 54 },
    35: { "title": "Fatir", "verses": 45 },
    36: { "title": "Ya-Sin", "verses": 83 },
    37: { "title": "As-Saffat", "verses": 182 },
    38: { "title": "Sad", "verses": 88 },
    39: { "title": "Az-Zumar", "verses": 75 },
    40: { "title": "Ghafir", "verses": 85 },
    41: { "title": "Fussilat", "verses": 54 },
    42: { "title": "Ash-Shura", "verses": 53 },
    43: { "title": "Az-Zukhruf", "verses": 89 },
    44: { "title": "Ad-Dukhan", "verses": 59 },
    45: { "title": "Al-Jathiya", "verses": 37 },
    46: { "title": "Al-Ahqaf", "verses": 35 },
    47: { "title": "Muhammad", "verses": 38 },
    48: { "title": "Al-Fath", "verses": 29 },
    49: { "title": "Al-Hujurat", "verses": 18 },
    50: { "title": "Qaf", "verses": 45 },
    51: { "title": "Adh-Dhariyat", "verses": 60 },
    52: { "title": "At-Tur", "verses": 49 },
    53: { "title": "An-Najm", "verses": 62 },
    54: { "title": "Al-Qamar", "verses": 55 },
    55: { "title": "Ar-Rahman", "verses": 78 },
    56: { "title": "Al-Waqia", "verses": 96 },
    57: { "title": "Al-Hadid", "verses": 29 },
    58: { "title": "Al-Mujadila", "verses": 22 },
    59: { "title": "Al-Hashr", "verses": 24 },
    60: { "title": "Al-Mumtahina", "verses": 13 },
    61: { "title": "As-Saff", "verses": 14 },
    62: { "title": "Al-Jumua", "verses": 11 },
    63: { "title": "Al-Munafiqun", "verses": 11 },
    64: { "title": "At-Taghabun", "verses": 18 },
    65: { "title": "At-Talaq", "verses": 12 },
    66: { "title": "At-Tahrim", "verses": 12 },
    67: { "title": "Al-Mulk", "verses": 30 },
    68: { "title": "Al-Qalam", "verses": 52 },
    69: { "title": "Al-Haaqqa", "verses": 52 },
    70: { "title": "Al-Maarij", "verses": 44 },
    71: { "title": "Nuh", "verses": 28 },
    72: { "title": "Al-Jinn", "verses": 28 },
    73: { "title": "Al-Muzzammil", "verses": 20 },
    74: { "title": "Al-Muddathir", "verses": 56 },
    75: { "title": "Al-Qiyama", "verses": 40 },
    76: { "title": "Al-Insan", "verses": 31 },
    77: { "title": "Al-Mursalat", "verses": 50 },
    78: { "title": "An-Naba", "verses": 40 },
    79: { "title": "An-Naziat", "verses": 46 },
    80: { "title": "Abasa", "verses": 42 },
    81: { "title": "At-Takwir", "verses": 29 },
    82: { "title": "Al-Infitar", "verses": 19 },
    83: { "title": "Al-Mutaffifin", "verses": 36 },
    84: { "title": "Al-Inshiqaq", "verses": 25 },
    85: { "title": "Al-Buruj", "verses": 22 },
    86: { "title": "At-Tariq", "verses": 17 },
    87: { "title": "Al-Ala", "verses": 19 },
    88: { "title": "Al-Ghashiya", "verses": 26 },
    89: { "title": "Al-Fajr", "verses": 30 },
    90: { "title": "Al-Balad", "verses": 20 },
    91: { "title": "Ash-Shams", "verses": 15 },
    92: { "title": "Al-Lail", "verses": 21 },
    93: { "title": "Ad-Duha", "verses": 11 },
    94: { "title": "Ash-Sharh", "verses": 8 },
    95: { "title": "At-Tin", "verses": 8 },
    96: { "title": "Al-Alaq", "verses": 19 },
    97: { "title": "Al-Qadr", "verses": 5 },
    98: { "title": "Al-Bayyina", "verses": 8 },
    99: { "title": "Az-Zalzala", "verses": 8 },
    100: { "title": "Al-Adiyat", "verses": 11 },
    101: { "title": "Al-Qaria", "verses": 11 },
    102: { "title": "At-Takathur", "verses": 8 },
    103: { "title": "Al-Asr", "verses": 3 },
    104: { "title": "Al-Humaza", "verses": 9 },
    105: { "title": "Al-Fil", "verses": 5 },
    106: { "title": "Quraish", "verses": 4 },
    107: { "title": "Al-Ma'un", "verses": 7 },
    108: { "title": "Al-Kawthar", "verses": 3 },
    109: { "title": "Al-Kafirun", "verses": 6 },
    110: { "title": "An-Nasr", "verses": 3 },
    111: { "title": "Al-Masad", "verses": 5 },
    112: { "title": "Al-Ikhlas", "verses": 4 },
    113: { "title": "Al-Falaq", "verses": 5 },
    114: { "title": "An-Nas", "verses": 6 }
    // Add other chapters as needed
};

const englishXMLUrl = 'https://blue-carlina-25.tiiny.site/quran_xml/en-sahih.xml';
const indonesianXMLUrl = 'https://blue-carlina-25.tiiny.site/quran_xml/id-indonesian.xml';
const arabic = {
    "1": { "title": "الفاتِحة" },
    "2": { "title": "البَقَرَة" },
 "3": { "title": "آل عِمْرَان" },
  "4": { "title": "النِّسَاء" },
  "5": { "title": "المَائِدَة" },
  "6": { "title": "الأَنْعَام" },
  "7": { "title": "الأعْرَاف" },
  "8": { "title": "الأنْفَال" },
  "9": { "title": "التَّوْبَة" },
  "10": { "title": "يُونُس" },
  "11": { "title": "هُود" },
  "12": { "title": "يُوسُف" },
  "13": { "title": "الرَّعْد" },
  "14": { "title": "إِبْرَاهِيم" },
  "15": { "title": "الحِجْر" },
  "16": { "title": "النَّحْل" },
  "17": { "title": "الإِسْرَاء" },
  "18": { "title": "الكَهْف" },
  "19": { "title": "مَرْيَم" },
  "20": { "title": "طَه" },
  "21": { "title": "الأنْبِيَاء" },
  "22": { "title": "الحَجّ" },
  "23": { "title": "المُؤْمِنُون" },
  "24": { "title": "النُّور" },
  "25": { "title": "الفرْقَان" },
  "26": { "title": "الشُّعَرَاء" },
  "27": { "title": "النَّمْل" },
  "28": { "title": "القصَص" },
  "29": { "title": "العَنْكَبُوت" },
  "30": { "title": "الرُّوم" },
  "31": { "title": "لقْمَان" },
  "32": { "title": "السَّجْدَة" },
  "33": { "title": "الأحْزَاب" },
  "34": { "title": "سبَإ" },
  "35": { "title": "فَاطِر" },
  "36": { "title": "يَس" },
  "37": { "title": "الصَّافَّات" },
  "38": { "title": "ص" },
  "39": { "title": "الزُّمر" },
  "40": { "title": "غَافِر" },
  "41": { "title": "فُصِّلَت" },
  "42": { "title": "الشُّورَى" },
  "43": { "title": "الزُّخْرُف" },
  "44": { "title": "الدُّخَان" },
  "45": { "title": "الجَاثِيَة" },
  "46": { "title": "الأحْقَاف" },
  "47": { "title": "مُحَمَّد" },
  "48": { "title": "الفتح" },
  "49": { "title": "الحُجُرات" },
  "50": { "title": "ق" },
  "51": { "title": "الذَّارِيَات" },
  "52": { "title": "الطُّور" },
  "53": { "title": "النَّجْم" },
  "54": { "title": "القَمَر" },
  "55": { "title": "الرحْمَـن" },
  "56": { "title": "الواقِعَة" },
  "57": { "title": "الْحَدِيد" },
  "58": { "title": "المُجَادَلَة" },
  "59": { "title": "الحَشْر" },
  "60": { "title": "المُمْتَحَنَة" },
  "61": { "title": "الصَّفّ" },
  "62": { "title": "الْجُمُعَة" },
  "63": { "title": "المُنَافِقُون" },
  "64": { "title": "التَّغَابُن" },
  "65": { "title": "الطَّلاق" },
  "66": { "title": "التحْرِيم" },
  "67": { "title": "الْمُلْك" },
  "68": { "title": "الْقَلَم" },
  "69": { "title": "الْحَاقَّة" },
  "70": { "title": "المَعَارِج" },
  "71": { "title": "نُوح" },
  "72": { "title": "الْجِنّ" },
  "73": { "title": "المُزَّمِّل" },
  "74": { "title": "الْمُدَّثِّر" },
  "75": { "title": "الْقِيَامَة" },
  "76": { "title": "الإنْسَان" },
  "77": { "title": "الْمُرْسَلَات" },
  "78": { "title": "النَبَإ" },
  "79": { "title": "النَّازِعَات" },
  "80": { "title": "عَبَس" },
  "81": { "title": "التَّكْوِير" },
  "82": { "title": "الإنْفِطَار" },
  "83": { "title": "المُطَفِّفِين" },
  "84": { "title": "الإنْشِقَاق" },
  "85": { "title": "البُرُوج" },
  "86": { "title": "الطَّارِق" },
  "87": { "title": "الأعلى" },
  "88": { "title": "الْغَاشِيَة" },
  "89": { "title": "الفَجْر" },
  "90": { "title": "الْبَلَد" },
  "91": { "title": "الشَّمْس" },
  "92": { "title": "الليل" },
  "93": { "title": "الضُّحَى" },
  "94": { "title": "الشَّرْح" },
  "95": { "title": "التِّين" },
  "96": { "title": "الْعَلَق" },
  "97": { "title": "الْقَدْر" },
  "98": { "title": "الْبَيِّنَة" },
  "99": { "title": "الزلزَلَة" },
  "100": { "title": "العَادِيَات" },
  "101": { "title": "الْقَارِعَة" },
  "102": { "title": "التَّكَاثُر" },
  "103": { "title": "الْعَصْر" },
  "104": { "title": "الْهُمَزَة" },
  "105": { "title": "الفِيل" },
  "106": { "title": "قُرَيْش" },
  "107": { "title": "الْمَاعُون" },
  "108": { "title": "الْكَوْثَر" },
  "109": { "title": "الْكَافِرُون" },
  "110": { "title": "النَّصْر" },
  "111": { "title": "الْمَسَد" },
  "112": { "title": "الإِخْلَاص" },
  "113": { "title": "الفَلَق" },
  "114": { "title": "النَّاس" }
    // Add other chapters as needed
};

const arabicmean = {
    1: { "title": "The Opening" },
    2: { "title": "The Cow" },
   3: { "title": "The Family of Imran" },
      4: { "title": "The Women" },
5: { "title": "The Table Spread" },
6: { "title": "The Cattle" },
7: { "title": "The Heights" },
8: { "title": "The Spoils of War" },
9: { "title": "The Repentance" },
10: { "title": "Jonah" },
11: { "title": "Hud" },
12: { "title": "Joseph" },
13: { "title": "The Thunder" },
14: { "title": "Abraham" },
15: { "title": "The Rocky Tract" },
16: { "title": "The Bee" },
17: { "title": "The Night Journey" },
18: { "title": "The Cave" },
19: { "title": "Mary" },
20: { "title": "Ta-Ha" },
21: { "title": "The Prophets" },
22: { "title": "The Pilgrimage" },
23: { "title": "The Believers" },
24: { "title": "The Light" },
25: { "title": "The Criterion" },
26: { "title": "The Poets" },
27: { "title": "The Ant" },
28: { "title": "The Stories" },
29: { "title": "The Spider" },
30: { "title": "The Romans" },
31: { "title": "Luqman" },
32: { "title": "The Prostration" },
33: { "title": "The Combined Forces" },
34: { "title": "Sheba" },
35: { "title": "The Originator" },
36: { "title": "Ya-Sin" },
37: { "title": "Those who set the Ranks" },
38: { "title": "Sad" },
39: { "title": "The Groups" },
40: { "title": "The Forgiver" },
41: { "title": "Explained in Detail" },
42: { "title": "The Consultation" },
43: { "title": "The Gold Adornments" },
44: { "title": "The Smoke" },
45: { "title": "The Crouching" },
46: { "title": "The Wind-Curved Sandhills" },
47: { "title": "Muhammad" },
48: { "title": "The Victory" },
49: { "title": "The Rooms" },
50: { "title": "Qaf" },
51: { "title": "The Winnowing Winds" },
52: { "title": "The Mount" },
53: { "title": "The Star" },
54: { "title": "The Moon" },
55: { "title": "The Beneficent" },
56: { "title": "The Inevitable" },
57: { "title": "The Iron" },
58: { "title": "The Pleading Woman" },
59: { "title": "The Exile" },
60: { "title": "She that is to be Examined" },
61: { "title": "The Ranks" },
62: { "title": "The Congregation" },
63: { "title": "The Hypocrites" },
64: { "title": "The Mutual Disillusion" },
65: { "title": "The Divorce" },
66: { "title": "The Prohibition" },
67: { "title": "The Sovereignty" },
68: { "title": "The Pen" },
69: { "title": "The Reality" },
70: { "title": "The Ascending Stairways" },
71: { "title": "Noah" },
72: { "title": "The Jinn" },
73: { "title": "The Enshrouded One" },
74: { "title": "The Cloaked One" },
75: { "title": "The Resurrection" },
76: { "title": "Man" },
77: { "title": "The Emissaries" },
78: { "title": "The Tidings" },
79: { "title": "Those who Drag Forth" },
80: { "title": "He Frowned" },
81: { "title": "The Overthrowing" },
82: { "title": "The Cleaving" },
83: { "title": "Defrauding" },
84: { "title": "The Splitting Open" },
85: { "title": "The Mansions of the Stars" },
86: { "title": "The Morning Star" },
87: { "title": "The Most High" },
88: { "title": "The Overwhelming" },
89: { "title": "The Dawn" },
90: { "title": "The City" },
91: { "title": "The Sun" },
92: { "title": "The Night" },
93: { "title": "The Morning Hours" },
94: { "title": "The Relief" },
95: { "title": "The Fig" },
96: { "title": "The Clot" },
97: { "title": "The Power" },
98: { "title": "The Clear Proof" },
99: { "title": "The Earthquake" },
100: { "title": "The Courser" },
101: { "title": "The Calamity" },
102: { "title": "The Rivalry in Worldly Increase" },
103: { "title": "The Declining Day" },
104: { "title": "The Traducer" },
105: { "title": "The Elephant" },
106: { "title": "Quraysh" },
107: { "title": "The Small Kindnesses" },
108: { "title": "The Abundance" },
109: { "title": "The Disbelievers" },
110: { "title": "The Divine Support" },
111: { "title": "The Palm Fiber" },
112: { "title": "The Sincerity" },
113: { "title": "The Daybreak" },
114: { "title": "The Mankind" }
    // Add other chapters as needed
};

function generateChapterList() {
    const chaptersList = document.getElementById('chapters-list');
    Object.keys(chapters).forEach(chapNum => {
        const chapter = chapters[chapNum];
        const chapterDiv = document.createElement('div');
        chapterDiv.classList.add('chapter');
        chapterDiv.innerText = `${chapNum}.  ${chapter.title} (${chapter.verses} ayahs)`;
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
        const ayas = sura.getElementsByTagName('aya');
        translations[index] = {};
        for (let aya of ayas) {
            const verseIndex = aya.getAttribute('index');
            const text = aya.getAttribute('text');
            translations[index][verseIndex] = text;
        }
    }
    return translations;
}

function adjustImageSize() {
    const images = document.querySelectorAll('.arabic-image');
    images.forEach(img => {
        if (window.innerWidth < 768) {
            img.style.width = '100%'; // Full width for mobile
            img.style.height = 'auto'; // Maintain aspect ratio
        } else {
            img.style.width = 'auto'; // Default width for desktop
            img.style.height = 'auto'; // Maintain aspect ratio
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Check if there is a hash in the URL
    const hash = window.location.hash;
    if (hash) {
        const chapNum = hash.replace('#', ''); // Extract the chapter number from the hash
        if (!isNaN(chapNum) && chapNum > 0 && chapNum <= 114) {
            // Call showChapter if the hash is a valid chapter number
            showChapter(chapNum);
        } else {
            console.warn('Invalid chapter number in URL hash.');
        }
    }
});

async function showChapter(chapNum) {
    const chapterTitleElement = document.getElementById('chapter-title');
    const bismillahContainer = document.getElementById('bismillah-container');
    if (chapters[chapNum]) {
        // Update the page title
        document.title = `Surah ${chapters[chapNum].title} - The Noble Qur'an`;

        chapterTitleElement.innerHTML = `
            Surah ${chapNum}: ${chapters[chapNum].title}  <a class="cback" href="/sura" target="_self">Back</a>
            <div id="title-container"><a class="cback" href="tafseer/?sura=${chapNum}" target="_self">See Tafseer</a>
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
        `;
         }

        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'block';

        try {
            const [englishXML, indonesianXML] = await Promise.all([
                fetchXML(englishXMLUrl),
                fetchXML(indonesianXMLUrl)
            ]);

            const englishTranslations = parseXML(englishXML);
            const indonesianTranslations = parseXML(indonesianXML);

            const verseContainer = document.getElementById('verse-container');
            verseContainer.innerHTML = '';

            for (let verseNum = 1; verseNum <= chapters[chapNum].verses; verseNum++) {
                const verseDiv = document.createElement('div');
                verseDiv.classList.add('verse');
                verseDiv.id = `verse-${verseNum}`;

                // Arabic PNG
                const arabicImg = document.createElement('img');
      
