let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

let app = new Application({
    width: 512,
    height: 512,
    transparent: false,
    antialias: true
});
document.body.appendChild(app.view);

loader
    .add("images/tileset.png")
    .load(setup);

function setup(){
    let baseTexture = TextureCache["images/tileset.png"];

    let catTexture = baseTexture;
    catTexture.frame = new Rectangle(0, 0, 64, 64);
    let cat = new Sprite(catTexture);
    cat.position.set(16,16);

    let hedgehogTexture = baseTexture;
    hedgehogTexture.frame = new Rectangle(64,0,64,64);
    let hedgehog = new Sprite(hedgehogTexture);
    hedgehog.position.set(32,32);

    let tigerTexture = baseTexture;
    tigerTexture.frame = new Rectangle(0,64,64,64);
    let tiger = new Sprite(tigerTexture);
    tiger.position.set(64,64);

    let animals = new Container();
    animals.addChild(cat);
    animals.addChild(hedgehog);
    animals.addChild(tiger);
    app.stage.addChild(animals);
    app.renderer.render(app.stage);
}

// loader
//     .add("images/cat.png")
//     .load(setup);
//
// let cat, state;
// function setup(){
//     cat = new Sprite(resources["images/cat.png"].texture);
//     cat.y = 96;
//     cat.vx = 0;
//     cat.vy = 0;
//     app.stage.addChild(cat);
//
//     let left = keyboard("ArrowLeft"),
//         up = keyboard("ArrowUp"),
//         right = keyboard("ArrowRight"),
//         down = keyboard("ArrowDown");
//
//     left.press = () => {
//         cat.vx = -5;
//         cat.vy = 0;
//     };
//     left.release = () => {
//         if (!right.isDown && cat.vy === 0) {
//             cat.vx = 0;
//         }
//     };
//
//     up.press = () => {
//         cat.vy = -5;
//         cat.vx = 0;
//     };
//     up.release = () => {
//         if (!down.isDown && cat.vx === 0) {
//             cat.vy = 0;
//         }
//     };
//
//     right.press = () => {
//         cat.vx  = 5;
//         cat.vy = 0;
//     };
//     right.release = () => {
//         if (!left.isDown && cat.vy === 0) {
//             cat.vx = 0;
//         }
//     };
//
//     down.press = () => {
//         cat.vy = 5;
//         cat.vx = 0;
//     };
//     down.release = () => {
//         if (!up.isDown  && cat.vx === 0) {
//             cat.vy = 0;
//         }
//     };
//
//     state = play;
//     app.ticker.add(delta => gameLoop(delta));
// }
//
//
// function gameLoop(delta){
//     state(delta);
// }
//
// function play(delta){
//
//     cat.x += cat.vx;
//     cat.y += cat.vy;
// }
//
// function keyboard(value) {
//     let key = {};
//     key.value = value;
//     key.isDown = false;
//     key.isUp = true;
//     key.press = undefined;
//     key.release = undefined;
//
//     key.downHandler = event => {
//         if (event.key === key.value) {
//             if (key.isUp && key.press) key.press();
//             key.isDown = true;
//             key.isUp = false;
//             event.preventDefault();
//         }
//     };
//
//     key.upHandler = event => {
//         if (event.key === key.value) {
//             if (key.isDown && key.release) key.release();
//             key.isDown = false;
//             key.isUp = true;
//             event.preventDefault();
//         }
//     };
//
//     const downListener = key.downHandler.bind(key);
//     const upListener = key.upHandler.bind(key);
//
//     window.addEventListener(
//         "keydown", downListener, false
//     );
//
//     window.addEventListener(
//         "keyup", upListener, false
//     );
//
//     key.unsubscribe = ( ) => {
//         window.removeEventListener("keydown", downListener);
//         window.removeEventListener("keyup", upListener);
//     }
//
//     return key;
// }

// loader
//     .add("images/dungeonhunter.json")
//     .on("progress", onLoaderProgress)
//     .load(setup);
// function onLoaderProgress(loader, resource) {
//     console.log("loading: " + resource.url);
//     console.log("progress:" + loader.progress + "%");
// }
//
// let dungeon, explorer, treasure, id, door;
// function setup(){
//
//     let dungeonTexture = TextureCache["dungeon.png"];
//     dungeon = new Sprite(dungeonTexture);
//     app.stage.addChild(dungeon);
//
//     explorer = new Sprite(resources["images/dungeonhunter.json"].textures["explorer.png"]);
//     explorer.x = 68;
//     explorer.y = app.stage.height / 2 - explorer.height / 2;
//     app.stage.addChild(explorer);
//
//     id = resources["images/dungeonhunter.json"].textures;
//
//     let treasure = new Sprite(id["treasure.png"]);
//
//     treasure.x = app.stage.width - treasure.width - 48;
//     treasure.y = app.stage.height / 2 - treasure.height / 2;
//     app.stage.addChild(treasure);
//
//     door = new Sprite(id["door.png"]);
//     door.x = door.width;
//     app.stage.addChild(door);
//
//     let numberOfBlobs = 6,
//         spacing = 48,
//         xOffset = 150;
//     for (let i = 0; i < numberOfBlobs; i++) {
//         let blob = new Sprite(id["blob.png"]);
//         let x = spacing * i + xOffset;
//         let y = randomInt(0, app.stage.height - blob.height);
//         blob.x = x;
//         blob.y = y;
//         app.stage.addChild(blob);
//     }
//
//     app.ticker.add(delta => gameLoop(delta));
// }
// function randomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// function gameLoop(delta){
//     explorer.x += 1 + delta;
// }

// loader
//     .add("images/tileset.png")
//     .load(setup);
//
// function setup(){
//     let texture = TextureCache["images/tileset.png"];
//     let rectangle = new Rectangle(192,128,64,64);
//     texture.frame = rectangle;
//     let rocket = new Sprite(texture);
//
//     rocket.x = 32;
//     rocket.y = 32;
//
//     app.stage.addChild(rocket);
//     app.renderer.render(app.stage);
// }