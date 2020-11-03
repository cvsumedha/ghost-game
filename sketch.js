var tower, towerimg;
var door, doorimg, doorgrp;
var climber, climberimg, climbergrp;
var invisibleblock,invisiblegrp;
var ghost, ghostimg;
var gamestate="play"
var sound;

function preload() {
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg=loadImage("climber.png");
  ghostimg=loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  sound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 2;

doorgrp=createGroup();
climbergrp=createGroup();
invisiblegrp=createGroup();
  
  ghost=createSprite(200,200,50.50);
  ghost.addImage("ghosts",ghostimg);
  ghost.scale=0.3; 

}

function draw() {
  background(0);

 
  if(gamestate==="play"){
    if (tower.y > 400) {
    tower.y = 300;
  }
if(keyDown("space")){
  ghost.velocityY=-10 ;
  
  }
ghost.velocityY +=0.5;
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }  
 // climbergrp.collide(ghost); 
  
  if(climbergrp.isTouching(ghost)){
    ghost.velocityY=0; 
  }
    if(invisiblegrp.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gamestate="end";
      
    }
    spawndoors();
  drawSprites();
    
  }
 if (gamestate==="end"){   
   fill("yellow");
   stroke("yellow");
   textSize(30);
   text("Game Over",230,300);
   
 }
} 

 



function spawndoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, 50);
    door.velocityY = 1;
    door.addImage("doors", doorimg);
    door.x = Math.round(random(160, 400))
    

//making climbers
    climber=createSprite(200,100);
    climber.addImage("climbers",climberimg);
    climber.velocityY=1;
    climber.x=door.x;
    
    ghost.depth=door.depth;
    ghost.depth +=1;
    // making invisible block
    invisibleblock=createSprite(200,100,70,5);
    invisibleblock.debug=true;
    invisibleblock.velocityY=1;
    invisibleblock.x=door.x;
    invisibleblock.visible=false;
    
    //making groups
    doorgrp.add(door);
    door.lifetime=600;
    climbergrp.add(climber);
    climber.lifetime=600;
    invisiblegrp.add(invisibleblock);
    invisibleblock.lifetime=600;
    
  }







}