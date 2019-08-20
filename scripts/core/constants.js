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
const stringAppName = "Ecdysis";
const stringAppVersion = "v 1.0";
const stringStart = "Start";
const stringSettings = "Settings";
const stringCredits = "Credits";
const stringLeaderBoards = "Leaderboards";
const stringHowToPlace = "How to play";
const stringGlobalRisk = "Global Risk";
const stringAug2019 = "Aug 2019";
const stringDevelopedFor = "Developed for ";
const stringGameJam2019 = "GAME JAM 2019";
const stringBack = "Back";
const stringNext = "Next";
const stringCampaign = "Campaign";
const stringSurvival = "Survival";
const stringControls = "Controls";
const stringObjective = "Objective";
const stringObjectiveHint = "the main objective \nis to reach the \nfinal form by \ncollecting evo points";
const stringSlime = "Slime";
const stringSlimeHint = "The slimes are \nbrainless creatures, \ndo not touch them as \nyou will lose a heart";
const stringObstacles = "Obstacles";
const stringObstaclesHint = "Obstacles blocks \nyour regular path, \nyou'll lose a \nheart upon touch";
const stringHeart = "Heart";
const stringHeartHint = "Hearts are your life. \nlosing a heart respawns \nyou at the center. Losing \nall hearts means you lost \nthe game";
const stringFinish = "Finish";
const stringDifficulty = "Difficulty";
const stringSound = "Sound";
const stringOn = "On";
const stringOff = "Off";
const stringEasy = "Easy";
const stringMedium = "Medium";
const stringHard = "Hard";

//styles
const appMargin = 50;
const externalMargin = 20;
const spacingSmall = 30;
const spacingTiny = 20;

//textStyles
const styleLargeText = new TextStyle({
    fontFamily: font_family,
    fontSize: 60,
    fill: colorWhite,
});

const styleMediumText = new TextStyle({
    fontFamily: font_family,
    fontSize: 40,
    fill: colorWhite,
});
const styleMediumTextAccent = new TextStyle({
    fontFamily: font_family,
    fontSize: 40,
    fill: colorAccent,
});

const styleFirst = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorGold,
});
const styleSecond = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorSilver,
});
const styleThird = new TextStyle({
    fontFamily: font_family,
    fontSize: 25,
    fill: colorBronze,
});


const styleSmallText = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorWhite,
});

const styleSmallTextParagraph = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorWhite,
    lineHeight: 30
});

const styleSmallTextIdle = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorLGray,
});

const styleSmallTextAccent = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorAccent,
});

const styleSmallTextRed = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorRed,
});
const styleSmallTextGreen = new TextStyle({
    fontFamily: font_family,
    fontSize: 20,
    fill: colorGreen,
});
const styleTinyText = new TextStyle({
    fontFamily: font_family,
    fontSize: 10,
    fill: colorWhite,
});

const styleTinyTextAccent = new TextStyle({
    fontFamily: font_family,
    fontSize: 10,
    fill: colorAccent,
});