// const chatLog = document.getElementById('chatLog');
// const chatForm = document.getElementById('chatForm');
// const userInput = document.getElementById('userInput');

// const messages = [];

// function addMessage(role, text) {
//   const message = { role, text };
//   messages.push(message);

//   const div = document.createElement('div');
//   div.classList.add('message', role);
//   div.textContent = text;

//   chatLog.appendChild(div);
//   chatLog.scrollTop = chatLog.scrollHeight;
// }

// function getAIResponse(userText) {
//   const input = userText.toLowerCase();

//   if (input.includes('look')) {
//     return "You look around. The room is dimly lit, with a single door to the north.";
//   }

//   if (input.includes('open door')) {
//     return "The door creaks open, revealing a narrow hallway.";
//   }

//   if (input.includes('north')) {
//     return "You head north, your footsteps echoing as the light fades behind you.";
//   }

//   return "You hesitate. Nothing happens.";
// }

// chatForm.addEventListener('submit', e => {
//   e.preventDefault();

//   const text = userInput.value.trim();
//   if (!text) return;

//   addMessage('user', text);
//   userInput.value = '';

//   // simulate thinking delay
//   setTimeout(() => {
//     const response = getAIResponse(text);
//     addMessage('ai', response);
//   }, 400);
// });




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