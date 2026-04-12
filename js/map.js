const chapters = [
    {
        id: "ch1",
        title: "First Day",
        description: "You prepare to enter Central High.",
        type: "chapter",
        image: "visuals/book-1.png",
        completedImage: "visuals/book-1-complete.png",
        position: { col: 1, row: 3 },
        connectsTo: ["ch2"],
        locked: false,
        hidden: false,
        completed: false
    },
    {
        id: "ch2",
        title: "Second Day",
        description: "You prepare to enter Central High.",
        type: "chapter",
        image: "visuals/book-2.png",
        completedImage: "visuals/book-2-complete.png",
        position: { col: 4, row: 3 },
        connectsTo: ["ch3", "archive1"],
        locked: true,
        hidden: false,
        completed: false
    },
    {
        id: "ch3",
        title: "Third Day",
        description: "You prepare to enter Central High.",
        type: "chapter",
        image: "visuals/book-3.png",
        completedImage: "visuals/book-3-complete.png",
        position: { col: 7, row: 4 },
        connectsTo: [],
        locked: true,
        hidden: false,
        completed: false
    },
    {
        id: "archive1",
        title: "Newspaper Coverage",
        description: "Explore archival documents.",
        type: "archive",
        image: "visuals/book.png",
        completedImage: null,
        position: { col: 6, row: 1 },
        connectsTo: [],
        locked: true,
        hidden: false,
        completed: false
    },
    {
        id: "finalMystery",
        title: "???",
        description: "The final reflection.",
        type: "chapter",
        image: "visuals/book.png",
        completedImage: "visuals/book.png",
        position: { col: 4, row: 5 },
        connectsTo: [],
        locked: true,
        hidden: false,
        completed: false
    }
];

const pathImage = "visuals/map-line.png";
const map = document.querySelector(".map");
const svg = document.querySelector(".connections");
const card = document.getElementById("card");

function render() {
  map.innerHTML = "";

  chapters.forEach(ch => {
    if (ch.hidden) return;

    const node = document.createElement("div");
    node.classList.add("node");
    node.style.gridColumn = ch.position.col;
    node.style.gridRow = ch.position.row;
    node.dataset.id = ch.id;

    const img = document.createElement("img");

    if (ch.completed && ch.completedImage && ch.type !== "archive") {
    img.src = ch.completedImage;
    } else {
    img.src = ch.image;
    }

    node.appendChild(img);

    if (ch.locked) node.classList.add("inaccessible");

    map.appendChild(node);
  });

  setTimeout(drawConnections, 50);
}

function drawConnections() {
  svg.innerHTML = "";

  chapters.forEach(ch => {
    ch.connectsTo.forEach(targetId => {
      const target = chapters.find(c => c.id === targetId);
      if (!target || target.hidden) return;

      const fromEl = document.querySelector(`[data-id="${ch.id}"]`);
      const toEl = document.querySelector(`[data-id="${targetId}"]`);
      if (!fromEl || !toEl) return;

      const wrapperRect = document.querySelector(".map-wrapper").getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const x1 = fromRect.left - wrapperRect.left + fromRect.width/2;
      const y1 = fromRect.top - wrapperRect.top + fromRect.height/2;
      const x2 = toRect.left - wrapperRect.left + toRect.width/2;
      const y2 = toRect.top - wrapperRect.top + toRect.height/2;

      const dx = x2 - x1;
      const dy = y2 - y1;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      const img = document.createElementNS("http://www.w3.org/2000/svg", "image");

      img.setAttribute("href", pathImage);
      img.setAttribute("x", x1);
      img.setAttribute("y", y1 - 8); // vertical center adjustment
      img.setAttribute("width", distance);
      img.setAttribute("height", 16);

      img.setAttribute(
        "transform",
        `rotate(${angle}, ${x1}, ${y1})`
      );

      svg.appendChild(img);

      // const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      // line.setAttribute("x1", fromRect.left - wrapperRect.left + fromRect.width/2);
      // line.setAttribute("y1", fromRect.top - wrapperRect.top + fromRect.height/2);
      // line.setAttribute("x2", toRect.left - wrapperRect.left + toRect.width/2);
      // line.setAttribute("y2", toRect.top - wrapperRect.top + toRect.height/2);

      // if (ch.completed) {
      //   line.classList.add("solid");
      // } else {
      //   line.classList.add("dotted");
      // }

      // svg.appendChild(line);
    });
  });
}

function openCard(id) {
  const chapter = chapters.find(c => c.id === id);
  if (chapter.locked) return;

  const node = document.querySelector(`[data-id="${id}"]`);
  const rect = node.getBoundingClientRect();

  card.innerHTML = `
    <div class="close-btn">✕</div>
    <h2>${chapter.title}</h2>
    <p>${chapter.description}</p>
    ${chapter.type === "chapter" ? `<button id="enterBtn">Enter Chapter</button>` : ""}
  `;

  card.style.left = rect.left + window.scrollX - 110 + "px";
  card.style.top = rect.top + window.scrollY - 40 + "px";

  card.classList.add("active");

  document.querySelector(".close-btn").onclick = closeCard;

  if (chapter.type === "chapter") {
    document.getElementById("enterBtn").onclick = (e) => {
      e.stopPropagation();
      if (chapter.id == "ch3") {
        window.location.href = "text-adventure.html"
      } else {
        closeCard();
        completeChapter(id);
      }
    };
  }
}

function closeCard() {
  card.classList.remove("active");
}

function completeChapter(id) {
  const chapter = chapters.find(c => c.id === id);
  chapter.completed = true;

  chapter.connectsTo.forEach(nextId => {
    const next = chapters.find(c => c.id === nextId);
    if (next) {
      next.locked = false;
      next.hidden = false;
    }
  });

  updateFinalChapter();
  setTimeout(() => {
    render();
  }, 0);
}

function updateFinalChapter() {
  const allComplete = chapters
    .filter(c => c.type === "chapter" && c.id !== "finalMystery")
    .every(c => c.completed);

  if (allComplete) {
    const final = chapters.find(c => c.id === "finalMystery");
    final.hidden = false;
    final.locked = false;
  }
}

document.addEventListener("click", e => {
    const node = e.target.closest(".node");

    if (node) {
        const chapter = chapters.find(c => c.id === node.dataset.id);
        if (!chapter.locked) {
            openCard(node.dataset.id);
        }
        return;
    }

    if (!e.target.closest(".card")) {
        closeCard();
    }
});

window.addEventListener("resize", drawConnections);

render();