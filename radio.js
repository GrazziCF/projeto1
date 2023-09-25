
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');


let track_list = [{
        name: "Seven",
        artist: "Jeon JungKook",
        image: "https://i.pinimg.com/564x/76/65/fa/7665fafb1596ce2ee8eb5e27ca8c4949.jpg",
        path: "seven.mp3"
    },
    {
        name: "Golden Hour",
        artist: "JVKE",
        image: "https://i.pinimg.com/564x/07/de/9d/07de9d4d25e8eb8b47ddded51e5f550b.jpg",
        path: "goldenhour.mp3"
    },
    {
        name: "Last Friday Night",
        artist: "Katy Perry",
        image: "https://i.pinimg.com/564x/79/df/6d/79df6d2a502595f0c853292e76c9d6c7.jpg",
        path: "lastfriday.mp3",
    },
    {
        name: "Still Love You",
        artist: "Lee Hong Gi",
        image: "https://i.pinimg.com/564x/73/af/9d/73af9d1f02668d600179aec73a29dde2.jpg",
        path: "leehong.mp3",
    },
    {
        name: "Mirrors",
        artist: "Justin Timberlake",
        image: "https://i.pinimg.com/564x/84/04/01/840401115b1f574cd33048e4b4fb33da.jpg",
        path: "mirros.mp3",
    },
    {
        name: "Strange Vibes",
        artist: "Dj Boss",
        image: "https://i.pinimg.com/564x/9f/10/c1/9f10c176dba9523c73725d6c09e01085.jpg",
        path: "strangervibes.mp3",
    },
    {
        name: "The Hills x The Color Violet x Creepin",
        artist: "Xanemusic, NVBR",
        image: "https://i.pinimg.com/564x/d6/61/0f/d6610f2b801d6e8360421f5c2bf08102.jpg",
        path: "thehills.mp3",
    },
    {
        name: "Fever",
        artist: "Enhypen",
        image: "https://i.pinimg.com/564x/9c/cc/82/9ccc822172defd9a6b556ff35b5f89e1.jpg",
        path: "fever.mp3",
    },
    {
        name: "Congratulations",
        artist: "Post Malone",
        image: "https://i.pinimg.com/564x/d6/04/19/d60419854ceb1f68a423f36aad380e36.jpg",
        path: "congratulations.mp3",
    },
    {
        name: "Daylight",
        artist: "David Kushner",
        image: "https://i.pinimg.com/564x/5e/7b/f1/5e7bf18d5470cb99f4d5d00aecab61a6.jpg",
        path: "daylight.mp3",
    },
];

function loadTrack(track_index) {
    
    clearInterval(updateTimer);
    resetValues();

    
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PRODUZINDO " + (track_index + 1) + " DE " + track_list.length;

    
    updateTimer = setInterval(seekUpdate, 1000);

    
    curr_track.addEventListener("ended", nextTrack);

  
    random_bg_color();
}

function random_bg_color() {
   
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

   
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    
    document.body.style.background = bgColor;
}


function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
   
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
   
    curr_track.play();
    isPlaying = true;

 
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
   
    curr_track.pause();
    isPlaying = false;

    
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
   
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
  
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

   
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
  
    seekto = curr_track.duration * (seek_slider.value / 100);

    
    curr_track.currentTime = seekto;
}

function setVolume() {

    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

       
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

       
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);
