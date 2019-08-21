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
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
let polygonAssets, largeSlimeAssets, playAreasAssets, uiAssets, gameAssets;
let poly1, poly2, poly3, polies, animatedLargeSlime, snakeSilhouette, borderedRectangle, gameAssetsTexture, gameBlocks;
let miniSnake;
let state;
let gameStageArea;
let isPaused = false;
let mainPlayer, evoPointBlock, coins, slimes;
function main(){

    polygonAssets = resources["images/polygons.json"].textures;
    largeSlimeAssets = resources["images/large_slime.json"].spritesheet;
    playAreasAssets = resources["images/playAreas.json"].textures;
    uiAssets = resources["images/uiAssets.json"].textures;
    gameAssets = resources["images/gameAssets.json"].spritesheet;
    gameAssetsTexture = resources["images/gameAssets.json"].textures;
    gameBlocks = resources["images/gameBlocks.json"].textures;

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
    evoPointBlock = new PIXI.Sprite(gameBlocks["blockEvo.png"]);
    evoPointBlock.position.set(
        randomInt(50, gameStageArea.width - 40),
        randomInt(150, gameStageArea.height + 50 ));

    mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
    gameScreenScene.addChildAt(gameStageArea, 0);
    gameScreenScene.addChild(evoPointBlock);
    gameScreenScene.addChild(mainPlayer);

    setMenuControls(gameScreenScene);
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
let evoCounter;
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
            saveState.campaign.evolve += 1;
            updateUI();
        }

        if (saveState.campaign.evolve === 1) {
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
            gameOver();
            state = onMenu;
            changeScene(gameScreenScene, gameEndScene, polies);
        }
    }

    function updateUI() {
        coinCountText.text = saveState.campaign.coins + "g";
        heartCountText.text = getHearts(saveState.campaign.life);
        stageCountText.text = "STAGE: " + saveState.campaign.stage;
        evoCountText.text = "EVO: " + saveState.campaign.evolve;
        saveState.campaign.score =(saveState.campaign.evolve + saveState.campaign.stage + saveState.campaign.life) * DIFFICULTY;
    }

    function getHearts(life) {
        let harts = "";
        for (let i = 0; i< life; i++) {
            harts += "♥";
        }
        return harts;
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
    gameStageArea.texture = playAreasAssets["playerArea1.png"]
    checkHighScores();
    saveState = {
        playerName: "",
        campaign: {
            life: 3,
            score: 0,
            coins: 0,
            evolve: 0,
            stage: 1,
            upgrades: {
                lethality: 1,
                quantity: 1,
                duration: 1,
                fireRate: 1
            }
        },
        settings: {
            difficulty: 1,
            sounds: true
        }
    };
}

function victory() {
    gameEndText.text = "VICTORY";
    gameEndText.style = styleLargeTextGreen;
    gameEndDesc.text = "You beat the game!";
    gameEndScoreText.text = "Score: " + saveState.campaign.score;
    gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
    gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
    gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
    gameStageArea.texture = playAreasAssets["playerArea1.png"];
    checkHighScores();
    saveState = {
        playerName: "",
        campaign: {
            life: 3,
            score: 0,
            coins: 0,
            evolve: 0,
            stage: 1,
            upgrades: {
                lethality: 1,
                quantity: 1,
                duration: 1,
                fireRate: 1
            }
        },
        settings: {
            difficulty: 1,
            sounds: true
        }
    };
}

function quit() {
    gameEndText.text = "LEAVER";
    gameEndText.style = styleLargeTextRed;
    gameEndDesc.text = "You chickened out";
    gameEndScoreText.text = "";
    gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
    gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
    gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
    gameStageArea.texture = playAreasAssets["playerArea1.png"];
}

function checkHighScores() {
    let rank, playername, theirScore;
    highScoreText.visible = true;
    if (saveState.campaign.score > rank1.score ) {
        playername = rank1.playerName;
        theirScore = rank1.score;
        rank = "1st";
        rank3 = {
            playerName: rank2.playerName,
            score: rank2.score
        };
        rank2 = {
            playerName: rank1.playerName,
            score: rank1.score
        };
        rank1 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }
    }
    else if (saveState.campaign.score > rank2.score ) {
        playername = rank2.playerName;
        theirScore = rank2.score;
        rank = "2nd";
        rank3 = {
            playerName: rank2.playerName,
            score: rank2.score
        };
        rank2 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }
    }
    else if (saveState.campaign.score > rank3.score) {
        playername = rank3.playerName;
        theirScore = rank3.score;
        rank = "3rd";
        rank3 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }

    }
    else {
        highScoreText.visible = false;
    }
    highScoreText.text = "You beat " + rank + " place " + playername + " (Score: " + theirScore + ")!";
    highScoreText.position.set(width - (appMargin + highScoreText.width), height - (20 + highScoreText.height));

    firstText.text = "1st  " + rank1.playerName +": " + rank1.score;
    secondText.text = "2nd  " + rank2.playerName +": " + rank2.score;
    thirdText.text = "3rd  " + rank3.playerName + ": " + rank3.score;
}
//    firstText = new PIXI.Text("1st  N0obSl4yer: 69", styleFirst),
//     secondText = new PIXI.Text("2nd  XxPROxX: 42", styleSecond),
//     thirdText = new PIXI.Text("3rd  Rami: 22", styleThird);
