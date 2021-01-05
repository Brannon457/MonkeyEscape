var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacelImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,430,1200,10);
  //ground.x = ground.width /2;
  
  
  /*invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;*/
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  //bananaGroup 
  //console.log("Hello" + 5);
  
  /*trex.setCollider("circle",0,0,60);
  trex.debug = false;*/
  
  score = 0
  
  /*GameOver = createSprite(300,100);
  GameOver.addImage(GameOverImage);
  Restart = createSprite(300,140);
  Restart.addImage(RestartImage);
  Restart.scale=0.5;
  
  GameOver.visible = false;
  Restart.visible = false;*/
}

function draw() {
  //Canvas(600,600)
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
   if (background.x < 100){
      background.x = 300;
    }
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
    //score = score + Math.round(frameCount/frameRate(30));
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=150) {
      monkey.velocityY = -13;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
    //spawn the clouds
   spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    if(bananaGroup.isTouching(monkey)){
       score = score + 1;
      bananaGroup.destroyEach();
    }
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     
     obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     monkey.velocityY = 0;
     //GameOver.visible = true;
     //Restart.visible = true; 
     
   }
  
 
  //stop trex from falling down
  //trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
  if(World.frameCount%70===0)
  {
 Obstacle = createSprite(600,400,20,20);
  Obstacle.addImage(obstacelImage);
  //Obstacle.y=Math.round(random(100,300));
  Obstacle.velocityX = -8;
  
    //avoiding a memory leak
  Obstacle.lifeTime = 100;
  //adding the alien to the alien group  
 

    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.15;
    Obstacle.lifetime = 300;
   
   //add obstacle to the group
    obstaclesGroup.add(Obstacle);

} 
}
function spawnbanana() {
  //write code here to spawn the banana
   if (frameCount % 60 === 0) {
     banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
   // cloud.depth = trex.depth;
   // trex.depth = trex.depth + 1;
    
    //adding banana to the group
   bananaGroup.add(banana);
    }
}

