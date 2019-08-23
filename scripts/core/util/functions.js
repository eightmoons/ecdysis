function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initializeInteractivity(pixi_objects) {
    pixi_objects.forEach(obj => {
        obj.interactive = true;
        obj.buttonMode = true;
        obj
            .on('touchstart', onButtonDown)
            .on('mouseup', onButtonUp)
            .on('mouseupoutside', onButtonUp)
            .on('touchendoutside', onButtonUp)
            .on('mouseover', onButtonOver)
            .on('mouseout', onButtonOut);
    });
}

function initializeInContainer(pixi_objects, container, onBack = false) {
    pixi_objects.forEach(obj => {
        if (!onBack){
            container.addChild(obj);
        }
        else {
            container.addChildAt(obj,0);
        }
    });
}

function changeScene(from, to, polygons = undefined){
    from.visible = false;
    to.visible = true;
    if (polygons !== undefined){
        initializeInContainer(polygons, to, true);
    }
}

function setMovementManager(sprite, as = 0) {
    let left = keyboard("a"),
        up = keyboard("w"),
        right = keyboard("d"),
        down = keyboard("s");
    let onKeyPressBonusSpeed = 2;
    left.press = () => {
        if (sprite.vx === 0) {
            sprite.vx = -onKeyPressBonusSpeed;
            sprite.vy = 0;
            sprite.rotation = Math.PI / 2;
        }
        a.style = styleSmallTextAccent;
    };
    left.release = () => {
        if (!right.isDown) {
            a.style = styleSmallText;
        }
    };


    up.press = () => {
        if (sprite.vy === 0) {
            sprite.vy = -onKeyPressBonusSpeed;
            sprite.vx = 0;
            sprite.rotation = Math.PI;
        }
        w.style = styleSmallTextAccent;
    };
    up.release = () => {
        if (!down.isDown) {
            w.style = styleSmallText;
        }
    };

    right.press = () => {
        d.style = styleSmallTextAccent;
        if (sprite.vx === 0) {
            sprite.vx  = onKeyPressBonusSpeed;
            sprite.vy = 0;
            sprite.rotation = Math.PI / 2 + Math.PI;
        }
    };
    right.release = () => {
        if (!left.isDown) {
            d.style = styleSmallText;
        }
    };

    down.press = () => {
        if (sprite.vy === 0) {
            sprite.vy = onKeyPressBonusSpeed;
            sprite.vx = 0;
            sprite.rotation = Math.PI * 2;
        }
        s.style = styleSmallTextAccent;
    };
    down.release = () => {
        if (!up.isDown) {
            s.style = styleSmallText;
        }
    };
}

function isColliding(r1, r2, xoffset = 0, yoffset = 0) {

    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;

    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2 ;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2 + yoffset;

    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    if (Math.abs(vx + xoffset) < combinedHalfWidths) {

        if (Math.abs(vy + yoffset) < combinedHalfHeights) {
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

function gameOver() {
    gameEndText.text = "GAME OVER";
    gameEndText.style = styleLargeTextRed;
    gameEndDesc.text = "You ran out of hearts";
    gameEndScoreText.text = "Score: " + saveState.campaign.score;
    gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
    gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
    gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
    gameStageArea.texture = playAreasAssets["playerArea1.png"]
    checkHighScores();
}

function victory() {
    gameEndText.text = "VICTORY";
    gameEndText.style = styleLargeTextGreen;
    gameEndDesc.text = "You beat the game!";
    gameEndScoreText.text = "Score: " + saveState.campaign.score;
    gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
    gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
    gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
    gameStageArea.texture = playAreasAssets["playerArea1.png"];
    checkHighScores();
}

function checkHighScores() {
    let rank, playername, theirScore;
    highScoreText.visible = true;
    if (saveState.campaign.score > rank1.score ) {
        playername = rank1.playerName;
        theirScore = rank1.score;
        rank = "1st";
        rank3 = {
            playerName: rank2.playerName,
            score: rank2.score
        };
        rank2 = {
            playerName: rank1.playerName,
            score: rank1.score
        };
        rank1 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }
    }
    else if (saveState.campaign.score > rank2.score ) {
        playername = rank2.playerName;
        theirScore = rank2.score;
        rank = "2nd";
        rank3 = {
            playerName: rank2.playerName,
            score: rank2.score
        };
        rank2 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }
    }
    else if (saveState.campaign.score > rank3.score) {
        playername = rank3.playerName;
        theirScore = rank3.score;
        rank = "3rd";
        rank3 = {
            playerName: saveState.playerName,
            score: saveState.campaign.score
        }

    }
    else {
        highScoreText.visible = false;
    }
    highScoreText.text = "You beat " + rank + " place " + playername + " (Score: " + theirScore + ")!";
    highScoreText.position.set(width - (appMargin + highScoreText.width), height - (20 + highScoreText.height));

    firstText.text = "1st  " + rank1.playerName +": " + rank1.score;
    secondText.text = "2nd  " + rank2.playerName +": " + rank2.score;
    thirdText.text = "3rd  " + rank3.playerName + ": " + rank3.score;

    saveState = {
        playerName: "",
        campaign: {
            life: 3,
            score: 0,
            coins: 0,
            evolve: 0,
            stage: 1,
            level: 1,
            upgrades: {
                lethality: 1,
                quantity: 1,
                fireRate: 1,
                movement: false
            }
        }
    };
    saveState.campaign.life = 3;
}

let px = 16;
let bXMargin = 100 + px * 4;
let bYMargin = 140;

function getCenterHorizontal(sprite) {
    return sprite.parent.width/2 - (sprite.width/2)
}

function getCenterVertical(sprite) {
    return sprite.parent.height / 2 - (sprite.height / 2);
}

function setSprites(sprites, texture) {
    sprites.forEach(sprite => {
        sprite.texture = texture;
    })
}
