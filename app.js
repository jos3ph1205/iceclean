function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

/* --------------------------------------------------
VIDEO ELEMENTS
-------------------------------------------------- */
let heroVideo = document.querySelector("#hero-video");
let pausePlayBtnWrapper = document.querySelector(".play-btn-wrapper");
let pausePlayBtn = document.querySelector(".play-btn");
let controlsWrapper = document.querySelector(".video-controls-wrapper");
let controls = document.querySelector(".video-controls");
let progressBar = document.querySelector(".progress-bar");
let progress = document.querySelector(".progress");

/* --------------------------------------------------
VIDEO CONTROLS
-------------------------------------------------- */

// PAUSE PLAY
pausePlayBtnWrapper.addEventListener("click", (e) => {
   pausePlayBtn.classList.remove("fa-arrow-rotate-left");
   heroVideo.paused
      ? [heroVideo.play(), pausePlayBtn.classList.remove("fa-play")]
      : [heroVideo.pause(), pausePlayBtn.classList.add("fa-play")];
});

// VIDEO TIME CHANGE
heroVideo.addEventListener('timeupdate', e => {
   if (e.target.currentTime != heroVideo.duration && heroVideo.paused) {
      pausePlayBtn.classList.add("fa-play");
   }

   // VIDEO ENDED
   if (e.target.currentTime == heroVideo.duration) {
      pausePlayBtn.classList.add("fa-arrow-rotate-left");
   }
})

/* --------------------------------------------------
VIDEO CONTROLS HIDE TOGGLE
-------------------------------------------------- */
var timeDelay = 1;
var timeDelayMax = 5;
function delayCheck() {
   if (timeDelay == timeDelayMax) {
      controls.style.opacity = "0";
      controls.style.pointerEvents = "none";
      timeDelay = 1;
   }
   timeDelay++;
}

var delay = setInterval(delayCheck, 1000);

controlsWrapper.addEventListener("mousemove", (e) => {
   console.log('move')
   controls.style.opacity = "1";
   controls.style.pointerEvents = "unset";
   timeDelay = 1;
   clearInterval(delay);
   delay = setInterval(delayCheck, 500);
});
controlsWrapper.addEventListener("click", (e) => {
   controls.style.opacity = "1";
   controls.style.pointerEvents = "unset";
   timeDelay = 1;
   clearInterval(delay);
   delay = setInterval(delayCheck, 500);
});

// PROGRESS BAR
heroVideo.addEventListener("timeupdate", (e) => {
   const percentage = (heroVideo.currentTime / heroVideo.duration) * 100;
   progress.style.width = `${percentage}%`;
});

// PROGRESS BAR SCRUB
progressBar.addEventListener("click", (e) => {
   const progressTime = (e.offsetX / progressBar.offsetWidth) * heroVideo.duration;
   heroVideo.currentTime = progressTime;
});

const panX = 60;
const panY = 70;

const thumbnail = document.querySelectorAll(".best-seller-thumb").forEach((thumb) => {
   const image = thumb.querySelector("img");

   thumb.addEventListener("mousemove", (e) => {
      e.stopPropagation();
      let target = e.currentTarget;

      let x = e.offsetX - target.offsetWidth / 2;
      let y = e.offsetY - target.offsetHeight / 2;

      let translateX = ((x / target.offsetWidth) * panX).toFixed(1) * -1;
      let translateY = ((y / target.offsetHeight) * panY).toFixed(1) * -1;

      if (e.target == thumb) {
         image.animate(
            {
               transform: `translate(${translateX}%, ${translateY}%)`,
            },
            { duration: 500, fill: "forwards", easing: "ease" }
         );
      }
   });

   thumb.addEventListener("mouseleave", (e) => {
      image.animate(
         {
            transform: `translate(0%)`,
         },
         { duration: 400, fill: "forwards" }
      );
   });
});

/* --------------------------------------------------
MOBILE MENU TOGGLE
-------------------------------------------------- */

let menuToggleBtn = document.querySelectorAll(".menu-tog");
let mobileMenu = document.querySelector(".mobile-menu");

menuToggleBtn.forEach((btn) => {
   btn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
   })
});
