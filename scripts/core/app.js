let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type);


let app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
    antialias: true
});

let texture = PIXI.utils.TextureCache["images/dices.png"];
let sprite = new PIXI.Sprite(texture);
let loader = new PIXI.Loader();
PIXI.loader.add("images/dices.png").load(setup);

function setup() {
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources["images/dices.png"].texture
    );
    app.stage.addChild(sprite);
}
document.body.appendChild(app.view);