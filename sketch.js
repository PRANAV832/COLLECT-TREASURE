var path,boy,cash,diamonds,jewellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashGroup,diamondsGroup,jewelleryGroup,swordGroup;
var play = 1;
var end = 0;
var gameState = 1;
var gameOver,gameOverImage;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImage =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

  
gameOver = createSprite(200,200);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.4;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashGroup=new Group();
diamondsGroup=new Group();
jewelleryGroup=new Group();
swordGroup=new Group();

}

function draw() {

 
  
if(gameState === play){
  boy.x = World.mouseX; 
   if(path.y > 400 ){
    path.y = height/2;
  }
   createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
  gameOver.visible = false;
  
   if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
     treasureCollection=treasureCollection + 50;
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection=treasureCollection + 200;
      
    }else if(jewelleryGroup.isTouching(boy)) {
      jewelleryGroup.destroyEach();
      treasureCollection=treasureCollection + 500;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        treasureCollection=treasureCollection + 0;
    }
  }
  if(swordGroup.isTouching(boy)){
    gameState = end;
  }
}  
 
if(gameState === end){
  
gameOver.visible=true;
boy.visible = false;
swordGroup.setVelocityEach(0);  
cashGroup.setVelocityEach(0);  
diamondsGroup.setVelocityEach(0);
jewelleryGroup.setVelocityEach(0);
  
swordGroup.setLifetimeEach(-1);  
cashGroup.setLifetimeEach(-1);  
diamondsGroup.setLifetimeEach(-1);
jewelleryGroup.setLifetimeEach(-1);

  path.velocityY=0;
}  
  
 background(0);
   edges= createEdgeSprites();
  boy.collide(edges);  
  //code to reset the background

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 3;
  jewellery.lifetime = 150;
  jewelleryGroup.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}