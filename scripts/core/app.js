

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

// let mainMenuScene = new Container();
// let startMenuScene = new Container();
// let settingsMenuScene = new Container();
// let leaderboardsMenuScene = new Container();
// let h2pMenuScene = new Container();
// let h2pMenuScene2 = new Container();

function main(){
    startMenuScene.visible = false;
    app.stage.addChild(mainMenuScene);
    app.stage.addChild(startMenuScene);
    app.stage.addChild(h2pMenuScene);
    app.stage.addChild(h2pMenuScene2);
    app.stage.addChild(h2pMenuScene3);
    app.stage.addChild(h2pMenuScene4);
    app.stage.addChild(h2pMenuScene5);
    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){


}
