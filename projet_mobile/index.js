$('#start').on('touchstart', function(evt) { //touch event which start the game
  event.preventDefault();
  $(this).css('display', 'none')

var GAME = {
	canvas : document.getElementById("perso"),
	ctx : document.getElementById("perso").getContext("2d"),
  player : false,
  obstacles : [],
  iterator : 0,
  deadCounter : 0,
  speed : 5
};

var score = 0

function init(){
  //Setting requestAnimationFrame for navigator
  window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) { window.setTimeout(callback, 1000 / 60); };

  //init game
	GAME.canvas.width = $(window).width();
	GAME.canvas.height = $(window).height();
  //init sol
  var sol_canvas = document.getElementById('sol');
  sol_canvas.width = $(window).width();
  sol_canvas.height = $(window).height();
  sol(sol_canvas);

  var bg_canvas = document.getElementById('bg');
  bg_canvas.width = $(window).width();
  bg_canvas.height = $(window).height();
  background(bg_canvas);

  GAME.player = new Perso(GAME.ctx);
  GAME.player.y = GAME.canvas.height - GAME.player.h - 20;
  GAME.player.ground = GAME.canvas.height - GAME.player.h -20;

  /*sol.canvas.width = $(window).width();
  sol.canvas.height = $(window).height();
  bg.canvas.width = $(window).width();
  bg.canvas.height = $(window).height();*/
	requestAnimationFrame(gameloop);
}

init();

function gameloop(){

  //On efface le canvas
  GAME.ctx.clearRect(0,0, GAME.canvas.width, GAME.canvas.height);

  //Generation obstacles
  GAME.iterator++;
  if(GAME.iterator%70 == 0){
    var obstacle = new Obstacle(GAME.ctx, GAME.canvas.width, GAME.speed);
    if(Math.floor(Math.random() * 6 )>1){ // faire des obtacles de 1 à 6 aléatoirement
      obstacle.y = GAME.canvas.height - obstacle.h - 20;
      GAME.obstacles.push(obstacle);
    }
  }

  function hitBox( source, target ) {
  /* Source and target objects contain x, y and width, height */
  return !(
    ( ( source.y + source.h ) < ( target.y ) ) ||
    ( source.y > ( target.y + target.h ) ) ||
    ( ( source.x + source.w ) < target.x ) ||
    ( source.x > ( target.x + target.w ) )
  );
}

    //dessin des obstacles
  for(var i in GAME.obstacles){
      GAME.obstacles[i].draw();
      if(hitBox(GAME.player, GAME.obstacles[i])){
        $('#fin').css('display','inline-block');
        $('#bg, #perso, #sol').css('display','none');
        $('#fin').on('touchstart', function(evt) {
          location.reload();
        });
        return false;
      }
      if(GAME.obstacles[i].dead){
        GAME.obstacles.shift();
        score+=10;
        GAME.deadCounter++;
        if(GAME.deadCounter%10 == 0){
          GAME.speed +=1.5;
          for(var y in GAME.obstacles){
            GAME.obstacles[y].speed = GAME.speed;
          }
        }
        $('#score').html('Score : ' +score);
        $('#nbscore').html(score);
      }
  }

    //dessin du joueur
  GAME.player.draw();

  requestAnimationFrame(gameloop);

}



$(function() { //fonction quand on touche l'écran, ça fait la fonction "saut" du joueur et fait une rotations du "personnage"
  $(document).on('touchstart', function(evt) {
    event.preventDefault();
      GAME.player.rotate();
      GAME.player.jump();
  });
});

function getRandomTime(){ //sert à générer les obstales aléatoirement
  return Math.random();
}

function isGenerated(){
  Game.obstale = new Obstacle(GAME.ctx,GAME.canvas.width); //bord droit du canvas
}
});