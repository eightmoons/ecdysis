//scenes
let mainMenuScene = new Container();
let startMenuScene = new Container();
let settingsMenuScene = new Container();
let leaderboardsMenuScene = new Container();
let h2pMenuScene = new Container();
let h2pMenuScene2 = new Container();
let h2pMenuScene3 = new Container();
let h2pMenuScene4 = new Container();
let h2pMenuScene5 = new Container();

let scenes = [mainMenuScene, startMenuScene, startMenuScene, leaderboardsMenuScene, h2pMenuScene];


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
    h2pMenuScene.visible = true;

    let headerText, controls, w, a, s, d;
    let back, next;

    headerText = new PIXI.Text(string_how_to_play, style_large_text);
    headerText.position = appNameText.position;
    h2pMenuScene.addChild(headerText);

    controls = new PIXI.Text(string_controls,style_medium_text_accent);
    controls.position.set(50, headerText.y + headerText.height + 40);
    h2pMenuScene.addChild(controls);

    w = new PIXI.Text("W - Move Up", style_small_text);
    w.position.set(50, controls.y + controls.height + 100);
    h2pMenuScene.addChild(w);
    a = new PIXI.Text("A - Move Left", style_small_text);
    a.position.set(50, w.y + w.height + 20);
    h2pMenuScene.addChild(a);
    s = new PIXI.Text("S - Move Bottom", style_small_text);
    s.position.set(50, a.y + a.height + 20);
    h2pMenuScene.addChild(s);
    d = new PIXI.Text("D - Move Right", style_small_text);
    d.position.set(50, s.y + s.height + 20);
    h2pMenuScene.addChild(d);

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
        h2pMenuScene.addChild(button);
    });

    back.on('mousedown',() => {
        mainMenuScene.visible = true;
        h2pMenuScene.visible = false;
    });

    // PAGE 2
    next.on('mousedown',() => {
        h2pMenuScene.visible = false;
        h2pMenuScene2.visible = true;


        let back, next;
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
            h2pMenuScene2.addChild(button);
        });
    });
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


