/*===========================================*/
/*------------- YOUR MICROGAME --------------*/

var mg = {
  title: 'my game title',
  author: '@jmsaavedra',
  size: [667, 375], // [width, height] // will be automatic
  duration: 30, // in seconds

  background: {
    asset: 'assets/imgs/space.gif', // 'assets/moonwalk.jpg'
    //OR, color: '#00FF00'
  },

  onTimerUp: function(score, userId) {
    showMessage("Time's up! \nYou got: " + score);
    // noLoop(); 
    //TODO: submit score to player engine, next game up.
  },

  // ALL OBJECTS IN YOUR GAME
  gameObjects: [
    
    { //-- a "target" type object
      type: 'target',
      name: 'bieber',
      asset: 'assets/imgs/bieber.gif',
      size: [250, 300],
      position: [400, 300],
      targetPadding: [50, 50],
      animate: null, //do not animate
      onHit: target1Hit,
    },

    { //-- a "user" type object
      type: 'user',
      name: 'poop-bullet',
      asset: 'assets/imgs/poop.gif',
      control: {
        type: 'device-motion',
        sensitivity: .07
      },
      size: [50, 50],
      position: [50, 250],
      animate: {
        xspeed: 2,
        yspeed: 1,
        direction: 1.0,
        behavior: {
          gravity: 1,
          type: 'wall-bounce'
        }
      }
    }
    
    
    
  ],
}

function showMessage(msg) {
  /** message displayer can be global **/
  background(0);
  fill(255);
  textSize(25);
  text(msg, width / 2 - 100, height / 2 - 100);
}

function target1Hit(object) {
  console.log('target hit by: ' + object.name);
  this.x = getRandom(100, width-100);
  this.y = getRandom(100, height-100);
  __SCORE++;
}
