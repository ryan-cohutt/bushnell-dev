// --- 1. THE STORY DATA (Your "Twine" Map) ---
const storyData = {
    "start": {
        text: `The words feel heavy. 
Integration might be stopped. 
Maybe all of this suffering would be for nothing.
Melba folds the paper slowly. The house feels unusually quiet. 
`,
        bg: "visuals-updated/living-room.jpg",
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
        bg: "visuals-updated/phone.jpg",
        options: [
            { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            { title: "Mr. Patillo", desc: "Melba's Dad", target: "call_dad" },
            { title: "Marsha", desc: "Melba's Best Friend", target: "call_marsha" }
        ],
        showNext: false,
    },
    "call_marsha": {
        text: `Melba dials Marsha’s number. 
The phone rings twice. Marsha answers. 
Her voice sounds distant, music and laughter drowning her voice out. 
“Oh… hi, Melba.” Melba asks what she is doing tonight. 
Marsha hesitates. “Well… some people are over for dinner. Just a few of our friends.” 
Old friends. Friends she used to spend weekends with. She waits. But Marsha does not invite her.`,
        bg: "visuals-updated/phone.jpg",
        options: [],
        showNext: true,
        nextScene: "call_cont"
    },
    "call_vince": {
        text: `Melba dials Vince’s number. 
The phone rings. No answer. 
Melba sighs. She imagines him out somewhere, laughing with friends. 
She hopes she might see him later at the wrestling matches. 
The thought lifts her mood slightly.`,
        bg: "visuals-updated/phone.jpg",
        options: [],
        showNext: true,
        nextScene: "phone_call"
    },
    "call_dad": {
        text: `Melba dials her father’s number. 
Her heart beats faster. The phone rings several times. 
No answer. She remembers the argument from the day before. 
Her father did not approve of her attending Central High. 
The silence on the phone makes her chest feel heavy. 
Melba slowly hangs up.`,
        bg: "visuals-updated/phone.jpg",
        options: [],
        showNext: true,
        nextScene: "phone_call"
    },
    "call_cont": {
        text: `“We’re afraid of being attacked with all the integration news going on with you. What if they bomb us to get back to you?” The silence stretches. “Well… I gotta go,” Marsha says quickly. The line clicks. Melba slowly hangs up. The rejection stings worse than she expected. Who should Melba call next?`,
        bg: "visuals-updated/phone.jpg",
        options: [
            { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: false,
        // nextScene: ""
    },
    "call_alice": {
        text: `Melba decides to try Alice, one of her old friends. 
There is no answer. Melba dials several other numbers. 
One after another. No answers. Later she realizes why. 
They are all at Marsha’s dinner party. Without her.`,
        bg: "visuals-updated/phone.jpg",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_mom"
    },
    "call_minnijean": {
        text: `Melba calls Minnijean.
Minnijean picks up quickly. 
“I don’t know where I really belong,” Minnijean sighs.
Melba laughs softly. “I know exactly what you mean.” 
Both girls talk about how strange life has become. 
For a moment, Melba feels less alone. Someone else understands.`,
        bg: "visuals-updated/phone.jpg",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_mom"
    },
    "melba_mom": {
        text: `Melba’s mother walks into the room. 
She can see the sadness on Melba’s face. 
“Your friends are short-sighted,” she says gently. They can’t see the future. 
You have to do this thing because you are convinced it is right for you, not for what others will think.” Melba says “But I don’t want to lose all my friends”. 
“Let’s have a family date, right here at home.” 
Her mother brings popcorn. Soon they are playing games together at the table. 
For a little while, Melba forgets the newspaper headlines. `,
        bg: "visuals-updated/living-room.jpg",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_room"
    },
    "melba_room": {
        text: `Later that evening, Melba sits on her bed. 
Her thoughts drift to something exciting. 
The wrestling matches. 
She remembers the energy of the crowd. 
The bright lights. 
The thrill of sneaking glances at Vince.`,
        bg: "visuals-updated/bedroom.jpg",
        options: [
            // { title: "Vince", desc: "Melba's Friend", target: "call_vince" },
            // { title: "Minnijean", desc: "Melba's New Friend", target: "call_minnijean" },
            // { title: "Alice", desc: "Melba's Old Friend", target: "call_alice" }
        ],
        showNext: true,
        nextScene: "melba_disguise"
    },
    "melba_disguise": {
        text: `She smiles. 
Maybe no one would recognize her. 
All she needs . . .
is a good disguise.
Help Melba Pick a Disguise`,
        bg: "visuals-updated/bedroom.jpg",
        options: [
            { title: "Dark Glasses", desc: "Clothing Option", target: "melba_outfit" },
            { title: "A Scarf", desc: "Clothing Option", target: "melba_outfit" },
            { title: "Grown-Up Outfit", desc: "Clothing Option", target: "melba_outfit" }
        ],
        showNext: false,
        // nextScene: "melba_disguise"
    },
    "melba_outfit": {
        text: `Melba studies herself in the mirror. 
Maybe this will work.
She would never be recognized from any picture they might have seen of her in the news. 
Maybe she can have one normal night. 
Grandma enters the room. 
She studies Melba carefully.
Then she shakes her head. `,
        bg: "visuals-updated/bedroom.jpg",
        options: [
            // { title: "Dark Glasses", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "A Scarf", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "Grown-Up Outfit", desc: "Clothing Option", target: "melba_outfit" }
        ],
        showNext: true,
        nextScene: "melba_grandma"
    },
    "melba_grandma": {
        text: `“Sorry child, you can’t go with me to the matches, not tonight.” 
Melba’s heart sinks. 
“It’s just too dangerous for you to go there amongst all those white people” 
“You’re staying home, baby. It’s for your own good.” 
The excitement disappears instantly. 
“Everything’s being taken away from me.” Melba cries.
 “I’ll never go back to Central!” `,
        bg: "visuals-updated/bedroom.jpg",
        options: [
            // { title: "Dark Glasses", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "A Scarf", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "Grown-Up Outfit", desc: "Clothing Option", target: "melba_outfit" }
        ],
        diaryEntry: true,
        diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "Melba just got told she can't go to the wrestling matches. She's heartbroken. What would you do in that scenario?",
        showNext: true,
        nextScene: "sunday_church"
    },
    "sunday_church": {
        text: `Melba sits quietly in the pew.
Her heart still aches from the night before.
Friends avoiding her.
The wrestling match cancelled.
Everything feels unfair.
Then someone taps her shoulder.`,
        bg: "visuals-updated/church.jpg",
        options: [
            // { title: "Dark Glasses", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "A Scarf", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "Grown-Up Outfit", desc: "Clothing Option", target: "melba_outfit" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "Melba just got told she can't go to the wrestling matches. She's heartbroken. What would you do in that scenario?",
        showNext: true,
        nextScene: "sunday_church_2"
    },
    "sunday_church_2": {
        text: `It is Vince. 
He smiles nervously. 
“Melba… will you be my girlfriend?” 
Melba blinks in surprise. 
She nods. 
For the first time all weekend, she smiles. 
Service begins.`,
        bg: "visuals-updated/church.jpg",
        options: [
            // { title: "Dark Glasses", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "A Scarf", desc: "Clothing Option", target: "melba_outfit" },
            // { title: "Grown-Up Outfit", desc: "Clothing Option", target: "melba_outfit" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "Melba just got told she can't go to the wrestling matches. She's heartbroken. What would you do in that scenario?",
        showNext: true,
        nextScene: "sunday_church_3"
    },
    "sunday_church_3": {
        text: `During the service, the congregation prays together. 
Their voices rise through the church. 
The prayers are for strength. For courage. 
For the students integrating the school. 
Melba feels the support of her community. 
Her spirits begin to lift. 
Who should Melba talk to after church? `,
        bg: "visuals-updated/church.jpg",
        options: [
            { title: "Talk with Vince", desc: "", target: "church_vince" },
            { title: "Talk with Grandmother", desc: "", target: "church_grandma" },
            { title: "Talk with Grandmother's friends", desc: "", target: "church_grandma_friends" },
            { title: "Listen to Elderly Man", desc: "", target: "church_edler" },
            { title: "Talke to Mother's Co-workers", desc: "", target: "church_mother_friends" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "Melba just got told she can't go to the wrestling matches. She's heartbroken. What would you do in that scenario?",
        showNext: false,
        nextScene: "sunday_church_3"
    },
    "church_grandma_friends": {
        text: `Melba remembered what Grandma had said to her: “Church is the life’s blood of our folks’ community.”
If she got into trouble and really needed protection these people would have her back.
The network of phone calls initiated by Reverend Young would construct a web of safety.
She goes up to her grandmother’s friend.
“You’re doing the right thing, girl; we’re proud of you!”
“It might hurt a little while, but when it stops we’re all gonna feel real good.” Another lady adds on.
Melba beams at them.
It feels good to have support.`,
        bg: "visuals-updated/church.jpg",
        options: [
            // { title: "Talk with Vince", desc: "", target: "church_vince" },
            // { title: "Talkwith Grandmother", desc: "", target: "church_grandma" },
            // { title: "Talk with Grandmother's friends", desc: "", target: "church_grandma_friends" },
            // { title: "Listen to Elderly Man", desc: "", target: "church_edler" },
            // { title: "Talke to Mother's Co-workers", desc: "", target: "church_mother_friends" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "Melba just got told she can't go to the wrestling matches. She's heartbroken. What would you do in that scenario?",
        showNext: true,
        nextScene: "sunday_church_3"
    },
    "church_edler": {
        text: `Church was also the place where the community exchanged news.
Melba walked over to an elderly man who was conversing with a group of people.
They were recounting what they overheard in white ladies’ kitchens, on their other jobs, or maybe on a bus.
There were stories of people buying up weapons, which was all untrue.
The elderly man said, some of the folks were dusting off rusty hardware.
“Reasonable folks smell trouble. There’s too many strangers in town, too many people with Mississippi attitudes,” he continued.
“Ain’t no way we’re out there buying hardware like the governor is saying. He’s a stone-faced liar.”`,
        bg: "visuals-updated/church.jpg",
        options: [
            // { title: "Talk with Vince", desc: "", target: "church_vince" },
            // { title: "Talkwith Grandmother", desc: "", target: "church_grandma" },
            // { title: "Talk with Grandmother's friends", desc: "", target: "church_grandma_friends" },
            // { title: "Listen to Elderly Man", desc: "", target: "church_edler" },
            // { title: "Talke to Mother's Co-workers", desc: "", target: "church_mother_friends" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        dottieConvo: true,
        dottiePrompt: "The player just experienced Melba being distanced from her friends she had before Central High. They saw that some people, like Marsha, decide to reject or distance her, but others, like some of the elders in the church, are very supportive of her mission. Discuss this with the player by saying the following starting prompt to them to start: 'While some people reject Melba, others support her deeply.You chose to call Marsha, Melba’s best friend.Do you think Marsha was in the right not to invite Melba?'",
        showNext: true,
        nextScene: "classroom_1"
    },
    "classroom_1": {
        text: `Melba and the other members of the Little Rock Nine wait anxiously. 
They cannot attend school yet. 
They feel stuck. Frustrated. 
But members of their community step forward. 
Teachers, neighbors, Church members. 
They offer books. 
They tutor the students with lessons, following a school-like schedule. 
Help Melba stay on track with her studies `,
        bg: "visuals-updated/classroom.jpg",
        options: [
            { title: "Take Mathematics Notes", desc: "", target: "math_notes" },
            { title: "Read Language Arts Textbook ", desc: "", target: "" },
            { title: "Help Friend with Assignment ", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: false,
        nextScene: "sunday_church_3"
    },
    "math_notes": {
        text: `The space feels different from school.
Safer.
But also uncertain. Melba feels the pressure building.
If they fall behind now, it could affect their future.
Melba leans over her notebook. 
She carefully copies each problem and solution.
The numbers begin to make sense. Focusing on math helps quiet her thoughts.
For a moment, she is not thinking about protests or fear.
Just logic.
Just learning.`,
        bg: "visuals-updated/classroom.jpg",
        options: [
            // { title: "Take Mathematics Notes", desc: "", target: "math_notes" },
            // { title: "Read Language Arts Textbook ", desc: "", target: "" },
            // { title: "Help Friend with Assignment ", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: true,
        nextScene: "melba_break"
    },
    "melba_break": {
        text: `Time passes.The group begins to settle into a rhythm.
Lessons. Breaks. 
Study time. It almost feels like school.
But something is still missing.
What should Melba do during her break?`,
        bg: "visuals-updated/classroom.jpg",
        options: [
            { title: "Have Lunch and Rest", desc: "", target: "" },
            { title: "Continue Studying", desc: "", target: "" },
            { title: "Socialize with Group", desc: "", target: "melba_socialize" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: false,
        nextScene: "melba_break"
    },
    "melba_socialize": {
        text: `Melba joins the others in conversation.
They share stories, jokes, and small moments of joy.
Slowly, the group bonds together.
They talked about their fears and hopes, what they missed at their old schools, what they wished would be resolved soon.
While Melba regretted the friends she was losing, she cherished the growing ties with her new friends.`,
        bg: "visuals-updated/classroom.jpg",
        options: [
            // { title: "Have Lunch and Rest", desc: "", target: "" },
            // { title: "Continue Studying", desc: "", target: "" },
            // { title: "Socialize with Group", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: true,
        nextScene: "melba_home"
    },
    "melba_home": {
        text: `When Melba gets home from lessons one day, her mother talks to her about a call she received from NAACP representatives.
Reporters are asking questions.
They are to hold a press meeting at the Bates house along with Mr. Thurgood Marshall, the man who could fight for them.
Her mother warns her: “Be careful what you say.”
Melba feels conflicted.
She wants to tell the truth about how frightened she feels, but she knows that it can be used against her and stop integration entirely.
She has been told she might have to testify in court someday.
Every word matters.`,
        bg: "visuals-updated/melba-house.jpg",
        options: [
            // { title: "Have Lunch and Rest", desc: "", target: "" },
            // { title: "Continue Studying", desc: "", target: "" },
            // { title: "Socialize with Group", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: true,
        nextScene: "melba_home_2"
    },
    "melba_home_2": {
        text: `Melba goes to the press meeting with all of her new friends integrating into Central High with her.
During the interview, a reporter addresses her politely.
“Miss Pattillo, how do you feel about going back to Central High?”
Melba freezes for a moment.
Miss Pattillo.
Nobody white has ever called her that before.
Not like this.
Not with respect.
In that moment, she feels something new.
Equality.`,
        bg: "visuals-updated/melba-house.jpg",
        options: [
            // { title: "Have Lunch and Rest", desc: "", target: "" },
            // { title: "Continue Studying", desc: "", target: "" },
            // { title: "Socialize with Group", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Freedom is not integration. Freedom is being able to go with Grandma to the wrestling matches.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: true,
        nextScene: "melba_home_3"
    },
    "melba_home_3": {
        text: `She felt for the time, that they cared what she thought. They responded to her, looked her directly in her eyes, even looking at her with admiring eyes.
She thought to herself, I might like to be a news reporter when I grow up.
Melba felt hope.`,
        bg: "visuals-updated/melba-house-night.jpg",
        options: [
            // { title: "Have Lunch and Rest", desc: "", target: "" },
            // { title: "Continue Studying", desc: "", target: "" },
            // { title: "Socialize with Group", desc: "", target: "" }
        ],
        diaryEntry: true,
        diaryContent: `Today is the first time in my life I felt equal to white people.I want more of that feeling. I’ll do whatever I have to do to keep feeling equal all the time.I apologize, God, for thinking you had taken away all my normal life.Maybe you’re just exchanging it for a new life.`,
        // dottieConvo: true,
        // dottiePrompt: "",
        showNext: true,
        nextScene: "melba_home_4"
    },
    "melba_home_4": {
        text: ``,
        bg: "visuals-updated/melba-house-night.jpg",
        options: [
            // { title: "Have Lunch and Rest", desc: "", target: "" },
            // { title: "Continue Studying", desc: "", target: "" },
            // { title: "Socialize with Group", desc: "", target: "" }
        ],
        // diaryEntry: true,
        // diaryContent: `Today is the first time in my life I felt equal to white people.I want more of that feeling. I’ll do whatever I have to do to keep feeling equal all the time.I apologize, God, for thinking you had taken away all my normal life.Maybe you’re just exchanging it for a new life.`,
        dottieConvo: true,
        dottiePrompt: "The user has completed this section of Melba's story. Start the conversation with this paragraph, and discuss the questions and content within the paragraph with them to summarize the section and what they learned: 'Wow! At first, Melba started regretting her choice when she was losing friends and couldn’t go to the wrestling matches with her grandmother. She started feeling isolated. But, she ended up feeling much more supported towards the end of this chapter by her community and new friends. The Little Rock Nine risked everything just to walk through a front door because they believed that where you learn shouldn't be determined by what you look like. Looking at your own school or neighborhood today, where do you still see 'invisible' doors that are hard for some people to walk through? What is one small 'risk' you could take to help open that door for someone else?'",
        showNext: true,
        nextScene: "melba_home_4"
    },
};

// --- 2. THE ENGINE LOGIC ---
let isTyping = false;
let skipTyping = false;

// --- 1. TYPEWRITER WITH SKIP LOGIC ---
let typewriterId = 0; // Global counter

async function typeWriter(text, element, speed = 30) {
    typewriterId++; // Increment every time a new text starts
    const thisId = typewriterId; 
    
    isTyping = true;
    skipTyping = false;
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
        // KILL SWITCH: If a new typewriter has started, kill this old one
        if (thisId !== typewriterId) return;

        if (skipTyping) {
            element.textContent = text;
            isTyping = false;
            skipTyping = false;
            return;
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
            skipTyping = true;
        } else {
            // CHECK FOR DIARY OR DOTTIE HERE
            if (scene.diaryEntry) {
                showDiary(scene.diaryContent, scene.nextScene);
            } else if (scene.dottieConvo) {
                // Logic for Part 2 goes here
                triggerDottieCheckin(scene.dottiePrompt, scene.nextScene);
            } else {
                renderScene(scene.nextScene);
            }
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
    // Only run if the intro is actually active
    if (!introOverlay.classList.contains('active')) return;

    introOverlay.style.transform = "translateY(100%)";
    
    setTimeout(() => {
        introOverlay.style.display = "none";
        mainUI.style.opacity = "1";
        mainUI.style.pointerEvents = "auto";
        renderScene("start"); 
    }, 600);
});

const diaryOverlay = document.getElementById('diary-overlay');
const diaryText = document.getElementById('diary-text-container');
const closeDiaryBtn = document.getElementById('close-diary');

function showDiary(content, nextScene) {
    diaryText.textContent = content;
    diaryOverlay.style.display = "flex"; // Ensure it's visible
    // Wait a tiny bit then slide up
    setTimeout(() => {
        diaryOverlay.style.transform = "translateY(0)";
    }, 10);

    closeDiaryBtn.onclick = () => {
        diaryOverlay.style.transform = "translateY(100%)";
        setTimeout(() => {
            renderScene(nextScene);
        }, 600);
    };
}



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

function triggerDottieCheckin(prompt, nextScene) {
    localStorage.setItem('dottiePrompt', prompt);
    localStorage.setItem('returnScene', nextScene);
    window.location.href = 'dottie.html';
}

window.addEventListener('load', () => {
    const isReturning = localStorage.getItem('returningFromDottie');
    
    if (isReturning) {
        // 1. Hide intro instantly so it never appears
        introOverlay.style.display = "none";
        introOverlay.classList.remove('active');
        
        // 2. Show the game UI
        mainUI.style.opacity = "1";
        mainUI.style.pointerEvents = "auto";
        
        // 3. Grab the target scene and clean up
        const target = localStorage.getItem('returnScene');
        localStorage.removeItem('returningFromDottie');
        localStorage.removeItem('returnScene');
        
        // 4. Start the correct scene
        renderScene(target);
    }
});

// 3. Close Logic
document.getElementById('close-popup').addEventListener('click', () => {
    popup.classList.remove('active');
});

const saveBtn = document.querySelector('#save-settings');
const panel = document.querySelector('#settings-panel');
const openBtn = document.querySelector('#settings-btn');

// Open
openBtn.addEventListener('click', () => {
  panel.classList.add('is-open');
});

// Save and Close
saveBtn.addEventListener('click', () => {
  // You can add your save logic here (e.g., localStorage)
  panel.classList.remove('is-open');
});
