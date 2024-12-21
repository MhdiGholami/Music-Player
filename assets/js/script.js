// Music List Project
// ************************


// Dom Elements Selection
const titlePlayImg = document.querySelector('.title-playImg')
const titlePlayIcon = document.querySelector('.title-playIcon')
const titleMusicName = document.getElementById('titleMusicName')
const titleMusicArtist = document.getElementById('titleMusicArtist')
const musicPlayer = document.getElementById('music-player')
const previousBtn = document.getElementById('previous-button')
const nextBtn = document.getElementById('next-button')
const listText = document.querySelector('.list-text')
const list = document.querySelectorAll('.list')
const musicList = document.getElementById('music-list')
const durationWrapper = document.querySelector('.duration-wrapper')
const durationElem = document.getElementById('duration')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const musicTime = document.querySelector('.music-time')
const favoriteIcon = document.getElementById('favorite-icon')
const homeIcon = document.getElementById('home-icon')
const playlistIcon = document.getElementById('playlist-icon')

// Check if Playing
let isPlaying = false

// Current Song
let songIndex = 0;

// My Musics Array
let playlist = [
    {
        id: 0,
        name: 'All The Way Up',
        artist: 'Fat Joe & Remy Ma',
        musicUrl: 'assets/media/music0.mp3',
        coverUrl: 'assets/images/FatJoe.jpg',
    },
    {
        id: 1,
        name: 'Paris',
        artist: 'Willy William feat. Cris Cab',
        musicUrl: 'assets/media/music3.mp3',
        coverUrl: 'assets/images/William.jpg',
    },
    {
        id: 2,
        name: 'Alors On Danse',
        artist: 'Stromae',
        musicUrl: 'assets/media/music2.mp3',
        coverUrl: 'assets/images/Stormae.jpg',
    },
    {
        id: 3,
        name: 'Dharia',
        artist: 'Sugar & Brownies',
        musicUrl: 'assets/media/music1.mp3',
        coverUrl: 'assets/images/Dharia.jpg',
    },
    {
        id: 4,
        name: 'Calm Down',
        artist: 'Rema',
        musicUrl: 'assets/media/music4.mp3',
        coverUrl: 'assets/images/Rema.webp',
    },
    {
        id: 5,
        name: 'Believer',
        artist: 'Imagine Dragonse',
        musicUrl: 'assets/media/music5.mp3',
        coverUrl: 'assets/images/Beliver.jpg',
    },
    {
        id: 6,
        name: 'Changes',
        artist: 'Xxxtentacion',
        musicUrl: 'assets/media/music6.mp3',
        coverUrl: 'assets/images/XXXTENTACION.jpg',
    },
]

/*///////////////////////////////////////////////////////////////////////////////////////////////*/


// onload function set music array data on elements and show them
window.onload = function () {
    for (let i = 0; i < playlist.length; i++) {
        let newMusic = document.createElement('div')
        newMusic.setAttribute('class', 'music')
        newMusic.setAttribute('data-number', i)
        newMusic.innerHTML = `
            <div class="list-image">
                <img class="list-playImg" src="${playlist[i].coverUrl}" alt="">
                <audio id="music-player" src="${playlist[i].musicUrl}"></audio>
                <img onclick="playBtn(event)" class="list-playIcon" src="assets/images/play_icon.svg" alt="">
            </div>
            <div class="list-text">
                <h4 class="list-title">${playlist[i].name}</h4>
                <h4 class="list-singer">${playlist[i].artist}</h4>
            </div>
            <div class="list-icon">
                <div>
                    <img data-check="false" onclick="checkFavorite(event)" src="assets/images/icon-star.png" alt="">
                </div>
                <div>
                    <img data-check="false" onclick="checkAddList(event)" src="assets/images/icon-playlist.png" alt="">
                </div>
            </div>
        `
        musicList.append(newMusic)
    }
}

// Function for play or pause music
function musicPlayerBtn() {
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
        durationWrapper.classList.remove('opacity')
    }
}

// Function for play
function playSong() {
    isPlaying = true;
    titlePlayIcon.setAttribute('src', 'assets/images/pause-icon.png')
    musicPlayer.play();
}

// Function for pause
function pauseSong() {
    isPlaying = false;
    titlePlayIcon.setAttribute('src', 'assets/images/play_icon.svg')
    musicPlayer.pause();
}

// On Load - Select First Song
loadSong(playlist[songIndex]);

// Update DOM
function loadSong(song) {
    titleMusicName.textContent = song.name;
    titleMusicArtist.textContent = song.artist;
    musicPlayer.src = song.musicUrl;
    titlePlayImg.setAttribute('src', song.coverUrl)
}

// Function for go to next music
function nextSong() {
    songIndex++;
    if (songIndex > playlist.length - 1) {
        songIndex = 0;
    }
    loadSong(playlist[songIndex]);
    playSong();
}

// Function for go to previous music
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    loadSong(playlist[songIndex]);
    playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
        durationElem.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
}

// Function when title play icon click
function playBtn(event) {
    titlePlayImg.setAttribute('src', event.target.previousElementSibling.previousElementSibling.src)
    titleMusicName.innerText = event.target.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText
    titleMusicArtist.innerText = event.target.previousElementSibling.parentElement.nextElementSibling.lastElementChild.innerText
    titlePlayIcon.setAttribute('src', 'assets/images/pause-icon.png')
    musicPlayer.setAttribute('src', event.target.previousElementSibling.src)
    durationWrapper.classList.remove('opacity')
    playSong()
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = musicPlayer.duration;
    musicPlayer.currentTime = (clickX / width) * duration;
}

// Function when the favorite star button is clicked
function checkFavorite(event) {
    if (event.target.dataset.check === 'false') {
        event.target.setAttribute('src', 'assets/images/icon-star-fill.png')
        event.target.dataset.check = 'true'
    } else {
        event.target.setAttribute('src', 'assets/images/icon-star.png')
        event.target.dataset.check = 'false'
    }
}

// Function when the add playlist button is clicked
function checkAddList(event) {
    if (event.target.dataset.check === 'false') {
        event.target.setAttribute('src', 'assets/images/icon-playlist-fill.png')
        event.target.dataset.check = 'true'
    } else {
        event.target.setAttribute('src', 'assets/images/icon-playlist.png')
        event.target.dataset.check = 'false'
    }
}

// Function for go and show favorite musics
function showFavoriteItems() {
    for (let i = 0; i < musicList.children.length; i++) {

        if (musicList.children[i].lastElementChild.firstElementChild.firstElementChild.dataset.check === 'false') {
            musicList.children[i].style.display = 'none'
        } else {
            musicList.children[i].style.display = 'flex'
        }
    }
}

// Function for go back home and show all musics
function showHomeItems() {
    for (let i = 0; i < musicList.children.length; i++) {

        musicList.children[i].style.display = 'flex'
    }
}

// Function for go and show playlist musics
function showPlaylistItems() {
    for (let i = 0; i < musicList.children.length; i++) {

        if (musicList.children[i].lastElementChild.lastElementChild.firstElementChild.dataset.check === 'false') {
            musicList.children[i].style.display = 'none'
        } else {
            musicList.children[i].style.display = 'flex'
        }
    }
}

// all addEventListeners
musicPlayer.addEventListener('timeupdate', updateProgressBar)
titlePlayIcon.addEventListener('click', musicPlayerBtn)
musicTime.addEventListener('click', setProgressBar)
homeIcon.addEventListener('click', showHomeItems)
favoriteIcon.addEventListener('click', showFavoriteItems)
playlistIcon.addEventListener('click', showPlaylistItems)
nextBtn.addEventListener('click', nextSong)
previousBtn.addEventListener('click', prevSong)