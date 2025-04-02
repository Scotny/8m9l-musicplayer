const songs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "songs/Shape of You.mp3",
    cover: "covers/Shape_of_You.jpg",
  },
  {
    title: "Despacito",
    artist: "Luis Fonsi",
    src: "songs/Despacito.mp3",
    cover: "covers/Despacito.jpg",
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    src: "songs/Uptown Funk.mp3",
    cover: "covers/Uptown_Funk.jpg",
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    src: "songs/Believer.mp3",
    cover: "covers/Believer.jpg",
  },
  {
    title: "Dance Monkey",
    artist: "Tones and I",
    src: "songs/Dance Monkey.mp3",
    cover: "covers/Dance_Monkey.jpg",
  },
  {
    title: "Barbie Girl",
    artist: "Aqua",
    src: "songs/Barbie Girl.mp3",
    cover: "covers/Barbie_Girl.jpg",
  },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const titleElem = document.getElementById("title");
const authorElem = document.getElementById("author");
const songSelect = document.getElementById("songs_select");
const coverDiv = document.getElementById("cover");
const progressContainer = document.getElementById("progress_container");
const progress = document.getElementById("progress");

// Reset the progress bar when a new song is loaded
function loadSong(index, autoplay = false) {
  const song = songs[index];
  audio.src = song.src;
  titleElem.textContent = song.title;
  authorElem.textContent = song.artist;
  playBtn.textContent = "▶"; // Reset to play icon
  progress.style.width = "0%"; // Reset progress bar to 0% when switching songs
  audio.currentTime = 0; // Reset the song's playback to the beginning

  // Update the cover image
  coverDiv.style.backgroundImage = `url(${song.cover})`;

  // Update the select dropdown value to reflect the current song
  songSelect.value = index;

  // Autoplay if requested
  if (autoplay) {
    audio.play();
    playBtn.textContent = "⏸"; // Update button to pause icon when playing
  }
}

// Function to handle the play/pause toggle
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸"; // Change to pause icon when playing
  } else {
    audio.pause();
    playBtn.textContent = "▶"; // Change to play icon when paused
  }
}

// Functions for previous and next song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex, true); // Auto play when switching songs
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex, true); // Auto play when switching songs
}

// Update song selection from dropdown
songSelect.addEventListener("change", (event) => {
  currentSongIndex = parseInt(event.target.value);
  loadSong(currentSongIndex); // Don't play automatically when selecting from dropdown
});

// Update progress bar as the song plays
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
});

// Click on progress bar to seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// When a song ends, automatically play the next song
audio.addEventListener("ended", () => {
  nextSong(); // Move to the next song and play it
});

// Adding event listeners for buttons
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Load the first song without autoplay
loadSong(currentSongIndex);
