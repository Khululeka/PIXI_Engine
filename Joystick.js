function Joystick() {
    PIXI.Container.call(this);
    
//    this.pivot.set(0.5);
    this.inner = new PIXI.Sprite(PIXI.TextureCache["joyInner"]);
    this.outer = new PIXI.Sprite(PIXI.TextureCache["joyOuter"]);
    this.inner.anchor.set(0.5);
    this.outer.anchor.set(0.5);
    
    this.addChild(this.inner);
    this.addChild(this.outer);
    
    this.interactive = true;
    this    
        .on('mousedown' , this.onDown)
        .on('touchstart', this.onDown)
        .on('mouseup'   , this.onUp)
        .on('touchend'  , this.onUp)
        .on('mouseupoutside'  , this.onUp)
        .on('touchendoutside'  , this.onUp)
        .on('mousemove' , this.onMove)
        .on('touchmove' , this.onMove)
    ;
    this.LIMIT = 50;
    
    this.scale.set(2);
    this.id = null;
}


Joystick.prototype = Object.create(PIXI.Container.prototype);



Joystick.prototype.onDown = function(event) {
    this.id = event.data.identifier; // || 99 is to support desktop version
    if (this.id === undefined) { this.id = 99; }
    this.data = event.data;
    this.dragging = true;
};

Joystick.prototype.onUp = function(event) {
    if (this.id === event.data.identifier || this.id === 99) {
        this.dragging = false;
        this.data = null;
        this.inner.position.set(0);
        this.inner.position.x=0;
        this.inner.position.y=0;
        
        this.id = null;
    }
    
};




Joystick.prototype.onMove = function(event) {
    if (this.id === event.data.identifier || this.id === 99) {
        if (this.dragging)
        {
            //var newPosition = this.data.getLocalPosition(this.parent);
            var newPosition = this.data.getLocalPosition(this);
            this.inner.position.x = newPosition.x;
            this.inner.position.y = newPosition.y;
        }
        
        if (this.inner.position.x >  this.LIMIT) { this.inner.position.x =  this.LIMIT; }    
        if (this.inner.position.x < -this.LIMIT) { this.inner.position.x = -this.LIMIT; }    
        if (this.inner.position.y >  this.LIMIT) { this.inner.position.y =  this.LIMIT; }    
        if (this.inner.position.y < -this.LIMIT) { this.inner.position.y = -this.LIMIT; }
    }
};









function JoystickTap() {
    PIXI.Container.call(this);
    
//    this.pivot.set(0.5);
    this.inner = new PIXI.Sprite(PIXI.TextureCache["joyInner"]);
    this.outer = new PIXI.Sprite(PIXI.TextureCache["joyOuter"]);
    this.inner.anchor.set(0.5);
    this.outer.anchor.set(0.5);
    
    this.addChild(this.inner);
    this.addChild(this.outer);
    
    this.interactive = true;
    this    
        .on('mousedown' , this.onDown)
        .on('touchstart', this.onDown)
        .on('mouseup' , this.onUp)
        .on('touchend', this.onUp)
        .on('touchendoutside', this.onUp);
    
    this.scale.set(2);
    
}


JoystickTap.prototype = Object.create(PIXI.Container.prototype);



JoystickTap.prototype.onDown = function(event) {
    jump();
};

JoystickTap.prototype.onUp = function(event) {
    jumpEnd();
};















