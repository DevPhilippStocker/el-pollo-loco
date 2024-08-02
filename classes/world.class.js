class World {
    character = new Character();
    level = startLevel1();
    canvas;
    ctx; 
    keyboard;
    camera_x = 0;
    endboss = new Endboss();
    statusBarLife = new StatusBarLife();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    statusBarEndbossIcon = new StatusBarEndbossIcon();
    endScreen = new EndScreen();
    throwableObjects = [];
    amountCollectBottles = 0;
    lastThrow = false;
    alreadyThrow = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * empty object property level on reset
     */
    deconstructor() {
        this.level.enemies = [];
        this.level.clouds = [];
        this.level.background = [];
        this.level.coins = [];
        this.level.bottles = [];
    }


    /**
     * character reaction on keys
     */
    setWorld() {
        this.character.world = this;
        this.endScreen.world = this;
    }


    /**
     * all animations are repeated in a certain time
     */
    run() {
        setInterval(() => {
            this.checkCollisionChicken();
            this.checkJumpOnChicken();
            this.checkBottleKillChicken();
            this.checkCollectCoins();
            this.checkCollectBottles();
            this.checkCollisionEndboss();
            this.checkHitbyBottle();
            this.checkTimeThrowNextBottle();
        }, 100);
    }

    
    /**
     * When a chicken collides with the character
     */
    checkCollisionChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingChicken(enemy) && !this.character.isJumping() && !isPaused) {
                this.character.hurt();
                this.statusBarLife.reduceLife(this.character.energy);
            }
        });
    }


    /**
     * when the character jumps on a chicken
     */
    checkJumpOnChicken() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingChicken(enemy) && this.character.isJumping() && this.character.speedY < 0) {
                enemy.killChicken();
                this.character.jump();
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 400);
                if(!isPaused) {
                    playAudio('audio/chicken.wav');
                }
            }
        });
    }


    /**
     * when a chicken is hit by a bottle
     */
    checkBottleKillChicken() {
        this.level.enemies.forEach((enemy, i) => {
            this.throwableObjects.forEach((bottle, j) => {
                if (bottle.isCollidingChicken(enemy)) {
                   enemy.killChicken();
                   setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 400);
                    this.throwableObjects.splice(j, 1);
                    if(!isPaused) {
                        playAudio('audio/chicken.wav');
                    }
                }
            })
        });
    }


    /**
     * when can a bottle be thrown
     */
    checkTrowObject() {
        if (this.keyboard.SPACE && this.amountCollectBottles > 0 && !this.lastThrow && !this.character.isHurt()) {
            this.alreadyThrow = true;
            this.checkThrowBottle();
        } else {
            this.timeThrowNextBottle();
        }
    }

    
    /**
     * character throws a bottle
     */
    checkThrowBottle() {
        this.lastThrow = true;
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 110);
        this.throwableObjects.push(bottle); 
        this.amountCollectBottles--;
        this.character.reduceBottleByThrowing();
         this.statusBarBottle.collectBottles(this.character.bottle);
         snoring_sound.pause();
    }


    /**
     * check when the next bottle can be trowed
     */
    checkTimeThrowNextBottle() {
        setStoppableInterval(() => {
            this.checkTrowObject();
        }, 1000 / 60);
    }


    /**
     * time is determined when the next bottle can be thrown
     */
    timeThrowNextBottle() {
        if (this.alreadyThrow) {
            this.alreadyThrow = false;
            setTimeout(() => {
                this.lastThrow = false;
            }, 1000);
        }
    }

    
    /**
     * when character collects a coin
     */
    checkCollectCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isCollidingCollectables(coin)) {
                this.character.collectCoin();
                this.statusBarCoin.collectCoins(this.character.coin);
                this.level.coins.splice(i, 1);
                if(!isPaused) {
                    playAudio('audio/coins.mp3');
                }
            }
        });
    }


    /**
     * When the character collects a bottle
     */
    checkCollectBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isCollidingCollectables(bottle)) {
                this.character.collectBottle();
                this.statusBarBottle.collectBottles(this.character.bottle);
                this.level.bottles.splice(i, 1);
                this.amountCollectBottles++;
                if(!isPaused) {
                    playAudio('audio/bottle.mp3');
                }
            }
        });
    }

    
    /**
     * When the character touches the end boss
     */
    checkCollisionEndboss() {
        if (this.character.isCollidingChicken(this.endboss)) {
            this.character.hurt();
            this.statusBarLife.reduceLife(this.character.energy);
        }  
    }


    /**
     * when a bottle hits the end boss
     */
    checkHitbyBottle() {
        this.throwableObjects.forEach((bottle, i) => {
            if (this.endboss.isCollidingCollectables(bottle)) {
                this.endboss.hurtEndboss();
                this.statusBarEndboss.reduceLife(this.endboss.energy);
                if(!isPaused) {
                    playAudio('audio/endboss-scream.mp3');
                }
                this.throwableObjects.splice(i, 1);
            }
        }); 
    }


    /**
     * Objects are added to the Canva
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this. camera_x, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.endScreen);
        if (this.character.x > 4943 || this.endboss.x < 5400) {
            this.addToMap(this.statusBarEndboss);
            this.addToMap(this.statusBarEndbossIcon);
        }
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    
    /**
     * Arrays are traversed so that all objects are added to the canvas
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Image are added to the canvas
     * @param {object} moveObject 
     */
    addToMap(moveObject) {
        if(moveObject.otherDirection) {
            this.flipImage(moveObject);
        }

        moveObject.draw(this.ctx);

        moveObject.drawFrame(this.ctx);
        
        if(moveObject.otherDirection) {
            this.flipImageBack(moveObject)
        }
    }


    /**
     * Reflection of the character
     * @param {object} moveObject 
     */
    flipImage(moveObject) {
        this.ctx.save();
        this.ctx.translate(moveObject.width, 0); 
        this.ctx.scale(-1, 1); 
        moveObject.x = moveObject.x * -1; 
    }


    /**
     * Dereflection of the character
     * @param {object} moveObject 
     */
    flipImageBack(moveObject) {
        moveObject.x = moveObject.x * -1; 
        this.ctx.restore(); 
    }
   
}