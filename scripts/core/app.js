let Application = PIXI.Application,
    Rectangle = PIXI.Rectangle,
    loader = PIXI.Loader.shared,
    TextureCache = PIXI.utils.TextureCache,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    width: 512,
    height: 512,
    transparent: false,
    antialias: true
});
document.body.appendChild(app.view);

loader
    .add("images/dungeonhunter.json")
    .on("progress", onLoaderProgress)
    .load(setup);
function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

let dungeon, explorer, treasure, id, door;
function setup(){

    let dungeonTexture = TextureCache["dungeon.png"];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    explorer = new Sprite(resources["images/dungeonhunter.json"].textures["explorer.png"]);
    explorer.x = 68;
    explorer.y = app.stage.height / 2 - explorer.height / 2;
    app.stage.addChild(explorer);

    id = resources["images/dungeonhunter.json"].textures;

    let treasure = new Sprite(id["treasure.png"]);

    treasure.x = app.stage.width - treasure.width - 48;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);

    door = new Sprite(id["door.png"]);
    door.x = door.width;
    app.stage.addChild(door);

    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150;
    for (let i = 0; i < numberOfBlobs; i++) {
        let blob = new Sprite(id["blob.png"]);
        let x = spacing * i + xOffset;
        let y = randomInt(0, app.stage.height - blob.height);
        blob.x = x;
        blob.y = y;
        app.stage.addChild(blob);
    }

    app.ticker.add(delta => gameLoop(delta));
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop(delta){
    explorer.x += 1 + delta;
}