function Obstacle(context, right, speed){
	this.ctx = context;
	this.x = right;
	this.h = 0;
	this.w = 0;
	this.y = 250;
	this.dead = false;
	this.tailleRandom();
	this.speed = speed;
	this.img = new Image();
	this.img.src = "obstacle.png";
}

Obstacle.prototype.draw = function(){
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    /*this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect (this.x,310-this.h,this.w,this.h);*/
    if(this.x > 0-this.w){
    	this.x -= this.speed;
    }
    else{
    	this.dead = true;
    }
}

Obstacle.prototype.tailleRandom = function(){
	this.h = Math.floor(Math.random() * 60) + 50;
	this.w = Math.floor(Math.random() * 30) + 20;
}