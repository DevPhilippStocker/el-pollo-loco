class Level {
    enemies;
    clouds;
    background;
    coins;
    bottles;
    level_end_x = 5127;

    constructor(enemies, clouds, background, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coins = coins;
        this.bottles = bottles;
    }
}