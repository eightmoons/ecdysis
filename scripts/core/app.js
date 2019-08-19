

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
    startMenuScene.visible = false;
    app.stage.addChild(mainMenuScene);
    app.stage.addChild(howtoplayMenuScene);
    app.stage.addChild(startMenuScene);
    state = play;
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){


}
