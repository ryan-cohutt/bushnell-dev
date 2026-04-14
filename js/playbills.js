// Add as many plays as you want here!
const plays = [
    { 
        title: "WARRIORS DON'T CRY", 
        loc: "Little Rock, Arkansas, 1957", 
        cast: "YOU, Melba, Dottie", 
        desc: "Set in Little Rock, Arkansas in the year 1957. Meet Dottie, a 12 year old student caught in the height of integration.", 
        img: "../visuals-updated/playbill1.png", 
        url: "warriors-map.html" 
    },
    { title: "HAMILTON", loc: "New York, 1776", cast: "Alexander, Aaron Burr", desc: "America's founding father's story through hip-hop.", img: "../visuals-updated/playbill1.png" },
    { title: "THE CRUCIBLE", loc: "Salem, 1692", cast: "John Proctor, Abigail", desc: "A chilling look at the Salem witch trials.", img: "../visuals-updated/playbill1.png" },
    { title: "HADESTOWN", loc: "The Underworld", cast: "Orpheus, Eurydice", desc: "A folk-opera retelling of Greek mythology.", img: "../visuals-updated/playbill1.png" },
    { title: "WICKED", loc: "The Land of Oz", cast: "Elphaba, Glinda", desc: "The untold story of the Witches of Oz.", img: "../visuals-updated/playbill1.png" },
    { title: "LES MISÉRABLES", loc: "France, 1815", cast: "Valjean, Javert", desc: "A story of redemption and revolution.", img: "../visuals-updated/playbill1.png" },
    { title: "DEAR EVAN HANSEN", loc: "Modern Day", cast: "Evan, Zoe, Connor", desc: "A letter that was never meant to be seen.", img: "../visuals-updated/playbill1.png" }
];

const stage = document.getElementById('carouselStage');
let currentIndex = 0;
let cards = [];

function init() {
    plays.forEach((play, index) => {
        const card = document.createElement('div');
        card.className = 'playbill';
        card.innerHTML = `
            <div class="playbill-header caprasimo">PROMPTER</div>
            <div class="playbill-spacer"></div>
            <div class="playbill-img">
                <img src="${play.img}" alt="">
            </div>
        `;
        
        card.onclick = () => {
            if (index === currentIndex) openModal(plays[index]);
            else {
                currentIndex = index;
                updateCarousel();
            }
        };
        stage.appendChild(card);
        cards.push(card);
    });
    updateCarousel();
}

function updateCarousel() {
    const total = plays.length;

    cards.forEach((card, i) => {
        let offset = i - currentIndex;
        
        // Infinite Loop Math: Finds the shortest distance around the circle
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // Spread Math for 5 cards
        const x = offset * 630; // Horizontal spacing
        const radius = 2500;    // Curve intensity
        const y = radius - Math.sqrt(Math.max(0, radius ** 2 - x ** 2));
        const rotation = offset * 14; // Tilt

        // Apply Transform
        card.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
        
        // Dynamic Z-Index so center is always on top
        card.style.zIndex = 100 - Math.abs(Math.round(offset * 10));
        
        // FADE LOGIC: 
        // We show 5 cards (-2, -1, 0, 1, 2). 
        // Anything beyond that (like 2.1 or -2.1) fades out instantly.
        if (Math.abs(offset) > 2.2) {
            card.style.opacity = "0";
            card.style.pointerEvents = "none";
        } else {
            card.style.opacity = "1";
            card.style.pointerEvents = "auto";
        }
    });

    // Update UI elements
    document.getElementById('playTitle').innerText = plays[currentIndex].title;
    document.getElementById('counter').innerText = `${currentIndex + 1}/${total}`;
}

// Modal Interaction
const modal = document.getElementById('modalOverlay');

function openModal(data) {
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalMeta').innerText = data.loc;
    document.getElementById('modalCast').innerText = data.cast;
    document.getElementById('modalDesc').innerText = data.desc;
    document.getElementById('modalImg').innerHTML = `<img src="${data.img}" alt="" class="playbill-popup-img">`;
    
    const playBtn = document.querySelector('.play-button-final');
    playBtn.onclick = () => {
        window.location.href = data.url;
    };
    
    modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }

modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.getElementById('closeBtn').onclick = closeModal;

// Navigation
document.getElementById('nextBtn').onclick = () => {
    currentIndex = (currentIndex + 1) % plays.length;
    updateCarousel();
};

document.getElementById('prevBtn').onclick = () => {
    currentIndex = (currentIndex - 1 + plays.length) % plays.length;
    updateCarousel();
};

init();