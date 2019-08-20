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
//settings

let DIFFICULTY = 1,
    SOUND = true;


//colors
const colorBlack = 0x212121;
const colorWhite = 0xFFFFFF;
const colorLGray = 0x757575;
const colorAccent = 0xF44336;
const colorGold = 0xFFEE00;
const colorSilver = 0xBCBCBC;
const colorBronze = 0x773F3F;
const colorRed = 0xE53D3D;
const colorPink = 0xE53DB3;
const colorGreen = 0x80E53D;
const colorBlue = 0x3D75E5;

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
const string_objective = "Objective";
const string_objective_description = "the main objective \nis to reach the \nfinal form by \ncollecting evo points";
const string_slime = "Slime";
const string_slime_desc = "The slimes are \nbrainless creatures, \ndo not touch them as \nyou will lose a heart";
const string_obstacles = "Obstacles";
const string_obstacles_desc = "Obstacles blocks \nyour regular path, \nyou'll lose a \nheart upon touch";
const string_heart = "Heart";
const string_heart_description = "Hearts are your life. \nlosing a heart respawns \nyou at the center. Losing \nall hearts means you lost \nthe game";
const string_finish = "Finish";
const string_difficulty = "Difficulty";
const string_sound = "Sound";
const string_on = "On";
const string_off = "Off";
const string_easy = "Easy";
const string_medium = "Medium";
const string_hard = "Hard";

//styles
const appMargin = 50;
const externalMargin = 20;
const spacingSmall = 30;
const spacingTiny = 20;

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
const style_medium_text_accent = new TextStyle({
    fontFamily: font_family,
    fontSize: 40,
    fill: colorAccent,
});

const style_first = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorGold,
});
const style_second = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorSilver,
});
const style_third = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorBronze,
});


const style_small_text = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorWhite,
});

const style_small_text_paragraph = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorWhite,
    lineHeight: 30
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

const style_small_text_red = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorRed,
});
const style_small_text_green = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorGreen,
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