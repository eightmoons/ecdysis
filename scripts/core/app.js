let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle
;

let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
app.renderer.backgroundColor = 0xECECEC;
document.body.appendChild(app.view);

loader
    .add("images/ecdysis.json")
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
function main(){
    inGameScene = new Container();
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
    slime.animationSpeed =0.15;
    slime.play();

    app.stage.addChild(slime);

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
    app.stage.addChild(enemySlime);

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){
    slime.x += slime.vx;
    slime.y += slime.vy;
    setMovementManager(slime,1,.5);
    contain(slime, {x: slime.width, y:  slime.height, width: app.renderer.width, height: app.renderer.height });
    contain(enemySlime, {x: slime.width, y:  slime.height, width: app.renderer.width, height: app.renderer.height });

    console.log(isColliding(slime, enemySlime))

    if (isColliding(slime, enemySlime)){
        enemySlime.x += 1;
        enemySlime.alpha = 0.5
    }else {
        enemySlime.alpha = 1;
    }
}
