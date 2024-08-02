class StatusBarLife extends DrawableObject{
    IMAGES_LIFE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
   
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFE);
        this.y = 45;
        this.x = 30;
        this.width = 200;
        this.height = 50;
        this.reduceLife(100);
    }


    reduceLife(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.lifeStatus()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns image with the exact percentage width of the bar
     */
    lifeStatus() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage >= 5) {
            return 1;
        } else { 
            return 0;
        }
    }   
}