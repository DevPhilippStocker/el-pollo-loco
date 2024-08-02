class StatusBarBottle extends DrawableObject { 
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.y = 10;
        this.x = 30;
        this.width = 200;
        this.height = 50;
        this.collectBottles(0);
    }

    collectBottles(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.bottleStatus()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns image with the exact percentage width of the bar
     */
    bottleStatus() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 3) {
            return 1;
        } else if (this.percentage < 5) {
            return 2;
        } else if (this.percentage < 7) {
            return 3;
        } else if (this.percentage <= 9) {
            return 4;
        } else { 
            return 5;
        }
    }
}