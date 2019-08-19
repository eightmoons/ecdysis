//scenes
let mainMenuScene = new Container();
let startMenuScene = new Container();
let settingsMenuScene = new Container();
let leaderboardsMenuScene = new Container();
let howtoplayMenuScene = new Container();

let scenes = [mainMenuScene, startMenuScene, startMenuScene, leaderboardsMenuScene, howtoplayMenuScene];


let appNameText, versionText, authorText, dateText, causeText, reasonText;
let startText, settingsText, creditsText, leaderboardsText, howtoplayText;
appNameText = new Text(string_app_name, style_large_text);
appNameText.position.set(50,60);
mainMenuScene.addChild(appNameText);

versionText = new Text(string_app_version, style_small_text);
versionText.position.set(50 + appNameText.width - versionText.width, 60 + appNameText.height);
mainMenuScene.addChild(versionText);

authorText = new Text(string_global_risk, style_tiny_text_accent);
authorText.position.set(50, 15);
mainMenuScene.addChild(authorText);

dateText = new Text(string_date, style_tiny_text_accent);
dateText.position.set(width - (50 + dateText.width), 15);
mainMenuScene.addChild(dateText);

causeText = new Text(string_cause, style_tiny_text);
causeText.position.set(50, height - 15 - 10);
mainMenuScene.addChild(causeText);

reasonText = new Text(string_reason, style_tiny_text_accent);
reasonText.position.set(50 + causeText.width, height - 15 - 10);
mainMenuScene.addChild(reasonText);

startText = new Text(string_start, style_small_text_idle);
startText.position.set(50, appNameText.y + 200);
mainMenuScene.addChild(startText);

settingsText = new Text(string_settings, style_small_text_idle);
settingsText.position.set(50, startText.y + startText.height + 24);
mainMenuScene.addChild(settingsText);

creditsText = new Text(string_credits, style_small_text_idle);
creditsText.position.set(50, settingsText.y + settingsText.height + 24);
mainMenuScene.addChild(creditsText);

leaderboardsText = new Text(string_leader_boards, style_small_text_idle);
leaderboardsText.position.set(50, creditsText.y + creditsText.height + 24);
mainMenuScene.addChild(leaderboardsText);

howtoplayText = new Text(string_how_to_play, style_small_text_idle);
howtoplayText.position.set(50, leaderboardsText.y + leaderboardsText.height + 24);
mainMenuScene.addChild(howtoplayText);

let mainButtons = [startText, settingsText, creditsText, leaderboardsText, howtoplayText];
mainButtons.forEach(button => {
    button.interactive = true;
    button
        .on('touchstart', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchendoutside', onButtonUp)
        .on('mouseover', onButtonOver)
        .on('mouseout', onButtonOut)
});

howtoplayText.on('mousedown', () => {
    mainMenuScene.visible = false;
    howtoplayMenuScene.visible = true;

    let headerText, controls, w, a, s, d;
    let back, next;

    headerText = new PIXI.Text(string_how_to_play, style_large_text);
    headerText.position = appNameText.position;
    howtoplayMenuScene.addChild(headerText);

    controls = new PIXI.Text(string_controls,style_medium_text);
    controls.position.set(50, headerText.y + headerText.height + 40);
    howtoplayMenuScene.addChild(controls);

    back = new PIXI.Text(string_back, style_small_text_idle);
    back.position.set(50, height - (60 + back.height));

    next = new PIXI.Text(string_next, style_small_text_idle);
    next.position.set(width - (50 + next.width), height - (60 + next.height));

    let buttons = [back, next];
    buttons.forEach(button => {
        button.interactive = true;
        button
            .on('touchstart', onButtonDown)
            .on('mouseup', onButtonUp)
            .on('mouseupoutside', onButtonUp)
            .on('touchendoutside', onButtonUp)
            .on('mouseover', onButtonOver)
            .on('mouseout', onButtonOut);
        howtoplayMenuScene.addChild(button);
    })
});

startText.on('mousedown',() => {
    mainMenuScene.visible = false;
    startMenuScene.visible = true;
    startMenuScene.addChild(appNameText);
    startMenuScene.addChild(versionText);
    let campaignText, survivalText, backText;
    campaignText = new PIXI.Text(string_campaign, style_small_text_idle);
    campaignText.position = startText.position;
    survivalText = new PIXI.Text(string_survival, style_small_text_idle);
    survivalText.position = settingsText.position;
    backText = new PIXI.Text(string_back, style_small_text_idle);
    backText.position.set(50,height - (50 + backText.height));
    let buttons = [campaignText, survivalText, backText];
    buttons.forEach(button => {
        button.interactive = true;
        button
            .on('touchstart', onButtonDown)
            .on('mouseup', onButtonUp)
            .on('mouseupoutside', onButtonUp)
            .on('touchendoutside', onButtonUp)
            .on('mouseover', onButtonOver)
            .on('mouseout', onButtonOut);
        startMenuScene.addChild(button);
    });

    backText.on('mousedown', () => {
        startMenuScene.visible = false;
        mainMenuScene.visible = true;

        mainMenuScene.addChild(appNameText);
        mainMenuScene.addChild(versionText);
    });
});


