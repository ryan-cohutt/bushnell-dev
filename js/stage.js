const zone = document.getElementById("interactionZone");
const curtains = document.getElementById("curtains");
const enterBtn = document.getElementById("enterBtn");
const intro1 = document.getElementById("intro-1");
const intro2 = document.getElementById("intro-2");
const intro3 = document.getElementById("intro-3");
const intro4 = document.getElementById("intro-4");
const horace1 = document.getElementById("horace-1")
const horace2 = document.getElementById("horace-2")
const horace3 = document.getElementById("horace-3")
const horace4 = document.getElementById("horace-4")
const stage1 = document.getElementById("stage-1")
const stage2 = document.getElementById("stage-2")
const options = document.getElementById("options-card")
const option4 = document.getElementById("options-4")
const optionBtns = document.querySelectorAll('.option-btn');
const nextBtn = document.querySelector('#next-btn')
const continueBtn = document.querySelector('#continue-btn')
const ropeBtn = document.querySelector('#rope-btn')
const ropeImg = document.querySelector('#rope1')
const ropeSelectImg = document.querySelector('#rope2')

optionBtns.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
  nextBtn.addEventListener('click', () => {
    button.classList.remove('active');
  });
});

// zone.addEventListener("mouseenter", () => {
//   curtains.classList.add("open");
//   enterBtn.classList.add("visible");
// });

// zone.addEventListener("mouseleave", () => {
//   curtains.classList.remove("open");
//   enterBtn.classList.remove("visible");
// });

const saveBtn = document.querySelector('#save-settings');
const panel = document.querySelector('#settings-panel');

// Open
ropeBtn.addEventListener('click', () => {
  panel.classList.add('is-open');
});

// Save and Close
saveBtn.addEventListener('click', () => {
  // You can add your save logic here (e.g., localStorage)
  panel.classList.remove('is-open');
});


const optionPage = document.querySelectorAll('.option-page');
let index = 0;

nextBtn.addEventListener('click', () => {
  if (index < optionPage.length - 1) {
    optionPage[index].classList.remove('active'); // Fade out current
    index++;
    optionPage[index].classList.add('active');    // Fade in next
  } else if (index == optionPage.length - 1) {
      options.style.opacity = 0
      horace4.style.opacity = 0
      intro3.classList.remove("visible")
      setTimeout (() => {
        options.style.display = "none"
        horace4.style.display = "none"
        intro3.style.display = "none"
        horace2.style.display = "block"
        continueBtn.style.display = "block"
        setTimeout(() => {
          intro4.classList.add("visible")
          horace2.style.opacity = 1
          continueBtn.style.opacity = 1
        }, 100);
      }, 1500);
  }
});



window.addEventListener('load', (event) => {
  
setTimeout(() => {
  horace1.style.opacity = 0
  setTimeout(() => {
    horace1.style.display = "none"
  }, 800);
  setTimeout(() => {
    horace2.style.display = "block"
    setTimeout(() => {
      horace2.style.opacity = 1
      intro1.classList.add("visible")
      setTimeout (() => {
        horace2.style.opacity = 0
        intro1.classList.remove("visible")
        setTimeout(() => {
          horace2.style.display = "none"
          horace3.style.display = "block"
        }, 700)
      }, 4000)
      setTimeout (() => {
        stage2.style.opacity = 1
        stage1.style.opacity = 0
        horace3.style.opacity = 1
        intro2.classList.add("visible")
        intro1.style.display = "none"
        setTimeout (() => {
          horace3.style.opacity = 0
          intro2.classList.remove("visible")
          setTimeout (() => {
            horace3.style.display = "none"
            intro2.style.display = "none"
            stage2.style.opacity = 0
            stage1.style.opacity = 1
            horace4.style.display = "block"
            options.style.display = "flex"
            setTimeout (() => {
              horace4.style.opacity = 1
              intro3.classList.add("visible")
              options.style.opacity = 1
            }, 100)
          }, 1600)
        }, 3000)
      }, 5000)
    }, 50);
  }, 800);
}, 2000);

});