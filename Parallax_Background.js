function Parallax_Background(textureID, width, height, posX, posY, speed) {
  PIXI.extras.TilingSprite.call(this, PIXI.TextureCache[textureID], width, height);

//  PIXI.extras.TilingSprite.fromFrame.call(this, textureID, width, height);
  
  
  //TODO pos Y werkt niet!!
  
  this.position.x = posX;
  this.position.y = posY;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.DELTA_X = speed;
  this.viewportX = 0;
}

Parallax_Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

//obsolete?
Parallax_Background.prototype.update = function() {
  this.tilePosition.x -= this.DELTA_X;
};


Parallax_Background.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * this.DELTA_X);
};

