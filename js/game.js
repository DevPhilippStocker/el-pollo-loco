let canvas;
let world;
let keyboard = new Keyboard();
let game_music = new Audio('audio/game-loop.mp3');
let isMusic = false;
let isOpenPopUp = false;
let isSound = false;
let isPaused = false;
let isGameStarted = false;
let intervalIds = [];
let snoring_sound = new Audio('audio/snoring.mp3');
snoring_sound.volume = 0.1;
let walk_sound = new Audio('audio/walk.mp3');
let jump_sound = new Audio('audio/jump.mp3');


/**
 * onload function, first load all images from imageCache
 */
function init() {
    awaitLoadingImages();
    canvas = document.getElementById('canvas');
}


/**
 * start game, empty object property level on reset
 * @param {this} el 
 */
function startGame(el) {
    changeClasses(el);
    requestIsSelectedSound(el);
    requestIsSelectedMusic(el);
    if (world) {
        world.deconstructor();
    }
    world = new World(canvas, keyboard); 
    touchPanel(); 
    isPaused = false;
    isGameStarted = true;
}


/**
 * load first all images before start the game
 */
async function awaitLoadingImages() {
    showLoadingScreen();
    await loadAllImagesToCache();
    hideLoadingScreen();
}


function showLoadingScreen() {
    document.getElementById('loader').classList.remove('d-none');
    document.getElementById('start-btn').disabled = true;
    document.getElementById('control-btn').disabled = true;
}


function hideLoadingScreen() {
    document.getElementById('loader').classList.add('d-none');
    document.getElementById('start-btn').disabled = false;
    document.getElementById('control-btn').disabled = false;
}


/**
 * open the gamescreen
 * @param {this} el 
 */
function changeClasses(el) {
    let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
    for (let i = 0; i < popUp.length; i++) {
        popUp[i].classList.add('d-none');  
    }
    document.getElementById('initPage').style.display = 'none';
    canvas.style.display = 'block';
    canvas.classList.add('startGameAnimation');
    document.getElementById('canvas-container').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.play-pause').src = 'img/play.png';
    document.getElementById('restart-button').classList.add('d-none');
    document.getElementById('home-button').classList.add('d-none');
}


/**
 * go to startscreen without load the page
 */
function home(el) {
    stopGame();
    document.getElementById('canvas-container').classList.add('d-none');
    document.getElementById('initPage').style.display = 'flex';
    isPaused = true;
    isGameStarted = false;
    requestIsSelectedSound(el);
}


/**
 * request if sound was selected or not, load from localStorage
 * @param {this} el 
 */
function requestIsSelectedSound(el) {
    isSound = localStorage.getItem('mute', isSound);
    if (isSound == 'true') {
       el.closest('.game-content').querySelector('.mute').src = 'img/mute.png';
       isSound = true;
    } else {
        el.closest('.game-content').querySelector('.mute').src = 'img/no-mute.png';
        isSound = false;
    } 
}


/**
 * request if music was selected or not, load from localStorage
 * @param {this} el 
 */
function requestIsSelectedMusic(el) {
    isMusic = localStorage.getItem('music_on', isMusic);
    if (isMusic == 'false') {
        el.closest('.game-content').querySelector('.music-off').src = 'img/music-off.png';
        game_music.pause();
    } else {
        el.closest('.game-content').querySelector('.music-off').src = 'img/music-on.png';
        isMusic = true;
        game_music.play();
    }
}


/**
 * game can be interrupted and continued
 * @param {this} el 
 */
function pauseAndContinueGame(el) {
    if (el == null) {
        el = document.querySelector('.play-pause');
    }
    if (!isPaused && world) {
       pause(el);
    } else if (isPaused) {
       noPause(el);
       continueGame(el); 
    } 
}


function pause(el) {
    if (isGameStarted) {
        if (el.src.match('img/play.png')) {
            el.src = 'img/pause.png';
        }
    }
    pauseGame();
    showPauseScreen();
}


function noPause(el) {
    if (el.src.match('img/pause.png')) {
        el.src = 'img/play.png';
    } 
    closePauseScreen();
}


function continueGame() {
    isMusic = localStorage.getItem('music_on', isMusic);
    if (isPaused) {
        reActivateAnimations();
        isPaused = false;
    }
    if (isMusic == 'false') {
        game_music.pause();
    } else {
        game_music.play();
    }
}


/**
 * break the game
 */
function pauseGame() {
    intervalIds.forEach(clearInterval);
    game_music.pause();
    snoring_sound.pause();
    walk_sound.pause();
    jump_sound.pause();
    isPaused = true;  
}


/**
 * finish the game
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    game_music.pause();
    game_music.currentTime = 0;
    snoring_sound.pause();
    walk_sound.pause();
    jump_sound.pause();
    isPaused = true;  
}


/**
 * reload all animation 
 */
function reActivateAnimations() {
    world.level.enemies.forEach(enemy => {enemy.animate()});
    world.level.clouds.forEach(cloud => {cloud.animate()});
    world.level.coins.forEach(coin => {coin.animate()});
    world.throwableObjects.forEach(obj => {obj.throwBottle()});
    world.throwableObjects.forEach(obj => {obj.throw()});
    world.throwableObjects.forEach(obj => {obj.animate()});
    world.character.gravity();
    world.endboss.animate();
    world.character.animate();  
    world.character.hurtCharacter();
}


/**
 * save all ID's from setIntervall in Array intervalIds
 * @param {function} fn 
 * @param {number} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function playAudio(url) {
    if(!isSound) {
        let audio = new Audio(url);
        audio.play();
    }
}


function showPauseScreen() {
    document.getElementById('canvas').classList.add('overlay-bg');  
}


function closePauseScreen() {
    document.getElementById('canvas').classList.remove('overlay-bg');
}


function doNotClosePopup(event) {
    event.stopPropagation();
}


function openPopUpGame(el) {
    let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
        for (let i = 0; i < popUp.length; i++) {
            popUp[i].classList.remove('d-none');
        }
        
    if (!isOpenPopUp) {
        pause(el);
        el.closest('.game-content').querySelector('.canvas-container .play-pause').src = 'img/pause.png';
        el.closest('.game-content').querySelector('.canvas-container .popUp').classList.remove('d-none');
        el.closest('.game-content').querySelector('.startImage').classList.add('overlay-bg');
        isOpenPopUp = true;
    } else {
        closePopUpGame(el);
    }
}


function closePopUpGame(el) {
    let popUp =  el.closest('.game-content').querySelectorAll('.popUp');
    for (let i = 0; i < popUp.length; i++) {
        popUp[i].classList.add('d-none');  
    }

    el.closest('.game-content').querySelector('.canvas').classList.remove('overlay-bg');
    el.closest('.game-content').querySelector('.startImage').classList.remove('overlay-bg');
    isOpenPopUp = false;

    if (isGameStarted) {
        openPopUpinCanva(el);
    }
}


function openPopUpinCanva(el) {
    noPause(el);
    el.closest('.game-content').querySelector('.canvas-container .popUp').classList.add('d-none');
    el.closest('.game-content').querySelector('.canvas-container .play-pause').src = 'img/play.png';
    isOpenPopUp = false;
    continueGame();
}


function fullscreen() {
    canvas.requestFullscreen();
}


function stopMusic(el) {
    if (isMusic == true) {
        game_music.pause();
        el.src = 'img/music-off.png';
        isMusic = false;
        localStorage.setItem('music_on', isMusic);
    } else {
        game_music.play();
        el.src = 'img/music-on.png';
        isMusic = true;
        localStorage.setItem('music_on', isMusic);
    }
}


function stopSound(el) {
    if (el.src.match('img/mute.png')) {
        el.src = 'img/no-mute.png';
        isSound = false;
        localStorage.setItem('mute', isSound);
    } else {
        el.src = 'img/mute.png';
        isSound = true;
        localStorage.setItem('mute', isSound);
    }
}


window.addEventListener('keydown', (event) => {
    if(event.key == " ") {
        keyboard.SPACE = true;
    }
    if(event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if(event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if(event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if(event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if(event.key == "f") {
        pauseAndContinueGame(null);
    }
});


window.addEventListener('keyup', (event) => {
    if(event.key == " ") {
        keyboard.SPACE = false;
    }
    if(event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if(event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if(event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if(event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }
});


function touchPanel() {
    document.getElementById('left-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.LEFT = true;
    });
    document.getElementById('left-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('right-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.RIGHT = true;
    });
    document.getElementById('right-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jump-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.UP = true;
    });
    document.getElementById('jump-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('throw-touch').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
         }
        keyboard.SPACE = true;
    });
    document.getElementById('throw-touch').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

