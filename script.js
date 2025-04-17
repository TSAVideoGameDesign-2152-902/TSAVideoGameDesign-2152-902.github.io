// @pjs preload must be used to preload the image

/* @pjs preload="bank.png"; */

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(800, 800);
        frameRate(60);
        smooth();

        // END BOILER PLATE

var controlScreen
var backgroundScreen
var backgroundScreen2
var backgroundScreen3
var boxImage
var breakableBoxImage
var safeImage
var moneyImage
var f = createFont("monospace");
textFont(f);
setup = function() {
    controlScreen = loadImage('control screen.png');
    backgroundScreen = loadImage('NewBackground.png')
    backgroundScreen2 = loadImage('BlueBackground2.png');
    backgroundScreen3 = loadImage('fourBackground.png')
    boxImage = loadImage('MoveableCrate.png')
    breakableBoxImage = loadImage('Breakable Block.png')
    safeImage = loadImage('safeImage.png')
    moneyImage = loadImage('moneyBag.png')
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
var amountOfPlayers = 0;
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
    this.startX = this.x;
    this.startY = this.y;
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
var playButton = new Button({ buttonX: 135, buttonY: 310, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isPlayButton: true });

var mainMenuButton = new Button({ buttonX: 142, buttonY: 335, buttonWidth: 120, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isMainMenuButton: true});

var controlButton = new Button({ buttonX: 1, buttonY: 310, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isControlButton: true });

var levelButton = new Button({ buttonX: 269, buttonY: 310, buttonWidth: 130, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isLevelButton: true });

var backButton = new Button({ buttonX: 16, buttonY: 20, buttonWidth: 80, buttonHeight: 40, color1: 4, color2: 255, color3: 0, isBackButton: true });

var pauseButton = new Button({ buttonX: 375, buttonY: 20, buttonWidth: 20, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isPauseButton: true });

var resumeButton = new Button({ buttonX: 60, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isResumeButton: true });

var restartButton = new Button({ buttonX: 160, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isRestartButton: true });

var mainMenuButton2 = new Button({ buttonX: 260, buttonY: 220, buttonWidth: 80, buttonHeight: 20, color1: 4, color2: 255, color3: 0, isMainMenuButton2: true });

var firstLevelButton = new Button({ buttonX: 70, buttonY: 150, buttonWidth: 50, buttonHeight: 50, color1: 4, color2: 255, color3: 0, isFirstLevelButton: true });

var secondLevelButton = new Button({ buttonX: 170, buttonY: 150, buttonWidth: 50, buttonHeight: 50, color1: 4, color2: 255, color3: 0, isSecondLevelButton: true });

var thirdLevelButton = new Button({ buttonX: 270, buttonY: 150, buttonWidth: 50, buttonHeight: 50, color1: 4, color2: 255, color3: 0, isThirdLevelButton: true });

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
    this.topPlat = config.topPlat || false;
    };
    
Platform.prototype.draw = function () {
    if (this.canBreak === false) {
        if (this.canKill === false) {
            fill(255, 255, 255);
            //fill(95, 168, 179);
            //fill(80, 81, 89);
            //fill(139, 141, 153);
            //noStroke();
            rect(this.x, this.y, this.width, this.height);
        } else {
            fill(171, 0, 0);
            rect(this.x, this.y, this.width, this.height);
        }
    } else if (this.canBreak === true) {
        if (this.isBroken === false) {
            fill(100, 100, 100);
            image(breakableBoxImage, this.x, this.y, this.width, this.height)
            //rect(this.x, this.y, this.width, this.height);
        }
    } 
    
    if (this.topPlat === true) {
        fill(204, 204, 255);
        rect(this.x, this.y, this.width, this.height);
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
var Platform8 = new Platform({x: 160, y: 240, width: 10, height: 50});
var Platform9 = new Platform({x: 280, y: 300, width: 10, height: 60});
var Platform10 = new Platform({x: 220, y: 300, width: 60, height: 10});
var Platform11 = new Platform({x: 220, y: 240, width: 10, height: 60});
var Platform12 = new Platform({x: 280, y: 150, width: 120, height: 10});
var Platform13 = new Platform({x: 300, y: 50, width: 10, height: 80});
var Platform14 = new Platform({x: 200, y: 240, width: 20, height: 10});
var Platform15 = new Platform({x: 170, y: 240, width: 20, height: 10});
var Platform16 = new Platform({x: -1, y: 0, width: 402, height: 50, topPlat: true});
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
//var Platform212 = new Platform({ x: 300, y: 315, width: 10, height: 31});
var Platform213 = new Platform({ x: 250, y: 359, width: 50, height: 10});
//var Platform214 = new Platform({ x: 250, y: 315, width: 10, height: 11});
var Platform215 = new Platform({x: -1, y: 0, width: 402, height: 50});
var breakPlatform21 = new Platform({x: 100, y: 295, width: 10, height: 10, canBreak: true});
var breakPlatform22 = new Platform({x: 100, y: 285, width: 10, height: 10, canBreak: true});
var breakPlatform23 = new Platform({x: 240, y: 90, width: 10, height: 10, canBreak: true});
var breakPlatform24 = new Platform({x: 240, y: 80, width: 10, height: 10, canBreak: true});
var killPlatform21 = new Platform({x: -1, y: 265, width: 111, height: 10, canKill: true});

var Platform31 = new Platform({ x: -1, y: 380, width: 401, height: 10});
var Platform32 = new Platform({ x: -1, y: 305, width: 170, height: 10});
var Platform33 = new Platform({ x: 200, y: 305, width: 370, height: 10});
var Platform34 = new Platform({ x: 120, y: 80, width: 50, height: 10});
var Platform35 = new Platform({ x: 100, y: 0, width: 10, height: 225});
var Platform36 = new Platform({ x: 140, y: 50, width: 10, height: 20});
var Platform37 = new Platform({ x: 200, y: 80, width: 90, height: 10});
var Platform38 = new Platform({ x: 120, y: 140, width: 50, height: 10});
var Platform39 = new Platform({ x: 120, y: 215, width: 110, height: 10});
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
var breakPlatform31 = new Platform({x: 140, y: 70, width: 10, height: 10, canBreak: true});
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
var killPlatform31 = new Platform({ x: 120, y: 205, width: 50, height: 10, canKill: true});
var killPlatform32 = new Platform({ x: -1, y: 205, width: 61, height: 10, canKill: true});

var platforms0 = [];
var platforms1 = [Platform1, Platform2, Platform3, Platform4, Platform5, Platform6, Platform7, Platform8, Platform9, Platform10, Platform11, Platform12, Platform13, Platform14, Platform15, Platform16, breakPlatform1, breakPlatform2, breakPlatform3];

var platforms2 = [Platform21, Platform22, Platform23, Platform24, Platform25, Platform26, Platform27, Platform28, Platform29, Platform210, Platform211, Platform213, Platform215, breakPlatform21, breakPlatform22, breakPlatform23, breakPlatform24, killPlatform21];

var platforms3 = [Platform31, Platform32, Platform33, Platform34, Platform35, Platform36, Platform37, Platform38, Platform39, Platform310, Platform311, Platform313, Platform314, Platform315, Platform316, Platform317, Platform318, Platform319, Platform312, breakPlatform31, breakPlatform32, breakPlatform33, breakPlatform34, breakPlatform35, breakPlatform36, breakPlatform37, breakPlatform38, breakPlatform39, breakPlatform310, breakPlatform311, breakPlatform312, breakPlatform313, breakPlatform314, breakPlatform315, breakPlatform316, breakPlatform317, breakPlatform318, breakPlatform319, breakPlatform320, breakPlatform321, breakPlatform322, breakPlatform323, breakPlatform324, killPlatform31, killPlatform32];

var platform41 = new Platform({x: 150, y: 350, width: 50, height: 50});
//var platform42 = new Platform({x: 150, y: 250, width: 50, height: 50});
var platforms4 = [Platform1, platform41];

var ladder1 = new Ladder({x: 60, y: 295});
var ladder2 = new Ladder({x: 250, y: 235});
var ladder3 = new Ladder({x: 250, y: 157});

var ladder21 = new Ladder({x: 160, y: 315});

var ladder31 = new Ladder({x: 170, y: 315});
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
var Money2 = new Money({x: 20, y: 180});
var Money3 = new Money({x: 200, y: 200});

var Money21 = new Money({x: 275, y: 375});
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
var lever32 = new lever({leverX: 230, leverY: 78, gateX: 360, gateY: 50, gateWidth: 10, gateHeight: 20, color: "Blue"});
var lever33 = new lever({leverX: 230, leverY: 138, gateX: 170, gateY: 80, gateWidth: 50, gateHeight: 10, color: "Yellow", timeOut: 2000});

var levers0 = [];
var levers1 = [lever1, lever2];
var levers2 = [lever21, lever22, lever23, lever24];
var levers3 = [lever31, lever32, lever33];

var box1 = new box({x: 340, y: 200, width: 40, height: 40});

var box31 = new box({x: 130, y: 70, width: 20, height: 21});
var box32 = new box({x: 370, y: 60, width: 20, height: 21});
var box33 = new box({x: 10, y: 175, width: 20, height: 21});
//var box34 = new box({x: 90, y: 380, width: 20, height: 21});

var boxes0 = [];
var boxes2 = [box1];
var boxes3 = [box31, box32, box33];

var boxChecker1 = new BoxChecker({x: 300, y: 370, width: 40, height: 10, gateX: 50, gateY: 310, gateWidth: 10, gateHeight: 70});

var boxCheckers = [boxChecker1];
var boxCheckers0 = [];

var homeScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var level1 = new Level({platforms: platforms1, ladders: ladders1, moneys: moneys1, boxes: boxes0, levers: levers1, boxCheckers: boxCheckers0, blueX: 370, blueY: 380, redX: 20, redY: 100, yellowX: 20, yellowY: 380, greenX: 340, greenY: 140, endX: 240, endY: 330, endWidth: 30, endHeight: 30});
var level2 = new Level({platforms: platforms2, ladders: ladders2, moneys: moneys2, boxes: boxes2, levers: levers2, boxCheckers: boxCheckers0, blueX: 370, blueY: 380, redX: 40, redY: 300, yellowX: 185, yellowY: 50, greenX: 360, greenY: 300, endX: 20, endY: 350, endWidth: 30, endHeight: 30});
var level3 = new Level({platforms: platforms3, ladders: ladders3, moneys: moneys3, boxes: boxes3, levers: levers3, boxCheckers: boxCheckers, blueX: 70, blueY: 380, redX: 90, redY: 380, yellowX: 110, yellowY: 380, greenX: 130, greenY: 380, endX: 10, endY: 350, endWidth: 30, endHeight: 30});
var testLevel = new Level({platforms: platforms4, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0, blueX: 20, blueY: 20});
var endScreen = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var controls = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var stages = new Level({platforms: platforms0, ladders: ladders0, moneys: moneys0, boxes: boxes0, levers: levers0, boxCheckers: boxCheckers0});
var levels = [homeScreen, level1, level2, level3, endScreen, controls, stages, testLevel];
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

Level.applyChangeInLevels = function () {
    greenBall.isHolding = false;
    blueBall.isHeld = false;
    redBall.isHeld = false;
    yellowBall.isHeld = false;
    blueBall.x = levels[currentLevel].blueX;
    blueBall.y = levels[currentLevel].blueY;
    redBall.x = levels[currentLevel].redX;
    redBall.y = levels[currentLevel].redY;
    yellowBall.x = levels[currentLevel].yellowX * mult;
    yellowBall.y = levels[currentLevel].yellowY * mult;
    greenBall.x = levels[currentLevel].greenX;
    greenBall.y = levels[currentLevel].greenY;

    for (i = 0; i < levels[currentLevel].boxes.length; i++) {
        levels[currentLevel].boxes[i].x = levels[currentLevel].boxes[i].startX
        levels[currentLevel].boxes[i].y = levels[currentLevel].boxes[i].startY
    }

    for (i = 0; i < players.length; i++) {        
        players[i].vx = 0;
        players[i].vy = 0;
    }

    for (i = 0; i < levels[currentLevel].moneys.length; i++) {
        levels[currentLevel].moneys[i].drawn = true;
    }
    
    for (i = 0; i < levels[currentLevel].platforms.length; i++) {
        levels[currentLevel].platforms[i].isBroken = false;
    }

    amountOfPlayers = 0;
    win = 0;
            
};

Level.drawTextAndEnd = function () {
    fill(128, 96, 74);
    rect(levels[currentLevel].endX, levels[currentLevel].endY, levels[currentLevel].endWidth, levels[currentLevel].endHeight);
    fill(255, 255, 255)
    rect(levels[currentLevel].endX + 5, levels[currentLevel].endY + 5, levels[currentLevel].endWidth - 10, levels[currentLevel].endHeight - 30);
    fill(255, 0, 0)
    textSize(8*mult)
    text("EXIT", levels[currentLevel].endX + 10, levels[currentLevel].endY + 15, levels[currentLevel].endWidth, levels[currentLevel].endHeight)

    if (currentLevel === 0) {
        textSize(32 * mult);
        fill(0, 0, 0);
        text("The Heist", 122 * mult, 60 * mult, 400 * mult, 100 * mult);
        textSize(12 * mult);
        text("Made by 2152-902", 140 * mult, 90 * mult, 339 * mult, 100 * mult);
    }
    if (currentLevel === 1) {
        fill(0, 0, 0);
        textSize(6 * mult)
        text("Hmmm...Looks like only one of the players can press these buttons.", 8 * mult, 254 * mult, 114 * mult, 100 * mult);
        text("Breakable blocks such as these can only be broken by one of the players.", 312 * mult, 102 * mult, 90 * mult, 100 * mult);
        text("Make sure to collect these coins. You can't finish the level without them!", 160 * mult, 210 * mult, 100 * mult, 100 * mult);
        text("Looks like you can't jump. If only there was someone who could pick you up...", 62 * mult, 60 * mult, 100 * mult, 100 * mult);
    }
    if (currentLevel === 2) {
        fill(0, 0, 0);
        textSize(6 * mult);
        text("Boxes like these can be moved by anyone.", 300 * mult, 155 * mult, 100 * mult, 100 * mult);
        text("These kinds of platforms are dangerous!", 20 * mult, 252 * mult, 100 * mult, 100 * mult);
    }
    if (currentLevel === 3) {
        fill(0, 0, 0);
        textSize(6 * mult);
        text("The black gate will open when three boxes are put into here.", 260 * mult, 355 * mult, 87 * mult, 100 * mult);
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
        image(controlScreen, 0, 0, 800, 800);
    }
    if (currentLevel === 6) {
        fill(0, 0, 0);
        textSize(32*mult);
        text("Levels", 300, 100, 400, 100);
    }
};

Button.prototype.draw = function () {
    if (this.isPlayButton === true) {
        if (currentLevel === 0) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            textSize(32 * mult);
            text("Play", 164 * mult, 317 * mult, 100 * mult, 100 * mult);
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
            text("Back", 17 * mult, 28 * mult, 100 * mult, 100 * mult);
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
            textSize(30 * mult)
            text("Controls", 0 * mult, 320 * mult, 171 * mult, 100 * mult);
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
            text("Levels", 285 * mult, 320 * mult, 111 * mult, 100 * mult);
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

    if (currentLevel === 6) {
        if (this.isFirstLevelButton === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("1", 170, 330, 800, 100);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
        if (this.isSecondLevelButton === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("2", 370, 330, 800, 100);
            if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
                this.color1 = 37;
                this.color2 = 130;
            }
            else {
                this.color1 = 4;
                this.color2 = 255;
            }
        }
        if (this.isThirdLevelButton === true) {
            fill(this.color1, this.color2, this.color3);
            rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            fill(0, 0, 0);
            text("3", 570, 330, 800, 100);
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

Button.prototype.applyMouse = function (moneys) {
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
        if (this.isMainMenuButton === true) {
            if (currentLevel === 4) {
                currentLevel = 0;
            }
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

        if (this.isRestartButton === true) {
            if (gameIsPaused === true && currentLevel > 0 && currentLevel < 4) {
                gameIsPaused = false;
                Level.applyChangeInLevels(moneys);
            }
        }

        if (this.isFirstLevelButton === true) {
            if (currentLevel === 6) {
                currentLevel = 1;
                Level.applyChangeInLevels(moneys);
            }
        }
        if (this.isSecondLevelButton === true) {
            if (currentLevel === 6) {
                currentLevel = 2;
                Level.applyChangeInLevels(moneys);
            }
        }
        if (this.isThirdLevelButton === true) {
            if (currentLevel === 6) {
                currentLevel = 3;
                Level.applyChangeInLevels(moneys);
            }
        }
    }

};
Button.prototype.applyPlayMouse = function(moneys) {
    if (mouseX > this.buttonX && mouseX < this.buttonX + this.buttonWidth && mouseY > this.buttonY && mouseY < this.buttonY + this.buttonHeight) {
        if (this.isPlayButton === true) {
            if (currentLevel === 0) {
                currentLevel = 1;
                Level.applyChangeInLevels(moneys);
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

var createAABB = function(x, y, width, height) {
    var centerX = x + width/2;
    var centerY = y + height/2;
    return new AABB(new Point(centerX, centerY), new Point(width/2, height/2));
}

var intersectPlayerWithPlatform = function(player, platform) {
    var playerAABB = createAABB(player.x, player.y, player.width, player.height);
    var platformAABB = createAABB(platform.x, platform.y, platform.width, platform.height);
    var delta = new Point(player.vx, player.vy);

    var sweep = platformAABB.sweepAABB(playerAABB, delta);

    if (sweep.hit === null)
        return ""

    if (sweep.hit.normal.x > 0) 
        return "Right"

    if (sweep.hit.normal.x < 0) 
        return "Left"

    if (sweep.hit.normal.y > 0) 
        return "Bottom"
    
    if (sweep.hit.normal.y < 0) 
        return "Top"
}

var intersectTop = function(player, platform) {
    if (player.y + player.height > platform.y && player.y < platform.y + 1 && player.x + player.width/2 > platform.x && player.x + player.width/2 < platform.x + platform.width) {
        return true
    } else {
        return false
    }

};
var intersectRight = function(player, platform) {
    if (player.y + player.height*3/4 > platform.y && player.y + player.height/4 < platform.y + platform.height && player.x + player.width > platform.x && player.x < platform.x + 1) {
        return true
    } else {
        return false
    }
};
var intersectLeft = function(player, platform) {
    if (player.y + player.height*3/4 > platform.y && player.y + player.height/4 < platform.y + platform.height && player.x < platform.x + platform.width && player.x > platform.x - 1) {
        return true
    } else {
        return false
    }
}
var intersectBottom = function(player, platform) {
    if (player.x + player.width/2 > platform.x && player.x + player.width/2 < platform.x + platform.width && player.y < platform.y + platform.height && player.y > platform.y) {
        return true
    } else {
        return false
    }
}
thingsWithPhysics.prototype.applyIntersect = function (platform) {
    if (platform.isBroken) 
        return
    if (platform.canKill === false) {
        var hitSide = intersectPlayerWithPlatform(this, platform);
        if (intersectTop(this, platform)) {  
            this.y = platform.y - this.height;
            this.vy = 0;
            this.onPlatform = true;
        }
        
        if (intersectRight(this, platform)) {
            this.x = platform.x - this.width;
            this.vx = 0;
        }
        
        if (intersectLeft(this, platform)) {
            this.x = platform.x + platform.width;
            this.vx = 0;
        }
        
        if (intersectBottom(this, platform)) {
            this.y = platform.y + platform.height;
            this.vy = 0;
        }
        return
    } 
    if (this.x + this.width > platform.x && this.x < platform.x + platform.width && this.y + this.height > platform.y && this.y < platform.y + platform.height) {
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
    if (keys.includes(DOWN) && this.isHolding === false && this.y + this.height > otherBall.y && this.y + this.height < otherBall.y + otherBall.height && this.x + this.width > otherBall.x && this.x < otherBall.x + otherBall.width) {
        otherBall.isHeld = true;
        this.isHolding = true;
    } 
        
    if (otherBall.isHeld === true) {
        otherBall.x = this.x;
        otherBall.y = this.y - otherBall.width;
        if (keys.includes(UP)) {
            otherBall.isHeld = false;
            otherBall.vx += this.vx * 2;
            otherBall.vy -= 7.5 * mult;
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
    }

    if (this.vx < -6) {
        this.vx = -6;
    }

    if (this.vy > 6) {
        this.vy = 6;
    }
    /*
    if (this.vy < -10) {
        this.vy = -10;
    }*/

    this.x += this.vx;
    this.y += this.vy;
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
        image(boxImage, this.x, this.y, this.width, this.height)
        //rect(this.x, this.y, this.width, this.height);
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

        for (i = 0; i < players.length; i++) {
                if (win === 3 && players[i].x + players[i].width/2 > levels[currentLevel].endX && players[i].x + players[i].width/2 < levels[currentLevel].endX + levels[currentLevel].endWidth && players[i].y + players[i].width/2 > levels[currentLevel].endY && players[i].y + players[i].width/2 < levels[currentLevel].endY + levels[currentLevel].endHeight) {
                    amountOfPlayers += 1;
                    if (amountOfPlayers === 4) {
                        currentLevel++;
                        Level.applyChangeInLevels();

                    }
                }
        }

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
    if (currentLevel === 0) {
        image(backgroundScreen, 0, 0, 800, 800);
        image(safeImage, 200, 230, 252 * 1.6, 205 * 1.6);
        image(moneyImage, 140, 460, 140, 140);
        image(moneyImage, 530, 460, 140, 140);
    } else if (currentLevel > 4) {
        image(backgroundScreen3, 0, 0, 800, 800);
    } else {
        image(backgroundScreen2, 0, 0, 400, 400)
        image(backgroundScreen2, 400, 0, 400, 400)
        image(backgroundScreen2, 0, 400, 400, 400)
        image(backgroundScreen2, 400, 400, 400, 400)
    } 
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
    var level = levels[currentLevel];
    var moneys = level.moneys;
    var nextLevel = levels[currentLevel + 1]
    var nextMoneys = nextLevel.moneys;
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].applyMouse(moneys);
        buttons[i].applyPlayMouse(nextMoneys);
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
