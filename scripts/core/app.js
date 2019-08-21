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
let poly1, poly2, poly3, polies, animatedLargeSlime, snakeSilhouette, borderedRectangle;
let tSnakeHead;
let state;
function main(){

    polygonAssets = resources["images/polygons.json"].textures;
    largeSlimeAssets = resources["images/large_slime.json"].spritesheet;
    playAreasAssets = resources["images/playAreas.json"].textures;
    uiAssets = resources["images/uiAssets.json"].textures;
    gameAssets = resources["images/gameAssets.json"].textures;

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
    snakeSilhouette.vy = 0.075;
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
    tSnakeHead = new Sprite(gameAssets["head16.png"]);
    tSnakeHead.position.set(
        borderedRectangle.x + (borderedRectangle.width / 2),
        borderedRectangle.y + (borderedRectangle.height / 2));
    tSnakeHead.vx = 0;
    tSnakeHead.vy = 0;
    movementTutorialScene.addChild(borderedRectangle);
    movementTutorialScene.addChild(tSnakeHead);



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

let snakeArray = [];

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

    snakeSilhouette.y += snakeSilhouette.vy;
    if (snakeSilhouette.y >= 180 || snakeSilhouette.y <= 170) {
        snakeSilhouette.vy = -snakeSilhouette.vy;
    }
    if (movementTutorialScene.visible) {
        tSnakeHead.x += tSnakeHead.vx;
        tSnakeHead.y += tSnakeHead.vy;
        contain(tSnakeHead, {
            x: borderedRectangle.x + 24, y:  borderedRectangle.y + 24, width: app.renderer.width - 58, height: app.renderer.height - 138 });
        setMovementManager(tSnakeHead, 4, 3);
    }
    else {
        tSnakeHead.vx = 0;
        tSnakeHead.vy = 0;
    }
}