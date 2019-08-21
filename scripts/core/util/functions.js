function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initializeInteractivity(pixi_objects) {
    pixi_objects.forEach(obj => {
        obj.interactive = true;
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

function setMovementManager(sprite, onKeyPressBonusSpeed = 2) {
    let left = keyboard("a"),
        up = keyboard("w"),
        right = keyboard("d"),
        down = keyboard("s");

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
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

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