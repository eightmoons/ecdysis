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
const colorGold = 0xFFEE00;
const colorSilver = 0xBCBCBC;
const colorBronze = 0x773F3F;

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
const string_objective_desc_line_1 =   "To win, You need to";
const string_objective_desc_line_2 =   "reach the final";
const string_objective_desc_line_3 =   "evolution by";
const string_objective_desc_line_4 =   "picking ";
const string_objective_desc_line_4_highlight =   "EVO Points";
const string_slime = "Slime";
const string_the = "The";
const string_slime_slimes = "slimes";
const string_slime_desc_line_1_final_words = "are brainless";
const string_slime_desc_line_2 = "creatures, do not touch";
const string_slime_desc_line_3 = "them as you will lose";
const string_hearts = "hearts";
const string_heart = "Heart";
const string_heart_desc_line_1 = "Every game you start with";
const string_heart_desc_line_2_highlight = "3 hearts";
const string_heart_desc_line_2 = ". If your ";
const string_heart_desc_line_2_highlight_2 = "hearts";
const string_heart_desc_line_3 = "reaches ";
const string_heart_desc_line_3_highlight = "0";
const string_heart_desc_line_3_final_words = " you lose";
const string_finish = "Finish";

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