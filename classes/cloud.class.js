class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 1000;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    // Clouds move every 60 frame per second(FPS) 0.2px minus x
    animate() {
        setStoppableInterval(() =>  this.move_left(), 1000 / 60);
    }  
}