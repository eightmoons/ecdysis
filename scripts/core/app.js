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

let id;
function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

let poly1, poly2, poly3, polies, animatedLargeSlime;
function main(){
    id = resources["images/polygons.json"].textures;
    poly1 = new Sprite(id["poly1.png"]);
    poly2 = new Sprite(id["poly2.png"]);
    poly3 = new Sprite(id["poly3.png"]);
    poly2.position.set(129,505);
    poly3.position.set(565,218);
    mainMenuScene.addChildAt(poly1, 0);
    mainMenuScene.addChildAt(poly2, 0);
    mainMenuScene.addChildAt(poly3, 0);
    polies = [poly1,poly2,poly3];
    polies.forEach(poly => {
        poly.dx = 0.5;
        poly.dy = 0.5;
    });
    scenes.forEach(scene => {
        app.stage.addChild(scene);
        scene.visible = false;
    });
    mainMenuScene.visible = true;

    animatedLargeSlime = new PIXI.AnimatedSprite(resources["images/large_slime.json"].spritesheet.animations["1"]);
    animatedLargeSlime.width = 150;
    animatedLargeSlime.height = 150;
    animatedLargeSlime.x = 25;
    animatedLargeSlime.y = 25;
    animatedLargeSlime.play();
    animatedLargeSlime.animationSpeed =0.12;
    animatedLargeSlime.position.set(600,220);
    slimeTutorialScene.addChild(animatedLargeSlime);










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
        poly.rotation += 0.001;
    })
}
