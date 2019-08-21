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
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
let polygonAssets, largeSlimeAssets, playAreasAssets, uiAssets;
let poly1, poly2, poly3, polies, animatedLargeSlime, snakeSilhouette, borderedRectangle;
let state;
function main(){

    polygonAssets = resources["images/polygons.json"].textures;
    largeSlimeAssets = resources["images/large_slime.json"].spritesheet;
    playAreasAssets = resources["images/playAreas.json"].textures;
    uiAssets = resources["images/uiAssets.json"].textures;

    poly1 = new Sprite(polygonAssets["poly1.png"]);
    poly2 = new Sprite(polygonAssets["poly2.png"]);
    poly3 = new Sprite(polygonAssets["poly3.png"]);
    polies = [poly1,poly2,poly3];
    polies.forEach(poly => {
        poly.dx = (randomInt(-9,9)*.1);
        poly.dy = (randomInt(-9,9)*.1);
        poly.position.set(randomInt(0,width), randomInt(0,height));
        mainMenuScene.addChildAt(poly, 0);
    });
    snakeSilhouette = new Sprite(uiAssets["snake_menu.png"]);
    snakeSilhouette.position.set(width - (appMargin + snakeSilhouette.width), 170);
    snakeSilhouette.dy = 0.075;
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
    movementTutorialScene.addChild(borderedRectangle);


    // let square = new PIXI.Sprite();
    // square.position.set(width - (appMargin + square.width), 220);
    // movementTutorialScene.addChild(square);

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

function onMenu(delta){
    polies.forEach(poly => {
        poly.y += poly.dy;
        poly.x += poly.dx;
        if (poly.x > width && poly.dx > 0 || poly.x < 0 && poly.dx < 0) {
            poly.dx = -poly.dx;
        }
        if (poly.y > height && poly.dy > 0 || poly.y < 0 && poly.dy < 0) {
            poly.dy = -poly.dy;
        }
        poly.rotation += poly.dy * .01;
    });

    snakeSilhouette.y += snakeSilhouette.dy;
    if (snakeSilhouette.y >= 180 || snakeSilhouette.y <= 170) {
        snakeSilhouette.dy = -snakeSilhouette.dy;
    }
}

function onMovementTutorial(delta){

}