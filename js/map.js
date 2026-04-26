// 1. Store your chapter data here
const chapterData = {
    "chapter-1": {
        title: "Regret",
        description: "OUT WITH THE OLD, IN WITH THE NEW",
        book: "Based on Warriors Don't Cry, Chapter 8",
        link: "dottie-intro.html"
    },
    "chapter-2": {
        title: "INNOCENCE",
        description: "Before the integration, everything seemed simpler. Or was it?",
        book: "Based on Warriors Don't Cry, Chapter 8",
        link: ""
    },
    "chapter-3": {
        title: "CONFRONTATION",
        description: "Face the mob at the front gates of the school.",
        book: "Based on Warriors Don't Cry, Chapter 8",
        link: ""
    }
    // Add 4 and 5 here...
};

const popup = document.getElementById('chapter-popup');
const titleEl = document.getElementById('popup-title');
const bookEl = document.getElementById('popup-book');
const descEl = document.getElementById('popup-description');
const linkEl = document.getElementById('popup-link');

// 2. Add one listener to all buttons
document.querySelectorAll('.chapter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent immediate navigation if the button is wrapped in an <a> tag
        const chapterId = btn.id;
        const data = chapterData[chapterId];

        if (data) {
            e.preventDefault(); // Stop the link from firing immediately
            
            // Fill the popup with the right data
            titleEl.textContent = data.title;
            bookEl.textContent = data.book;
            descEl.textContent = data.description;
            linkEl.href = data.link;

            // Show the popup
            popup.classList.add('active');
        }
    });
});

// 3. Close Logic
document.getElementById('close-popup').addEventListener('click', () => {
    popup.classList.remove('active');
});