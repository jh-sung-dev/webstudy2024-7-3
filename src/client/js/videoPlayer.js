const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);

// Today we will finish making our video player! Based on today's videos implement the following controls for the video:

// 현재 시간 표시
// 타임라인(비디오 진행 상태, 클릭 시 점프)
// 전체 화면
// 단축키: Space를 눌러 일시 중지, 'F'를 눌러 전체 화면 모드로 들어가기, Esc 키를 눌러 전체 화면 모드에서 나오기

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const formatting = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

video.addEventListener("loadedmetadata", () => {
  totalTime.innerText = formatting(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
});

video.addEventListener("timeupdate", () => {
  currentTime.innerText = formatting(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
});

timeline.addEventListener("input", (event) => {
  video.currentTime = event.target.value;
});

const enterFullScreen = () => {
  videoContainer.requestFullscreen();
};
const exitFullScreen = () => {
  document.exitFullscreen();
};

const handleFullScreen = () => {
  if (document.fullscreenElement) {
    exitFullScreen();
  } else {
    enterFullScreen();
  }
};

fullScreenBtn.addEventListener("click", handleFullScreen);

addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    handlePlayAndStop();
  // } else if (event.code === "KeyF") {
  //   enterFullScreen();
  } else if (event.code === "Escape") {
    exitFullScreen();
  }
});

addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    videoController.classList.replace(
      "videoControllerNormal",
      "videoControllerFull"
    );
  } else {
    fullScreenBtn.classList.replace("fa-compress", "fa-expand");
    videoController.classList.replace(
      "videoControllerFull",
      "videoControllerNormal"
    );
  }
  video.classList.toggle("videoFullScreen");
});

video.addEventListener("ended", () => {
  const { videoid } = videoContainer.dataset;
  fetch(`/api/videos/${videoid}/view`, { method: "POST" });
});
