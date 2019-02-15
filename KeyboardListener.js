function KeyboardListener() {
  this.left = this.keyboard(37, 65),
  this.up = this.keyboard(38, 87),
  this.right = this.keyboard(39, 68),
  this.down = this.keyboard(40, 83);
  this.space = this.keyboard(32);
  this.e = this.keyboard(69);
  this.return = this.keyboard(13);
  this.backspace = this.keyboard(8);
  
  
  
  this.d0 = this.keyboard(48);
  this.d1 = this.keyboard(49);
  this.d2 = this.keyboard(50);
  this.d3 = this.keyboard(51);
  this.d4 = this.keyboard(52);
  this.d5 = this.keyboard(53);
  this.d6 = this.keyboard(54);
  this.d7 = this.keyboard(55);
  this.d8 = this.keyboard(56);
  this.d9 = this.keyboard(57);
  
  this.n0 = this.keyboard(96);
  this.n1 = this.keyboard(97);
  this.n2 = this.keyboard(98);
  this.n3 = this.keyboard(99);
  this.n4 = this.keyboard(100);
  this.n5 = this.keyboard(101);
  this.n6 = this.keyboard(102);
  this.n7 = this.keyboard(103);
  this.n8 = this.keyboard(104);
  this.n9 = this.keyboard(105);
}




    //Capture the keyboard arrow keys

  
/*
//Right
KeyboardListener.prototype.right.press = function() {
    this.scrollSpeed = 5;
    console.log("ja")
  };
KeyboardListener.prototype.right.release = function() {
    if (!this.left.isDown) {
      this.scrollSpeed = 0;
    }
  };




//Right
KeyboardListener.prototype.right.press = function() {
    Main.uni.vx += Main.uni.SPEED;
    Main.uni.setTexture(PIXI.TextureCache["uni1"]);
    Main.uni.scale.x = 1;
};
KeyboardListener.prototype.right.release = function() {
//       Main.uni.animate(false);
    Main.uni.vx -= Main.uni.SPEED;
};
    
*/
























KeyboardListener.prototype.keyboard = function(keyCode, keyCode2) {
  keyCode2 = defaultFor(keyCode2, null);

  var key = {};
  key.code = keyCode;
  key.code2 = keyCode2;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code || event.keyCode === key.code2 ) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code || event.keyCode === key.code2 ) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
};