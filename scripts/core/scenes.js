//scenes
let mainMenuScene = new Container(),
    startMenuScene = new Container(),
    settingsMenuScene = new Container(),
    leaderBoardsMenuScene = new Container(),
    movementTutorialScene = new Container(),
    objectiveTutorialScene = new Container(),
    slimeTutorialScene = new Container(),
    heartTutorialScene = new Container(),
    h2pMenuScene5 = new Container()
;

let scenes = [
    mainMenuScene,
    startMenuScene,
    settingsMenuScene,
    leaderBoardsMenuScene,
    movementTutorialScene,
    objectiveTutorialScene,
    slimeTutorialScene,
    heartTutorialScene,
    h2pMenuScene5
];

/******************
 * Main Menu
 *
 *****************/
let startText = new PIXI.Text(string_start, style_small_text_idle),
    settingsText = new PIXI.Text(string_settings, style_small_text_idle),
    creditsText = new PIXI.Text(string_credits, style_small_text_idle),
    leaderBoardsText = new PIXI.Text(string_leader_boards, style_small_text_idle),
    howToPlayText = new PIXI.Text(string_how_to_play, style_small_text_idle);
let appNameText = new PIXI.Text(string_app_name, style_large_text),
    versionText = new PIXI.Text(string_app_version, style_small_text),
    authorText = new PIXI.Text(string_global_risk, style_tiny_text_accent),
    dateText = new PIXI.Text(string_date, style_tiny_text_accent),
    causeText = new PIXI.Text(string_cause, style_tiny_text),
    reasonText = new PIXI.Text(string_reason, style_tiny_text_accent);

appNameText.position.set(appMargin,appMargin + 30);
versionText.position.set(
    appMargin + appNameText.width - versionText.width - 8,
    appMargin + appNameText.height + versionText.height + 8);
authorText.position.set(appMargin, externalMargin);
dateText.position.set(width - (appMargin + dateText.width), externalMargin);
causeText.position.set(appMargin, height - externalMargin - causeText.height);
reasonText.position.set(appMargin + causeText.width, height - externalMargin - reasonText.height);

startText.position.set(appMargin, versionText.y + 115);
settingsText.position.set(appMargin, startText.y + startText.height + spacingSmall);
creditsText.position.set(appMargin, settingsText.y + settingsText.height + spacingSmall);
leaderBoardsText.position.set(appMargin, creditsText.y + creditsText.height + spacingSmall);
howToPlayText.position.set(appMargin, leaderBoardsText.y + leaderBoardsText.height + spacingSmall);

let mainMenuButtons = [startText, settingsText, creditsText, leaderBoardsText, howToPlayText];
let mainMenuObjects = [startText, settingsText, creditsText, leaderBoardsText, howToPlayText,
    appNameText, versionText, authorText, dateText, causeText, reasonText];
initializeInteractivity(mainMenuButtons);
initializeInContainer(mainMenuObjects, mainMenuScene);

howToPlayText.on('mousedown', () => {
    mainMenuScene.visible = false;
    movementTutorialScene.visible = true;
});

leaderBoardsText.on('mousedown', () => {
    mainMenuScene.visible = false;
    leaderBoardsMenuScene.visible = true;
});

startText.on('mousedown',() => {
    mainMenuScene.visible = false;
    startMenuScene.visible = true;
});
/******************
 * START MENU
 *
 *****************/
let campaignText = new PIXI.Text(string_campaign, style_small_text_idle),
    survivalText = new PIXI.Text(string_survival, style_small_text_idle),
    backText = new PIXI.Text(string_back, style_small_text_idle);
let startAppNameText = new PIXI.Text(string_app_name, style_large_text),
    startVersionText = new PIXI.Text(string_app_version, style_small_text);

startAppNameText.position.set(appMargin,appMargin + 30);
startVersionText.position.set(appMargin + startAppNameText.width - startVersionText.width - 8,
    appMargin + startAppNameText.height + startVersionText.height + 8);

campaignText.position = startText.position;
survivalText.position = settingsText.position;
backText.position.set(appMargin,height - (appMargin + backText.height));

let startButtons = [campaignText, survivalText, backText];
let startObjects = [startAppNameText, startVersionText, campaignText, survivalText, backText];

initializeInteractivity(startButtons);
initializeInContainer(startObjects, startMenuScene);

backText.on('mousedown', () => {
    startMenuScene.visible = false;
    mainMenuScene.visible = true;
});
/******************
 * Leaderboards
 *
 *
 *****************/
let leaderBoardHeaderText = new PIXI.Text(string_leader_boards,style_large_text),
    firstText = new PIXI.Text("1st  N0obSl4yer: 69", style_first),
    secondText = new PIXI.Text("2nd  XxPROxX: 42", style_second),
    thirdText = new PIXI.Text("3rd  Rami: 22", style_third);
let leaderBoardBack = new PIXI.Text(string_back, style_small_text_idle);

leaderBoardHeaderText.position = appNameText.position;
firstText.position.set(50, leaderBoardHeaderText.y + leaderBoardHeaderText.height + 100);
secondText.position.set(50, firstText.y + firstText.height + spacingTiny);
thirdText.position.set(50, secondText.y + secondText.height + spacingTiny);
leaderBoardBack.position.set(appMargin, height - (appMargin + leaderBoardBack.height));
let leaderboardButtons = [leaderBoardHeaderText, firstText, secondText, thirdText, leaderBoardBack];
    leaderboardObjects = [leaderBoardBack];

initializeInteractivity(leaderboardObjects);
initializeInContainer(leaderboardButtons, leaderBoardsMenuScene);

leaderBoardBack.on('mousedown', () => {
   leaderBoardsMenuScene.visible = false;
   mainMenuScene.visible = true;
});
/******************
 * How to Play Menu
 * Controls Tutorial
 * Page 1
 *****************/
let headerText = new PIXI.Text(string_how_to_play, style_large_text),
    controls = new PIXI.Text(string_controls,style_medium_text_accent),
    w = new PIXI.Text("W - Move Up", style_small_text),
    a = new PIXI.Text("A - Move Left", style_small_text),
    s = new PIXI.Text("S - Move Bottom", style_small_text),
    d = new PIXI.Text("D - Move Right", style_small_text);
let back2home = new PIXI.Text(string_back, style_small_text_idle),
    next2page2 = new PIXI.Text(string_next, style_small_text_idle);

headerText.position.set(appMargin, appMargin + 30);
controls.position.set(appMargin, headerText.y + headerText.height + 40);

w.position.set(appMargin, controls.y + controls.height + 100);
a.position.set(appMargin, w.y + w.height + spacingTiny);
s.position.set(appMargin, a.y + a.height + spacingTiny);
d.position.set(appMargin, s.y + s.height + spacingTiny);

back2home.position.set(appMargin, height - (appMargin + back2home.height));
next2page2.position.set(width - (appMargin + next2page2.width), height - (appMargin + next2page2.height));
let movementButtons = [back2home, next2page2];
let movementObjects = [back2home, next2page2, headerText, controls, w, a, s, d];
initializeInteractivity(movementButtons);
initializeInContainer(movementObjects, movementTutorialScene);
back2home.on('mousedown',() => {
    movementTutorialScene.visible = false;
    mainMenuScene.visible = true;
});
next2page2.on('mousedown',() => {
    movementTutorialScene.visible = false;
    objectiveTutorialScene.visible = true;
});

/******************
 * How to Play Menu
 * Objectives Tutorial
 * Page 2
 *****************/
let objective = new PIXI.Text(string_objective, style_medium_text_accent),
    objectiveHeaderText = new PIXI.Text(string_how_to_play, style_large_text),
    objective_desc_line_1 = new PIXI.Text(string_objective_desc_line_1, style_small_text),
    objective_desc_line_2 = new PIXI.Text(string_objective_desc_line_2, style_small_text),
    objective_desc_line_3 = new PIXI.Text(string_objective_desc_line_3, style_small_text),
    objective_desc_line_4 = new PIXI.Text(string_objective_desc_line_4, style_small_text),
    objective_line_4_highlight = new PIXI.Text(string_objective_desc_line_4_highlight, style_small_text_accent);
let backToPage1 = new PIXI.Text(string_back, style_small_text_idle),
    nextToPage3 = new PIXI.Text(string_next, style_small_text_idle);

objectiveHeaderText.position = appNameText.position;
objective.position = controls.position;
objective_desc_line_1.position = w.position;
objective_desc_line_2.position = a.position;
objective_desc_line_3.position = s.position;
objective_desc_line_4.position.set(appMargin, objective_desc_line_3.y + spacingTiny + objective_desc_line_4.height);
objective_line_4_highlight.position.set(appMargin + objective_desc_line_4.width, objective_desc_line_4.y);

backToPage1.visible = true;
backToPage1.position.set(appMargin, height - (appMargin + backToPage1.height));
nextToPage3.position.set(width - (appMargin + nextToPage3.width), height - (appMargin + nextToPage3.height));

let objectiveButtons = [backToPage1, nextToPage3];
let objectiveObjects = [backToPage1, nextToPage3, objective, objective, objective_desc_line_1,
    objective_desc_line_2, objective_desc_line_3,
    objective_desc_line_4, objective_line_4_highlight, objectiveHeaderText];

initializeInteractivity(objectiveButtons);
initializeInContainer(objectiveObjects, objectiveTutorialScene);

backToPage1.on('mousedown', () => {
    objectiveTutorialScene.visible = false;
    movementTutorialScene.visible = true;
});

nextToPage3.on('mousedown', () => {
    objectiveTutorialScene.visible = false;
    slimeTutorialScene.visible = true;
});

/******************
 * How to Play Menu
 * Slime Tutorial
 * Page 3
 *****************/
let backToObjectiveTutorial = new PIXI.Text(string_back, style_small_text_idle),
    next2page4 = new PIXI.Text(string_next, style_small_text_idle);
let slime = new PIXI.Text(string_slime, style_medium_text_accent),
    slimeHeaderText = new PIXI.Text(string_how_to_play, style_large_text),
    slime_desc_line_1_word_1 = new PIXI.Text(string_the, style_small_text),
    slime_desc_line_1_highlight = new PIXI.Text(string_slime_slimes, style_small_text_accent),
    slime_desc_line_1_final_words = new PIXI.Text(string_slime_desc_line_1_final_words, style_small_text),
    slime_desc_line_2 = new PIXI.Text(string_slime_desc_line_2, style_small_text),
    slime_desc_line_3 = new PIXI.Text(string_slime_desc_line_3, style_small_text),
    slime_desc_line_4_highlight = new PIXI.Text(string_hearts, style_small_text_accent);


slimeHeaderText.position = appNameText.position;
slime.position = controls.position;
slime_desc_line_1_word_1.position = w.position;
slime_desc_line_1_highlight.position.set(50+ slime_desc_line_1_word_1.width + 10, slime_desc_line_1_word_1.y);
slime_desc_line_1_final_words.position.set(slime_desc_line_1_highlight.width + slime_desc_line_1_highlight.x + 10, slime_desc_line_1_highlight.y);
slime_desc_line_2.position = a.position;
slime_desc_line_3.position = s.position;
slime_desc_line_4_highlight.position = d.position;

backToObjectiveTutorial.position = back2home.position;
next2page4.position = next2page2.position;

let slimeButtons = [backToObjectiveTutorial, next2page4];
let slimeObjects = [backToObjectiveTutorial, next2page4,  slime,
    slimeHeaderText, slime_desc_line_1_word_1, slime_desc_line_1_highlight, slime_desc_line_1_final_words,
    slime_desc_line_2, slime_desc_line_3, slime_desc_line_4_highlight];
initializeInteractivity(slimeButtons);
initializeInContainer(slimeObjects, slimeTutorialScene);

backToObjectiveTutorial.on('mousedown', () => {
    objectiveTutorialScene.visible = true;
    slimeTutorialScene.visible = false;
});

//PAGE 4;
next2page4.on('mousedown', () => {
    slimeTutorialScene.visible = false;
    heartTutorialScene.visible = true;
});

/******************
 * How to Play Menu
 * Hearts tutorial
 * Page 4
 *****************/
let heartText = new PIXI.Text(string_heart, style_medium_text_accent),
    heartHeaderText = new PIXI.Text(string_how_to_play, style_large_text),
    heart_desc_line_1 = new PIXI.Text(string_heart_desc_line_1, style_small_text),
    heart_desc_line_2_highlight = new PIXI.Text(string_heart_desc_line_2_highlight, style_small_text_accent),
    heart_desc_line_2 = new PIXI.Text(string_heart_desc_line_2, style_small_text),
    heart_desc_line_2_highlight_2 = new PIXI.Text(string_heart_desc_line_2_highlight_2, style_small_text_accent),
    heart_desc_line_3 = new PIXI.Text(string_heart_desc_line_3, style_small_text),
    heart_desc_line_3_highlight = new PIXI.Text(string_heart_desc_line_3_highlight, style_small_text_accent),
    heart_desc_line_3_end = new PIXI.Text(string_heart_desc_line_3_final_words, style_small_text),
    heartOkButton = new PIXI.Text(string_finish, style_small_text_idle),
    heartCancelButton = new PIXI.Text(string_back, style_small_text_idle);

heartHeaderText.position = appNameText.position;
heartText.position = controls.position;

slime.position = controls.position;
heart_desc_line_1.position = w.position;
heart_desc_line_2_highlight.position = a.position;
heart_desc_line_2.position.set(heart_desc_line_2_highlight.x + heart_desc_line_2_highlight.width, a.y);
heart_desc_line_2_highlight_2.position.set(heart_desc_line_2.x + heart_desc_line_2.width, a.y);
heart_desc_line_3.position = s.position;
heart_desc_line_3_highlight.position.set(heart_desc_line_3.x + heart_desc_line_3.width, heart_desc_line_3.y);
heart_desc_line_3_end.position.set(heart_desc_line_3_highlight.x + heart_desc_line_3_highlight.width, heart_desc_line_3_highlight.y);

heartCancelButton.position.set(appMargin, height - (appMargin + backToPage1.height));
heartOkButton.position.set(width - (appMargin + heartCancelButton.width), height - (appMargin + heartCancelButton.height));

let heartButtons = [heartOkButton, heartCancelButton];
let heartObjects = [heartText, heart_desc_line_1, heart_desc_line_2_highlight,
    heart_desc_line_2, heart_desc_line_2_highlight_2,heartHeaderText,
    heart_desc_line_3, heart_desc_line_3_highlight,
    heart_desc_line_3_end,heartOkButton, heartCancelButton];
initializeInteractivity(heartButtons);
initializeInContainer(heartObjects, heartTutorialScene);

heartCancelButton.on('mousedown', () => {
    heartTutorialScene.visible = false;
    slimeTutorialScene.visible = true;
});

heartOkButton.on('mousedown', () => {
    heartTutorialScene.visible = false;
    mainMenuScene.visible = true;
});
