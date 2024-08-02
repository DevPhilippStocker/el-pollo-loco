class Character extends MovableObject {
    y = 50;
    width = 140;
    height = 280;
    speed = 7;
    offset = {
        top: 120,
        left: 40,
        right: 40,
        bottom: 30,
    };
    idleTimer = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'

    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ]

    world;

   
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.hurtCharacter();
        this.gravity();
    }


    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 100);
        setStoppableInterval(() => this.idleAnimation(), 150);
    }


    /**
     * press < move left, press > move right, press ^ jump
     */
    moveCharacter() {
        walk_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
           this.walk_right();
           if(!isSound) {
                walk_sound.play();
                snoring_sound.pause();    
           }
        }

        if(this.world.keyboard.LEFT && this.x > 0) {
            this.walk_left();
            if(!isSound) {
                walk_sound.play();
                snoring_sound.pause();
            }
        }
     
        if (this.world.keyboard.UP && !this.isJumping()) {
            this.jump();
            if(!isSound) {
                jump_sound.play();
                snoring_sound.pause();
            }
        }
        this.world.camera_x = -this.x + 100;
    }
        
    
    /**
     * show images, if character is dead, is hurt or jumping
     */
    playCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isJumping()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    /**
     * show images, when character is colliding with enemies
     */
    hurtCharacter() {
        setStoppableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                playAudio('audio/hurt.mp3');
            }
        }, 200);
    }


    /**
     * show images, if character is sleeping, time will be calculate if character start to sleep
     */
    idleAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP) {
            this.idleTimer = 0;
        }
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && this.idleTimer < 7300 && !this.isDead()) {
            this.playAnimation(this.IMAGES_IDLE);
            this.idleTimer += 250;
        } 
        if (this.idleTimer >= 7300 && !this.isDead()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if(!isSound) {
                snoring_sound.play();
            } else {
                snoring_sound.pause();
            }
        }
    }
}