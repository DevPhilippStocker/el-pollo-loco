class Chicken extends MovableObject {
    chickenEnergy = 10;
    y = 355;
    width = 80;
    height = 80;
    offset = {
        top: 2,
        bottom: 30,
        left: 20,
        right: 20
    }
   
    IMAGES_CHICKEN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN);
        this.loadImage(this.IMAGE_CHICKEN_DEAD[0]);
        // random position for every chicken
        this.x = 400 + Math.random() * 5000;
        // random speed for every chicken
        this.speed = 0.2 + Math.random() * 0.5;
        this.animate();
       
    }


    animate() {
        setStoppableInterval(() =>  this.move_left(), 1000 / 60);
        setStoppableInterval(() => this.chickenAnimation(), 200);
    }


    /**
     * show images if chicken is walking
     */
    chickenAnimation() {
        if (this.chickenEnergy == 0) {
            this.speed = 0;
            this.loadImage(this.IMAGE_CHICKEN_DEAD);
        } else {
            this.playAnimation(this.IMAGES_CHICKEN);
        }
    }
}




