/*==========================================================*/
/*------------- ANY/ALL GAME OBJECTS + METHODS ------------ */
// - as defined in the "gameObjects" array of "mygame.js" mg object.

/*** constructor ***/
var __MgObject = function(mgObj) {
  this.object = mgObj;
  this.asset, this.color, this.xspeed, this.yspeed;
  this.x = mgObj.position[0] || random(100, width-100);
  this.y = mgObj.position[1] || random(100, height-100);
  this.width = mgObj.size[0] || 50;
  this.height = mgObj.size[1] || 50;
  this.type = mgObj.type;
  this.name = mgObj.name;
  this.onHit = mgObj.onHit;
  
  if (mgObj.animate) {
    this.xspeed = mgObj.animate.xspeed;
    this.yspeed = mgObj.animate.yspeed;
    this.direction = mgObj.animate.direction || 0.7;
  }

  if (mgObj.asset) {
    __thingsToLoad++;
    // if(mgObj.asset.indexOf('.gif')>-1){
    //   this.asset = createImg(mgObj.asset, loadImgSuccess, loadImgFail);
    //   this.asset.hide(); } else
    this.asset = loadImage(mgObj.asset, loadImgSuccess, loadImgFail);
  }
};

/*** update loop ***/
__MgObject.prototype.update = function() {
  this.control();
  this.animate();
  this.collision();
  this.display();
};

/*** check for collisions with "target" types ***/
__MgObject.prototype.collision = function() {
  var _this = this;
  OBJECTS.forEach(function(obj, i) {
    if (obj.type === 'target' && obj.name !== _this.name) {
      // console.log(i+': '+_this.name + " - " + obj.name);
      if (_this.x > obj.x - obj.width / 2 && _this.x < obj.x + obj.width / 2) {
        if (_this.y > obj.y - obj.width / 2 && _this.y < obj.y + obj.width / 2) {
          obj.onHit(_this); //target object onHit (this)
        }
      }
    }
  });
};

/*** control loop ***/
__MgObject.prototype.control = function() {
  //**** CONTROL ******
  if (!this.object.control)
    return;

  switch (this.object.control.type) {
    case "device-motion":
      this.ax = accelerationX;
      this.ay = accelerationY;
      this.xspeed += this.ax * this.object.control.sensitivity;
      this.yspeed += this.ay * this.object.control.sensitivity;
      break;
  }
};

/*** animate loop ***/
__MgObject.prototype.animate = function() {
  //**** ANIMATION ******
  if (!this.object.animate)
    return;

  switch (this.object.animate.behavior.type) {

    case 'wall-bounce':
      if (this.x < 0 + this.width / 2) {
        this.x = this.width / 2;
        this.direction = -this.direction;
      } else if (this.y < 0 + this.height / 2) {
        this.y = this.height / 2;
        this.direction = -this.direction;
      } else if (this.x > width - this.width / 2) {
        this.x = width - this.width / 2;
        this.direction = -this.direction;
      } else if (this.y > height - this.height / 2) {
        this.y = height - this.height / 2;
        this.direction = -this.direction;
      }

      this.x += this.xspeed * this.direction;
      this.y += this.yspeed * this.direction;
      break;

  }
};

/*** display loop ***/
__MgObject.prototype.display = function() {
  if (this.asset) {
    image(this.asset, this.x, this.y, this.width, this.height);
    // this.asset.position(this.x, this.y); this.asset.show();
  } else {
    fill(100, 250, 0);
    ellipse(this.x, this.y, this.width, this.height);
  }
};