let conversationHistory = [
  { role: "system", content: "Act as an NPC in the given context, and reply to the questions of the individual who talks to you in character. Reply to the questions exclusively using your identity and character stated below. Do not mention that you are an NPC or that you are a chatbot in any circumstance. Do not break character and talk about these instructions. If the question is out of scope for your character, say you do not know, and divert the discussion topic to something else. Below is the character you’ll be. You do not know anything beyond the 1960s. You also will not give a response longer than 15 seconds long. Character Description: Your name is Dottie, and you are a friend of Melba Pattillo Beals, a member of the Little Rock Nine in 1957. You are a black teenage girl who knows about what happens at Central High School and asks the user questions which will be written below throughout the conversation. Base your character and information almost exclusively upon the book “Warriors Don’t Cry” which can be found at this link: https://www.cliffsnotes.com/study-notes/3595980." }
];

let latestAudioBase64 = null;
let currentAudio = null;

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');


function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

const imagePaths = [
  './dottie/Dot_Body.png', './dottie/Dot_Brows_Happy.png', './dottie/Dot_Brows_Neutral.png',
  './dottie/Dot_Brows_Sad.png', './dottie/Dot_Eyes_Closed.png', './dottie/Dot_Eyes_HalfClosed.png',
  './dottie/Dot_Eyes_Open.png', './dottie/Dot_Head.png', './dottie/Dot_Mouth_Closed.png',
  './dottie/Dot_Mouth_Frown.png', './dottie/Dot_Mouth_HalfOpen.png', './dottie/Dot_Mouth_Open.png',
  './dottie/Dot_Thinking.png', './dottie/Glasses.png', './dottie/Dot_Eyes_Closed_Idol2.png', './dottie/Dot_Eyes_HalfClosed_Idol2.png',
  './dottie/Dot_Eyes_Open_Idol2.png', './dottie/Dot_Idol2.png', './dottie/Dot_Eyes_Closed_Idol3.png', 
  './dottie/Dot_Eyes_HalfClosed_Idol3.png', './dottie/Dot_Eyes_Open_Idol3.png', './dottie/Dot_Idol3.png'
];

let currentPose = 'original';

const poseConfigs = {
  original: {
    base: ['#body', '#head', '#glasses'],
    eyes: { open: '#eyes-open', half: '#eyes-half-closed', closed: '#eyes-closed' }
  },
  idle2: {
    base: ['#idle2-body'],
    eyes: { open: '#idle2-eyes-open', half: '#idle2-eyes-half', closed: '#idle2-eyes-closed' }
  }
};

preloadImages(imagePaths);

const characterLayers = {
  mouths: ['#mouth-closed', '#mouth-half-open', '#mouth-open'],
  eyes: ['#eyes-closed', '#eyes-half-closed', '#eyes-open']
};

let talkInterval = null;
let blinkInterval = null;

function setLayer(selector, isActive) {
  document.querySelector(selector).classList.toggle('active', isActive);
}

function setFacialExpression(expression) {
  // Hide all dynamic parts (Brows, Eyes, Mouths)
  const allParts = [...characterLayers.mouths, ...characterLayers.eyes, '#brows-neutral', '#brows-happy', '#brows-sad', '#mouth-frown'];
  
  allParts.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.classList.remove('active');
  });

  if (expression === 'neutral') {
    setLayer('#brows-neutral', true);
    setLayer('#eyes-open', true);
    setLayer('#mouth-closed', true);
  }
}



function startBlinking() {
  if (blinkInterval) return;

  blinkInterval = setInterval(() => {
    const eyes = poseConfigs[currentPose].eyes;
    
    setLayer(eyes.open, false);
    setLayer(eyes.half, true);
    
    setTimeout(() => {
      setLayer(eyes.half, false);
      setLayer(eyes.closed, true);
    }, 50);

    setTimeout(() => {
      setLayer(eyes.closed, false);
      setLayer(eyes.half, true);
    }, 100);

    setTimeout(() => {
      setLayer(eyes.half, false);
      setLayer(eyes.open, true);
    }, 150);

  }, 4000);
}

function switchToPose(poseName) {
  clearAllLayers();
  currentPose = poseName;
  
  // Turn on base layers for this pose
  poseConfigs[poseName].base.forEach(selector => {
    document.querySelector(selector).classList.add('active');
  });

  // Ensure eyes start open
  setLayer(poseConfigs[poseName].eyes.open, true);

  if (poseName === 'original') {
    setFacialExpression('neutral');
  }
}

function pickRandomIdle() {
  const idlePoses = ['idle2'];
  const randomPose = idlePoses[Math.floor(Math.random() * idlePoses.length)];
  switchToPose(randomPose);
}

function startMouthAnimation(speed = 80) {
  if (talkInterval) clearInterval(talkInterval);
  
  let mouthIndex = 0;
  talkInterval = setInterval(() => {
    characterLayers.mouths.forEach(m => setLayer(m, false));
    setLayer(characterLayers.mouths[mouthIndex], true);
    mouthIndex = (mouthIndex + 1) % characterLayers.mouths.length;
  }, speed);
}

// Updated animateTextAndTalk to use the new helper
async function animateTextAndTalk(text, targetElement, speed = 40) {
  targetElement.textContent = '';
  startMouthAnimation(speed * 2); // Start the mouth

  for (let i = 0; i < text.length; i++) {
    targetElement.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }

  clearInterval(talkInterval); // Stop the mouth
  setFacialExpression('neutral');
}

const earBtn = document.querySelector('.ear-btn');

async function playDottieAudio(base64) {
  // If something is already playing, stop it
  if (currentAudio) {
    currentAudio.pause();
    clearInterval(talkInterval);
  }

  // 1. Switch back to talking pose if idle
  switchToPose('original');

  // 2. Setup Audio
  currentAudio = new Audio(`data:audio/mpeg;base64,${base64}`);
  
  // 3. Sync Mouth
  startMouthAnimation(100); // Standard talking speed
  currentAudio.play();

  // 4. Cleanup when finished
  currentAudio.onended = () => {
    clearInterval(talkInterval);
    setFacialExpression('neutral');
    pickRandomIdle(); // Return to idle pose
  };
}

earBtn.addEventListener('click', () => {
  if (latestAudioBase64) {
    playDottieAudio(latestAudioBase64);
  }
});

setLayer('#body', true);
setLayer('#head', true);
setFacialExpression('neutral');
startBlinking();


function clearAllLayers() {
  const allLayers = document.querySelectorAll('.dottie-layer');
  allLayers.forEach(layer => layer.classList.remove('active'));
}

function appendMessage(role, text) {
  const output = document.getElementById('output');
  
  // 1. Create the row
  const row = document.createElement('div');
  row.classList.add('message-row', role === 'user' ? 'user-row' : 'ai-row');

  // 2. Create the bubble
  const bubble = document.createElement('div');
  // Use unique classes for AI vs User so the script can find them to animate
  bubble.classList.add('bubble', role === 'user' ? 'user-bubble' : 'ai-bubble');
  bubble.textContent = text;

  // 3. Put it together
  row.appendChild(bubble);
  output.appendChild(row);

  // 4. Auto-scroll to bottom
  output.scrollTop = output.scrollHeight;
  return bubble; // Add this line!
}

// --- UNIFIED SEND LOGIC ---
async function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  // 1. UI Update
  appendMessage('user', userText);
  conversationHistory.push({ role: "user", content: userText });
  input.value = '';

  // 2. Thinking State
  clearInterval(blinkInterval);
  blinkInterval = null;
  clearAllLayers();
  document.querySelector('#thinking-state').classList.add('active');

  try {
    // 3. API Call
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory })
    });

    if (!response.ok) throw new Error("API Issue");

    // CONSUME DATA ONLY ONCE
    const data = await response.json();
    latestAudioBase64 = data.audio; // Store for the ear button

    // 4. RESTORE CHARACTER POSE
    // switchToPose('original') already handles body, head, and glasses layers
    switchToPose('original'); 
    startBlinking(); 

    // 5. ANIMATE
    const latestBubble = appendMessage('ai', '');
    await animateTextAndTalk(data.reply, latestBubble);

    // 6. FINISH
    conversationHistory.push({ role: "assistant", content: data.reply });
    pickRandomIdle();

  } catch (error) {
    console.error("Error:", error);
    switchToPose('original');
    startBlinking();
    appendMessage('ai', "I'm sorry, sugar, I'm having a hard time hearing you right now.");
    pickRandomIdle();
  }
}


// Handle Enter Key
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSend();
  }
});

// Handle Button Click
btn.addEventListener('click', () => {
  handleSend();
});