class SmallChicken extends MovableObject {
    chickenEnergy = 10;
    y = 380;
    width = 50;
    height = 50;
    offset = {
        top: 10,
        bottom: 10,
        left: 2,
        right: 2,
      };

    IMAGES_CHICKEN_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    
    IMAGE_SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_SMALL);
        this.loadImage(this.IMAGE_SMALL_CHICKEN_DEAD[0]);
        // random position for every chicken
        this.x = 400 + Math.random() * 5000;
        // random speed for every chicken
        this.speed = 0.4 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => this.move_left(), 1000 / 60);
        setStoppableInterval(() => this.littleChickenAnimation(), 200);
    }


    /**
     * show images when chicken is still alive then walk, if is dead then show dead images
     */
    littleChickenAnimation() {
        if (this.chickenEnergy == 0) {
            this.speed = 0;
            this.loadImage(this.IMAGE_SMALL_CHICKEN_DEAD);
        } else {
            this.playAnimation(this.IMAGES_CHICKEN_SMALL);
        }
    }
    
}