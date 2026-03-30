const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

const messages = [];

function addMessage(role, text) {
  const message = { role, text };
  messages.push(message);

  const div = document.createElement('div');
  div.classList.add('message', role);
  div.textContent = text;

  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getAIResponse(userText) {
  const input = userText.toLowerCase();

  if (input.includes('look')) {
    return "You look around. The room is dimly lit, with a single door to the north.";
  }

  if (input.includes('open door')) {
    return "The door creaks open, revealing a narrow hallway.";
  }

  if (input.includes('north')) {
    return "You head north, your footsteps echoing as the light fades behind you.";
  }

  return "You hesitate. Nothing happens.";
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const text = userInput.value.trim();
  if (!text) return;

  addMessage('user', text);
  userInput.value = '';

  // simulate thinking delay
  setTimeout(() => {
    const response = getAIResponse(text);
    addMessage('ai', response);
  }, 400);
});
