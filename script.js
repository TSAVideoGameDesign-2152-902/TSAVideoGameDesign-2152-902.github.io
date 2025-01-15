// @pjs preload must be used to preload the image

/* @pjs preload="bank.png"; */

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(800, 800);
        frameRate(60);
        smooth();

        // END BOILER PLATE
//let img;

setup = function() {
    blueBall.rightImages = [];
    blueBall.rightImages.push(loadImage('Player 1-1R.png'));
    blueBall.rightImages.push(loadImage('Player 1-2R.png'));
    blueBall.rightImages.push(loadImage('Player 1-3R.png'));
    blueBall.rightImages.push(loadImage('Player 1-4R.png'));
    
    blueBall.leftImages = [];
    blueBall.leftImages.push(loadImage('Player 1-1L.png'));
    blueBall.leftImages.push(loadImage('Player 1-2L.png'));
    blueBall.leftImages.push(loadImage('Player 1-3L.png'));
    blueBall.leftImages.push(loadImage('Player 1-4L.png'));

    redBall.rightImages = [];
    redBall.rightImages.push(loadImage('Player 2-1R.png'));
    redBall.rightImages.push(loadImage('Player 2-2R.png'));
    redBall.rightImages.push(loadImage('Player 2-3R.png'));
    redBall.rightImages.push(loadImage('Player 2-4R.png'));

    redBall.leftImages = [];
    redBall.leftImages.push(loadImage('Player 2-1L.png'));
    redBall.leftImages.push(loadImage('Player 2-2L.png'));
    redBall.leftImages.push(loadImage('Player 2-3L.png'));
    redBall.leftImages.push(loadImage('Player 2-4L.png'));
    
    yellowBall.rightImages = [];
    yellowBall.rightImages.push(loadImage('Player 3-1R.png'));
    yellowBall.rightImages.push(loadImage('Player 3-2R.png'));
    yellowBall.rightImages.push(loadImage('Player 3-3R.png'));
    yellowBall.rightImages.push(loadImage('Player 3-4R.png'));

    yellowBall.leftImages = [];
    yellowBall.leftImages.push(loadImage('Player 3-1L.png'));
    yellowBall.leftImages.push(loadImage('Player 3-2L.png'));
    yellowBall.leftImages.push(loadImage('Player 3-3L.png'));
    yellowBall.leftImages.push(loadImage('Player 3-4L.png'));

    greenBall.rightImages = [];
    greenBall.rightImages.push(loadImage('Player 4-1R.png'));
    greenBall.rightImages.push(loadImage('Player 4-2R.png'));
    greenBall.rightImages.push(loadImage('Player 4-3R.png'));
    greenBall.rightImages.push(loadImage('Player 4-4R.png'));

    greenBall.leftImages = [];
    greenBall.leftImages.push(loadImage('Player 4-1L.png'));
    greenBall.leftImages.push(loadImage('Player 4-2L.png'));
    greenBall.leftImages.push(loadImage('Player 4-3L.png'));
    greenBall.leftImages.push(loadImage('Player 4-4L.png'));
    
}
var mult = 2;
var win = 0;
var gameIsPaused = false;
var thingsWithPhysics = function(config) {
    this.x = config.x * mult;
    this.y = config.y * mult;
    this.vx = 0;
    this.vy = 0;
    this.drag = 0.06 * mult;
    this.ax = 0;
    this.ay = 0;
    this.gravity = 0.2 * mult;
    this.width = config.width || 20;
    this.height = config.height || 20;
    this.onPlatform = false;
};
var Ball = function(config) {
    thingsWithPhysics.call(this, config);
    this.acceleration = 0.15 * mult;
    this.onLadder = false;
    this.name = config.name;
    this.isFacingLeft = false;
    this.isHeld = false;
    this.isHolding = false;
    this.holdingCountdown = 0;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.currentImage = 0;
    this.rightImages = [];
    this.leftImages = [];
};
Ball.prototype = Object.create(thingsWithPhysics.prototype);

var box = function(config) {
    thingsWithPhysics.call(this, config);
    this.acceleration = 0.15 * mult;
};
box.prototype = Object.create(thingsWithPhysics.prototype);

var keys = [];
var Level = function(config) {
    this.platforms = config.platforms;
    this.ladders = config.ladders;
    this.moneys = config.moneys;
    this.boxes = config.boxes;
    this.levers = config.levers;
    this.boxCheckers = config.boxCheckers;
    this.blueX = config.blueX * mult || 1000;
    this.blueY = config.blueY * mult || 1000;
    this.redX = config.redX * mult || 1000;
    this.redY = config.redY * mult || 1000;
    this.yellowX = config.yellowX * mult || 1000;
    this.yellowY = config.yellowY * mult || 1000;
    this.greenX = config.greenX * mult || 1000;
    this.greenY = config.greenY * mult || 1000;
    this.endX = config.endX * mult || 10000;
    this.endY = config.endY * mult || 10000;
    this.endWidth = config.endWidth * mult || 50;
    this.endHeight = config.endHeight * mult || 50;
};
var lever = function(config) {
    this.leverX = config.leverX * mult;
    this.leverY = config.leverY * mult;
    this.gateX = config.gateX * mult;
    this.gateY = config.gateY * mult;
    this.gateWidth = config.gateWidth * mult;
    this.gateHeight = config.gateHeight * mult;
    this.isPressed = false;
    this.timeOut = config.timeOut || 0;
    this.expirationTime = 0;
    this.color = config.color;
}
var BoxChecker = function(config) {
    this.x = config.x * mult;
    this.y = config.y * mult;
    this.width = config.width * mult;
    this.height = config.height * mult;
    this.gateX = config.gateX * mult;
    this.gateY = config.gateY * mult;
    this.gateWidth = config.gateWidth * mult;
    this.gateHeight = config.gateHeight * mult;
    this.activated = false;
}
var Button = function (config) {
    this.buttonX = config.buttonX * mult;
    this.buttonY = config.buttonY * mult;
    this.buttonWidth = config.buttonWidth * mult;
    this.buttonHeight = config.buttonHeight * mult;
    this.color1 = config.color1;
    this.color2 = config.color2;
    this.color3 = config.color3;
    this.isPlayButton = config.isPlayButton || false;
    this.isMainMenuButton = config.isMainMenuButton || false;
    this.isControlButton = config.isControlButton || false;
    this.isLevelButton = config.isLevelButton || false;
    this.isBackButton = config.isBackButton || false;
    this.isPauseButton = config.isPauseButton || false;
    this.isResumeButton = config.isResumeButton || false;
    this.isRestartButton = config.isRestartButton || false;
    this.isMainMenuButton2 = config.isMainMenuButton2 || false;
    this.isFirstLevelButton = config.isFirstLevelButton || false;
    this.isSecondLevelButton = config.isSecondLevelButton || false;
    this.isThirdLevelButton = config.isThirdLevelButton || false;
};
var playButton = new Button({ buttonX: 127, buttonY: 93, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isPlayButton: true });

var mainMenuButton = new Button({ buttonX: 142, buttonY: 335, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isMainMenuButton: true});

var controlButton = new Button({ buttonX: 127, buttonY: 147, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isControlButton: true });

var levelButton = new Button({ buttonX: 127, buttonY: 199, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isLevelButton: true });

var backButton = new Button({ buttonX: 10, buttonY: 340, buttonWidth: 80, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isBackButton: true });

var pauseButton = new Button({ buttonX: 375, buttonY: 20, buttonWidth: 20, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isPauseButton: true });

var resumeButton = new Button({ buttonX: 60, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isResumeButton: true });

var restartButton = new Button({ buttonX: 160, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isRestartButton: true });

var mainMenuButton2 = new Button({ buttonX: 260, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isMainMenuButton2: true });

var firstLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isFirstLevelButton: true });

var secondLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isSecondLevelButton: true });

var thirdLevelButton = new Button({ buttonX: 5, buttonY: 355, buttonWidth: 90, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isThirdLevelButton: true });

var buttons = [playButton, mainMenuButton, controlButton, levelButton, backButton, pauseButton, resumeButton, restartButton, mainMenuButton2, firstLevelButton, secondLevelButton, thirdLevelButton];

//Platforms
var Platform = function (config) {
    this.x = config.x * mult;
    this.y = config.y * mult;
    this.width = config.width * mult;
    this.height = config.height * mult;
    this.moveLeft = false;
    this.moveUp = false;
    this.canKill = config.canKill || false;
    this.canMove = config.canMove || false;
    this.canBreak = config.canBreak || false;
    this.isBroken = false;
    };
    
Platform.prototype.draw = function () {
    if (this.canBreak === false) {
        if (this.canKill === false) {
            fill(255, 255, 255);
            rect(this.x, this.y, this.width, this.height);
        }
        else {
            fill(171, 0, 0);
            rect(this.x, this.y, this.width, this.height);
        }
    } else if (this.canBreak === true) {
        if (this.isBroken === false) {
            fill(100, 100, 100);
            rect(this.x, this.y, this.width, this.height);
        }
    }
};

var Ladder = function(config) {
    this.x = config.x;
    this.y = config.y;
};

var Money = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.radius = 10;
    this.drawn = true;
};

var Platform1 = new Platform({x: -1, y: 380, width: 401, height: 60});
var Platform2 = new Platform({x: 50, y: 360, width: 150, height: 20});
var Platform3 = new Platform({x: 200, y: 360, width: 150, height: 9});
var Platform4 = new Platform({x: -1, y: 285, width: 60, height: 10});
var Platform5 = new Platform({x: -1, y: 100, width: 60, height: 10});
var Platform6 = new Platform({x: 50, y: 100, width: 10, height: 120});
var Platform7 = new Platform({x: 100, y: 290, width: 70, height: 70});
var Platform8 = new Platform({x: 160, y: 230, width: 10, height: 60});
var Platform9 = new Platform({x: 280, y: 300, width: 10, height: 60});
var Platform10 = new Platform({x: 220, y: 300, width: 60, height: 10});
var Platform11 = new Platform({x: 220, y: 240, width: 10, height: 60});
var Platform12 = new Platform({x: 280, y: 150, width: 120, height: 10});
var Platform13 = new Platform({x: 300, y: 50, width: 10, height: 80});
var Platform14 = new Platform({x: 200, y: 240, width: 20, height: 10});
var Platform15 = new Platform({x: -1, y: 0, width: 402, height: 50});
var breakPlatform1 = new Platform({x: 340, y: 369, width: 10, height: 11, canBreak: true});
var breakPlatform2 = new Platform({x: 300, y: 140, width: 10, height: 10, canBreak: true});
var breakPlatform3 = new Platform({x: 300, y: 130, width: 10, height: 10, canBreak: true});

var Platform21 = new Platform({x: -1, y: 380, width: 401, height: 60});
var Platform22 = new Platform({ x: -1, y: 305, width: 160, height: 10});
var Platform23 = new Platform({ x: 190, y: 305, width: 210, height: 10});
var Platform24 = new Platform({ x: -1, y: 275, width: 111, height: 10});
var Platform25 = new Platform({ x: 300, y: 200, width: 70, height: 10});
var Platform26 = new Platform({ x: 310, y: 170, width: 100, height: 10});
var Platform27 = new Platform({ x: 310, y: 170, width: 10, height: 20});
var Platform28 = new Platform({ x: 100, y: 220, width: 50, height: 10});
var Platform29 = new Platform({ x: 200, y: 100, width: 200, height: 10});
var Platform210 = new Platform({ x: 240, y: -1, width: 10, height: 81});
var Platform211 = new Platform({ x: 0, y: 100, width: 50, height: 10});
var Platform212 = new Platform({ x: 300, y: 315, width: 10, height: 21});
var Platform213 = new Platform({ x: 250, y: 326, width: 50, height: 10});
var Platform214 = new Platform({x: -1, y: 0, width: 402, height: 50});
var breakPlatform21 = new Platform({x: 100, y: 295, width: 10, height: 10, canBreak: true});
var breakPlatform22 = new Platform({x: 100, y: 285, width: 10, height: 10, canBreak: true});
var breakPlatform23 = new Platform({x: 240, y: 90, width: 10, height: 10, canBreak: true});
var breakPlatform24 = new Platform({x: 240, y: 80, width: 10, height: 10, canBreak: true});
var killPlatform21 = new Platform({x: -1, y: 265, width: 111, height: 10, canKill: true});
var killPlatform22 = new Platform({x: -1, y: 265, width: 111, height: 10, canKill: true});

var Platform31 = new Platform({ x: -1, y: 380, width: 401, height: 10});
var Platform32 = new Platform({ x: -1, y: 305, width: 10, height: 10});
var Platform33 = new Platform({ x: 40, y: 305, width: 370, height: 10});
var Platform34 = new Platform({ x: 110, y: 70, width: 60, height: 10});
var Platform35 = new Platform({ x: 100, y: 0, width: 10, height: 225});
var Platform36 = new Platform({ x: 110, y: 50, width: 10, height: 20});
var Platform37 = new Platform({ x: 200, y: 70, width: 90, height: 10});
var Platform38 = new Platform({ x: 110, y: 140, width: 60, height: 10});
var Platform39 = new Platform({ x: 110, y: 215, width: 120, height: 10});
var Platform310 = new Platform({ x: 200, y: 140, width: 80, height: 10});
var Platform311 = new Platform({ x: 320, y: 140, width: 50, height: 10});
var Platform313 = new Platform({ x: 320, y: 215, width: 80, height: 10});
var Platform314 = new Platform({ x: 320, y: 0, width: 10, height: 140});
var Platform315 = new Platform({ x: 280, y: 80, width: 10, height: 145});
var Platform316 = new Platform({ x: -1, y: 215, width: 70, height: 10});
var Platform317 = new Platform({ x: 360, y: 70, width: 20, height: 10});
var Platform318 = new Platform({ x: 360, y: 150, width: 10, height: 55});
var Platform319 = new Platform({ x: 320, y: 225, width: 100, height: 69});
var Platform312 = new Platform({x: -1, y: 0, width: 402, height: 50});
var breakPlatform31 = new Platform({x: 150, y: 60, width: 10, height: 10, canBreak: true});
var breakPlatform32 = new Platform({x: 360, y: 205, width: 10, height: 10, canBreak: true});
var breakPlatform33 = new Platform({x: 0, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform34 = new Platform({x: 10, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform35 = new Platform({x: 20, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform36 = new Platform({x: 30, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform37 = new Platform({x: 40, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform38 = new Platform({x: 50, y: 185, width: 10, height: 10, canBreak: true});
var breakPlatform39 = new Platform({x: 20, y: 175, width: 10, height: 10, canBreak: true});
var breakPlatform310 = new Platform({x: 30, y: 175, width: 10, height: 10, canBreak: true});
var breakPlatform311 = new Platform({x: 40, y: 175, width: 10, height: 10, canBreak: true});
var breakPlatform312 = new Platform({x: 50, y: 175, width: 10, height: 10, canBreak: true});
var breakPlatform313 = new Platform({x: 0, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform314 = new Platform({x: 10, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform315 = new Platform({x: 20, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform316 = new Platform({x: 30, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform317 = new Platform({x: 40, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform318 = new Platform({x: 50, y: 165, width: 10, height: 10, canBreak: true});
var breakPlatform319 = new Platform({x: 0, y: 155, width: 10, height: 10, canBreak: true});
var breakPlatform320 = new Platform({x: 10, y: 155, width: 10, height: 10, canBreak: true});
var breakPlatform321 = new Platform({x: 20, y: 155, width: 10, height: 10, canBreak: true});
var breakPlatform322 = new Platform({x: 30, y: 155, width: 10, height: 10, canBreak: true});
var breakPlatform323 = new Platform({x: 40, y: 155, width: 10, height: 10, canBreak: true});
var breakPlatform324 = new Platform({x: 50, y: 155, width: 10, height: 10, canBreak: true});
var killPlatform31 = new Platform({ x: 120, y: 50, width: 10, height: 20, canKill: true});
var killPlatform32 = new Platform({ x: -1, y: 205, width: 61, height: 10, canKill: true});

var platforms0 = [];
var platforms1 = [Platform1, Platform2, Platform3, Platform4, Platform5, Platform6, Platform7, Platform8, Platform9, Platform10, Platform15, Platform11, Platform12, Platform13, Platform14, breakPlatform1, breakPlatform2, breakPlatform3];

var platforms2 = [Platform21, Platform22, Platform23, Platform24, Platform25, Platform26, Platform27, Platform28, Platform29, Platform210, Platform211, Platform212, Platform213, Platform214, breakPlatform21, breakPlatform22, breakPlatform23, breakPlatform24, killPlatform21, killPlatform22];

var platforms3 = [Platform31, Platform32, Platform33, Platform34, Platform35, Platform36, Platform37, Platform38, Platform39, Platform310, Platform311, Platform313, Platform314, Platform315, Platform316, Platform317, Platform318, Platform319, Platform312, breakPlatform31, breakPlatform32, breakPlatform33, breakPlatform34, breakPlatform35, breakPlatform36, breakPlatform37, breakPlatform38, breakPlatform39, breakPlatform310, breakPlatform311, breakPlatform312, breakPlatform313, breakPlatform314, breakPlatform315, breakPlatform316, breakPlatform317, breakPlatform318, breakPlatform319, breakPlatform320, breakPlatform321, breakPlatform322, breakPlatform323, breakPlatform324, killPlatform31, killPlatform32];

var ladder1 = new Ladder({x: 60, y: 295});
var ladder2 = new Ladder({x: 250, y: 235});
var ladder3 = new Ladder({x: 250, y: 157});

var ladder21 = new Ladder({x: 160, y: 315});

var ladder31 = new Ladder({x: 10, y: 315});
var ladder32 = new Ladder({x: 170, y: 80});
var ladder33 = new Ladder({x: 170, y: 150});
var ladder34 = new Ladder({x: 330, y: 80});
var ladder35 = new Ladder({x: 370, y: 150});
var ladder36 = new Ladder({x: 290, y: 150});
var ladder37 = new Ladder({x: 290, y: 80});
var ladder38 = new Ladder({x: 70, y: 240});
var ladder39 = new Ladder({x: 70, y: 170});
var ladder310 = new Ladder({x: 70, y: 100});
var ladder311 = new Ladder({x: 290, y: 240});
var ladder312 = new Ladder({x: 290, y: 220});

var ladders0 = [];
var ladders1 = [ladder1, ladder2, ladder3];
var ladders2 = [ladder21];
var ladders3 = [ladder31, ladder32, ladder33, ladder34, ladder35, ladder36, ladder37, ladder38, ladder39, ladder310, ladder311, ladder312];

var Money1 = new Money({x: 210, y: 375});
var Money2 = new Money({x: 20, y: 210});
var Money3 = new Money({x: 200, y: 200});

var Money21 = new Money({x: 290, y: 321});
var Money22 = new Money({x: 25, y: 80});
var Money23 = new Money({x: 385, y: 120});

var Money31 = new Money({x: 385, y: 100});
var Money32 = new Money({x: 10, y: 80});
var Money33 = new Money({x: 385, y: 300});

var moneys0 = [];
var moneys1 = [Money1, Money2, Money3];
var moneys2 = [Money21, Money22, Money23]
var moneys3 = [Money31, Money32, Money33]

var lever1 = new lever({leverX: 10, leverY: 283, gateX: 50, gateY: 0, gateWidth: 10, gateHeight: 100, color: "Blue", timeOut: 0});
var lever2 = new lever({leverX: 380, leverY: 148, gateX: 220, gateY: 300, gateWidth: 10, gateHeight: 60, color: "Red", timeOut: 5000});

var lever21 = new lever({leverX: 340, leverY: 98, gateX: 340, gateY: 310, gateWidth: 10, gateHeight: 80, color: "Blue"});
var lever22 = new lever({leverX: 310, leverY: 98, gateX: 300, gateY: 210, gateWidth: 10, gateHeight: 95, color: "Red"});
var lever23 = new lever({leverX: 280, leverY: 98, gateX: 140, gateY: -1, gateWidth: 10, gateHeight: 221, color: "Yellow"});
var lever24 = new lever({leverX: 10, leverY: 303, gateX: 80, gateY: 315, gateWidth: 10, gateHeight: 221, color: "Green", timeOut: 5000});

var lever31 = new lever({leverX: 130, leverY: 138, gateX: 60, gateY: 0, gateWidth: 10, gateHeight: 220, color: "Red"});
var lever32 = new lever({leverX: 230, leverY: 68, gateX: 360, gateY: 50, gateWidth: 10, gateHeight: 20, color: "Blue"});
var lever33 = new lever({leverX: 230, leverY: 138, gateX: 170, gateY: 70, gateWidth: 50, gateHeight: 10, color: "Yellow", timeOut: 2000});

var levers0 = [];
var levers1 = [lever1, lever2];
var levers2 = [lever21, lever22, lever23, lever24];
var levers3 = [lever31, lever32, lever33];

var box1 = new box({x: 340, y: 200, width: 40, height: 40});

var box31 = new box({x: 150, y: 50, width: 20, height: 20});
var box32 = new box({x: 370, y: 60, width: 20, height: 20});
var box33 = new box({x: 10, y: 175, width: 20, height: 20});

var boxes0 = [];
var boxes2 = [box1];
var boxes3 = [box31, box32, box33];

var boxChecker1 = new BoxChecker({x: 250, y: 370, width: 40, height: 10, gateX: 340, gateY: 310, gateWidth: 10, gateHeight: 70});

var boxCheckers = [boxChecker1];
var boxCheckers0 = [];

var homeScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var level1 = new Level({platforms: platforms1, ladders: ladders1, moneys: moneys1, boxes: boxes0, levers: levers1, boxCheckers: boxCheckers0, blueX: 370, blueY: 380, redX: 20, redY: 100, yellowX: 20, yellowY: 380, greenX: 340, greenY: 140, endX: 240, endY: 330, endWidth: 30, endHeight: 30});
var level2 = new Level({platforms: platforms2, ladders: ladders2, moneys: moneys2, boxes: boxes2, levers: levers2, boxCheckers: boxCheckers0, blueX: 370, blueY: 380, redX: 40, redY: 300, yellowX: 185, yellowY: 50, greenX: 360, greenY: 300, endX: 20, endY: 350, endWidth: 30, endHeight: 30});
var level3 = new Level({platforms: platforms3, ladders: ladders3, moneys: moneys3, boxes: boxes3, levers: levers3, boxCheckers: boxCheckers, blueX: 50, blueY: 380, redX: 70, redY: 380, yellowX: 90, yellowY: 380, greenX: 110, greenY: 380, endX: 360, endY: 350, endWidth: 30, endHeight: 30});
var endScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var controls = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var stages = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var levels = [homeScreen, level1, level2, level3, endScreen, controls, stages];
var currentLevel = 0;

var playerAspectRatio = 170/400;
var playerHeight = 40;
var playerWidth = playerHeight * playerAspectRatio;
var blueBall = new Ball({x: levels[currentLevel].blueX, y: levels[currentLevel].blueY, width: playerWidth*2, height: playerHeight, name: "Blue"});
var redBall = new Ball({x: levels[currentLevel].redX, y: levels[currentLevel].redY, width: playerWidth, height: playerHeight/2, name: "Red"});
var yellowBall = new Ball({x: levels[currentLevel].yellowX, y: levels[currentLevel].yellowY, width: playerWidth, height: playerHeight, name: "Yellow"});
var greenBall = new Ball({x: levels[currentLevel].greenX, y: levels[currentLevel].greenY, width: playerWidth, height: playerHeight, name: "Green"});

var players = [blueBall, redBall, yellowBall, greenBall];

Ladder.prototype.checkBall = function(ball) {
    if (ball.x + ball.width/2 > this.x*mult && ball.x < (this.x + 25)*mult && ball.y - ball.height > (this.y - ball.height - 10)*mult && ball.y < (this.y + 60)*mult) {
        return true;
    }
    else {
        return false;
    }
};

lever.prototype.checkBall = function(ball) {
    if (ball.name === "Yellow") {
        if (ball.x + ball.width > this.leverX && ball.x < this.leverX + 26 && ball.y > this.leverY - 40 && ball.y < this.leverY) {
            return true;
        } else {
            return false;
        }
    }
};

BoxChecker.prototype.checkBox = function(boxes) {
    var amountOfBoxes = 0;
    for (i = 0; i < boxes.length; i++) {
        if (boxes[i].x + boxes[i].width/2 > this.x && boxes[i].x + boxes[i].width/2 < this.x + this.width && boxes[i].y + boxes[i].width/2 > this.y && boxes[i].y + boxes[i].width/2 < this.y + this.height) {
            amountOfBoxes += 1;
            if (amountOfBoxes === 3) {
                this.activated = true;
            } else {
                this.activated = false;
            }
        }
    }
};

Level.applyChangeInLevels = function (players) {
    var amountOfPlayers = 0;
    for (i = 0; i < players.length; i++) {
        if (win === 3 && players[i].x + players[i].width/2 > levels[currentLevel].endX && players[i].x + players[i].width/2 < levels[currentLevel].endX + levels[currentLevel].endWidth && players[i].y + players[i].width/2 > levels[currentLevel].endY && players[i].y + players[i].width/2 < levels[currentLevel].endY + levels[currentLevel].endHeight) {
            amountOfPlayers += 1;
            if (amountOfPlayers === 4) {
                greenBall.isHolding = false;
                blueBall.isHeld = false;
                redBall.isHeld = false;
                yellowBall.isHeld = false;
                currentLevel++;
                blueBall.x = levels[currentLevel].blueX;
                blueBall.y = levels[currentLevel].blueY;
                redBall.x = levels[currentLevel].redX;
                redBall.y = levels[currentLevel].redY;
                yellowBall.x = levels[currentLevel].yellowX * mult;
                yellowBall.y = levels[currentLevel].yellowY * mult;
                greenBall.x = levels[currentLevel].greenX;
                greenBall.y = levels[currentLevel].greenY;
                
                players[i].vx = 0;
                players[i].vy = 0;

                amountOfPlayers = 0;
                win = 0;
            }
        }
    }
};

Level.drawTextAndEnd = function () {
    fill(128, 96, 74);
    rect(levels[currentLevel].endX, levels[currentLevel].endY, levels[currentLevel].endWidth, levels[currentLevel].endHeight);

    if (currentLevel === 0) {
        textSize(32 * mult);
        fill(0, 0, 0);
        text("The Heist", 122 * mult, 34 * mult, 400 * mult, 100 * mult);
        textSize(12 * mult);
        text("Made by 2152-902", 131 * mult, 345 * mult, 339 * mult, 100 * mult);
    }
    if (currentLevel === 1) {
        fill(0, 0, 0);
        textSize(6 * mult)
        text("Hmmm...Looks like only one of the players can press these buttons.", 8 * mult, 250 * mult, 114 * mult, 100 * mult);
        text("Breakable blocks such as these can be broken by only one of the players.", 200 * mult, 110 * mult, 100 * mult, 100 * mult);
        text("Make sure to collect these coins. You can't finish the level without them!", 160 * mult, 210 * mult, 100 * mult, 100 * mult);
        text("Looks like you can't jump. If only there was someone who could pick you up...", 62 * mult, 60 * mult, 100 * mult, 100 * mult);
    }
    if (currentLevel === 2) {
        fill(0, 0, 0);
        textSize(6 * mult);
        text("Boxes like these can be moved by anyone.", 300 * mult, 150 * mult, 100 * mult, 100 * mult);
    }
    if (currentLevel === 3) {
        fill(0, 0, 0);
        textSize(6 * mult);
        text("This gate will open when three boxes are put into here.", 250 * mult, 350 * mult, 87 * mult, 100 * mult);
    }
    if (currentLevel === 4) {
        fill(0, 0, 0);
        textSize(40*mult);
        text("The End...For Now", 29 * mult, 125 * mult, 438 * mult, 100 * mult);
        textSize(20*mult);
        text("More Levels Coming Soon!",76*mult,293*mult,271*mult,100*mult);
        textSize(12*mult);
    }
    if (currentLevel === 5) {
        fill(0, 0, 0);
        textSize(40*mult);
        text("Controls", 255, 40, 300, 100);
        textSize(10 * mult);
        line(0, 400, 800, 400);
        line(400, 0, 400, 800);
        text("Player 1: Use Arrow Keys to move around, and the down arrow to attack enemies.", 8, 100, 400, 100);
        text("Player 2: Use WASD Keys to move around, and the S key to destroy breakable walls.", 400, 100, 400, 100);
        text("Player 3: Use TFGH Keys to move around, and the G key to change sizes.", 8, 400, 400, 100);
        text("Player 4: Use IJKL Keys to move around, and you can pick up other players.", 400, 400, 400, 100);
        
        if (currentLevel === 6) {
            text("Levels", 100, 100, 100, 100);
        }
    }
};

Button.prototype.draw = function () {
    if (this.isPlayButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            textSize(32 * mult);
            text("Play", 162 * mult, 101 * mult, 100 * mult, 100 * mult);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isBackButton === true) {
        if (currentLevel > 4) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            textSize(32 * mult);
            text("Back", 10 * mult, 350 * mult, 100 * mult, 100 * mult);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }

    if (this.isPauseButton === true && gameIsPaused === false) {
        if (currentLevel > 0 && currentLevel < 4) {
            //Drawing text at top
            textSize(16 * mult);
            fill(0, 0, 0);
            text(win + "/3", 400, 60, 100, 100);
            fill(255, 255, 0);
            ellipse(375, 70, 40, 40);
            fill(0, 0, 0);
            text("$", 365, 60, 100, 100);
            //Drawing actual button
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(255, 255, 255);
            rect(755, 45, 12, 30);
            rect(773, 45, 12, 30);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }

    if (this.isMainMenuButton === true) {
        if (currentLevel === 4) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            textSize(32*mult);
            fill(0, 0, 0);
            text("Restart",149*mult,344*mult,271*mult,100*mult);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isControlButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("Controls", 133 * mult, 156 * mult, 111 * mult, 100 * mult);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    
    if (this.isLevelButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("Levels", 149 * mult, 207 * mult, 111 * mult, 100 * mult);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
    if (gameIsPaused === true) {
        if (this.isResumeButton === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("Resume", 140, 450, 800, 100);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
        if (this.isMainMenuButton2 === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("Main Menu", 520, 450, 800, 100);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
        if (this.isRestartButton === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("Restart", 350, 450, 800, 100);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }

    if (this.firstLevelButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
    }
};

Button.prototype.applyMouse = function (money) {
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
        if (this.isPlayButton === true) {
            if (currentLevel === 0) {
                currentLevel = 1;
                blueBall.x = levels[currentLevel].blueX;
                blueBall.y = levels[currentLevel].blueY;
                redBall.x = levels[currentLevel].redX;
                redBall.y = levels[currentLevel].redY;
                yellowBall.x = levels[currentLevel].yellowX;
                yellowBall.y = levels[currentLevel].yellowY;
                greenBall.x = levels[currentLevel].greenX;
                greenBall.y = levels[currentLevel].greenY;

                win = 0;
                //money.drawn = true;
            }
        }

        if (this.isMainMenuButton === true) {
            currentLevel = 0;
        }
        
        if (this.isControlButton === true) {
            if (currentLevel === 0) {
                currentLevel = 5;
            }
        }
        
        if (this.isLevelButton === true) {
            if (currentLevel === 0) {
                currentLevel = 6;
            }
        }

        if (this.isPauseButton === true) {
            if (currentLevel > 0) {
                gameIsPaused = true;
            }
        }

        if (this.isResumeButton === true) {
            if (currentLevel > 0 && gameIsPaused === true) {
                gameIsPaused = false;
            }
        }

        if (this.isMainMenuButton2 === true) {
            if (currentLevel > 0 && gameIsPaused === true) {
                gameIsPaused = false;
                currentLevel = 0;
            }
        }

        if (this.isBackButton === true) {
            if (currentLevel > 4) {
                currentLevel = 0;
            }
        }
    }

};
Level.prototype.applyPause = function() {
    fill(100, 100, 100);
    rect(100, 300, 600, 200);
    fill(234, 255, 0);
    textSize(16 * mult);
    text("Game is Paused", 260, 320, 400, 100);
};
Platform.prototype.applyMovement = function () {
    if (this.canMove === true) {
        if (this.moveLeft === true) {
            this.x--;
            if (blueBall.y > this.y - blueBall.height && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                blueBall.x--;
            }
        }
        else {
            this.x++;
            if (blueBall.y > this.y - blueBall.height && blueBall.y < this.y + 1 && blueBall.x > this.x && blueBall.x < this.x + this.width) {
                blueBall.x++;
            }
        }
        if (this.x + this.width > 400 * mult) {
            this.moveLeft = true;
        }
        if (this.x < 0) {
            this.moveLeft = false;
        }
    }

};

thingsWithPhysics.prototype.applyIntersect = function (platform) {
    if (platform.isBroken === false) {
        if (platform.canKill === false && this.y > platform.y - this.height && this.y < platform.y + 1 && this.x + this.width/2 > platform.x && this.x + this.width/2 < platform.x + platform.width) {  
            this.y = platform.y - this.height;
            this.vy = 0;
            this.onPlatform = true;
        }

        if (platform.canKill === true && this.y > platform.y - this.height && this.y < platform.y + 1 && this.x + this.width/2 > platform.x && this.x + this.width/2 < platform.x + platform.width) {
            if (this.name === "Blue") {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Red") {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Yellow") {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Green") {
                this.isHolding = false;
                blueBall.isHeld = false;
                redBall.isHeld = false;
                yellowBall.isHeld = false;
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
                this.vx = 0;
                this.vy = 0;
            }
        }
       
        if (platform.canKill === false && this.y + this.height/2 > platform.y && this.y + this.height/2 < platform.y + platform.height && this.x + this.width > platform.x && this.x < platform.x + 1) {
            this.x = platform.x - this.width;
            this.vx = 0;
        }
        
        if (platform.canKill === true && this.y + this.height/2 > platform.y && this.y + this.height/2 < platform.y + platform.height && this.x + this.width > platform.x && this.x < platform.x + 1) {
            if (this.name === "Blue") {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Red") {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Yellow") {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Green") {
                this.isHolding = false;
                blueBall.isHeld = false;
                redBall.isHeld = false;
                yellowBall.isHeld = false;
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
                this.vx = 0;
                this.vy = 0;
            }

        }
        
        if (platform.canKill === false && this.y + this.height/2 > platform.y && this.y + this.height/2 < platform.y + platform.height && this.x < platform.x + platform.width && this.x > platform.x - 1) {
            this.x = platform.x + platform.width;
            this.vx = 0;
        }
        
        if (platform.canKill === true && this.y + this.height/2 > platform.y && this.y + this.height/2 < platform.y + platform.height && this.x < platform.x + platform.width && this.x > platform.x - 1) {
            if (this.name === "Blue") {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Red") {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Yellow") {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Green") {
                this.isHolding = false;
                blueBall.isHeld = false;
                redBall.isHeld = false;
                yellowBall.isHeld = false;
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
                this.vx = 0;
                this.vy = 0;
            }
        }
        
        if (platform.canKill === false && this.x + this.width/2 > platform.x && this.x + this.width/2 < platform.x + platform.width && this.y < platform.y + platform.height && this.y > platform.y) {
            this.y = platform.y + platform.height;
            this.vy = 0;
        }
        
        if (platform.canKill === true && this.x + this.width/2 > platform.x && this.x + this.width/2 < platform.x + platform.width && this.y < platform.y + platform.height && this.y > platform.y) {
            if (this.name === "Blue") {
                this.x = levels[currentLevel].blueX;
                this.y = levels[currentLevel].blueY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Red") {
                this.x = levels[currentLevel].redX;
                this.y = levels[currentLevel].redY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Yellow") {
                this.x = levels[currentLevel].yellowX;
                this.y = levels[currentLevel].yellowY;
                this.vx = 0;
                this.vy = 0;
            }
            else if (this.name === "Green") {
                this.isHolding = false;
                blueBall.isHeld = false;
                redBall.isHeld = false;
                yellowBall.isHeld = false;
                this.x = levels[currentLevel].greenX;
                this.y = levels[currentLevel].greenY;
                this.vx = 0;
                this.vy = 0;
            }
        }
    }
};
Ball.prototype.applyIntersect2 = function(money) {
    if (money.drawn === true && this.y + this.height > money.y*mult - money.radius && this.y < money.y*mult + money.radius && this.x + this.width > money.x*mult - money.radius && this.x < money.x*mult + money.radius) {
        win ++;
        money.drawn = false;
    }
};
thingsWithPhysics.prototype.applyIntersect3 = function(lever) {
    if (this.y > lever.gateY - this.height && this.y < lever.gateY + 1 && this.x + this.width/2 > lever.gateX && this.x + this.width/2 < lever.gateX + lever.gateWidth) {
        this.y = lever.gateY - this.height;
        this.vy = 0;
    }
    
    if (this.y + this.height/2 > lever.gateY && this.y + this.height/2 < lever.gateY + lever.gateHeight && this.x + this.width > lever.gateX && this.x < lever.gateX + 1) {
        this.x = lever.gateX - this.width;
        this.vx = 0;
    }
    
    if (this.y + this.height/2 > lever.gateY && this.y + this.height/2 < lever.gateY + lever.gateHeight && this.x < lever.gateX + lever.gateWidth && this.x > lever.gateX - 1) {
        this.x = lever.gateX + lever.gateWidth;
        this.vx = 0;
    }
    
    if (this.x + this.width/2 > lever.gateX && this.x + this.width/2 < lever.gateX + lever.gateWidth && this.y < lever.gateY + lever.gateHeight && this.y > lever.gateY) {
        this.y = lever.gateY + lever.gateHeight;
        this.vy = 0;
    }
};
Ball.prototype.applyIntersect4 = function(box) {
    if (this.y > box.y - this.height && this.y < box.y + 1 && this.x + this.width/2 > box.x && this.x + this.width/2 < box.x + box.width) {
        this.y = box.y - this.height;
        this.vy = 0;
    }
    else if (this.vx > 0 && this.y + this.height/2 > box.y && this.y + this.height/2 < box.y + box.height && this.x + this.width > box.x && this.x < box.x + 1) {
        box.ax += box.acceleration;
        this.x = box.x - this.width;
        this.vx = box.vx;
    }
    else if (this.vx < 0 && this.y + this.height/2 > box.y && this.y + this.height/2 < box.y + box.height && this.x < box.x + box.width && this.x > box.x - 1) {
        box.ax += -box.acceleration;
        this.x = box.x + box.width;
        this.vx = box.vx;
    }
    else if (this.x + this.width/2 > box.x && this.x + this.width/2 < box.x + box.width && this.y < box.y + box.height && this.y > box.y) {
        this.y = box.y + box.height + this.height;
        this.vy = 0;
    }
};
Ball.prototype.applyHold = function(otherBall) {
        if (keys.includes(DOWN) && this.y + this.height > otherBall.y && this.y + this.height < otherBall.y + otherBall.height && this.x + this.width > otherBall.x && this.x < otherBall.x + otherBall.width) {
            otherBall.isHeld = true;
            this.isHolding = true;
        } 
        
    if (otherBall.isHeld === true) {
        otherBall.x = this.x;
        otherBall.y = this.y - otherBall.width;
        if (keys.includes(UP)) {
            otherBall.isHeld = false;
            otherBall.vx += this.vx * 2;
            otherBall.vy -= 8 * mult;
            this.isHolding = false;
            this.holdingCountdown = 50;
        }
    }
    if (this.holdingCountdown > 0) {
        this.holdingCountdown -= 1;
    }
};
//Movement
Ball.prototype.applyUserInput = function (platforms, boxes, players) {
    if (this.name === "Blue") {
        if (keys.includes(68)) {
            this.isFacingLeft = false;
            this.ax = this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.rightImages.length*10);
        }
        else if (keys.includes(65)) {
            this.isFacingLeft = true;
            this.ax = -this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.leftImages.length*10);
        }
        else if (this.isMovingRight === false) {
            if (this.isMovingLeft === false) {
                this.ax = 0;
            }
        }

        var jump = false;
        if (keys.includes(87) && this.onPlatform === true) {
            jump = true;
        }
        
        for (var i = 0; i < platforms.length; i++) {
            if (keys.includes(83) && platforms[i].canBreak === true && this.x + this.width > platforms[i].x - 10 && this.x + this.width <= platforms[i].x && this.y + this.height > platforms[i].y && this.y < platforms[i].y + platforms[i].height) {
                platforms[i].isBroken = true;
            } else if (keys.includes(83) && platforms[i].canBreak === true && this.x >= platforms[i].x + platforms[i].width && this.x < platforms[i].x + platforms[i].width + 10 && this.y + this.height > platforms[i].y && this.y < platforms[i].y + platforms[i].height) {
                platforms[i].isBroken = true;
            }
        }

        for (var i = 0; i < boxes.length; i++) {
            if (keys.includes(87) && this.y === boxes[i].y - this.height && this.x + this.width/2 > boxes[i].x && this.x + this.width/2 < boxes[i].x + boxes[i].width) {
                jump = true;
            }
        }

        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(87)) {
                this.vy = -2;
            }
            if (keys.includes(83)) {
                this.vy = 2;
            }
        }
   }
    
    if (this.name === "Red") {
        if (keys.includes(72)) {
            this.isFacingLeft = false;
            this.ax = this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.rightImages.length*10);
        }
        else if (keys.includes(70)) {
            this.isFacingLeft = true;
            this.ax = -this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.leftImages.length*10);
        }
        else if (this.isMovingRight === false) {
            if (this.isMovingLeft === false) {
                this.ax = 0;
            }
        }
    
        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(84)) {
                this.vy = -2;
            }
            if (keys.includes(71)) {
                this.vy = 2;
            }
        }
    }
    
    if (this.name === "Yellow") {
        if (keys.includes(76)) {
            this.isFacingLeft = false;
            this.ax = this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.leftImages.length*10);
        }
        else if (keys.includes(74)) {
            this.isFacingLeft = true;
            this.ax = -this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.rightImages.length*10);
        }
        else if (this.isMovingRight === false) {
            if (this.isMovingLeft === false) {
                this.ax = 0;
            }
        }
        
        if (keys.includes(73) && this.onPlatform === true) {
            jump = true;
        }
        
        for (var i = 0; i < boxes.length; i++) {
            if (keys.includes(73) && this.y === boxes[i].y - this.height && this.x + this.width/2 > boxes[i].x && this.x + this.width/2 < boxes[i].x + boxes[i].width) {
                jump = true;
            }
        }

        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(73)) {
                this.vy = -2;
            }
            if (keys.includes(75)) {
                this.vy = 2;
            }
        }
    }
    
    if (this.name === "Green") {
        if (keys.includes(RIGHT)) {
            this.isFacingLeft = false;
            this.ax = this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.leftImages.length*10);
        }
        else if (keys.includes(LEFT)) {
            this.isFacingLeft = true;
            this.ax = -this.acceleration;
            this.currentImage = (this.currentImage + 1) % (this.rightImages.length*10);
        }
        else if (this.isMovingRight === false) {
            if (this.isMovingLeft === false) {
                this.ax = 0;
            }
        }
        if (keys.includes(UP) && this.onPlatform === true) {
            if (this.isHolding === false && this.holdingCountdown === 0) {
                jump = true;
            }
        }
        
        for (var i = 0; i < boxes.length; i++) {
            if (keys.includes(UP) && this.y === boxes[i].y - this.height && this.x + this.width/2 > boxes[i].x && this.x + this.width/2 < boxes[i].x + boxes[i].width) {
                jump = true;
            }
        }

        if (this.onLadder === true) {
            this.vy = 0;
            if (keys.includes(UP)) {
                this.vy = -2;
            }
            if (keys.includes(DOWN)) {
                this.vy = 2;
            }
        }

        for (var b = 0; b < players.length - 1; b++) {
            this.applyHold(players[b]);
        }
    }

    if (jump === true) {
        this.ay = -6 * mult;
    }
    else {
        this.ay = 0;
    }
};

thingsWithPhysics.prototype.applyBorders = function () {
    if (this.x < 0) {
        this.x = 0;
        this.vx = 0;
    }
    if (this.x > 400 * mult - this.width) {
        this.x = 400 * mult - this.width;
        this.vx = 0;
    }
    if (this.y > 400 * mult) {
        if (this.name === "Blue") {
            this.x = levels[currentLevel].blueX;
            this.y = levels[currentLevel].blueY;
        }
        else if (this.name === "Red") {
            this.x = levels[currentLevel].redX;
            this.y = levels[currentLevel].redY;
        }
        else if (this.name === "Yellow") {
            this.x = levels[currentLevel].yellowX;
            this.y = levels[currentLevel].yellowY;
        }
        else if (this.name === "Green") {
            this.x = levels[currentLevel].greenX;
            this.y = levels[currentLevel].greenY;
        }
        this.vx = 0;
        this.vy = 0;
    }
};
//Applying Velocity and Drag
thingsWithPhysics.prototype.applyGravity = function () {
    if (this.onPlatform) {
        return;
    }
    this.vy += this.gravity;
};
thingsWithPhysics.prototype.applyVelocity = function () {
    if (this.vx > 6) {
        this.vx = 6;
        this.x += this.vx;
    }
    else if (this.vx < 6) {
        this.x += this.vx;
    }

    if (this.vy > 6) {
        this.vy = 6;
        this.y += this.vy;
    }
    else if (this.vy < 6) {
        this.y += this.vy;
    }
};
thingsWithPhysics.prototype.applyAcceleration = function () {
    this.vx += this.ax;
    this.vy += this.ay;
};
thingsWithPhysics.prototype.applyDrag = function () {
    if (this.vx > 0) {
        if (this.vx < this.drag) {
            this.vx = 0;
        } else {
            this.vx -= this.drag;
        }
    }
    if (this.vx < 0) {
        if (this.vx > this.drag) {
            this.vx = 0;
        } else {
            this.vx += this.drag;
        }
    }
    if (this.vy > 0) {
        if (this.vy < this.drag) {
            this.vy = 0;
        } else {
            this.vy -= this.drag;
        }
    }
    if (this.vy < 0) {
        if (this.vy > this.drag) {
            this.vy = 0;
        } else {
            this.vy += this.drag;
        }
    }
};
Ladder.prototype.draw = function() {
    stroke(128, 96, 74);
    strokeWeight(5);
    line(this.x*mult, (this.y - 11)*mult, this.x*mult, (this.y + 65)*mult);
    line((this.x + 30)*mult, (this.y - 11)*mult, (this.x + 30)*mult, (this.y + 65)*mult);
    line(this.x*mult, (this.y + 60)*mult, (this.x + 30)*mult, (this.y + 60)*mult);
    line(this.x*mult, (this.y + 50)*mult, (this.x + 30)*mult, (this.y + 50)*mult);
    line(this.x*mult, (this.y + 40)*mult, (this.x + 30)*mult, (this.y + 40)*mult);
    line(this.x*mult, (this.y + 30)*mult, (this.x + 30)*mult, (this.y + 30)*mult);
    line(this.x*mult, (this.y + 20)*mult, (this.x + 30)*mult, (this.y + 20)*mult);
    line(this.x*mult, (this.y + 10)*mult, (this.x + 30)*mult, (this.y + 10)*mult);
    line(this.x*mult, this.y*mult, (this.x + 30)*mult, this.y*mult);
    line(this.x*mult, (this.y - 10)*mult, (this.x + 30)*mult, (this.y - 10)*mult);
    strokeWeight(1);
    stroke(0, 0, 0);
};
Money.prototype.draw = function() {
    if (this.drawn === true) {
        fill(234, 255, 0);
        ellipse(this.x * mult, this.y * mult, 10 * mult, 10 * mult);
        fill(0, 0, 0);
        textSize(7 * mult)
        text("$", (this.x - 2) * mult, (this.y - 2) * mult, 100 * mult, 100 * mult);
    }
};
lever.prototype.draw = function() {
    if (this.isPressed === false) {
        if (this.color === "Red") {
            fill(255, 0, 0);
        } else if (this.color === "Blue") {
            fill(0, 0, 255);
        } else if (this.color === "Yellow") {
            fill(255, 255, 0);
        } else if (this.color === "Green") {
            fill(0, 255, 0);
        }
        rect(this.gateX, this.gateY, this.gateWidth, this.gateHeight);

        rect(this.leverX + 3, this.leverY - 7, 20, 10, 30);
        fill(100, 100, 100);
        rect(this.leverX, this.leverY, 26, 5, 20);
    } else {
        fill(150, 150, 150);
        rect(this.leverX + 3, this.leverY - 2, 20, 10, 30);
        fill(100, 100, 100);
        rect(this.leverX, this.leverY, 26, 5, 20);
    }
}
box.prototype.draw = function() {
    if (currentLevel > 0) {
        fill(133, 67, 0)
        rect(this.x, this.y, this.width, this.height);
    }
};
BoxChecker.prototype.draw = function() {
    fill(0, 0, 0);
    rect(this.x, this.y, this.width, this.height);

    if (this.activated === false) {
        rect(this.gateX, this.gateY, this.gateWidth, this.gateHeight);
    }
}
Ball.prototype.draw = function () {
    if (currentLevel > 0) {
        var imageNumber = floor(this.currentImage/10);
        var playerImage = this.isFacingLeft ? this.leftImages[imageNumber] : this.rightImages[imageNumber];
        image(playerImage, this.x, this.y, this.width, this.height);
    }
};

draw = function () {
    var level = levels[currentLevel];
    var platforms = level.platforms;
    var moneys = level.moneys;
    var levers = level.levers;
    var ladders = level.ladders;
    var boxes = level.boxes;
    var boxCheckers = level.boxCheckers;
    var onLadder = false;
    
    if (gameIsPaused === false) {
        for (var b = 0; b < players.length; b++) {
            players[b].onLadder = false;
            for (var i = 0; i < ladders.length; i++) {
                if (ladders[i].checkBall(players[b])) {
                    players[b].onLadder = true;
                }
            }
        }
        
        for (var i = 0; i < levers.length; i++) {
            if (levers[i].expirationTime === 0) {
                levers[i].isPressed = false;
            }
            var now = Date.now();
            for (var b = 0; b < players.length; b++) {
                if (levers[i].checkBall(players[b])) {
                    levers[i].isPressed = true;
                    levers[i].expirationTime = now + levers[i].timeOut;
                }
            }
            if (levers[i].expirationTime !== 0 && levers[i].expirationTime < now) {
                levers[i].isPressed = false;
                levers[i].expirationTime = 0;
            }
        }
        
        for (var b = 0; b < players.length; b++) {
            players[b].onPlatform = false;
            for (var i = 0; i < platforms.length; i++) {
                players[b].applyIntersect(platforms[i]);
            }
        }
        
        for (var i = 0; i < moneys.length; i++) {
            for (var b = 0; b < players.length; b++) {
                players[b].applyIntersect2(moneys[i]);
            }
        }

        for (var i = 0; i < levers.length; i++) {
            for (var b = 0; b < players.length; b++) {
                if (levers[i].isPressed === false) {
                    players[b].applyIntersect3(levers[i]);
                }
            }
        }

        for (var i = 0; i < boxCheckers.length; i++) {
            for (var b = 0; b < players.length; b++) {
                if (boxCheckers[i].activated === false) {
                    players[b].applyIntersect3(boxCheckers[i]);
                }
            }
        }

        for (var i = 0; i < boxes.length; i++) {
            boxes[i].ax = 0;
            for (var b = 0; b < players.length; b++) {
                players[b].applyIntersect4(boxes[i]);
            }
        }

        for (var b = 0; b < boxes.length; b++) {
            boxes[b].onPlatform = false;
            for (var i = 0; i < platforms.length; i++) {
                boxes[b].applyIntersect(platforms[i]);
            }
        }
        
        for (var i = 0; i < levers.length; i++) {
            for (var b = 0; b < boxes.length; b++) {
                if (levers[i].isPressed === false) {
                    boxes[b].applyIntersect3(levers[i]);
                }
            }
        }

        for (var b = 0; b < players.length; b++) {
            if (players[b].isHeld === false) {
                players[b].applyUserInput(platforms, boxes, players);
            }
            players[b].applyBorders();
            if (players[b].onLadder === false && players[b].isHeld === false) {
                players[b].applyGravity();
            }
            players[b].applyAcceleration();
            players[b].applyDrag();
            players[b].applyVelocity();
        }

        Level.applyChangeInLevels(players);

        for (var b = 0; b < boxes.length; b++) {
            boxes[b].applyGravity();
            boxes[b].applyAcceleration();
            boxes[b].applyDrag();
            boxes[b].applyVelocity();
            boxes[b].applyBorders();
        }
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].applyMovement();
        }
        
        for (var i = 0; i < boxCheckers.length; i++) {
            boxCheckers[i].checkBox(boxes);
        }
    }
    background(199, 199, 199);
    Level.drawTextAndEnd();

    for (var i = 0; i < levers.length; i++) {
        levers[i].draw();
    }
    for (var i = 0; i < boxCheckers.length; i++) {
        boxCheckers[i].draw(boxes);
    }
    for (var b = 0; b < players.length; b++) {
        players[b].draw();
    }
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
    for (var i = 0; i < ladders.length; i++) {
        ladders[i].draw();
    }
    for (var i = 0; i < moneys.length; i++) {
        moneys[i].draw();
    }
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draw();
    }
    for (var i = 0; i < levels.length; i++) {
        if (gameIsPaused === true) {
            levels[i].applyPause();
        };
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }
};

mousePressed = function () {
    for (var i = 0; i < buttons.length; i++) {
        //for (var b = 0; b < moneys.length; b++) {
            buttons[i].applyMouse();
        //}
    }
};

keyPressed = function () {
    if (!keys.includes(keyCode)) {
        keys.push(keyCode);
    }
};

keyReleased = function () {
    keys.splice(keys.indexOf(keyCode), 1);

};


        // START BOILER PLATE

    }
}

var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);
