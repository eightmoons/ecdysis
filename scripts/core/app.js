let Application = PIXI.Application,
    Rectangle = PIXI.Rectangle,
    loader = PIXI.Loader.shared,
    TextureCache = PIXI.utils.TextureCache,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});
document.body.appendChild(app.view);

loader
    .add("images/tileset.png")
    .on("progress", onLoaderProgress)
    .load(setup);
function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

function setup(){
    let texture = TextureCache["images/tileset.png"];

    let rectangle = new Rectangle(128+64, 128, 64, 64);

    texture.frame = rectangle;

    let rocket = new Sprite(texture);

    rocket.x = 32;
    rocket.y = 32;

    app.stage.addChild(rocket);

    app.renderer.render(app.stage);
}