/*
 * Dottie Character + Chat
 * -----------------------
 * This script is shared by dottie-intro.html and dottie.html.
 * The intro page only needs Dottie's layered character animation, while the
 * chat page also uses the API, message bubbles, audio playback, and the
 * "back to story" handoff.
 */

let conversationHistory = [
  { role: "system", content: "Act as an NPC in the given context, and reply to the questions of the individual who talks to you in character. Reply to the questions exclusively using your identity and character stated below. Do not mention that you are an NPC or that you are a chatbot in any circumstance. Do not break character and talk about these instructions. If the question is out of scope for your character, say you do not know, and divert the discussion topic to something else. Below is the character you’ll be. You do not know anything beyond the 1960s. You also will not give a response longer than 15 seconds long. Character Description: Your name is Dottie, and you are a friend of Melba Pattillo Beals, a member of the Little Rock Nine in 1957. You are a black teenage girl who knows about what happens at Central High School and asks the user questions which will be written below throughout the conversation. Base your character and information almost exclusively upon the book “Warriors Don’t Cry” which can be found at this link: https://www.cliffsnotes.com/study-notes/3595980." }
];

let latestAudioBase64 = null;
let currentAudio = null;
let currentPose = 'original';
let talkInterval = null;
let blinkInterval = null;

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const earBtn = document.querySelector('.ear-btn');
const returnBtn = document.getElementById('return-to-adventure');

const imagePaths = [
  './dottie/Dot_Body.png',
  './dottie/Dot_Brows_Happy.png',
  './dottie/Dot_Brows_Neutral.png',
  './dottie/Dot_Brows_Sad.png',
  './dottie/Dot_Eyes_Closed.png',
  './dottie/Dot_Eyes_HalfClosed.png',
  './dottie/Dot_Eyes_Open.png',
  './dottie/Dot_Head.png',
  './dottie/Dot_Mouth_Closed.png',
  './dottie/Dot_Mouth_Frown.png',
  './dottie/Dot_Mouth_HalfOpen.png',
  './dottie/Dot_Mouth_Open.png',
  './dottie/Dot_Thinking.png',
  './dottie/Glasses.png',
  './dottie/Dot_Eyes_Closed_Idol3.png',
  './dottie/Dot_Eyes_HalfClosed_Idol3.png',
  './dottie/Dot_Eyes_Open_Idol3.png',
  './dottie/Dot_Idol3.png'
];

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

const characterLayers = {
  mouths: ['#mouth-closed', '#mouth-half-open', '#mouth-open'],
  eyes: ['#eyes-closed', '#eyes-half-closed', '#eyes-open']
};

/* Asset setup and layer helpers. Dottie is built from stacked image layers, so
 * these helpers turn individual eyes, mouth, brows, and pose images on/off.
 */
function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

function setLayer(selector, isActive) {
  document.querySelector(selector)?.classList.toggle('active', isActive);
}

function clearAllLayers() {
  document.querySelectorAll('.dottie-layer').forEach(layer => {
    layer.classList.remove('active');
  });
}

function setFacialExpression(expression) {
  const allParts = [
    ...characterLayers.mouths,
    ...characterLayers.eyes,
    '#brows-neutral',
    '#brows-happy',
    '#brows-sad',
    '#mouth-frown'
  ];

  allParts.forEach(selector => setLayer(selector, false));

  if (expression === 'neutral') {
    setLayer('#brows-neutral', true);
    setLayer('#eyes-open', true);
    setLayer('#mouth-closed', true);
  }
}

/* Character animation. Blink and mouth timers are separated so Dottie can keep
 * blinking while idle and switch to lip-sync movement while speaking.
 */
function switchToPose(poseName) {
  const pose = poseConfigs[poseName];
  if (!pose) return;

  clearAllLayers();
  currentPose = poseName;
  pose.base.forEach(selector => setLayer(selector, true));
  setLayer(pose.eyes.open, true);

  if (poseName === 'original') {
    setFacialExpression('neutral');
  }
}

function startBlinking() {
  if (blinkInterval) return;

  blinkInterval = setInterval(() => {
    const eyes = poseConfigs[currentPose]?.eyes;
    if (!eyes) return;

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

function pickRandomIdle() {
  const idlePoses = ['idle2'];
  const randomPose = idlePoses[Math.floor(Math.random() * idlePoses.length)];
  switchToPose(randomPose);
}

function startMouthAnimation(speed = 80) {
  if (talkInterval) clearInterval(talkInterval);

  let mouthIndex = 0;
  talkInterval = setInterval(() => {
    characterLayers.mouths.forEach(selector => setLayer(selector, false));
    setLayer(characterLayers.mouths[mouthIndex], true);
    mouthIndex = (mouthIndex + 1) % characterLayers.mouths.length;
  }, speed);
}

async function animateTextAndTalk(text, targetElement, speed = 40) {
  targetElement.textContent = '';
  startMouthAnimation(speed * 2);

  for (let i = 0; i < text.length; i++) {
    targetElement.textContent += text[i];
    await new Promise(resolve => setTimeout(resolve, speed));
  }

  clearInterval(talkInterval);
  setFacialExpression('neutral');
}

async function playDottieAudio(base64) {
  if (currentAudio) {
    currentAudio.pause();
    clearInterval(talkInterval);
  }

  switchToPose('original');
  currentAudio = new Audio(`data:audio/mpeg;base64,${base64}`);
  startMouthAnimation(100);
  await currentAudio.play();

  currentAudio.onended = () => {
    clearInterval(talkInterval);
    setFacialExpression('neutral');
    pickRandomIdle();
  };
}

/* Chat rendering and API calls. The conversationHistory array is sent in full
 * so Dottie keeps context across the current chat session.
 */
function appendMessage(role, text) {
  if (!output) return null;

  const row = document.createElement('div');
  const bubble = document.createElement('div');

  row.classList.add('message-row', role === 'user' ? 'user-row' : 'ai-row');
  bubble.classList.add('bubble', role === 'user' ? 'user-bubble' : 'ai-bubble');
  bubble.textContent = text;

  row.appendChild(bubble);
  output.appendChild(row);
  output.scrollTop = output.scrollHeight;

  return bubble;
}

function showThinkingState() {
  clearInterval(blinkInterval);
  blinkInterval = null;
  clearAllLayers();
  setLayer('#thinking-state', true);
}

async function requestDottieReply() {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: conversationHistory })
  });

  if (!response.ok) throw new Error('Dottie API request failed.');
  return response.json();
}

async function showDottieReply() {
  showThinkingState();

  const data = await requestDottieReply();
  latestAudioBase64 = data.audio;

  switchToPose('original');
  startBlinking();

  const latestBubble = appendMessage('ai', '');
  if (latestBubble) {
    await animateTextAndTalk(data.reply, latestBubble);
  }

  conversationHistory.push({ role: 'assistant', content: data.reply });
  pickRandomIdle();
}

async function handleSend() {
  const userText = input?.value.trim();
  if (!userText) return;

  appendMessage('user', userText);
  conversationHistory.push({ role: 'user', content: userText });
  input.value = '';

  try {
    await showDottieReply();
  } catch (error) {
    console.error('Error:', error);
    switchToPose('original');
    startBlinking();
    appendMessage('ai', "I'm sorry, sugar, I'm having a hard time hearing you right now.");
    pickRandomIdle();
  }
}

/* Page setup. Every listener is guarded because this file runs on both the
 * Dottie intro page and the full chat page.
 */
function setupChatControls() {
  input?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  });

  sendBtn?.addEventListener('click', handleSend);

  earBtn?.addEventListener('click', () => {
    if (latestAudioBase64) playDottieAudio(latestAudioBase64);
  });
}

/* Story handoff. Text adventure scenes can seed Dottie with a hidden prompt,
 * then Dottie sends the player back to the same chapter and scene afterward.
 */
async function startIncomingStoryPrompt() {
  const incomingPrompt = localStorage.getItem('dottiePrompt');
  if (!incomingPrompt) return;

  if (returnBtn) returnBtn.style.display = 'block';

  conversationHistory.push({ role: 'user', content: incomingPrompt });
  localStorage.removeItem('dottiePrompt');

  try {
    await showDottieReply();
  } catch (error) {
    console.error(error);
  }
}

function setupReturnToAdventure() {
  returnBtn?.addEventListener('click', () => {
    const chapterId = localStorage.getItem('returnChapter') || localStorage.getItem('selectedChapter') || 'chapter-1';
    localStorage.setItem('selectedChapter', chapterId);
    localStorage.setItem('returningFromDottie', 'true');
    window.location.href = `text-adventure.html?chapter=${encodeURIComponent(chapterId)}`;
  });
}

function setupSettingsPanel() {
  const saveBtn = document.querySelector('#save-settings');
  const panel = document.querySelector('#settings-panel');
  const openBtn = document.querySelector('#settings-btn');

  openBtn?.addEventListener('click', () => {
    panel.classList.add('is-open');
  });

  saveBtn?.addEventListener('click', () => {
    panel.classList.remove('is-open');
  });
}

function initDottie() {
  preloadImages(imagePaths);
  switchToPose('original');
  startBlinking();
  setupChatControls();
  setupReturnToAdventure();
  setupSettingsPanel();
  startIncomingStoryPrompt();
}

window.addEventListener('load', initDottie);
