function startLevel1() {
    return new Level ( 
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/full.png', 0),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*2),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*3),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*4),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*5),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*6),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000*7)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),

            new BackgroundObject('img/5_background/layers/air.png', 719*5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),

            new BackgroundObject('img/5_background/layers/air.png', 719*6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),

            new BackgroundObject('img/5_background/layers/air.png', 719*7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7)
        ],
        [
            new Coins(400, 200),
            new Coins(450, 150),
            new Coins(500, 100),
            new Coins(550, 150),
            new Coins(600, 200),

            new Coins(900, 100),
            new Coins(1000, 100),
            new Coins(1100, 100),
            new Coins(1200, 100),

            new Coins(1900, 200),
            new Coins(1950, 150),
            new Coins(2000, 100),
            new Coins(2050, 150),
            new Coins(2100, 200),

            new Coins(3000, 200),
            new Coins(3050, 150),
            new Coins(3100, 100),
            new Coins(3150, 150),
            new Coins(3200, 200),

            new Coins(4000, 100),
            new Coins(4100, 100),
            new Coins(4200, 150),
            new Coins(4300, 150),
            new Coins(4400, 100),
            new Coins(4500, 100)
        ],
        [
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 700, 360),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 850, 360),
            new Bottles('img/6_salsa_bottle/salsa_bottle.png', 1500, 100),
            new Bottles('img/6_salsa_bottle/salsa_bottle.png', 1600, 80),
            new Bottles('img/6_salsa_bottle/salsa_bottle.png', 1700, 100),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2300, 360),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 2500, 360),
            new Bottles('img/6_salsa_bottle/salsa_bottle.png', 3500, 80),
            new Bottles('img/6_salsa_bottle/salsa_bottle.png', 3600, 80),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 3800, 360)
        ]
        
    );
}

