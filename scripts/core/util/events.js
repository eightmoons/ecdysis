function onButtonDown(){
    this.isdown = true;
    this.style = styleSmallTextAccent;
}

function onButtonUp(){
    this.isdown = false;
    this.style = this.isover ? styleSmallText : styleSmallTextIdle;
}

function onButtonOver() {
    this.isover = true;
    if (!this.isdown) {
        this.style = styleSmallText;
    }
}

function onButtonOut() {
    this.isover = false;
    if (!this.isdown) {
        this.style = styleSmallTextIdle;
    }
}