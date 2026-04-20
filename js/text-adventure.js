// --- 1. THE STORY DATA (Your "Twine" Map) ---
const storyData = {
    "start": {
        text: `The words feel heavy. 
Integration might be stopped. 
Maybe all of this suffering would be for nothing.
Melba folds the paper slowly. The house feels unusually quiet. 
`,
        bg: "visuals-updated/living-room.png",
        options: [],
        showNext: true,
        nextScene: "phone_call"
    },
    "phone_call": {
        text: `Melba sinks into the couch. 
She wants to talk to someone. 
She doesn't want to think about the news. She wants a normal day to herself. 
The phone sits on the small table beside her. 
Who should Melba call?`,
        bg: "visuals-updated/phone.png",
        options: [
            { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            { title: "Mr. Patillo", desc: "Melba's Dad", target: "call_dad" },
            { title: "Marsha", desc: "Melba's Best Friend", target: "call_marsha" }
        ],
        showNext: false,
    },
    "call_marsha": {
        text: "Melba dials Marsha’s number. The phone rings twice. Marsha answers. Her voice sounds distant, music and laughter drowning her voice out. “Oh… hi, Melba.” Melba asks what she is doing tonight. Marsha hesitates. “Well… some people are over for dinner. Just a few of our friends.” Old friends. Friends she used to spend weekends with. She waits. But Marsha does not invite her.",
        bg: "visuals-updated/phone.png",
        options: [],
        showNext: true,
        nextScene: "call_cont"
    },
    "call_cont": {
        text: "“We’re afraid of being attacked with all the integration news going on with you. What if they bomb us to get back to you?” The silence stretches. “Well… I gotta go,” Marsha says quickly. The line clicks. Melba slowly hangs up. The rejection stings worse than she expected. Who should Melba call next?",
        bg: "visuals-updated/phone.png",
        options: [
            { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: false,
        // nextScene: ""
    },
    "call_alice": {
        text: "Melba decides to try Alice, one of her old friends. There is no answer. Melba dials several other numbers. One after another. No answers. Later she realizes why. They are all at Marsha’s dinner party. Without her.",
        bg: "visuals-updated/phone.png",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_mom"
    },
    "melba_mom": {
        text: "Melba’s mother walks into the room. She can see the sadness on Melba’s face. “Your friends are short-sighted,” she says gently. They can’t see the future. You have to do this thing because you are convinced it is right for you, not for what others will think.” Melba says “But I don’t want to lose all my friends”. “Let’s have a family date, right here at home.” Her mother brings popcorn. Soon they are playing games together at the table. For a little while, Melba forgets the newspaper headlines. ",
        bg: "visuals-updated/living-room.png",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_mom"
    },
};

// --- 2. THE ENGINE LOGIC ---
let isTyping = false;
let skipTyping = false;

// --- 1. TYPEWRITER WITH SKIP LOGIC ---
async function typeWriter(text, element, speed = 30) {
    isTyping = true;
    skipTyping = false; // Reset skip flag at start
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
        // If the user clicked a button while we were loop-typing
        if (skipTyping) {
            element.textContent = text; // Instantly show full text
            isTyping = false;
            skipTyping = false;
            return; // Exit the loop
        }

        element.textContent += text[i];
        await new Promise(r => setTimeout(r, speed));
    }
    isTyping = false;
}

// --- 2. THE RENDER ENGINE ---
function renderScene(sceneId) {
    const scene = storyData[sceneId];
    if (!scene) return;

    document.getElementById('bg-img').src = scene.bg;

    const textEl = document.getElementById('adventure-text');
    typeWriter(scene.text, textEl);

    // --- NEXT BUTTON LOGIC ---
    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = scene.showNext ? "block" : "none";
    
    nextBtn.onclick = () => {
        if (isTyping) {
            skipTyping = true; // First click: Skip
        } else {
            renderScene(scene.nextScene); // Second click: Move on
        }
    };

    // --- OPTIONS LOGIC ---
    const optionsCont = document.getElementById('options-container');
    optionsCont.innerHTML = "";

    scene.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "text-option";
        btn.innerHTML = `<h1 class="capriola">${opt.title}</h1><p class="capriola">${opt.desc}</p>`;
        
        btn.onclick = () => {
            if (isTyping) {
                skipTyping = true; // First click: Skip
            } else {
                renderScene(opt.target); // Second click: Move on
            }
        };
        optionsCont.appendChild(btn);
    });
}

// --- 3. INTRO TRANSITIONS ---
const startBtn = document.getElementById('start-adventure');
const introOverlay = document.getElementById('intro-overlay');
const mainUI = document.getElementById('main-ui');

startBtn.addEventListener('click', () => {
    // Slide Down Intro
    introOverlay.style.transform = "translateY(100%)";
    
    setTimeout(() => {
        introOverlay.style.display = "none";
        // Fade In Game
        mainUI.style.opacity = "1";
        mainUI.style.pointerEvents = "auto";
        renderScene("start"); // Kick off the first scene
    }, 600); // Matches CSS transition time
});



const options = document.querySelectorAll('.text-option');

options.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Check if the clicked button is already selected
        const isSelected = button.classList.contains('selected');

        // 2. Remove 'selected' class from ALL buttons (the reset)
        options.forEach(opt => opt.classList.remove('selected'));

        // 3. If it wasn't selected before, select it now
        // If it WAS selected, it stays unselected because of the reset above
        if (!isSelected) {
            button.classList.add('selected');
        }
    });
});