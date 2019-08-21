let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
app.renderer.backgroundColor = colorBlack;
document.body.appendChild(app.view);

loader
    .add("images/polygons.json")
    .add("images/large_slime.json")
    .add("images/playAreas.json")
    .add("images/uiAssets.json")
    .add("images/gameAssets.json")
    .add("images/gameBlocks.json")
    .add("images/mainSprites.json")
    .add("images/otherSprites.json")
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
let polygonAssets, largeSlimeAssets, playAreasAssets, uiAssets, gameAssets, mainSprites, otherSprites, otherSpritesSheet;
let poly1, poly2, poly3, polies, animatedLargeSlime,
    snakeSilhouette, borderedRectangle, gameAssetsTexture, gameBlocks,
    obstacleImageDisplay, heartImageDisplay, evoText;
let miniSnake;
let state;
let gameStageArea;
let isPaused = false;
let mainPlayer, evoPointBlock, coins, slimes, activeSlimes;
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

    evoText = new PIXI.Text("EVO", styleLargeTextGreen);
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
    evoPointBlock = new PIXI.Text("EVO", styleEVO1);
    evoPointBlock.position.set(
        randomInt(50, gameStageArea.width - 40),
        randomInt(150, gameStageArea.height + 50 ));

    mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
    gameScreenScene.addChildAt(gameStageArea, 0);
    gameScreenScene.addChild(evoPointBlock);
    gameScreenScene.addChild(mainPlayer);

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
function onGame(delta) {
    if (!isPaused){
        let res = contain(mainPlayer, {x: 44, y:133, width: gameStageArea.width -22, height: gameStageArea.height + 67});
        if ( res !== undefined) {
            respawnSnake();
        }
        setMovementManager(mainPlayer);
        mainPlayer.x += mainPlayer.vx * DIFFICULTY;
        mainPlayer.y += mainPlayer.vy * DIFFICULTY;

        if (isColliding(mainPlayer, evoPointBlock)){
            evoPointBlock.position.set(
                randomInt(50, gameStageArea.width - 40),
                randomInt(150, gameStageArea.height + 50 ));
            incrementEvolution();
            updateUI();
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
    stageCountText.text = "STAGE: " + saveState.campaign.stage;
    evoCountText.text = "EVO: " + saveState.campaign.evolve;
    saveState.campaign.score =(saveState.campaign.evolve + saveState.campaign.stage + saveState.campaign.life) * DIFFICULTY;
}

function incrementEvolution() {
    saveState.campaign.evolve += 1;
    if (saveState.campaign.evolve === 1){
        saveState.campaign.stage = 1;
        gameStageArea.texture = (playAreasAssets["playerArea2.png"])
    }
    else if (saveState.campaign.evolve === 2) {
        saveState.campaign.stage = 2;
        gameStageArea.texture = (playAreasAssets["playerArea3.png"])
    }
    else if (saveState.campaign.evolve === 3) {
        saveState.campaign.stage = 3;
        victory();
        state = onMenu;
        changeScene(gameScreenScene, gameEndScene, polies);
    }
}

function respawnSnake(){
    if (saveState.campaign.life > 1) {
        saveState.campaign.life--;
        mainPlayer.vx = 0;
        mainPlayer.vy = 0;
        mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
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
    for (let i = 0; i < numberOfBlobs; i++) {
        let slime = new PIXI.AnimatedSprite(mainSprites["slime" + stage]);
        slime.animationSpeed = 0.11;
        slime.play();
        slime.position.set(48 * i ,randomInt(0, 500 - slime.height));
        slimes.push(slime);
    }
    return slimes;
}