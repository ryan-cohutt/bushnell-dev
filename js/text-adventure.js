/*
 * Text Adventure Engine
 * ---------------------
 * This file controls the reusable story player. Chapter content now lives in
 * data/chapters/chapter-*.json, so future chapter paths can be edited without
 * changing this engine file.
 *
 * To add or edit story content:
 * - Open the matching JSON file in data/chapters/.
 * - Add scenes under "scenes" using unique scene ids.
 * - Use "nextScene" for the NEXT button path.
 * - Use "options" for player choices. Each option target must match a scene id.
 * - Add "diaryEntry" and "diaryContent" when a scene should pause for the diary.
 * - Add "dottieConvo" and "dottiePrompt" when a scene should send the player to Dottie.
 */

const DEFAULT_CHAPTER_ID = 'chapter-1';
const CHAPTER_PATH = 'data/chapters';

let storyData = {};
let currentChapterId = DEFAULT_CHAPTER_ID;
let startSceneId = 'start';
let isTyping = false;
let skipTyping = false;
let typewriterId = 0;

const bgImg = document.getElementById('bg-img');
const textEl = document.getElementById('adventure-text');
const nextBtn = document.getElementById('next-btn');
const optionsCont = document.getElementById('options-container');
const startBtn = document.getElementById('start-adventure');
const introOverlay = document.getElementById('intro-overlay');
const mainUI = document.getElementById('main-ui');
const diaryOverlay = document.getElementById('diary-overlay');
const diaryText = document.getElementById('diary-text-container');
const closeDiaryBtn = document.getElementById('close-diary');

/* Chapter selection and JSON loading. The map passes ?chapter=chapter-x, while
 * Dottie returns through localStorage so the player lands back in the same file.
 */
function getChapterFromUrl() {
    return new URLSearchParams(window.location.search).get('chapter');
}

function getInitialChapterId() {
    return (
        getChapterFromUrl() ||
        localStorage.getItem('returnChapter') ||
        localStorage.getItem('selectedChapter') ||
        DEFAULT_CHAPTER_ID
    );
}

async function loadChapter(chapterId) {
    currentChapterId = chapterId || DEFAULT_CHAPTER_ID;
    localStorage.setItem('selectedChapter', currentChapterId);

    const response = await fetch(`${CHAPTER_PATH}/${currentChapterId}.json`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Could not load ${currentChapterId}.json`);
    }

    const chapter = await response.json();
    storyData = chapter.scenes || {};
    startSceneId = chapter.startScene || 'start';

    if (!storyData[startSceneId]) {
        throw new Error(`${currentChapterId}.json is missing its start scene.`);
    }
}

function showMainUI() {
    mainUI.style.opacity = '1';
    mainUI.style.pointerEvents = 'auto';
}

function showLoadError(error) {
    introOverlay.style.display = 'none';
    showMainUI();
    bgImg.src = 'visuals-updated/school-faded.png';
    textEl.textContent = `This chapter could not be loaded. Check that data/chapters/${currentChapterId}.json exists and has a valid startScene.`;
    optionsCont.innerHTML = '';
    nextBtn.style.display = 'none';
    console.error(error);
}

/* Typewriter animation. typewriterId prevents an older animation from continuing
 * after the player has already moved to a new scene.
 */
async function typeWriter(text, element, speed = 30) {
    typewriterId++;
    const thisId = typewriterId;

    isTyping = true;
    skipTyping = false;
    element.textContent = '';

    for (let i = 0; i < text.length; i++) {
        if (thisId !== typewriterId) return;

        if (skipTyping) {
            element.textContent = text;
            isTyping = false;
            skipTyping = false;
            return;
        }

        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    isTyping = false;
}

/* Scene rendering. This section is intentionally data-driven: scene objects from
 * JSON decide the background, displayed text, NEXT behavior, and choice buttons.
 */
function renderScene(sceneId) {
    const scene = storyData[sceneId];

    if (!scene) {
        console.warn(`Scene "${sceneId}" was not found in ${currentChapterId}.json.`);
        return;
    }

    bgImg.src = scene.bg || 'visuals-updated/school-faded.png';
    typeWriter(scene.text || '', textEl);
    renderNextButton(scene);
    renderOptions(scene.options || []);
}

function renderNextButton(scene) {
    const hasNextAction = scene.showNext && (scene.nextScene || scene.diaryEntry || scene.dottieConvo);
    nextBtn.style.display = hasNextAction ? 'block' : 'none';

    nextBtn.onclick = () => {
        if (isTyping) {
            skipTyping = true;
            return;
        }

        if (scene.diaryEntry) {
            showDiary(scene.diaryContent || '', scene.nextScene);
        } else if (scene.dottieConvo) {
            triggerDottieCheckin(scene.dottiePrompt || '', scene.nextScene);
        } else if (scene.nextScene) {
            renderScene(scene.nextScene);
        }
    };
}

function renderOptions(options) {
    optionsCont.innerHTML = '';

    options.forEach(option => {
        const btn = document.createElement('button');
        const title = document.createElement('h1');
        const desc = document.createElement('p');

        btn.className = 'text-option';
        title.className = 'capriola';
        desc.className = 'capriola';
        title.textContent = option.title || 'Untitled Choice';
        desc.textContent = option.desc || '';
        btn.append(title, desc);

        if (!option.target) {
            btn.disabled = true;
            btn.title = 'Add a target scene id in the chapter JSON to enable this choice.';
        }

        btn.onclick = () => {
            if (isTyping) {
                skipTyping = true;
            } else if (option.target) {
                renderScene(option.target);
            }
        };

        optionsCont.appendChild(btn);
    });
}

/* Interruption scenes. Diary entries stay inside this page; Dottie check-ins
 * leave the page, then return through returnScene and returnChapter.
 */
function showDiary(content, nextScene) {
    diaryText.textContent = content;
    diaryOverlay.style.display = 'flex';

    setTimeout(() => {
        diaryOverlay.style.transform = 'translateY(0)';
    }, 10);

    closeDiaryBtn.onclick = () => {
        diaryOverlay.style.transform = 'translateY(100%)';

        setTimeout(() => {
            diaryOverlay.style.display = 'none';
            if (nextScene) renderScene(nextScene);
        }, 600);
    };
}

function triggerDottieCheckin(prompt, nextScene) {
    localStorage.setItem('dottiePrompt', prompt);
    localStorage.setItem('returnScene', nextScene || startSceneId);
    localStorage.setItem('returnChapter', currentChapterId);
    window.location.href = 'dottie.html';
}

function startAdventure(sceneId = startSceneId) {
    introOverlay.style.transform = 'translateY(100%)';

    setTimeout(() => {
        introOverlay.style.display = 'none';
        showMainUI();
        renderScene(sceneId);
    }, 600);
}

function resumeFromDottieIfNeeded() {
    const isReturning = localStorage.getItem('returningFromDottie');
    if (!isReturning) return false;

    const target = localStorage.getItem('returnScene') || startSceneId;
    localStorage.removeItem('returningFromDottie');
    localStorage.removeItem('returnScene');
    localStorage.removeItem('returnChapter');

    introOverlay.style.display = 'none';
    introOverlay.classList.remove('active');
    showMainUI();
    renderScene(target);
    return true;
}

/* Page setup. These listeners are kept at the bottom so the editable story
 * content stays separate from browser wiring and navigation behavior.
 */
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

function setupNavigation() {
    document.querySelector('.back-btn')?.addEventListener('click', () => {
        window.location.href = 'warriors-map.html';
    });

    document.querySelector('.dottie-icon')?.closest('a')?.addEventListener('click', () => {
        localStorage.setItem('returnChapter', currentChapterId);
    });
}

async function initAdventure() {
    setupSettingsPanel();
    setupNavigation();

    try {
        await loadChapter(getInitialChapterId());
    } catch (error) {
        showLoadError(error);
        return;
    }

    if (resumeFromDottieIfNeeded()) return;

    startBtn.addEventListener('click', () => {
        if (!introOverlay.classList.contains('active')) return;
        startAdventure();
    });
}

window.addEventListener('load', initAdventure);
