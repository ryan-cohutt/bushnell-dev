/*
 * Chapter Map
 * -----------
 * This file powers the Warriors Don't Cry chapter selection screen.
 * Each chapter id must match a JSON file in data/chapters/ with the same name:
 * chapter-1 -> data/chapters/chapter-1.json.
 *
 * To add a new chapter:
 * - Add a button in warriors-map.html with id="chapter-x".
 * - Add its metadata below.
 * - Create data/chapters/chapter-x.json with a startScene and scenes object.
 */

const chapterData = {
    'chapter-1': {
        title: 'Regret',
        description: 'OUT WITH THE OLD, IN WITH THE NEW',
        book: "Based on Warriors Don't Cry, Chapter 8"
    },
    'chapter-2': {
        title: 'Innocence',
        description: 'Before the integration, everything seemed simpler. Or was it?',
        book: "Based on Warriors Don't Cry, Chapter 8"
    },
    'chapter-3': {
        title: 'Confrontation',
        description: 'Face the mob at the front gates of the school.',
        book: "Based on Warriors Don't Cry, Chapter 8"
    },
    'chapter-4': {
        title: 'Chapter 4',
        description: 'Placeholder chapter path. Add story scenes in data/chapters/chapter-4.json.',
        book: "Based on Warriors Don't Cry"
    },
    'chapter-5': {
        title: 'Chapter 5',
        description: 'Placeholder chapter path. Add story scenes in data/chapters/chapter-5.json.',
        book: "Based on Warriors Don't Cry"
    }
};

const popup = document.getElementById('chapter-popup');
const titleEl = document.getElementById('popup-title');
const bookEl = document.getElementById('popup-book');
const descEl = document.getElementById('popup-description');
const linkEl = document.getElementById('popup-link');

/* The adventure page reads this query parameter and fetches the matching JSON
 * file, so chapter ids should stay URL-safe and match their data filenames.
 */
function getChapterUrl(chapterId) {
    return `text-adventure.html?chapter=${encodeURIComponent(chapterId)}`;
}

function openChapterPopup(chapterId) {
    const data = chapterData[chapterId];
    if (!data) return;

    titleEl.textContent = data.title;
    bookEl.textContent = data.book;
    descEl.textContent = data.description;
    linkEl.href = getChapterUrl(chapterId);
    linkEl.dataset.chapterId = chapterId;
    popup.classList.add('active');
}

/* Map interactions. Chapter buttons only open the preview popup; the PLAY link
 * is where the selected chapter is saved and navigation actually happens.
 */
document.querySelectorAll('.chapter-btn').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        openChapterPopup(button.id);
    });
});

linkEl.addEventListener('click', () => {
    localStorage.setItem('selectedChapter', linkEl.dataset.chapterId || 'chapter-1');
});

document.getElementById('close-popup').addEventListener('click', () => {
    popup.classList.remove('active');
});

const saveBtn = document.querySelector('#save-settings');
const panel = document.querySelector('#settings-panel');
const openBtn = document.querySelector('#settings-btn');

openBtn.addEventListener('click', () => {
    panel.classList.add('is-open');
});

saveBtn.addEventListener('click', () => {
    panel.classList.remove('is-open');
});
