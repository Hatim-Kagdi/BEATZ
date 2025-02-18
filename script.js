console.log("Welcome to Spotify");

//Initialize 
let songIndex  = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar  = document.getElementById('myProgressBar');
let masterSongName  = document.getElementById('masterSongName');
let gif  = document.getElementById('gif');
let songs = [
{songName : "Warriyo - Mortals [NCS Release]" , filePath : "songs/1.mp3" , coverPath : "covers/1.jpg"},
{songName : "Cielo - Huma-Huma" , filePath : "songs/2.mp3" , coverPath : "covers/2.jpg"},
{songName : "DEAF KEV - Invincible [NCS Release]" , filePath : "songs/3.mp3" , coverPath : "covers/3.jpg"},
{songName : "Different Heaven & EH!DE - My Heart [NCS Release]" , filePath : "songs/4.mp3" , coverPath : "covers/4.jpg"},
{songName : "Janji-Heroes-Tonight-feat-Johnning-NCS-Release" , filePath : "songs/5.mp3" , coverPath : "covers/5.jpg"},
{songName : "Cartoon, Jéja - On & On (feat. Daniel Levi) NCS - Copyright Free Music" , filePath : "songs/6.mp3" , coverPath : "covers/6.jpg"},
{songName : "ONLAP - Unstoppable (2023 Copyright Free Music)" , filePath : "songs/7.mp3" , coverPath : "covers/7.jpg"}
]

// audioElement.play();
//Handle Play and Pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=> {

//Update Seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration) *100);
myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})
const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id); // Get clicked song index
        
        // If clicking on the currently playing song, toggle play/pause
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Otherwise, play the selected song
            makeAllplays();
            songIndex = clickedIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath; // Set correct file path
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});


document.getElementById('next').addEventListener('click' , () =>{
if(songIndex >= 6){
    songIndex = 0;
}
else{
    songIndex += 1;
}
audioElement.src = `songs/${songIndex+1}.mp3`;
masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex === 0) {
        songIndex = songs.length - 1; // Jump to last song
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`; // Fixed path usage
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
