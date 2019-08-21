let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics
;

let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
app.renderer.backgroundColor = 0x212121;
document.body.appendChild(app.view);

loader
    .add("images/ecdysis.json")
    .add("images/enemy.json")
    .add("images/rectangle.png")
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}
//scenes
let mainMenuScene, inGameScene;

//pixi objects
let state;

//in-game objects
let slime, enemySlime;
let bg;
function main(){
    inGameScene = new Container();
    bg = new Sprite(resources["images/rectangle.png"].texture);
    bg.y = 88;
    inGameScene.addChild(bg);


    id = resources["images/ecdysis.json"].textures;
    sheet = resources["images/ecdysis.json"].spritesheet;
    let slimeFrames = ["slime1-1.png","slime1-2.png","slime1-3.png","slime1-4.png","slime1-5.png"];
    let slimeTexture = [];
    for (let i = 0; i < 5; i++) {
        slimeTexture.push(sheet.textures[slimeFrames[i]]);
    }
    slime = new PIXI.AnimatedSprite(slimeTexture);
    slime.x = 100;
    slime.y = 100;
    slime.vx = 0;
    slime.vy = 0;
    slime.anchor.set(0.5,0.5);
    slime.animationSpeed = 0.1;
    slime.play();
    inGameScene.addChild(slime);

    slimeFrames = ["slime3-1.png","slime3-2.png","slime3-3.png","slime3-4.png","slime3-5.png"];
    let enemySlimeTexture = [];
    for (let i = 0; i < 5; i++) {
        enemySlimeTexture.push(sheet.textures[slimeFrames[i]]);
    }

    enemySlime = new PIXI.AnimatedSprite(enemySlimeTexture);
    enemySlime.x = 100;
    enemySlime.y = 100;
    enemySlime.animationSpeed =0.15;
    enemySlime.play()
    inGameScene.addChild(enemySlime);
    app.stage.addChild(inGameScene);

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){
    slime.x += slime.vx;
    slime.y += slime.vy;
    setMovementManager(slime,1,2);
    contain(slime, {x: 23, y:  88 + 23, width: app.renderer.width, height: app.renderer.height - 88 });
    contain(enemySlime, {x: 23, y:  88 + 23, width: app.renderer.width, height: app.renderer.height - 88 });

    if (isColliding(slime, enemySlime, -8, -10)){
        enemySlime.x += 1;
        enemySlime.alpha = 0.5
    }else {
        enemySlime.alpha = 1;
    }

}
