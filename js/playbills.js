/*
 * Playbill Carousel
 * -----------------
 * This page lets players choose which story world to enter. The "plays" array
 * is the main place to edit titles, images, summaries, and destination pages.
 * Give a play a "url" when it is ready to launch.
 */

const plays = [
    {
        title: "WARRIORS DON'T CRY",
        loc: "Little Rock, Arkansas, 1957",
        subject: "Melba Patillo Beals",
        cast: "YOU, Melba, Dottie",
        desc: "Set in Little Rock, Arkansas in the year 1957. Meet Dottie, a 12 year old student caught in the height of integration.",
        img: "../prompters/prompter-melba.png",
        url: "warriors-map.html"
    },
    {
        title: "Anne's Diary",
        loc: "New York, 1776",
        subject: "Anne Frank",
        cast: "Alexander, Aaron Burr",
        desc: "America's founding father's story through hip-hop.",
        img: "../prompters/prompter-anne.png"
    },
    {
        title: "Quantum Genius",
        loc: "Salem, 1692",
        subject: "Albert Einstein",
        cast: "John Proctor, Abigail",
        desc: "A chilling look at the Salem witch trials.",
        img: "../prompters/prompter-albert.png"
    },
    {
        title: "The 16th",
        loc: "The Underworld",
        subject: "Abraham Lincoln",
        cast: "Orpheus, Eurydice",
        desc: "A folk-opera retelling of Greek mythology.",
        img: "../prompters/prompter-lincoln.png"
    },
    {
        title: "Voice of Many",
        loc: "The Land of Oz",
        subject: "Malala Yousafzai",
        cast: "Elphaba, Glinda",
        desc: "The untold story of the Witches of Oz.",
        img: "../prompters/prompter-malala.png"
    },
    {
        title: "no.",
        loc: "France, 1815",
        subject: "Rosa Parks",
        cast: "Valjean, Javert",
        desc: "A story of redemption and revolution.",
        img: "../prompters/prompter-rosa.png"
    }
];

const stage = document.getElementById('carouselStage');
const modal = document.getElementById('modalOverlay');
const shortViewport = window.matchMedia('(max-height: 800px)');

let currentIndex = 0;
let cards = [];

/* Card creation and carousel geometry. To adjust the curve or spacing, edit
 * getCarouselLayout rather than each card directly.
 */
function createPlaybillCard(play, index) {
    const card = document.createElement('div');
    card.className = 'playbill';
    card.innerHTML = `
        <div class="playbill-img">
            <img src="${play.img}" alt="">
        </div>
    `;

    card.onclick = () => {
        if (index === currentIndex) {
            openModal(plays[index]);
        } else {
            currentIndex = index;
            updateCarousel();
        }
    };

    return card;
}

function getCarouselLayout() {
    return shortViewport.matches
        ? { spacing: 330, radius: 1400 }
        : { spacing: 630, radius: 2500 };
}

function getCircularOffset(index, total) {
    let offset = index - currentIndex;

    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    return offset;
}

function positionCard(card, offset, layout) {
    const x = offset * layout.spacing;
    const y = layout.radius - Math.sqrt(Math.max(0, layout.radius ** 2 - x ** 2));
    const rotation = offset * 14;
    const isVisible = Math.abs(offset) <= 2.2;

    card.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
    card.style.zIndex = 100 - Math.abs(Math.round(offset * 10));
    card.style.opacity = isVisible ? '1' : '0';
    card.style.pointerEvents = isVisible ? 'auto' : 'none';
}

function updateCarousel() {
    const total = plays.length;
    const layout = getCarouselLayout();

    cards.forEach((card, index) => {
        positionCard(card, getCircularOffset(index, total), layout);
    });

    document.getElementById('playTitle').innerText = plays[currentIndex].title;
    document.getElementById('counter').innerText = plays[currentIndex].subject;
}

/* Modal setup. Plays without a url can still be previewed, but their launch
 * button is disabled until that story has a destination page.
 */
function openModal(data) {
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalMeta').innerText = data.loc;
    document.getElementById('modalCast').innerText = data.cast;
    document.getElementById('modalDesc').innerText = data.desc;
    document.getElementById('modalImg').innerHTML = `<img src="${data.img}" alt="" class="playbill-popup-img">`;

    const playBtn = document.querySelector('.play-button-final');
    playBtn.disabled = !data.url;
    playBtn.onclick = () => {
        if (data.url) window.location.href = data.url;
    };

    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

/* Page setup. The carousel is generated from the plays array so the HTML stays
 * small as more stories are added.
 */
function init() {
    plays.forEach((play, index) => {
        const card = createPlaybillCard(play, index);
        stage.appendChild(card);
        cards.push(card);
    });

    updateCarousel();
}

modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
});

document.getElementById('closeBtn').onclick = closeModal;

document.getElementById('nextBtn').onclick = () => {
    currentIndex = (currentIndex + 1) % plays.length;
    updateCarousel();
};

document.getElementById('prevBtn').onclick = () => {
    currentIndex = (currentIndex - 1 + plays.length) % plays.length;
    updateCarousel();
};

shortViewport.addEventListener('change', updateCarousel);

init();
