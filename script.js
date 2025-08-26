const video = document.getElementById('mainVideo');
const playPauseBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const fullScreenBtn = document.getElementById('fullScreen');
const timeDisplay = document.getElementById('time');
const videoList = document.getElementById('videoList');
const qualitySelect = document.getElementById('qualitySelect');
const suggestedVideos = document.querySelectorAll('.suggested li');

// Play / Pause
playPauseBtn.addEventListener('click', () => {
    if(video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        video.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// Update Progress
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;

    let mins = Math.floor(video.currentTime / 60);
    let secs = Math.floor(video.currentTime % 60);
    let durMins = Math.floor(video.duration / 60);
    let durSecs = Math.floor(video.duration % 60);
    if(secs < 10) secs = '0' + secs;
    if(durSecs < 10) durSecs = '0' + durSecs;
    timeDisplay.textContent = `${mins}:${secs} / ${durMins}:${durSecs}`;
});

// Seek Video
progressBar.addEventListener('input', () => {
    video.currentTime = (progressBar.value / 100) * video.duration;
});

// Volume Control
volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value;
});

// Fullscreen
fullScreenBtn.addEventListener('click', () => {
    if(video.requestFullscreen) {
        video.requestFullscreen();
    } else if(video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if(video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});

// Playlist click
videoList.addEventListener('click', (e) => {
    const li = e.target.tagName === 'LI' ? e.target : e.target.parentElement;
    const src = li.getAttribute('data-src');
    video.src = src;
    video.play();
    playPauseBtn.textContent = '⏸️';
});

// Suggested Videos click
suggestedVideos.forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        video.src = src;
        video.play();
        playPauseBtn.textContent = '⏸️';
    });
});

// Quality Change
qualitySelect.addEventListener('change', () => {
    const currentTime = video.currentTime;
    const isPlaying = !video.paused;
    video.src = qualitySelect.value;
    video.load();
    video.currentTime = currentTime;
    if(isPlaying) video.play();
});
