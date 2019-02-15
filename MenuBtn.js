function MenuBtn(txId) {
    PIXI.Sprite.call(this, PIXI.TextureCache[txId]);
    this.interactive = true;
    this.buttonMode = true;
    this    
        .on('mousedown'         , this.onDown)
        .on('touchstart'        , this.onDown)
        .on('mouseupoutside'    , this.onUpOutside) //todo make so this hapens when movig off the button (while klicking), redo onDown when moving over button again...
        .on('touchendoutside'   , this.onUpOutside);
    
}


MenuBtn.prototype = Object.create(PIXI.Sprite.prototype);





MenuBtn.prototype.onDown = function(event) {
    this.alpha = 0.7;
};
MenuBtn.prototype.onUpOutside = function(event) {
    this.alpha = 1;
};




function MenuBtnSelectable(txId) {
    MenuBtn.call(this, txId);
    this.selected = false;
    this.modeSingle = false;
    this.selectGroup = [];
    
    this
        .on('touchend'  , this.menuBtnSelectClick)
        .on('mouseup'  , this.menuBtnSelectClick);
}

MenuBtnSelectable.prototype = Object.create(MenuBtn.prototype);


MenuBtnSelectable.prototype.setSelectGroup = function(arr){
    this.selectGroup = arr;
};

MenuBtnSelectable.prototype.menuBtnSelectClick = function(){
    this.select();
};

MenuBtnSelectable.prototype.select = function() {
    if (this.modeSingle) {
        for (var i=0; i<this.selectGroup.length; i++) {
            this.selectGroup[i].deselect()
        }
    }
    
    
    this.selected = true;
    this.alpha = 0.2;
};

MenuBtnSelectable.prototype.deselect = function(){
    this.selected = false;
    this.alpha = 1;
    
};

