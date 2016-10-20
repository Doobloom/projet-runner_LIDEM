function Perso(context){
	this.ctx = context;
	this.x = 30; // axe x du dessin
	this.y = 0;	// axe y du dessin
	this.h = 50; // height du dessin
	this.w = 50; //width du dessin
	this.ground; // définition du "sol"
	this.angle = 0;
	this.angleFinal = 0;
	this.isJumping = false; // état du "saut" du module dessiné
}

Perso.prototype.draw = function(){
	if(this.angle < this.angleFinal){
		this.angle+=2;
		this.ctx.save();
		var decalageX = this.x+this.w/2; // définition du décalage du module par rapport à 
		var decalageY = this.y+this.h/2;
		this.ctx.translate(decalageX,decalageY);
		this.ctx.rotate(this.angle*Math.PI/180);
		this.ctx.fillStyle = "rgb(200,0,0)"; // remplis le dessin de la couleur rgb("r,g,b,a");
		this.ctx.fillRect (this.x-decalageX,this.y-decalageY,this.h,this.w);
		this.ctx.beginPath();
		this.ctx.lineWidth="2";
		this.ctx.strokeStyle="black";
		this.ctx.rect(this.x-decalageX,this.y-decalageY,this.h,this.w);
		this.ctx.stroke();
		this.ctx.restore();
	}
	else{
		this.angle = 0;
		this.angleFinal = 0;
		this.ctx.fillStyle = "rgb(200,0,0)";
		this.ctx.beginPath();
		this.ctx.lineWidth="2";
		this.ctx.strokeStyle="black";
		this.ctx.fillRect (this.x,this.y,this.h,this.w);
		this.ctx.rect (this.x,this.y,this.h,this.w);
		this.ctx.stroke();
	}
}

Perso.prototype.rotate = function(){
	if(this.isJumping == false){
		this.angleFinal +=90;
	}
}

var y = 250;
var limite = 50;
var jump = false;
var jump_y = y;


Perso.prototype.jump = function(){
	//Changer les coordonées y pour faire sauter le cube (this.y) - voir avec setInterval
	var _this = this;
	if(_this.isJumping == false){
		_this.isJumping = true;
		// var velocitybase = 0; // essayer de mettre une vélocité de base pour pouvoir faire un hold touche pour sauter plus haut
		var velocity = 14;
		var gravity = 0.5;
		var jumpInterval = setInterval(function(){
			velocity -= gravity;
			_this.y-=velocity;
			if(_this.y >= _this.ground){
				_this.isJumping = false;
				clearInterval(jumpInterval);
			}
		}, 12);
	}
}
