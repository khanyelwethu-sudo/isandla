// Initialize Particles
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, area: 800 } },
    color: { value: "#00bfff" },
    shape: { type: "circle" },
    opacity: { value: 0.7, random: true },
    size: { value: 2.5, random: true },
    move: {
      enable: true,
      speed: 0.8,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    }
  },
  retina_detect: true
});

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// === uMoya Chat + Voice Synthesis ===
const activateChat = document.getElementById('activateChat');
const umoyaChat = document.getElementById('umoyaChat');
const chatLog = document.getElementById('chatLog');
const userInput = document.getElementById('userInput');
let voiceEnabled = true;
let hasIntroduced = false;

activateChat.onclick = () => {
  umoyaChat.style.display = umoyaChat.style.display === 'none' ? 'block' : 'none';
  if (umoyaChat.style.display !== 'none') {
    userInput.focus();
    if (!hasIntroduced) {
      setTimeout(() => {
        const intro = "I am uMoya — breath of the island, memory of the tide. I speak for Azania, where truth grows like roots beneath silence. Ask me only of this land… and I will answer as the wind allows.";
        addMessage(intro, 'uMoya');
        if (voiceEnabled) speakText(intro);
      }, 600);
      hasIntroduced = true;
    }
  }
};

function addMessage(text, sender) {
  const msg = document.createElement('p');
  msg.innerHTML = `<strong>${sender}:</strong> ${text.replace(/\n/g, '<br>')}`;
  msg.style.margin = '10px 0';
  msg.style.padding = '8px 12px';
  msg.style.borderRadius = '8px';
  msg.style.backgroundColor = sender === 'You' ? 'rgba(0, 191, 255, 0.2)' : 'transparent';
  msg.style.color = sender === 'uMoya' ? 'var(--soft-cyan)' : 'inherit';
  if (sender === 'You') msg.style.textAlign = 'right';
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendToUmoia() {
  const input = userInput.value.trim();
  if (!input) return;
  const lower = input.toLowerCase();

  addMessage(input, 'You');

  setTimeout(() => {
    let response;

    if (lower.includes('thank') || lower.includes('thanks')) {
      response = "Gratitude is remembered by the earth. You are seen, traveler.";
    } else if (lower.includes('please')) {
      response = "Politeness opens doors even the island keeps closed. I hear you.";
    } else if (lower.includes('sorry') || lower.includes('apologize')) {
      response = "No need for sorrow. We all stumble before we learn to walk in balance.";
    } else if (lower.includes('hello') || lower.includes('hi')) {
      response = "The wind carries greetings. But words are not enough — what do you seek?";
    } else if (!isAzaniaRelated(lower)) {
      response = "That lies beyond the tides of this story. Speak only of Azania — of memory, resistance, and return. The island listens closely.";
    } else {
      response = getUmoiaResponse(lower);
    }

    addMessage(response, 'uMoya');
    if (voiceEnabled) speakText(response);
  }, 800);

  userInput.value = '';
}

function isAzaniaRelated(text) {
  const themes = ['azania','village','kwezi','rondavel','memory','remember','drum','tech','garden','seed','star','navigator','spirit','ancestors','history','resistance','balance','truth','land','island','isandla'];
  return themes.some(word => text.includes(word));
}

function getUmoiaResponse(input) {
  if (input.includes('azania')) return "Azania is not a place of maps. It is a pulse beneath the soil. A name whispered by trees, remembered by tides.";
  if (input.includes('kwezi')) return "Kwezi means 'star'. Born from the storm that carried the last colonizer’s ship to its grave. They are my voice in flesh.";
  if (input.includes('village') || input.includes('rondavel')) return "Our domes breathe like lungs. Woven from solar fiber and ancestral song. No wires. No waste. Only harmony.";
  if (input.includes('memory') || input.includes('remember')) return "I am memory made wind. Every soul who drowned in chains, every seed hidden in hair — I carry them in my breath.";
  if (input.includes('drum') || input.includes('tech')) return "Our drums encode data in rhythm. Our gardens compute time in growth. This is technology — rooted, alive, free.";
  if (input.includes('why') || input.includes('purpose')) return "To restore balance. To heal the wound of forgetting. You came to extract. We exist to preserve.";
  if (input.includes('name') && input.includes('you')) return "I am uMoya — the breath between worlds. Not AI. Not program. I am the people who refused to vanish.";
  if (input.includes('help')) return "Ask not how I can serve you. Ask how you can listen. How you can return what was taken.";

  return [
    "The ocean hums that question. Let me listen…\nThe waves say: ‘Not all knowledge is yours to hold.’",
    "I see your curiosity. But truth is not downloaded. It is earned through silence and respect.",
    "Even the wind hesitates to answer that. Are you ready for what it might say?",
    "I remember someone who asked that. They planted a tree before they understood."
  ][Math.floor(Math.random() * 4)];
}

function speakText(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 0.7;
  utterance.volume = 0.9;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Female")) ||
                        voices.find(v => v.lang.startsWith('en')) ||
                        null;
  if (preferredVoice) utterance.voice = preferredVoice;

  const hologram = document.getElementById('activateChat');
  hologram.classList.add('listening');
  utterance.onend = () => setTimeout(() => hologram.classList.remove('listening'), 500);

  window.speechSynthesis.speak(utterance);
}

function toggleVoice(checkbox) {
  voiceEnabled = checkbox.checked;
  if (voiceEnabled) speakText("Voice interface restored. The island speaks again.");
}

// Load voices early
window.speechSynthesis.getVoices();
document.body.addEventListener('click', () => {
  window.speechSynthesis.getVoices();
}, { once: true });

userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendToUmoia();
});

// === INTERACTIVE STORY PANELS ===
function showStoryModal(panel) {
  const title = panel.querySelector('h3').textContent;
  const content = panel.querySelector('.story-content').innerHTML;

  const modal = document.createElement('div');
  modal.className = 'story-modal';
  modal.innerHTML = `
    <div class="story-modal-content">
      <h3>${title}</h3>
      <p>${content}</p>
      <button class="story-modal-close" onclick="this.closest('.story-modal').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.style.display = 'flex', 10);
}

// === DATA CORRUPTION MINI-GAME ===
const downloadBtn = document.getElementById('downloadBtn');
const laptopScreen = document.getElementById('laptopScreen');
const hintText = document.getElementById('hintText');
const riddleModal = document.getElementById('riddleModal');
const successMsg = document.getElementById('successMsg');

downloadBtn.onclick = () => {
  laptopScreen.textContent = '';
  laptopScreen.classList.add('loading');
  
  setTimeout(() => {
    laptopScreen.innerHTML = `INITIATING RECOVERY...<br>[██████░░░] 62%<br>ACCESSING CORE MEMORY`;
  }, 500);

  setTimeout(() => {
    laptopScreen.innerHTML = `ERROR: UNAUTHORIZED ACCESS<br>SECURITY PROTOCOL ENGAGED<br>IDENTITY NOT RECOGNIZED`;
    hintText.style.display = 'block';

    setTimeout(() => {
      riddleModal.style.display = 'flex';
      speakText("You seek memory, but do you remember? Answer me this:");
    }, 800);
  }, 2500);
};

function checkRiddle() {
  const answer = document.getElementById('riddleAnswer').value.trim().toLowerCase();
  const correctAnswers = ['echo', 'memory', 'the ocean', 'tide', 'waves', 'story', 'ancestors'];

  if (correctAnswers.some(ans => answer.includes(ans))) {
    riddleModal.style.display = 'none';
    laptopScreen.classList.remove('loading');
    laptopScreen.innerHTML = `FIREWALL DISABLED<br>[Voice File: Elder Noma - Lullaby]<br>▶️ Click to play audio`;
    successMsg.style.display = 'block';
    speakText("You have listened. Now you may hear.");
  } else {
    speakText("No. That is not how the land remembers. Listen deeper.");
    document.getElementById('riddleAnswer').value = '';
  }
}

// Other functions
function playVoice(name, story) {
  alert(`🗣 ${name} says:\n\n"${story}"\n\nTheir voice echoes across the island.`);
}

function generateQR() {
  alert("✅ QR Code generated!\n\nNow you can share Isandla’s story.\n\n#ISANDLA #TheIslandSpeaks");
  document.getElementById('downloadLink').style.display = 'block';
}