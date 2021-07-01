//Game States
var PLAY=1;
var END=0;
var gameState=1;

var gun, bullet_group ,zombie1_group,zombie2Group, score,r,randomzombie, position, pic;
var gunImage , zombie1, zombie2 , gameOverImage, picImage;
var gun_sound;

function preload(){
  
  gunImage = loadImage("gun.png");
  zombieImage = loadAnimation("zom1.png","zom2.png")
  zombie1 = loadImage("zom1.png");
  zombie2 = loadImage("zom2.png");
 gameOverImage = loadImage("gameover.gif");
 pic = loadAnimation("house.gif");
 bullet = loadImage("bullet.png")

  //load sound here
  gun_sound = loadSound("gun sound.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating gun
   gun=createSprite(40,200,20,20);
   gun.addImage(gunImage);
   gun.scale=0.7
  
  //set collider for gun
  gun.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  zombie1_group=createGroup();
  zombie2Group=createGroup();
  bullet_group=createGroup();
}

function draw() {
 background(0)
  
  if(gameState===PLAY){
    
    //Call zom1, zom2 and bullet function
    zom1()
    zom2()
    
    
    // Move sword with mouse
    gun.Y=World.mouseY;
    gun.X=World.mouseX;
  
    if(keyDown("space")){
      createBullet();
      gun_sound.play()
    }
    gun.x = bullet.x
    gun.y = bullet.y

    if(zombie2Group.isTouching(bullet_group)){
      zombie2Group.destroyEach();
      score = score +20;
    }
    // Increase score if bullet touching zombies
    if(bullet_group.isTouching(zombie1_group)){
      zombie1_group.destroyEach();
      score = score +20;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(zombie1_group.isTouching(gun)){
        gameState=END;
        
        //add gameover sound here
        
        zombie1Group.destroyEach();
        zombie2Group.destroyEach();
        bullet_roup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        gun.addImage(gameOverImage);
        gun.scale=2;
        gun.x=300;
        gun.y=300;

        gun.y = world.mouseY
        gun.x = world.mouseX
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,400,100);
  fill("green");
}


function zom1(){
  if(World.frameCount%200===0){
    zombie1=createSprite(400,200,20,20);
    zombie1.addAnimation("moving", zombie1);
    zombie1.y=Math.round(random(100,200));
    //update below give line of code for increase zombie1Group speed by 10
    zombie1.velocityX = -8;
    zombie1.setLifetime=-1;
    
    zombie1Group.add(zombie1);
   
  }
}
function zom2(){
  if(World.frameCount%200===0){
    zombie2 = createSprite(400,200,20,20);
    zombie2.addAnimation("moving", zombie2Image);
    zombie2.y=Math.round(random(100,200));
    //update below give line of code for increase zobie2Group speed by 10
    zombie2.velocityX = -8;
    zombie2.setLifetime=-1;
    
    zombie2Group.add(zombie2);

  
   }
  }

//create bullet function
function bullet(){
  
    bullet = createSprite(400,200,20,20);
    bullet.addImage(bullet);
   
    //update below give line of code for increase zobie2Group speed by 10
    bullet.velocityX = -8;
    bullet.setLifetime=-1;
    
    bulletGroup.add(bullet);
}

