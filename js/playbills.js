const deck = document.getElementById('deck');
const cards = [...deck.querySelectorAll('.playbill')];

const MAX_ROTATION = 35;   // degrees
const MAX_SPREAD_X = 660; // px
const ARC_DEPTH = 210;     // px (edge drop)

const nextButton = document.getElementById('nextButton');
let activeUrl = null;

let activeIndex = null;

function layoutCards() {
  const count = cards.length;
  const center = (count - 1) / 2;

  cards.forEach((card, i) => {
    const t = center === 0 ? 0 : (i - center) / center;

    const rotation = t * MAX_ROTATION;
    const x = t * MAX_SPREAD_X;

    // quadratic curve for vertical arc
    const y = ARC_DEPTH * (t * t);

    card.style.setProperty('--r', `${rotation}deg`);
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
}


function toggleActive(index) {
  if (activeIndex === index) {
    activeIndex = null;
    activeUrl = null;
  } else {
    activeIndex = index;
    activeUrl = cards[index].dataset.url;
  }

  cards.forEach((card, i) => {
    card.classList.toggle('active', i === activeIndex);
  });

  deck.classList.toggle('deck-active', activeIndex !== null);

  nextButton.disabled = activeIndex === null;
  nextButton.textContent = activeIndex === null
  ? 'Select a playbill'
  : 'View details →';

}

nextButton.addEventListener('click', () => {
  if (!activeUrl) return;

  // later: replace this with your page transition system
  window.location.href = activeUrl;
});

cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    toggleActive(i);
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleActive(i);
    }
  });
});


function navigateTo(index) {
  console.log('Navigate to play:', index);
  // your page transition logic here
}

layoutCards();
