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
app.renderer.backgroundColor = 0xECECEC;
document.body.appendChild(app.view);

loader
    .add("images/ecdysis.json")
    .add("images/enemy.json")
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
let slime, enemySlime, line, line2, line3, line4;
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
    slime.animationSpeed = 0.1;
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

    line = new Graphics();
    line.lineStyle(16, 0x000000, 1);
    line.moveTo(0,0);
    line.lineTo(app.renderer.width, 0);
    line.x = 0;
    line.y = line.height / 2;
    line2 = new Graphics();
    line2.lineStyle(16, 0x000000, 1);
    line2.moveTo(0,0);
    line2.lineTo(0, app.renderer.width);
    line2.x = line2.width / 2;
    line2.y = 0;
    line3 = new Graphics();
    line3.lineStyle(16, 0x000000, 1);
    line3.moveTo(0,0);
    line3.lineTo(app.renderer.width, 0);
    line3.x = 0;
    line3.y = app.renderer.height - 8;
    line4 = new Graphics();
    line4.lineStyle(16, 0x000000, 1);
    line4.moveTo(0,0);
    line4.lineTo(0, app.renderer.width);
    line4.x = app.renderer.width - 8;
    line4.y = 0;
    app.stage.addChild(line);
    app.stage.addChild(line2);
    app.stage.addChild(line3);
    app.stage.addChild(line4);

}

function gameLoop(delta) {
    state(delta);
}

function play(delta){
    console.log(slime.width + "x" + slime.height);
    slime.x += slime.vx;
    slime.y += slime.vy;
    setMovementManager(slime,1,.5);
    contain(slime, {x: slime.width, y:  slime.height, width: app.renderer.width, height: app.renderer.height });
    contain(enemySlime, {x: slime.width, y:  slime.height, width: app.renderer.width, height: app.renderer.height });


    if (isColliding(slime, enemySlime, -8, -10)){
        enemySlime.x += 1;
        enemySlime.alpha = 0.5
    }else {
        enemySlime.alpha = 1;
    }

    if (isColliding(slime, line) || isColliding(slime, line2) || isColliding(slime, line3) || isColliding(slime, line4)){
        slime.x = (app.renderer.width / 2) - slime.width;
        slime.y = (app.renderer.height / 2) - slime.height;
    }
}
