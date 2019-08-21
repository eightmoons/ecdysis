let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
app.renderer.backgroundColor = 0x212121;
document.body.appendChild(app.view);

loader
    .add("images/polygons.json")
    .add("images/large_slime.json")
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

let poly1, poly2, poly3, polies, animatedLargeSlime;
function main(){

    let polygons = resources["images/polygons.json"].textures;

    poly1 = new Sprite(polygons["poly1.png"]);
    poly2 = new Sprite(polygons["poly2.png"]);
    poly3 = new Sprite(polygons["poly3.png"]);
    polies = [poly1,poly2,poly3];
    polies.forEach(poly => {
        poly.dx = (randomInt(-9,9)*.1);
        poly.dy = (randomInt(-9,9)*.1);
        poly.position.set(randomInt(0,width), randomInt(0,height));
        mainMenuScene.addChildAt(poly, 0);
    });
    scenes.forEach(scene => {
        app.stage.addChild(scene);
        scene.visible = false;
    });
    mainMenuScene.visible = true;
    let slimeResource = resources["images/large_slime.json"].spritesheet;
    animatedLargeSlime = new PIXI.AnimatedSprite(slimeResource.animations["1"]);
    animatedLargeSlime.width = 150;
    animatedLargeSlime.height = 150;
    animatedLargeSlime.animationSpeed =0.11;
    animatedLargeSlime.position.set(600,220);
    animatedLargeSlime.play();
    slimeTutorialScene.addChild(animatedLargeSlime);


    // let square = new PIXI.Sprite();
    // square.position.set(width - (appMargin + square.width), 220);
    // movementTutorialScene.addChild(square);

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
        if (poly.x > width && poly.dx > 0) {
            poly.dx = -poly.dx;
        }
        if (poly.y > height && poly.dy > 0) {
            poly.dy = -poly.dy;
        }
        if (poly.x < 0 && poly.dx < 0) {
            poly.dx = -poly.dx;
        }
        if (poly.y < 0 && poly.dy < 0) {
            poly.dy = -poly.dy;
        }
        poly.rotation += poly.dy * .01;
    })
}
