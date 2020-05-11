var PLAY = 1;
var END = 0;
var gameState;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var car,carImg;
var gameOver, restart;

var score=0;

localStorage["HighestScore"] = 0;

function preload(){

  carImg = loadImage("../images/car.png");
  obstacle1 = loadImage("../images/car1.png");
  obstacle2 = loadImage("../images/car2.png");
  obstacle3 = loadImage("../images/car3.png");
  obstacle4 = loadImage("../images/car4.png");
  
  track = loadImage("../images/track.png");



  gameOverImg = loadImage("../images/gameOver.png");
  restartImg = loadImage("../images/restart.png");
}


function setup() {
  createCanvas(500,700);

  car = createSprite(250,600);
  car.addImage(carImg);

  ground = createSprite(250,700);
  ground.addImage("track",track);
  //ground.scale = ;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(0);  
  text("Score: "+ score, 10,40);

  ground.y = ground.height /2;
  ground.velocityy = -(6 + 3*score/100);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown(LEFT_ARROW) ) {
      car.x = car.x -5;
    }
    if(keyDown(LEFT_ARROW) ) {
      car.x = car.x +5;
    }
  
    if (ground.y < 0){
      ground.y = ground.height /2;
    }
  
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(car)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {

    var valx;

    var randx = Math.round(random(1,4));

    switch(randx) {
      case 1: valx = 1;
              break;
      case 2: valx = 2;
              break;
      case 3: valx = 3;
              break;
      case 4: valx = 4;
              break;
      default: break;
    }

    var obstacle = createSprite(600,165,valx,-40);
    //obstacle.debug = true;
    obstacle.velocityX = -(7 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}