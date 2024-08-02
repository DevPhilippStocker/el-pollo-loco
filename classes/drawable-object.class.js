class DrawableObject {
    img;
    imageCache = {}; 
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
  

    // Draw world with coordinates, width and height
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // Frame around character so that collisions can be registered
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    // first image of the object is loaded
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    // all images from the objects are pushed into the JSON "imageCache".
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            totalImageCache[path] = this.imageCache[path];
        });
    } 
}

