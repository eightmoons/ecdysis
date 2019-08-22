//scenes
let mainMenuScene = new Container(),
    startMenuScene = new Container(),
    settingsMenuScene = new Container(),
    leaderBoardsMenuScene = new Container(),
    movementTutorialScene = new Container(),
    objectiveTutorialScene = new Container(),
    slimeTutorialScene = new Container(),
    obstaclesTutorialScene = new Container(),
    heartTutorialScene = new Container(),
    campaignScene = new Container(),
    gameScreenScene = new Container(),
    gameEndScene = new Container(),
    snakeShopScene = new Container()
;

let scenes = [
    mainMenuScene,
    startMenuScene,
    settingsMenuScene,
    leaderBoardsMenuScene,
    movementTutorialScene,
    objectiveTutorialScene,
    slimeTutorialScene,
    obstaclesTutorialScene,
    heartTutorialScene,
    campaignScene,
    gameScreenScene,
    gameEndScene,
    snakeShopScene
];

let sceneManager = {
    MainMenu: {
        Start: startMenuScene,
        Settings: settingsMenuScene,
        LeaderBoards: leaderBoardsMenuScene,
        Tutorial: [
            movementTutorialScene,
            objectiveTutorialScene,
            slimeTutorialScene,
            obstaclesTutorialScene,
            heartTutorialScene
        ]
    }
};

/******************
 * Main Menu
 *
 *****************/
let startText = new PIXI.Text(stringStart, styleSmallTextIdle),
    settingsText = new PIXI.Text(stringSettings, styleSmallTextIdle),
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
leaderBoardsText.position.set(appMargin, settingsText.y + settingsText.height + spacingSmall);
howToPlayText.position.set(appMargin, leaderBoardsText.y + leaderBoardsText.height + spacingSmall);

let innerContainer = new Container();
innerContainer.position.set(480,160);

let mainMenuButtons = [startText, settingsText, leaderBoardsText, howToPlayText];
let mainMenuObjects = [startText, settingsText, leaderBoardsText, howToPlayText,
    appNameText, versionText, authorText, dateText, causeText, reasonText];
initializeInteractivity(mainMenuButtons);
initializeInContainer(mainMenuObjects, mainMenuScene);

startText.on('mousedown',() => {
    changeScene(mainMenuScene, startMenuScene, polies);
});
settingsText.on('mousedown', () => {
    changeScene(mainMenuScene, settingsMenuScene, polies);
});
howToPlayText.on('mousedown', () => {
    changeScene(mainMenuScene, movementTutorialScene, polies);
});
leaderBoardsText.on('mousedown', () => {
    changeScene(mainMenuScene, leaderBoardsMenuScene, polies);
});
/******************
 * START MENU
 *
 *****************/
let campaignText = new PIXI.Text(stringCampaign, styleSmallTextIdle),
    survivalText = new PIXI.Text(stringSurvival, styleSmallTextDisabled),
    backText = new PIXI.Text(stringBack, styleSmallTextIdle);
let startHeaderText = new PIXI.Text("Game " + stringStart, styleLargeText),
    startSubtitleText = new PIXI.Text("Select a mode", styleSmallText);

startHeaderText.position.set(appMargin,appMargin + 30);
startSubtitleText.position.set(appMargin + startHeaderText.width - startSubtitleText.width - 8,
    appMargin + startHeaderText.height + startSubtitleText.height + 8);

campaignText.position = startText.position;
survivalText.position = settingsText.position;
backText.position.set(appMargin,height - (appMargin + backText.height));

let startButtons = [campaignText, backText];
let startObjects = [startHeaderText, startSubtitleText, campaignText, survivalText, backText];

initializeInteractivity(startButtons);
initializeInContainer(startObjects, startMenuScene);

backText.on('mousedown', () => {
    changeScene(startMenuScene, mainMenuScene, polies);
});
campaignText.on('mousedown', () => {
    changeScene(startMenuScene, campaignScene, polies);
    continueText.interactive = saveState.campaign.stage !== 1;
    continueText.style = saveState.campaign.stage !== 1 ? styleSmallTextIdle: styleSmallTextDisabled;
});
/******************
 * Campaign
 *
 *****************/
let campaignHeaderText = new PIXI.Text(stringCampaign, styleLargeText),
    newGameText = new PIXI.Text(stringNewGame, styleSmallTextIdle),
    continueText = new PIXI.Text(stringContinue, styleSmallTextIdle),
    campaignBack = new PIXI.Text(stringBack, styleSmallTextIdle);

campaignHeaderText.position = appNameText.position;
newGameText.position = startText.position;
continueText.position = survivalText.position;
campaignBack.position.set(appMargin, height - (appMargin + campaignText.height));

let campaignButtons = [newGameText, continueText, campaignBack];
let campaignObjects = [campaignHeaderText, newGameText, continueText, campaignBack];

initializeInteractivity(campaignButtons);
initializeInContainer(campaignObjects, campaignScene);

campaignBack.on('mousedown', () => {
    changeScene(campaignScene, startMenuScene, polies);
});

continueText.on('mousedown', () => {
    changeScene(campaignScene, gameScreenScene);
    state = onGame;
});

newGameText.on('mousedown', () => {
    let name = prompt("Please enter your name", saveState.playerName);
    if (name == null || name === "") {
    }
    else {
        saveState = {
            playerName: "",
            campaign: {
                life: 3,
                score: 0,
                coins: 0,
                evolve: 0,
                stage: 1,
                level: 0,
                upgrades: {
                    lethality: 1,
                    quantity: 1,
                    fireRate: 1,
                    movement: false
                }
            }
        };
        Object.assign(saveState, saveState);
        mainPlayer.vx = 0;
        mainPlayer.vy = 0;
        mainPlayer.position.set(gameStageArea.width / 2, gameStageArea.height / 2 + 88);
        heartCountText.text = "♥♥♥";
        coinCountText.text = saveState.campaign.coins + "g";
        stageCountText.text = "STAGE: " + saveState.campaign.stage;
        evoCountText.text = "EVO: " + saveState.campaign.evolve;
        saveState.playerName = name;
        playerNameText.text = saveState.playerName;
        gameStageArea.texture = playAreasAssets["playerArea1.png"];
        changeScene(campaignScene, gameScreenScene);
        state = onGame;
        continueText.text = "Continue (" + saveState.playerName + ")";
    }
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
    changeScene(settingsMenuScene, mainMenuScene, polies);
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
    changeScene(leaderBoardsMenuScene, mainMenuScene, polies);
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

headerText.position = appNameText.position;
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
    changeScene(movementTutorialScene, mainMenuScene, polies);
});
next2page2.on('mousedown',() => {
    changeScene(movementTutorialScene, objectiveTutorialScene, polies);
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
    changeScene(objectiveTutorialScene, movementTutorialScene, polies);
});

nextToPage3.on('mousedown', () => {
    changeScene(objectiveTutorialScene, slimeTutorialScene, polies);

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
    changeScene(slimeTutorialScene, objectiveTutorialScene, polies);
});

//PAGE 4;
next2page4.on('mousedown', () => {
    changeScene(slimeTutorialScene, obstaclesTutorialScene, polies);
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
    changeScene(obstaclesTutorialScene, slimeTutorialScene, polies);
});

obstacleOkButton.on('mousedown', () => {
    changeScene(obstaclesTutorialScene, heartTutorialScene, polies);
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
    changeScene(heartTutorialScene, obstaclesTutorialScene, polies);
});

heartOkButton.on('mousedown', () => {
    changeScene(heartTutorialScene, mainMenuScene, polies);
});

/******************
 * SHOP
 *
 *****************/

let shopHeaderText = new PIXI.Text(stringShop, styleLargeText),
    snakeUpgradesText = new PIXI.Text(stringSnakeUpgrade, styleMediumTextAccent),
    yourGoldText = new PIXI.Text(stringYourGold, styleSmallText),
    goldCountText = new PIXI.Text("0g", styleFirst),
    lethalityText = new PIXI.Text(stringLethality, styleSmallTextIdle),
    quantityText = new PIXI.Text(stringQuantity, styleSmallTextIdle),
    fireRateText = new PIXI.Text(stringFireRate, styleSmallTextIdle),
    movementText = new PIXI.Text(stringMovement, styleSmallTextIdle),
    lethalityCostText = new PIXI.Text("", styleSmallTextYellow),
    quantityCostText = new PIXI.Text("", styleSmallTextYellow),
    fireRateCostText = new PIXI.Text("", styleSmallTextYellow),
    movementCostText = new PIXI.Text("250g", styleSmallTextYellow),
    backToGameText = new PIXI.Text("Back to Game", styleSmallTextIdle)
;

shopHeaderText.position = appNameText.position;
snakeUpgradesText.position = heartHeaderText.position;
yourGoldText.position.set(width - (appMargin + yourGoldText.width), shopHeaderText.y);
goldCountText.position.set(width - (appMargin + goldCountText.width), shopHeaderText.y + shopHeaderText.height + 10);
lethalityText.position.set(110, 370);
quantityText.position.set(lethalityText.x + 35, lethalityText.y);
fireRateText.position.set(quantityText.x + 35, lethalityText.y);
movementText.position.set(fireRateText.x + 35, lethalityText.y);
lethalityCostText.position.set(lethalityText.x, lethalityText.y + lethalityText.height + 10);
quantityCostText.position.set(quantityText.x, quantityCostText.y + quantityCostText.height + 10);
fireRateCostText.position.set(fireRateText.x, fireRateCostText.y + fireRateCostText.height + 10);
movementCostText.position.set(movementText.x, movementCostText.y + movementCostText.height + 10);
backToGameText.position.set(appMargin, height - (appMargin + backToGameText.height));

let shopButtons = [lethalityText, quantityText, fireRateText, movementText, backToGameText];

let shopObjects = [shopHeaderText, snakeUpgradesText, yourGoldText,
    lethalityText, quantityText, fireRateText, movementText, lethalityCostText, quantityCostText,
fireRateCostText, movementCostText, backToGameText];

initializeInteractivity(shopButtons);
initializeInContainer(shopObjects, snakeShopScene);

lethalityText.on('mousedown', () => {

});

quantityText.on('mousedown', () => {

});

fireRateText.on('mousedown', () => {

});

movementText.on('mousedown', () => {

});

backToGameText.on('mousedown', () => {
    changeScene(snakeShopScene, gameScreenScene);
    state = onGame;
});

/******************
 * GAME START
 *
 *****************/
let heartCountText = new PIXI.Text("♥♥♥", styleSmallTextRed),
    coinCountText = new PIXI.Text("", styleFirst),
    stageCountText = new PIXI.Text("Stage: ", styleSmallText),
    evoCountText = new PIXI.Text("EVO: ", styleSmallText),
    playerNameText = new PIXI.Text("", styleSmallTextYellow),
    quitToMenuText = new PIXI.Text("Exit", styleSmallTextIdle);

heartCountText.position.set(appMargin, 16);
coinCountText.position.set(appMargin, heartCountText.y + 10 + coinCountText.height);
stageCountText.position.set(width - (appMargin + stageCountText.width), 16);
evoCountText.position.set(width - (appMargin + evoCountText.width), stageCountText.y + 10 + evoCountText.height);
// playerNameText.position.set(appMargin, coinCountText.y + coinCountText.height + 22);
playerNameText.position = coinCountText.position;
quitToMenuText.position.set(width - (appMargin + quitToMenuText.width), coinCountText.y + coinCountText.height + 20);

let gameScreenButton = [quitToMenuText];
let gameScreenObjects = [heartCountText, stageCountText, evoCountText, playerNameText, quitToMenuText];
initializeInteractivity(gameScreenButton);
initializeInContainer(gameScreenObjects, gameScreenScene);

quitToMenuText.on('mousedown',() => {
    state = onMenu;
    changeScene(gameScreenScene, mainMenuScene, polies);
});

/******************
 * GAME END
 *
 *****************/
let gameEndText = new PIXI.Text("_", styleLargeTextGreen),
    gameEndDesc = new PIXI.Text("_", styleSmallText),
    gameEndScoreText = new PIXI.Text("0", styleSmallText),
    toMainMenuText = new PIXI.Text("to Main Menu", styleSmallTextIdle),
    highScoreText = new PIXI.Text("", styleTinyTextAccent);

gameEndText.position.set(width/2 - (gameEndText.width/2), appMargin + 100);
gameEndDesc.position.set(width/2 - (gameEndDesc.width/2), gameEndText.y + gameEndText.height + 50);
gameEndScoreText.position.set(width - (appMargin + gameEndScoreText.width), height - (appMargin + gameEndScoreText.height));
highScoreText.position.set(width - (appMargin + highScoreText.width), height - (appMargin + highScoreText.height));
toMainMenuText.position = back2home.position;

let gameEndButtons = [toMainMenuText];
let gameEndObjects = [gameEndText, gameEndDesc, gameEndScoreText, toMainMenuText, highScoreText];

initializeInteractivity(gameEndButtons);
initializeInContainer(gameEndObjects, gameEndScene);

toMainMenuText.on('mousedown', () => {
    changeScene(gameEndScene, mainMenuScene, polies)
});


/******************
 * GAME END
 *
 *****************/