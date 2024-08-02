class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.animate();
        this.throw();
        this.throwBottle();
    }


    /**
     * bottles can be thrown with a defined speed and play a sound when bottle fall on the floor
     */
    throw() {
        this.speedY = 30; // attack hight
        this.gravity();
        setStoppableInterval(() => this.throwBottle(), 25);
        setTimeout(function(){ 
            if(!isPaused) {
                playAudio('audio/bottle-splash.mp3');
            }
        }, 800) 
    }


    /**
     * Throw distance
     */
    throwBottle() {
        this.x += 7;
    }


    /**
     * when collide a bottle with enemy then show images of bottle splash, if not bottle rotated
     */
    animate() {
        setStoppableInterval(() => {
            if (this.y > 250 || this.hurtEndboss() || this.killChicken()) {
                this.playAnimation(this.IMAGES_BOTTLES_SPLASH);
                this.x += 5;
            } else {
                this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
            }
        }, 80);

    }
}