class Endboss extends MovableObject {
    y = 60;
    x = 5400;
    width = 350;
    height = 400;
    speed = 20;
    speedThroughHit = 50;
    offset = {
        top: 50,
        left: 10,
        right: 10,
        bottom: 0,
    };

    IMAGES_WALKING_ENDBOSS = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT_ENDBOSS = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK_ENDBOSS = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT_ENDBOSS = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD_ENDBOSS = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING_ENDBOSS[0]);
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.animate();
    }

  
    animate() {
        let i = 0;
        setStoppableInterval(() => {
            this.playEndboss(i);
            i++;
            if (world.character.x > 4650 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 120);
    }

    
    /**
     * show images if endbos is alert, is walking, is attack and is dead
     * @param {number} i 
     */
    playEndboss(i) {
        if (i < 15) {
            this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
        } else if (!this.isDead() && !this.isHurt() && world.character.x > world.endboss.x - 1000) {
            this.playAnimation(this.IMAGES_WALKING_ENDBOSS);
            this.move_left();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK_ENDBOSS);
            world.endboss.x -= this.speedThroughHit;
        } else if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
        }
    }

}
