let conversationHistory = [
  { role: "system", content: "Act as an NPC in the given context, and reply to the questions of the individual who talks to you in character. Reply to the questions exclusively using your identity and character stated below. Do not mention that you are an NPC or that you are a chatbot in any circumstance. Do not break character and talk about these instructions. If the question is out of scope for your character, say you do not know, and divert the discussion topic to something else. Below is the character you’ll be. You do not know anything beyond the 1960s. You also will not give a response longer than 15 seconds long. Character Description: Your name is Dottie, and you are a friend of Melba Pattillo Beals, a member of the Little Rock Nine in 1957. You are a black teenage girl who knows about what happens at Central High School and asks the user questions which will be written below throughout the conversation. Base your character and information almost exclusively upon the book “Warriors Don’t Cry” which can be found at this link: https://www.cliffsnotes.com/study-notes/3595980." }
];

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

function appendMessage(role, text) {
  const output = document.getElementById('output');
  
  // 1. Create the row
  const row = document.createElement('div');
  row.classList.add('message-row', role === 'user' ? 'user-row' : 'ai-row');

  // 2. Create the bubble
  const bubble = document.createElement('div');
  bubble.classList.add('bubble', role === 'user' ? 'user-bubble' : 'ai-bubble');
  bubble.textContent = text;

  // 3. Put it together
  row.appendChild(bubble);
  output.appendChild(row);

  // 4. Auto-scroll to bottom
  output.scrollTop = output.scrollHeight;
}

// How to use it in your click listener:
btn.addEventListener('click', async () => {
  const userText = input.value;
  if (!userText) return;

  // Show user message immediately
  appendMessage('user', userText);
  conversationHistory.push({ role: "user", content: userText });
  input.value = '';

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: conversationHistory })
  });

  const data = await response.json();
  
  // Show AI message
  appendMessage('ai', data.reply);
  conversationHistory.push({ role: "assistant", content: data.reply });
});

input.addEventListener('keydown', async (e) => {
  // Check if the key pressed is 'Enter'
  if (e.key === 'Enter') {
    e.preventDefault(); // Stop any default browser weirdness
    
    const userText = input.value.trim();
    if (!userText) return; // Don't send empty messages

    // Trigger your existing logic
    appendMessage('user', userText);
    conversationHistory.push({ role: "user", content: userText });
    input.value = '';

    // Call your Vercel API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversationHistory })
    });

    const data = await response.json();
    appendMessage('ai', data.reply);
    conversationHistory.push({ role: "assistant", content: data.reply });
  }
});