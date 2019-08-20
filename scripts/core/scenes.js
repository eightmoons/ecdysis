//scenes
let mainMenuScene = new Container(),
    startMenuScene = new Container(),
    creditsMenuScene = new Container(),
    settingsMenuScene = new Container(),
    leaderBoardsMenuScene = new Container(),
    movementTutorialScene = new Container(),
    objectiveTutorialScene = new Container(),
    slimeTutorialScene = new Container(),
    obstaclesTutorialScene = new Container(),
    heartTutorialScene = new Container()
;

let scenes = [
    mainMenuScene,
    startMenuScene,
    creditsMenuScene,
    settingsMenuScene,
    leaderBoardsMenuScene,
    movementTutorialScene,
    objectiveTutorialScene,
    slimeTutorialScene,
    obstaclesTutorialScene,
    heartTutorialScene
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

startText.on('mousedown',() => {
    mainMenuScene.visible = false;
    startMenuScene.visible = true;
});
settingsText.on('mousedown', () => {
   mainMenuScene.visible = false;
   settingsMenuScene.visible = true;
});
creditsText.on('mousedown', () => {
    mainMenuScene.visible = false;
    creditsMenuScene.visible = true;
});
howToPlayText.on('mousedown', () => {
    mainMenuScene.visible = false;
    movementTutorialScene.visible = true;
});
leaderBoardsText.on('mousedown', () => {
    mainMenuScene.visible = false;
    leaderBoardsMenuScene.visible = true;
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
 * Settings
 *
 *****************/
let settingsHeader = new PIXI.Text(string_settings, style_large_text),
    soundText = new PIXI.Text(string_sound, style_small_text),
    difficultyText = new PIXI.Text(string_difficulty, style_small_text),
    easyText = new PIXI.Text(string_easy, style_small_text_green),
    mediumText = new PIXI.Text(string_medium, style_small_text_idle),
    hardText = new PIXI.Text(string_hard, style_small_text_idle),
    toggleText = new PIXI.Text(string_on, style_small_text_green),
    settingsBack = new PIXI.Text(string_back, style_small_text_idle);

settingsHeader.position = appNameText.position;

soundText.position.set(appMargin, settingsHeader.y + settingsHeader.height + 100);
toggleText.position.set(soundText.x + soundText.width + spacingSmall, soundText.y);
difficultyText.position.set(appMargin, soundText.y + soundText.height + spacingSmall);
easyText.position.set(difficultyText.x + difficultyText.width + spacingSmall, difficultyText.y);
mediumText.position.set(easyText.x + easyText.width + spacingTiny, difficultyText.y);
hardText.position.set(mediumText.x + mediumText.width + spacingTiny, difficultyText.y);
settingsBack.position.set(appMargin, backText.y);

let settingsButtons = [settingsBack];
let difficultyButtons = [easyText, mediumText, hardText];
let settingsObjects = [settingsHeader, soundText, toggleText, difficultyText,
    easyText, mediumText, hardText, settingsBack];

initializeInteractivity(settingsButtons);
initializeInContainer(settingsObjects, settingsMenuScene);

toggleText.interactive = true;
easyText.interactive = true;
mediumText.interactive = true;
hardText.interactive = true;
toggleText.on('mousedown', () => {
    if (SOUND) {
        toggleText.text = string_off;
        toggleText.style = style_small_text_red;
        SOUND = false;
    }
    else {
        toggleText.text = string_on;
        toggleText.style = style_small_text_green;
        SOUND = true;
    }
});
easyText.on('mousedown', () => {
    activeButton(1, difficultyButtons)
});
mediumText.on('mousedown', () => {
    activeButton(2, difficultyButtons)
});
hardText.on('mousedown', () => {
    activeButton(3, difficultyButtons)
});

function activeButton(mode, buttonGroup){
    let text;
    switch (mode) {
        case 1:
            text = easyText;
            break;
        case 2:
            text = mediumText;
            break;
        case 3:
            text = hardText;
            break;
        default:
            text = easyText;
            break;
    }

    buttonGroup.forEach(btn => {
        btn.style = btn === text? style_small_text_green : style_small_text_idle;
    });

    DIFFICULTY = mode;
}

settingsBack.on('mousedown', () => {
    settingsMenuScene.visible = false;
    mainMenuScene.visible = true;
});
/******************
 * Credits
 *
 *****************/

let creditsHeader = new PIXI.Text(string_credits, style_large_text),
    creditsLine1 = new PIXI.Text("somedude @ opengameart.com", style_small_text_idle),
    creditsBack = new PIXI.Text(string_back, style_small_text_idle);

creditsHeader.position.set(appMargin, appMargin + 30);
creditsLine1.position.set(appMargin, creditsHeader.x + creditsHeader.height + 100);
creditsBack.position.set(appMargin, backText.y);

let creditButtons = [creditsLine1, creditsBack];
let creditObjects = [creditsLine1, creditsBack, creditsHeader];

initializeInteractivity(creditButtons);
initializeInContainer(creditObjects, creditsMenuScene);

creditsBack.on('mousedown', () => {
    creditsMenuScene.visible = false;
    mainMenuScene.visible = true;
});



/******************
 * Leaderboards
 *
 *****************/
let leaderBoardHeaderText = new PIXI.Text(string_leader_boards,style_large_text),
    firstText = new PIXI.Text("1st  N0obSl4yer: 69", style_first),
    secondText = new PIXI.Text("2nd  XxPROxX: 42", style_second),
    thirdText = new PIXI.Text("3rd  Rami: 22", style_third);
let leaderBoardBack = new PIXI.Text(string_back, style_small_text_idle);

leaderBoardHeaderText.position = appNameText.position;
firstText.position.set(appMargin, leaderBoardHeaderText.y + leaderBoardHeaderText.height + 100);
secondText.position.set(appMargin, firstText.y + firstText.height + spacingTiny);
thirdText.position.set(appMargin, secondText.y + secondText.height + spacingTiny);
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
    objective_description = new PIXI.Text(string_objective_description, style_small_text_paragraph);
let backToPage1 = new PIXI.Text(string_back, style_small_text_idle),
    nextToPage3 = new PIXI.Text(string_next, style_small_text_idle);

objectiveHeaderText.position = appNameText.position;
objective.position = controls.position;
objective_description.position = w.position;

backToPage1.visible = true;
backToPage1.position.set(appMargin, height - (appMargin + backToPage1.height));
nextToPage3.position.set(width - (appMargin + nextToPage3.width), height - (appMargin + nextToPage3.height));

let objectiveButtons = [backToPage1, nextToPage3];
let objectiveObjects = [backToPage1, nextToPage3, objective, objective, objective_description, objectiveHeaderText];

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
    slime_description = new PIXI.Text(string_slime_desc, style_small_text_paragraph);


slimeHeaderText.position = appNameText.position;
slime.position = controls.position;
slime_description.position = w.position;

backToObjectiveTutorial.position = back2home.position;
next2page4.position = next2page2.position;

let slimeButtons = [backToObjectiveTutorial, next2page4];
let slimeObjects = [backToObjectiveTutorial, next2page4,  slime, slimeHeaderText, slime_description];
initializeInteractivity(slimeButtons);
initializeInContainer(slimeObjects, slimeTutorialScene);

backToObjectiveTutorial.on('mousedown', () => {
    objectiveTutorialScene.visible = true;
    slimeTutorialScene.visible = false;
});

//PAGE 4;
next2page4.on('mousedown', () => {
    slimeTutorialScene.visible = false;
    obstaclesTutorialScene.visible = true;
});
/******************
 * How to Play Menu
 * Obstacle tutorial
 * Page 4
 *****************/
let obstacleOkButton = new PIXI.Text(string_next, style_small_text_idle),
    obstacleCancelButton = new PIXI.Text(string_back, style_small_text_idle);

let obstacleHeaderText = new PIXI.Text(string_how_to_play, style_large_text),
    obstacleText = new PIXI.Text(string_obstacles, style_medium_text_accent),
    obstacleDescription = new PIXI.Text(string_obstacles_desc, style_small_text_paragraph);

obstacleHeaderText.position = appNameText.position;
obstacleText.position = controls.position;
obstacleDescription.position = w.position;

obstacleCancelButton.position = back2home.position;
obstacleOkButton.position = next2page2.position;

let obstacleButtons = [obstacleOkButton, obstacleCancelButton];
let obstacleObjects = [obstacleHeaderText, obstacleText, obstacleDescription, obstacleOkButton, obstacleCancelButton];
initializeInteractivity(obstacleButtons);
initializeInContainer(obstacleObjects, obstaclesTutorialScene);

obstacleCancelButton.on('mousedown', () => {
    obstaclesTutorialScene.visible = false;
    slimeTutorialScene.visible = true;
});

obstacleOkButton.on('mousedown', () => {
    obstaclesTutorialScene.visible = false;
    heartTutorialScene.visible = true;
});

/******************
 * How to Play Menu
 * Hearts tutorial
 * Page 5
 *****************/
let heartText = new PIXI.Text(string_heart, style_medium_text_accent),
    heartHeaderText = new PIXI.Text(string_how_to_play, style_large_text),
    heart_description = new PIXI.Text(string_heart_description, style_small_text_paragraph),

    heartOkButton = new PIXI.Text(string_finish, style_small_text_idle),
    heartCancelButton = new PIXI.Text(string_back, style_small_text_idle);

heartHeaderText.position = appNameText.position;
heartText.position = controls.position;

slime.position = controls.position;
heart_description.position = w.position;

heartCancelButton.position.set(appMargin, height - (appMargin + heartCancelButton.height));
heartOkButton.position.set(width - (appMargin + heartOkButton.width), height - (appMargin + heartOkButton.height));

let heartButtons = [heartOkButton, heartCancelButton];
let heartObjects = [heartText, heart_description,heartOkButton, heartCancelButton, heartHeaderText];
initializeInteractivity(heartButtons);
initializeInContainer(heartObjects, heartTutorialScene);

heartCancelButton.on('mousedown', () => {
    heartTutorialScene.visible = false;
    obstaclesTutorialScene.visible = true;
});

heartOkButton.on('mousedown', () => {
    heartTutorialScene.visible = false;
    mainMenuScene.visible = true;
});
