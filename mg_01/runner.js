/*=======================================*/
/*------------- RUNNER !!! --------------*/

//nonsense state stuff
var __setupComplete = false,
  __thingsToLoad = 0,
  __loadedCounter = 0,
  __restartButton;

//global to backend
var OBJECTS = [];
var BACKGROUND, RUNNING = false,
  TIMER = null;

//things accessible by mygame.js object
var __SCORE = 0;


//------------- LOAD STUFF ------------//
function preload() {
  console.log(getRandom(5.1, 10.2));
  BACKGROUND = new __bg(mg.background);

  mg.gameObjects.forEach(function(obj, i) {
    var thisObj = new __MgObject(obj);
    OBJECTS.push(thisObj);
  });
}


//------------- SETUP ------------//
function setup() {
  imageMode(CENTER);
  textAlign(CENTER);
  createCanvas(mg.size[0], mg.size[1]);

  if (mg.duration)
    TIMER = new __timer(mg);
}


//------------- DRAW ------------//
function draw() {
  if (!__setupComplete) {
    __drawLoadingStatus();
    return;
  } else RUNNING = true;

  if (RUNNING) {
    BACKGROUND.display();

    OBJECTS.forEach(function(obj) {
      obj.update();
    });

    __drawScore();

    if (TIMER) TIMER.update();
  }
}



//------------- BACKGROUND ------------//
function __bg(mgBg) {
  this.bgAsset,
    this.bgColor = mgBg.color || color(204, 102, 0);

  if (mgBg.asset) {
    __thingsToLoad++;
    //TODO: figure out GIF bg
    // if(mgBg.asset.indexOf('.gif')>-1){
    // this.bgAsset = createImg(mgBg.asset, loadImgSuccess, loadImgFail);
    //   this.bgAsset.hide();
    // } else
    this.bgAsset = loadImage(mgBg.asset, loadImgSuccess, loadImgFail);
  }

  this.display = function() {
    if (this.bgAsset) {
      // $('body').css('background-image', 'url(' + mgBg.asset + ')');
      image(this.bgAsset, displayWidth / 2, displayHeight / 2, displayWidth, displayHeight);
    } else {
      fill(this.bgColor);
      rect(0, 0, displayWidth, displayHeight);
    }
  };
}


function __drawLoadingStatus() {
  background(255);
  fill(0);
  textSize(20);
  text("loading assets...", width / 2 - 100, height / 2 - 100);
  text(__loadedCounter + "  out of  " + __thingsToLoad, width / 2 - 100, height / 2);
  if (__loadedCounter === __thingsToLoad)
    __setupComplete = true;
}


function __timer(mg) {
  this.duration = mg.duration * 1000;

  this.update = function() {
    var left = Number((this.duration - millis()) / 1000).toFixed(2);
    fill(0, 50, 200);
    rect(0, height - 20, (left / mg.duration) * width, 20);
    if (left <= 0.00) {
      //send score and user to onTimerUp definition
      mg.onTimerUp(__SCORE, {
        user: "id"
      });
      //really stupid restart button.
      __restartButton = createButton('start over');
      __restartButton.position(250, 250);
      __restartButton.mousePressed(function() {
        location.reload();
      });
    }
  }
}

function __drawScore() {
  fill(255);
  textSize(25);
  text(__SCORE, 30, 35);
}

function loadImgSuccess(data) {
  // console.log('success load image: ', data);
  __loadedCounter++;
}

function loadImgFail(data) {
  console.log('FAIL load image: ', data);
}