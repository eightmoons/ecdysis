let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

let app = new Application({
    width: 512,
    height: 512,
    transparent: false,
    antialias: true,
})
let stage = app.stage;
document.body.appendChild(app.view);


loader
    .add("images/dungeonhunter.json")
    .on("progress", onLoaderProgress)
    .load(setup);

function onLoaderProgress(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress:" + loader.progress + "%");
}

let dungeon, explorer, treasure, id, door, blobs, message, state, explorerHit;
let gameScene, gameOverScene;
function setup(){
    gameScene = new Container();
    gameOverScene = new Container();
    gameOverScene.visible = false;

    let id = resources["images/dungeonhunter.json"].textures;

    dungeon = new Sprite(id["dungeon.png"]);
    gameScene.addChild(dungeon);

    door = new Sprite(id["door.png"]);
    door.position.set(32,0);
    gameScene.addChild(door);

    explorer = new Sprite(id["explorer.png"]);
    explorer.x = 68;
    explorer.y = gameScene.height / 2 - explorer.height / 2;
    explorer.vx = 0;
    explorer.vy = 0;
    gameScene.addChild(explorer);

    treasure = new Sprite(id["treasure.png"]);
    treasure.x = gameScene.width - treasure.width - 48;
    treasure.y = gameScene.height / 2 - treasure.height / 2;
    gameScene.addChild(treasure);

    app.stage.addChild(gameScene);
    app.stage.addChild(gameOverScene);

    let numberOfBlobs = 6,
        spacing = 48,
        xOffset = 150,
        direction = 1;

    blobs = [];

    for (let i = 0; i < numberOfBlobs; i++) {
        let blob = new Sprite(id["blob.png"]);
        let x = spacing * i + xOffset;
        let y = randomInt(0, 488 - blob.height);
        blob.x = x;
        blob.y = y;
        blob.vy = 2 * direction;
        direction *= 1;
        blobs.push(blob);
        gameScene.addChild(blob);
    }

    healthBar = new PIXI.Container();
    healthBar.getGlobalPosition().set(stage.width - 170, 4);
    gameScene.addChild(healthBar);

    let innerBar = new PIXI.Graphics();
    innerBar.beginFill( 0x000000);
    innerBar.drawRect(0,0,128,8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    let outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0,0,128,8);
    outerBar.endFill();
    healthBar.addChild(outerBar);
    healthBar.outer = outerBar;

    let style = new TextStyle({
        fontFamily: "Futura",
        fontSize: 64,
        fill: "white"
    });

    message = new Text("The End!", style);
    message.x = 120;
    message.y = app.stage.height / 2 - 32;
    gameOverScene.addChild(message);

    state = play;
    app.ticker.add(delta => gameLoop(delta))
}

function gameLoop(delta) {
    state(delta);
}

function play(delta){
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;
    setMovementManager(explorer, 5);

    contain(explorer, {x: 28, y: 10, width: 488, height: 480});

    blobs.forEach(function (blob) {
        blob.y += blob.vy;

        let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 488});

        if (blobHitsWall === "top" || blobHitsWall === "bottom"){
            blob.vy *= -1;
        }

        if (isColliding(explorer, blob)){
            explorerHit = true;
        }
    });

    if (explorerHit) {
        explorer.alpha = 0.5;
        healthBar.outer.width -= 1;
        explorerHit = false;
    }
    else {
        explorer.alpha = 1;
    }

    if (isColliding(explorer, treasure)) {
        treasure.x = explorer.x + 8;
        treasure.y = explorer.y + 8;
    }

    if (isColliding(treasure, door)) {
        state = end;
        message.text = "You won!";
    }

    if (healthBar.outer.width < 0) {
        state = end;
        message.text = "You Lost!";
    }
}

function end(delta) {
    gameScene.visible = false;
    gameOverScene.visible = true;
}


function isColliding(r1, r2) {

    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    if (Math.abs(vx) < combinedHalfWidths) {

        if (Math.abs(vy) < combinedHalfHeights) {
            hit = true;
        } else {
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contain(sprite, container) {
    let collision = undefined;
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision = "left";
    }

    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision = "top";
    }

    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision = "right";
    }

    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision = "bottom";
    }

    return collision;
}

function setMovementManager(sprite, base_speed) {
    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => {
        sprite.vx = -5;
        sprite.vy = 0;
    };
    left.release = () => {
        if (!right.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    up.press = () => {
        sprite.vy = -5;
        sprite.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

    right.press = () => {
        sprite.vx  = 5;
        sprite.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    down.press = () => {
        sprite.vy = 5;
        sprite.vx = 0;
    };
    down.release = () => {
        if (!up.isDown  && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

}