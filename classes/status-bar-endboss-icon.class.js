class StatusBarEndbossIcon extends DrawableObject{
    IMAGES_LIFE_ENDBOSS_ICON = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_LIFE_ENDBOSS_ICON);
        this.y = 52;
        this.x = 5511;
        this.width = 55;
        this.height = 55;
    }
}