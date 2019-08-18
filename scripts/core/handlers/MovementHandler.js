function setMovementManager(sprite, initial_speed = 2, base_speed = 0) {
    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => {
        sprite.vx = -initial_speed;
        sprite.vy = 0;
    };
    left.release = () => {
        if (!right.isDown && sprite.vy === 0) {
            sprite.vx = -base_speed;
        }
    };

    up.press = () => {
        sprite.vy = -initial_speed;
        sprite.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = -base_speed;
        }
    };

    right.press = () => {
        sprite.vx  = initial_speed;
        sprite.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = base_speed;
        }
    };

    down.press = () => {
        sprite.vy = initial_speed;
        sprite.vx = 0;
    };
    down.release = () => {
        if (!up.isDown  && sprite.vx === 0) {
            sprite.vy = base_speed;
        }
    };
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );

    window.addEventListener(
        "keyup", upListener, false
    );

    key.unsubscribe = ( ) => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    }

    return key;
}

