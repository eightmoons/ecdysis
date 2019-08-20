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
    .on("progress", onLoaderProgress)
    .load(main);

let id;
function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

let poly1, poly2, poly3, polies;
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
    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){
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
