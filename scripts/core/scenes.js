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
let startText = new PIXI.Text(stringStart, styleSmallTextIdle),
    settingsText = new PIXI.Text(stringSettings, styleSmallTextIdle),
    creditsText = new PIXI.Text(stringCredits, styleSmallTextIdle),
    leaderBoardsText = new PIXI.Text(stringLeaderBoards, styleSmallTextIdle),
    howToPlayText = new PIXI.Text(stringHowToPlace, styleSmallTextIdle);
let appNameText = new PIXI.Text(stringAppName, styleLargeText),
    versionText = new PIXI.Text(stringAppVersion, styleSmallText),
    authorText = new PIXI.Text(stringGlobalRisk, styleTinyTextAccent),
    dateText = new PIXI.Text(stringAug2019, styleTinyTextAccent),
    causeText = new PIXI.Text(stringDevelopedFor, styleTinyText),
    reasonText = new PIXI.Text(stringGameJam2019, styleTinyTextAccent);

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
let campaignText = new PIXI.Text(stringCampaign, styleSmallTextIdle),
    survivalText = new PIXI.Text(stringSurvival, styleSmallTextIdle),
    backText = new PIXI.Text(stringBack, styleSmallTextIdle);
let startAppNameText = new PIXI.Text(stringAppName, styleLargeText),
    startVersionText = new PIXI.Text(stringAppVersion, styleSmallText);

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
let settingsHeader = new PIXI.Text(stringSettings, styleLargeText),
    soundText = new PIXI.Text(stringSound, styleSmallText),
    difficultyText = new PIXI.Text(stringDifficulty, styleSmallText),
    easyText = new PIXI.Text(stringEasy, styleSmallTextGreen),
    mediumText = new PIXI.Text(stringMedium, styleSmallTextIdle),
    hardText = new PIXI.Text(stringHard, styleSmallTextIdle),
    toggleText = new PIXI.Text(stringOn, styleSmallTextGreen),
    settingsBack = new PIXI.Text(stringBack, styleSmallTextIdle);

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
        toggleText.text = stringOff;
        toggleText.style = styleSmallTextRed;
        SOUND = false;
    }
    else {
        toggleText.text = stringOn;
        toggleText.style = styleSmallTextGreen;
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
        btn.style = btn === text? styleSmallTextGreen : styleSmallTextIdle;
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

let creditsHeader = new PIXI.Text(stringCredits, styleLargeText),
    creditsLine1 = new PIXI.Text("somedude @ opengameart.com", styleSmallTextIdle),
    creditsBack = new PIXI.Text(stringBack, styleSmallTextIdle);

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
let leaderBoardHeaderText = new PIXI.Text(stringLeaderBoards,styleLargeText),
    firstText = new PIXI.Text("1st  N0obSl4yer: 69", styleFirst),
    secondText = new PIXI.Text("2nd  XxPROxX: 42", styleSecond),
    thirdText = new PIXI.Text("3rd  Rami: 22", styleThird);
let leaderBoardsBack = new PIXI.Text(stringBack, styleSmallTextIdle);

leaderBoardHeaderText.position = appNameText.position;
firstText.position.set(appMargin, leaderBoardHeaderText.y + leaderBoardHeaderText.height + 100);
secondText.position.set(appMargin, firstText.y + firstText.height + spacingTiny);
thirdText.position.set(appMargin, secondText.y + secondText.height + spacingTiny);
leaderBoardsBack.position.set(appMargin, height - (appMargin + leaderBoardsBack.height));
let leaderBoardsButtons = [leaderBoardHeaderText, firstText, secondText, thirdText, leaderBoardsBack];
    leaderboardObjects = [leaderBoardsBack];

initializeInteractivity(leaderboardObjects);
initializeInContainer(leaderBoardsButtons, leaderBoardsMenuScene);

leaderBoardsBack.on('mousedown', () => {
   leaderBoardsMenuScene.visible = false;
   mainMenuScene.visible = true;
});
/******************
 * How to Play Menu
 * Controls Tutorial
 * Page 1
 *****************/
let headerText = new PIXI.Text(stringHowToPlace, styleLargeText),
    controls = new PIXI.Text(stringControls,styleMediumTextAccent),
    w = new PIXI.Text("W - Move Up", styleSmallText),
    a = new PIXI.Text("A - Move Left", styleSmallText),
    s = new PIXI.Text("S - Move Bottom", styleSmallText),
    d = new PIXI.Text("D - Move Right", styleSmallText);
let back2home = new PIXI.Text(stringBack, styleSmallTextIdle),
    next2page2 = new PIXI.Text(stringNext, styleSmallTextIdle);

headerText.position.set(appMargin, appMargin + 30);
controls.position.set(appMargin, headerText.y + headerText.height + 40);

w.position.set(appMargin, controls.y + controls.height + 50);
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
let objective = new PIXI.Text(stringObjective, styleMediumTextAccent),
    objectiveHeaderText = new PIXI.Text(stringHowToPlace, styleLargeText),
    objectiveDescription = new PIXI.Text(stringObjectiveHint, styleSmallTextParagraph);
let backToPage1 = new PIXI.Text(stringBack, styleSmallTextIdle),
    nextToPage3 = new PIXI.Text(stringNext, styleSmallTextIdle);

objectiveHeaderText.position = appNameText.position;
objective.position = controls.position;
objectiveDescription.position = w.position;

backToPage1.visible = true;
backToPage1.position.set(appMargin, height - (appMargin + backToPage1.height));
nextToPage3.position.set(width - (appMargin + nextToPage3.width), height - (appMargin + nextToPage3.height));

let objectiveButtons = [backToPage1, nextToPage3];
let objectiveObjects = [backToPage1, nextToPage3, objective, objective, objectiveDescription, objectiveHeaderText];

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
let backToObjectiveTutorial = new PIXI.Text(stringBack, styleSmallTextIdle),
    next2page4 = new PIXI.Text(stringNext, styleSmallTextIdle);
let slime = new PIXI.Text(stringSlime, styleMediumTextAccent),
    slimeHeaderText = new PIXI.Text(stringHowToPlace, styleLargeText),
    slimeDescription = new PIXI.Text(stringSlimeHint, styleSmallTextParagraph);


slimeHeaderText.position = appNameText.position;
slime.position = controls.position;
slimeDescription.position = w.position;

backToObjectiveTutorial.position = back2home.position;
next2page4.position = next2page2.position;

let slimeButtons = [backToObjectiveTutorial, next2page4];
let slimeObjects = [backToObjectiveTutorial, next2page4,  slime, slimeHeaderText, slimeDescription];
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
let obstacleOkButton = new PIXI.Text(stringNext, styleSmallTextIdle),
    obstacleCancelButton = new PIXI.Text(stringBack, styleSmallTextIdle);

let obstacleHeaderText = new PIXI.Text(stringHowToPlace, styleLargeText),
    obstacleText = new PIXI.Text(stringObstacles, styleMediumTextAccent),
    obstacleDescription = new PIXI.Text(stringObstaclesHint, styleSmallTextParagraph);

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
let heartText = new PIXI.Text(stringHeart, styleMediumTextAccent),
    heartHeaderText = new PIXI.Text(stringHowToPlace, styleLargeText),
    heartDescription = new PIXI.Text(stringHeartHint, styleSmallTextParagraph),

    heartOkButton = new PIXI.Text(stringFinish, styleSmallTextIdle),
    heartCancelButton = new PIXI.Text(stringBack, styleSmallTextIdle);

heartHeaderText.position = appNameText.position;
heartText.position = controls.position;

slime.position = controls.position;
heartDescription.position = w.position;

heartCancelButton.position.set(appMargin, height - (appMargin + heartCancelButton.height));
heartOkButton.position.set(width - (appMargin + heartOkButton.width), height - (appMargin + heartOkButton.height));

let heartButtons = [heartOkButton, heartCancelButton];
let heartObjects = [heartText, heartDescription,heartOkButton, heartCancelButton, heartHeaderText];
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
