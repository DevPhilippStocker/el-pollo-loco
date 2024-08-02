class MovableObject extends DrawableObject{
    speed = 0.2;
    otherDirection = false;
    acceleration = 2.5; 
    energy = 100;
    coin = 0;
    bottle = 0;
    lastHurt = 0;
    attack = false;
    offset = { 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    

    // Running animation
    playAnimation(images) {
        let index = this.currentImage % images.length; 
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    // Objects move to the left (clouds, chicken)
    move_left() {
        this.x -= this.speed;
    }
    

    /**
     * move right
     */
    move_right() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }
   

    /**
     * When jumping Calculation of falling
     */
    gravity() {
        setStoppableInterval(() => {
            if (this.isJumping() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!this.isJumping())
                    this.y = 150;
            }
        },1000 / 25);
    }


    /**
     * character can jump at a certain speed
     */
    jump() {
        this.speedY = 25;
    }


    /**
     * character is in the air at a certain height
     * @returns boolean
     */
    isJumping() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }


    /**
     * walk right
     */
    walk_right() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    /**
     * walk left
     */
    walk_left() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    /**
     * Calculation of coordinates for the collision with enemies
     * @param {object} moveObject all enemies object with properties
     * @returns coordinates where damage is registered
     */
    isCollidingChicken(moveObject) {
        return ( 
            this.x + this.width - this.offset.left > moveObject.x &&
            this.y + this.height > moveObject.y &&
            this.x < moveObject.x - this.offset.left + moveObject.width &&
            this.y < moveObject.y + moveObject.height
        );
    }


    /**
     * determine when a chicken is killed 
     */
    killChicken() {
        this.chickenEnergy -= 10;
        if (this.chickenEnergy <= 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    

    /**
     * Calculation of coordinates for the collision with coins or bottles
     * @param {object} moveObject coins and bottles object with they properties
     * @returns coordinates where damage is registered
     */
    isCollidingCollectables(moveObject) {
        return (
        this.x + this.width - this.offset.right > moveObject.x + moveObject.offset.left &&
        this.y + this.height - this.offset.bottom > moveObject.y + moveObject.offset.top &&
        this.x + this.offset.left < moveObject.x + moveObject.width - moveObject.offset.right &&
        this.y + this.y + this.offset.top < moveObject.y + moveObject.height - moveObject.offset.bottom
        );
    }


    /**
     * character loose energy when he hurts himself
     */
    hurt() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }


    /**
     * endboss loose energy when he hurts himself
     */
    hurtEndboss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }


    /**
     * time difference between now and when the character is hurt for the last time
     * @returns bolean
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHurt;
        return timepassed < 250;
    }


    /**
     * character can collect one coin, max. 25 coins
     */
    collectCoin() {
        this.coin += 1;
        if (this.coin > 24) {
            this.coin = 25;
        }
    }


    /**
     * character can collect one bottle, max. 10 bottles
     */
    collectBottle() {
        this.bottle += 1;
        if (this.bottle > 9) {
            this.bottle = 10;
        }
    }


    /**
     * when the character throws a bottle, the amount is reduced by one
     */
    reduceBottleByThrowing() {
        this.bottle -= 1;
    }


    /**
     * character is dead, game is over
     * @returns energy is 0
     */
    isDead() {
        return this.energy == 0;
    }
}