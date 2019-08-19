//pixi globals
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

//colors
const colorBlack = 0x212121;
const colorWhite = 0xFFFFFF;
const colorLGray = 0x757575;
const colorAccent = 0xF44336;

//etc
const font_family = "Press Start 2P";

//strings
const string_app_name = "Ecdysis";
const string_app_version = "v 1.0";

const string_start = "Start";
const string_settings = "Settings";
const string_credits = "Credits";
const string_leader_boards = "Leaderboards";
const string_how_to_play = "How to play";
const string_global_risk = "Global Risk";
const string_date = "Aug 2019";
const string_cause = "Developed for ";
const string_reason = "GAME JAM 2019";
const string_back = "Back";
const string_next = "Next";
const string_campaign = "Campaign";
const string_survival = "Survival";
const string_controls = "Controls";


//textStyles
const style_large_text = new TextStyle({
    fontFamily: font_family,
    fontSize: 60,
    fill: colorWhite,
});

const style_medium_text = new TextStyle({
    fontFamily: font_family,
    fontSize: 40,
    fill: colorWhite,
});

const style_small_text = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorWhite,
});

const style_small_text_idle = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorLGray,
});

const style_small_text_accent = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorAccent,
});

const style_tiny_text = new TextStyle({
    fontFamily: font_family,
    fontSize: 10,
    fill: colorWhite,
});

const style_tiny_text_accent = new TextStyle({
    fontFamily: font_family,
    fontSize: 10,
    fill: colorAccent,
});