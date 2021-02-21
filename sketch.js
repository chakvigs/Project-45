var ghost, ghostImage;

var backGround, backGroundImage;

var obstacle, obstacleImage, obstacleGroup;

var gameOver, gameOverImage;

var score;

var gameState = "play";

function preload(){
  ghostImage = loadImage("ghost.png");
  backGroundImage = loadImage("background.png");
  obstacleImage = loadImage("cross.png")
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  
  backGround = createSprite(300, 150);
  backGround.addImage(backGroundImage);
  backGround.scale = 1.5;
  
  ghost = createSprite(50,250,20,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.15;
  
  ground = createSprite(200, 325, 400);
  ground.shapeColor = "black";
  
  gameOver = createSprite(200, 200);
  gameOver.addImage(gameOverImage);
  
  obstacleGroup = new Group();
}

function draw() {
  background("black");
  
  backGround.velocityX = -5;
    
  if (backGround.x < 100) {
    backGround.x = backGround.width/2;
  }

  ghost.collide(ground);
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (gameState === "play") {
    if (keyDown("space") && ghost.y >= 200) {
      ghost.velocityY = -12;
    }

    score = Math.round(frameCount/frameRate());

    if (ghost.isTouching(obstacleGroup)) {
      gameState = "end";
    }
    
    if (0 < score < 25) {
      if (frameCount % 200 === 0) {
        createObstacle();
      }
    }
    
    if (25 < score < 50) {
      if (frameCount % 150 === 0) {
        createObstacle();
      }
    }
    
    if (50 < score < 75) {
      if (frameCount % 100 === 0) {
        createObstacle();
      }
    }
    
    if (75 < score < 100) {
      if (frameCount % 50 === 0) {
        createObstacle();
      }
    }
    
    gameOver.visible = false;
  }
  
  if (gameState === "end") {
    gameOver.visible = true;
    obstacleGroup.destroyEach();
    score = score;
  }
  
  drawSprites();
  
  fill("white");
  textSize(15);
  text("Score: " + score, 180, 20);
}

function createObstacle() {
  //if (frameCount % 10 === 0) {
    obstacle = createSprite(400, 250, 30, 30);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.05;
    obstacle.velocityX = -7;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  //}
}