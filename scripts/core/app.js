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
    .on("progress", onLoaderProgress)
    .load(main);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}


function main(){
    let scene1 = new Container();
    let appNameText, versionText, startText, authorText;

    appNameText = new Text(app_name, largeText);
    appNameText.position.set(50,60);
    scene1.addChild(appNameText);

    versionText = new Text(app_version, smallText);
    versionText.position.set(appNameText.width , 60 + appNameText.height);
    scene1.addChild(versionText);

    authorText = new Text(text_globalrisk, tinyTextAccent);
    authorText.position.set(50, 15);
    scene1.addChild(authorText);



    app.stage.addChild(scene1);
    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){


}
