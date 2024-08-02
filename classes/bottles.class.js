class Bottles extends MovableObject { 
    height = 100;
    width = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 20
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}
