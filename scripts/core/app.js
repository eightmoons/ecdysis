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

//in-game objects
function main(){
    inGameScene = new Container();
    id = resources["images/ecdysis.json"].textures;
    sheet = resources["images/ecdysis.json"].spritesheet;
    let slimeFrames = ["slime1-1.png","slime1-2.png","slime1-3.png","slime1-4.png","slime1-5.png"];
    let slimeTexture = [];
    for (let i = 0; i < 5; i++) {
        slimeTexture.push(sheet.textures[slimeFrames[i]]);
    }
    let slime = new PIXI.AnimatedSprite(slimeTexture);
    slime.x = 150;
    slime.y = 100;
    slime.anchor.set(0.5,0.5);
    slime.animationSpeed =0.15;
    slime.play();

    app.stage.addChild(slime);

    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
}

function play(delta){
}
