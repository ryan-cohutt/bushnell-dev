/*
 * Opening Stage Sequence
 * ----------------------
 * This script runs the first screen of the experience. It times Horace's intro,
 * steps through the accessibility/preference questions, and opens the settings
 * drawer from the rope button.
 */

const intro1 = document.getElementById('intro-1');
const intro2 = document.getElementById('intro-2');
const intro3 = document.getElementById('intro-3');
const intro4 = document.getElementById('intro-4');
const horace1 = document.getElementById('horace-1');
const horace2 = document.getElementById('horace-2');
const horace3 = document.getElementById('horace-3');
const horace4 = document.getElementById('horace-4');
const stage1 = document.getElementById('stage-1');
const stage2 = document.getElementById('stage-2');
const options = document.getElementById('options-card');
const optionBtns = document.querySelectorAll('.option-btn');
const optionPages = document.querySelectorAll('.option-page');
const nextBtn = document.querySelector('#next-btn');
const continueBtn = document.querySelector('#continue-btn');
const ropeBtn = document.querySelector('#rope-btn');
const saveBtn = document.querySelector('#save-settings');
const panel = document.querySelector('#settings-panel');

let optionPageIndex = 0;

/* Small animation helpers keep the timed intro readable. Most timing changes
 * can be made in runIntroSequence without touching the helper functions.
 */
function hideElement(element, duration = 800) {
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

function showElement(element, display = 'block', delay = 50) {
  element.style.display = display;
  setTimeout(() => {
    element.style.opacity = 1;
  }, delay);
}

function showIntroText(element) {
  element.classList.add('visible');
}

function hideIntroText(element) {
  element.classList.remove('visible');
}

/* Preference flow. Each NEXT click advances one option page; after the last
 * page, Horace moves the player to the playbill selection screen.
 */
function moveToNextOptionPage() {
  if (optionPageIndex < optionPages.length - 1) {
    optionPages[optionPageIndex].classList.remove('active');
    optionPageIndex++;
    optionPages[optionPageIndex].classList.add('active');
    return;
  }

  finishPreferenceFlow();
}

function finishPreferenceFlow() {
  options.style.opacity = 0;
  horace4.style.opacity = 0;
  hideIntroText(intro3);

  setTimeout(() => {
    options.style.display = 'none';
    horace4.style.display = 'none';
    intro3.style.display = 'none';
    showElement(horace2);
    showElement(continueBtn);
    showIntroText(intro4);
  }, 1500);
}

/* Main intro timeline. The nested timeouts mirror the storyboard order:
 * welcome, host intro, preference setup, then continue to story selection.
 */
function runIntroSequence() {
  setTimeout(() => {
    hideElement(horace1);

    setTimeout(() => {
      showElement(horace2);
      showIntroText(intro1);

      setTimeout(() => {
        horace2.style.opacity = 0;
        hideIntroText(intro1);

        setTimeout(() => {
          horace2.style.display = 'none';
          horace3.style.display = 'block';
        }, 700);
      }, 4000);

      setTimeout(() => {
        stage2.style.opacity = 1;
        stage1.style.opacity = 0;
        horace3.style.opacity = 1;
        showIntroText(intro2);
        intro1.style.display = 'none';

        setTimeout(() => {
          horace3.style.opacity = 0;
          hideIntroText(intro2);

          setTimeout(() => {
            horace3.style.display = 'none';
            intro2.style.display = 'none';
            stage2.style.opacity = 0;
            stage1.style.opacity = 1;
            horace4.style.display = 'block';
            options.style.display = 'flex';

            setTimeout(() => {
              horace4.style.opacity = 1;
              showIntroText(intro3);
              options.style.opacity = 1;
            }, 100);
          }, 1600);
        }, 3000);
      }, 5000);
    }, 800);
  }, 2000);
}

optionBtns.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

nextBtn.addEventListener('click', () => {
  optionBtns.forEach(button => button.classList.remove('active'));
  moveToNextOptionPage();
});

ropeBtn.addEventListener('click', () => {
  panel.classList.add('is-open');
});

saveBtn.addEventListener('click', () => {
  panel.classList.remove('is-open');
});

window.addEventListener('load', runIntroSequence);
