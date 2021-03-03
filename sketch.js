var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png");
rockImage=loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  FoodGroup=new Group();
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  obstaclesGroup=new Group();
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);
 text("Score: "+score,700,20);
  if(gameState===PLAY){
   spawnObjects();
  spawnFood();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  function spawnFood(){
    if(frameCount % 80 === 0){
      var banana=createSprite(600,250,40,10);
      banana.y=random(120,200);
      banana.addImage(bananaImage);
      banana.scale=0.05;
      banana.velocityX=-4;
      banana.lifetime=300;
      player.depth=banana.depth+1;
      FoodGroup.add(banana);
      }
  }
 function spawnObjects(){
if(frameCount % 100===0){
  var rock=createSprite(600,300,40,10);
  rock.x=random(120,800);
  rock.addImage(rockImage);
  rock.scale=0.10;
  rock.velocityX=-4;
  rock.lifetime=300;
  player.dept=rock.depth+1;
  obstaclesGroup.add(rock);
}
 }
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score=score+2;
    player.scale+=+0.1;
  }
  if(obstaclesGroup.isTouching(player)){
    gameState=END;
  } 
  if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    textSize(30);
    fill(255);
    text("GAME OVER!",300,220);
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
   
  
  }
 
  drawSprites();
}


