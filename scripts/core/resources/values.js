let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics
;

let width = 800;
let height = 600;

let DIFFICULTY = 1;
let SOUND = true;

const DARKTHEME = false;

const font_family = "Press Start 2P";
const appMargin = 50;
const externalMargin = 20;
const spacingSmall = 30;
const spacingTiny = 20;

let saveState = {
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


let rank1  = {
    playerName: "N0obSlayer",
    score: 69
};
let rank2  = {
    playerName: "XxPr0xX",
    score: 42
};
let rank3  = {
    playerName: "Rami",
    score: 22
};