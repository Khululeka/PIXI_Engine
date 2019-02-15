//TODO add this.running to ALL animations!
//TODO remove callback to sprite.animation = false

//TODO make values meas something obvious.

//TODO next to duration add loop amount param
//TODO in addition to duration add param to complete last loop.




function AnimGroundWobble () {
//    WorldObject.call(this, type, textureID, x, y);
//    
//    this.animateHor = this.animateVer = false;
//    
//    this.updateFrames = 10;
//    this.animationFrame = 0;

}

AnimGroundWobble.prototype.doanimateVer = function() {
    if (this.rotation == 0) {
        this.rotation = 0.2;
    }
    this.animationFrame++;
    if  (this.animationFrame >= this.updateFrames/2) {
        this.animationFrame = 0;
        if (this.rotation == 0.2) {
            this.rotation = -0.2;
        } else {
            this.rotation = 0.2;
        }
    }
    WORLD.scalePlayer(this);
    WORLD.updateLayersOrder();
};

AnimGroundWobble.prototype.doanimateHor = function() {
    if (this.rotation == 0) {
        this.rotation = 0.2;
    }
    this.animationFrame++;
    if  (this.animationFrame >= this.updateFrames) {
        this.animationFrame = 0;
        if (this.rotation == 0.2) {
            this.rotation = -0.2;
        } else {
            this.rotation = 0.2;
        }
    }
};








/**
 * [Header]
 * @author Rob Vermaas
 */
'use strict';


var GAME = GAME || {};





//GAME.Animation = function(name, length, row, width, height) {
//    
//};





Animation = function(name, animFrames, speed, duration) {
    duration = defaultFor(duration, 0);
    
    this.name = name;
    this.speed = speed;
    this.frames = animFrames;
    this.frameNumber = 0;
    this.frameCounter = 0;

};

Animation.prototype.update = function(sprite) {
    
    //todo make first frame apeas at once
	if (this.frameCounter === 0 ) {      //TODO is it a problem this keeps going up?
        sprite.setTexture(this.frames[this.frameNumber]);
	}
    
    
    this.frameCounter++;
	if ( (this.frameCounter % this.speed) === 0 ) {      //TODO is it a problem this keeps going up?
//	if ( (this.frameCounter >= this.speed) ) {
//		this.frameCounter = 0;
		this.frameNumber ++;
    	if(this.frameNumber === this.frames.length){
		    this.frameNumber = 0;
	    }
	    
        sprite.setTexture(this.frames[this.frameNumber]);
	}
};

Animation.prototype.reset = function(sprite) {
    this.frameNumber = 0;
    this.frameCounter = 0;
};


AnimationShake = function(amplitude, frequency, duration) {
    duration = defaultFor(duration, 0);
    this.name = "shake";
    this.amp = amplitude;
    this.freq = frequency;
    this.duration = duration;
    
    this.frameCounter = 0;
    
    this.direction = 1;
    
    this.running = false;

};

AnimationShake.prototype.update = function(sprite) {
    this.running = true;
    this.frameCounter++;
    if (sprite.rotation ==0) {
        sprite.rotation = this.amp / 2;
    }
    
    sprite.rotation += this.amp * this.direction;
	if ( (this.frameCounter % this.freq) == 0 ) { 
        this.direction *= -1;
        
        //sprite.rotation += this.amp;
    }
    
    if ( this.duration > 0 && this.frameCounter >= this.duration ) {
        sprite.rotation = 0;
       // sprite.animate = false;
        this.frameCounter = 0;
        this.running = false;
        
     
    }
};












//TODO direction (= 0, 1 for upDown, 1, 0 for leftRight etc.)
AnimationBounceUpDown = function(amplitude, speed, duration) 
{
    duration = defaultFor(duration, 0);
    this.name = "bounce";
    this.amp = amplitude;
    this.v = speed;
    this.duration = duration;

    this.init();
};


AnimationBounceUpDown.prototype.init = function(sprite) 
{
    this.frameCounter = 0;
    this.running = false;
    this.finalLoop = false;
    if (sprite)
        sprite.pivot.y = 0;
};

//TODO use dt in all animations
AnimationBounceUpDown.prototype.update = function(sprite) 
{
    this.running = true;
    this.frameCounter++;
    //console.log(sprite);
    if (sprite.pivot.y <=0) {
        if (this.finalLoop) {
            this.init(sprite);
            return;
        }
        sprite.pivot.y = this.amp;
    }
    
    sprite.pivot.y -= this.v;

    
    if ( this.duration > 0 && this.frameCounter >= this.duration) {
        this.init(sprite);
    }
};

















AnimationWaggle = function(amplitude, frequency, duration) {
    duration = defaultFor(duration, 0);
    this.name = "waggle";
    this.amp = amplitude;
    this.freq = frequency;
    this.duration = duration;
    
    this.frameCounter = 0;
    
    this.running = false;

};

AnimationWaggle.prototype.update = function(sprite) {
    this.running = true;
    this.frameCounter++;
    if (sprite.rotation === 0) {
        sprite.rotation = this.amp;
    }
    
    //sprite.rotation += this.amp * this.direction;
	if ( (this.frameCounter % this.freq) === 0 ) { 
       if (sprite.rotation === this.amp) {
           sprite.rotation = -this.amp;
       } else {
           sprite.rotation = this.amp;
       }
    }
    
    if ( this.duration > 0 && this.frameCounter >= this.duration ) {
        sprite.rotation = 0;
        sprite.animate = false;
        this.frameCounter = 0;
        console.log("end");
    this.running = false;
        
    }
};







AnimationCircle8 = function(radiusX, radiusY, speedX, speedY, duration) {
    this.duration = defaultFor(duration, 0);
 //   this.speed = defaultFor(speedX, 2);
    this.name = "circle";

    this.animationFrame = randomIntFromInterval(0, 360) ;    
    this.circleRadiusX = radiusX; 
    this.circleRadiusY = radiusY;
    this.speedX = speedX;
    this.speedY = speedY;
    
};

AnimationCircle8.prototype.update = function(sprite, t, dt) {
    this.animationFrame++;
    var locX = this.speedX * this.animationFrame * dt / 100;
    var locY = this.speedY * this.animationFrame * dt / 100;
//    console.log(locX)
  //  sprite.pivot.x = this.circleRadiusX * Math.sin(this.speedX * this.animationFrame * Math.PI / 180);
  //  sprite.pivot.y = this.circleRadiusY * Math.sin(this.speedY * this.animationFrame * Math.PI / 180);
    sprite.pivot.x = this.circleRadiusX * Math.sin(locX * Math.PI / 180);
    sprite.pivot.y = this.circleRadiusY * Math.sin(locY * Math.PI / 180);

   // if (this.animationFrame > 360) {
   //     this.animationFrame = 0;
   // }
};