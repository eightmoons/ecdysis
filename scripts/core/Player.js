class SnakePlayer {
    constructor(sprite, speed) {
        this.sprite = sprite;
        this.speed = speed;
        sprite.vx = speed;
        sprite.vy = speed;
    }
}