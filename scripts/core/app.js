let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
app.renderer.backgroundColor = colorBlack;
document.body.appendChild(app.view);

loader
    .add("styles/fonts/PressStart2P-Regular.ttf")
    .add("images/polygons.json")
    .add("images/large_slime.json")
    .add("images/playAreas.json")
    .add("images/uiAssets.json")
    .add("images/gameAssets.json")
    .add("images/gameBlocks.json")
    .add("images/mainSprites.json")
    .add("images/otherSprites.json")
    .add("images/inGameObjects.json")
    .add("images/barricadeSprites.json")
    .add("images/horizontalBarricade.json")
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
let polygonAssets, largeSlimeAssets, playAreasAssets, uiAssets, gameAssets,
    mainSprites, otherSprites, otherSpritesSheet, inGameObjects, verticalBarricade, horizontalBarricade;
let poly1, poly2, poly3, polies, animatedLargeSlime,
    snakeSilhouette, borderedRectangle, gameAssetsTexture, gameBlocks,
    obstacleImageDisplay, heartImageDisplay, evoText;
let miniSnake;
let state;
let gameStageArea;
let isPaused = false;
let mainPlayer, evoPointBlock;
let activeObstacles;
let s2v1, s2v2, s2v3,
    s2v4, s3h1, s3h2,
    s3v1, s3v2, s4h1,
    s4h2, s4h3, s4h4,
    s4v1, s4v2, s4v3,
    s4v4, s5h1, s5h2,
    s5h3, s5h4, s5v1,
    s5v2, s5v3, s5v4,
    s2v, s3v, s4v, s5v, s3h, s4h, s5h, obstacleData, level, verticalSprites, horizontalSprites;
;

let slimes1, slimes2, slimes3, mainSlimes = [];
function main(){
    polygonAssets = resources["images/polygons.json"].textures;
    largeSlimeAssets = resources["images/large_slime.json"].spritesheet;
    playAreasAssets = resources["images/playAreas.json"].textures;
    uiAssets = resources["images/uiAssets.json"].textures;
    gameAssets = resources["images/gameAssets.json"].spritesheet;
    gameAssetsTexture = resources["images/gameAssets.json"].textures;
    gameBlocks = resources["images/gameBlocks.json"].textures;
    mainSprites = resources["images/mainSprites.json"].spritesheet;
    otherSprites = resources["images/otherSprites.json"].textures;
    otherSpritesSheet = resources["images/otherSprites.json"].spritesheet;
    inGameObjects = resources["images/inGameObjects.json"].spritesheet;
    verticalBarricade = resources["images/barricadeSprites.json"].textures;
    horizontalBarricade = resources["images/horizontalBarricade.json"].textures;

    poly1 = new Sprite(polygonAssets["poly1.png"]);
    poly2 = new Sprite(polygonAssets["poly2.png"]);
    poly3 = new Sprite(polygonAssets["poly3.png"]);
    polies = [poly1,poly2,poly3];
    polies.forEach(poly => {
        poly.vx = (randomInt(-9,9)*.1);
        poly.vy = (randomInt(-9,9)*.1);
        poly.position.set(randomInt(0,width), randomInt(0,height));
        mainMenuScene.addChildAt(poly, 0);
    });
    snakeSilhouette = new Sprite(uiAssets["snake_menu.png"]);
    snakeSilhouette.position.set(width - (appMargin + snakeSilhouette.width), 170);
    snakeSilhouette.vy = 0.3;
    mainMenuScene.addChild(snakeSilhouette);

    animatedLargeSlime = new PIXI.AnimatedSprite(largeSlimeAssets.animations["1"]);
    animatedLargeSlime.width = 150;
    animatedLargeSlime.height = 150;
    animatedLargeSlime.animationSpeed =0.11;
    animatedLargeSlime.position.set(600,220);
    animatedLargeSlime.play();
    slimeTutorialScene.addChild(animatedLargeSlime);

    borderedRectangle = new Sprite(uiAssets["rectangleGrayFillWithBorder.png"]);
    borderedRectangle.position.set(width - (appMargin + borderedRectangle.width), 170);
    miniSnake = new PIXI.AnimatedSprite(gameAssets.animations["p"]);
    miniSnake.animationSpeed = 0.3;
    miniSnake.position.set(
        borderedRectangle.x + (borderedRectangle.width / 2),
        borderedRectangle.y + (borderedRectangle.height / 2));
    miniSnake.vx = 0;
    miniSnake.vy = 0;
    borderedRectangle.interactive = true;
    movementTutorialScene.addChild(borderedRectangle);
    movementTutorialScene.addChild(miniSnake);

    evoText = new PIXI.AnimatedSprite(inGameObjects.animations["coin1"]);
    evoText.x = 200;
    evoText.y = 200;
    evoText.animationSpeed = 0.11;
    evoText.play();
    evoText.position.set(width - (appMargin + evoText.width), 200);
    objectiveTutorialScene.addChild(evoText);

    obstacleImageDisplay = new Sprite(otherSprites["obstacles.png"]);
    obstacleImageDisplay.width = 200;
    obstacleImageDisplay.height = 200;
    obstacleImageDisplay.position.set(width - (appMargin + obstacleImageDisplay.width), 200);
    obstaclesTutorialScene.addChild(obstacleImageDisplay);

    heartImageDisplay = new PIXI.AnimatedSprite(otherSpritesSheet.animations["hart"]);
    heartImageDisplay.animationSpeed = 0.11;
    heartImageDisplay.position = obstacleImageDisplay.position;
    heartImageDisplay.play();
    heartTutorialScene.addChild(heartImageDisplay);


    gameStageArea = new PIXI.Sprite(playAreasAssets["playerArea1.png"]);
    mainPlayer = new PIXI.AnimatedSprite(gameAssets.animations["p"]);
    gameStageArea.position.set(0,88);
    gameStageArea.width = width;
    gameStageArea.height = 512;
    mainPlayer.play();
    mainPlayer.animationSpeed = 0.11;
    // evoPointBlock = new PIXI.Sprite(gameBlocks["blockEvo.png"]);
    // evoPointBlock = new PIXI.Text("EVO", styleEVO1);
    evoPointBlock = new PIXI.AnimatedSprite(inGameObjects.animations["coin1"]);
    evoPointBlock.animationSpeed = 0.11;
    evoPointBlock.play();
    evoPointBlock.position.set(
        randomInt(50, gameStageArea.width - 40),
        randomInt(150, gameStageArea.height + 50 ));

    mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
    gameScreenScene.addChildAt(gameStageArea, 0);
    gameScreenScene.addChild(evoPointBlock);
    gameScreenScene.addChild(mainPlayer);

    let horizontal = horizontalBarricade["barricadeh1.png"];
    let vertical = verticalBarricade["barricade1.png"];

    s5h1 = new Sprite(horizontal);
    s5h2 = new Sprite(horizontal);
    s5h3 = new Sprite(horizontal);
    s5h4 = new Sprite(horizontal);
    s5v1 = new Sprite(vertical);
    s5v2 = new Sprite(vertical);
    s5v3 = new Sprite(vertical);
    s5v4 = new Sprite(vertical);
    s4h1 = new Sprite(horizontal);
    s4h2 = new Sprite(horizontal);
    s4h3 = new Sprite(horizontal);
    s4h4 = new Sprite(horizontal);
    s4v1 = new Sprite(vertical);
    s4v2 = new Sprite(vertical);
    s4v3 = new Sprite(vertical);
    s4v4 = new Sprite(vertical);
    s3h1 = new Sprite(horizontal);
    s3h2 = new Sprite(horizontal);
    s3v1 = new Sprite(vertical);
    s3v2 = new Sprite(vertical);
    s2v1 = new Sprite(vertical);
    s2v2 = new Sprite(vertical);
    s2v3 = new Sprite(vertical);
    s2v4 = new Sprite(vertical);

    s5v = [s5v1, s5v2, s5v3, s5v4];
    s5h = [s5h1, s5h2, s5h3, s5h4];
    s4h = [s4h1, s4h2, s4h3, s4h4];
    s4v = [s4v1, s4v2, s4v3, s4v4];
    s3h = [s3h1, s3h2];
    s3v = [s3v1, s3v2];
    s2v = [s2v1, s2v2, s2v3, s2v4];

    obstacleData = [];
    verticalSprites = [s5v1, s5v2, s5v3, s5v4, s4v1, s4v2, s4v3, s4v4, s3v1, s3v2, s2v1, s2v2, s2v3, s2v4];
    horizontalSprites = [s5h1, s5h2, s5h3, s5h4, s4h1, s4h2, s4h3, s4h4, s3h1, s3h2];
    [s5v, s5h, s4v, s4h, s3h, s3v, s2v].forEach(sprites => {
        sprites.forEach(sprite => {
            obstacleData.push(sprite);
            gameStageArea.addChild(sprite);
            sprite.visible = false;
        });
    });


    s5v1.position.set(getCenterHorizontal(s5v1),32);
    s5v2.position.set(s5v1.x,s5v1.y + (32 * 10) + 16);
    s5h3.position.set(bXMargin, getCenterVertical(s5h3));
    s5v3.position.set(s5h3.x + s5h3.width, getCenterVertical(s5v3));
    s5h1.position.set(getCenterHorizontal(s5h1),(16 * 9));
    s5h2.position.set(getCenterHorizontal(s5h2), s5v2.y - 16 );
    s5h4.position.set(width - (bXMargin + s5h4.width), s5h3.y);
    s5v4.position.set(s5h4.x - px, s5v3.y);

    s4h1.position.set(bXMargin, (16*7));
    s4v1.position.set(bXMargin, px + s4h1.y);
    s4v2.position.set(bXMargin, (px * 4) + s4v1.y + s4v1.height);
    s4h2.position.set(bXMargin, s4v2.y + (px * 7));
    s4h3.position.set(width - (bXMargin + (px * 7)), s4h1.y);
    s4h4.position.set(width - (bXMargin + (px * 7)) , s4h2.y);
    s4v3.position.set(width - (bXMargin + 16), s4h1.y + px);
    s4v4.position.set(width - (bXMargin + 16), s4v2.y);

    s3h1.position.set(getCenterHorizontal(s3h1), bYMargin);
    s3h2.position.set(s3h1.x, s3h1.y + bYMargin + (bYMargin / 2));
    s3v1.position.set(bXMargin, 88 + getCenterVertical(s3v1)/2);
    s3v2.position.set(s3v1.x + 490, s3v1.y);

    s2v1.position.set(bXMargin, bYMargin);
    s2v2.position.set(bXMargin, s2v1.y + s2v1.height);
    s2v3.position.set(width - (bXMargin), bYMargin);
    s2v4.position.set(s2v3.x, s2v3.y + s2v3.height);

    activeObstacles = [];
    scenes.forEach(scene => {
        app.stage.addChild(scene);
        scene.visible = false;
    });
    mainMenuScene.visible = true;
    state = onMenu;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}
let isEvoObstacle, isSnakeObstacle;
function onGame(delta) {
    if (!isPaused){
        let res = contain(mainPlayer, {x: 44, y:133, width: gameStageArea.width -22, height: gameStageArea.height + 67});
        if ( res !== undefined) {
            respawnSnake();
        }
        setMovementManager(mainPlayer);
        let bonusx = 0;
        let bonusy = 0;
        if (mainPlayer.vx !== 0){
            bonusx = mainPlayer.vx > 0 ? delta : -delta;
        }
        if (mainPlayer.vy !== 0) {
            bonusy = mainPlayer.vy > 0 ? delta : -delta;
        }
        mainPlayer.x += mainPlayer.vx * DIFFICULTY + bonusx;
        mainPlayer.y += mainPlayer.vy * DIFFICULTY + bonusy;

        mainSlimes.forEach(slime => {
            slime.y += slime.vy;
            slime.x += slime.vx;
            let rr = contain(slime, {x: 32, y:110, width: gameStageArea.width -22, height: gameStageArea.height + 67});
            if (rr === "left" || rr === "right") {
                slime.vx = -slime.vx;
            }
            if (rr === "top" || rr === "bottom") {
                slime.vy = -slime.vy;
            }
            if (isColliding(mainPlayer, slime, -11, -3)) {
                isSnakeObstacle = true;
                slime.position.set(randomInt(32, gameStageArea.height - 32),randomInt(32, gameStageArea.width - 32))
            }
            if (isColliding(slime, evoPointBlock)){
                evoPointBlock.position.set(
                    randomInt(50, gameStageArea.width - 40),
                    randomInt(150, gameStageArea.height + 40));
            }
            mainSlimes.forEach(slime1 => {
                if (slime1 !== slime && isColliding(slime1, slime)){
                        slime.vx = -slime.vx;
                        slime.vy = -slime.vy;
                }
            })
        });

        if (isColliding(mainPlayer, evoPointBlock)){
            evoPointBlock.position.set(
                randomInt(50, gameStageArea.width - 40),
                randomInt(150, gameStageArea.height + 40));
            incrementEvolution();
            updateUI();
        }

        if (activeObstacles.length > 0){
            activeObstacles.forEach(obs => {
                if (isColliding(evoPointBlock, obs) && obs.visible){
                    isEvoObstacle = true;
                    evoPointBlock.vx = 1;
                }
                if (isColliding(obs, mainPlayer, -10, -16*6) && obs.visible){
                    isSnakeObstacle = true;
                }
                mainSlimes.forEach(slime => {
                    if (isColliding(slime, obs,-16,-16*6 ) && obs.visible) {
                        slime.vx = -slime.vx;
                        slime.vy = -slime.vy;
                    }
                    else {
                        slime.alpha = 1;
                    }
                })
            });
        }

        if (isEvoObstacle) {
            evoPointBlock.alpha = 0.4;
            evoPointBlock.x += evoPointBlock.vx;
            isEvoObstacle = false;
        }
        else {
            evoPointBlock.xy = 0;
            evoPointBlock.vy = 0;
            evoPointBlock.alpha = 1;
        }

        if (isSnakeObstacle) {
            isSnakeObstacle = false;
            respawnSnake()
            mainPlayer.vx = 0;
            mainPlayer.vy = 0;
            mainPlayer.alpha = 0.4;
        }else {
            mainPlayer.alpha = 1;
        }

    }
}

function onMenu(delta){
    polies.forEach(poly => {
        poly.y += poly.vy;
        poly.x += poly.vx;
        if (poly.x > width && poly.vx > 0 || poly.x < 0 && poly.vx < 0) {
            poly.vx = -poly.vx;
        }
        if (poly.y > height && poly.vy > 0 || poly.y < 0 && poly.vy < 0) {
            poly.vy = -poly.vy;
        }
        poly.rotation += poly.vy * .01;
    });

    if (mainMenuScene.visible) {
        snakeSilhouette.y += snakeSilhouette.vy;
        if (snakeSilhouette.y >= 190 || snakeSilhouette.y <= 160) {
            snakeSilhouette.vy = -snakeSilhouette.vy;
        }
    }

    if (movementTutorialScene.visible) {
        miniSnake.x += miniSnake.vx;
        miniSnake.y += miniSnake.vy;
        contain(miniSnake, {
            x: borderedRectangle.x + 24, y:  borderedRectangle.y + 24, width: app.renderer.width - 55, height: app.renderer.height - 135 });
        setMovementManager(miniSnake, 4, 3);
        miniSnake.play();
    }
    else {
        miniSnake.vx = 0;
        miniSnake.vy = 0;
    }
}

function updateUI() {
    coinCountText.text = saveState.campaign.coins + "g";
    heartCountText.text = getHearts(saveState.campaign.life);
    stageCountText.text = "STAGE: " + saveState.campaign.stage + "-" + saveState.campaign.level;
    evoCountText.text = "EVO: " + saveState.campaign.evolve;
    saveState.campaign.score =(saveState.campaign.evolve + saveState.campaign.stage + saveState.campaign.life) * DIFFICULTY;
    stageCountText.position.set(width - (appMargin + stageCountText.width), 16);
    evoCountText.position.set(width - (appMargin + evoCountText.width), stageCountText.y + 10 + evoCountText.height);
}
let evoCollected = 0;

function incrementEvolution() {
    saveState.campaign.evolve += 1;
    evoCollected +=1;
    if (evoCollected === 2) {
        saveState.campaign.level += 1;
        incrementLevel();
        evoCollected = 0;
    }

    if (saveState.campaign.evolve === 10){
        saveState.campaign.stage = 2;
        setSprites(verticalSprites, verticalBarricade["barricade2.png"]);
        setSprites(horizontalSprites, horizontalBarricade["barricadeh2.png"]);
        gameStageArea.texture = (playAreasAssets["playerArea2.png"]);
    }
    else if (saveState.campaign.evolve === 20) {
        moveToCenter();
        saveState.campaign.stage = 3;
        setSprites(verticalSprites, verticalBarricade["barricade3.png"]);
        setSprites(horizontalSprites, horizontalBarricade["barricadeh3.png"]);
        gameStageArea.texture = (playAreasAssets["playerArea3.png"]);
    }
    else if (saveState.campaign.evolve === 30) {
        moveToCenter();
        saveState.campaign.stage = 4;
        victory();
        setSprites(verticalSprites, verticalBarricade["barricade1.png"]);
        setSprites(horizontalSprites, horizontalBarricade["barricadeh1.png"]);
        gameStageArea.texture = (playAreasAssets["playerArea1.png"]);
        state = onMenu;
        changeScene(gameScreenScene, gameEndScene, polies);
    }
}
function incrementLevel() {
    let level = saveState.campaign.level;
    if(mainSlimes.length > 0) {
        let ctr = 0;
        mainSlimes.forEach(slime => {
            ctr ++;
            let x =  + randomInt((48 * ctr),800-32);
            let y = randomInt(88 + 32, 600 - 64);
            slime.x = x;
            slime.y = y;
        })
    }
    [s5v, s5h, s4v, s4h, s3h, s3v, s2v].forEach(sprites => {
        sprites.forEach(sprite => {
            sprite.visible = false;
        })
    });
    if (level === 1) {
        activeObstacles = [];
        [s5v, s5h, s4v, s4h, s3h, s3v, s2v].forEach(sprites => {
            sprites.forEach(sprite => {
                sprite.visible = false;
            })
        });
    }
    if (level === 2) {
        activeObstacles = [];
        [s2v].forEach(function (sprite) {
            sprite.forEach(sprited => {
                sprited.visible = true;
                activeObstacles.push(sprited);
            })
        });
        moveToCenter();
    }
    else if (level === 3) {
        activeObstacles = [];
        [s3h, s3v].forEach(sprite => {
            sprite.forEach(sprited => {
                sprited.visible = true;
                activeObstacles.push(sprited);
            })
        });
        moveToCenter();
    }
    else if (level === 4) {
        activeObstacles = [];
        [s4v, s4h].forEach(sprite => {
            sprite.forEach(sprited => {
                sprited.visible = true;
                activeObstacles.push(sprited);
            })
        });
        moveToCenter();
    }
    else if (level === 5) {
        activeObstacles = [];
        [s5v, s5h].forEach(sprite => {
            sprite.forEach(sprited => {
                sprited.visible = true;
                activeObstacles.push(sprited);
            })
        });
        moveToCenter();
        saveState.campaign.level = 1;
    }

    let x = 12;
}
function clearObstacles() {
    [s5v, s5h, s4v, s4h, s3h, s3v, s2v].forEach(sprites => {
        sprites.forEach(sprite => {
            sprite.visible = false;
        })
    });
}
function moveToCenter(){
    mainPlayer.vx = 0;
    mainPlayer.vy = 0;
    mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
}



function respawnSnake(){
    if (saveState.campaign.life > 1) {
        saveState.campaign.life--;
        moveToCenter();
        updateUI();
    }
    else {
        updateUI();
        mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
        gameOver();
        state = onMenu;
        changeScene(gameScreenScene, gameEndScene, polies);
        updateUI();
    }
}

function getHearts(life) {
    let harts = "";
    for (let i = 0; i< life; i++) {
        harts += "♥";
    }
    return harts;
}

function generateSlimes(count, stage) {
    let slimes = [];
    for (let i = 0; i < count; i++) {
        let slime = new PIXI.AnimatedSprite(mainSprites.animations["slime"+stage]);
        slime.animationSpeed = 0.11;
        slime.play();
        slime.position.set(48 * i ,randomInt(0, 500 - slime.height));
        slimes.push(slime);
    }
    return slimes;
}