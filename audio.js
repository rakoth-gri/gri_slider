const audio = document.getElementById("audio")
const playBtn = document.querySelector(".audio__play");
const pauseBtn = document.querySelector(".audio__pause");
const progress = document.querySelector(
  ".audio__progress"
);
const stopBtn = document.querySelector(".audio__stop");
const loopBtn = document.querySelector(".audio__loop");
const muteBtn = document.querySelector(".audio__mute");

audio.oncanplaythrough = (e) =>e.target.volume = 0.2;

playBtn.onclick = function () {
    if(audio.paused) {
        playAudio();
        [playBtn, pauseBtn].forEach(btn => btn.classList.remove("active"))    
        toggleActive(this);        
    }       
};

stopBtn.onclick = function () { 
    audio.pause();
    audio.currentTime = 0;
    [playBtn, pauseBtn].forEach(btn => btn.classList.remove("active"))      
};

muteBtn.onclick = function () {
  if (audio.volume) {
    audio.volume = 0;
    toggleActive(this);   
  } else {
    toggleActive(this);
    audio.volume = 0.2
  }  
};

loopBtn.onclick = function () {
  if (!audio.loop) {
    audio.loop = true;
    toggleActive(this);
  } else {
    audio.loop = false;
    toggleActive(this);
  } 
};

pauseBtn.onclick = function () {
    if (!audio.paused) {
        audio.pause();
        [playBtn, pauseBtn].forEach(btn => btn.classList.remove("active"))    
        toggleActive(this);        
    }
};

audio.addEventListener("timeupdate", function () {
  const currCompletePerc = (this.currentTime * 100) / this.duration;
  progress.value = currCompletePerc;
});

async function playAudio() {
  try {
    await audio.play();
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

const toggleActive = (el) => el.classList.toggle("active");


