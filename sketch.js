var bg,bgImg;
var player, shooterImg, shooter_shooting;
var ghost, ghostImg;
var ghostGroup;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var bullets = 70;
var gameState = "fight";
var score = 0;
var life = 3;
var lose,win, explosion;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  ghostImg = loadImage("ghostImg.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  lose = loadSound("assets/lose.mp3");
  win = loadSound("assets/win.mp3");
  explosion = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)

   ghostGroup = new Group();

   heart1 = createSprite(displayWidth-300,40,20,20);
   heart1.visible = true;
   heart1.addImage("heart1",heart1Img);
   heart1.scale = 0.4;

   heart2 = createSprite(displayWidth-300,90,20,20);
   heart2.visible = true;
   heart2.addImage("heart1",heart1Img);
   heart2.scale = 0.4;

   heart3 = createSprite(displayWidth-300,140,20,20);
   heart3.visible = true;
   heart3.addImage("heart1",heart1Img);
   heart3.scale = 0.4;

   bulletGroup = new Group();
   zombieGroup = new Group();


}

function draw() {
  background(0); 

  if(gameState==="fight"){
    if(life===3){
      heart3.visible = true;
      heart1.visible = false;
      heart2.visible = false;
    }

    if(life===2){
      heart2.visible = true;
      heart1.visible = false;
      heart3.visible = false;
    }

    if(life===1){
      heart1.visible = true;
      heart3.visible = false;
      heart2.visible = false;
    }

    if(life===0){
      gameState = "lost";
    }

    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }
    
    
    //release bullets and change the image of shooter to shooting position when space is pressed
    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-1150,player.y-30,20,10);
      bullet.velocityX = 20;
      bulletGroup.add(bullet);
      player.depth= bullet.depth;
      player.depth = player.depth+2;
      player.addImage(shooter_shooting);
      bullets = bullets-1
     
    }
    
    //player goes back to original standing image once we stop pressing the space bar
    else if(keyWentUp("space")){

      player.addImage(shooterImg)

    }

    if(bullets==0){
      gameState = "bullet";

    }

    if(ghostGroup.isTouching(bulletGroup)){
      for(var i = 0 ; i<ghostGroup.length ; i++){
      if(ghostGroup[i].isTouching(bulletGroup)){
       ghostGroup[i].destroy();
       bulletGroup.destroyEach();
      }
    }
  }

    if(ghostGroup.isTouching(player)){
      for(var i = 0 ; i<ghostGroup.length ; i++){
      if(ghostGroup[i].isTouching(player)){
      ghostGroup[i].destroy();
      
      }
    }
  }


  //moving the player up and down and making the game mobile compatible using touches


enemy();
}

drawSprites();
if(gameState=="lost"){
  textSize(100);
  fill("red");
  text("You Lost.",400,400);
  ghostGroup.destroyEach();
}
else if(gameState=="won"){
  textSize(100);
  fill("yellow");
  text("You Won.",400,400);
  ghostGroup.destroyEach();
  player.destroy();
}
else if(gameState=="bullet"){
  textSize(50);
  fill("yellow");
  text("You run out of bullets.",470,410);
  ghostGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
  
}

}

function enemy(){

  if(frameCount%100===0){
    ghost = createSprite(random(1000,1100),random(100,500),48,48);
    ghost.addImage(ghostImg);
    ghost.scale = 0.3
    ghost.velocityX = -5;
    ghost.lifetime = 400;
    ghostGroup.add(ghost);

  }
}
