function customMainVideoPlayer() {
  const video = document.querySelector('.main-player__video');
  const playBtn = document.querySelector('.main-player__play-btn');
  const bigPlayBtn = document.querySelector('.main-player__big-btn');
  const progress = document.querySelector('.main-player__progress');
  const volume = document.querySelector('.main-player__volume');
  const muteBtn = document.querySelector('.main-player__mute');
  const fullscreenBtn = document.querySelector('.main-player__fullscreen');
  const speedInfo = document.querySelector('.main-player__speed');
  const preloader = document.querySelector('.main-player__preloader');

  let isMuted = false;
  let currentSpeed = 1.0;

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
      if (preloader) preloader.style.display = 'none';
    } else {
      video.pause();
    }
    updatePlayButtons();
  }

  function updatePlayButtons() {
    if (video.paused) {
      playBtn.classList.remove('pause');
      bigPlayBtn.style.display = 'block';
      speedInfo.style.display = 'none';
    } else {
      playBtn.classList.add('pause');
      bigPlayBtn.style.display = 'none';
      speedInfo.style.display = 'block';
    }
  }

  video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.value = percent;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #fff ${percent}%, white 100%)`;
  });

  progress.addEventListener('input', () => {
    const value = progress.value;
    video.currentTime = (value / 100) * video.duration;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  });

  video.addEventListener('ended', () => {
    video.pause();
    video.currentTime = 0;
    updatePlayButtons();
    progress.value = 0;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;

    if (preloader) preloader.style.display = 'block';
  });

  volume.addEventListener('input', () => {
    const value = volume.value;
    video.volume = value;
    video.muted = value === '0';
    isMuted = video.muted;
    updateVolumeIcon();

    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #fff ${value * 100}%, white 100%)`;
  });

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    video.muted = isMuted;
    volume.value = isMuted ? 0 : video.volume;
    updateVolumeIcon();

    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume.value * 100}%, #fff ${volume.value * 100}%, white 100%)`;
  });

  function updateVolumeIcon() {
    muteBtn.classList.toggle('muted', video.muted || volume.value === '0');
  }

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  function updateSpeedDisplay() {
    speedInfo.textContent = `${currentSpeed.toFixed(1)}x`;
    speedInfo.style.opacity = 1;
    clearTimeout(speedInfo.timeout);
    speedInfo.timeout = setTimeout(() => {
      speedInfo.style.opacity = 0;
    }, 1000);
  }

  function changeSpeed(delta) {
    currentSpeed = Math.max(0.25, Math.min(2.0, currentSpeed + delta));
    video.playbackRate = currentSpeed;
    updateSpeedDisplay();
  }

  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
        muteBtn.click();
        break;
      case 'f':
        fullscreenBtn.click();
        break;
      case '>':
        if (e.shiftKey) changeSpeed(0.25);
        break;
      case '<':
        if (e.shiftKey) changeSpeed(-0.25);
        break;
    }
  });

  playBtn.addEventListener('click', togglePlay);
  bigPlayBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', () => {
    updatePlayButtons();
    if (preloader) preloader.style.display = 'none';
  });
  video.addEventListener('pause', updatePlayButtons);

  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
  volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume.value * 100}%, #fff ${volume.value * 100}%, white 100%)`;

  // Exposing the API for controlling the video from other elements on the page
  window.mainPlayerAPI = {
    stopMainVideo: () => {
      video.pause(); // Stops video playback
      video.currentTime = 0; // Resets video to the start
      updatePlayButtons(); // Updates the play/pause button
      progress.value = 0; // Resets progress bar to 0
      progress.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
    },
  };
}

customMainVideoPlayer();
