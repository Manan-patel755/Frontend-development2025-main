const playlist = [
  {
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    cover: "https://via.placeholder.com/300x300/60a5fa/ffffff?text=Acoustic"
  },
  {
    title: "Creative Minds",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    cover: "https://via.placeholder.com/300x300/fbbf24/ffffff?text=Creative"
  },
  {
    title: "Sunny",
    artist: "Benjamin Tissot",
    src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    cover: "https://via.placeholder.com/300x300/34d399/ffffff?text=Sunny"
  }
];

const audio = document.getElementById('audio');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeEl = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

let currentIndex = 0;
let isPlaying = false;

function loadTrack(index){
  const track = playlist[index];
  audio.src = track.src;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  coverEl.src = track.cover;
  [...playlistEl.children].forEach((el,i)=>{
    el.classList.toggle('active', i===index);
  });
}

function playTrack(){
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
}

function pauseTrack(){
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

function togglePlay(){
  isPlaying ? pauseTrack() : playTrack();
}

function nextTrack(){
  currentIndex = (currentIndex+1)%playlist.length;
  loadTrack(currentIndex);
  playTrack();
}

function prevTrack(){
  currentIndex = (currentIndex-1+playlist.length)%playlist.length;
  loadTrack(currentIndex);
  playTrack();
}

function updateProgress(){
  if(audio.duration){
    const percent = (audio.currentTime / audio.duration)*100;
    progress.style.width = percent+'%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

function setProgress(e){
  const rect = progressBar.getBoundingClientRect();
  const offset = e.clientX - rect.left;
  const percent = offset/rect.width;
  audio.currentTime = percent * audio.duration;
}

function formatTime(sec){
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function buildPlaylist(){
  playlistEl.innerHTML = '';
  playlist.forEach((track,i)=>{
    const el = document.createElement('div');
    el.className = 'track';
    el.innerHTML = `<div class="t-title">${track.title}</div><div class="t-artist">${track.artist}</div>`;
    el.addEventListener('click',()=>{currentIndex=i;loadTrack(i);playTrack();});
    playlistEl.appendChild(el);
  });
}

// Events
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);
progressBar.addEventListener('click', setProgress);
volumeEl.addEventListener('input', ()=> audio.volume = volumeEl.value);

// Init
buildPlaylist();
loadTrack(currentIndex);
