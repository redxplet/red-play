const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");
const fileInput = document.getElementById("fileInput");
const urlInput = document.getElementById("urlInput");
const loadUrlBtn = document.getElementById("loadUrl");

// تشغيل / إيقاف
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// تقديم 10 ثواني
forwardBtn.addEventListener("click", () => {
  video.currentTime += 10;
});

// ترجيع 10 ثواني
rewindBtn.addEventListener("click", () => {
  video.currentTime -= 10;
});

// التحكم بشريط التقدم
video.addEventListener("timeupdate", () => {
  progress.value = (video.currentTime / video.duration) * 100;
});

progress.addEventListener("input", () => {
  video.currentTime = (progress.value / 100) * video.duration;
});

// التحكم بالصوت
volume.addEventListener("input", () => {
  video.volume = volume.value;
});

// ملء الشاشة
fullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { 
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { 
    video.msRequestFullscreen();
  }
});

// تحميل فيديو من الجهاز
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    video.src = url;
    video.play();
    playPauseBtn.textContent = "⏸";
  }
});

// تشغيل فيديو من رابط خارجي
loadUrlBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (url) {
    video.src = url;
    video.play();
    playPauseBtn.textContent = "⏸";
  }
});

// اختصارات الكيبورد
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ": // Space Play/Pause
      event.preventDefault();
      playPauseBtn.click();
      break;
    case "ArrowRight": // تقديم
      video.currentTime += 5;
      break;
    case "ArrowLeft": // ترجيع
      video.currentTime -= 5;
      break;
    case "ArrowUp": // رفع الصوت
      if (video.volume < 1) video.volume = Math.min(1, video.volume + 0.1);
      volume.value = video.volume;
      break;
    case "ArrowDown": // خفض الصوت
      if (video.volume > 0) video.volume = Math.max(0, video.volume - 0.1);
      volume.value = video.volume;
      break;
  }
});
