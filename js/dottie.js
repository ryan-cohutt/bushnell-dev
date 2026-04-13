let conversationHistory = [
  { role: "system", content: "You are a helpful assistant." }
];

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

btn.addEventListener('click', async () => {
  const userText = input.value;
  if (!userText) return;

  // 1. Save user message to memory
  conversationHistory.push({ role: "user", content: userText });
  
  output.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
  input.value = '';

  // 2. Send the FULL history to your Vercel API
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: conversationHistory }) // Note: sending the array now
  });

  const data = await response.json();
  
  // 3. Save AI response to memory
  conversationHistory.push({ role: "assistant", content: data.reply });
  
  output.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
  
  // Scroll to bottom
  output.scrollTop = output.scrollHeight;
});