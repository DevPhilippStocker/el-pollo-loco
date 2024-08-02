class StatusBarCoin extends DrawableObject{ 
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.y = 80;
        this.x = 30;
        this.width = 200;
        this.height = 50;
        this.collectCoins(0);
    }

    collectCoins(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.coinStatus()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns image with the exact percentage width of the bar
     */
    coinStatus() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 5) {
            return 1;
        } else if (this.percentage < 10) {
            return 2;
        } else if (this.percentage < 15) {
            return 3;
        } else if (this.percentage <= 24) {
            return 4;
        } else { 
            return 5;
        } 
    }
}
