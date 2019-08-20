function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onButtonDown(){
    this.isdown = true;
    this.style = style_small_text_accent;
}

function onButtonUp(){
    this.isdown = false;
    this.style = this.isover ? style_small_text : style_small_text_idle;
}

function onButtonOver() {
    this.isover = true;
    if (!this.isdown) {
        this.style = style_small_text;
    }
}

function onButtonOut() {
    this.isover = false;
    if (!this.isdown) {
        this.style = style_small_text_idle;
    }
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

function initializeInContainer(pixi_objects, container) {
    pixi_objects.forEach(obj => {
        container.addChild(obj);
    });
}
