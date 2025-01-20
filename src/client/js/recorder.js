// Today we will make an audio recorder, it's just like the video recorder that we made on the course, but only with audio:true, video:false. The user will also be able to download the recording file when the recording is over.

// 오디오 녹음기를 만들어봅시다. 이 오디오 녹음기는 audio:true, video:false 이어야 합니다. 사용자는 녹음이 끝나면 녹음 파일을 다운로드할 수 있어야 합니다.

// Features:

// 최대 5초 동안 녹음하세요.
// 녹음한 것을 웹 사이트에서 들을 수 있도록 사용자에게 녹음 미리 듣기를 제공하세요.(오디오 플레이어 만들기)
// Start Recording버튼을 만들고, 녹음이 끝나면 Download Recording버튼을 만드세요.

const btn = document.querySelector('#recordBtn');
const rec = document.querySelector('#preview');

let myStream = null;
let myRecorder = null;
let myAudioBin = null;
let limiter = null;

const downLoader = (file, fileName) => {
  const a = document.createElement('a');
  a.href = file;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleStart = async (e) => {
  btn.innerText = 'Stop';
  btn.removeEventListener('click', handleStart);
  btn.addEventListener('click', handleStop);

  myRecorder = new MediaRecorder(myStream);
  myRecorder.ondataavailable = (event) => {
    myAudioBin = URL.createObjectURL(event.data);
    rec.srcObject = null;
    rec.src = myAudioBin;
    rec.loop = true;
    rec.play();
  };
  myRecorder.start();

  limiter = setTimeout(() => {
    handleStop();
  }, 5000);
};

const handleStop = async (e) => {
  clearTimeout(limiter);
  btn.innerText = 'Download Recording';
  btn.removeEventListener('click', handleStop);
  btn.addEventListener('click', handleDownload);
  myRecorder.stop();
};

const handleDownload = (e) => {
  downLoader(myAudioBin, 'MyRecording.weba');

  btn.innerText = 'Start Recording';
  btn.removeEventListener('click', handleDownload);
  btn.addEventListener('click', handleStart);

  initRec();
};

const initRec = async () => {
  myStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  rec.srcObject = myStream;
  rec.play();
};

btn.addEventListener('click', handleStart);

initRec();
