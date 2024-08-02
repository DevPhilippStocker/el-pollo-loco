class EndScreen extends MovableObject {
    IMAGE_END = 'img/9_intro_outro_screens/game_over/game over.png';
    IMAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';

    deadEnemies = false;
    lost = false;
    world;
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    game_lost_audio = new Audio('audio/game-over.mp3');
    game_over_audio = new Audio('audio/game-win.mp3');
    
    constructor() {
        super().loadImage('');
        this.checkGameOver();
    }

    /**
     * check game is finish
     */
    checkGameOver() {
        let id = setInterval(() => {
            if (this.world.character.isDead()) {
                this.gameLost();
                clearInterval(id);
            }
            if (this.world.endboss.isDead()) {
                this.gameWon();
                clearInterval(id);
            }
        }, 200);
    }


    /**
     * if character won the game
     */
    gameWon() {
        setTimeout(() => {
            this.img = new Image();
            this.img.src = this.IMAGE_END;
            this.deadEnemies = true; 
            if (!isSound) {
                this.game_over_audio.play();
            }
            game_music.pause();
            stopGame();
            document.getElementById('restart-button').classList.remove('d-none');
            document.getElementById('home-button').classList.remove('d-none');
        }, 200);
    }


    /**
     * if character loses the game
     */
    gameLost() {
        setTimeout(() => {
            this.img = new Image();
            this.img.src = this.IMAGE_LOST;
            this.lost = true;     
            if (!isSound) {
                this.game_lost_audio.play();
            }
            game_music.pause();
            stopGame();
            document.getElementById('restart-button').classList.remove('d-none');
            document.getElementById('home-button').classList.remove('d-none');
        }, 200);
    }

   
}

