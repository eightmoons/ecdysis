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
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
let polygonAssets, largeSlimeAssets, playAreasAssets, uiAssets, gameAssets;
let poly1, poly2, poly3, polies, animatedLargeSlime, snakeSilhouette, borderedRectangle, gameAssetsTexture;
let miniSnake;
let state;
let gameStageArea;
let isPaused = false;
let mainPlayer;
function main(){

    polygonAssets = resources["images/polygons.json"].textures;
    largeSlimeAssets = resources["images/large_slime.json"].spritesheet;
    playAreasAssets = resources["images/playAreas.json"].textures;
    uiAssets = resources["images/uiAssets.json"].textures;
    gameAssets = resources["images/gameAssets.json"].spritesheet;
    gameAssetsTexture = resources["images/gameAssets.json"].textures;

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

    gameStageArea = new PIXI.Sprite(playAreasAssets["playerArea1.png"]);
    mainPlayer = new PIXI.AnimatedSprite(gameAssets.animations["p"]);
    gameStageArea.position.set(0,88);
    gameStageArea.width = width;
    gameStageArea.height = 512;
    mainPlayer.play();
    mainPlayer.animationSpeed = 0.11;

    mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
    gameScreenScene.addChild(gameStageArea);
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
        mainPlayer.x += mainPlayer.vx;
        mainPlayer.y += mainPlayer.vy;
    }

    function respawnSnake(){
        if (saveState.campaign.life > 1) {
            mainPlayer.vx = 0;
            mainPlayer.vy = 0;
            saveState.campaign.life--;
            mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
            let harts = "";
            for (let i = 0; i< saveState.campaign.life; i++) {
                harts += "♥";
            }
            heartCountText.text = harts;
        }
        else {

            state = onMenu;
            changeScene(gameScreenScene, gameEndScene, polies);
            gameOver();
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

function gameOver() {

    gameEndText.text = "GAME OVER";
    gameEndText.style = styleLargeTextRed;
    gameEndDesc.text = "You ran out of hearts";
    gameEndScoreText.text = "Score: " + saveState.campaign.score;
    gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
    gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
    gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
}